import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { SITE, PAGES, url, fiche, VERS_ENTREPRISES } from '../src/data/seo.js';
import { OFFRES, OFFRE } from '../src/data/offres.js';
import { MARQUES, MERE, marqueDeLaRouteDuSite, nomComplet } from '../src/data/marques.js';
import { DOMAINE, BASE, URL_SITE } from '../site.config.mjs';
import { CABINET, SITE_WEB, ID_SITE, ZONE, personne, service as serviceDe, typeDePage } from './entreprise.mjs';
import { intention } from '../src/data/intentions.js';

/* ════════════════════════════════════════════════════════════
   LE PRÉ-RENDU — écrire un vrai fichier par adresse.

   Le site est une application à routage client. Sur GitHub Pages, une adresse
   qui ne correspond à aucun fichier renvoie 404. Ce script tourne après
   `vite build`. Il reprend la coquille produite par Vite et en écrit une copie
   par adresse, avec :
     - le titre, la description et la canonique de CETTE page
     - ses balises de partage et son schema
     - un contenu lisible sans JavaScript, et les liens vers les autres pages

   Le contenu statique est posé DANS #root : React le remplace au montage. Un
   robot qui n'exécute pas le JavaScript lit donc du vrai texte et suit de
   vrais liens, et un visiteur voit l'application. Ce qui est écrit dans le
   HTML est ce que la page raconte : il n'y a pas deux versions du discours.

   Il écrit aussi une page de renvoi pour chaque adresse de l'ancienne version
   du site (/tpe/..., /pme/..., /offres...) : elles ont été partagées et
   indexées, elles ne doivent pas mourir en 404.
   ════════════════════════════════════════════════════════════ */

const DIST = resolve(process.cwd(), 'dist');
const ech = (t) => String(t)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;');

const coquille = readFileSync(resolve(DIST, 'index.html'), 'utf8');

/* On retire de la coquille tout ce qui est propre à une page, pour le
   réécrire ensuite. Sans ça, la canonique de l'accueil serait recopiée sur
   toutes les autres adresses. */
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
   La fiche de l'entreprise est commune aux deux applications : elle vit
   dans scripts/entreprise.mjs. */

/* Le fil d'Ariane : les pages de l'espace « en projet » descendent de son
   accueil. (La même table vit dans src/components/Breadcrumb.jsx.) */
const PARENT = {
  '/tester-une-idee': '/creation',
  '/construire-votre-business-plan': '/creation',
  '/relire-votre-dossier': '/creation',
  '/nos-offres': '/creation',
  '/comment-ca-se-passe': '/creation',
};

const service = (o) => serviceDe(o.nom, o.accroche, o.slug ? url(o.slug) : undefined);

function schemaDe(route, f) {
  const adresse = url(route);
  const fil = [{ '@type': 'ListItem', position: 1, name: 'Accueil', item: url('/') }];
  const parent = PARENT[route] || f.parent;
  if (parent && fiche(parent)) fil.push({ '@type': 'ListItem', position: 2, name: fiche(parent).fil, item: url(parent) });
  if (route !== '/') fil.push({ '@type': 'ListItem', position: fil.length + 1, name: f.fil, item: adresse });

  const blocs = [
    {
      '@type': typeDePage(route),
      '@id': `${adresse}#page`,
      url: adresse,
      name: `${f.titre} · ${nomComplet(marqueDeLaRouteDuSite(route))}`,
      description: f.description,
      inLanguage: 'fr',
      isPartOf: { '@type': 'WebSite', '@id': ID_SITE, name: SITE.marque, url: url('/') },
      about: { '@id': CABINET['@id'] },
    },
    { '@type': 'BreadcrumbList', itemListElement: fil },
  ];

  if (route === '/') blocs.push(SITE_WEB);
  if (route === '/' || route === '/creation') blocs.push(CABINET);
  if (f.porte) blocs.push(service(OFFRE[f.porte]));
  /* Une page locale déclare le service, dans sa ville ; un guide est un
     article signé, publié par le cabinet. */
  if (f.intention === 'local') {
    const ville = ZONE.find((z) => z.name === f.ville);
    blocs.push({ ...serviceDe(f.h1, f.description, adresse), ...(ville ? { areaServed: ville } : {}) });
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
      datePublished: '2026-10-04',
      dateModified: new Date().toISOString().slice(0, 10),
    });
  }
  if (route === '/nos-offres') {
    blocs.push({
      '@type': 'ItemList',
      name: f.titre,
      itemListElement: OFFRES.filter((o) => o.statut !== 'plustard').map((o, i) => ({
        '@type': 'ListItem', position: i + 1, item: service(o),
      })),
    });
  }

  return { '@context': 'https://schema.org', '@graph': blocs };
}

/* ── Le contenu lisible sans JavaScript ─────────────────────
   Le titre, le résumé, et pour les trois missions ce que la page affiche :
   les faits, à qui elle s'adresse, ce qu'on reçoit et les questions. Puis
   les liens vers les autres pages. React remplace ce bloc au montage. */
