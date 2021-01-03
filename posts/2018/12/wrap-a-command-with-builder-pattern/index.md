---
title: 'Wrap A Command with Builder Pattern'
date: '2018-12-19 17:00:00'
---
This article shows a well-designed way to wrap a command and expose it through API with the classic Builder pattern. In this tutorial, you will learn how to write the Builder pattern, and how to direct standard output stream and standard error stream from the command to the input stream of your API.
<!-- Excerpt End -->

In a scenario that we have this command line application that will send some information to a server developed using some exotic framework or in a completely a different programming language, which increase the difficulty to reference it directly in your client application. It is used so often in the integration test that you feel the strong need to convert it to an API so that your projects could use it directly from your code without the knowledge on what exactly the correct command line is to have it send the correct information. If this scenario is too complicated for you, let's just say you want to run a command that execute a jar file with some command line arguments. Usually, you would do something like this:

```
java -jar hello-world.jar --foo=bar
```

That will do the job. But if you want to invoke it from your java application and pass in various configuration arguments, you will likely constructor a string and then execute it from the runtime:

```java
String cmd = String.format("java -jar \"%s\"" +
                        " --meter.feature-service=\"%s\"" +
                        " --meter.description=\"%s\"" +
                        " --meter.manufacture=\"%s\"" +
                        " --meter.model-number=\"%s\"" +
                        " --meter.lifecycle-status.recruited=\"%s\"" +
                        " --meter.lifecycle-status.decommissioned=\"%s\"" +
                        " --meter.total.recruited=%d" +
                        " --meter.total.decommissioned=%d",
                path,
                featureService,
                description,
                manufacture,
                model,
                lifecycleRecruited,
                lifecycleDecommissioned,
                totalRecruited,
                totalDecommissioned);

Process process = Runtime.getRuntime().exec(cmd);
```

This is a good start because we already start to externalize the key parameters to provide limit flexibility to the client. In the above example, there are many configurable properties needs to be passed in from the client. We could have just created a number of setters with an empty argument constructor leave the rest to the client, but we are better than this. There are two improvements we could do.

1. Use Builder Pattern for Object Creation. A classic way to implement the Builder pattern is to use a nested class (static inner class) and make the constructor of the class of the object you want to build private. This way, we could assign default values to the optional parameters and enforce required parameters through the Builder constructor.

2. Direct the output stream from the target command to the input stream of the current program.

Here is an example of the Builder pattern to provide the flexibility and minimal client code for clients to use.

```java
public class MeterSimulator {
    private String path;
    private String featureService;
    private String description;
    private String manufacture;
    private String model;
    private String lifecycleRecruited;
    private String lifecycleDecommissioned;
    private int totalRecruited;
    private int totalDecommissioned;
    
    public static class Builder {
        // Required
        private String path;
        
        // Optional
        private String featureService = "https://example.com/arcgis/rest/services/MeterMiles/FeatureServer/1";
        private String description = "abcdefghijklmnopqrstuvwxyz";
        private String manufacture = "ACME";
        private String model = "Integration";
        private String lifecycleRecruited = "New";
        private String lifecycleDecommissioned = "Decom";
        private int totalRecruited = 0;
        private int totalDecommissioned = 0;

        /**
         * constructor
         * @param path path to the meter-simulate.jar
         */
        public Builder(String path) {
            this.path = path;
        }

        public Builder withFeatureService(String featureService) {
            this.featureService = featureService;
            return this;
        }

        public Builder withDescription(String description) {
            this.description = description;
            return this;
        }

        public Builder withManufacture(String manufacture) {
            this.manufacture = manufacture;
            return this;
        }

        public Builder withModel(String model) {
            this.model = model;
            return this;
        }

        public Builder withLifecycleRecruited(String lifecycleRecruited) {
            this.lifecycleRecruited = lifecycleRecruited;
            return this;
        }

        public Builder withLifecycleDecommissioned(String lifecycleDecommissioned) {
            this.lifecycleDecommissioned = lifecycleDecommissioned;
            return this;
        }

        public Builder withTotalRecruited(int totalRecruited) {
            this.totalRecruited = totalRecruited;
            return this;
        }

        public Builder withTotalDecommissioned(int totalDecommissioned) {
            this.totalDecommissioned = totalDecommissioned;
            return this;
        }

        public MeterSimulator build() {
            return new MeterSimulator(this);
        }
    }

    public void call() throws Exception {
        String cmd = String.format("java -jar \"%s\"" +
                        " --meter.feature-service=\"%s\"" +
                        " --meter.description=\"%s\"" +
                        " --meter.manufacture=\"%s\"" +
                        " --meter.model-number=\"%s\"" +
                        " --meter.lifecycle-status.recruited=\"%s\"" +
                        " --meter.lifecycle-status.decommissioned=\"%s\"" +
                        " --meter.total.recruited=%d" +
                        " --meter.total.decommissioned=%d",
                path,
                featureService,
                description,
                manufacture,
                model,
                lifecycleRecruited,
                lifecycleDecommissioned,
                totalRecruited,
                totalDecommissioned);

        Process process = Runtime.getRuntime().exec(cmd);

        // Redirect output stream of the command to the input stream of current program
        try(BufferedReader stdIn = new BufferedReader(new InputStreamReader(process.getInputStream()));
            BufferedReader stdErr = new BufferedReader(new InputStreamReader(process.getErrorStream()))) {
            
            String s;
            
            while((s = stdIn.readLine()) != null) {
                System.out.println(s);
            }

            while ((s = stdErr.readLine()) != null) {
                System.err.println(s);
            }
        }
    }

    private MeterSimulator(Builder builder) {
        this.path = builder.path;
        this.featureService = builder.featureService;
        this.description = builder.description;
        this.manufacture = builder.manufacture;
        this.model = builder.model;
        this.lifecycleRecruited = builder.lifecycleRecruited;
        this.lifecycleDecommissioned = builder.lifecycleDecommissioned;
        this.totalRecruited = builder.totalRecruited;
        this.totalDecommissioned = builder.totalDecommissioned;
    }
}
```

Finally, by using the Builder pattern, we tremendously simplified the client's action to use the wrapped command. Here is the usage:

```java
MeterSimulator meterSimulator = new MeterSimulator.Builder(METER_SIMULATOR_PATH)
                .withManufacture("Zebra")
                .withDescription("From Integration Test")
                .withModel("foo1")
                .withTotalDecommissioned(10)
                .build();
meterSimulator.call();
```

