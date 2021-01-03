---
title: 'Useful File java.io Mini API'
date: '2018-08-29 17:00:00'
---
Java io is a very extensive library. There are numerous ways and combinations to write/read data on a file. This article summaries some very useful classes in `java.io` package.
<!-- Excerpt End -->

Here is a table from <a href="https://www.amazon.com/Java-Programmer-Exam-Guide-1Z0-809-ebook/dp/B07C8BJ9TG" target="_blank">OCP Java SE 8 Programmer II Exam Guide (Exam 1Z0-809)</a> that summarizes the basic classes in file io.
|java.io Class|Extends From|Key Constructor(s)|Key Methods|
|---|---|---|---|
|`File`|`Object`|`File, String`<br/> `String`<br/> `String, String`|`createNewFile()`<br/> `delete()`<br/> `exists()`<br/> `isDirectory()`<br/> `isFile()`<br/>`list()`<br/>`mkdir()`<br/>`renameTo()`|
|`FileWriter`|`Writer`|`File`<br/>`String`|`close()`<br/>`flush()`<br/>`write()`|
|`BufferedWriter`|`Writer`|`Writer`|`close()`<br/>`flush()`<br/>`newLine()`<br/>`write()`|
|`PrintWriter`|`Writer`|`File`<br/>`String`<br/>`OuputStream`<br/>`Writer`|`close()`<br/>`flush()`<br/>`format()`<br/>`printf()`<br/>`print()`<br/>`println()`<br/>`write()`|
|`FileOutputStream`|`OutputStream`|`File`<br/>`String`|`close()`<br/>`write()`|
|`FileReader`|`Reader`|`File`<br/>`String`|`read()`|
|`BufferedReader`|`Reader`|`Reader`|`read()`<br/>`readLine()`|
|`FileInputStream`|`InputStream`|`File`<br/>`String`|`read()`<br/>`close()`|

# Examples
```java
import java.io.*;

class Writer1 {
	public static void main(String... args) {
		try {
			boolean newFile = false;
			File file = new File("fileWrite1.txt");
			System.out.println(file.exists());
			newFile = file.createNewFile();
			System.out.println(newFile);
			System.out.println(file.exists());
		} catch(IOException e) {}

	}
}

class Writer2 {
	public static void main(String... args) {
		char[] in = new char[50];
		int size = 0;
		try {
			File file = new File("fileWrite2.txt");
			FileWriter fw = new FileWriter(file);
			fw.write("howdy\nfolks\n");
			fw.flush();
			fw.close();
			FileReader fr = new FileReader(file);
			size = fr.read(in);
			System.out.print(size + " ");
			for(char c: in) {
				System.out.print(c);
			}
			fr.close();
		} catch(IOException e) { }
	}
}

class Writer3 {
	public static void main(String... args) {
		byte[] in = new byte[50];
		int size = 0;
		File file = new File("fileWrite3.txt");
		try(FileOutputStream outStream = new FileOutputStream(file);
			FileInputStream inStream = new FileInputStream(file)) {
			String s = "howdy\nfolks\n";
			outStream.write(s.getBytes());
            outStream.flush();

			size = inStream.read(in);
			System.out.print(size + " ");
			for(byte b: in) {
				System.out.print((char) b);
			}
		} catch(IOException e) {}
	}
}

class Writer4 {
    public static void main(String... args) {
        File file = new File("fileWrite4.txt");
        try(PrintWriter pw = new PrintWriter(file);
            BufferedReader br = new BufferedReader(new FileReader(file))) {
            pw.println("howdy");
            pw.println("folks");
            pw.flush();
            
            String line = null;
            while(true) {
                line = br.readLine();
                if (line == null) break;
                System.out.println(line);
            }

        } catch(IOException e) {}    
    }
}
```

