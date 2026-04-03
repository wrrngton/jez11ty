---
title: Managing your path
description: How to manage your path
tags: ["commandline", "oneoffs"]
layout: "/pages/post.njk"
date: "2025-03-04"
modified: "2025-03-04"
---

## Adding a Python version to your path 

Let's say your system comes installed with the system Python version, but you want to upgrade your version. Sometimes your system Python version doesn't allow things like sqlite extensions, so you may want to switch to homebrew with `brew install python`.

First check what shell you are using:

```console 
echo $SHELL // or
echo $0
```

`/bin/bash` -> you are using bash
`/bin/zsh` -> you are using zsh

Typically, you'll be using `zsh`.

You need to update the `zsh` config file at `~/.zshrc` (you might need to create it). 

```bash 
export PATH="/opt/homebrew/bin:$PATH"
```

To reload the file: 

```console
source ~/.zshrc 
```

```console
which python3
```

Should show:

```console 
/opt/homebrew/bin/python3
```
