---
title: 'Java Servlet CORS Filter with  Preflight  Options'
date: 2018-04-26 17:00:00
---
A CORS filter determines what types of access control header will be set for the server response to the client's request.  However, when the resource being accessed is behind a security layer, in order to send the payload to the security filters, an optional request by browsers is sent to the server before the actual request. This lesson presents one implementation of a CORS filter that supports preflight options request.
<!-- Excerpt End -->

## Story

The following code is an implementation of a CORS filter that just works fine without a security layer.

```java
public class SimpleCorsFilter implements Filter {

    @Override
    public void init(final FilterConfig filterConfig) throws ServletException {
    }

    @Override
    public void doFilter(final ServletRequest request, final ServletResponse response, final FilterChain chain) throws IOException, ServletException {
        HttpServletResponse resp = (HttpServletResponse) response;
        HttpServletRequest req = (HttpServletRequest) request;
        resp.setHeader("Access-Control-Allow-Origin", "*");
        resp.setHeader("Access-Control-Allow-Methods", "*");
        resp.setHeader("Access-Control-Max-Age", "3600");
        resp.setHeader("Access-Control-Allow-Headers", "x-requested-with, authorization, Content-Type, Authorization, credential, X-XSRF-TOKEN");

    }

    @Override
    public void destroy() {
    }
}
```

However, to use this filter with secured resources, the preflight check will raise a **401 Unauthorized** error in the browser. That is because the prelight `OPTIONS` request doesn't have any authorization header with it to be sent to the server.

## Solution

Intercept the preflight `OPTIONS` response and set the response as a 2XX status code.

```java
    @Override
    public void doFilter(final ServletRequest request, final ServletResponse response, final FilterChain chain) throws IOException, ServletException {
      // set headers.. omitted for brevity

        if ("OPTIONS".equalsIgnoreCase(req.getMethod())) {
            resp.setStatus(HttpServletResponse.SC_OK);
        } else {
            chain.doFilter(request, response);
        }
    }
```

## Lesson Learnt
- `OPTIONS` preflight check could be intercepted and set a success status code back to the client to proceed with the actual request.

