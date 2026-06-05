# Mobina Noorani — Portfolio Website

A fast, dependency-free personal portfolio (vanilla HTML / CSS / JavaScript) with an
interactive **Self-Organizing Map** demo that showcases the
[RepSC-SOM regionalization](https://github.com/mobinanoorany/reps_som_regionalization) work.

## Structure

```
portfolio_website/
├── index.html          # the whole single-page site
├── css/style.css       # styling (dark theme, responsive)
├── js/main.js          # nav, scroll reveals, hero neural-net background, typewriter
├── js/som-demo.js      # the interactive SOM playground
├── assets/
│   └── Mobina_Noorani_CV.pdf
└── README.md
```

## Preview locally

No build step. Either just double-click `index.html`, or serve it (recommended so
fonts/canvas behave exactly like production):

```bash
# from inside this folder
python -m http.server 8000
# then open http://localhost:8000
```

## Deploy to GitHub Pages (mobinanoorany.github.io)

1. Create a repo named **`mobinanoorany.github.io`** on GitHub.
2. Copy the contents of this folder into it (so `index.html` is at the repo root).
3. Push to the `main` branch.
4. GitHub → Settings → Pages → Source = `main` / root.
5. Your site goes live at `https://mobinanoorany.github.io`.

```bash
cd portfolio_website
git init
git add .
git commit -m "Portfolio website"
git branch -M main
git remote add origin https://github.com/mobinanoorany/mobinanoorany.github.io.git
git push -u origin main
```

## Editing tips

- All text lives in `index.html` — sections are clearly commented (`<!-- ===== ... ===== -->`).
- Colors/theme are CSS variables at the top of `css/style.css` (`:root { --accent: ... }`).
- To replace the CV, drop a new PDF in `assets/` and keep the same filename (or update the
  two links in `index.html`).
```