---
title: 'How to Setup ELK Stack with Docker for Development'
date: 2018-11-13 17:00:00
---
This tip shows the fastest way to stand up the *ELK* stack for development.
<!-- Excerpt End -->

The Elastic stack has a nice <a href="https://www.docker.elastic.co" target="_blank">website</a> that provides the links to the docker images and documentation. In this example, I am using the latest version as this article is written - v6.4.3 for all the elastic stack.

## 1. Run ElasticSearch
```
docker run -d --name my-es -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" docker.elastic.co/elasticsearch/elasticsearch:6.4.3
```

After the container starts running, find out the internal docker IP the ElasticSearch server is using. This will be used for configuring the Logstash and Kibana.

```
docker inspect -f '{{ .NetworkSettings.IPAddress }}' my-es
```

## 2. Run Logstash

Create a configuration file in the host directory, and bind mount to the container configuration file.
```
vim ~/elk/config/logstash.conf 
```
Enter the following and save with `:wq`. Note that we created an index pattern that starts with `leafyjava-`.
```
input {
    tcp {
        port => 5050
        codec => json
    }
}

output {
    elasticsearch {
        hosts => ["http://172.17.0.7:9200"]
        index => "leafyjava-%{appName}"
    }
}
```

Run the container. We need to use `-f` flag to ask Logstash to use the config file we just bound.

```
docker run -d --name my-logstash -p 5050:5050 -v ~/elk/config/logstash.conf:/config-dir/logstash.conf docker.elastic.co/logstash/logstash:6.4.3 -f /config-dir/logstash.conf
```

## 3. Run Kibana

```
docker run -d --name my-kibana -e "ELASTICSEARCH_URL=http://172.17.0.7:9200" -p 5601:5601 docker.elastic.co/kibana/kibana:6.4.3
```

Go to `localhost:5601`, and you will see the Kibana console up and running. Now you are ready for integrating your applications to use this elastic stack.
