import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { SITE, PAGES, PROFILS, PORTE, META, url, fiche, adresses, renvois } from '../src/data/seo.js';
import { MARQUES, MERE, MARQUE_DE_L_ESPACE, nomComplet } from '../src/data/marques.js';
import { CABINET, ID_SITE, OFFRES_ENTREPRISES, ZONE, personne, service, typeDePage } from '../../scripts/entreprise.mjs';
import { intention } from '../src/data/intentions.js';

/* ════════════════════════════════════════════════════════════
   LE PRÉ-RENDU — écrire un vrai fichier par adresse.

   Le site est une application à routage client. Sur GitHub Pages, une adresse
   qui ne correspond à aucun fichier renvoie 404 : /reskope/offres répondait
   donc 404 à Google tout en s'affichant normalement pour un visiteur. Les
   vingt adresses du plan du site étaient toutes annoncées mortes.

   Ce script tourne après `vite build`. Il reprend la coquille produite par
   Vite et en écrit une copie par adresse, avec :
     - le titre, la description et la canonique de CETTE page
     - ses balises de partage et son schema
     - un résumé lisible sans JavaScript, et les liens vers les autres pages

   Le contenu statique est posé DANS #root : React le remplace au montage. Un
   robot qui n'exécute pas le JavaScript (c'est le cas de GPTBot, de
   PerplexityBot et de ClaudeBot) lit donc du vrai texte et suit de vrais
   liens, et un visiteur voit l'application. Ce qui est écrit dans le HTML est
   ce que la page raconte : il n'y a pas deux versions du discours.
   ════════════════════════════════════════════════════════════ */

/* La sortie de l'espace TPE et PME, avant sa réunion avec le reste du site. */
const DIST = resolve(dirname(fileURLToPath(import.meta.url)), '../../dist-tech');
const ech = (t) => String(t)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;');

const coquille = readFileSync(resolve(DIST, 'index.html'), 'utf8');

/* On retire de la coquille tout ce qui est propre à une page, pour le
   réécrire ensuite. Sans ça, la canonique de l'accueil serait recopiée sur
   les vingt autres adresses — et c'est exactement ce qui se passait. */
function nettoyer(html) {
  return html
    .replace(/<title>[\s\S]*?<\/title>/i, '<!--TITRE-->')
    .replace(/<meta\s+name="description"[\s\S]*?\/>/i, '')
    .replace(/<link\s+rel="canonical"[\s\S]*?\/>/i, '')
    .replace(/<meta\s+property="og:(title|description|url|type)"[\s\S]*?\/>/gi, '')
    .replace(/<meta\s+name="twitter:(title|description)"[\s\S]*?\/>/gi, '')
    .replace(/<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/i, '<!--SCHEMA-->');
}
const base = nettoyer(coquille);

/* ── Le schema ──────────────────────────────────────────────
   La fiche de l'entreprise et la liste des offres sont communes aux deux
   applications : elles vivent dans scripts/entreprise.mjs, à la racine. */
const OFFRES = OFFRES_ENTREPRISES;

function schemaDe(profil, route, f) {
  const adresse = url(profil, route);
  const fil = [{ '@type': 'ListItem', position: 1, name: 'Accueil', item: `${SITE.origine}${SITE.base}/` }];
  if (profil) {
    fil.push({
      '@type': 'ListItem', position: 2,
      name: profil === 'tpe' ? 'TPE, artisans et commerçants' : 'PME',
      item: url(profil, '/'),
    });
  }
  if (route !== '/') fil.push({ '@type': 'ListItem', position: fil.length + 1, name: f.h1, item: adresse });

  const blocs = [
    {
      '@type': typeDePage(route),
      '@id': `${adresse}#page`,
      url: adresse,
      name: `${f.titre} · ${nomComplet(MARQUE_DE_L_ESPACE[profil])}`,
      description: f.description,
      inLanguage: 'fr',
      isPartOf: { '@type': 'WebSite', '@id': ID_SITE, name: SITE.marque, url: `${SITE.origine}${SITE.base}/` },
      about: { '@id': CABINET['@id'] },
    },
    { '@type': 'BreadcrumbList', itemListElement: fil },
  ];

  if (route === '/') blocs.push(CABINET);
  /* Une page locale déclare le service (dans sa ville quand elle en a une) ;
     un guide est un article signé, publié par le cabinet. */
  if (f.intention === 'local') {
    const ville = ZONE.find((z) => z.name === f.ville);
    blocs.push({ ...service(f.h1, f.description, adresse), ...(ville && f.ville !== 'Nord' ? { areaServed: ville } : {}) });
  }
  if (f.intention === 'guide') {
    blocs.push({
      '@type': 'Article',
      headline: f.h1,
      description: f.description,
      inLanguage: 'fr',
      mainEntityOfPage: { '@id': `${adresse}#page` },
      author: [personne('Thomy Phanzu', 'Cofondatrice de Reskope'), personne('Florian Bouchart', 'Cofondateur de Reskope')],
      publisher: { '@id': CABINET['@id'] },
      datePublished: f.publie || '2026-10-04',
      dateModified: new Date().toISOString().slice(0, 10),
    });
  }

  if (route === '/offres' && OFFRES[profil]) {
    blocs.push({
      '@type': 'ItemList',
      name: f.titre,
      itemListElement: OFFRES[profil].map(([nom, desc], i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: service(nom, desc, adresse),
      })),
    });
  }

  return { '@context': 'https://schema.org', '@graph': blocs };
}

