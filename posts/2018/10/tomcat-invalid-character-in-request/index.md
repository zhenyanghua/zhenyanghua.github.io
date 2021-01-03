---
title: 'Tomcat Invalid Character in Request'
date: '2018-10-10 17:00:00'
---
8.5 Tomcat throws an `IllegalArgumentException` when processing request URL that has non-encoded illegal special characters. This article shows two workarounds.
<!-- Excerpt End -->

### Note

It is always better to follow the standard to encode URL at the client side first to prevent this problem from happening at all.

### Error Log

> 2018-10-10 19:29:55.522  INFO 21872 --- [nio-8080-exec-1] o.apache.coyote.http11.Http11Processor   : Error parsing HTTP request header
> Note: further occurrences of HTTP header parsing errors will be logged at DEBUG level.

> java.lang.IllegalArgumentException: Invalid character found in the request target. The valid characters are defined in RFC 7230 and RFC 3986

### Solution 1

Downgrade Tomcat to 8.0 or use another web container

### Solution 2

#### Spring boot 1.x

You could use simply swap out the embedded tomcat with a 8.0 version.

```xml
<xml>
    <properties>
        <tomcat.version>8.0.47</tomcat.version>
    </properties>
    <dependencies>
        ...
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.apache.tomcat</groupId>
            <artifactId>tomcat-juli</artifactId>
            <version>\${tomcat.version}</version>
        </dependency>
        ...
    </dependencies>
</xml>
```

#### Spring boot 2.x

You could swap the tomcat with a jetty.

```xml
<xml>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
        <exclusions>
            <exclusion>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-starter-tomcat</artifactId>
            </exclusion>
        </exclusions>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-jetty</artifactId>
    </dependency>
</xml>
```
