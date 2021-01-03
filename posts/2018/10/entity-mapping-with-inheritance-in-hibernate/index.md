---
title: 'Entity Mapping with Inheritance in Hibernate'
date: 2018-10-10 17:00:00
---
Inheritance could be enabled in Hibernate with the `@MappedSuperclass` annotation. This annotation could greatly reduce the boilerplate in our entity mapping.
<!-- Excerpt End -->

## Story

Using inheritance to map a **paper-book** and **audio-book** type of data.

## Solution

The following Resource class uses `@MappedSuperclass` annotation to abstract the shared properties into a superclass that represents a resource that could be extended by all concrete resources. In this case, we also make the resource generic so that each the primary key property `id` could be flexible with the type of its subclass.

By using the `@MappedSuperclass` instead of the `@Entity` annotation on the superclass, it tells Hibernate to create these superclass properties in each of the respective subclass tables in the database.

```java
@MappedSuperclass
public class Resource<T> {
    @Id
    @GeneratedValue(strategy = AUTO)
    private T id;

    @Column(length=255)
    private String name;

    // getters and setters are omitted for brevity
}

@Entity
public class PaperBook extends Resource<Long> {
    private String author;
        
    // getters and setters are omitted for brevity
}

@Entity
public class AudioBook extends Resource<Long> {
    private String author;
    private String toldBy;

    // getters and setters are omitted for brevity
}

@Entity
public class Dvd extends Resource<Long> {
    private String director;

    // getters and setters are omitted for brevity
}
```

## Lesson Learnt
- `@MappedSuperclass` annotation could be used on superclass to enable inheritance in entity mapping.