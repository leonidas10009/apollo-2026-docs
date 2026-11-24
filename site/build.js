'use strict';

const fs = require('fs');
const path = require('path');

const SITE = {
  name: 'Apollo 2026',
  baseUrl: 'https://leonidas10009.github.io/apollo-2026-docs/',
  indexNowKey: '2a0ec4e4c1214a3cb4294257dee17b26',
  repo: 'https://github.com/leonidas10009/Apollo_2026',
  releases: 'https://github.com/leonidas10009/Apollo_2026/releases',
  issues: 'https://github.com/leonidas10009/Apollo_2026/issues',
  discussions: 'https://github.com/leonidas10009/Apollo_2026/discussions',
  license: 'https://github.com/leonidas10009/Apollo_2026/blob/main/LICENSE',
  artemis: 'https://github.com/leonidas10009/Artemis-2026',
  artemisReleases: 'https://github.com/leonidas10009/Artemis-2026/releases',
  artemisPc: 'https://github.com/leonidas10009/Artemis-pc',
  input: 'https://github.com/leonidas10009/apollo_input',
  profile: 'https://github.com/leonidas10009',
  version: '1.0.2',
  artemisVersion: '1.0.3',
  updated: '2026-11-24',
};

const NAV = {
  en: [
    { key: 'install', label: 'Install', path: '/install-windows/' },
    { key: 'hdr', label: 'HDR & virtual display', path: '/hdr-virtual-display/' },
    { key: 'android', label: 'Android TV', path: '/android-tv/' },
    { key: 'compare', label: 'vs Sunshine', path: '/vs-sunshine/' },
    { key: 'faq', label: 'FAQ', path: '/faq/' },
  ],
  es: [
    { key: 'install', label: 'Instalar', path: '/es/instalar-windows/' },
    { key: 'hdr', label: 'HDR y pantalla virtual', path: '/es/hdr-pantalla-virtual/' },
    { key: 'android', label: 'Android TV', path: '/es/android-tv/' },
    { key: 'compare', label: 'vs Sunshine', path: '/es/vs-sunshine/' },
    { key: 'faq', label: 'FAQ', path: '/es/faq/' },
  ],
};

