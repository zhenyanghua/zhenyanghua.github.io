---
title: 'Recursively Move a Directory'
date: '2019-01-09 17:00:00'
---
This article shows one effective implementation that follows the Visitor Pattern to recursively move a directory using Java NIO library.
<!-- Excerpt End -->

```java
public static void move(Path source, Path target) throws IOException {

    class FileMover extends SimpleFileVisitor<Path> {
        private Path source;
        private Path target;

        private FileMover(Path source, Path target) {
            this.source = source;
            this.target = target;
        }

        @Override
        public FileVisitResult visitFile(final Path file, final BasicFileAttributes attrs) throws IOException {
            Path newFile = target.resolve(source.relativize(file));
            Files.move(file, newFile,
                StandardCopyOption.REPLACE_EXISTING);
            return FileVisitResult.CONTINUE;
        }

        @Override
        public FileVisitResult preVisitDirectory(final Path dir, final BasicFileAttributes attrs) throws IOException {
            Path newDir = target.resolve(source.relativize(dir));
            try {
                Files.copy(dir, newDir,
                    StandardCopyOption.COPY_ATTRIBUTES,
                    StandardCopyOption.REPLACE_EXISTING);
            } catch (DirectoryNotEmptyException e) {
                // ignore and skip
            }
            return FileVisitResult.CONTINUE;
        }

        @Override
        public FileVisitResult postVisitDirectory(final Path dir, final IOException exc) throws IOException {
            Path newDir = target.resolve(source.relativize(dir));
            FileTime time = Files.getLastModifiedTime(dir);
            Files.setLastModifiedTime(newDir, time);
            Files.delete(dir);
            return FileVisitResult.CONTINUE;
        }
    }

    FileMover fm = new FileMover(source, target);
    EnumSet<FileVisitOption> opts = EnumSet.of(FileVisitOption.FOLLOW_LINKS);

    Files.walkFileTree(source, opts, Integer.MAX_VALUE, fm);
}
```
