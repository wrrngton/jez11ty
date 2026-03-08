---
title: Vim / Nvim
description: Vim motions, tips and tricks
tags: ["linux", "programs"]
layout: "/pages/post.njk"
date: "2026-03-07"
modified: "2024-02-18"
---

*This applies both to vim motions in general, but also my own nvim setup*

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

### Navigate between panes

```vim
<C-w><Left>
<C-w><Right>
```