const PAGES = [
  {
    file: 'index',
    lang: 'en',
    slug: '/',
    nav: 'home',
    title: 'Apollo 2026 — Self-Hosted Game Streaming for Windows & Linux',
    description:
      'Apollo 2026 is a self-hosted, low-latency game streaming host for Windows and Linux with HDR virtual display, Web UI and Moonlight-compatible clients.',
    alt: '/es/',
    priority: '1.0',
    changefreq: 'weekly',
    breadcrumbs: [],
  },
  {
    file: 'install-windows',
    lang: 'en',
    slug: '/install-windows/',
    nav: 'install',
    title: 'Install Apollo 2026 on Windows 11 or 10 — Setup Guide',
    description:
      'Step-by-step Apollo 2026 install on Windows: requirements, installer vs portable ZIP, first run, firewall and pairing with Moonlight or Artemis 2026.',
    alt: '/es/instalar-windows/',
    priority: '0.9',
    changefreq: 'monthly',
    breadcrumbs: [{ name: 'Install on Windows', path: '/install-windows/' }],
  },
  {
    file: 'hdr-virtual-display',
    lang: 'en',
    slug: '/hdr-virtual-display/',
    nav: 'hdr',
    title: 'HDR Game Streaming & Virtual Display — Apollo 2026',
    description:
      'Set up HDR game streaming on Windows 11 with Apollo 2026: SudoVDA virtual display, automatic resolution, per-client persistence and dual-GPU laptops.',
    alt: '/es/hdr-pantalla-virtual/',
    priority: '0.9',
    changefreq: 'monthly',
    breadcrumbs: [{ name: 'HDR & virtual display', path: '/hdr-virtual-display/' }],
  },
  {
    file: 'android-tv',
    lang: 'en',
    slug: '/android-tv/',
    nav: 'android',
    title: 'Artemis 2026 for Android TV — Stream Your PC to TV',
    description:
      'Install Artemis 2026 on Android TV, Google TV or a tablet: APK downloads, leanback setup, pairing with Apollo 2026 and remote power actions.',
    alt: '/es/android-tv/',
    priority: '0.9',
    changefreq: 'monthly',
    breadcrumbs: [{ name: 'Android TV', path: '/android-tv/' }],
  },
  {
    file: 'vs-sunshine',
    lang: 'en',
    slug: '/vs-sunshine/',
    nav: 'compare',
    title: 'Apollo 2026 vs Sunshine — Game Streaming Host Comparison',
    description:
      'Apollo 2026 vs Sunshine: virtual display, HDR, Web UI, permissions, Android client and platform support compared, with an honest recommendation.',
    alt: '/es/vs-sunshine/',
    priority: '0.8',
    changefreq: 'monthly',
    breadcrumbs: [{ name: 'Apollo 2026 vs Sunshine', path: '/vs-sunshine/' }],
  },
  {
    file: 'faq',
    lang: 'en',
    slug: '/faq/',
    nav: 'faq',
    title: 'Apollo 2026 FAQ & Troubleshooting — Common Fixes',
    description:
      'Answers to common Apollo 2026 questions: virtual display not appearing, HDR looks wrong, input permissions, pairing errors and Play Protect warnings.',
    alt: '/es/faq/',
    priority: '0.8',
    changefreq: 'monthly',
    breadcrumbs: [{ name: 'FAQ & troubleshooting', path: '/faq/' }],
  },
  {
    file: 'index',
    lang: 'es',
    slug: '/es/',
    nav: 'home',
    title: 'Apollo 2026 — Streaming de juegos autoalojado para Windows y Linux',
    description:
      'Apollo 2026 es un host de streaming de juegos autoalojado para Windows y Linux con pantalla virtual HDR, Web UI y clientes compatibles con Moonlight.',
    alt: '/',
    priority: '0.9',
    changefreq: 'weekly',
    breadcrumbs: [],
  },
  {
    file: 'instalar-windows',
    lang: 'es',
    slug: '/es/instalar-windows/',
    nav: 'install',
    title: 'Instalar Apollo 2026 en Windows 11 o 10 — Guía paso a paso',
    description:
      'Instala Apollo 2026 en Windows: requisitos, instalador frente a ZIP portable, primer arranque, firewall y emparejamiento con Moonlight o Artemis 2026.',
    alt: '/install-windows/',
    priority: '0.8',
    changefreq: 'monthly',
    breadcrumbs: [{ name: 'Instalar en Windows', path: '/es/instalar-windows/' }],
  },
  {
    file: 'hdr-pantalla-virtual',
    lang: 'es',
    slug: '/es/hdr-pantalla-virtual/',
    nav: 'hdr',
    title: 'HDR y pantalla virtual con Apollo 2026 — Guía',
    description:
      'Configura HDR y pantalla virtual en Windows 11 con Apollo 2026: SudoVDA, resolución automática, persistencia por cliente y portátiles con doble GPU.',
    alt: '/hdr-virtual-display/',
    priority: '0.8',
    changefreq: 'monthly',
    breadcrumbs: [{ name: 'HDR y pantalla virtual', path: '/es/hdr-pantalla-virtual/' }],
  },
  {
    file: 'android-tv',
    lang: 'es',
    slug: '/es/android-tv/',
    nav: 'android',
    title: 'Artemis 2026 en Android TV — Juega a tu PC en la TV',
    description:
      'Instala Artemis 2026 en Android TV, Google TV o tablet: descarga de APK, leanback, emparejamiento con Apollo 2026 y acciones de encendido remoto.',
    alt: '/android-tv/',
    priority: '0.8',
    changefreq: 'monthly',
    breadcrumbs: [{ name: 'Android TV', path: '/es/android-tv/' }],
  },
  {
    file: 'vs-sunshine',
    lang: 'es',
    slug: '/es/vs-sunshine/',
    nav: 'compare',
    title: 'Apollo 2026 vs Sunshine — Comparativa de streaming',
    description:
      'Apollo 2026 frente a Sunshine: pantalla virtual, HDR, Web UI, permisos, cliente Android y plataformas, con una recomendación honesta.',
    alt: '/vs-sunshine/',
    priority: '0.7',
    changefreq: 'monthly',
    breadcrumbs: [{ name: 'Apollo 2026 vs Sunshine', path: '/es/vs-sunshine/' }],
  },
  {
    file: 'faq',
    lang: 'es',
    slug: '/es/faq/',
    nav: 'faq',
    title: 'Apollo 2026: preguntas frecuentes y solución de problemas',
    description:
      'Respuestas sobre Apollo 2026: pantalla virtual que no aparece, HDR incorrecto, permisos de entrada, errores de emparejamiento y avisos de Play Protect.',
    alt: '/faq/',
    priority: '0.7',
    changefreq: 'monthly',
    breadcrumbs: [{ name: 'Preguntas frecuentes', path: '/es/faq/' }],
  },
];

