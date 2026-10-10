import { Link, useNavigate } from 'react-router-dom';
import Page from '../components/Page';
import Amorce from '../components/Amorce';
import Noeuds from '../components/Noeuds';
import Questions from '../components/Questions';
import Booking from '../components/Booking';
import Rappel from '../components/Rappel';
import SwapLabel from '../components/SwapLabel';
import Net3D from '../components/Net3D';
import { GLYPH_SHAPES } from '../lib/net3d';
import { openCalModal, isCalConfigured } from '../lib/cal';
import { OFFRE } from '../data/offres';
import { CONTACT } from '../data/site';
import { RENDEZ_VOUS } from '../data/rendezvous';
import { intention } from '../data/intentions';
import { fiche } from '../data/seo';

const BASE = import.meta.env.BASE_URL;

/* ════════════════════════════════════════════════════════════
   UNE PAGE PAR INTENTION — le gabarit des pages locales et des guides.

   Le visiteur arrive d'une recherche précise et reste une trentaine de
   secondes. Le premier écran lui dit donc, dans l'ordre : ce qu'il a
   cherché (le titre reprend ses mots), ce qu'on fait pour lui, et deux
   façons d'agir tout de suite (réserver 30 minutes, être rappelé), avec
   les visages et le téléphone. Le reste est là pour qui veut vérifier :
   le détail, les missions qui répondent à sa situation, ses questions, et
   les pages voisines du même sujet (le maillage du silo).

   Contenu : src/data/intentions.js. Référencement (titre, description,
   schema, HTML lisible sans JavaScript) : src/data/seo.js et
   scripts/prerender.mjs, qui lisent la même table.
   ════════════════════════════════════════════════════════════ */

const ancre = (titre, i) => `${i + 1}-${titre.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 48)}`;

function Tete({ p, reserver }) {
  const versRappel = (e) => {
    e.preventDefault();
    document.getElementById('rappel')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };
  return (
    <header className={`itn__tete itn__tete--${p.type}`}>
      <div className="container itn__in">
        <div className="itn__texte">
          <p className="eyebrow itn__surtitre">{p.surtitre}</p>
          <h1 className="itn__titre">{p.h1}</h1>
          <p className="itn__accroche">{p.accroche}</p>
          {p.type !== 'hub' && (
            <div className="itn__actions">
              <button type="button" className="btn btn--primary" onClick={reserver}>
                <SwapLabel>Réserver 30 min offertes</SwapLabel>
                <span className="btn__arrow" aria-hidden="true">→</span>
              </button>
              <a href="#rappel" className="btn btn--ghost" onClick={versRappel}>
                <SwapLabel>Être rappelé</SwapLabel>
              </a>
            </div>
          )}
          <p className="itn__rassure">
            <span className="itn__visages" aria-hidden="true">
              <img src={`${BASE}thomy-480.webp`} alt="" width="32" height="32" />
              <img src={`${BASE}florian-480.webp`} alt="" width="32" height="32" />
            </span>
            <span>
              Thomy et Florian vous répondent sous 24 h · ou appelez le{' '}
              <a href={`tel:${CONTACT.telephoneLien}`}>{CONTACT.telephone}</a>
            </span>
          </p>
          {p.points && (
            <ul className="itn__points">
              {p.points.map((t) => <li key={t}>{t}</li>)}
            </ul>
          )}
          {p.type === 'guide' && (
            <p className="itn__auteurs">Par Thomy Phanzu et Florian Bouchart · mis à jour le {p.maj || '4 octobre 2026'}</p>
          )}
        </div>
        <div className="itn__visuel" aria-hidden="true">
          <Net3D shape={GLYPH_SHAPES[p.type === 'guide' ? 1 : 2]} size={260} speed={0.5} tiltX={0.45} nodeR={3.4} />
        </div>
      </div>
    </header>
  );
}

/* Les missions qui répondent à la situation, avec leurs deux faits clés. */
function Missions({ ids }) {
  return (
    <section className="itn-mis" aria-labelledby="itn-mis-t">
      <div className="container">
        <h2 className="itn-mis__titre" id="itn-mis-t">Les missions qui répondent à cette situation</h2>
        <ul className="itn-mis__liste">
          {ids.map((id) => {
            const o = OFFRE[id];
            return (
              <li key={id} className="itn-mis__carte">
                <h3 className="itn-mis__nom"><Link to={o.slug}>{o.nom}</Link></h3>
                <p className="itn-mis__faits">{o.faits.duree} · {o.faits.temps}</p>
                <p className="itn-mis__livre">{o.faits.livre}</p>
                <span className="lien-fleche itn-mis__lien" aria-hidden="true">Voir la mission <span>→</span></span>
              </li>
            );
          })}
        </ul>
        <p className="itn-mis__note">Prix fixe, écrit avant de commencer. Le premier échange de 30 minutes est offert.</p>
      </div>
    </section>
  );
}

