---
title: Update Algolia InstantSearch.js state
description: How to update Algolia InstantSearch.js state
tags: ["algolia"]
---

Sometimes in InstantSearch, you want to update a widget's state based on a non-search action.

We'll use the example of adding a filter to the search request when a user makes a selection.

This assume you've initialised search. There should be an existing `configure` widget initialised. It can be blank also:

```js
search.addWidgets([
  configure({}),

select.addEventListener("change", function(){
    // User has selected a new filter value
    filterValue = e.target.value;

    search.setUiState({
       index_name: {
          configure: {
            filters: `category: ${filterValue}`
          },
        },
      });
});
```

Next time a query is performed, the new filter will be set.
