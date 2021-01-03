---
title: 'Handle Non-encoded Request URL'
date: 2018-10-14 17:00:00
---
Normally we need to encode the request URL from the client before sending a request to the server, but there may be just one time that you really can't enforce the client to encode their request URL and sometimes it contains special characters that will make the server mark them as illegal characters in the request. This article shows an example of how to use a filter to preprocess the request on the server side.
<!-- Excerpt End -->

## Bad URL

If you copy and paste the following URL that takes an query parameter as `input` and the value as `{"inputInfo":{"inputText":"5.00%"}} ` - a JSON literal that contains a special character `%`. Your server will most likely complain and throw an exception on this illegal character.

```
 http://localhost:8090/extract?input={"inputInfo":{"inputText":"5.00%"}} 
```

## What could be done to solve this problem from the server side?

- use Spring preprocessor bean to preprocess the request
- use Spring AspectJ to preprocess the request
- use Spring servlet filter to preprocess the request

With any of the above cross-cutting strategies, you could encode the request URL and pass back to the endpoint.

## Example

Below is one implementation using Filter. You could possibly do some caching there if you need better performance.

The key points are:

1. `HttpServletRequest` is immutable, we must use the wrapper type `HttpServletRequestWrapper` to create a `HttpServletRequest` object and pass down to the filter chain.
2. The special characters need to be manually escaped in the new `HttpServletRequest` object.
3. Apply proper caching strategies to reduce the heavy computations (this is not implemented here).

```java
@Component
public class SomeFilter implements Filter {
    private static final Logger LOGGER = LoggerFactory.getLogger(SomeFilter.class);

    @Override
    public void init(final FilterConfig filterConfig) throws ServletException {

    }

    @Override
    public void doFilter(final ServletRequest servletRequest, final ServletResponse servletResponse, final FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest) servletRequest;
        HttpServletRequest modifiedRequest = new SomeHttpServletRequest(request);
        filterChain.doFilter(modifiedRequest, servletResponse);
    }

    @Override
    public void destroy() {

    }

    class SomeHttpServletRequest extends HttpServletRequestWrapper {
        HttpServletRequest request;

        SomeHttpServletRequest(final HttpServletRequest request) {
            super(request);
            this.request = request;
        }

        @Override
        public String getQueryString() {
            String queryString = request.getQueryString();
            LOGGER.info("Original query string: " + queryString);

            try {
                // You need to escape all your non encoded special characters here
                String specialChar = URLEncoder.encode("%", "UTF-8");
                queryString = queryString.replaceAll("\\%\\%", specialChar + "%");

                String decoded = URLDecoder.decode(queryString, "UTF-8");
                LOGGER.info("Modified query string: "  + decoded);
            } catch (UnsupportedEncodingException e) {
                e.printStackTrace();
            }

            return queryString;
        }

        @Override
        public String getParameter(final String name) {
            String[] params = getParameterMap().get(name);
            return params.length > 0 ? params[0] : null;
        }

        @Override
        public Map<String, String[]> getParameterMap() {
            String queryString = getQueryString();
            return getParamsFromQueryString(queryString);
        }

        @Override
        public Enumeration<String> getParameterNames() {
            return Collections.enumeration(getParameterMap().keySet());
        }

        @Override
        public String[] getParameterValues(final String name) {
            return getParameterMap().get(name);
        }

        private Map<String, String[]> getParamsFromQueryString(final String queryString) {
            String decoded = "";
            try {
                decoded = URLDecoder.decode(queryString, "UTF-8");
            } catch (UnsupportedEncodingException e) {
                e.printStackTrace();
            }
            String[] params = decoded.split("&");
            Map<String, List<String>> collect = Stream.of(params)
                .map(x -> x.split("="))
                .collect(Collectors.groupingBy(
                    x -> x[0],
                    Collectors.mapping(
                        x -> x.length > 1 ? x[1] : null,
                        Collectors.toList())));

            Map<String, String[]> result = collect.entrySet().stream()
                .collect(Collectors.toMap(
                    x -> x.getKey(),
                    x -> x.getValue()
                        .stream()
                        .toArray(String[]::new)));

            return result;
        }
    }
}
```
