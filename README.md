# RegiMc21 — Game Developer Portfolio

React + Vite portfolio with a responsive, space-themed design and data-driven project gallery.

## Run locally

```sh
npm install
npm start
```

Vite prints the local development URL after startup. Create a production build with `npm run build`.

## Edit portfolio content

Update [src/data/portfolio.js](./src/data/portfolio.js) to edit the personal profile, links, bio, skills, experience, education, journey, QA information, and projects.

Project screenshots and videos can be added to `public/images/projects/` and registered in each project's `media` array. Leave the array empty to show the accessible preview placeholder. The CV is served from `public/resume/Resume.pdf`.

To show a WhatsApp contact button, set `VITE_WHATSAPP_NUMBER` in a local `.env` file (international number with country code; digits and formatting are accepted).

## Deploy to GitHub Pages

The Vite base is relative (`./`) so built assets work both on a user site and a repository project site. Configure the repository's GitHub Pages source to the `gh-pages` branch, then run:

```sh
npm run deploy
```

This builds `dist/` and publishes it to `gh-pages` using the configured Git remote.
