---
title: Grep your command history 
description: How to grep your command historu 
tags: ["grep", "commandline"]
layout: "/pages/post.njk"
date: "2024-07-18"
modified: "2024-07-18"
---

You can grep your command history easily. This helps when trying to find your historical commands that match a pattern instead of just dumping the whole history.

```console
history | grep <your-pattern>
```
You can still control number of lines to grep across

```console
history -20 | grep <your-pattern>
```
