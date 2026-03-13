---
title: "Building an automatic skate search engine"
description: "My attempt at building an automated skate search engine"
layout: "pages/post.njk"
tags: ["search"]
category: project
date: "2026-03-11"
modified: "2026-03-11"
draft: true
---

I have this crazy project idea where I automatically build a search index of every skate song ever used in a skate song.

## Why?

- Maybe someday AI will be able to do this, but it would be nice to build something big before that day arrives
- Current efforts to do this involve manually atrribution. Websites like [Slate Video Site](https://www.skatevideosite.com/) are amazing but they don't cover all skate videos and not all songs are fingerprinted. They also don't include timestamps, which is something I wanted to solve.

## The approach:

- Identify all skate videos..
    - How do you do this? What kind of skate videos do we want to fingerprint? Obviously Thrasher, Transworld etc. But do we fingerprint local skateshop videos? What about the videos made by a friend in year 7 on Youtube?
    - What about physical videos that aren't on Youtube? I think i'm going to do this by getting physical copies of skatevideos.

## SkateTrack AI: Project Implementation Roadmap

### Phase 1: Data Preparation (The Library)
1. **Source Clean Metadata:** Scrape **SkateVideoSite** or **Skatefolio** to create a "Target List" of 50,000+ songs known to exist in skate media.
2. **Build Reference Database:** Obtain clean audio for these tracks (via AcoustID dumps or APIs) and generate **Chromaprint (fpcalc)** hashes.
3. **Index for Search:** Store these hashes in a **PostgreSQL** database using bitwise indexing for sub-second similarity lookups.

### Phase 2: Video Acquisition (The Ingest)
4. **URL Discovery:** Use the YouTube Data API to crawl major skate channels (Thrasher, Berrics, Supreme) and independent filmers.
5. **Set up Task Queue:** Deploy **Redis** and **Celery** to manage millions of URLs, ensuring the system can resume if a crash occurs.
6. **Stream Extraction:** Use `yt-dlp` to pipe audio directly into memory or a temporary buffer—**do not** store the raw video files locally.

### Phase 3: The Processing Pipeline (The "Brain")
7. **Audio Pre-Processing:** Run the extracted audio through **Demucs v4** to isolate the music from the percussive noise of skateboards (wheels, pops, grinds).
8. **Segmented Fingerprinting:** Slice the "cleaned" audio into 10-second windows and generate hashes for each segment.
9. **Pattern Matching:** Query the Reference Database for each segment hash and perform **Temporal Alignment** (ensuring song hashes appear in the correct chronological order).

### Phase 4: Scaling & Deployment (The "Engine")
10. **Containerization:** Wrap the worker scripts in **Docker** to ensure the environment is identical across different machines.
11. **Local Swarm Orchestration:** Link your local PCs using **Docker Swarm** to process the video queue in parallel.
12. **Confidence Scoring:** Implement a logic gate to flag matches with low confidence for manual community review.

### Phase 5: Front-End & Reverse Search
13. **API Development:** Build a **FastAPI** backend to serve the "Song -> Video" relationship data.
14. **User Interface:** Create a search engine that returns the video title, part name, and a **YouTube timestamp link** (e.g., `&t=120s`) for every match.