function corps(route, f) {
  const liens = PAGES
    .filter((p) => p.route !== route)
    .map((p) => `<li><a href="${url(p.route)}">${ech(p.titre)}</a></li>`)
    .join('');

  let detail = '';
  /* Une page par intention : tout son texte, pour les robots des IA qui ne
     lisent pas le JavaScript. */
  const it = intention(route);
  if (it && it.type === 'hub') {
    detail = `
      <p>${ech(it.accroche)}</p>
      <ul>${it.liens.map((r) => { const g = fiche(r); return `<li><a href="${url(r)}">${ech(g.h1)}</a> : ${ech(g.resume)}</li>`; }).join('')}</ul>`;
  }
  if (it && it.type !== 'hub') {
    detail = `
      <p>${ech(it.accroche)}</p>${it.points ? `<ul>${it.points.map((t) => `<li>${ech(t)}</li>`).join('')}</ul>` : ''}
      ${it.sections.map((s) => `<h2>${ech(s.titre)}</h2>${(s.texte || []).map((t) => `<p>${ech(t)}</p>`).join('')}${s.liste ? `<ul>${s.liste.map((t) => `<li>${ech(t)}</li>`).join('')}</ul>` : ''}${s.lien ? `<p><a href="${url(s.lien.vers)}">${ech(s.lien.texte)}</a></p>` : ''}`).join('')}
      ${it.missions ? `<h2>Les missions qui répondent à cette situation</h2><ul>${it.missions.map((id) => `<li><a href="${url(OFFRE[id].slug)}">${ech(OFFRE[id].nom)}</a> : ${ech(OFFRE[id].faits.duree)}, ${ech(OFFRE[id].faits.temps)}</li>`).join('')}</ul>` : ''}
      ${it.faq ? `<h2>Les questions qu’on nous pose</h2>${it.faq.map((q) => `<h3>${ech(q.q)}</h3><p>${ech(q.r)}</p>`).join('')}` : ''}
      <p>Réserver 30 minutes offertes ou être rappelé : <a href="${url('/contact')}">nous contacter</a>, ou appeler le 06 20 23 55 20.</p>`;
  }
  if (f.porte) {
    const o = OFFRE[f.porte];
    detail = `
      <p>« ${ech(o.amorce)} »</p>
      <dl>
        <dt>Durée</dt><dd>${ech(o.faits.duree)}</dd>
        <dt>Votre temps</dt><dd>${ech(o.faits.temps)}</dd>
        <dt>Prix</dt><dd>${ech(o.faits.prix)}</dd>
        <dt>Vous recevez</dt><dd>${ech(o.faits.livre)}</dd>
      </dl>
      <h2>C’est pour vous si</h2>
      <ul>${o.pourVous.map((t) => `<li>${ech(t)}</li>`).join('')}</ul>
      <h2>Ce que vous recevez</h2>
      <ul>${o.recevez.map((t) => `<li>${ech(t)}</li>`).join('')}</ul>
      <h2>Les questions qu’on nous pose</h2>
      ${o.faq.map((q) => `<h3>${ech(q.q)}</h3><p>${ech(q.r)}</p>`).join('')}`;
  }

  return `<div class="pre-seo">
      <h1>${ech(f.h1)}</h1>
      <p>${ech(f.resume)}</p>${detail}
      <nav aria-label="Pages du site"><ul>${liens}</ul></nav>
      <p>Reskope, Thomy et Florian, à Valenciennes et à Lille. On vous aide à décider, et on construit la suite.</p>
    </div>`;
}

function page(route, f) {
  const adresse = url(route);
  /* La marque de la page (Create pour l'espace en projet) : dans le titre,
     et posée sur <html> pour que la page naisse dans ses couleurs. */
  const marque = marqueDeLaRouteDuSite(route);
  const titre = `${f.titre} · ${nomComplet(marque)}`;
  const tete = [
    `<meta name="description" content="${ech(f.description)}" />`,
    `<link rel="canonical" href="${adresse}" />`,
    '<meta property="og:type" content="website" />',
    `<meta property="og:title" content="${ech(titre)}" />`,
    `<meta property="og:description" content="${ech(f.description)}" />`,
    `<meta property="og:url" content="${adresse}" />`,
    `<meta name="twitter:title" content="${ech(titre)}" />`,
    `<meta name="twitter:description" content="${ech(f.description)}" />`,
  ].join('\n    ');

  return base
    .replace('<html lang="fr">', `<html lang="fr" data-marque="${marque}">`)
    .replace(/<meta name="theme-color" content="[^"]*" \/>/, `<meta name="theme-color" content="${(MARQUES[marque] || MERE).teinte}" />`)
    .replace('<!--TITRE-->', `<title>${ech(titre)}</title>\n    ${tete}`)
    .replace('<!--SCHEMA-->', `<script type="application/ld+json">${JSON.stringify(schemaDe(route, f))}</script>`)
    .replace('<div id="root"></div>', `<div id="root">${corps(route, f)}</div>`);
}

