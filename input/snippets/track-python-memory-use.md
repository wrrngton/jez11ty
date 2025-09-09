---
title: Track basic memory use in Pythons script 
description: How to track basic memory use in a Python script 
tags: ["python"]
layout: "/pages/post.njk"
---
[relevant docs](https://psutil.readthedocs.io/en/latest/#psutil.Process.memory_info)

Use the `psutil` util is a simple way to measure memory usage in Python scripts.

```python
import os, psutil

def log_memory():
    process = psutil.Process(os.getpid())
    mem = process.memory_info().rss / (1024 * 1024)
    print(f"Memory usage: {mem:.2f} MB")
```

Just invoke `log_memory()` where you need. `rss` is the "non swapped physical memory a process has used".
