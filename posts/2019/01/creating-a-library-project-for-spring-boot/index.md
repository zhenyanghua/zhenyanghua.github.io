---
title: 'Creating a Library Project for Spring Boot'
date: 2019-01-07 17:00:00
---
This article introduces the key points when creating a library for spring boot project.
<!-- Excerpt End -->

It could be common that over the years you have created a number of services that could be reused by other spring projects. It then makes sense to make the reusable modules such as a library and install it in your local repository for later use.

Here are the key points to consider when building a spring boot library.

- release version
- build plugin
- dependency injection
- autoconfigurations

## Release Version

To guarantee spring boot works the way you expect, it is recommended to keep update the release versions of the library so that it supports some versions of the spring boot minor version. A good practice is to monitor change spring boot changelog and see if there are any conflicting dependencies that are used in the library project. If there is, introduce a new version to resolve the conflict.

## Build Plugin

If the projects reference this library doesn't compile through maven or gradle but still runs through IDE, it is likely the maven or gradle configuration of the library causes the problem. One cause is the presence of `spring-boot-maven-plugin`. This plugin must be removed from the dependency manager of the library project, because the library project we build doesn't need to be invoked through a command line interface, and this plugin is used to create an executable bundled jar file.

## Dependency Injection

Make sure the `@SpringBootApplication` is present in the projects that use this library so the library services could be scanned by the spring boot application.

## Autoconfiguration

By default, any beans defined in the classes that are annotated with `@Configuration` are the ones will be used if else no others are defined in the applications that use this library and the autoconfiguration is enabled. Spring boot allows conditionally enable autoconfiguration on both class and method level.

For example, to enable a configuration class only when the value of the property `application.session.filter` is `true`, we could use the `@ConditionalOnProperty` annotation:

```java
@Configuration
@ConditionalOnProperty(name = "application.session.filter", havingValue = "true")
public class HttpSessionAutoConfiguration {
    //...
}
```

In addition, if we could use `@ConditionalOnMissingBean` on a method only if the annotated bean is missing the application:

```java
@Bean
@ConditionalOnMissingBean
public AbstractMongoSessionConverter jdkMongoSessionConverter() {
    return new JdkMongoSessionConverter();
}
```

The above concepts apply on both Spring boot 1.x and Spring boot 2.x.