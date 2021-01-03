import{m as e}from"../index.7b723884.js";import"./time.daaab1ba.js";import{P as t}from"./index.900a25fd.js";export default function(){return e`<${t} ...${{title:"Building an Efficient Cache",date:"2018-09-26T17:00:00.000Z"}}>
      <article dangerouslySetInnerHTML=${{__html:'<p>To build a cache could be as simple as to just to use a key-value pair kind data structure. It works sufficient most of the time in a single-threaded application. However, when there are many clients access the same cache while the computation being conducted can yield duplicated caching attempts thus defeat the purpose of caching, which is to avoid duplicated computation. This article introduces the existing caching patterns and discusses the key points to create an efficient cache.</p>\n\x3c!-- Excerpt End --\x3e\n\n<h2>\n  <a id="define-the-cache-behavior" class="anchor" aria-hidden="true" href="#define-the-cache-behavior">\n    <svg class="icon" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>Define the Cache Behavior</h2><p>Let&#39;s define an interface that represents the core behavior of the caches we build. <code>Computable</code> is a functional interface that only has one abstract method <code>compute()</code> that throws an <code>InterruptedException</code>. This exception might be thrown when any <em>synchronization</em> failure happens.</p>\n<div class="codeblock">\n  <pre>public interface Computable&lt;T, R&gt; {\n    R compute(T t) throws InterruptedException;\n}</pre>\n</div><h2>\n  <a id="simplecache" class="anchor" aria-hidden="true" href="#simplecache">\n    <svg class="icon" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>SimpleCache</h2><p><code>Map</code> interface defines a key-value pair kind data structure that could be used to internally track the result we want to cache. The following code shows a simple cache wrapper class that internally uses a <code>HashMap</code> implementation for caching registry. This implementation works fine and efficient in a single-threaded environment, but it is not a thread-safe implementation.</p>\n<div class="codeblock">\n  <pre>import java.util.HashMap;\nimport java.util.Map;\n\npublic class SimpleCache&lt;T, R&gt; implements Computable&lt;T, R&gt; {\n\n    private final Map&lt;T, R&gt; cache = new HashMap&lt;&gt;();\n    private final Computable&lt;T, R&gt; computable;\n\n    public SimpleCache(Computable&lt;T, R&gt; computable) {\n        this.computable = computable;\n    }\n\n    @Override\n    public R compute(final T t) throws InterruptedException {\n        R result = cache.get(t);\n        if (result == null) {\n            System.out.println(&quot;Caching - &quot; + t);\n            result = computable.compute(t);\n            cache.put(t, result);\n        }\n        return result;\n    }\n}</pre>\n</div><h2>\n  <a id="simplesynchronizedcache" class="anchor" aria-hidden="true" href="#simplesynchronizedcache">\n    <svg class="icon" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>SimpleSynchronizedCache</h2><p>The <code>compute()</code> method is the <code>SimpleCache</code> example doesn&#39;t provide the visibility in a concurrent environment when other threads need to check and act on if the cache already has the result the computation yields. The simplest approach to provide such visibility is to add synchronization to the method that needs the visibility, and in this case, we add the <code>synchronized</code> keywords to the <code>compute()</code> methods signature and thus make all thread block when they invoke this method. However, the blocking of the method removes the concurrency of this implementation.</p>\n<img src="https://image.ibb.co/iYg8p9/synchronized_cache.png" alt="Synchronized Cache"  class="ui big image" />\n<caption>Figure 1 Synchronized Cache Problem - Threads are waiting for the current running thread to finish and release the lock to continue their turn</caption>\n\n<div class="codeblock">\n  <pre>import java.util.HashMap;\nimport java.util.Map;\n\npublic class SimpleSynchronizedCache&lt;T, R&gt; implements Computable&lt;T, R&gt; {\n\n    private final Map&lt;T, R&gt; cache = new HashMap&lt;&gt;();\n    private final Computable&lt;T, R&gt; computable;\n\n    public SimpleSynchronizedCache(Computable&lt;T, R&gt; computable) {\n        this.computable = computable;\n    }\n\n    @Override\n    public synchronized R compute(final T t) throws InterruptedException {\n        R result = cache.get(t);\n        if (result == null) {\n            System.out.println(&quot;Caching - &quot; + t);\n            result = computable.compute(t);\n            cache.put(t, result);\n        }\n        return result;\n    }\n}</pre>\n</div><h2>\n  <a id="simpleconcurrentcache" class="anchor" aria-hidden="true" href="#simpleconcurrentcache">\n    <svg class="icon" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>SimpleConcurrentCache</h2><p>Synchronizing the entire <code>compute()</code> method is unlikely going to make the cache efficient. Luckily, there a set of collection from the current library that provides the thread-safe collections. We are going to use the <code>ConcurrentMap</code> interface. <code>ConcurrentMap</code> defines an operation called <code>putIfAbsent()</code> that will only add a key-value pair to the collection if it doesn&#39;t exist at the time of checking in an atomic way. The <code>ConcurrentHashMap</code> implements the <code>putIfAbsent()</code> internally using synchronization to make this atomic behavior happen. Most of the operations including reading operations from the <code>ConcurrentHashMap</code> is non-blocking operation while the class is still thread-safe internally, which gives the performance we want for building an efficient cache.</p>\n<p>However, when the <code>compute()</code> method defines an operation that takes a long duration to run, the risk of duplicating computing occurs. The goal of caching is to avoid duplicating expensive operations like this. Depending on the unlucky timing, when this issue occurs, it slows down the performance of our cache implementation.</p>\n<img src="https://image.ibb.co/b62nz9/concurrent_cache.png" alt="Concurrent Cache" class="ui big image" />\n<caption>Figure 2 Concurrent Cache - cache checking might happen while the `compute()` method is running</caption>\n\n<div class="codeblock">\n  <pre>import java.util.concurrent.ConcurrentHashMap;\nimport java.util.concurrent.ConcurrentMap;\n\npublic class SimpleConcurrentCache&lt;T, R&gt; implements Computable&lt;T, R&gt; {\n\n    private final ConcurrentMap&lt;T, R&gt; cache = new ConcurrentHashMap&lt;&gt;();\n    private final Computable&lt;T, R&gt; computable;\n\n    public SimpleConcurrentCache(Computable&lt;T, R&gt; computable) {\n        this.computable = computable;\n    }\n\n    @Override\n    public R compute(final T t) throws InterruptedException {\n        R result = cache.get(t);\n        if (result == null) {\n            System.out.println(&quot;Caching - &quot; + t);\n            result = computable.compute(t);\n            cache.putIfAbsent(t, result);\n        }\n        return result;\n    }\n}</pre>\n</div><h2>\n  <a id="betterconcurrentcache" class="anchor" aria-hidden="true" href="#betterconcurrentcache">\n    <svg class="icon" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>BetterConcurrentCache</h2><p>The issue of the <code>SimpleConcurrentCache</code> implementation is there is a chance the expensive operation might still run before the result of earlier compute operation is added to the cache. One thing that causes this to happen is the design of our internal cache registry - <code>ConcurrentMap&lt;T, R&gt;</code>. The result <code>R</code> will only be added after it is computed. If we could replace the result with a placeholder that only will be atomically added to the registry while the checking without any intermedia computation, this will resolve the problem of duplicated expensive computation.</p>\n<p>The <code>Future</code> class could be used to act as the placeholder as the cache registry result while the actual result by the time it is needed (if it has not yet finished computing) will wait until it is done. This could be achieved by calling the <code>Future.get()</code> instance method.  Because of the blocking behavior, the thread might be interrupted, we could remove the placeholder from the cache registry so it allows to be recomputed in the future when reattempted.</p>\n<div class="codeblock">\n  <pre>import java.util.concurrent.Callable;\nimport java.util.concurrent.ConcurrentHashMap;\nimport java.util.concurrent.ConcurrentMap;\nimport java.util.concurrent.ExecutionException;\nimport java.util.concurrent.Future;\nimport java.util.concurrent.FutureTask;\n\npublic class BetterConcurrentCache&lt;T, R&gt; implements Computable&lt;T, R&gt; {\n\n    private final ConcurrentMap&lt;T, Future&lt;R&gt;&gt; cache = new ConcurrentHashMap&lt;&gt;();\n    private final Computable&lt;T, R&gt; computable;\n\n    public BetterConcurrentCache(Computable&lt;T, R&gt; computable) {\n        this.computable = computable;\n    }\n\n    @Override\n    public R compute(final T t) throws InterruptedException {\n        Future&lt;R&gt; future = cache.get(t);\n        if (future == null) {\n            Callable&lt;R&gt; task = () -&gt; computable.compute(t);\n            FutureTask&lt;R&gt; futureTask = new FutureTask&lt;&gt;(task);\n            future = cache.putIfAbsent(t, futureTask);\n            if (future == null) {\n                System.out.println(&quot;Caching - &quot; + t);\n                future = futureTask;\n                futureTask.run();\n            }\n        }\n        try {\n            return future.get();\n        } catch (InterruptedException e) {\n            cache.remove(t, future);\n            throw e;\n        } catch (ExecutionException e) {\n            throw launderThrowable(e.getCause());\n        }\n    }\n\n    private static RuntimeException launderThrowable(Throwable t) {\n        if (t instanceof RuntimeException)\n            return (RuntimeException) t;\n        if (t instanceof Error)\n            throw (Error) t;\n        throw new IllegalStateException(&quot;Not unchecked&quot;, t);\n    }\n}</pre>\n</div><h2>\n  <a id="testharness" class="anchor" aria-hidden="true" href="#testharness">\n    <svg class="icon" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>TestHarness</h2><p>The <code>runSingle()</code> method generates a sequence from 0-9 repeatedly with a limit of 20 numbers and it computes the time in milliseconds of this caching a 500-millisecond computation for 4 times. By playing with different implementations of the cache, the <code>BetterConcurrentCache</code> always wins with the minimal time without duplicating expensive computation during caching.</p>\n<div class="codeblock">\n  <pre>import java.time.Instant;\nimport java.util.stream.Stream;\n\npublic class TestHarness {\n    private static Computable&lt;String, Integer&gt; computable = t -&gt; {\n        Thread.sleep(500);\n        return Integer.valueOf(t);\n    };\n\n    public static void main(String[] args) {\n        Stream.iterate(0, i -&gt; i++)\n            .limit(4)\n            .mapToLong(t -&gt; runSingle())\n            .peek(t -&gt; System.out.println(&quot;Total time: &quot; + t))\n            .average()\n            .ifPresent(t -&gt; System.out.println(&quot;Average time: &quot; + t));\n    }\n\n    private static long runSingle() {\n//        Computable&lt;String, Integer&gt; cache = new SimpleCache&lt;&gt;(computable);\n//        Computable&lt;String, Integer&gt; cache = new SimpleSynchronizedCache&lt;&gt;(computable);\n//        Computable&lt;String, Integer&gt; cache = new SimpleConcurrentCache&lt;&gt;(computable);\n        Computable&lt;String, Integer&gt; cache = new BetterConcurrentCache&lt;&gt;(computable);\n\n        long start = Instant.now().toEpochMilli();\n        Stream.iterate(0, i -&gt; i++ &lt; 10 ? i : (i = 0))\n            .limit(20)\n            .unordered()\n            .parallel()\n            .forEach(t -&gt; {\n                try {\n                    cache.compute(t.toString());\n                } catch (InterruptedException e) {\n                    e.printStackTrace();\n                }\n            });\n        long end = Instant.now().toEpochMilli();\n\n        return end - start;\n    }\n}</pre>\n</div><h2>\n  <a id="references" class="anchor" aria-hidden="true" href="#references">\n    <svg class="icon" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>References</h2><ol>\n<li><a href="http://jcip.net/" target="_blank">Java Concurrency in Practice</a></li>\n</ol>\n'}}/>
    </${t}>`}