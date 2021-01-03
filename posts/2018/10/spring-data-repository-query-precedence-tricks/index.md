---
title: 'Spring Data Repository Query Precedence Tricks'
date: '2018-10-10 17:00:00'
---
Spring Data repository method is very handy but it also comes with its limitation, especially when composed with condition precedence. This article shows one way to work with it and its caveats.
<!-- Excerpt End -->

## Use Case

Given the following type:
```java
@Entity
public class Book {
    @Id
    private Long id;
    private String title;
    private String edition;

    // Getters and Setters ...
}
```

### 1. check if there is any book whose title or edition matches the specified.

This one is easy to come up with. We could simply use the keyword `Or` to compose the query:

```java
boolean existsByTitleOrEdition(String title, String edition);
```

### 2. check if there is any book whose title or edition matches the specified and is not itself.

This one looks just as easy as the first one, we could have just added another condition and compose with the keyword `And`:

```java
boolean existsByTitleOrEditionAndIdIsNot(
    String title, String edition, Long id);
```

Is that so?

When this method name is translated to SQL, it reads surprisingly as

> test if any book whose title matches the specified
>                      or
> (edition matches the specified and is not itself)

What is the problem?

The problem is Spring data repository methods doesn't support precedence with parenthesis. That is why it only honors its default precedence when building the query.

#### Solution 1

We could just not use the repository method to build the query, but instead using the `@Query` or `@NamedQuery` to build the query with **JPQL**:

```java
    @Query("SELECT CASE WHEN (COUNT(b) > 0) then true else false end FROM Book a"
        + " WHERE b.id <> :id AND (b.title = :title OR b.edition = :edition)")
    boolean existsByTitleOrEditionWithIdIsNot(
        @Param("id") Long id, 
        @Param("title") String title, 
        @Param("edition") String edition);
```

#### Solution 2
We know that `(A or B) and C  <==> (A and C) or (B and C)` is true. We could compose the repository method with an extra duplicated or condition to make it work.

```java
boolean existsByTitleAndIdIsNotOrEditionAndIdIsNot(
    String title, Long id1, String edition, Long id2);
```

#### Caveats

This trick can build queries with precedence without writing any JPQL, but it comes at the cost of verbose -- not just in long and hard to read method name, but also in the method arguments -- notice that the same `id` is expressed twice with two different method local variable names.

### Source Code
```java
@Entity
public class Book {
    @Id
    private Long id;
    private String title;
    private String edition;

    // Getters and Setters ...
}

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {
    // A or B
    // test if any book whose title or edition matches the specified
    boolean existsByTitleOrEdition(String title, String edition);
    
    // A or (B and C)
    // test if any book whose 
    //    title matches the specified or 
    //    (edition matches the specified and is not itself)
    boolean existsByTitleOrEditionAndIdIsNot(
        String title, String edition, Long id);

    // Solution 1
    @Query("SELECT CASE WHEN (COUNT(b) > 0) then true else false end FROM Book a"
        + " WHERE b.id <> :id AND (b.title = :title OR b.edition = :edition)")
    boolean existsByTitleOrEditionWithIdIsNot(
        @Param("id") Long id, 
        @Param("title") String title, 
        @Param("edition") String edition);

    // Solution 2
    // (A or B) and C <==> (A and C) or (B and C)
    // test if any book whose 
    //     (title matches the specified and is not itself) or 
    //     (edition matches the specified and is not itself)
    boolean existsByTitleAndIdIsNotOrEditionAndIdIsNot(
        String title, Long id1, String edition, Long id2);
}
```

## Useful Readings
- <a href="https://docs.spring.io/spring-data/jpa/docs/2.1.0.RELEASE/reference/html/#repository-query-keywords" target="_blank">Spring Repository query keywords</a>
- <a href="https://www.baeldung.com/spring-data-jpa-query" target="_blank">Spring Data JPA @Query</a>

