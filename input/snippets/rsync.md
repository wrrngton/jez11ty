---
title: Basic rsync commands
description: Basic rsync commands
tags: ["rsync"]
---

I use these rscync commands regularly to sync local data and remote servers:

```console
rsync -rtvz --progress /local/path /remote/path
```

`r` is recursive mode (add directories), `t` keeps timestamps, which allows skipping files that have already been transdered, `v` means verbose and shows transfer progress in a human readable format, `z` compresses data during send and `---progress` shows files transer progress.
