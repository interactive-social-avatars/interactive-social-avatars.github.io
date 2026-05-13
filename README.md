# Interactive Social Avatars — ECCV 2026 Workshop

Source for the workshop website hosted at
**https://interactive-social-avatars.github.io/**.

The workshop runs at ECCV 2026 and includes the **4th GENEA Gesture
Generation Challenge**.

## Repo layout

```
.
├── index.html          # The single-page workshop site (all content lives here)
├── css/
│   ├── iva.min.css     # Base typography + section layout (from the GENEA template)
│   └── theme.css       # Workshop theme: blue palette, glass cards, floating blobs
├── js/
│   └── scrollspy.js    # Active-section highlight + smooth scroll
├── vendor/             # Bootstrap 4 + jQuery (only files actually used)
├── img/                # Workshop logo, speaker / organiser portraits
├── EDITING.md          # Step-by-step guide for updating each section
├── README.md           # This file
└── .gitignore
```

There is **no build step**. Edit files, push, and GitHub Pages serves them
directly (the repo name `*.github.io` makes Pages publish from the root of
`main` automatically).

## Editing the website

See **[EDITING.md](EDITING.md)** for a per-section guide (adding speakers,
organisers, accepted papers, dates, the announcement banner, images, etc.)
and for changing the colour theme.

## Local preview

```bash
cd interactive-social-avatars.github.io
python3 -m http.server 8000
# open http://localhost:8000
```

That's it — no `npm install`, no SCSS, no bundler.

## Credits

The HTML scaffold and `iva.min.css` typography are adapted from the
[GENEA Workshop](https://github.com/genea-workshop/genea-workshop.github.io)
template (MIT-licensed Start Bootstrap derivative).
