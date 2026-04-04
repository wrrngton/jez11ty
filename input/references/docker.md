---
title: Docker
description: Docker stuff 
tags: ["docker", "programs"]
layout: "/pages/post.njk"
date: "2024-05-14"
modified: "2024-05-14"
---

## Terminology

- **Container**: An instance of a virtualised read-write environment
- **Image**: A read only definition of a container

## Docker containers 

A container is a standard unit of software that packages up code and all its dependencies so the application runs quickly and reliably from one computing environment to another.

## Containers vs Virtual Machines 

Virtual machines virtualize hardware, they emulate what a physical computer does at a low level. Containers virtualize at the operating system level. Isolation between containers that are running on the same machine is still really good. or the most part, each container feels like it has its own operating system and filesystem. In reality, a lot of resources are being shared, but they're being shared securely through [namespaces](https://docs.docker.com/engine/security/userns-remap/).

Containers share host operating system resources, while maintaining isolation.

## Images 

Images are read-only *definition* of a container.

**pull an image**

```console 
docker pull <image>
docker pull docker/getting-started # For example
```

**view all images**

```console  
docker images
```

## Basic commands

**List docker containers**

```console
docker ps
```

## Run a container from image 
```console
docker run -d -p 8965:80 docker/getting-started:latest
```
`-d`: Run in detached mode (doesn't block your terminal)
`-p`: Publish a container's port to the host (forwarding)
`hostport`: The port on your local machine
`containerport`: The port inside the container
`namespace/name`: The name of the image (usually in the format username/repo)
`tag`: The version of the image (often latest)

When you `docker ps` you'll see: `0.0.0.0:8965->80/tcp`. This says that port `8965` on your computer is being forwards to port `80` on the container.

## Docker container 

```console 
docker stop <container_name> # stops container
docker rm <container_name> # removes container
```

## Docker volumes

Docker volumes are like memory cards for containers. Containers are ephemeral, meaning that if you spin up a container, install a new program in that container (for example) and then stop and restart that container, that program will be lost. 

This is solved by docker `volumes`, which are persistent storage that we can attach to docker containers.

**Basic volume commands**

```console 
docker volume create sick-vol
docker volume ls # will list docker volumes 
docker volume inspect sick-vol # will contain details about the new volume
```

**Remove all unused volumes**

```console 
docker volume prune
```

**Restart docker container**

```console
docker restart <container-name>
```

## Networks

Networks are a way to control communication between containers.

**Create a bridge network and connect containers**
```console 
docker network create caddytest
```

**List docker networks**

```console
docker network ls
```

**Run a container without network connectivity**

```console 
docker run -d --network none docker/getting-started # For example
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

`i` makes `exec` interactive. `t` gives us a keyboard interface.

## Execute shell command 

```console 
docker exec <container_name>
docker exec <container_name> netstat -ltnp #example that lists ports in use
```
> exit with `exit` command

## Load balancing with Docker

![docker load balancing](https://storage.googleapis.com/qvault-webapp-dynamic-assets/course_assets/BgpWFp7-536x400.png)

## Logs 

```console 
docker logs <container_name> # View container logs 
docker logs -f <container_name> # Follow logs in real time
docker logs --tail 5 <container_name> # See last n lines
```

## Top 

Top lets you see processes running inside a container 
```console 
docker top <container_name>
```

## Limit container resource usage 

This run a container with only 25% of overall CPU power.

```console 
docker run -d --cpus="0.25" --name cpu-stress alexeiled/stress-ng --cpu 2 --timeout 10m
```

