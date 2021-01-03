---
title: 'PostgreSQL and Hibernate CLOB'
date: '2018-10-10 17:00:00'
---
When you need a SQL data type that can hold more than 255 characters, you are likely to use some large character data type such as CLOB, BLOB. It is easy to find the right type if you know what exactly the database you will stick to. However, when we use Hibernate, it provides the annotations that support the cross-platform data type translation.
<!-- Excerpt End -->

## Story

I like to use H2 embedded database as a starting point when I start a new project, but later on, when I switch to use PostgreSQL, I was prompted *org.postgresql.jdbc.PgConnection.createClob() is not yet implemented*.

I have one property in my class is a `String` type, as I marked as `@Lob` and wish Hibernate will take care of the rest for me, but NO. I still get the same exception.

## Solution

To solve this, I need to add the additional `@Type(org.hibernate.type.TextType)` annotation to the property as well, and then it works nicely with PostgreSQL in addition to H2.

## Lesson Learnt

- `org.hibernate.type.TextType` - A type that maps an SQL `LONGVARCHAR` to a Java String
- `@Type` - use this to define one of the Hibernate mappings to gain cross-platform support.

