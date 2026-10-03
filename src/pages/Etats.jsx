import { Link, useNavigate } from 'react-router-dom';
import { openCalModal, isCalConfigured } from '../lib/cal';
import Page from '../components/Page';
import { Reveal, RevealItem } from '../components/Reveal';
import { LogoMark } from '../components/Logo';
import { PORTES } from '../data/offres';

/* Pages d'état : 404 (adresse inconnue) et remerciement (après l'envoi d'un
   message). Toutes deux ramènent vers une action utile plutôt que de laisser
   le visiteur dans une impasse. */

export function NotFound() {
  return (
    <Page title="Page introuvable" description="Cette adresse n’existe pas, ou plus. Voici les pages les plus utiles du site Reskope.">
      {/* Fond presque noir : le header et le curseur y passent en clair. */}
      <section className="state-page" data-nav-dark data-cursor-dark>
        <div className="container state-page__inner">
          <Reveal>
            <RevealItem>
              <span className="state-page__mark" aria-hidden="true"><LogoMark /></span>
            </RevealItem>
            <RevealItem as="h1" className="state-page__title">Cette page n’existe pas.</RevealItem>
            <RevealItem as="p" className="state-page__lead">
              Le lien est peut-être ancien, ou l’adresse comporte une coquille. Vous étiez peut-être dans l’une
              de ces situations :
            </RevealItem>
            <RevealItem>
              <ul className="state-page__links">
                {PORTES.map((p) => (
                  <li key={p.id}>
                    <Link to={p.slug}>{p.nom}<span aria-hidden="true">→</span></Link>
                  </li>
                ))}
                <li>
                  <Link to="/nos-offres">Toutes nos offres<span aria-hidden="true">→</span></Link>
                </li>
              </ul>
            </RevealItem>
            <RevealItem>
              <Link to="/" className="btn btn--primary">
                Retour à l’accueil<span className="btn__arrow" aria-hidden="true">→</span>
              </Link>
            </RevealItem>
          </Reveal>
        </div>
      </section>
    </Page>
  );
}

export function Merci() {
  const navigate = useNavigate();
  /* L'agenda en pop-up ; s'il ne s'ouvre pas, la page de contact. */
  const reserver = () => {
    if (!isCalConfigured) { navigate('/contact'); return; }
    openCalModal().catch(() => navigate('/contact'));
  };
  return (
    <Page>
      <section className="state-page state-page--thanks" data-nav-dark data-cursor-dark>
        <div className="container state-page__inner">
          <Reveal>
            <RevealItem>
              <span className="state-page__mark state-page__mark--ok" aria-hidden="true"><LogoMark /></span>
            </RevealItem>
            <RevealItem as="h1" className="state-page__title">Votre message est parti.</RevealItem>
            <RevealItem as="p" className="state-page__lead">
              On vous répond sous vingt-quatre heures, directement, et pas par un accusé de réception
              automatique. Si votre demande ne relève pas de notre métier, on vous le dit franchement.
            </RevealItem>

            <RevealItem>
              <div className="state-page__next">
                <p className="state-page__next-title">Ce qui se passe maintenant</p>
                <ol className="state-page__steps state-page__steps--fil">
                  <li>On lit votre message, et on vous propose trente minutes.</li>
                  <li>On échange, gratuitement, sur votre situation.</li>
                  <li>Sous quarante-huit heures, vous recevez une proposition écrite, avec un prix fixe.</li>
                </ol>
              </div>
            </RevealItem>

            {/* La fin de l'expérience est ce qu'on en retient : deux visages, la
                suite, et de quoi gagner un jour. */}
            <RevealItem>
              <p className="merci__nous">
                <span className="merci__visages" aria-hidden="true">
                  <img src={`${import.meta.env.BASE_URL}thomy-480.webp`} alt="" width="48" height="48" />
                  <img src={`${import.meta.env.BASE_URL}florian-480.webp`} alt="" width="48" height="48" />
                </span>
                <span>Thomy et Florian lisent votre message eux-mêmes.</span>
              </p>
            </RevealItem>

            <RevealItem>
              <div className="state-page__actions">
                <button type="button" className="btn btn--primary" onClick={reserver}>
                  Gagner un jour : choisir mon créneau<span className="btn__arrow" aria-hidden="true">→</span>
                </button>
                <Link to="/exemple" className="btn btn--on-dark btn--ghost-dark">Voir un exemple complet</Link>
              </div>
            </RevealItem>

            <RevealItem as="p" className="state-page__meanwhile">
              En attendant :{' '}
              <a href={`${import.meta.env.BASE_URL}guides/12-questions-futurs-clients.pdf`} className="merci__guide" download>
                les 12 questions à poser à vos futurs clients (guide gratuit, PDF)
              </a>
            </RevealItem>
          </Reveal>
        </div>
      </section>
    </Page>
  );
}
