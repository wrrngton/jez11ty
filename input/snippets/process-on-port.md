---
title: Find and kill port processes
description: Find and kill port processes 
tags: ["bash"]
layout: "/pages/post.njk"
date: "2026-02-21"
modified: "2026-02-21"
---

## Find processes

On unix systems:

```console
lsof -i :{port}
```
Example:

```console
lsof -i :3000
```
**Example output**:

```
COMMAND   PID   USER   FD   TYPE DEVICE SIZE/OFF NODE NAME
node     12345  you    21u  IPv6 ...    TCP *:3000 (LISTEN)
```

## Kill processes  

```console 
kill 12345 
```

Or force kill
```console 
kill -9 12345 
```
