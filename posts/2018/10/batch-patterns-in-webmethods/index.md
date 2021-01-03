---
title: 'Batch Patterns in WebMethods'
date: 2018-10-10 17:00:00
---
Having been working with WebMethods Integration Platform from Software AG for about a year now on a large integration project with many vendor components such as SAP, CityWorks, ArcGIS Server, from knowing nothing about WebMethods to building reliable and robust integration services, following established patterns is inescapable. However, the access to the proprietary software WebMethods and its documentation is limited to the public, we found a hard time to find the best practice for our batch operations. This article shows some patterns we learnt and tested with confidence that you might find helpful in your development with WebMethods.
<!-- Excerpt End -->

## Case Study

Our client has some flat files that need to be load into the database of a vendor application nightly. Every day the data in the flat files are updated so the next day the vendor application must reflect the latest changes. The Vendor application will not have any data updates during the night the batch operation is running.

## Key points

- The integration runs nightly.
- The vendor application's database may involve complex schema that we may hard to identify to load the data directly through any stored procedures.
- The vendor application comes with limited REST API that works with some of the data columns in the flat file which we could use for persistence.
- Any failed operations need to be automatically retried up to a given times after a delay.
- The entire batch operation needs to be done in an efficient way so that server cluster has enough time left to run other batch operations on the same night.
- No messages should be lost.

## Challenges

1. Knowing the flat file contains thousands of records, and the list is guaranteed to grow every day, we might experience a bottleneck when the server resource is limited.
2. When a single HTTP request failed, and the main thread is going to be retried. We don't want the previously persisted records to be retried.
3. The vendor application's API doesn't provide any pagination in the request. This becomes a major network io problem when we request thousands of records from the database using their API.

## Our solution

### Challenge 1, 2

There are two steps of this batch operation -
1. read nightly data from the database and compare with the flat file to find out the records to be updated and added.
2. persist the found records.

When there are transient errors happening in step 1, we have to retry the entire batch operation because everything else depends on the result of this step. WebMethods provides **Top Level Service Retry** feature through the properties view of a top level service and triggers. We could tune that setting to meet our tolerated retry times and interval. In addition, a resource monitoring service could be added to support additional behavior for the top level service.

After step 1 gathers the updated records, we iterate through the collection and for each of the record, we send the records data through JMS to our JMS server. Triggers are used to register our handlers to our JMS destinations. However, when a top-level service or its sub-services failed from any exceptions, a trigger failure will be raised which causes the message to be lost if selecting the auto-acknowledgment setting. There are two options here to avoid a message loss. If leaving the default auto-acknowledgment on, the exceptions must be caught and rethrown as an `ISRuntimeException` or call the `throwExceptionForRetry` service. The other option is to cooperate with the code to use client-acknowledgment. In our case, we'd like it to be retried when there are any transient errors happening, so we rethrow exceptions to the `ISRuntimeException`, which guarantee the message persist in the pipeline and provides the way to retry single records independently instead of retry all records.

### Challenge 3

We investigated the vendor database's schema to find all the related tables that the out-of-box querying endpoint does and we created our own paginated endpoint that query records from the database.

It may not be straightforward to do it in WebMethods, a custom java service `getAll()` needs to be wrapped a single `getPage()` service. We created a flow service that calls our API endpoint to get a single page and then a java service to recursively call our paginated endpoint for the rest of the data.

```java
public static final void getAll(IData pipeline) throws ServiceException {
    try {
        IDataMap in = new IDataMap(pipeline);
        int pageSize = Integer.valueOf(in.getAsString("pageSize"));
        String retryCount = in.getAsString("retryCount");
        String maxRetryCount = in.getAsString("maxRetryCount");
        
        // create hashtable
        Object hashtable = new IDataMap(Service.doInvoke( "pub.hashtable", "createHashtable", new IDataMap().getIData()))
                .get("hashtable");
        
        getPage(pageSize, 0, hashtable, retryCount, maxRetryCount);
        
        in.put("hashtable", hashtable);
        
    } catch (Exception e) {
        throw new ISRuntimeException();
    }    
}
    
// --- <<IS-BEGIN-SHARED-SOURCE-AREA>> ---

private static void getPage(int pageSize, int pageNumber, Object hashtableForAll, String retryCount, String maxRetryCount) throws Exception {
    IDataMap in = new IDataMap();
    in.put("pageSize", String.valueOf(pageSize));
    in.put("pageNumber", String.valueOf(pageNumber));
    in.put("retryCount", retryCount);
    in.put("maxRetryCount", maxRetryCount);
    
    IDataMap out = new IDataMap(
            Service.doInvoke("record.repositories", "getPage", in.getIData()));
    
    Object hashtable = out.get("hashtable");
    
    // size - if 0, return;
    IDataMap hashtableIn = new IDataMap();
    hashtableIn.put("hashtable", hashtable);
    int size = Integer.valueOf(new IDataMap(
            Service.doInvoke( "pub.hashtable", "size", hashtableIn.getIData()))
            .getAsString("size"));
    if (size == 0) return;

    // listKeys
    String[] keys = new IDataMap(Service.doInvoke( "pub.hashtable", "listKeys", hashtableIn.getIData()))
    .getAsStringArray("keys");
    
    // loop keys
    for(String key: keys) {
        // put key/value
        IDataMap getIn = new IDataMap();
        getIn.put("key", key);
        getIn.put("hashtable", hashtable);
        Object value = new IDataMap(Service.doInvoke( "pub.hashtable", "get", getIn.getIData()))
                .get("value");
        
        IDataMap putIn = new IDataMap();
        putIn.put("key", key);
        putIn.put("hashtable", hashtableForAll);
        putIn.put("value", value);
        Service.doInvoke("pub.hashtable", "put", putIn.getIData());
    }
    
    // do next page
    getPage(pageSize, ++pageNumber, hashtableForAll, retryCount, maxRetryCount);
    
}
```

## Other thoughts

- WebMethods provides a list of the common clients could be used to talk to another component in a certain protocol, but these clients are not safe by itself. A [Try-Catch](/articles/exception-handling-in-webmethods) style flow service need to be wrapped around the out-of-box clients to make them robust and reliable in enterprise integrations.

- We still couldn't find a way to externally configure the properties view through the global variables, this could be very useful to match the configuration settings for retries on `Repeat` and `Retry`. 