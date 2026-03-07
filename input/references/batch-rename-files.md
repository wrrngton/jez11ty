---
title: Rename
description: Rename command stuff
tags: ["commandline", "programs"]
layout: "/pages/post.njk"
date: "2024-12-20"
modified: "2024-12-20"
---

## Batch rename files

This appends .json to each file that doesn't already have a .json extension.

```console
rename 's/$/.json/' *
```
