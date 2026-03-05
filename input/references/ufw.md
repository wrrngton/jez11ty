---
title: UFW stuff 
description: ufw stuff 
tags: ["linux"]
layout: "/pages/post.njk"
date: "2024-02-18"
modified: "2024-02-18"
---

**SSH**

```console
ufw allow OpenSSH
```

**80 / http**
```console
sudo ufw allow 80/tcp
```

**443 / SSL**
```console
sudo ufw allow 443/tcp
```

**Deny incoming**

```console
sudo ufw default deny incoming
```
