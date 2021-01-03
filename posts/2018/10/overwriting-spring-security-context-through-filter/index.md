---
title: 'Overwriting Spring Security Context through Filter'
date: '2018-10-30 17:00:00'
---
This article presents a strategy that overwrites the spring security context in order to allow a user to visit the resources without authenticating the user through the authentication filters.
<!-- Excerpt End -->

It is very common that in a single-sign-on application to use a session store to persist the session information after the user has successfully signed in. Spring Session magically takes care this for us if we add `@enableXxxHttpSession` to the application configuration. While it is convenient to use an out-of-the-box solution, it is extremely helpful to implement one so each fundamental part of this pattern can be fully understood.  This insight can improve the efficiency of the code by way of a more optimal choice of scope for any session store, even to make a home-made one.

We will create a `javax.servlet.Filter` implementation so we could add this filter as part of the security filter chain.

The place this filter should be inserted is before the `SecurityContextPersistenceFilter`.

In this example, instead of using a home-made repository for session store, we will use the `MongoOperationsSessionRepository` from the Spring Session. This repository persists the session information to a collection named **sessions** into the configured MongoDB instance. When manually setting up the `SessionRepository` interface, it is recommended to also manually setup the `GenericConverter` so that the session repository knows how to properly serialize and deserialize the session object.

```java
private MongoOperationsSessionRepository sessionRepository;

@Autowired
public SessionFilter(final MongoOperations mongoOperations,
                     final AbstractMongoSessionConverter sessionConverter) {
    sessionRepository = new MongoOperationsSessionRepository(mongoOperations);
    sessionRepository.setMongoSessionConverter(sessionConverter);
}
```

Assume the client will send a cookie containing session id along with the request to the server, we will get the session id from the cookie and then look it up from the session store, and in this case, it is the `MongoOperationsSessionRepository` instance. We should conduct some expected session validation checking and then start overriding the security context.

```java
HttpServletRequest httpRequest = (HttpServletRequest) request;
Cookie cookie = WebUtils.getCookie(httpRequest, COOKIE_NAME);

if (cookie != null) {
    String sessionId = cookie.getValue();
    MongoExpiringSession session = sessionRepository.getSession(sessionId);

    if (session != null && session.getExpireAt().toInstant().isAfter(Instant.now())) {
        Authentication authentication = session.getAttribute(ATTR_USER);

        // Overwriting the security context
        // ...
    }
}
```

It is a three-step process to overwrite the spring security context:

1. Get the security context
2. Set its new authentication
3. Assign the security context to the `HttpSession`

```java
if (authentication != null) {
	SecurityContext sc = SecurityContextHolder.getContext();
	sc.setAuthentication(authentication);
	httpRequest.getSession(true)
	    .setAttribute(SPRING_SECURITY_CONTEXT_KEY, sc);
}
```

Follow these above steps, we get ourselves a security context with our new authentication! 