/* ── Le contenu lisible sans JavaScript ─────────────────────
   Un titre, le résumé de la page, et les liens vers les autres pages : de
   quoi comprendre et de quoi circuler. React remplace ce bloc au montage. */
function corps(profil, route, f) {
  const liens = PAGES
    .filter((p) => (!p.profils || p.profils.includes(profil || 'pme')) && p.route !== route)
    .filter((p) => fiche(profil || 'pme', p.route))
    .map((p) => {
      const g = fiche(profil || 'pme', p.route);
      const href = p.vers ? `${SITE.origine}${SITE.base}${p.vers(profil || 'pme')}` : url(profil, p.route);
      return `<li><a href="${href}">${ech(g.titre)}</a></li>`;
    })
    .join('');

  const autre = profil === 'pme' ? 'tpe' : 'pme';
  const bascule = profil
    ? `<p><a href="${url(autre, '/')}">${autre === 'tpe'
      ? 'Vous êtes une TPE, un artisan ou un commerçant ? Voir la version TPE'
      : 'Vous êtes une PME de plus de dix personnes ? Voir la version PME'}</a></p>`
    : PROFILS.map((p) => `<p><a href="${url(p, '/')}">${ech(META[p]['/'].titre)}</a></p>`).join('');

  /* Une page par intention : tout son texte, pour les robots qui ne lisent
     pas le JavaScript. */
  const it = intention(route);
  const detail = it && it.profil === profil ? `
      <p>${ech(it.accroche)}</p>${it.points ? `<ul>${it.points.map((t) => `<li>${ech(t)}</li>`).join('')}</ul>` : ''}
      ${it.sections.map((s) => `<h2>${ech(s.titre)}</h2>${(s.texte || []).map((t) => `<p>${ech(t)}</p>`).join('')}${s.liste ? `<ul>${s.liste.map((t) => `<li>${ech(t)}</li>`).join('')}</ul>` : ''}${s.source ? `<p>Source : <a href="${ech(s.source.url)}">${ech(s.source.texte)}</a></p>` : ''}${s.lien && fiche(profil, s.lien.vers) ? `<p><a href="${url(profil, s.lien.vers)}">${ech(s.lien.texte)}</a></p>` : ''}`).join('')}
      ${it.ailleurs ? `<h2>À voir aussi</h2><ul>${it.ailleurs.map((c) => `<li><a href="${SITE.origine}${SITE.base}${c.href}">${ech(c.nom)}</a> : ${ech(c.dit)}</li>`).join('')}</ul>` : ''}
      ${it.faq ? `<h2>Les questions qu’on nous pose</h2>${it.faq.map((q) => `<h3>${ech(q.q)}</h3><p>${ech(q.r)}</p>`).join('')}` : ''}
      <p>Réserver 30 minutes offertes ou être rappelé : <a href="${SITE.origine}${SITE.base}/contact/?pour=${profil}">nous contacter</a>, ou appeler le 06 20 23 55 20.</p>` : '';

  return `<div class="pre-seo">
      <h1>${ech(f.h1)}</h1>
      <p>${ech(f.resume)}</p>${detail}
      ${bascule}
      <nav aria-label="Pages du site"><ul>${liens}</ul></nav>
      <p>Reskope, conseil et ingénierie numérique à Valenciennes et à Lille, pour les TPE et PME des Hauts-de-France.</p>
    </div>`;
}

/* L'atelier et le numérique responsable : même texte dans les deux espaces,
   une seule adresse pour Google (celle de l'espace PME). */
const canonique = (profil, route) => (profil === 'tpe' && PAGES.find((p) => p.route === route)?.canoniquePme ? url('pme', route) : url(profil, route));

