---
title: 'Pass Parameters to the ExecutiveService Adapter'
date: '2018-11-06 17:00:00'
---
This tip shows how to pass pipeline input variables to an `ExecutiveService` adapter in webMethods.
<!-- Excerpt End -->

The `ExecutiveService` adapter is used to execute a java service which utilizes the connection from the Integration Server managed connection pool to execute custom SQL statements. The adapter service input include an `Object` type `targetServiceInput`. This actually is a IS `document` type based on my experiment.

To properly send pipeline variables to the wrapped java service, a wrapper document type needs to be created in a map service to map to the `targetServiceInput` object in the adapter service and then any properties under this document, will be available to access from the wrapper java service by doing the following:

```java
IDataMap idm = new IDataMap(pipeline);
String foo = idm.getAsString("bar");
```

This java service has an input of `bar` defined in its *Input* tab.

