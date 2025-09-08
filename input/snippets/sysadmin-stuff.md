---
title: Sysadmin stuff
description: Sysadmin stuff 
tags: ["linux", "sysamdin"]
---

## Disk space

Use `df` / `disk-free` to check for free disk space:

```console
df -h
```

## Check file permissions

```console
ls -ld <directory>
```

## Create directories and forcing parents to be created

```console
mkdir -p /parent/child
```

## System info

Use `neofetch`.

```console
sudo apt install neofetch
neofetch
```

## Generate random keys

```console
openssl rand -base64 36
```

## Check docker logs

```
docker logs <container-name> # Basic
docker logs -f <container-name> # Paginate through
docker logs --tail 100 <container-name> # Limit lines
docker logs <container-name> | grep password
```
