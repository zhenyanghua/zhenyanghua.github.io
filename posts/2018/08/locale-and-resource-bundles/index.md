---
title: 'Locale and Resource Bundles'
date: 2018-08-26 17:00:00
---
Resource bundles allow you to move locale-specific information out from your main source code to a properties file or a java class. In this article, we will introduce the usage of both implementations of the `ResourceBundle` interface -- `PropertyResourceBundle` and `ListResourceBundle` class.
<!-- Excerpt End -->

# Using a Properties File

`PropertyResourceBundle` takes an `InputStream`, so you could point it to a properties file for where the locale-specific information is.

A locale properties file must have the extension of **.properties**, and optionally suffixed with **_language** or **_language_COUNTRY**. e.g. **Labels_zh.properties**, **Labels_zh_CN.properties**, **Foo_fr_CA.properties**, **Foo_de.properties**, **Foo.properties** are all legal locale properties files. The `ResourceBundle` always searches from the most specific properties first and will stop search when there is a match.

A locale properties file just looks like a normal properties file, e.g. **Labels_en_US.properties**

```
greetings=How you doing?
```
while **Labels_en_UK.properties** might be:
```
greetings=How do you do?
```

# Using a Java Class

You could extend the `ListResourceBundle` abstract class and override the abstract method `Object[][] getContents()` to returns an array of key-value pairs.  Because the return type is an array of array objects, that means the value in the key-value pair could be of any type. The class name is similar to the locale properties file name other than instead of `.properties` it uses `.java` as the extension. e.g. `Labels_fr_CA.java` is a legal name for this use, and the class might look like this:

```java
import java.util.ListResourceBundle;

public class Labels_en_CA extends ListResourceBundle {
  @Override
  protected Object[][] getContents() {
    return new Object[][] {
      {"hello", "Bonjour"},
      {"thank", new StringBuilder("merci")}
    };
  }
}
```

# Using the `ResourceBundle`

There are three steps to follow to use the `ResourceBundle` with `Locale`.

1. Create/get a `Locale` object;
2. Calling a static method to get the resource bundle with the locale object.
3. get locale-specific information from the bundle.

## Example

Labels_en.properties
```
thank=Thank you
```

Labels_en_UK.properties
```
greeting=How do you do
```

Labels_en_UK.java
```java
import java.util.ListResourceBundle;

public class Labels_en_UK extends ListResourceBundle {
  @Override
  protected Object[][] getContents() {
    return new Object[][] {
      {"elevator", "lift"},
      {"apartment", new StringBuilder("flat")}
    };
  }
}
```

LocaleLanguge.java
```java
import java.util.Locale;
import java.util.ResourceBundle;

class LocaleLanguage {
  public static void main(String... args) {

    Locale loc = args.length == 1 ? 
      new Locale(args[0]) : new Locale(args[0], args[1]);
    ResourceBundle rb = ResourceBundle.getBundle("Labels", loc);
    System.out.println(rb.getObject("apartment"));
    System.out.println(rb.getString("elevator"));
    System.out.println(rb.getString("greeting"));
    System.out.println(rb.getString("thank"));
  }
}

```

When invoked with `java LocaleLanguage`, the output follows:
```
flat
lift
How do you do
Thank you
```

The key things here are:
1. The `ResourceBundle` will search resources by their hierarchy. Begins with the most specific locale. The rules give an inheritance of the locale information from its less specific ones within its hierarchy.
2. The `ResourceBundle` will prefer `.java` over `.properties` resources within the same hierarchy.
3. When the key searched could not return any resources, a `java.util.MissingResourceException` is thrown.

