---
title: 'Entity Graphs for Lazy Loading'
date: 2018-10-10 17:00:00
---
*Entity Graphs* are templates for persistence query. One common problem it solves is *Lazy Loading*. This article introduces the basics of *Entity Graphs* and how to use *Entity Graphs* with *JPA* and *Spring Data* to solve the *Lazy Loading*.
<!-- Excerpt End -->

## 1. Entity Graph Basics

The tutorial will be using the `Order` class as a persistence entity.

```java
@Entity
public class Order implements Serializable {
    @Id
    private String id;

    private LocalDateTime datetime;

    @ManyToOne(fetch=EAGER)
    private User user;

    @OneToMany(fetch=LAZY)
    private List<Item> items;

    @OneToMany(fetch=LAZY)
    private List<Payment> payments;
}
```

All fields in an entity are lazily fetched by default, so the default entity graph consists of only the fields whose `FetchType` is `EAGER`.  The exceptions are that the primary key and version fields of an entity class are always fetched.

In the above example, only `id` and `user` will be in the default entity graph.

### 1.1 Fetch Graphs

A fetch graph consists of only the fields explicitly specified in the `EntityGraph` instance, and ignores the default entity graph settings. To specify a fetch graph, set the `javax.persistence.fetchgraph` property and pass as a hint to the EntityManager.find or query operations.

In the following example, the default entity graph is ignored, and only the `items` field is included in the dynamically created fetch graph:

```java
EntityGraph<Order> graph = em.createEntityGraph(Order.class);
graph.addAttributeNodes("items");
...
Properties props = new Properties();
props.put("javax.persistence.fetchgraph", graph);

Order order = em.find(Order.class, id, props);
```

### 1.2 Load Graphs

A load graph consists of the fields explicitly specified in the `EntityGraph` instance plus any fields in the default entity graph. To specify a load graph, set the `javax.persistence.loadgraph` property as a hint to the `EntityManager.find` or query operations.

In the following example, the load graph contains alll the fields in the default entity plus the `items` field:

```java
EntityGraph<Order> graph = em.createEntityGraph(Order.class);
graph.addAttributeNodes("items");
...
Properties props = new Properties();
props.put("javax.persistence.loadgraph", graph);

Order order = em.find(Order.class, id, props);
```

##  2. Named Entity Graph

`@NamedEntityGraph` annotation is commonly used to create named entity graphs. When no other attributes are specified in this annotation, the default entity graph is used.

In the following example, only `id` and `user` will be eagerly fetched in either a load graph or fetch graph.

```java
@NamedEntityGraph
@Entity
public class Order implements Serializable {
    @Id
    private String id;

    private LocalDateTime datetime;

    @ManyToOne(fetch=EAGER)
    private User user;

    @OneToMany(fetch=LAZY)
    private List<Item> items;

    @OneToMany(fetch=LAZY)
    private List<Payment> payments;
}
```

We could also add fields to be eagerly fetched to the entity graph by specifying them in the `attributeNodes` property of the graph annotation with `@NamedAttributeNode`, which could also include subgraphs if there is a third layer of the relation between the named attribute and its sub-attribute.

In the following example, two entity graphs are created, and the following table shows the fields will be eagerly fetched in a fetch graph and load graph.

|Name|Fetch Graph|Load Graph|
|---|---|---|
|**graph.order.items**|`id`,`items`|`id`,`items`, `user`|
|**graph.order.items.payments**|`id`,`items`,`payments`|`id`,`items`,`payments`,`user`|

```java
@NamedEntityGraphs({
	@NamedEntityGraph({
		name = "graph.order.items",
		attributeNodes = {
			@NamedAttributeNode("items")
		}
	}),
	@NamedEntityGraph({
		name = "graph.order.items.payments",
		attributeNodes = {
			@NamedAttributeNode("items"),
			@NamedAttributeNode("payments")
		}
	})
})
@Entity
public class Order implements Serializable {
    @Id
    private String id;

    private LocalDateTime datetime;

    @ManyToOne(fetch=EAGER)
    private User user;

    @OneToMany(fetch=LAZY)
    private List<Item> items;

    @OneToMany(fetch=LAZY)
    private List<Payment> payments;
}
```

### 2.1 With JPA 2.1

Similar to the example earlier, when using the `EntityManger.find`, the pattern is to get the entity graph instead of creating one.

```java
EntityGraph<Order> graph = em.getEntityGraph("graph.order.items");

Properties props = new Properties();
props.put("javax.persistence.loadgraph", graph); // or using a fetch graph.

Order order = em.find(Order.class, id, props);
```

When using query operations, the pattern is to get the entity graph first and call the `Query.setHint` method to pass in a key-value pair where the key is the graph type and the value is the entity graph.

```java
EntityGraph<Order> graph = em.getEntityGraph("graph.order.items");

List<Order> orders = em.createNamedQuery("findAllOrdersWithItems")
    .setHint("javax.persistence.loadgraph", graph)
    .getResultList();
```

### 2.2 With Spring Data

`@EntityGraph` annotation is used on any JPA data access methods that need to be applied with a named entity graph. when the graph type is not specified, a fetch graph will be used.

```java
public interface OrderRepository extends PagingAndSortingRepository<Order, String> {

    @EntityGraph(value="graph.order.items", type=LOAD)
    List<Order> findByUserWithItems(User user);

    @EntityGraph(value="graph.order.items.payments", type=LOAD)
    List<Order> findByUserWithItemsPayments(User user);
}
```

## 3. Summary

We learnt the basics of the entity graph from this tutorial by covering difference between fetch graphs and load graphs. We then learnt using annotation approach to declare named entity graphs and how to use them with JPA `EntityManager` and with Spring data `@EntityGraph` annotation. By using entity graphs, we could easily apply lazy-loading to our data access layer while balancing efficient queries.
