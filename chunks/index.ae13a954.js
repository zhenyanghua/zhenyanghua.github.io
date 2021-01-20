import{m as n}from"../index.1da59a96.js";import"./time.daaab1ba.js";import{P as e}from"./index.4bf7c42e.js";export default function(){return n`<${e} ...${{title:"Spring JMS and JPA XA Transactions with WebLogic",date:"2019-02-26 17:00:00"}} summary=${"<p>This article shows the configuration of using XA transactions with the resources managed by WebLogic server.</p>\n"}>
      <article dangerouslySetInnerHTML=${{__html:'<p>This article shows the configuration of using XA transactions with the resources managed by WebLogic server.</p>\n\x3c!-- Excerpt End --\x3e\n\n<p>There are three parts of configurations for this XA transactions to work - JMS, JPA and JTA. Both JMS and JPA are acquired through the JNDI registry and the XA transaction manager implementation uses the one from the WebLogic server. This configuration relies on WebLogic server. The concept should be similar and applicable to other JEE application servers. With these configurations, we could easily use <code>@Transactional</code> annotation on the services for XA transactions.</p>\n<h3>\n  <a id="-code-jmsconfiguration-java-code-excerpt" class="anchor" aria-hidden="true" href="#-code-jmsconfiguration-java-code-excerpt">\n    <svg class="icon" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a><code>JmsConfiguration.java</code> Excerpt</h3><div class="codeblock">\n  <pre>@Configuration\npublic class JmsConfiguration {\n\n    // properties...\n\n    @Bean\n    public ConnectionFactory connectionFactory() {\n        return lookupByJndiTemplate(jmsConnectionFactory, ConnectionFactory.class);\n    }\n\n    @Bean\n    public JndiTemplate jndiTemplate() {\n        JndiTemplate jndiTemplate = new JndiTemplate();\n        jndiTemplate.setEnvironment(getJndiProperties());\n        return jndiTemplate;\n    }\n\n    @Bean\n    public JmsTemplate jmsTemplate() throws Throwable {\n        return new JmsTemplate(connectionFactory());\n    }\n\n    // local methods...\n\n}</pre>\n</div><p>Convient methods:</p>\n<div class="codeblock">\n  <pre>protected &lt;T&gt; T lookupByJndiTemplate(String jndiName, Class&lt;T&gt; requiredType) {\n\n    try {\n        Object located = jndiTemplate().lookup(jndiName);\n        if (located == null) {\n            throw new NameNotFoundException(&quot;JNDI object with [&quot; + jndiName + &quot;] not found&quot;);\n        }\n        return (T) located;\n    } catch (NamingException e) {\n        e.printStackTrace();\n    }\n    return null;\n}\n\nprivate Properties getJndiProperties() {\n    final Properties jndiProps = new Properties();\n    jndiProps.setProperty(Context.INITIAL_CONTEXT_FACTORY, jmsInitContextFactory);\n    jndiProps.setProperty(Context.PROVIDER_URL, jmsUrl);\n    return jndiProps;\n}</pre>\n</div><h3>\n  <a id="-code-jpaconfiguration-java-code-excerpt" class="anchor" aria-hidden="true" href="#-code-jpaconfiguration-java-code-excerpt">\n    <svg class="icon" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a><code>JpaConfiguration.java</code> Excerpt</h3><div class="codeblock">\n  <pre>@Configuration\n@DependsOn(&quot;transactionManager&quot;)\n@EnableJpaRepositories(basePackages = &quot;com.leafyjava.xa-demo-weblogic.repositories&quot;, entityManagerFactoryRef = &quot;entityManager&quot;)\npublic class JpaConfiguration {\n\n    // properties....\n\n    @Autowired\n    private JmsConfiguration jmsConfiguration;\n\n    @Bean\n    public JpaVendorAdapter jpaVendorAdapter() {\n        HibernateJpaVendorAdapter hibernateJpaVendorAdapter = new HibernateJpaVendorAdapter();\n        hibernateJpaVendorAdapter.setShowSql(showSql);\n        hibernateJpaVendorAdapter.setGenerateDdl(showDdl);\n        hibernateJpaVendorAdapter.setDatabase(Database.SQL_SERVER);\n        return hibernateJpaVendorAdapter;\n    }\n\n    @Bean\n    public DataSource dataSource() throws NamingException {\n\n        return jmsConfiguration.lookupByJndiTemplate(jdbcJndi, DataSource.class);\n    }\n\n    @Bean\n    @DependsOn(&quot;transactionManager&quot;)\n    public LocalContainerEntityManagerFactoryBean entityManager() throws  Throwable {\n        Properties properties = new Properties();\n        properties.setProperty(&quot;hibernate.transaction.jta.platform&quot;, WeblogicJtaPlatform.class.getName());\n        properties.setProperty(&quot;javax.persistence.transactionType&quot;, &quot;JTA&quot;);\n\n        LocalContainerEntityManagerFactoryBean entityManager = new LocalContainerEntityManagerFactoryBean();\n        entityManager.setJtaDataSource(dataSource());\n        entityManager.setJpaVendorAdapter(jpaVendorAdapter());\n        entityManager.setPackagesToScan(&quot;com.leafyjava.xa-demo-weblogic.domains&quot;);\n        entityManager.setPersistenceUnitName(&quot;xa-sql-persistent-unit&quot;);\n        entityManager.setJpaProperties(properties);\n\n        return entityManager;\n    }\n}</pre>\n</div><h3>\n  <a id="-code-jtaconfiguration-java-code-excerpt" class="anchor" aria-hidden="true" href="#-code-jtaconfiguration-java-code-excerpt">\n    <svg class="icon" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a><code>JtaConfiguration.java</code> Excerpt</h3><div class="codeblock">\n  <pre>@Configuration\n@EnableTransactionManagement\npublic class JtaConfiguration {\n\n    @Bean\n    public PlatformTransactionManager transactionManager() throws Throwable {\n        WebLogicJtaTransactionManager transactionManager = new WebLogicJtaTransactionManager();\n        transactionManager.setTransactionManagerName(&quot;javax.transaction.TransactionManager&quot;);\n\n        return transactionManager;\n    }\n}</pre>\n</div>'}}/>
    </${e}>`}