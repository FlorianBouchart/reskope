import { Link } from 'react-router-dom';
import { Reveal, RevealItem } from './Reveal';

/* Le corps commun d'un univers : le constat chiffré, les trois temps, ce
   que vous recevez, les pages rattachées, l'appel final.

   Il est séparé de la page parce que l'audit ne s'ouvre pas comme les
   trois autres : il hérite de tout le site historique (le hero réseau, le
   manifeste, le cinéma au scroll) et vient poser ces blocs-là dessous.
   Les trois autres univers ouvrent sur leur schéma axonométrique. */
export default function UniversCorps({ c }) {
  return (
    <>
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
    </>
  );
}
