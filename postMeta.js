module.exports={"/2018/04/dependency-injection-and-inversion-of-control":{"title":"Dependency Injection and Inversion of Control","summary":"We often mix the Dependency Injection (DI) with the Inversion of Control (IoC). In fact, DI is one form of IoC. This article clarifies the terms.</p>\n"},"/2018/04/java-servlet-cors-filter-with-preflight-options":{"title":"Java Servlet CORS Filter with  Preflight  Options","summary":"A CORS filter determines what types of access control header will be set for the server response to the client&#39;s request.  However, when the resource being accessed is behind a security layer, in order to send the payload to the security filters, an optional request by browsers is sent to the server before the actual request. This lesson presents one implementation of a CORS filter that supports preflight options request.</p>\n"},"/2018/04/spring-data-substitutes-objectmapper":{"title":"Spring Data Substitutes ObjectMapper","summary":"Most times when we need a DTO mapping from our persistent entity, we would think of using an ObjectMapper. However, with the help of the Spring Data, you might not need an ObjectMapper. This lesson presents a solution to use Spring Data to replace simple ObjectMapper use case.</p>\n"},"/2018/05/add-model-attributes-to-layout-template":{"title":"Add Model Attributes to Layout Template","summary":"<code>@ControllerAdvice</code> is widely used to create exception handlers in a cross-cutting way when writing a Spring MVC or REST application. It could also be used to solve adding model attributes to any groups of controllers so that the model could be shared in some specific views such as a layout template. This lesson teaches the strategy to use <code>@ControllerAdvice</code> annotation to solve this problem.</p>\n"},"/2018/05/behavioral-patterns-chain-of-responsibility-pattern-exercise":{"title":"Behavioral Patterns - Chain of Responsibility Pattern Exercise","summary":"The Chain of Responsibility Pattern is very useful to avoid coupling the sender of a request to its receiver by giving more than one object a chance to handle the request. Chain the receiving objects and pass the request along with the chain until an object handles it. We will implement a naïve security filter chain using this pattern in our practice exercise. You will certainly enjoy this exercise as it is a great way to get you totally master this pattern.</p>\n"},"/2018/05/behavioral-patterns-command-pattern-exercise":{"title":"Behavioral Patterns - Command Pattern Exercise","summary":"The Command Pattern is almost the second most popular pattern after the Singleton Pattern. It can be used to encapsulate each request to an object and turn the client application to a stateless application while the delegated object who receives the invocation persists its own state. In this exercise, we will create an operation manager which basically can change some state and undo the changes. The example I created is a Document Writer, which can write lines and undo the lines are written. For more challenge, there is also a bonus point – a custom data structure that you will need to implement --  to mimic preventing the system crashing from not-enough-memory.</p>\n"},"/2018/05/behavioral-patterns-iterator-pattern-exercise":{"title":"Behavioral Patterns - Iterator Pattern Exercise","summary":"The iterator pattern is widely used in collections, it simplifies the way a collection could be iterated as well as provides a mutable capability to the collection during the iteration.</p>\n"},"/2018/05/behavioral-patterns-mediator-pattern-exercise":{"title":"Behavioral Patterns - Mediator Pattern Exercise","summary":"The Mediator Pattern defines an object that encapsulates how a set of objects interact. In this exercise, we will create a mediator that helps us handle the cross-cutting business logic in the Command Pattern Exercise.</p>\n"},"/2018/05/spring-transactional-isolation-level":{"title":"Spring @Transactional - Isolation Level","summary":"Spring <code>@Transactional</code> annotation is concise and powerful. To understand what&#39;s the best property setting for your use case in this annotation could be confusing if you don&#39;t clearly understand what transaction management key concepts are. In this series, we will talk about the key concepts in transaction management that could be configured through the <code>@Transactional</code> annotation. This article focuses on the isolation level and its side effects.</p>\n"},"/2018/05/spring-transactional-propagation-type":{"title":"Spring @Transactional - Propagation Type","summary":"Spring <code>@Transactional</code> annotation is concise and powerful. To understand what&#39;s the best property setting for your use case in this annotation could be confusing if you don&#39;t clearly understand what transaction management key concepts are. In this series, we will talk about the key concepts in transaction management that could be configured through the <code>@Transactional</code> annotation. This article focuses on the propagation type.</p>\n"},"/2018/06/behavioral-patterns-memento-pattern-exercise":{"title":"Behavioral Patterns - Memento Pattern Exercise","summary":"The Memento Pattern is used to record the internal state of an object. It is used to create a state machine and also makes undo or redo operation very easy with this pattern. In this exercise, we will use a scenario of account and account manager to understand the components of this pattern.</p>\n"},"/2018/06/behavioral-patterns-observer-pattern-exercise":{"title":"Behavioral Patterns - Observer Pattern Exercise","summary":"The Observer Pattern is widely used to solve one-to-many object state changes notification problems. The pub/sub model uses the Observer Pattern as the base pattern. It is also used in the event-driven systems. In this exercise, we will create a naive implementation of the pub/sub model to understand the components of the Observer Pattern.</p>\n"},"/2018/06/behavioral-patterns-state-pattern-exercise":{"title":"Behavioral Patterns - State Pattern Exercise","summary":"The State Pattern allows an object to alter its behavior when its internal state changes. It tremendously reduces the complexity when introducing more states later to the object. In this exercise, we will use the State Pattern to create a modern vending machine to understand the components of the State Pattern.</p>\n"},"/2018/07/behavioral-patterns-strategy-pattern-exercise":{"title":"Behavioral Patterns - Strategy Pattern Exercise","summary":"The Strategy Pattern defines a family of algorithms, encapsulates each one, and makes them interchangeable. Strategy lets the algorithm vary independently from clients that use it. In this exercise, we will use the Strategy Pattern to create a simplified <a target=\"_blank\" href=\"https://worldofwarcraft.com/en-us/game/races\"><i class=\"external alternate icon\"></i> Race</a>  model from the popular game <strong>World of Warcraft</strong>.</p>\n"},"/2018/07/behavioral-patterns-template-method-pattern-exercise":{"title":"Behavioral Patterns - Template Method Pattern Exercise","summary":"The Template Method Pattern defines the skeleton of an algorithm in a method, deferring some steps to subclasses. Template Method lets subclasses redefine certain steps of an algorithm without changing the algorithm’s structure. In this exercise, we will use the Template Method Pattern to create a Three Course Dinner Template for training restaurant staff for preparing the meal.</p>\n"},"/2018/07/behavioral-patterns-visitor-pattern-exercise":{"title":"Behavioral Patterns - Visitor Pattern Exercise","summary":"The Visitor Pattern represents an operation to be performed on elements of an object structure. Visitor lets you define a new operation without changing the classes of the elements on which it operates. In this exercise, we will create a bookstore inventory structure that collects books, movies, and music. We will add shared behaviors across this hierarchical structure by using the Visitor Pattern.</p>\n"},"/2018/08/java-8-time-package-and-locale":{"title":"Java 8 Time Package and Locale","summary":"Java 8 provides an extensive time computational package -  <code>java.time</code> that is recommended for any new code to use because it provides so many helper methods to compute time and easily used with <code>java.util.Locale</code> class to support localization <em>(l10n)</em> and internationalization <em>(i18n)</em>. In this article, we will learn some most useful operations using the <code>java.time</code> package with <code>java.util.Locale</code> class through a scenario of  <a href=\"https://www.olympic.org/beijing-2022\" target=\"_blank\">Beijing Winter Olympic Game</a> opening day reminder.</p>\n"},"/2018/08/load-and-store-properties-file":{"title":"Load and Store Properties File","summary":"Properties files are usually used to externalize configuration from applications to text files. This article introduces the syntax and usage of properties files.</p>\n"},"/2018/08/locale-and-resource-bundles":{"title":"Locale and Resource Bundles","summary":"Resource bundles allow you to move locale-specific information out from your main source code to a properties file or a java class. In this article, we will introduce the usage of both implementations of the <code>ResourceBundle</code> interface -- <code>PropertyResourceBundle</code> and <code>ListResourceBundle</code> class.</p>\n"},"/2018/08/useful-file-java-io-mini-api":{"title":"Useful File java.io Mini API","summary":"Java io is a very extensive library. There are numerous ways and combinations to write/read data on a file. This article summaries some very useful classes in <code>java.io</code> package.</p>\n"},"/2018/09/building-an-efficient-cache":{"title":"Building an Efficient Cache","summary":"To build a cache could be as simple as to just to use a key-value pair kind data structure. It works sufficient most of the time in a single-threaded application. However, when there are many clients access the same cache while the computation being conducted can yield duplicated caching attempts thus defeat the purpose of caching, which is to avoid duplicated computation. This article introduces the existing caching patterns and discusses the key points to create an efficient cache.</p>\n"},"/2018/09/java-basic-serialization":{"title":"Java Basic Serialization","summary":"Serialization includes the part that serializes an object to a file and deserializes a file to an object that has the desired same state as it was in. It is typically done by using two high-level classes from the <code>java.io</code> package - <code>ObjectOutputStream</code> and <code>ObjectInputStream</code>. In this article, we demonstrate the basic operations of serializing and deserializing.</p>\n"},"/2018/10/batch-patterns-in-webmethods":{"title":"Batch Patterns in WebMethods","summary":"Having been working with WebMethods Integration Platform from Software AG for about a year now on a large integration project with many vendor components such as SAP, CityWorks, ArcGIS Server, from knowing nothing about WebMethods to building reliable and robust integration services, following established patterns is inescapable. However, the access to the proprietary software WebMethods and its documentation is limited to the public, we found a hard time to find the best practice for our batch operations. This article shows some patterns we learnt and tested with confidence that you might find helpful in your development with WebMethods.</p>\n"},"/2018/10/entity-graphs-for-lazy-loading":{"title":"Entity Graphs for Lazy Loading","summary":"<em>Entity Graphs</em> are templates for persistence query. One common problem it solves is <em>Lazy Loading</em>. This article introduces the basics of <em>Entity Graphs</em> and how to use <em>Entity Graphs</em> with <em>JPA</em> and <em>Spring Data</em> to solve the <em>Lazy Loading</em>.</p>\n"},"/2018/10/entity-mapping-with-inheritance-in-hibernate":{"title":"Entity Mapping with Inheritance in Hibernate","summary":"Inheritance could be enabled in Hibernate with the <code>@MappedSuperclass</code> annotation. This annotation could greatly reduce the boilerplate in our entity mapping.</p>\n"},"/2018/10/exception-handling-in-webmethods":{"title":"Exception Handling in WebMethods","summary":"<code>Try-Catch</code> block is commonly used to try a risky operation and catch the exception it may raise. This article shows the trick to do the similar thing without writing java code in a flow service with WebMethods.</p>\n"},"/2018/10/handle-non-encoded-request-url":{"title":"Handle Non-encoded Request URL","summary":"Normally we need to encode the request URL from the client before sending a request to the server, but there may be just one time that you really can&#39;t enforce the client to encode their request URL and sometimes it contains special characters that will make the server mark them as illegal characters in the request. This article shows an example of how to use a filter to preprocess the request on the server side.</p>\n"},"/2018/10/overwriting-spring-security-context-through-filter":{"title":"Overwriting Spring Security Context through Filter","summary":"This article presents a strategy that overwrites the spring security context in order to allow a user to visit the resources without authenticating the user through the authentication filters.</p>\n"},"/2018/10/postgresql-and-hibernate-clob":{"title":"PostgreSQL and Hibernate CLOB","summary":"When you need a SQL data type that can hold more than 255 characters, you are likely to use some large character data type such as CLOB, BLOB. It is easy to find the right type if you know what exactly the database you will stick to. However, when we use Hibernate, it provides the annotations that support the cross-platform data type translation.</p>\n"},"/2018/10/spring-data-mongodb-gridfs-3-4":{"title":"Spring Data MongoDB GridFS 3.4","summary":"This article shows a typical usage of MongoDB GridFS with Spring Data MongoDB. This is for MongoDB java driver v3.4 and Spring Data MongoDB v1.10.x. Note that Spring Data MongoDB v2.X introduces breaking changes with the MongoDB java driver 3.6+. This article only shows the usage of the v3.4 driver with Spring Data MongoDB v1.10.x.</p>\n"},"/2018/10/spring-data-repository-query-precedence-tricks":{"title":"Spring Data Repository Query Precedence Tricks","summary":"Spring Data repository method is very handy but it also comes with its limitation, especially when composed with condition precedence. This article shows one way to work with it and its caveats.</p>\n"},"/2018/10/tomcat-invalid-character-in-request":{"title":"Tomcat Invalid Character in Request","summary":"8.5 Tomcat throws an <code>IllegalArgumentException</code> when processing request URL that has non-encoded illegal special characters. This article shows two workarounds.</p>\n"},"/2018/11/docker-useful-commands":{"title":"Docker Useful Commands","summary":"This article shows a curated list of docker commands that may be useful.</p>\n"},"/2018/11/how-to-setup-elk-stack-with-docker-for-development":{"title":"How to Setup ELK Stack with Docker for Development","summary":"This tip shows the fastest way to stand up the <em>ELK</em> stack for development.</p>\n"},"/2018/11/ie-wont-set-cookie":{"title":"IE Won't Set Cookie","summary":"This article shares a different behavior in IE than Chrome when expecting to set a cookie.</p>\n"},"/2018/11/mapping-multiple-primary-keys-in-entity-framework":{"title":"Mapping Multiple Primary Keys in Entity Framework","summary":"This tip shows one simple solution to allow multiple primary keys mapping in entities.</p>\n"},"/2018/11/override-enum-methods-with-constant-specific-class-body":{"title":"Override Enum Methods with Constant Specific Class Body","summary":"This article shows one advanced technique when using enums - constant specific class body.</p>\n"},"/2018/11/pass-parameters-to-the-executiveservice-adapter":{"title":"Pass Parameters to the ExecutiveService Adapter","summary":"This tip shows how to pass pipeline input variables to an <code>ExecutiveService</code> adapter in webMethods.</p>\n"},"/2018/11/reload-configurations-from-spring-cloud-config":{"title":"Reload Configurations from Spring Cloud Config","summary":"Spring Cloud Config Server automatically retrieves specified configurations backed on Git based Repository. To ask the affected Spring Cloud Config clients to use the updated configuration, a signal needs to be sent to the client. This article shows two approaches.</p>\n"},"/2018/11/serialize-timestamp-to-epochsecond-with-jackson":{"title":"Serialize Timestamp To EpochSecond with Jackson","summary":"Some REST API only takes a <code>long</code> as its Date field, such as <code>esriFieldTypeDate</code> from ArcGIS Server Rest API. But with the rich functionality, the Java 8 time API provides, it would be silly to use <code>long</code> as the type for our object modeling. This tip shows how to solve this problem.</p>\n"},"/2018/11/webmethods-implicit-and-explicit-transaction-management":{"title":"WebMethods Implicit and Explicit Transaction Management","summary":"It is not documented from any of the WebMethods resources that how to manage transactions implicitly and explicitly. This tip shows the missing piece that will prevent a transaction holding a connection until the transaction owner thread is killed.</p>\n"},"/2018/12/wrap-a-command-with-builder-pattern":{"title":"Wrap A Command with Builder Pattern","summary":"This article shows a well-designed way to wrap a command and expose it through API with the classic Builder pattern. In this tutorial, you will learn how to write the Builder pattern, and how to direct standard output stream and standard error stream from the command to the input stream of your API.</p>\n"},"/2019/01/creating-a-library-project-for-spring-boot":{"title":"Creating a Library Project for Spring Boot","summary":"This article introduces the key points when creating a library for spring boot project.</p>\n"},"/2019/01/recursively-move-a-directory":{"title":"Recursively Move a Directory","summary":"This article shows one effective implementation that follows the Visitor Pattern to recursively move a directory using Java NIO library.</p>\n"},"/2019/02/spring-jms-and-jpa-xa-transactions-with-weblogic":{"title":"Spring JMS and JPA XA Transactions with WebLogic","summary":"This article shows the configuration of using XA transactions with the resources managed by WebLogic server.</p>\n"},"/2019/04/distributed-transaction-management-with-rest-and-try-confirm-cancel-pattern":{"title":"Distributed Transaction Management with REST and Try Confirm/Cancel Pattern","summary":"This article introduces how to manage transactions effectively in distributed REST services with Try Confirm/Cancel (TCC) pattern. It also provides a repository that is a simplified Java implementation for anyone who is interested in learning the TCC pattern. This repository attempts to trim the most of the common boilerplate, but only preserve the minimal that could be most straightforward to observe this pattern. It could be adapted to use any backend stack.</p>\n"},"/2020/10/npm-dependency-vs-devdependency":{"title":"NPM Dependencies vs DevDependencies","summary":"When you build a JavaScript library, dependencies and devDependencies matter. This post examines\nthe difference between dependencies and devDependencies in NPM.</p>\n"},"/2020/12/scope-limited-codeblock-web-component":{"title":"Create a Scope limited Codeblock Web Component","summary":"Modern web platform allows us to write custom elements and with the assistance of shadow DOM,\nwe are able to ensure the style and behavior of the custom elements are consistent and no external styles\nor behaviors are propagated in or leaked out. This post walks through some keypoints by creating a scope\nlimited codeblock element.</p>\n"},"/2021/01/package-lock-json-explained":{"title":"Package-lock.json Explained","summary":"Since the introduction of the <code>package-lock.json</code> file from NPM, I never had a good grasp of it which lead to my\nconfusion when resolving a merge conflict that is due to the <code>package-lock.json</code> file. To understand it clearly becomes the first thing on my\nnew year&#39;s resolution list. <em>This is the way</em> how I managed to get myself understood with the <code>package-lock.json</code> file.</p>\n"},"/2021/01/serve-images-in-next-gen-formats":{"title":"Serve Images in Next-gen Formats","summary":"Serving smaller images without sacrificing the resolution quality could be finally achieved\nwith the next-gen formats. This article introduces three common next-gen formats and a tip\nto have fallback images when the browser doesn&#39;t support those.</p>\n"},"/2021/04/build-a-markdown-notes-taking-app":{"title":"Build a markdown notes taking app","summary":"I really like the experience Azure DevOps provides in a PR description section - it is a markdown editor with instant preview of the input. The feature I really like is the ability to be able to paste in any screenshots from the clipboard just makes it really easy to convey the information. I like it so much that I wish I could use it to take any notes with screenshots that I like whenever I am and also allows me to take them with when I am on a different computer.</p>\n"},"/2021/09/implement-the-lightning-algorithm":{"title":"Implement the Lightning Algorithm","summary":"I was entertaining myself with the excellent video interviews from the Numberphile project, a lightning algorithm interview from the creator of the visualization of the algorithm clearly explained the techniques used behind the scene. The explanation was so clear and the visualization was so satisfying that I felt impetuous to implement it. A few hours later, the moment of thought became realized. Here sharing a few steps that I learned from the interview and while implementing it. </p>\n"}};