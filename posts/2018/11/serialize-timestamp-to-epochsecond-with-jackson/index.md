---
title: 'Serialize Timestamp To EpochSecond with Jackson'
date: '2018-11-09 17:00:00'
---
Some REST API only takes a `long` as its Date field, such as `esriFieldTypeDate` from ArcGIS Server Rest API. But with the rich functionality, the Java 8 time API provides, it would be silly to use `long` as the type for our object modeling. This tip shows how to solve this problem.
<!-- Excerpt End -->

I started with using `LocalDateTime` as the type of the timestamp field I want to use`, but Jackson simply serialize it as it does with any other fields, but what I really want is to serialize it to the epoch second.

Jackson does provide a new library that supports the JSR 310 which is the date and time API. to use that dependency, we need to add the following to maven:

```
<dependency>
    <groupId>com.fasterxml.jackson.datatype</groupId>
    <artifactId>jackson-datatype-jsr310</artifactId>
</dependency>
```

At this point, the job is not done yet. The `LocalDateTime` is not an option because it takes a timezone information to convert to the epoch second, unless we provide it, otherwise, we should use the `Instant` type instead. The `Instant` class provides the epoch second and the nanosecond of that second. We need to disable the nanosecond from the serialization process so we could get the epoch second.

The following will do the job by using the new Jackson jsr310 dependency we added and disabling the nanosecond in the serialization process.

```java
ObjectMapper mapper = new ObjectMapper()
    .registerModule(new JavaTimeModule())
    .disable(SerializationFeature.WRITE_DATE_TIMESTAMPS_AS_NANOSECONDS);
```
