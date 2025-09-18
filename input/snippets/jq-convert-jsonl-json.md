---
title: Convert JSONL to JSON using JQ
description: Convert JSONL to JSON using JQ
tags: ["jq", "commandline"]
layout: "/pages/post.njk"
date: "2025-07-03"
modified: "2025-07-03"
---

```console
jq -s '.' input.jsonl > output.json
```

And the other way:

```console
jq -c '.[]' input.json > output.jsonl
```
