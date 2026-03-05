---
title: Make a PUT request with @11ty/eleventy-fetch
description: Make a PUT request with @11ty/eleventy-fetch
tags: ["11ty"]
layout: "pages/post.njk"
date: "2025-07-20" 
modified: "2025-07-20" 
---

[11ty](https://www.11ty.dev/) fetch lets you cache resources for any remote asset at build time. It scored it in a cache in your project.

The basic request format supports `GET` only:

```js
const EleventyFetch = require("@11ty/eleventy-fetch");

module.exports = async function () {
  let url = "https://api.github.com/repos/11ty/eleventy";

  /* This returns a promise */
  return EleventyFetch(url, {
    duration: "1d", // save for 1 day
    type: "json", // we’ll parse JSON for you
  });
};
```

You can update it to change it to a `PUT` request (there were no examples I could find of this anywhere). Here i'm making a PUT request to retrieve my username from [Hardcover](https://hardcover.app/) using a GraphQL query.

```js
const url = "https://api.hardcover.app/v1/graphql";

return EleventyFetch(url, {
  duration: "1d",
  type: "json",
  fetchOptions: {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: "<BEARER_TOKEN>",
    },
    body: JSON.stringify({
      query: `{
            me {
              username
            }
          } `,
    }),
  },
});
```

Running this at build time in `_data/username.json` will store the asset in a global `username` object.
