---
title: 'Spring Data MongoDB GridFS 3.4'
date: '2018-10-17 17:00:00'
---
This article shows a typical usage of MongoDB GridFS with Spring Data MongoDB. This is for MongoDB java driver v3.4 and Spring Data MongoDB v1.10.x. Note that Spring Data MongoDB v2.X introduces breaking changes with the MongoDB java driver 3.6+. This article only shows the usage of the v3.4 driver with Spring Data MongoDB v1.10.x.
<!-- Excerpt End -->

## FileService Interface
```java
public interface FileService {
    GridFSDBFile find(String id);
    Optional<GridFsResource> findAsResource(String id);
    String store(String name, MultipartFile file);
    void delete(String id);
}
```

## FileService Implementation
We can't use `GridFsTemplate.getResource(String location)` here to get the resource because there might be files with the same name. To find the expected file, we need to find a list of the resources that all match the same filename and then filter them by the id after retrieving all the files. This is acceptable because at that point, the `InputStream` hasn't been requested yet. `GridFsTemplate.getResources(String locationPattern)` takes an Ant matching pattern and it returns all resources whose filename passes the test.

`GridFsTemplate.store()` returns an `Object` whose string literal could be converted to a `ObjectId` type. For instance,
`ObjectId objectId = new ObjectId(GridFsTemplate.store(...).toString())`.


```java
@Service
public class FileServiceImpl implements FileService {
    private GridFsTemplate gridFsTemplate;

    @Autowired
    public FileServiceImpl(final GridFsTemplate gridFsTemplate) {
        this.gridFsTemplate = gridFsTemplate;
    }


    @Override
    public GridFSDBFile find(final String id) {
        ObjectId objectId = new ObjectId(id);
        return gridFsTemplate.findOne(new Query(Criteria.where("_id").is(objectId)));
    }

    @Override
    public Optional<GridFsResource> findAsResource(final String id) {
        return Stream.of(gridFsTemplate.getResources(find(id).getFilename() + "*"))
            .filter(gridFsResource -> gridFsResource.getId().toString().equals(id))
            .findAny();
    }

    @Override
    public String store(String name, final MultipartFile file) {
        try {
            String filename = file.getOriginalFilename();
            if (name != null) {
                filename = FileNameUtils.getExtension(filename)
                    .map(ext -> name + "." + ext)
                    .orElse(name);
            }

            InputStream inputStream = file.getInputStream();
            GridFSFile gridFSFile = gridFsTemplate.store(
                inputStream, filename, file.getContentType());
            if (gridFSFile != null) {
                return gridFSFile.getId().toString();
            } throw new FileException("Failed to save file");
        } catch (IOException e) {
            throw new FileException(e);
        }
    }

    @Override
    public void delete(final String id) {
        ObjectId objectId = new ObjectId(id);
        gridFsTemplate.delete(new Query(Criteria.where("_id").is(objectId)));
    }
}
```

## FileController
```java
@RestController
@RequestMapping("/api/v1/files")
public class FileController {
    private FileService fileService;

    @Autowired
    public FileController(final FileService fileService) {
        this.fileService = fileService;
    }

    @PostMapping
    public Attachment uploadAttachment(@RequestParam("name") String name,
                                 @RequestParam("file") MultipartFile file) {
        String id =  fileService.store(name, file);
        return new Attachment(name, id);
    }

    @GetMapping("/{id}")
    public ResponseEntity<InputStreamResource> downloadFile(@PathVariable("id") String id) {
        Optional<GridFsResource> resourceOptional = fileService.findAsResource(id);

        return resourceOptional.map(resource -> {
            try {
                return ResponseEntity
                    .ok()
                    .contentType(MediaType.valueOf(resource.getContentType()))
                    .header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"" + resource.getFilename() + "\"")
                    .body(new InputStreamResource(resource.getInputStream()));
            } catch (IOException e) {
                throw new FileException(e);
            }
        }).orElseThrow(() -> new FileException("File not found"));
    }

    @DeleteMapping("/{id}")
    public void deleteFile(@PathVariable("id") String id) {
        fileService.delete(id);
    }

    class Attachment {
        private String name;
        private String fileId;

        Attachment(final String name, final String fileId) {
            this.name = name;
            this.fileId = fileId;
        }
        // Getters and setters...
    }

}
```

## References

1. <a href="http://mongodb.github.io/mongo-java-driver/3.4/javadoc/" target="_blank">Mongo Java Driver v3.4</a>
2. <a href="https://docs.spring.io/spring-data/mongodb/docs/1.10.16.RELEASE/api/" target="_blank">Spring Data MongoDB v.1.10.16 API</a>
2. <a href="https://docs.spring.io/spring-data/mongodb/docs/1.10.16.RELEASE/reference/html/" target="_blank">Spring Data MongoDB v.1.10.16 Reference</a>

