---
title: 'Override Enum Methods with Constant Specific Class Body'
date: 2018-11-20 17:00:00
---
This article shows one advanced technique when using enums - constant specific class body.
<!-- Excerpt End -->

Enum is a specialized class whose instances are created and managed completely by JVM. So we should never invoke constructors of an enum, otherwise there might be a meltdown of the JVM, and fortunately, our loyal friend compiler always help us catching the error before it happens. Most of the time we use enum for two purposes -- to create either singleton or a list of predefined enumerable list.

Given the following scenario, create an enum of currency that is supported by a vending machine, we might end up with the following enum:

```java
public enum Currency {
    QUARTER(0.25),
    ONE_DOLLAR(1),
    FIVE_DOLLAR(5);

    private double value;

    Currency(final double value) {
        this.value = value;
    }

    public double getValue() {
        return value;
    }
}
```

Now our vending machine also needs to know if the money inserted is a *note* or a *coin*, we will need to provide such information in our enum type. e.g. adding a getter method that uses a switch to determine which instances and its associated money type:

```java
public enum Currency {
    QUARTER(0.25),
    ONE_DOLLAR(1),
    FIVE_DOLLAR(5);

    private double value;

    Currency(final double value) {
        this.value = value;
    }

    public double getValue() {
        return value;
    }

    public String getType() {
        switch (this) {
            case QUARTER:
                return "coin";
            default:
                return "note";
        }
    }
}
```

Let's think about this, when an enum instance is referenced, the exact instance is already determined. In the above `getType()` implementation, knowing that we already know what exact instance we are using, we still have to make a check with a `switch-case` block, it seems unnecessary. Java provides a nicer way to solve this problem. We could give the majority the same type of behavior while specially treat the minority. In this case, instead of using a `switch-case` block, we simply return the `"note"` to all instances as both one-dollar and two-dollar are note. As for the quarter, we could treat that instance as an anonymous class and override this `getType()` method to return `"coin"`:

```java
public enum Currency {
    QUARTER(0.25) {
        @Override
        public String getType() {
            return "coin";
        }
    },
    ONE_DOLLAR(1),
    FIVE_DOLLAR(5);

    private double value;

    Currency(final double value) {
        this.value = value;
    }

    public double getValue() {
        return value;
    }

    public String getType() {
        return "note";
    }
}
```

This block after the `QUARTER` instance is called *constant specific class body*. This pair of braces is just like the body to a class, where all methods could be overridden, and the `@Override` annotation is optional - just like with any class overriden methods.

## Abstract Methods

Can enum be abstract? The answer is **NO**. However, enum class methods could be abstract. To fulfill the contract of a concrete class with abstract methods, these abstract methods must be overridden for all its instances.

If we change the above code to define an abstract `getType()` instead, we must override this method for all instances of this enum class:

```java
public enum Currency {
    QUARTER(0.25) {
        @Override
        public String getType() {
            return "coin";
        }
    },
    ONE_DOLLAR(1) {
        @Override
        public String getType() {
            return "note";
        }
    },
    FIVE_DOLLAR(5) {
        @Override
        public String getType() {
            return "note";
        }
    };

    private double value;

    Currency(final double value) {
        this.value = value;
    }

    public double getValue() {
        return value;
    }

    public abstract String getType();
}
```
 