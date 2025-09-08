---
title: Batch rename files using rename
description: Batch rename files using rename
tags: ["commandline"]
---

This appends .json to each file that doesn't already have a .json extension.

```console
rename 's/$/.json/' *
```
