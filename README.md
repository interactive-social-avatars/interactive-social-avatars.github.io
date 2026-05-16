# Interactive Social Avatars - ECCV 2026 Workshop

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
├── img/                # Image assets
│   ├── assets/         # Logos, hero, favicon, banners
│   ├── speakers/       # Invited-speaker portraits
│   └── organisers/     # Workshop & GENEA organiser portraits
├── README.md           # This file
└── .gitignore
```

There is **no build step**. Edit files, push, and GitHub Pages serves them
directly (the repo name `*.github.io` makes Pages publish from the root of
`main` automatically).

## Editing the website

All content lives in `index.html`. The page is split into nine sections,
each with a clear banner comment and a unique `id`:

| Section ID            | What's in it                                |
|-----------------------|---------------------------------------------|
| `home`                | Title, subtitle, intro, hero image          |
| `important-dates`     | Submission / camera-ready / event dates     |
| `call-for-papers`     | Topics, submission types, OpenReview link   |
| `challenge`           | GENEA Challenge overview, dataset, links    |
| `programme`           | Workshop schedule rows                      |
| `invited-speakers`    | Speaker bios + photos                       |
| `accepted-papers`     | List of accepted papers (after acceptance)  |
| `organising-committee`| Workshop and challenge organisers           |
| `contact`             | Contact email, social links                 |

To add a speaker, organiser, paper, date, or schedule row, copy one of the
existing entries inside the relevant section and edit the fields.
The nav bar entries match the section `id`s, so adding a new section just
needs a matching `<li>` in the `<nav>`.

To change the colour theme, edit the CSS variables at the top of
`css/theme.css` (`--isa-blue-*`, `--isa-cyan-300`, `--isa-violet-300`).
The four background "blob" shapes are defined just below as
`.isa-blob.b1` … `.b4`.

## Local preview

```bash
cd interactive-social-avatars.github.io
python3 -m http.server 8000
# open http://localhost:8000
```

That's it - no `npm install`, no SCSS, no bundler.

## Credits

The HTML scaffold and `iva.min.css` typography are adapted from the
[GENEA Workshop](https://github.com/genea-workshop/genea-workshop.github.io)
template (MIT-licensed Start Bootstrap derivative).
