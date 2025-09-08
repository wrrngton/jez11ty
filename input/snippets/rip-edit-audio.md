---
title: Ripping and cutting music sets
description: Ripping and cutting music sets
tags: ["commandline"]
---

Here's a simple process to rip audio, add metadata and cut the audio from the command line:

```console
yt-dlp --extract--audio --audio-quality 0 "https://youtu.be/vbkyazLGovM?si=SQXs6PHIcBrsr5to"
```

This rips a 3 hour set locally. Use `mv` if you want to rename the file. Let's call the file `set.m4a`.

Adding metadata using `exiftool`:

```console
exiftool -Title="Big set" -Artist="Wicked skengman" set.m4a
```

It's a three hour set and we only want from 2:30:00 until the end, so only the last 30 minutes, for this we can use `ffmpeg`.

```console
ffmpeg -i set.m4a -ss 2:30:00 -c copy output.m4a
```
Alternatively between two timestamps:

```console
ffmpeg -i set.m4a -ss 2:30:00 -to 2:50:00 -c copy output.m4a
```

`copy` copies the file without re-encoding.

If using `cmus` then run the following to update your library with the new file:

```console
:add ~/Music/
```
