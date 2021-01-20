import{m as e}from"../index.38ef91ca.js";import"./time.daaab1ba.js";import{P as t}from"./index.8a0fdf57.js";export default function(){return e`<${t} ...${{title:"Java Basic Serialization",date:"2018-09-02T17:00:00.000Z"}}>
      <article dangerouslySetInnerHTML=${{__html:'<h2>\n  <a id="serialization-includes-the-part-that-serializes-an-object-to-a-file-and-deserializes-a-file-to-an-object-that-has-the-desired-same-state-as-it-was-in-it-is-typically-done-by-using-two-high-level-classes-from-the-code-java-io-code-package-code-objectoutputstream-code-and-code-objectinputstream-code-in-this-article-we-demonstrate-the-basic-operations-of-serializing-and-deserializing-" class="anchor" aria-hidden="true" href="#serialization-includes-the-part-that-serializes-an-object-to-a-file-and-deserializes-a-file-to-an-object-that-has-the-desired-same-state-as-it-was-in-it-is-typically-done-by-using-two-high-level-classes-from-the-code-java-io-code-package-code-objectoutputstream-code-and-code-objectinputstream-code-in-this-article-we-demonstrate-the-basic-operations-of-serializing-and-deserializing-">\n    <svg class="icon" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>Serialization includes the part that serializes an object to a file and deserializes a file to an object that has the desired same state as it was in. It is typically done by using two high-level classes from the <code>java.io</code> package - <code>ObjectOutputStream</code> and <code>ObjectInputStream</code>. In this article, we demonstrate the basic operations of serializing and deserializing.</h2><h2>\n  <a id="key-points-in-serialization" class="anchor" aria-hidden="true" href="#key-points-in-serialization">\n    <svg class="icon" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>Key Points in Serialization</h2><ul>\n<li>A class must implement <code>Serializable</code> interface before its object can be serialized.</li>\n<li>If a class implements <code>Serializable</code>, all its instances variables that have a reference to another object must be <code>transient </code>or the object referenced to must also implement <code>Serializable</code>.</li>\n<li>If an instance variable is marked <code>transient</code>, it will not be serialized.</li>\n<li><code>private void writeObject(ObjectOutputStream oos)</code> and <code>private void readObject(ObjectInputStream ois)</code> could be used to manually add additional logic to the serialization process. This could be very useful to serialize objects that don&#39;t implement <code>Serializable</code>.</li>\n<li><code>oos.defaultWriteObject()</code> and <code>ois.defaultReadObject()</code> could be used before custom serialization logic happens to auto-serialize serializable objects.</li>\n<li><code>oos.writeXXX()</code> and <code>ois.readXXX()</code> could be used to write and read additional state in custom serialization process. The read order must be the same as the write order.</li>\n<li>If a superclass implements <code>Serializable</code>, its subclasses do automatically.</li>\n<li>If a superclass doesn&#39;t implements <code>Serializable</code>, when a subclass object is deserialized, the superclass constructor will be invoked along with its super-constructor(s). If the superclass contains constructor(s) with argument(s), it must explicitly define a nonargument constructor.</li>\n</ul>\n<h2>\n  <a id="example" class="anchor" aria-hidden="true" href="#example">\n    <svg class="icon" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>Example</h2><div class="codeblock">\n  <pre>import java.io.*;\n\npublic class SerializePlay {\n    public static void main(String... args) {\n        Dog dog = new Dog(&quot;female&quot;, new Collar(4), &quot;wangwang&quot;);\n        System.out.println(&quot;Sex: &quot; + dog.getSex());\n        try(ObjectOutputStream oos = new ObjectOutputStream(\n                new FileOutputStream(&quot;dog.ser&quot;))) {\n            oos.writeObject(dog);\n        } catch(IOException e) {\n            e.printStackTrace();\n        }\n\n        try(ObjectInputStream ois = new ObjectInputStream(\n                    new FileInputStream(&quot;dog.ser&quot;))) {\n            Dog dogRestored = (Dog) ois.readObject();\n            System.out.println(&quot;Collar size: &quot; + \n                    dogRestored.getCollar().getSize());\n            System.out.println(&quot;Nickname: &quot; + dogRestored.getNickname());\n            System.out.println(&quot;Sex: &quot; + dogRestored.getSex());\n\n\n        } catch(IOException | ClassNotFoundException e) {\n            e.printStackTrace();\n        }\n\n    }\n}\n\nclass Collar {\n    private int size;\n\n    Collar (int size) {\n        this.size = size;\n    }\n\n    int getSize() {\n        return size;\n    }\n}\n\nclass Animal {\n    private String sex;\n\n    Animal() {}\n\n    Animal(String sex) {\n        this.sex = sex;\n    }\n\n    String getSex() {\n        return sex;\n    }\n\n    void setSex(String sex) {\n        this.sex = sex;\n    }\n}\n\nclass Dog extends Animal implements Serializable {\n    transient private Collar collar;\n    private String nickname;\n\n    Dog(String sex, Collar collar, String nickname) {\n        super(sex);\n        this.collar = collar;\n        this.nickname = nickname;\n    }\n\n    Collar getCollar() {\n        return collar;\n    }\n\n    String getNickname() {\n        return nickname;\n    }\n\n    private void writeObject(ObjectOutputStream oos) {\n        try {\n            oos.defaultWriteObject();\n            oos.writeInt(collar.getSize());\n            oos.writeObject(getSex());\n        } catch(IOException e) {\n            e.printStackTrace();\n        }\n    }\n\n    private void readObject(ObjectInputStream ois) {\n        try {\n            ois.defaultReadObject();\n            collar = new Collar(ois.readInt());\n            setSex((String) ois.readObject());\n        } catch(IOException | ClassNotFoundException e) {\n            e.printStackTrace();\n        }\n    }\n}</pre>\n</div>'}}/>
    </${t}>`}