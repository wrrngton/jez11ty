---
title: Static website with Docker
description: Create a basic static website with Docker
tags: ["docker", "oneoffs"]
layout: "/pages/post.njk"
date: "2026-04-04"
modified: "2026-04-04"
---

Extremely basic example of creating static websites using Docker and Dockerfiles.

## Create basic website

`mkdir basic-website` and `cd` into it. Create a basic html file:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Docker</title>
  </head>
  <body>
    <h1>Hello, from Docker!</h1>
  </body>
</html>
```

## Dockerfile

A static website needs to be served from a webserver, obviously.

All Dockerfiles must start with a `FROM` directive, which defines the parent image for the that docker image. We will use `nginx:alpine`, which is a HTTP and reverse proxy server.

```docker
FROM nginx:alpine
```

If you look at the [nginx alpine docs](https://hub.docker.com/_/nginx) the `COPY` command copies the website content from your directory into the `/usr/share/nginx/html`, which is the default directory for nginx websites.

```docker
FROM nginx:alpine
COPY . /usr/share/nginx/html
```

## Build image and serve app

Build the image:

```console
docker build -t static-website .
```

Run the container:

```console
docker run --name my-awesome-website -d -p 8080:80 static-website
```

`-d` runs the container in the background, `-p` maps ports from host to docker container (nginx runs on port `80`).

## Serve app with volume

To attach a bind mount (for e.g if you want to develop locally using the Docker and need file updates):

```console
docker run --name my-awesome-website -d -p 8080:80 -v ./:/usr/share/nginx/html  static-website
```
