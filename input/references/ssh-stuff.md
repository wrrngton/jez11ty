---
title: SSH stuff
description: SSH stuff 
tags: ["linux", "sysamdin"]
layout: "/pages/post.njk"
date: "2024-09-29"
modified: "2024-09-29"
---

## Generate key, link with server

```console
ssh-keygen -f homeserver
```
Generates a .pub key and private key.

**Copy .pub key to server**

```console
ssh-copy-id -i homeserver.pub root@<homeserver-ip>
```

This copies the file into the `authorized_keys` file on the server.

**Define a host entry**

```console
vim ~/.ssh/config
```

```vim
Host homeserver
    HostName server_ip_or_hostname
    User myusername
    IdentityFile ~/.ssh/my_custom_key # private key
```
