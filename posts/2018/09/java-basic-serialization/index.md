---
title: 'Java Basic Serialization'
date: 2018-09-02 17:00:00
---
Serialization includes the part that serializes an object to a file and deserializes a file to an object that has the desired same state as it was in. It is typically done by using two high-level classes from the `java.io` package - `ObjectOutputStream` and `ObjectInputStream`. In this article, we demonstrate the basic operations of serializing and deserializing.
<!-- Excerpt End -->

## Key Points in Serialization
- A class must implement `Serializable` interface before its object can be serialized.
- If a class implements `Serializable`, all its instances variables that have a reference to another object must be `transient `or the object referenced to must also implement `Serializable`.
- If an instance variable is marked `transient`, it will not be serialized.
- `private void writeObject(ObjectOutputStream oos)` and `private void readObject(ObjectInputStream ois)` could be used to manually add additional logic to the serialization process. This could be very useful to serialize objects that don't implement `Serializable`.
- `oos.defaultWriteObject()` and `ois.defaultReadObject()` could be used before custom serialization logic happens to auto-serialize serializable objects.
- `oos.writeXXX()` and `ois.readXXX()` could be used to write and read additional state in custom serialization process. The read order must be the same as the write order.
- If a superclass implements `Serializable`, its subclasses do automatically.
- If a superclass doesn't implements `Serializable`, when a subclass object is deserialized, the superclass constructor will be invoked along with its super-constructor(s). If the superclass contains constructor(s) with argument(s), it must explicitly define a nonargument constructor.


## Example

```java
import java.io.*;

public class SerializePlay {
    public static void main(String... args) {
        Dog dog = new Dog("female", new Collar(4), "wangwang");
        System.out.println("Sex: " + dog.getSex());
        try(ObjectOutputStream oos = new ObjectOutputStream(
                new FileOutputStream("dog.ser"))) {
            oos.writeObject(dog);
        } catch(IOException e) {
            e.printStackTrace();
        }
         
        try(ObjectInputStream ois = new ObjectInputStream(
                    new FileInputStream("dog.ser"))) {
            Dog dogRestored = (Dog) ois.readObject();
            System.out.println("Collar size: " + 
                    dogRestored.getCollar().getSize());
            System.out.println("Nickname: " + dogRestored.getNickname());
            System.out.println("Sex: " + dogRestored.getSex());


        } catch(IOException | ClassNotFoundException e) {
            e.printStackTrace();
        }

    }
}

class Collar {
    private int size;
   
    Collar (int size) {
        this.size = size;
    }

    int getSize() {
        return size;
    }
}

class Animal {
    private String sex;
    
    Animal() {}

    Animal(String sex) {
        this.sex = sex;
    }

    String getSex() {
        return sex;
    }
    
    void setSex(String sex) {
        this.sex = sex;
    }
}

class Dog extends Animal implements Serializable {
    transient private Collar collar;
    private String nickname;

    Dog(String sex, Collar collar, String nickname) {
        super(sex);
        this.collar = collar;
        this.nickname = nickname;
    }

    Collar getCollar() {
        return collar;
    }

    String getNickname() {
        return nickname;
    }

    private void writeObject(ObjectOutputStream oos) {
        try {
            oos.defaultWriteObject();
            oos.writeInt(collar.getSize());
            oos.writeObject(getSex());
        } catch(IOException e) {
            e.printStackTrace();
        }
    }

    private void readObject(ObjectInputStream ois) {
        try {
            ois.defaultReadObject();
            collar = new Collar(ois.readInt());
            setSex((String) ois.readObject());
        } catch(IOException | ClassNotFoundException e) {
            e.printStackTrace();
        }
    }
}
```