---
title: Browse Algolia index and update objects (JS)
description: Browse Algolia index and update objects (JS)
tags: ["algolia"]
layout: "/pages/post.njk"
date: "2023-12-26"
modified: "2023-12-26"
---

```js
const algolia = require("algoliasearch");
const client = algolia("<YOUR-APP-ID>", "<YOUR-WRITE-API-KEY>");

const index = client.initIndex("<YOUR-INDEX-NAME>");

function transformFunction(hit) {
  return {
    ...hit,
    foo: "bar",
  };
}

async function transformObjects(batch, isDryRun) {
  const newArr = batch.map((el) => {
    return transformFunction(el);
  });

  // Dry run
  if (isDryRun) {
    console.log(newArr, "no objects were updated, this is a dry run");
  }

  // Real run
  else {
    try {
      const data = await index.saveObjects(newArr);
      const { objectIDs } = data;
      console.log(
        "The following objectIDs were successfully updated:",
        objectIDs
      );
    } catch (err) {
      console.log("an error occurred updating the records", err);
    }
  }
}

index
  .browseObjects({
    query: "",
    batch: (batch) => {
      transformObjects(batch, false);
    },
  })
  .then(() => console.log("code completed"));
```