function page(profil, route, f) {
  const adresse = canonique(profil, route);
  /* Define pour les TPE, Elevate pour les PME : dans le titre, et posée sur
     <html> pour que la page naisse dans ses couleurs. */
  const marque = MARQUE_DE_L_ESPACE[profil] || 'reskope';
  const titre = `${f.titre} · ${nomComplet(marque)}`;
  const tete = [
    `<meta name="description" content="${ech(f.description)}" />`,
    `<link rel="canonical" href="${adresse}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:title" content="${ech(titre)}" />`,
    `<meta property="og:description" content="${ech(f.description)}" />`,
    `<meta property="og:url" content="${adresse}" />`,
    `<meta name="twitter:title" content="${ech(titre)}" />`,
    `<meta name="twitter:description" content="${ech(f.description)}" />`,
  ].join('\n    ');

  return base
    .replace('<html lang="fr">', `<html lang="fr" data-marque="${marque}"${profil ? ` data-profil="${profil}"` : ''}>`)
    .replace(/<meta name="theme-color" content="[^"]*" \/>/, `<meta name="theme-color" content="${(MARQUES[marque] || MERE).teinte}" />`)
    .replace('<!--TITRE-->', `<title>${ech(titre)}</title>\n    ${tete}`)
    .replace('<!--SCHEMA-->', `<script type="application/ld+json">${JSON.stringify(schemaDe(profil, route, f))}</script>`)
    .replace('<div id="root"></div>', `<div id="root">${corps(profil, route, f)}</div>`);
}

function ecrire(chemin, contenu) {
  const cible = resolve(DIST, chemin);
  mkdirSync(dirname(cible), { recursive: true });
  writeFileSync(cible, contenu);
}

/* Un renvoi : une redirection immédiate, une canonique vers la page finale
   (sans paramètre), pas d'indexation. */
function renvoi(cible) {
  const finale = `${SITE.origine}${SITE.base}${cible.split('?')[0]}`;
  return `<!doctype html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <meta name="robots" content="noindex" />
    <meta http-equiv="refresh" content="0; url=${SITE.base}${cible}" />
    <link rel="canonical" href="${finale}" />
    <title>Cette page a déménagé · ${SITE.marque}</title>
  </head>
  <body>
    <p>Cette page a déménagé : <a href="${SITE.base}${cible}">la retrouver ici</a>.</p>
  </body>
</html>
`;
}

/* ── Production ─────────────────────────────────────────────── */
const tout = adresses();
/* Le plan du site ne déclare qu'une adresse par texte. */
const liste = tout.filter((a) => !(a.profil === 'tpe' && a.canoniquePme));
for (const r of renvois()) ecrire(r.chemin, renvoi(r.cible));
for (const a of tout) {
  const f = fiche(a.profil, a.route);
  const chemin = a.route === '/' ? `${a.profil}/index.html` : `${a.profil}${a.route}/index.html`;
  ecrire(chemin, page(a.profil, a.route, f));
}

/* La racine : la porte. Ce n'est pas une redirection déguisée, c'est une vraie
   page avec son texte et ses deux entrées. Ce qu'un robot y lit est ce qu'un
   visiteur y voit. */
ecrire('index.html', page(null, '/', PORTE));

/* Le repli du routage client reste la coquille NUE : une adresse inconnue ne
   doit pas se faire passer pour l'accueil. */
ecrire('404.html', coquille);

const jour = new Date().toISOString().slice(0, 10);
ecrire('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${SITE.origine}${SITE.base}/</loc><lastmod>${jour}</lastmod><changefreq>weekly</changefreq><priority>1.0</priority></url>
${liste.map((a) => `  <url><loc>${url(a.profil, a.route)}</loc><lastmod>${jour}</lastmod><changefreq>${a.freq}</changefreq><priority>${a.priorite}</priority></url>`).join('\n')}
</urlset>
`);

/* llms.txt : la carte du site pour les moteurs de réponse. Google l'ignore,
   mais il coûte trois lignes et les autres commencent à le lire. */
ecrire('llms.txt', `# Reskope

> Conseil et ingénierie numérique pour les TPE et PME des Hauts-de-France.
> On audite les outils que vous payez, on relie ce qui ne se parle pas, et on
> construit ce qui manque. Basés à Valenciennes et à Lille.

## Le site
${liste.filter((a) => a.profil === 'pme').map((a) => {
  const f = fiche(a.profil, a.route);
  return `- [${f.titre}](${url(a.profil, a.route)}) : ${f.description}`;
}).join('\n')}

## Version TPE, artisans et commerçants
${liste.filter((a) => a.profil === 'tpe').map((a) => {
  const f = fiche(a.profil, a.route);
  return `- [${f.titre}](${url(a.profil, a.route)}) : ${f.description}`;
}).join('\n')}

## Contact
Formulaire : ${url('pme', '/contact')}
`);

console.log(`Pré-rendu : ${liste.length + 1} pages, plan du site et llms.txt écrits dans dist-tech/ (réunis au site par scripts/assembler.mjs)`);
