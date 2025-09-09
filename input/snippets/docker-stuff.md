---
title: Docker stuff
description: Docker stuff 
tags: ["docker"]
layout: "/pages/post.njk"
---

## Basic commands

**List docker containers**

```console
docker ps
```

**Restart docker container**

```console
docker restart <container-name>
```

## Networks
**List docker networks**

```console
docker network ls
```

**Attach container to network**

*Example when containers need to communicate on the same network, e.g a proxy manager services needing to communicate on the same network as other containers*

```console
docker network connect <network-name> <container-name>
```

**Detach network from container**

```console
docker network disconnect <network-name> <container-name>
```

## Gracefully shutdown container with docker compose

```console
docker stop <container-name>
```

This can be done from within the project /dir if using docker compose:

```console
docker compose down <container-name>
```

If the network is attached, use network disconnection above.

**Remove all containers within the docker-compose.yml file**

For e.g associated services

```console
sudo docker compose down --volumes --remove-orphans
```

**Remove docker images**

```console
docker images --> list them
docker rmi <image-name>
```

## Gracefully shutdown container w/out docker compose

```console
docker stop <container-name>
docker rm <container-name>
docker network rm <network-name> --> if there's a network
```

## Create shell session in container

```console
sudo docker exec -it <container-name> /bin/bash
```
