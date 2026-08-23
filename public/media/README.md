# Footage slots

Both video sections work without any files here — an SVG understudy performs the
same beat. Drop a real file in with the exact name below and the page swaps to it
automatically on next load (the components probe with a HEAD request first, so a
missing file never shows a broken player).

| File | Where it plays | What it should be |
| --- | --- | --- |
| `assembly-loop.mp4` | Fixed background behind every section | Slow-motion loop of the tuk-tuk separating into an exploded product view and reassembling. Muted, seamless loop, ~20–30s. |
| `getaway-launch.mp4` | Section 2, scrubbed by scroll | The tuk-tuk igniting its toxic-green afterburners and launching into the night sky. No audio, encoded for fast seeking (short keyframe interval, e.g. `-g 15`), ~10–20s. |

For scroll scrubbing, re-encode with dense keyframes or seeking will feel sticky:

```sh
ffmpeg -i source.mov -an -vf scale=1920:-2 -c:v libx264 -crf 22 -g 15 -movflags +faststart getaway-launch.mp4
```
