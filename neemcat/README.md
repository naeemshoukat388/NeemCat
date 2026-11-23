# NeemCat

NeemCat turns a messy idea, in any language, into one clean professional English prompt to paste into any AI.

Live site: https://neemcat.pages.dev

## What's inside

- `index.html` — the website. Type your idea, answer a few questions, get one prompt. Also an installable app (phone + PC).
- `data/` — 5,000 cleaned prompts and 53 role prompts for the library.
- `manifest.webmanifest`, `sw.js`, `icons/` — installable app files.

## Backend — kept private on purpose

The backend (a Cloudflare Worker) is **not** in this repo. It is already deployed and live, and it holds the AI's prompt rules. Keeping it out of GitHub means nobody can copy those rules or try to get through them.

The API keys live in the Worker as secrets on Cloudflare, never in any file here.

## Run it locally

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000

## Licence

MIT
