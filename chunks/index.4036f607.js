import{m as e}from"../index.1da59a96.js";import"./time.daaab1ba.js";import{P as o}from"./index.4bf7c42e.js";export default function(){return e`<${o} ...${{title:"Locale and Resource Bundles",date:"2018-08-26T17:00:00.000Z"}} summary=${"<p>Resource bundles allow you to move locale-specific information out from your main source code to a properties file or a java class. In this article, we will introduce the usage of both implementations of the <code>ResourceBundle</code> interface -- <code>PropertyResourceBundle</code> and <code>ListResourceBundle</code> class.</p>\n"}>
      <article dangerouslySetInnerHTML=${{__html:'<p>Resource bundles allow you to move locale-specific information out from your main source code to a properties file or a java class. In this article, we will introduce the usage of both implementations of the <code>ResourceBundle</code> interface -- <code>PropertyResourceBundle</code> and <code>ListResourceBundle</code> class.</p>\n\x3c!-- Excerpt End --\x3e\n\n<h1>\n  <a id="using-a-properties-file" class="anchor" aria-hidden="true" href="#using-a-properties-file">\n    <svg class="icon" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>Using a Properties File</h1><p><code>PropertyResourceBundle</code> takes an <code>InputStream</code>, so you could point it to a properties file for where the locale-specific information is.</p>\n<p>A locale properties file must have the extension of <strong>.properties</strong>, and optionally suffixed with <strong>_language</strong> or <strong>_language_COUNTRY</strong>. e.g. <strong>Labels_zh.properties</strong>, <strong>Labels_zh_CN.properties</strong>, <strong>Foo_fr_CA.properties</strong>, <strong>Foo_de.properties</strong>, <strong>Foo.properties</strong> are all legal locale properties files. The <code>ResourceBundle</code> always searches from the most specific properties first and will stop search when there is a match.</p>\n<p>A locale properties file just looks like a normal properties file, e.g. <strong>Labels_en_US.properties</strong></p>\n<div class="codeblock">\n  <pre>greetings=How you doing?</pre>\n</div><p>while <strong>Labels_en_UK.properties</strong> might be:</p>\n<div class="codeblock">\n  <pre>greetings=How do you do?</pre>\n</div><h1>\n  <a id="using-a-java-class" class="anchor" aria-hidden="true" href="#using-a-java-class">\n    <svg class="icon" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>Using a Java Class</h1><p>You could extend the <code>ListResourceBundle</code> abstract class and override the abstract method <code>Object[][] getContents()</code> to returns an array of key-value pairs.  Because the return type is an array of array objects, that means the value in the key-value pair could be of any type. The class name is similar to the locale properties file name other than instead of <code>.properties</code> it uses <code>.java</code> as the extension. e.g. <code>Labels_fr_CA.java</code> is a legal name for this use, and the class might look like this:</p>\n<div class="codeblock">\n  <pre>import java.util.ListResourceBundle;\n\npublic class Labels_en_CA extends ListResourceBundle {\n  @Override\n  protected Object[][] getContents() {\n    return new Object[][] {\n      {&quot;hello&quot;, &quot;Bonjour&quot;},\n      {&quot;thank&quot;, new StringBuilder(&quot;merci&quot;)}\n    };\n  }\n}</pre>\n</div><h1>\n  <a id="using-the-code-resourcebundle-code-" class="anchor" aria-hidden="true" href="#using-the-code-resourcebundle-code-">\n    <svg class="icon" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>Using the <code>ResourceBundle</code></h1><p>There are three steps to follow to use the <code>ResourceBundle</code> with <code>Locale</code>.</p>\n<ol>\n<li>Create/get a <code>Locale</code> object;</li>\n<li>Calling a static method to get the resource bundle with the locale object.</li>\n<li>get locale-specific information from the bundle.</li>\n</ol>\n<h2>\n  <a id="example" class="anchor" aria-hidden="true" href="#example">\n    <svg class="icon" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>Example</h2><p>Labels_en.properties</p>\n<div class="codeblock">\n  <pre>thank=Thank you</pre>\n</div><p>Labels_en_UK.properties</p>\n<div class="codeblock">\n  <pre>greeting=How do you do</pre>\n</div><p>Labels_en_UK.java</p>\n<div class="codeblock">\n  <pre>import java.util.ListResourceBundle;\n\npublic class Labels_en_UK extends ListResourceBundle {\n  @Override\n  protected Object[][] getContents() {\n    return new Object[][] {\n      {&quot;elevator&quot;, &quot;lift&quot;},\n      {&quot;apartment&quot;, new StringBuilder(&quot;flat&quot;)}\n    };\n  }\n}</pre>\n</div><p>LocaleLanguge.java</p>\n<div class="codeblock">\n  <pre>import java.util.Locale;\nimport java.util.ResourceBundle;\n\nclass LocaleLanguage {\n  public static void main(String... args) {\n\n    Locale loc = args.length == 1 ? \n      new Locale(args[0]) : new Locale(args[0], args[1]);\n    ResourceBundle rb = ResourceBundle.getBundle(&quot;Labels&quot;, loc);\n    System.out.println(rb.getObject(&quot;apartment&quot;));\n    System.out.println(rb.getString(&quot;elevator&quot;));\n    System.out.println(rb.getString(&quot;greeting&quot;));\n    System.out.println(rb.getString(&quot;thank&quot;));\n  }\n}\n</pre>\n</div><p>When invoked with <code>java LocaleLanguage</code>, the output follows:</p>\n<div class="codeblock">\n  <pre>flat\nlift\nHow do you do\nThank you</pre>\n</div><p>The key things here are:</p>\n<ol>\n<li>The <code>ResourceBundle</code> will search resources by their hierarchy. Begins with the most specific locale. The rules give an inheritance of the locale information from its less specific ones within its hierarchy.</li>\n<li>The <code>ResourceBundle</code> will prefer <code>.java</code> over <code>.properties</code> resources within the same hierarchy.</li>\n<li>When the key searched could not return any resources, a <code>java.util.MissingResourceException</code> is thrown.</li>\n</ol>\n'}}/>
    </${o}>`}