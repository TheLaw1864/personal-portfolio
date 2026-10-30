# Dakotah Howes — Personal Portfolio

A living, content-driven portfolio website. All copy and image references live in
**one file** so the site is trivial to update and to move to a live server.

## The one file you edit
```
assets/js/content.js
```
Everything on the page is generated from `SITE_CONTENT` in that file:
- Change any text → edit the string.
- Add a photo → drop it in `assets/img/` and set the path (e.g. `"assets/img/me.jpg"`).
- Add/remove a capability, work item, or personal group → add/remove an array entry.

Empty image paths automatically show a labelled placeholder, so nothing breaks
while you're still collecting assets.

## Run locally
From this folder:
```bash
python3 -m http.server 8080
```
Then open http://localhost:8080

(You can also just double-click `index.html`, but a server is recommended.)

## Structure
```
index.html            → home page (hero, about, what I do, work, archive, contact)
beyond.html           → "Beyond work" page (story, skills, photo slideshows)
assets/css/styles.css → all styling, effects, light/dark themes
assets/js/content.js  → YOUR CONTENT (single source of truth for BOTH pages)
assets/js/main.js     → renders content + all interactions
assets/img/           → put your images here
assets/img/decks/     → rendered slides from your AGM/year-end presentations
```

## Features
- **Light / dark mode** — toggle in the top-right; the choice is remembered between visits.
- **Copy to clipboard** — the contact buttons copy the email / phone / LinkedIn on click
  (works on a real https server or localhost).
- **Archive lightbox** — click any presentation to page through every slide.
- **Slideshows** — the Beyond page galleries auto-advance, with arrows + dots.
- **Easter eggs** — click the "DH" logo, and the red word in the hero. Go exploring.

## Historic record / versioning
This project is a git repository. Every time you change content, commit it:
```bash
git add -A && git commit -m "Update: <what changed>"
```
That keeps a full history of every version, and lets you carry everything across
to a live server later with `git clone` / `git push`.

## Going live later
Because it's plain HTML/CSS/JS with no build step, you can host it as-is on:
Netlify, Vercel, GitHub Pages, Cloudflare Pages, or any web server — just upload
the folder. Your `content.js` comes with it, so all copy and image references
transfer unchanged.
