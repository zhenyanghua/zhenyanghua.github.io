---
title: 'Exception Handling in WebMethods'
date: 2018-10-10 17:00:00
---
`Try-Catch` block is commonly used to try a risky operation and catch the exception it may raise. This article shows the trick to do the similar thing without writing java code in a flow service with WebMethods.
<!-- Excerpt End -->

The following flow service sequence is an alternative to a `Try-Catch` block.

<img src="https://image.ibb.co/iZXAGz/try_catch_sequence.png" alt="Try-Catch Sequence" class="ui big image" />

Figure 1. Try-Catch Sequence in WebMethods

## Sequence
The outer sequence exits on success; the first inner sequence exits on failure and the second inner sequence exits on done.

A sequence block consists of any number of operations that needs to be executed in the placed order. There are three options available for instructing a sequence to exit - `FAILURE` (default), `SUCCESS` and `DONE`. When a sequence exits, the next closest sibling statement or sequence will be executed unless the enclosing sequence instructs to exit on success.

### Try Block
In the above case, if the risky operation `pub.flow:debugLog (first)` runs successfully, the `SEQUENCE (exit on failure)` will exit until the last statement is run, and exit normally. Because the enclosing `SEQUENCE (exit on success)` receives the successful indication from the first inner sequence, the enclosing sequence exits, and the second inner sequence will not execute.

### Catch Block
If the risky operation `pub.flow:debugLog (first)` fails, the first inner sequence will exit and because it is not a successful exit, the enclosing sequence will continue to execute the next statement or sequence, and then the second sequence `SEQUENCE (exit on done)` executes.

## Other thoughts
The `Try-Catch` sequence is useful in wrapping many risky operations such as the out-of-box `http` client, `jms` client. However, this pattern prevents any type of exception propagating to the caller operation.  Sometimes a risky operation needs to be retried with WebMethods built-in retry feature, hence make sure the `ISRuntimeException` is rethrown to allow this exception to propagate to the top-level service.
