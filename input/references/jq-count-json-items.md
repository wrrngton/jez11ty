---
title: Count items in JSON file using jq
description: Count items in JSON file using jq
tags: ["jq", "commandline"]
layout: "/pages/post.njk"
date: "2024-11-01"
modified: "2024-11-01"
---

```console
jq -s '. | length' sample_data.json
```
