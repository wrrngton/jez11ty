---
title: Managing symlinks 
description: How to manage symlinks 
tags: ["linux", "sysamdin"]
layout: "/pages/post.njk"
---

## How to manage symlinks for nginx

Typically we create symlinks between `/etc/nginx/sites-available/<example>/` to `/etc/nginx-sites-enabled`.

`sites-enabled` contains the symlinks. They can be listed:

```console
ls -l /etc/nginx/sites-enabled
```
`lrwxrwxrwx` indicated a symlink.

**Removing symlinks**:

```console
sudo ln -s /etc/nginx/sites-available/example.com /etc/nginx/sites-enabled/
```

**Find broken symlinks**:

```console
find /etc/nginx/sites-enabled -xtype l
```
