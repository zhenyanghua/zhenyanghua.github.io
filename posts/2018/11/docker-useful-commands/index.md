---
title: 'Docker Useful Commands'
date: 2018-11-06 17:00:00
---
This article shows a curated list of docker commands that may be useful.
<!-- Excerpt End -->

## Inspect container and filter by its property
```
docker inspect -f '{{ .NetworkSettings.IPAddress }}' container_name
```

## Detached and interactive terminal
Run a nginx container in a detached interactive terminal that maps the host port 8088 to the nginx webserver port
and open a shell in the interactive terminal.
```
docker run -dit --name my-nginx -p 8088:80 nginx /bin/bash 
```
Enter the shell
```
docker attach my-nginx
```
Exit the shell while keeping the nginx running

<kbd>Ctl+P</kbd>, <kbd>Ctl+Q</kbd>

