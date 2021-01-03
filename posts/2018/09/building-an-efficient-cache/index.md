---
title: 'Building an Efficient Cache'
date: 2018-09-26 17:00:00
---
To build a cache could be as simple as to just to use a key-value pair kind data structure. It works sufficient most of the time in a single-threaded application. However, when there are many clients access the same cache while the computation being conducted can yield duplicated caching attempts thus defeat the purpose of caching, which is to avoid duplicated computation. This article introduces the existing caching patterns and discusses the key points to create an efficient cache.
<!-- Excerpt End -->

## Define the Cache Behavior
Let's define an interface that represents the core behavior of the caches we build. `Computable` is a functional interface that only has one abstract method `compute()` that throws an `InterruptedException`. This exception might be thrown when any *synchronization* failure happens.

```java
public interface Computable<T, R> {
    R compute(T t) throws InterruptedException;
}
```

## SimpleCache
`Map` interface defines a key-value pair kind data structure that could be used to internally track the result we want to cache. The following code shows a simple cache wrapper class that internally uses a `HashMap` implementation for caching registry. This implementation works fine and efficient in a single-threaded environment, but it is not a thread-safe implementation.

```java
import java.util.HashMap;
import java.util.Map;

public class SimpleCache<T, R> implements Computable<T, R> {

    private final Map<T, R> cache = new HashMap<>();
    private final Computable<T, R> computable;

    public SimpleCache(Computable<T, R> computable) {
        this.computable = computable;
    }

    @Override
    public R compute(final T t) throws InterruptedException {
        R result = cache.get(t);
        if (result == null) {
            System.out.println("Caching - " + t);
            result = computable.compute(t);
            cache.put(t, result);
        }
        return result;
    }
}
```

## SimpleSynchronizedCache
The `compute()` method is the `SimpleCache` example doesn't provide the visibility in a concurrent environment when other threads need to check and act on if the cache already has the result the computation yields. The simplest approach to provide such visibility is to add synchronization to the method that needs the visibility, and in this case, we add the `synchronized` keywords to the `compute()` methods signature and thus make all thread block when they invoke this method. However, the blocking of the method removes the concurrency of this implementation.

<img src="https://image.ibb.co/iYg8p9/synchronized_cache.png" alt="Synchronized Cache"  class="ui big image" />
<caption>Figure 1 Synchronized Cache Problem - Threads are waiting for the current running thread to finish and release the lock to continue their turn</caption>

```java
import java.util.HashMap;
import java.util.Map;

public class SimpleSynchronizedCache<T, R> implements Computable<T, R> {

    private final Map<T, R> cache = new HashMap<>();
    private final Computable<T, R> computable;

    public SimpleSynchronizedCache(Computable<T, R> computable) {
        this.computable = computable;
    }

    @Override
    public synchronized R compute(final T t) throws InterruptedException {
        R result = cache.get(t);
        if (result == null) {
            System.out.println("Caching - " + t);
            result = computable.compute(t);
            cache.put(t, result);
        }
        return result;
    }
}
```

## SimpleConcurrentCache
Synchronizing the entire `compute()` method is unlikely going to make the cache efficient. Luckily, there a set of collection from the current library that provides the thread-safe collections. We are going to use the `ConcurrentMap` interface. `ConcurrentMap` defines an operation called `putIfAbsent()` that will only add a key-value pair to the collection if it doesn't exist at the time of checking in an atomic way. The `ConcurrentHashMap` implements the `putIfAbsent()` internally using synchronization to make this atomic behavior happen. Most of the operations including reading operations from the `ConcurrentHashMap` is non-blocking operation while the class is still thread-safe internally, which gives the performance we want for building an efficient cache.

However, when the `compute()` method defines an operation that takes a long duration to run, the risk of duplicating computing occurs. The goal of caching is to avoid duplicating expensive operations like this. Depending on the unlucky timing, when this issue occurs, it slows down the performance of our cache implementation.

<img src="https://image.ibb.co/b62nz9/concurrent_cache.png" alt="Concurrent Cache" class="ui big image" />
<caption>Figure 2 Concurrent Cache - cache checking might happen while the `compute()` method is running</caption>

