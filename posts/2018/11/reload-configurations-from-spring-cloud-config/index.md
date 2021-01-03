---
title: 'Reload Configurations from Spring Cloud Config'
date: '2018-11-13 17:00:00'
---
Spring Cloud Config Server automatically retrieves specified configurations backed on Git based Repository. To ask the affected Spring Cloud Config clients to use the updated configuration, a signal needs to be sent to the client. This article shows two approaches.
<!-- Excerpt End -->

## One to One Approach

With Spring Actuator project, we get a series of utility tools for administering the server. One of them is `/refresh`, upon calling this endpoint, if the application context is annotated with `@RefreshScope`, it will be signaled to refresh. This endpoint is called on the client application.

Add the following dependency to the client application, and annotate the application with `@RefreshScope`.

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
```

For instance, given the configuration server is on *localhost:8888* and the configuration client is on *localhost:8081*, to refresh the configuration on the client, an HTTP request should be made to *localhost:8081/refresh*.

## One to Many Approach

Using the `/refresh` endpoint works but when there are multiple client applications that need to be refreshed, it will be hard to maintain such a list. Of course, there is another project from Spring Cloud existing to solve this problem - Spring Cloud Config Monitor. With this project and if the Spring Cloud Bus project is also added as a dependency, it adds additional endpoint `/monitor` to the configuration server, which sends a message to a message broker and then broadcasts it to all subscribed clients.

Spring Cloud Bus works as a service bus to exchange messages from the message broker between clients and servers. The monitor endpoint is used to broadcast the changes to all spring cloud config clients that are annotated with `@RefreshScope`. **Both servers and clients depend on the service bus to exchange the message.**, so we need to add the Spring Cloud Bus dependency to both servers and clients.

In the following example, we will be using RabbitMQ as the message broker.

### 1. Cloud Config Server

Add the following dependencies to the configuration server:

```xml
<xml>
    <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-config-monitor</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-starter-bus-amqp</artifactId>
    </dependency>
</xml>
```

RabbitMQ configuration

```yml
spring:
  rabbitmq:
    host: localhost
    port: 5672
    username: guest
    password: guest
```

#### 1.1 GitHub backed configuration repository

```yml
monitor:
  github:
    enabled: true
```

Add a `PropertyPathNotificationExtractor` Bean to the configuration server:

```java
@Bean
public GithubPropertyPathNotificationExtractor bitbucketPropertyPathNotificationExtractor() {
    return new BitbucketPropertyPathNotificationExtractor();
}
```

#### 1.2 GitLab backed configuration repository

```yml
monitor:
  gitlab:
    enabled: true
```

Add a `PropertyPathNotificationExtractor` Bean to the configuration server:

```java
@Bean
public GitlabPropertyPathNotificationExtractor bitbucketPropertyPathNotificationExtractor() {
    return new BitbucketPropertyPathNotificationExtractor();
}
```

#### 1.3 BitBucket backed configuration repository

```yml
monitor:
  bitbucket:
    enabled: true
```

Add a `PropertyPathNotificationExtractor` Bean to the configuration server:

```java
@Bean
public BitbucketPropertyPathNotificationExtractor bitbucketPropertyPathNotificationExtractor() {
    return new BitbucketPropertyPathNotificationExtractor();
}
```

### 2. Cloud Config Clients

Add the following dependencies to the configuration clients:

 ```xml
<dependency>
	<groupId>org.springframework.cloud</groupId>
	<artifactId>spring-cloud-starter-bus-amqp</artifactId>
</dependency>
```

RabbitMQ configuration

```yml
spring:
  rabbitmq:
    host: localhost
    port: 5672
    username: guest
    password: guest
```

### 3. WebHooks Simulation

Sometimes it is not easy to register a webhook from a remote git repository directly to your local development environment, but to simulate what the webhook does, we could manually make a `POST` request to the configuration server `/monitor` endpoint with the git vendor specific webhook request header and body to indicate a push has been made to the remote git repository.

The different implementations of the `PropertyPathNotificationExtractor` interface extract the changed configuration YAML files from the vendor-specific request headers and body and map them to an array of paths to those YAML files relative to the repository.

The following sections demo some examples of calling the `/monitor` endpoint on the configuration server with the vendor-specific WebHooks requests headers and body from GitHub, GitLab, and BitBucket

#### 3.1 GitHub backed configuration repository

```
curl -X POST \
  http://localhost:8888/monitor \
  -H 'Content-Type: application/json' \
  -H 'X-GitHub-Event: push' \
  -d '{
	"commits": [
		{
			"modified": [
				"client-service-dev.yml"
			]
		}
	]
	
}'
```

#### 3.2 GitLab backed configuration repository

```
curl -X POST \
  http://localhost:8888/monitor \
  -H 'Content-Type: application/json' \
  -H 'X-Gitlab-Event: Push Hook' \
  -d '{
	"commits": [
		{
			"modified": [
				"client-service-dev.yml"
			]
		}
	]
	
}'
```

#### 3.3 BitBucket backed configuration repository

```
curl -X POST \
  http://localhost:8888/monitor \
  -H 'Content-Type: application/json' \
  -H 'X-Event-Key: repo:push' \
  -H 'X-Hook-UUID: 1' \
  -d '{
	"push": {
		"changes": [
			"client-service-dev.yml"
		]
	}
}'
```

