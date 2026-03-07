---
title: Grep
description: Grep stuff
tags: ["grep", "commandline", "programs"]
layout: "/pages/post.njk"
date: "2024-07-18"
modified: "2024-07-18"
---

## Grep command history

You can grep your command history easily. This helps when trying to find your historical commands that match a pattern instead of just dumping the whole history.

```console
history | grep <your-pattern>
```
You can still control number of lines to grep across

```console
history -20 | grep <your-pattern>
```
