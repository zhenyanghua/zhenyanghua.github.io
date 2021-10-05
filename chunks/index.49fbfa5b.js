import{y as n,m as s}from"../index.f2716517.js";import"./time.daaab1ba.js";import{P as a}from"./index.45e58e83.js";const t=[];export default function(){return n(()=>{t.forEach(n=>new Function(n)())},[]),s`<${a} ...${{title:"Overwriting Spring Security Context through Filter",date:"2018-10-30 17:00:00"}} summary=${"<p>This article presents a strategy that overwrites the spring security context in order to allow a user to visit the resources without authenticating the user through the authentication filters.</p>\n"}>
      <article dangerouslySetInnerHTML=${{__html:'<p>It is very common that in a single-sign-on application to use a session store to persist the session information after the user has successfully signed in. Spring Session magically takes care this for us if we add <code>@enableXxxHttpSession</code> to the application configuration. While it is convenient to use an out-of-the-box solution, it is extremely helpful to implement one so each fundamental part of this pattern can be fully understood.  This insight can improve the efficiency of the code by way of a more optimal choice of scope for any session store, even to make a home-made one.</p>\n<p>We will create a <code>javax.servlet.Filter</code> implementation so we could add this filter as part of the security filter chain.</p>\n<p>The place this filter should be inserted is before the <code>SecurityContextPersistenceFilter</code>.</p>\n<p>In this example, instead of using a home-made repository for session store, we will use the <code>MongoOperationsSessionRepository</code> from the Spring Session. This repository persists the session information to a collection named <strong>sessions</strong> into the configured MongoDB instance. When manually setting up the <code>SessionRepository</code> interface, it is recommended to also manually setup the <code>GenericConverter</code> so that the session repository knows how to properly serialize and deserialize the session object.</p>\n<div class="codeblock">\n  <pre class="language-java"><span class="token keyword">private</span> <span class="token class-name">MongoOperationsSessionRepository</span> sessionRepository<span class="token punctuation">;</span>\n\n<span class="token annotation punctuation">@Autowired</span>\n<span class="token keyword">public</span> <span class="token class-name">SessionFilter</span><span class="token punctuation">(</span><span class="token keyword">final</span> <span class="token class-name">MongoOperations</span> mongoOperations<span class="token punctuation">,</span>\n                     <span class="token keyword">final</span> <span class="token class-name">AbstractMongoSessionConverter</span> sessionConverter<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    sessionRepository <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MongoOperationsSessionRepository</span><span class="token punctuation">(</span>mongoOperations<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    sessionRepository<span class="token punctuation">.</span><span class="token function">setMongoSessionConverter</span><span class="token punctuation">(</span>sessionConverter<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span></pre>  \n</div><p>Assume the client will send a cookie containing session id along with the request to the server, we will get the session id from the cookie and then look it up from the session store, and in this case, it is the <code>MongoOperationsSessionRepository</code> instance. We should conduct some expected session validation checking and then start overriding the security context.</p>\n<div class="codeblock">\n  <pre class="language-java"><span class="token class-name">HttpServletRequest</span> httpRequest <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">HttpServletRequest</span><span class="token punctuation">)</span> request<span class="token punctuation">;</span>\n<span class="token class-name">Cookie</span> cookie <span class="token operator">=</span> <span class="token class-name">WebUtils</span><span class="token punctuation">.</span><span class="token function">getCookie</span><span class="token punctuation">(</span>httpRequest<span class="token punctuation">,</span> COOKIE_NAME<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token keyword">if</span> <span class="token punctuation">(</span>cookie <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">String</span> sessionId <span class="token operator">=</span> cookie<span class="token punctuation">.</span><span class="token function">getValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">MongoExpiringSession</span> session <span class="token operator">=</span> sessionRepository<span class="token punctuation">.</span><span class="token function">getSession</span><span class="token punctuation">(</span>sessionId<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token keyword">if</span> <span class="token punctuation">(</span>session <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> session<span class="token punctuation">.</span><span class="token function">getExpireAt</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toInstant</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isAfter</span><span class="token punctuation">(</span><span class="token class-name">Instant</span><span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token class-name">Authentication</span> authentication <span class="token operator">=</span> session<span class="token punctuation">.</span><span class="token function">getAttribute</span><span class="token punctuation">(</span>ATTR_USER<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n        <span class="token comment">// Overwriting the security context</span>\n        <span class="token comment">// ...</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span></pre>  \n</div><p>It is a three-step process to overwrite the spring security context:</p>\n<ol>\n<li>Get the security context</li>\n<li>Set its new authentication</li>\n<li>Assign the security context to the <code>HttpSession</code></li>\n</ol>\n<div class="codeblock">\n  <pre class="language-java"><span class="token keyword">if</span> <span class="token punctuation">(</span>authentication <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">SecurityContext</span> sc <span class="token operator">=</span> <span class="token class-name">SecurityContextHolder</span><span class="token punctuation">.</span><span class="token function">getContext</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    sc<span class="token punctuation">.</span><span class="token function">setAuthentication</span><span class="token punctuation">(</span>authentication<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    httpRequest<span class="token punctuation">.</span><span class="token function">getSession</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span>\n        <span class="token punctuation">.</span><span class="token function">setAttribute</span><span class="token punctuation">(</span>SPRING_SECURITY_CONTEXT_KEY<span class="token punctuation">,</span> sc<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span></pre>  \n</div><p>Follow these above steps, we get ourselves a security context with our new authentication! </p>\n'}}/>
    </${a}>`}