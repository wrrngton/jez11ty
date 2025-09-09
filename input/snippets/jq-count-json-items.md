---
title: Count items in JSON file using jq
description: Count items in JSON file using jq
tags: ["jq", "commandline"]
layout: "/pages/post.njk"
---

```console
jq -s '. | length' sample_data.json
```
