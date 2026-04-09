---
title: SQL 
description: SQL stuff
tags: ["sql", "databases", "programs"]
layout: "/pages/post.njk"
date: "2026-04-06"
modified: "2026-04-06"
---

# Rules of Thumb for Database Design
1. Every table should always have a unique identifier (primary key)
2. 90% of the time, that unique identifier will be a single column named id
3. Avoid duplicate data
4. Avoid storing data that is completely dependent on other data. Instead, compute it on the fly when you need it.
5. Keep your schema as simple as you can. Optimize for a normalized database first. Only denormalize for speed's sake when you start to run into performance problems.
