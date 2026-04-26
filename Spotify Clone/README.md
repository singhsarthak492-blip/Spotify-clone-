# Spotify Clone (local)

Quick local copy of a Spotify-like UI that plays local audio files.

How to run

- Open directly in browser (may have autoplay restrictions):
  - Open `index.html` in your browser.
- Recommended: serve over HTTP to avoid file:// playback issues:
  - From the project folder run:

```bash
./start-server.sh
# then open http://localhost:8001
```

Notes
- Uses local files in `songs/` and `covers/`.
- If playback is blocked, check DevTools Console for warnings or errors.

Contact
- Keep working on it — small fixes applied to `script.js` to make initialization safer.