const OUT = path.join(__dirname, '..', 'docs');
const SRC = path.join(__dirname, 'src');
const PAGES_DIR = path.join(SRC, 'pages');

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function baseFor(slug) {
  const clean = slug.replace(/^\/|\/$/g, '');
  const segments = clean ? clean.split('/') : [];
  const isFile = segments.length > 0 && segments[segments.length - 1].endsWith('.html');
  const depth = isFile ? segments.length - 1 : segments.length;
  return depth === 0 ? './' : '../'.repeat(depth);
}

function siteLink(base, target) {
  return base + target.replace(/^\//, '');
}

function absolute(target) {
  return SITE.baseUrl + target.replace(/^\//, '');
}

function breadcrumbSchema(page) {
  if (!page.breadcrumbs.length) return null;
  const items = [
    { name: page.lang === 'es' ? 'Inicio' : 'Home', path: page.lang === 'es' ? '/es/' : '/' },
    ...page.breadcrumbs,
  ];
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absolute(item.path),
    })),
  };
}

function renderLayout(page, body) {
  const base = baseFor(page.slug);
  const langHome = siteLink(base, page.lang === 'es' ? '/es/' : '/');
  const canonical = absolute(page.slug);
  const alternate = absolute(page.alt);
  const langSwitch = page.lang === 'en'
    ? `<a class="lang-switch" href="${siteLink(base, page.alt)}" hreflang="es" lang="es" title="Cambiar a español">Español</a>`
    : `<a class="lang-switch" href="${siteLink(base, page.alt)}" hreflang="en" lang="en" title="Switch to English">English</a>`;
  const nav = NAV[page.lang];
  const navHtml = nav
    .map((item) => {
      const active = item.key === page.nav ? ' class="is-active" aria-current="page"' : '';
      return `<a href="${siteLink(base, item.path)}"${active}>${escapeHtml(item.label)}</a>`;
    })
    .join('\n        ');
  const ogImage = SITE.baseUrl + 'assets/og-apollo-2026.png';
  const locale = page.lang === 'en' ? 'en_US' : 'es_ES';
  const otherLocale = page.lang === 'en' ? 'es_ES' : 'en_US';
  const breadcrumbs = page.breadcrumbs.length
    ? `<nav class="breadcrumbs" aria-label="${page.lang === 'es' ? 'Migas de pan' : 'Breadcrumb'}">
        <a href="${langHome}">${page.lang === 'es' ? 'Inicio' : 'Home'}</a>
        <span aria-hidden="true">/</span>
        <span>${escapeHtml(page.breadcrumbs[0].name)}</span>
      </nav>`
    : '';
  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Apollo 2026 Documentation',
      url: SITE.baseUrl,
      inLanguage: page.lang,
      publisher: {
        '@type': 'Person',
        name: 'Leonidas',
        url: SITE.profile,
      },
    },
    breadcrumbSchema(page),
  ].filter(Boolean);
  const robots = page.slug === '/404.html'
    ? 'noindex,follow'
    : 'index,follow,max-image-preview:large,max-snippet:-1';

  return `<!doctype html>
<html lang="${page.lang}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(page.title)}</title>
  <meta name="description" content="${escapeHtml(page.description)}">
  <link rel="canonical" href="${canonical}">
  <meta name="robots" content="${robots}">
  <meta name="author" content="Leonidas">
  <meta name="theme-color" content="#080b10">
  <link rel="icon" type="image/png" href="${base}assets/logo.png">
  <link rel="apple-touch-icon" href="${base}assets/logo.png">
  <link rel="stylesheet" href="${base}assets/style.css">
  <link rel="alternate" hreflang="en" href="${page.lang === 'en' ? canonical : alternate}">
  <link rel="alternate" hreflang="es" href="${page.lang === 'es' ? canonical : alternate}">
  <link rel="alternate" hreflang="x-default" href="${page.lang === 'en' ? canonical : alternate}">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Apollo 2026 Documentation">
  <meta property="og:title" content="${escapeHtml(page.title)}">
  <meta property="og:description" content="${escapeHtml(page.description)}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:image" content="${ogImage}">
  <meta property="og:image:width" content="1280">
  <meta property="og:image:height" content="640">
  <meta property="og:image:alt" content="Apollo 2026 — self-hosted game streaming host">
  <meta property="og:locale" content="${locale}">
  <meta property="og:locale:alternate" content="${otherLocale}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(page.title)}">
  <meta name="twitter:description" content="${escapeHtml(page.description)}">
  <meta name="twitter:image" content="${ogImage}">
  <script type="application/ld+json">${JSON.stringify(schema)}</script>
</head>
<body>
  <a class="skip-link" href="#main">${page.lang === 'es' ? 'Saltar al contenido' : 'Skip to content'}</a>
  <header class="site-header">
    <div class="header-inner">
      <a class="brand" href="${langHome}" aria-label="Apollo 2026 — ${page.lang === 'es' ? 'inicio' : 'home'}">
        <img src="${base}assets/logo.png" alt="" width="36" height="36">
        <span>Apollo 2026 <small>docs</small></span>
      </a>
      <nav class="site-nav" aria-label="${page.lang === 'es' ? 'Principal' : 'Main'}">
        ${navHtml}
      </nav>
      ${langSwitch}
    </div>
  </header>
  <main id="main">
    ${breadcrumbs}
    ${body}
  </main>
  <footer class="site-footer">
    <div class="footer-inner">
      <div class="footer-grid">
        <div>
          <p class="footer-brand">Apollo 2026</p>
          <p class="footer-copy">${page.lang === 'es'
            ? 'Streaming de juegos autoalojado, de baja latencia, con pantalla virtual HDR para Windows y Linux.'
            : 'Self-hosted, low-latency game streaming with HDR virtual displays for Windows and Linux.'}</p>
        </div>
        <div>
          <h2>${page.lang === 'es' ? 'Documentación' : 'Documentation'}</h2>
          <ul>
            <li><a href="${siteLink(base, page.lang === 'es' ? '/es/instalar-windows/' : '/install-windows/')}">${page.lang === 'es' ? 'Instalar en Windows' : 'Install on Windows'}</a></li>
            <li><a href="${siteLink(base, page.lang === 'es' ? '/es/hdr-pantalla-virtual/' : '/hdr-virtual-display/')}">${page.lang === 'es' ? 'HDR y pantalla virtual' : 'HDR & virtual display'}</a></li>
            <li><a href="${siteLink(base, page.lang === 'es' ? '/es/android-tv/' : '/android-tv/')}">${page.lang === 'es' ? 'Android TV' : 'Android TV'}</a></li>
            <li><a href="${siteLink(base, page.lang === 'es' ? '/es/faq/' : '/faq/')}">FAQ</a></li>
          </ul>
        </div>
        <div>
          <h2>${page.lang === 'es' ? 'Proyecto' : 'Project'}</h2>
          <ul>
            <li><a href="${SITE.repo}">Apollo 2026</a></li>
            <li><a href="${SITE.releases}">Releases</a></li>
            <li><a href="${SITE.artemis}">Artemis 2026</a></li>
            <li><a href="${SITE.issues}">Issues</a></li>
            <li><a href="${SITE.license}">GPL-3.0</a></li>
          </ul>
        </div>
      </div>
      <p class="disclaimer">${page.lang === 'es'
        ? 'Apollo 2026 es un fork independiente y no oficial del ecosistema Apollo / Sunshine / Moonlight. No está afiliado a ClassicOldSong, LizardByte ni Moonlight Stream. Todo el crédito a sus autores originales.'
        : 'Apollo 2026 is an independent, unofficial fork in the Apollo / Sunshine / Moonlight ecosystem. It is not affiliated with ClassicOldSong, LizardByte or Moonlight Stream. All credit to the original authors.'}</p>
      <p class="footer-meta">${page.lang === 'es' ? 'Documentación actualizada' : 'Documentation updated'} ${SITE.updated} · Apollo 2026 ${SITE.version} · Artemis 2026 ${SITE.artemisVersion}</p>
    </div>
  </footer>
</body>
</html>
`;
}

