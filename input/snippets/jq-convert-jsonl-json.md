---
title: Convert JSONL to JSON using JQ
description: Convert JSONL to JSON using JQ
tags: ["jq", "commandline"]
---

```console
jq -s '.' input.jsonl > output.json
```

And the other way:

```console
jq -c '.[]' input.json > output.jsonl
```
