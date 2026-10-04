import { useId, useState } from 'react';
import { FORMSUBMIT_URL, CONTACT } from '../data/site';
import { mesurer } from '../lib/mesure';
import { BASE } from '../profil.jsx';

/* ════════════════════════════════════════════════════════════
   ON VOUS RAPPELLE — le contact le plus court du site.

   Retour d'un consultant SEO (04/10/2026) : le visiteur qui arrive par une
   recherche reste une trentaine de secondes ; l'idée est de repartir avec
   un moyen de le recontacter. Réserver un créneau demande de choisir une
   date, écrire demande de rédiger : deux champs, c'est le plus petit pas
   possible. Prénom et téléphone, un moment préféré si on veut, et l'accord
   explicite d'être rappelé (le numéro ne sert qu'à ça, voir la politique
   de confidentialité).

   Même acheminement que le formulaire de contact (FormSubmit), même piège
   à robots, et la mesure d'audience compte le prospect (generate_lead).
   ════════════════════════════════════════════════════════════ */

const MOMENTS = ['Dès que possible', 'Le matin', 'Le midi', 'L’après-midi', 'En fin de journée'];
const TELEPHONE = /^(?:\+33[\s.-]?|0033[\s.-]?|0)[1-9](?:[\s.-]?\d{2}){4}$/;

export default function Rappel({
  origine,
  titre = 'Pas le temps maintenant ? On vous rappelle.',
  sous = 'Laissez votre prénom et votre numéro : Thomy ou Florian vous rappelle sous 24 h, au moment que vous choisissez.',
  sombre = false,
}) {
  const id = useId();
  const [prenom, setPrenom] = useState('');
  const [tel, setTel] = useState('');
  const [moment, setMoment] = useState(MOMENTS[0]);
  const [accord, setAccord] = useState(false);
  const [piege, setPiege] = useState('');
  const [etat, setEtat] = useState('repos');
  const [erreur, setErreur] = useState('');

  const envoyer = async (e) => {
    e.preventDefault();
    if (piege) { setEtat('ok'); return; } // un robot : on ne lui dit rien
    if (!TELEPHONE.test(tel.trim())) {
      setErreur('Ce numéro ne ressemble pas à un numéro français. Exemple : 06 12 34 56 78.');
      return;
    }
    if (!accord) {
      setErreur('Cochez la case pour qu’on puisse vous rappeler.');
      return;
    }
    setErreur('');
    setEtat('envoi');
    try {
      const rep = await fetch(FORMSUBMIT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          prenom: prenom.trim(),
          telephone: tel.trim(),
          moment,
          page: origine,
          _subject: `Rappel demandé · ${prenom.trim()} · ${moment}`,
          _template: 'table',
          _honey: piege,
        }),
      });
      if (!rep.ok) throw new Error(String(rep.status));
      mesurer('generate_lead', { formulaire: 'rappel', page: origine });
      setEtat('ok');
    } catch {
      setEtat('erreur');
    }
  };

  return (
    <section className={`rpl${sombre ? ' rpl--sombre' : ''}`} id="rappel" aria-labelledby={`${id}-t`}>
      <div className="container">
        <div className="rpl__in">
        <div className="rpl__tete">
          <h2 className="rpl__titre" id={`${id}-t`}>{titre}</h2>
          <p className="rpl__sous">{sous}</p>
          <p className="rpl__tel">
            Ou appelez directement le{' '}
            <a href={`tel:${CONTACT.telephoneLien}`}>{CONTACT.telephone}</a>
          </p>
        </div>

        {etat === 'ok' ? (
          <div className="rpl__ok" role="status">
            <p className="rpl__ok-titre">C’est noté, merci {prenom.trim() || ''}.</p>
            <p>On vous rappelle sous 24 h ({moment.toLowerCase()}). En attendant, vous pouvez déjà choisir un créneau ou nous écrire.</p>
            <a href={`${BASE}/contact/`} className="lien-fleche">Nous écrire <span aria-hidden="true">→</span></a>
          </div>
        ) : (
          <form className="rpl__form" onSubmit={envoyer} noValidate>
            <div className="rpl__champs">
              <label className="rpl__champ">
                <span>Votre prénom</span>
                <input type="text" name="prenom" autoComplete="given-name" required maxLength={40}
                  value={prenom} onChange={(e) => setPrenom(e.target.value)} />
              </label>
              <label className="rpl__champ">
                <span>Votre téléphone</span>
                <input type="tel" name="telephone" inputMode="tel" autoComplete="tel" required maxLength={20}
                  placeholder="06 12 34 56 78" value={tel} onChange={(e) => setTel(e.target.value)} />
              </label>
              <label className="rpl__champ">
                <span>Quand vous rappeler</span>
                <select name="moment" value={moment} onChange={(e) => setMoment(e.target.value)}>
                  {MOMENTS.map((m) => <option key={m} value={m}>{m}</option>)}
                </select>
              </label>
            </div>
            <label className="rpl__accord">
              <input type="checkbox" checked={accord} onChange={(e) => setAccord(e.target.checked)} />
              <span>
                J’accepte que Reskope me rappelle à ce numéro. Il ne sert qu’à ça.{' '}
                <a href={`${BASE}/confidentialite/`}>Confidentialité</a>
              </span>
            </label>
            {/* Piège à robots : invisible pour un humain */}
            <input type="text" name="_honey" tabIndex={-1} autoComplete="off" aria-hidden="true" className="rpl__piege"
              value={piege} onChange={(e) => setPiege(e.target.value)} />
            {erreur && <p className="rpl__erreur" role="alert">{erreur}</p>}
            {etat === 'erreur' && (
              <p className="rpl__erreur" role="alert">
                L’envoi n’a pas fonctionné. Appelez-nous au {CONTACT.telephone}, ou réessayez dans un instant.
              </p>
            )}
            <button type="submit" className="btn btn--on-dark rpl__bouton" disabled={etat === 'envoi' || !prenom.trim() || !tel.trim()}>
              {etat === 'envoi' ? 'Envoi…' : 'Être rappelé'}
              <span className="btn__arrow" aria-hidden="true">→</span>
            </button>
          </form>
        )}
        </div>
      </div>
    </section>
  );
}
