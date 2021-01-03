---
title: 'Load and Store Properties File'
date: 2018-08-26 17:00:00
---
Properties files are usually used to externalize configuration from applications to text files. This article introduces the syntax and usage of properties files.
<!-- Excerpt End -->

`java.util.Properties` class allows developers to load, change, store properties easily while providing a way to optionally save it in a filesystem.

# Syntax Rules
1. Since a property file is just a text file and read as an input stream, it could have any name and any extension.
2. it could have two styles of commenting: `! comments...` or `# comments...` (space after the initial character is optional).
3. A backslash could be used to break up a single line into multiple lines.
4. Properties files contain key-value pairs. Key-value pair could be defined as `key=value`, `key:value`, `key value`.
5. space around the value is ignored when reading the file.

# Usage

## System Properties

```java
import java.util.Properties;

class SysProps {
  public static void main(String... args) {
    Properties sysProps = System.getProperties();
    sysProps.setProperty("foo", "bar");
    sysProps.list(System.out);
  }
}
```
This outputs:
```
...
java.vm.info=mixed mode
java.version=1.8.0_181
foo=bar
java.ext.dirs=/Users/hua/Library/Java/Extensions:/L...
...
```

## Store as a Properties File
```java
import java.util.Properties;
import java.io.FileOutputStream;
import java.io.IOException;

class Props1 {
  public static void main(String... args) {
    Properties p = new Properties();
    p.setProperty("k1", "v1");
    p.setProperty("k2", "v2");
    p.list(System.out);
    try(FileOutputStream out =
        new FileOutputStream("myProps1.properties")) {
      p.store(out, "The header comment");
    } catch (IOException e) {
      e.printStackTrace();
    }
  }
}
```

This outputs:
```
-- listing properties --
k2=v2
k1=v1
```
and the `myProps1.properties` looks like:
```
#The header comment
#Sun Aug 26 16:06:31 EDT 2018
k2=v2
k1=v1

```

## Reading the Saved Properties File
```java
import java.util.Properties;
import java.io.FileOutputStream;
import java.io.FileInputStream;
import java.io.IOException;

class Props2 {
  public static void main(String... args) {
    Properties p = new Properties();
    try(FileInputStream in = new FileInputStream("myProps1.properties");
      FileOutputStream out = new FileOutputStream("myProps2.properties");) {
      p.load(in);
      p.list(System.out);
      p.setProperty("k3", "v3");
      p.list(System.out);
      p.store(out, "A different header comment");
    } catch (IOException e) {
      e.printStackTrace();
    }
  }
}
```

This outputs:
```
-- listing properties --
k2=v2
k1=v1
-- listing properties --
k3=v3
k2=v2
k1=v1
```

and the `myProps2.properties` file looks like:
```
#A different header comment
#Sun Aug 26 16:07:34 EDT 2018
k3=v3
k2=v2
k1=v1

```

# Useful methods
```java
String getProperty(String key)

void list(PrintStream out)

void load(InputStream inStream)

Object setProperty(String key, String value)

void store(OutputStream outStream, String headerComment)
```
