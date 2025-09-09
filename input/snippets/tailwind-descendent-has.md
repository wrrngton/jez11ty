---
title: Apply a tailwind class based on descendent state
description: Apply a tailwind class based on descendent state
tags: ["tailwind"]
layout: "/pages/post.njk"
---

You can apply css classes to parent elements if any of the parent's descendents meet a certain condition using the `has()` selector.

Extending this to Tailwind is easy. A use case I came against recently was this: we have a header with a class that's passed dynamically using React state. The class is `scroll-locked`, used to indicate that the mobile menu has been toggled and that whole app should be scroll locked, i.e `overflow: hidden`.

Instead of prop drilling and passing state from the `<header>` to the `<body>`, which is where we want to scroll lock, we can use the `has()` selector on the `<body>` to apply a class only when the `<header className="scroll-locked">`.

The css for this is:

```jsx
<body className="has-[header.scroll-locked]:truncate">
```

`has-*` is a Tailwind modifier and what we pass in the [square brackets] is just css selector. `:` is used as a separator between different parts of a utility class name.
