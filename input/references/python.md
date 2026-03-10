---
title: Track basic memory use in Pythons script 
description: How to track basic memory use in a Python script 
tags: ["python", "languages"]
layout: "/pages/post.njk"
date: "2024-02-18"
modified: "2024-02-18"
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

## Split array into n chunk size

```python 
chunk_size = 2
arr = [1,2,3,4,5,6,7,8,9,10]
chunks = [arr[i:i + chunk_size] for i in range(0, len(arr), chunk_size)]
# [[1, 2], [3, 4], [5, 6], [7, 8], [9, 10]]
```
