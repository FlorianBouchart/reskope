import { Link } from 'react-router-dom';
import Page from '../components/Page';
import Booking from '../components/Booking';
import Rappel from '../components/Rappel';
import SwapLabel from '../components/SwapLabel';
import Net3D from '../components/Net3D';
import VersMaison from '../components/VersMaison';
import { GLYPH_SHAPES } from '../lib/net3d';
import { openCalModal, isCalConfigured } from '../lib/cal';
import { CONTACT, OFFERS } from '../data/site';
import { OFFERS_TPE } from '../data/profils';
import { intention } from '../data/intentions';
import { fiche } from '../data/seo';
import { useProfil, BASE } from '../profil.jsx';

/* ════════════════════════════════════════════════════════════
   UNE PAGE PAR INTENTION, DANS L'ESPACE DES ENTREPRISES.

   Même gabarit que le site principal (src/pages/Intention.jsx) : le titre
   reprend les mots de la recherche, deux façons d'agir tout de suite
   (réserver 30 minutes, être rappelé), puis le détail, les offres
   concernées, les questions et les pages voisines (le maillage du silo).
   Chaque page appartient à UN espace : ouverte depuis l'autre, elle renvoie
   à la bonne adresse. Contenu : data/intentions.js.
   ════════════════════════════════════════════════════════════ */

const RDV = {
  eyebrow: 'Prendre rendez-vous',
  title: 'Trente minutes, à l’heure qui vous arrange.',
  lead: 'Choisissez directement un créneau dans notre agenda. On parle de votre activité, de ce qui coince, et on vous dit franchement s’il y a un sujet, ou non.',
  points: [
    { value: '30 min', label: 'En visio ou par téléphone, comme vous préférez' },
    { value: '0 €', label: 'Sans engagement, et sans relance commerciale' },
    { value: '24 h', label: 'Si aucun créneau ne convient, on répond sous 24 h' },
  ],
  cta: 'Choisir un créneau',
  ctaFallback: 'Décrire mon besoin',
  loading: 'Ouverture de l’agenda…',
  or: 'Vous préférez écrire ?',
  error: 'L’agenda n’a pas pu s’ouvrir. Réessayez, ou passez directement par',
  privacy: 'L’agenda est fourni par Cal.com. Son script n’est chargé qu’au moment où vous cliquez : tant que vous ne demandez pas de rendez-vous, aucune donnée ne quitte ce site.',
};

const ancre = (titre, i) => `${i + 1}-${titre.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 48)}`;

function Offres({ ids, profil }) {
  const toutes = profil === 'tpe' ? OFFERS_TPE.fr : OFFERS.fr;
  const choisies = ids.map((id) => toutes.find((o) => o.id === id)).filter(Boolean);
  return (
    <section className="itn-mis" aria-labelledby="itn-off-t">
      <div className="container">
        <h2 className="itn-mis__titre" id="itn-off-t">Ce qu’on peut faire pour vous</h2>
        <ul className="itn-mis__liste">
          {choisies.map((o) => (
            <li key={o.id} className="itn-mis__carte">
              <h3 className="itn-mis__nom"><Link to="/offres">{o.name}</Link></h3>
              <p className="itn-mis__faits">{o.tagline}</p>
              <p className="itn-mis__livre">{o.features.slice(0, 3).join(' · ')}</p>
              <span className="lien-fleche itn-mis__lien" aria-hidden="true">Voir l’offre <span>→</span></span>
            </li>
          ))}
        </ul>
        <p className="itn-mis__note">Estimation écrite avant de commencer. Le premier échange de 30 minutes est offert.</p>
      </div>
    </section>
  );
}

