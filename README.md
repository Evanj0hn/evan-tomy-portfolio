# Evan John Tomy — Portfolio Website

A single-page portfolio built with plain HTML, CSS, and JavaScript — no build step,
no frameworks, no dependencies beyond a Google Fonts stylesheet link. Every file
can be opened, edited, and understood directly.

## Folder structure

```
evan-tomy-portfolio/
├── index.html              All page content and structure
├── css/
│   ├── variables.css        Colors, fonts, spacing tokens (dark + light theme)
│   ├── base.css              Reset, typography, buttons, utility classes
│   ├── components.css        Header, hero, cards, timeline, forms, footer
│   ├── animations.css        Keyframes, scroll-reveal, reduced-motion rules
│   └── responsive.css        Breakpoints for tablet/mobile
├── js/
│   ├── theme.js               Dark/light toggle + persistence
│   ├── navigation.js          Sticky header, mobile menu, scrollspy, back-to-top
│   ├── animations.js          Scroll reveals, counters, typing effect, timeline
│   └── interactions.js        Particle background, project cards, contact form
├── images/
│   ├── favicon.svg
│   ├── hero-pattern.svg
│   ├── social-preview.png    Open Graph image for link previews
│   └── projects/              One illustration per project
└── assets/
    └── Evan-John-Tomy-Resume.pdf   Powers the "Résumé" download button
```

Nothing references files outside this folder, so the whole `evan-tomy-portfolio/`
directory is the thing you deploy.

## Preview it locally

Opening `index.html` directly in a browser works for a quick look, but some
browsers block relative asset loading over `file://`. It's more reliable to serve
it over a local HTTP server:

```bash
cd evan-tomy-portfolio
python3 -m http.server 8000
# then visit http://localhost:8000
```

(Or, if you have Node: `npx serve .`)

## Deploying for free

Any static host works. Three easy options:

**GitHub Pages**
1. Create a new GitHub repository and push the contents of this folder to it.
2. In the repo, go to Settings → Pages → Source, and select the `main` branch.
3. Your site will be live at `https://<your-username>.github.io/<repo-name>/`.

**Netlify**
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop).
2. Drag the `evan-tomy-portfolio` folder into the browser window.
3. Netlify gives you a live URL immediately; you can add a custom domain in site settings.

**Vercel**
1. Run `npx vercel` from inside the `evan-tomy-portfolio` folder and follow the prompts, or
2. Import the folder/repo at [vercel.com/new](https://vercel.com/new).

All three are free for a personal portfolio and support adding your own domain later.

## Customizing

- **Content**: everything visible is plain text in `index.html` — search for the
  section (`id="about"`, `id="experience"`, etc.) and edit directly.
- **Colors/theme**: change the hex values in `css/variables.css`. `--accent` and
  `--accent-2` control the gradient used throughout the site.
- **Fonts**: swap the Google Fonts link in the `<head>` of `index.html` and update
  the `--font-heading` / `--font-body` / `--font-mono` variables in `css/variables.css`.
- **Résumé**: replace `assets/Evan-John-Tomy-Resume.pdf` with an updated PDF, keeping
  the same filename (or update the `href` in the two "Résumé" links in `index.html`).
- **Projects**: each project card lives in the `#projects` section of `index.html`.
  Duplicate a `<article class="project-card">` block to add a new one, and drop a
  matching SVG or image into `images/projects/`.

## Notes

- The contact form doesn't send anything itself — it opens the visitor's email
  client with the message pre-filled (`mailto:`), which is what allows it to work
  without any backend or paid form service. If you'd rather capture submissions
  directly, services like Formspree or Netlify Forms can be dropped in later.
- The site respects `prefers-reduced-motion` and works with JavaScript disabled
  (content is simply static and unanimated in that case).
