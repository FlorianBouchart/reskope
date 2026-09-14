import { Link, useLocation } from 'react-router-dom';
import Page from '../components/Page';
import Axono from '../components/Axono';
import { Reveal, RevealItem } from '../components/Reveal';
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

      {/* 2 — Le constat. Quand les chiffres viennent d'ailleurs, la
          source est écrite et cliquable : un chiffre sans source ne
          vaut rien, et le lecteur doit pouvoir vérifier. */}
      <section className="section">
        <div className="container">
          <Reveal>
            <RevealItem as="h2" className="h2">{c.constatTitre}</RevealItem>
          </Reveal>
          <Reveal className="uni-src">
            {c.sources.map((s) => (
              <RevealItem key={s.v}>
                <span className="uni-src__val">{s.v}</span>
                <span className="uni-src__txt">{s.t}</span>
                {s.url && (
                  <a className="uni-src__from" href={s.url} target="_blank" rel="noopener noreferrer">
                    {s.from}
                  </a>
                )}
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </section>

      {/* 3 — Les trois temps */}
      <section className="section">
        <div className="container">
          <Reveal>
            <RevealItem as="h2" className="h2">{c.tempsTitre}</RevealItem>
          </Reveal>
          <Reveal className="uni-temps">
            {c.temps.map(([n, d]) => (
              <RevealItem key={n} className="uni-temps__c">
                <div className="uni-temps__n">{n}</div>
                <p className="uni-temps__d">{d}</p>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </section>

      {/* 4 — Ce que vous recevez, et à quelles conditions */}
      <section className="section">
        <div className="container uni-deux">
          <Reveal>
            <RevealItem as="h2" className="h2">{c.recuTitre}</RevealItem>
            <RevealItem as="ul" className="uni-liste">
              {c.recu.map((r) => <li key={r}>{r}</li>)}
            </RevealItem>
          </Reveal>
          <Reveal>
            <RevealItem as="p" className="eyebrow eyebrow--index">{c.faitsTitre}</RevealItem>
            {/* Le texte des conditions porte deux ou trois passages en
                gras : ce sont les engagements, ils doivent se voir. */}
            <RevealItem
              as="p"
              className="uni-faits"
              dangerouslySetInnerHTML={{ __html: c.faits }}
            />
          </Reveal>
        </div>
      </section>

      {/* 5 — Les pages rattachées à CET univers, et seulement à lui */}
      <section className="section">
        <div className="container">
          <Reveal>
            <RevealItem as="h2" className="h2">{c.preuvesTitre}</RevealItem>
          </Reveal>
          <Reveal className="uni-preuves">
            {c.preuves.map((p) => (
              <RevealItem key={p.to}>
                <Link className="uni-preuve" to={p.to}>
                  <span className="uni-preuve__t">{p.t}</span>
                  <span className="uni-preuve__d">{p.d}</span>
                  <span className="uni-preuve__a">{p.a} <span aria-hidden="true">→</span></span>
                </Link>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </section>

      {/* 6 — Un seul appel, à la fin */}
      <section className="uni-fin">
        <div className="container">
          <Reveal className="uni-fin__box">
            <RevealItem as="h2" className="uni-fin__t">{c.finTitre}</RevealItem>
            <RevealItem as="p" className="uni-fin__d">{c.finTexte}</RevealItem>
            <RevealItem className="uni-fin__row">
              <Link className="btn btn--primary" to="/contact">
                {c.finCta}
                <span className="btn__arrow" aria-hidden="true">→</span>
              </Link>
            </RevealItem>
          </Reveal>
        </div>
      </section>

    </Page>
  );
}
