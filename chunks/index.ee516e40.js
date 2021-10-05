import{y as n,m as a}from"../index.bee3551d.js";import"./time.daaab1ba.js";import{P as s}from"./index.1d2dfe8d.js";const t=[];export default function(){return n(()=>{t.forEach(n=>new Function(n)())},[]),a`<${s} ...${{title:"Spring JMS and JPA XA Transactions with WebLogic",date:"2019-02-26 17:00:00"}} summary=${"<p>This article shows the configuration of using XA transactions with the resources managed by WebLogic server.</p>\n"}>
      <article dangerouslySetInnerHTML=${{__html:'<p>There are three parts of configurations for this XA transactions to work - JMS, JPA and JTA. Both JMS and JPA are acquired through the JNDI registry and the XA transaction manager implementation uses the one from the WebLogic server. This configuration relies on WebLogic server. The concept should be similar and applicable to other JEE application servers. With these configurations, we could easily use <code>@Transactional</code> annotation on the services for XA transactions.</p>\n<h3>\n  <a id="-code-jmsconfiguration-java-code-excerpt" class="anchor" aria-hidden="true" href="#-code-jmsconfiguration-java-code-excerpt">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a><code>JmsConfiguration.java</code> Excerpt</h3><div class="codeblock">\n  <pre class="language-java"><span class="token annotation punctuation">@Configuration</span>\n<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">JmsConfiguration</span> <span class="token punctuation">{</span>\n    \n    <span class="token comment">// properties...</span>\n\n    <span class="token annotation punctuation">@Bean</span>\n    <span class="token keyword">public</span> <span class="token class-name">ConnectionFactory</span> <span class="token function">connectionFactory</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> <span class="token function">lookupByJndiTemplate</span><span class="token punctuation">(</span>jmsConnectionFactory<span class="token punctuation">,</span> <span class="token class-name">ConnectionFactory</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token annotation punctuation">@Bean</span>\n    <span class="token keyword">public</span> <span class="token class-name">JndiTemplate</span> <span class="token function">jndiTemplate</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token class-name">JndiTemplate</span> jndiTemplate <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">JndiTemplate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        jndiTemplate<span class="token punctuation">.</span><span class="token function">setEnvironment</span><span class="token punctuation">(</span><span class="token function">getJndiProperties</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token keyword">return</span> jndiTemplate<span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token annotation punctuation">@Bean</span>\n    <span class="token keyword">public</span> <span class="token class-name">JmsTemplate</span> <span class="token function">jmsTemplate</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Throwable</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">JmsTemplate</span><span class="token punctuation">(</span><span class="token function">connectionFactory</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token comment">// local methods...</span>\n    \n<span class="token punctuation">}</span></pre>  \n</div><p>Convient methods:</p>\n<div class="codeblock">\n  <pre class="language-java"><span class="token keyword">protected</span> <span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">></span></span> <span class="token class-name">T</span> <span class="token function">lookupByJndiTemplate</span><span class="token punctuation">(</span><span class="token class-name">String</span> jndiName<span class="token punctuation">,</span> <span class="token class-name">Class</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">></span></span> requiredType<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n\n    <span class="token keyword">try</span> <span class="token punctuation">{</span>\n        <span class="token class-name">Object</span> located <span class="token operator">=</span> <span class="token function">jndiTemplate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">lookup</span><span class="token punctuation">(</span>jndiName<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token keyword">if</span> <span class="token punctuation">(</span>located <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">NameNotFoundException</span><span class="token punctuation">(</span><span class="token string">"JNDI object with ["</span> <span class="token operator">+</span> jndiName <span class="token operator">+</span> <span class="token string">"] not found"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n        <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token class-name">T</span><span class="token punctuation">)</span> located<span class="token punctuation">;</span>\n    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">NamingException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n    <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">private</span> <span class="token class-name">Properties</span> <span class="token function">getJndiProperties</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">final</span> <span class="token class-name">Properties</span> jndiProps <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Properties</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    jndiProps<span class="token punctuation">.</span><span class="token function">setProperty</span><span class="token punctuation">(</span><span class="token class-name">Context</span><span class="token punctuation">.</span>INITIAL_CONTEXT_FACTORY<span class="token punctuation">,</span> jmsInitContextFactory<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    jndiProps<span class="token punctuation">.</span><span class="token function">setProperty</span><span class="token punctuation">(</span><span class="token class-name">Context</span><span class="token punctuation">.</span>PROVIDER_URL<span class="token punctuation">,</span> jmsUrl<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">return</span> jndiProps<span class="token punctuation">;</span>\n<span class="token punctuation">}</span></pre>  \n</div><h3>\n  <a id="-code-jpaconfiguration-java-code-excerpt" class="anchor" aria-hidden="true" href="#-code-jpaconfiguration-java-code-excerpt">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a><code>JpaConfiguration.java</code> Excerpt</h3><div class="codeblock">\n  <pre class="language-java"><span class="token annotation punctuation">@Configuration</span>\n<span class="token annotation punctuation">@DependsOn</span><span class="token punctuation">(</span><span class="token string">"transactionManager"</span><span class="token punctuation">)</span>\n<span class="token annotation punctuation">@EnableJpaRepositories</span><span class="token punctuation">(</span>basePackages <span class="token operator">=</span> <span class="token string">"com.leafyjava.xa-demo-weblogic.repositories"</span><span class="token punctuation">,</span> entityManagerFactoryRef <span class="token operator">=</span> <span class="token string">"entityManager"</span><span class="token punctuation">)</span>\n<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">JpaConfiguration</span> <span class="token punctuation">{</span>\n    \n    <span class="token comment">// properties....</span>\n\n    <span class="token annotation punctuation">@Autowired</span>\n    <span class="token keyword">private</span> <span class="token class-name">JmsConfiguration</span> jmsConfiguration<span class="token punctuation">;</span>\n\n    <span class="token annotation punctuation">@Bean</span>\n    <span class="token keyword">public</span> <span class="token class-name">JpaVendorAdapter</span> <span class="token function">jpaVendorAdapter</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token class-name">HibernateJpaVendorAdapter</span> hibernateJpaVendorAdapter <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HibernateJpaVendorAdapter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        hibernateJpaVendorAdapter<span class="token punctuation">.</span><span class="token function">setShowSql</span><span class="token punctuation">(</span>showSql<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        hibernateJpaVendorAdapter<span class="token punctuation">.</span><span class="token function">setGenerateDdl</span><span class="token punctuation">(</span>showDdl<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        hibernateJpaVendorAdapter<span class="token punctuation">.</span><span class="token function">setDatabase</span><span class="token punctuation">(</span><span class="token class-name">Database</span><span class="token punctuation">.</span>SQL_SERVER<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token keyword">return</span> hibernateJpaVendorAdapter<span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token annotation punctuation">@Bean</span>\n    <span class="token keyword">public</span> <span class="token class-name">DataSource</span> <span class="token function">dataSource</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">NamingException</span> <span class="token punctuation">{</span>\n\n        <span class="token keyword">return</span> jmsConfiguration<span class="token punctuation">.</span><span class="token function">lookupByJndiTemplate</span><span class="token punctuation">(</span>jdbcJndi<span class="token punctuation">,</span> <span class="token class-name">DataSource</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token annotation punctuation">@Bean</span>\n    <span class="token annotation punctuation">@DependsOn</span><span class="token punctuation">(</span><span class="token string">"transactionManager"</span><span class="token punctuation">)</span>\n    <span class="token keyword">public</span> <span class="token class-name">LocalContainerEntityManagerFactoryBean</span> <span class="token function">entityManager</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span>  <span class="token class-name">Throwable</span> <span class="token punctuation">{</span>\n        <span class="token class-name">Properties</span> properties <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Properties</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        properties<span class="token punctuation">.</span><span class="token function">setProperty</span><span class="token punctuation">(</span><span class="token string">"hibernate.transaction.jta.platform"</span><span class="token punctuation">,</span> <span class="token class-name">WeblogicJtaPlatform</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        properties<span class="token punctuation">.</span><span class="token function">setProperty</span><span class="token punctuation">(</span><span class="token string">"javax.persistence.transactionType"</span><span class="token punctuation">,</span> <span class="token string">"JTA"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n        <span class="token class-name">LocalContainerEntityManagerFactoryBean</span> entityManager <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">LocalContainerEntityManagerFactoryBean</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        entityManager<span class="token punctuation">.</span><span class="token function">setJtaDataSource</span><span class="token punctuation">(</span><span class="token function">dataSource</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        entityManager<span class="token punctuation">.</span><span class="token function">setJpaVendorAdapter</span><span class="token punctuation">(</span><span class="token function">jpaVendorAdapter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        entityManager<span class="token punctuation">.</span><span class="token function">setPackagesToScan</span><span class="token punctuation">(</span><span class="token string">"com.leafyjava.xa-demo-weblogic.domains"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        entityManager<span class="token punctuation">.</span><span class="token function">setPersistenceUnitName</span><span class="token punctuation">(</span><span class="token string">"xa-sql-persistent-unit"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        entityManager<span class="token punctuation">.</span><span class="token function">setJpaProperties</span><span class="token punctuation">(</span>properties<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n        <span class="token keyword">return</span> entityManager<span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span></pre>  \n</div><h3>\n  <a id="-code-jtaconfiguration-java-code-excerpt" class="anchor" aria-hidden="true" href="#-code-jtaconfiguration-java-code-excerpt">\n    <svg class="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a><code>JtaConfiguration.java</code> Excerpt</h3><div class="codeblock">\n  <pre class="language-java"><span class="token annotation punctuation">@Configuration</span>\n<span class="token annotation punctuation">@EnableTransactionManagement</span>\n<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">JtaConfiguration</span> <span class="token punctuation">{</span>\n\n    <span class="token annotation punctuation">@Bean</span>\n    <span class="token keyword">public</span> <span class="token class-name">PlatformTransactionManager</span> <span class="token function">transactionManager</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Throwable</span> <span class="token punctuation">{</span>\n        <span class="token class-name">WebLogicJtaTransactionManager</span> transactionManager <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">WebLogicJtaTransactionManager</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        transactionManager<span class="token punctuation">.</span><span class="token function">setTransactionManagerName</span><span class="token punctuation">(</span><span class="token string">"javax.transaction.TransactionManager"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n       \n        <span class="token keyword">return</span> transactionManager<span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span></pre>  \n</div>'}}/>
    </${s}>`}