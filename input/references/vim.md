---
title: Vim
description: Vim motions, tips and tricks
tags: ["linux", "programs"]
layout: "/pages/post.njk"
date: "2026-03-07"
modified: "2024-02-18"
---

## Deleting 

### Delete until word

This will delete up until the specified character forwards.

```vim
dt<char>
```

Delete backwards
```vim
dT<char>
```

### Delete until word

This will delete all character up until the specified `<word>`.

```vim
d/<word>
```