function build() {
  fs.rmSync(OUT, { recursive: true, force: true });
  fs.mkdirSync(OUT, { recursive: true });

  for (const page of PAGES) {
    const bodyPath = path.join(PAGES_DIR, page.lang, `${page.file}.html`);
    if (!fs.existsSync(bodyPath)) {
      throw new Error(`Missing page body: ${bodyPath}`);
    }
    const body = fs.readFileSync(bodyPath, 'utf8').replaceAll('{{base}}', baseFor(page.slug));
    const html = renderLayout(page, body);
    const targetDir = path.join(OUT, page.slug.replace(/^\//, ''));
    fs.mkdirSync(targetDir, { recursive: true });
    fs.writeFileSync(path.join(targetDir, 'index.html'), html, 'utf8');
    console.log(`  ${page.slug}`);
  }

  fs.mkdirSync(path.join(OUT, 'assets'), { recursive: true });
  for (const asset of ['style.css', 'logo.png', 'og-apollo-2026.png']) {
    fs.copyFileSync(path.join(SRC, 'assets', asset), path.join(OUT, 'assets', asset));
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${PAGES.map(
  (page) => `  <url>
    <loc>${absolute(page.slug)}</loc>
    <lastmod>${SITE.updated}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
).join('\n')}
</urlset>
`;
  fs.writeFileSync(path.join(OUT, 'sitemap.xml'), sitemap, 'utf8');

  fs.writeFileSync(
    path.join(OUT, 'robots.txt'),
    `User-agent: *\nAllow: /\n\nSitemap: ${SITE.baseUrl}sitemap.xml\n`,
    'utf8'
  );

  fs.writeFileSync(
    path.join(OUT, 'llms.txt'),
    `# Apollo 2026

> Apollo 2026 is an independent, self-hosted, low-latency game streaming host for Windows and Linux, based on the Sunshine 2026 codebase. It adds HDR virtual displays via SudoVDA, a Web UI, per-client permissions, OTP pairing and the Artemis 2026 Android client.

Key facts:
- License: GPL-3.0-only
- Latest Apollo 2026 release: ${SITE.version}
- Latest Artemis 2026 release: ${SITE.artemisVersion}
- Platforms: Windows (10 22H2+ / 11), Linux, macOS, FreeBSD; HDR virtual display is Windows-only at the moment
- Not affiliated with ClassicOldSong, LizardByte or Moonlight Stream

## Documentation
- [Home](${SITE.baseUrl})
- [Install on Windows](${SITE.baseUrl}install-windows/)
- [HDR and virtual display](${SITE.baseUrl}hdr-virtual-display/)
- [Android TV with Artemis 2026](${SITE.baseUrl}android-tv/)
- [Apollo 2026 vs Sunshine](${SITE.baseUrl}vs-sunshine/)
- [FAQ and troubleshooting](${SITE.baseUrl}faq/)
- [Spanish documentation](${SITE.baseUrl}es/)

## Source
- [Apollo 2026 repository](${SITE.repo})
- [Releases](${SITE.releases})
`,
    'utf8'
  );

  fs.writeFileSync(path.join(OUT, '.nojekyll'), '', 'utf8');

  fs.writeFileSync(
    path.join(OUT, `${SITE.indexNowKey}.txt`),
    SITE.indexNowKey,
    'utf8'
  );

  const notFound = renderLayout(
    {
      file: '404',
      lang: 'en',
      slug: '/404.html',
      nav: 'home',
      title: 'Page not found — Apollo 2026',
      description: 'The page you requested does not exist.',
      alt: '/es/',
      breadcrumbs: [],
    },
    `<section class="page-head">
      <p class="eyebrow">404</p>
      <h1>Page not found</h1>
      <p class="lead">The page you requested does not exist. Start from the documentation home or install guide.</p>
      <div class="actions">
        <a class="btn btn-primary" href="./">Documentation home</a>
        <a class="btn" href="./install-windows/">Install on Windows</a>
      </div>
    </section>`
  ).replace(
    '<meta charset="utf-8">',
    `<meta charset="utf-8">\n  <base href="${SITE.baseUrl}">`
  );
  fs.writeFileSync(path.join(OUT, '404.html'), notFound, 'utf8');

  console.log(`\nBuilt ${PAGES.length} pages + 404 into ${OUT}`);
}

build();
