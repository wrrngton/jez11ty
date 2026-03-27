---
title: CURL reference
description: curl stuff 
tags: ["curl","programs"]
layout: "/pages/post.njk"
date: "2026-03-27"
modified: "2026-03-27"
---

## Syntax

```bash
curl [parameters] [URL]
```

Display the command usage and lists most common options:

```bash
curl --help
```

Display the command usage and list all available options:

```bash
curl --help all
```
---



## Basic Operations

| Command                                                            | Description         |
| ------------------------------------------------------------------ | ------------------- |
| curl [http://example.com](http://example.com)                      | Fetch a URL         |
| curl -O [http://example.com/file.zip](http://example.com/file.zip) | Download a file     |
| curl -L [http://example.com](http://example.com)                   | Follow redirections |

---

## Debugging & Info

| Command                                          | Description              |
| ------------------------------------------------ | ------------------------ |
| curl -v [http://example.com](http://example.com) | Verbose mode             |
| curl -I [http://example.com](http://example.com) | Retrieve only headers    |
| curl --version                                   | Curl version & protocols |

---

## SSL (Secure Socket Layer)

| Command                                                           | Description                       |
| ----------------------------------------------------------------- | --------------------------------- |
| curl -k [https://example.com](https://example.com)                | Skip SSL certificate verification |
| curl --cert mycert.pem [https://example.com](https://example.com) | Use SSL certificate               |

---

## Common Options

| Option                         | Description                                     |
| ------------------------------ | ----------------------------------------------- |
| -d, --data <data>              | HTTP POST data                                  |
| -f, --fail                     | Fail fast with no output on HTTP errors         |
| -h, --help <category>          | Get help for commands                           |
| -I, --include                  | Include protocol response headers in output     |
| --output <file>                | Write to file instead of stdout                 |
| -O, --remote-name              | Write output to a file named as the remote file |
| --silent                       | Silent mode                                     |
| -T, --upload-file <file>       | Transfer local file to destination              |
| [user:password](user:password) | Server user and password                        |
| -A, --user-agent <name>        | Send User-Agent to server                       |

---

## Authentication & Headers

| Command                                                                             | Description               |
| ----------------------------------------------------------------------------------- | ------------------------- |
| curl -u username:password                                                           | HTTP Basic Authentication |
| curl -H "Authorization: Bearer YOUR_TOKEN" [http://example.com](http://example.com) | Add headers               |

---

## Data Transfer

| Command                                                                                                                          | Description    |
| -------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| curl -d "key1=value1&key2=value2" [http://example.com/post_endpoint](http://example.com/post_endpoint)                           | Post data      |
| curl -d '{"key1":"value1","key2":"value2"}' -H "Content-Type: application/json" [http://example.com/api](http://example.com/api) | POST JSON data |
| curl -F "file=@path_to_file" [http://example.com/upload](http://example.com/upload)                                              | Upload a file  |

---

## Other Useful Options

| Command                                                                                             | Description              |
| --------------------------------------------------------------------------------------------------- | ------------------------ |
| curl --limit-rate 1M -O [http://example.com/file.zip](http://example.com/file.zip)                  | Limit rate (e.g., 1MB/s) |
| curl -C - -O [http://example.com/file.zip](http://example.com/file.zip)                             | Resume broken download   |
| curl -x [http://proxyserver:port](http://proxyserver:port) [http://example.com](http://example.com) | Use a proxy              |

---

## Notes

* Replace `example.com` with your actual endpoint.
* Combine flags as needed for advanced use cases.

