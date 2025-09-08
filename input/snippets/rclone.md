---
title: Rclone 
description: Rclone stuff 
tags: ["linux", "rclone"]
---

[Useful docs](https://www-backblaze-com.webpkgcache.com/doc/-/s/www.backblaze.com/docs/cloud-storage-integrate-rclone-with-backblaze-b2)

## Useful Rclone commands with Backblaze B2

```console
rclone lsd b2: --> list all buckets
rclone ncdu b2: --> browse buckets
rclone mkdir b2:<bucket-name> --> create bucket
rclone copy <input-dir> b2:<bucket-name> --> copy files to bucket
rclone sync <input-dir> b2:<bucket-name> --> sync files (mirror) input dir to bucket
```

**Useful flags:**

```console
--fast-list --> reduce # of API calls 
```
