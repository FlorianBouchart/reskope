import { useLocation } from 'react-router-dom';
import Page from '../components/Page';
import Axono from '../components/Axono';
import { Reveal, RevealItem } from '../components/Reveal';
import UniversCorps from '../components/UniversCorps';
import { useLang } from '../i18n';
import { PAR_SLUG } from '../data/univers';
import { SCENES } from '../lib/axono';
import { NotFound } from './Etats';

/* ============================================================
   LA PAGE PILIER D'UN UNIVERS.

   Une seule page pour les quatre métiers : ce qui change, ce sont les
   données (data/univers.js) et le réglage visuel porté par data-univers
   (index.css). Écrire quatre fichiers presque identiques aurait garanti
   qu'ils divergent au premier correctif.

   L'ordre des sections est celui des plaquettes, et il n'est pas
   négociable : l'accroche, le constat chiffré, les trois temps, ce que
   vous recevez, les conditions, puis les pages rattachées. On ne met le
   prix nulle part et on ne met qu'un seul appel à l'action, à la fin.
   ============================================================ */

export default function Univers() {
  const { pathname } = useLocation();
  const { lang } = useLang();
  const u = PAR_SLUG[pathname];

  /* Une URL d'univers inconnue doit tomber sur la 404, pas sur une page
     vide : c'est mauvais pour le visiteur comme pour le référencement. */
  if (!u) return <NotFound />;

  const c = u[lang] || u.fr;
  const noir = u.ton === 'solutions';

  return (
    <Page title={c.metaTitle} description={c.metaDesc} univers={u.ton}>

      {/* 1 — L'accroche, et le schéma qui la montre */}
      <header className={`uni-hero${noir ? ' uni-hero--noir uni-noir' : ''}`} {...(noir ? { 'data-nav-dark': '' } : {})}>
        <div className="container uni-hero__inner">
          <div>
            <Reveal onMount>
              <RevealItem as="p" className="eyebrow eyebrow--index">{c.eyebrow}</RevealItem>
              <RevealItem as="h1" className="uni-hero__title">{c.titre}</RevealItem>
              <RevealItem as="p" className="lead uni-hero__lead">{c.lead}</RevealItem>
              <RevealItem as="p" className="uni-hero__duree">{c.duree}</RevealItem>
            </Reveal>
          </div>
          <div className="uni-hero__fig">
            <Axono scene={SCENES[u.scene]} titre={c.figTitre} max={640} />
            <p className="uni-fig-leg">{c.figLeg}</p>
          </div>
        </div>
      </header>

      <UniversCorps c={c} />

    </Page>
  );
}
