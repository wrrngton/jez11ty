---
title: TaskWarrior commands 
description: TaskWarrior commands I use daily 
tags: ["taskwarrior", "cli"]
layout: "/pages/post.njk"
date: "2024-02-18"
modified: "2024-02-18"
---
See tasks completed today.

```console
task completed end:today
```
Undo the last completed task 

```console
task undo
```
## Manage spaces

The best way to manage spaces is by using context

```console
task context define work +work
```
Adds a new context called `work` and new items are registered to the context when the tag `work` is added to the task.

You can add a filter that anytime a task is added in the current context, it will have the context automatically attached to it.

To switch context:

```console
task context work
```

To clear context:

```console
task context none
```

