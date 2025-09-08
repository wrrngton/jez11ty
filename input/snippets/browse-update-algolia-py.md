---
title: Browse Algolia index and update objects (Python)
description: Browse Algolia index and update objects (Python)
tags: ["algolia", "python"]
---

Using the most recent version of Algolia's Python client library, this script will browse and index and do a batch operation on it, 1,000 objects at a time. 

```py
from algoliasearch.search.client import SearchClientSync

app_id = ""
write_key = ""
index = ""
client = SearchClientSync(app_id, write_key)
cursor = ""


def update(hits):
    batch_arr = []
    for hit in hits:

        # Transform. Provided simple example
        views = hit.views + 1
        
        new_obj = {
            "action": "partialUpdateObject",
            "body": {"objectID": hit.object_id, "views": views},
        }
        batch_arr.append(new_obj)

    client.batch(index_name=index, batch_write_params={"requests": batch_arr})


def browse():
    global cursor
    res = client.browse(index_name=index, browse_params={"cursor": cursor})
    cursor = res.cursor if res.cursor != "" else ""

    update(res.hits)

    if res.page == res.nb_pages - 1:
        return print("done")

    browse()


if __name__ == "__main__":
    browse()
```
