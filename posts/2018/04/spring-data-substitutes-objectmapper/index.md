---
title: 'Spring Data Substitutes ObjectMapper'
date: '2018-04-27 17:00:00'
---
Most times when we need a DTO mapping from our persistent entity, we would think of using an ObjectMapper. However, with the help of the Spring Data, you might not need an ObjectMapper. This lesson presents a solution to use Spring Data to replace simple ObjectMapper use case.
<!-- Excerpt End -->

## Story

Given a `Book` class and one of it's DTO class `BookMeta` as shown below, create a repository method that retrieve all `BookMeta` by category.

```java
@Entity
public class Book {
	private String title;
	private String author;
	private String category;
	private String intro;

	// getter and setters are ommitted for brevity
}

@Entity
public class BookMeta {
	private String title;
	private String author;

	public BookMeta(String title, String author) {
		this.title = title;
		this.author = author;
	}

	// getter and setters are ommitted for brevity
}
```

## Solution
As part of JPA, JPQL now supports **constructor expressions**. What we could do is to `new` a full-classpath-constructor in the named query.

```java

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {
    @Query("SELECT new com.leafyjava.domains.dtos.BookMeta(b.title, b.author) FROM Book b WHERE b.category = :category")
    List<BookMeta> findAllMetaByCategory(@Param("category") String category);
}
```

## Lesson Learnt

- DTO class full classpath must be used in the `@Query` annotation
- Use `@Param` to set query parameters.


