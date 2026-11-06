# Khmer TTS broadcast service (播声服务)

Server-side source for the voice announcement used by `src/lib/tts.ts`
(`https://cambet89.online/api/khmer-tts`).

## Files
- `khmer-tts.php` — POST endpoint that turns a Khmer transfer announcement into an MP3
  (Google Translate TTS, `tl=km`). Accepts either `{ "text": "…" }` (raw text, used by the app)
  or `{ "template": "ជូនដំណឹង ****", "amount": "12.5", "currency": "USD" }`.
  KHR amounts are read as Khmer integers; USD reads `0.1–0.9` as `…សេន` and ends with `ដុល្លា`.
  `GET` returns a small JSON describing the service.
- `test-tts.html` — browser test page (form + play button) copied from the server.

## Deploy
1. Upload `khmer-tts.php` to the web root of a PHP host (needs `curl` + `mbstring`).
2. Map the public path used by the app:

```apache
RewriteRule ^api/khmer-tts$ /khmer-tts.php [L]
```

3. GitHub Pages serves static files only, so this endpoint cannot run on
   `mrkk9919.github.io/ABA001`. Point `SERVER_TTS_ENDPOINT` in `src/lib/tts.ts`
   at your PHP host if you move it.

## Smoke test
```bash
curl -X POST https://cambet89.online/api/khmer-tts \
  -H 'Content-Type: application/json' \
  -d '{"text":"ជូនដំណឹង អ្នកទទួលបាន ១២ ដុល្លា"}' -o out.mp3
```
