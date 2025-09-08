---
title: Batch rename files using file index
description: Batch rename files using file index
tags: ["commandline"]
---

This terminal command renames all .jpg files in a directory to `{name}{index}.jpg`:

```console
i=1; for f in *.jpg; do mv -- "$f" "name-$i.jpg"; i=$((i+1)); done
```

`name` is just a placeholder, replace with whatever
