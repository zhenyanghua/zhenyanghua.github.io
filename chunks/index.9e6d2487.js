import{m as e}from"../index.e45ada53.js";import"./time.daaab1ba.js";import{P as i}from"./index.1cdefbad.js";export default function(){return e`<${i} ...${{title:"Recursively Move a Directory",date:"2019-01-09 17:00:00"}}>
      <article dangerouslySetInnerHTML=${{__html:'<h2>\n  <a id="this-article-shows-one-effective-implementation-that-follows-the-visitor-pattern-to-recursively-move-a-directory-using-java-nio-library-" class="anchor" aria-hidden="true" href="#this-article-shows-one-effective-implementation-that-follows-the-visitor-pattern-to-recursively-move-a-directory-using-java-nio-library-">\n    <svg class="icon" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>\n  </a>This article shows one effective implementation that follows the Visitor Pattern to recursively move a directory using Java NIO library.</h2><div class="codeblock">\n  <pre>public static void move(Path source, Path target) throws IOException {\n\n    class FileMover extends SimpleFileVisitor&lt;Path&gt; {\n        private Path source;\n        private Path target;\n\n        private FileMover(Path source, Path target) {\n            this.source = source;\n            this.target = target;\n        }\n\n        @Override\n        public FileVisitResult visitFile(final Path file, final BasicFileAttributes attrs) throws IOException {\n            Path newFile = target.resolve(source.relativize(file));\n            Files.move(file, newFile,\n                StandardCopyOption.REPLACE_EXISTING);\n            return FileVisitResult.CONTINUE;\n        }\n\n        @Override\n        public FileVisitResult preVisitDirectory(final Path dir, final BasicFileAttributes attrs) throws IOException {\n            Path newDir = target.resolve(source.relativize(dir));\n            try {\n                Files.copy(dir, newDir,\n                    StandardCopyOption.COPY_ATTRIBUTES,\n                    StandardCopyOption.REPLACE_EXISTING);\n            } catch (DirectoryNotEmptyException e) {\n                // ignore and skip\n            }\n            return FileVisitResult.CONTINUE;\n        }\n\n        @Override\n        public FileVisitResult postVisitDirectory(final Path dir, final IOException exc) throws IOException {\n            Path newDir = target.resolve(source.relativize(dir));\n            FileTime time = Files.getLastModifiedTime(dir);\n            Files.setLastModifiedTime(newDir, time);\n            Files.delete(dir);\n            return FileVisitResult.CONTINUE;\n        }\n    }\n\n    FileMover fm = new FileMover(source, target);\n    EnumSet&lt;FileVisitOption&gt; opts = EnumSet.of(FileVisitOption.FOLLOW_LINKS);\n\n    Files.walkFileTree(source, opts, Integer.MAX_VALUE, fm);\n}</pre>\n</div>'}}/>
    </${i}>`}