function Liens({ routes, profil }) {
  const pages = routes.map((r) => ({ r, f: fiche(profil, r) })).filter((x) => x.f);
  if (!pages.length) return null;
  return (
    <nav className="itn-liens" aria-label="À lire aussi">
      <div className="container">
        <h2 className="itn-liens__titre">À lire aussi</h2>
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

/* Des pages de l'autre espace ou du site principal : de vrais liens. */
function Ailleurs({ cartes }) {
  return (
    <nav className="itn-liens itn-liens--ailleurs" aria-label="À voir aussi">
      <div className="container">
        <h2 className="itn-liens__titre">À voir aussi</h2>
        <ul className="itn-liens__liste">
          {cartes.map((c) => (
            <li key={c.href}>
              <a href={`${BASE}${c.href}`} className="itn-liens__carte">
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

export default function Intention({ route }) {
  const p = intention(route);
  const { profil } = useProfil();

  /* Ouverte depuis l'autre espace : la page vit à l'adresse de son espace. */
  if (profil && profil !== p.profil) return <VersMaison vers={`/${p.profil}${route}/`} />;

  const reserver = () => {
    if (!isCalConfigured) { window.location.assign(`${BASE}/contact/?pour=${p.profil}`); return; }
    openCalModal().catch(() => window.location.assign(`${BASE}/contact/?pour=${p.profil}`));
  };
  const versRappel = (e) => {
    e.preventDefault();
    document.getElementById('rappel')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <Page>
      <div className={`itn itn--${p.type}`}>
        <header className={`itn__tete itn__tete--${p.type}`}>
          <div className="container itn__in">
            <div className="itn__texte">
              <p className="eyebrow itn__surtitre">{p.surtitre}</p>
              <h1 className="itn__titre">{p.h1}</h1>
              <p className="itn__accroche">{p.accroche}</p>
              <div className="itn__actions">
                <button type="button" className="btn btn--primary" onClick={reserver}>
                  <SwapLabel>Réserver 30 min offertes</SwapLabel>
                  <span className="btn__arrow" aria-hidden="true">→</span>
                </button>
                <a href="#rappel" className="btn btn--ghost" onClick={versRappel}>
                  <SwapLabel>Être rappelé</SwapLabel>
                </a>
              </div>
              <p className="itn__rassure">
                <span className="itn__visages" aria-hidden="true">
                  <img src={`${BASE}/thomy-480.webp`} alt="" width="32" height="32" />
                  <img src={`${BASE}/florian-480.webp`} alt="" width="32" height="32" />
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
              <Net3D shape={GLYPH_SHAPES[p.profil === 'tpe' ? 2 : 0]} size={260} speed={0.5} tiltX={0.45} nodeR={3.4} />
            </div>
          </div>
        </header>

        {p.sections.map((s, i) => (
          <section className="itn-sec" key={s.titre} id={ancre(s.titre, i)} aria-labelledby={`${ancre(s.titre, i)}-t`}>
            <div className="container itn-sec__in">
              <h2 className="itn-sec__titre" id={`${ancre(s.titre, i)}-t`}>{s.titre}</h2>
              <div className="itn-sec__corps">
                {s.texte?.map((t) => <p key={t.slice(0, 32)}>{t}</p>)}
                {s.liste && (
                  <ul className="itn-sec__liste">
                    {s.liste.map((t) => <li key={t}>{t}</li>)}
                  </ul>
                )}
                {s.source && (
                  <p className="itn__source">
                    Source :{' '}
                    <a href={s.source.url} target="_blank" rel="noopener noreferrer">{s.source.texte}</a>
                  </p>
                )}
                {s.lien && (
                  <p className="itn-sec__suite">
                    <Link to={s.lien.vers} className="lien-fleche">{s.lien.texte} <span aria-hidden="true">→</span></Link>
                  </p>
                )}
              </div>
            </div>
          </section>
        ))}

        {p.offres && <Offres ids={p.offres} profil={p.profil} />}

        <Rappel origine={`/${p.profil}${route}`} />

        {p.faq && (
          <section className="itn-faq" aria-labelledby="itn-faq-t">
            <div className="container itn-faq__in">
              <h2 className="itn-faq__titre" id="itn-faq-t">Les questions qu’on nous pose</h2>
              <div className="itn-faq__liste">
                {p.faq.map((q, i) => (
                  <details key={q.q} className="itn-faq__item" open={i === 0}>
                    <summary>{q.q}</summary>
                    <p>{q.r}</p>
                  </details>
                ))}
              </div>
              <div className="itn-faq__relance">
                <p>Une autre question ? On vous répond sous vingt-quatre heures.</p>
                <button type="button" className="btn btn--primary" onClick={reserver}>
                  <SwapLabel>Réserver 30 min offertes</SwapLabel>
                  <span className="btn__arrow" aria-hidden="true">→</span>
                </button>
              </div>
            </div>
          </section>
        )}

        {p.liens && <Liens routes={p.liens} profil={p.profil} />}

        {p.ailleurs && <Ailleurs cartes={p.ailleurs} />}

        <Booking c={RDV} />
      </div>
    </Page>
  );
}
