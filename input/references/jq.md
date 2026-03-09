---
title: JQ
description: JQ tips and tricks
tags: ["jq", "commandline", "programs"]
layout: "/pages/post.njk"
date: "2024-11-01"
modified: "2024-11-01"
---

## Counting json length

```console
jq -s '. | length' sample_data.json
```

## Converting back after forth between json and jsonl

```console
jq -s '.' input.jsonl > output.json
```

And the other way:

```console
jq -c '.[]' input.json > output.jsonl
```
