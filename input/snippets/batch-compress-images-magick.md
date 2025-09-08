---
title: Batch compress image using ImageMagick!
description: Batch compress image using ImageMagick
tags: ["commandline"]
---

This command loops a directory (`cd` into it, i'm assuming you're in it) and for every `.jpg` it aims to compress it to 200kb (not guaranteed)

```console
for file in *.jpg; do magick "$file" -define jpeg:extent=200kb "compressed/$file" done;
```

Make a `compressed` directory first, of course.
