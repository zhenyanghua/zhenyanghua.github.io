---
title: 'Spring JMS and JPA XA Transactions with WebLogic'
date: '2019-02-26 17:00:00'
---
This article shows the configuration of using XA transactions with the resources managed by WebLogic server.
<!-- Excerpt End -->

There are three parts of configurations for this XA transactions to work - JMS, JPA and JTA. Both JMS and JPA are acquired through the JNDI registry and the XA transaction manager implementation uses the one from the WebLogic server. This configuration relies on WebLogic server. The concept should be similar and applicable to other JEE application servers. With these configurations, we could easily use `@Transactional` annotation on the services for XA transactions.

### `JmsConfiguration.java` Excerpt

```java
@Configuration
public class JmsConfiguration {
    
    // properties...

    @Bean
    public ConnectionFactory connectionFactory() {
        return lookupByJndiTemplate(jmsConnectionFactory, ConnectionFactory.class);
    }

    @Bean
    public JndiTemplate jndiTemplate() {
        JndiTemplate jndiTemplate = new JndiTemplate();
        jndiTemplate.setEnvironment(getJndiProperties());
        return jndiTemplate;
    }

    @Bean
    public JmsTemplate jmsTemplate() throws Throwable {
        return new JmsTemplate(connectionFactory());
    }

    // local methods...
    
}
```

Convient methods:

```java
protected <T> T lookupByJndiTemplate(String jndiName, Class<T> requiredType) {

    try {
        Object located = jndiTemplate().lookup(jndiName);
        if (located == null) {
            throw new NameNotFoundException("JNDI object with [" + jndiName + "] not found");
        }
        return (T) located;
    } catch (NamingException e) {
        e.printStackTrace();
    }
    return null;
}

private Properties getJndiProperties() {
    final Properties jndiProps = new Properties();
    jndiProps.setProperty(Context.INITIAL_CONTEXT_FACTORY, jmsInitContextFactory);
    jndiProps.setProperty(Context.PROVIDER_URL, jmsUrl);
    return jndiProps;
}
```

### `JpaConfiguration.java` Excerpt

```java
@Configuration
@DependsOn("transactionManager")
@EnableJpaRepositories(basePackages = "com.leafyjava.xa-demo-weblogic.repositories", entityManagerFactoryRef = "entityManager")
public class JpaConfiguration {
    
    // properties....

    @Autowired
    private JmsConfiguration jmsConfiguration;

    @Bean
    public JpaVendorAdapter jpaVendorAdapter() {
        HibernateJpaVendorAdapter hibernateJpaVendorAdapter = new HibernateJpaVendorAdapter();
        hibernateJpaVendorAdapter.setShowSql(showSql);
        hibernateJpaVendorAdapter.setGenerateDdl(showDdl);
        hibernateJpaVendorAdapter.setDatabase(Database.SQL_SERVER);
        return hibernateJpaVendorAdapter;
    }

    @Bean
    public DataSource dataSource() throws NamingException {

        return jmsConfiguration.lookupByJndiTemplate(jdbcJndi, DataSource.class);
    }

    @Bean
    @DependsOn("transactionManager")
    public LocalContainerEntityManagerFactoryBean entityManager() throws  Throwable {
        Properties properties = new Properties();
        properties.setProperty("hibernate.transaction.jta.platform", WeblogicJtaPlatform.class.getName());
        properties.setProperty("javax.persistence.transactionType", "JTA");

        LocalContainerEntityManagerFactoryBean entityManager = new LocalContainerEntityManagerFactoryBean();
        entityManager.setJtaDataSource(dataSource());
        entityManager.setJpaVendorAdapter(jpaVendorAdapter());
        entityManager.setPackagesToScan("com.leafyjava.xa-demo-weblogic.domains");
        entityManager.setPersistenceUnitName("xa-sql-persistent-unit");
        entityManager.setJpaProperties(properties);

        return entityManager;
    }
}
```

### `JtaConfiguration.java` Excerpt
```java
@Configuration
@EnableTransactionManagement
public class JtaConfiguration {

    @Bean
    public PlatformTransactionManager transactionManager() throws Throwable {
        WebLogicJtaTransactionManager transactionManager = new WebLogicJtaTransactionManager();
        transactionManager.setTransactionManagerName("javax.transaction.TransactionManager");
       
        return transactionManager;
    }
}
```