```java
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

public class SimpleConcurrentCache<T, R> implements Computable<T, R> {

    private final ConcurrentMap<T, R> cache = new ConcurrentHashMap<>();
    private final Computable<T, R> computable;

    public SimpleConcurrentCache(Computable<T, R> computable) {
        this.computable = computable;
    }

    @Override
    public R compute(final T t) throws InterruptedException {
        R result = cache.get(t);
        if (result == null) {
            System.out.println("Caching - " + t);
            result = computable.compute(t);
            cache.putIfAbsent(t, result);
        }
        return result;
    }
}
```

## BetterConcurrentCache

The issue of the `SimpleConcurrentCache` implementation is there is a chance the expensive operation might still run before the result of earlier compute operation is added to the cache. One thing that causes this to happen is the design of our internal cache registry - `ConcurrentMap<T, R>`. The result `R` will only be added after it is computed. If we could replace the result with a placeholder that only will be atomically added to the registry while the checking without any intermedia computation, this will resolve the problem of duplicated expensive computation.

The `Future` class could be used to act as the placeholder as the cache registry result while the actual result by the time it is needed (if it has not yet finished computing) will wait until it is done. This could be achieved by calling the `Future.get()` instance method.  Because of the blocking behavior, the thread might be interrupted, we could remove the placeholder from the cache registry so it allows to be recomputed in the future when reattempted.

```java
import java.util.concurrent.Callable;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.Future;
import java.util.concurrent.FutureTask;

public class BetterConcurrentCache<T, R> implements Computable<T, R> {

    private final ConcurrentMap<T, Future<R>> cache = new ConcurrentHashMap<>();
    private final Computable<T, R> computable;

    public BetterConcurrentCache(Computable<T, R> computable) {
        this.computable = computable;
    }

    @Override
    public R compute(final T t) throws InterruptedException {
        Future<R> future = cache.get(t);
        if (future == null) {
            Callable<R> task = () -> computable.compute(t);
            FutureTask<R> futureTask = new FutureTask<>(task);
            future = cache.putIfAbsent(t, futureTask);
            if (future == null) {
                System.out.println("Caching - " + t);
                future = futureTask;
                futureTask.run();
            }
        }
        try {
            return future.get();
        } catch (InterruptedException e) {
            cache.remove(t, future);
            throw e;
        } catch (ExecutionException e) {
            throw launderThrowable(e.getCause());
        }
    }

    private static RuntimeException launderThrowable(Throwable t) {
        if (t instanceof RuntimeException)
            return (RuntimeException) t;
        if (t instanceof Error)
            throw (Error) t;
        throw new IllegalStateException("Not unchecked", t);
    }
}
```

## TestHarness

The `runSingle()` method generates a sequence from 0-9 repeatedly with a limit of 20 numbers and it computes the time in milliseconds of this caching a 500-millisecond computation for 4 times. By playing with different implementations of the cache, the `BetterConcurrentCache` always wins with the minimal time without duplicating expensive computation during caching.

```java
import java.time.Instant;
import java.util.stream.Stream;

public class TestHarness {
    private static Computable<String, Integer> computable = t -> {
        Thread.sleep(500);
        return Integer.valueOf(t);
    };

    public static void main(String[] args) {
        Stream.iterate(0, i -> i++)
            .limit(4)
            .mapToLong(t -> runSingle())
            .peek(t -> System.out.println("Total time: " + t))
            .average()
            .ifPresent(t -> System.out.println("Average time: " + t));
    }

    private static long runSingle() {
//        Computable<String, Integer> cache = new SimpleCache<>(computable);
//        Computable<String, Integer> cache = new SimpleSynchronizedCache<>(computable);
//        Computable<String, Integer> cache = new SimpleConcurrentCache<>(computable);
        Computable<String, Integer> cache = new BetterConcurrentCache<>(computable);

        long start = Instant.now().toEpochMilli();
        Stream.iterate(0, i -> i++ < 10 ? i : (i = 0))
            .limit(20)
            .unordered()
            .parallel()
            .forEach(t -> {
                try {
                    cache.compute(t.toString());
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            });
        long end = Instant.now().toEpochMilli();

        return end - start;
    }
}
```

## References
1. <a href="http://jcip.net/" target="_blank">Java Concurrency in Practice</a>
