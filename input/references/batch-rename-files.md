---
title: Batch rename files using rename
description: Batch rename files using rename
tags: ["commandline"]
layout: "/pages/post.njk"
date: "2024-12-20"
modified: "2024-12-20"
---

This appends .json to each file that doesn't already have a .json extension.

```console
rename 's/$/.json/' *
```
