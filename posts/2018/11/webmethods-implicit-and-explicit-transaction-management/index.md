---
title: 'WebMethods Implicit and Explicit Transaction Management'
date: '2018-11-13 17:00:00'
---
It is not documented from any of the WebMethods resources that how to manage transactions implicitly and explicitly. This tip shows the missing piece that will prevent a transaction holding a connection until the transaction owner thread is killed.
<!-- Excerpt End -->

Imagine a case you have to do the following operations:

1. Execute a stored procedure that takes a data table as input parameters. (ExecuteService adapter)
---
2. Query a table (Select adapter)
3. Update the table A (Update adapter)
4. Update the table B (Update adapter)
---

step 2-4 must be realized in together.

With a typical Java workflow, a transaction will be wrapped around the step 2-4 to make sure when any of the steps fail, the changes made within this transaction gets rolled back.

In WebMethods, JDBC connections are managed by a connection pool. When an adapter service is run, if the adapter service is created from the same connection, then it will attempt to acquire the connection from the pool. If there is no active connection, it the connection pool will create a connection and assign it to the adapter service, meanwhile, any other adapter that created from the same connection must wait for the first adapter to release connection before they can send statements through JDBC to the database.

On the other hand, an `ExecuteService` adapter will similarly acquire connection programmatically from the pipeline and put a hold on the connection until the session is over.

Let's now wrap the above use case with the transaction block.

1. Execute a stored procedure that takes a data table as input parameters. (ExecuteService adapter)
--- 
2. transaction starts
3. Query a table (Select adapter)
4. Update the table A (Update adapter)
5. Update the table B (Update adapter)
6. transaction commit/rollback
---

The above workflow seems promising, but we might forget something. There are actually two transaction blocks above -- one is implicit, and the other is explicit.

Step 1 is wrapped by an implicit transaction block that will start the transaction before the step1 is run, and will end the transaction when the flow service ends, which is after step 6 (Not step 1). The above workflow with implicit transaction could be translated to the following:

1. Outer transaction starts implicitly
2. Execute a stored procedure that takes a data table as input parameters. (ExecuteService adapter)
--- 
3. Inner transaction starts
4. Query a table (Select adapter)
5. Update the table A (Update adapter)
6. Update the table B (Update adapter)
7. Inner transaction commit/rollback
---
8. Outer transaction commit/rollback implicitly

Remember we haven't changed any workflow yet. The connection acquired from the above workflow is going to hang after step 3. It turns out webMethods doesn't like a mixed-use of transaction management.
It either has to be all implicit or all explicit within the same thread that runs the transaction.

To make it work with WebMethods, we must change the above to the following:

1. Transaction 1 starts
2. Execute a stored procedure that takes a data table as input parameters. (ExecuteService adapter)
3. Transaction 1 commit/rollback
--- 
4. Transaction 2 starts
5. Query a table (Select adapter)
6. Update the table A (Update adapter)
7. Update the table B (Update adapter)
8. Transaction 2 commit/rollback
---

## Conclusion

Use only one style of transaction management -- either explicitly or implicitly within the same thread, not both.