/* Des pages qui vivent dans l'espace des entreprises (/tpe, /pme), servi par
   l'autre application : de vrais liens, qui rechargent la page. */
function Ailleurs({ cartes, titre = 'À voir aussi' }) {
  return (
    <nav className="itn-liens itn-liens--ailleurs" aria-label={titre}>
      <div className="container">
        <h2 className="itn-liens__titre">{titre}</h2>
        <ul className="itn-liens__liste">
          {cartes.map((c) => (
            <li key={c.href}>
              <a href={`${BASE}${c.href.slice(1)}`} className="itn-liens__carte">
                <span className="itn-liens__nom">{c.nom}</span>
                <span className="itn-liens__dit">{c.dit}</span>
                <span className="lien-fleche" aria-hidden="true">Voir <span>→</span></span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

/* Les pages voisines du même sujet : le maillage du silo. */
function Liens({ routes, titre = 'À lire aussi' }) {
  const pages = routes.map((r) => ({ r, f: fiche(r) })).filter((x) => x.f);
  if (!pages.length) return null;
  return (
    <nav className="itn-liens" aria-label={titre}>
      <div className="container">
        <h2 className="itn-liens__titre">{titre}</h2>
        <ul className="itn-liens__liste">
          {pages.map(({ r, f }) => (
            <li key={r}>
              <Link to={r} className="itn-liens__carte">
                <span className="itn-liens__nom">{f.h1 || f.titre}</span>
                <span className="itn-liens__dit">{f.description}</span>
                <span className="lien-fleche" aria-hidden="true">Lire <span>→</span></span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default function Intention({ route }) {
  const p = intention(route);
  const navigate = useNavigate();
  const reserver = () => {
    if (!isCalConfigured) { navigate('/contact'); return; }
    openCalModal().catch(() => navigate('/contact'));
  };

  if (p.type === 'hub') {
    return (
      <Page className="itn itn--hub">
        <Tete p={p} reserver={reserver} />
        <Liens routes={p.liens} titre="Les guides" />
        <Rappel origine={route} titre="Une question précise ? On vous rappelle." />
        <Booking c={RENDEZ_VOUS} />
      </Page>
    );
  }

  return (
    <Page className={`itn itn--${p.type}`}>
      <Tete p={p} reserver={reserver} />

      {/* Un guide se parcourt : le sommaire mène à chaque partie. */}
      {p.type === 'guide' && (
        <nav className="itn-som" aria-label="Sommaire">
          <div className="container">
            <p className="itn-som__titre">Dans ce guide</p>
            <ol className="itn-som__liste">
              {p.sections.map((s, i) => <li key={s.titre}><a href={`#${ancre(s.titre, i)}`}>{s.titre}</a></li>)}
            </ol>
            {p.pdf && (
              <a href={`${BASE}guides/12-questions-futurs-clients.pdf`} className="btn btn--ghost itn-som__pdf" download>
                Le guide en PDF<span className="btn__arrow" aria-hidden="true">↓</span>
              </a>
            )}
          </div>
        </nav>
      )}

      {p.sections.map((s, i) => (
        <Amorce key={s.titre} id={ancre(s.titre, i)} lead={s.titre} className="itn-sec">
          {s.texte?.map((t) => <p className="am__p" key={t.slice(0, 32)}>{t}</p>)}
          {s.liste && <Noeuds items={s.liste} />}
          {s.source && (
            <p className="itn__source">
              Source :{' '}
              <a href={s.source.url} target="_blank" rel="noopener noreferrer">{s.source.texte}</a>
            </p>
          )}
          {s.lien && (
            <p className="am__suite">
              <Link to={s.lien.vers} className="lien-fleche">{s.lien.texte} <span aria-hidden="true">→</span></Link>
            </p>
          )}
        </Amorce>
      ))}

      {p.ailleurs && <Ailleurs cartes={p.ailleurs} titre={p.ailleursTitre} />}

      {p.missions && <Missions ids={p.missions} />}

      <Rappel origine={route} />

      {p.faq && (
        <Questions titre="Les questions qu’on nous pose" items={p.faq}>
          <p className="qs__relance">Une autre question ? Posez-la directement, on vous répond sous vingt-quatre heures.</p>
          <button type="button" className="btn btn--primary" onClick={reserver}>
            <SwapLabel>Réserver 30 min offertes</SwapLabel>
            <span className="btn__arrow" aria-hidden="true">→</span>
          </button>
        </Questions>
      )}

      {p.liens && <Liens routes={p.liens} />}

      <Booking c={RENDEZ_VOUS} />
    </Page>
  );
}