/* Une ancienne adresse : un renvoi immédiat, une canonique vers la nouvelle
   page, et un lien pour qui n'aurait pas été renvoyé. Aucun script : la
   balise suffit, et les moteurs la traitent comme une redirection. */
/* Le renvoi suit un chemin relatif à la racine (il marche aussi en local) ;
   la canonique, elle, doit être une adresse complète. */
function renvoi(chemin) {
  const cible = `${SITE.origine}${chemin}`;
  return `<!doctype html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <meta name="robots" content="noindex" />
    <meta http-equiv="refresh" content="0; url=${chemin}" />
    <link rel="canonical" href="${cible}" />
    <title>Cette page a déménagé · ${SITE.marque}</title>
  </head>
  <body>
    <p>Cette page a déménagé : <a href="${chemin}">la retrouver dans l’espace des entreprises</a>.</p>
  </body>
</html>
`;
}

function ecrire(chemin, contenu) {
  const cible = resolve(DIST, chemin);
  mkdirSync(dirname(cible), { recursive: true });
  writeFileSync(cible, contenu);
}

/* ── Production ─────────────────────────────────────────────── */
for (const p of PAGES) {
  const chemin = p.route === '/' ? 'index.html' : `${p.route.slice(1)}/index.html`;
  ecrire(chemin, page(p.route, p));
}

/* Le repli du routage client reste la coquille NUE : une adresse inconnue ne
   doit pas se faire passer pour l'accueil. */
ecrire('404.html', coquille
  .replace(/<title>[\s\S]*?<\/title>/i, `<title>Page introuvable · ${SITE.marque}</title>\n    <meta name="robots" content="noindex" />`)
  .replace(/<link\s+rel="canonical"[\s\S]*?\/>\s*/i, '')
  .replace(/<meta\s+property="og:url"[\s\S]*?\/>\s*/i, ''));

/* Les anciennes adresses sans espace, et les pages qui vivent désormais
   dans l'espace des entreprises : un renvoi vers la même page. Les adresses
   /tpe/... et /pme/... ne sont pas touchées : ce sont les vraies pages de
   cet espace, posées par scripts/assembler.mjs. */
let renvois = 0;
for (const [ancienne, vers] of Object.entries(VERS_ENTREPRISES)) {
  ecrire(`${ancienne.slice(1)}/index.html`, renvoi(`${SITE.base}/${vers}/`));
  renvois += 1;
}

const jour = new Date().toISOString().slice(0, 10);
/* robots.txt suit l'adresse du site (site.config.mjs) : le fichier de public/
   est écrit pour /reskope/, on le réécrit ici pour l'adresse réelle. Et le
   jour où un nom de domaine est branché, CNAME le garde à chaque
   publication. */
const robots = readFileSync(resolve(DIST, 'robots.txt'), 'utf8')
  .replaceAll('https://floops10.github.io/reskope/', URL_SITE)
  .replaceAll('/reskope/', `${BASE}/`);
ecrire('robots.txt', robots);
if (DOMAINE) ecrire('CNAME', `${DOMAINE}\n`);

ecrire('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${PAGES.map((p) => `  <url><loc>${url(p.route)}</loc><lastmod>${jour}</lastmod><changefreq>${p.freq}</changefreq><priority>${p.priorite}</priority></url>`).join('\n')}
</urlset>
`);

/* llms.txt : la carte du site pour les moteurs de réponse. Google l'ignore,
   mais il coûte trois lignes et les autres commencent à le lire. */
const portes = PAGES.filter((p) => p.porte);
const locales = PAGES.filter((p) => p.intention === 'local');
const guides = PAGES.filter((p) => p.intention === 'guide' || p.intention === 'hub');
const autres = PAGES.filter((p) => !p.porte && !p.intention && parseFloat(p.priorite) >= 0.5);
ecrire('llms.txt', `# Reskope

> On vous aide à décider, et on construit la suite. Reskope accompagne trois
> personnes : celle qui crée ou reprend une entreprise (trouver son client
> idéal, construire son business plan, convaincre la banque), le dirigeant
> d'une TPE de 1 à 10 personnes et celui d'une PME de 10 à 250 personnes
> (sites, outils qui se parlent, équipes qui gagnent du temps). Thomy et
> Florian, à Valenciennes et à Lille.

## Pour créer ou reprendre une entreprise
${portes.map((p) => `- [${p.titre}](${url(p.route)}) : ${p.description}`).join('\n')}

## Près de chez vous : Valenciennes, Lille et le Nord
${locales.map((p) => `- [${p.titre}](${url(p.route)}) : ${p.description}`).join('\n')}

## Guides gratuits
${guides.map((p) => `- [${p.titre}](${url(p.route)}) : ${p.description}`).join('\n')}

## Le site
${autres.map((p) => `- [${p.titre}](${url(p.route)}) : ${p.description}`).join('\n')}

## Contact
Formulaire : ${url('/contact')}
`);

console.log(`Pré-rendu : ${PAGES.length} pages, ${renvois} renvois, plan du site et llms.txt écrits dans dist/`);
