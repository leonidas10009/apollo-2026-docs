# Apollo 2026 documentation site

Static, dependency-free documentation site for **Apollo 2026** and **Artemis 2026**. Published with GitHub Pages from the `docs/` folder.

Live site: <https://leonidas10009.github.io/apollo-2026-docs/>

## Structure

- `site/build.js` — page generator: layout, metadata, hreflang, sitemap, robots, `llms.txt` and 404.
- `site/src/pages/en/` — English page bodies.
- `site/src/pages/es/` — Spanish page bodies.
- `site/src/assets/` — stylesheet, logo and Open Graph image.
- `docs/` — generated output served by GitHub Pages. Do not edit by hand.

## Build

Requires Node.js 18 or newer. There are no npm dependencies.

```bash
node site/build.js
node site/check-links.js docs
```

The first command rebuilds `docs/`. The second checks internal links, titles, descriptions and canonical tags.

## Adding or changing a page

1. Edit the body in `site/src/pages/<lang>/<file>.html`.
2. Add or update the page entry in the `PAGES` array of `site/build.js` (slug, title, description, alternate language, priority).
3. Run the build and the link check.
4. Commit both `site/` and the regenerated `docs/`.

Internal links inside page bodies use the `{{base}}` placeholder, which the build replaces with the correct relative prefix for the page depth.

## Deployment

GitHub Pages serves the `main` branch, `/docs` folder. Every push that changes `docs/` republishes the site.

Canonical URLs, Open Graph URLs and the sitemap use `SITE.baseUrl` in `site/build.js`. Update it if the site moves to a custom domain, then rebuild.

## Search engines

`site/build.js` writes an IndexNow verification key (`SITE.indexNowKey`) to the site root. After publishing new or changed pages, submit the URLs to `https://api.indexnow.org/indexnow` with that key; Bing, Yandex and Seznam consume it. Google does not use IndexNow and requires Search Console with `sitemap.xml`.

## Content policy

- Apollo 2026 and Artemis 2026 are independent, unofficial forks in the Apollo / Sunshine / Moonlight ecosystem.
- The site is not affiliated with ClassicOldSong, LizardByte or Moonlight Stream.
- All original work is credited to its authors.
