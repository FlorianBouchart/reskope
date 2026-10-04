import { useMemo, useRef, useState } from 'react';
import { recto, verso } from '../lib/carteVisite';
import { ADRESSE_AFFICHEE } from '../data/site';
import { mesurer } from '../lib/mesure';
import { PERSONNES, GEO, dec, policesEmbarquees } from '../lib/carteDonnees';
import { Face } from './BusinessCard';

/* ════════════════════════════════════════════════════════════
   LA CARTE DE VISITE, POSÉE DANS LE PIED DE PAGE.

   Demande de Florian (04/10/2026) : la carte qui s'ouvrait dans une fenêtre
   doit être là, directement, bien visible, sans clic. On la pose donc dans
   le pied de page, au format réel (85 × 55), avec le dessin exact des
   fichiers de l'imprimeur (lib/carteVisite.js) : celle de Florian d'abord,
   celle de Thomy en un geste. Elle s'incline sous la souris et se retourne
   quand on la touche (le verso porte la marque).

   Sur téléphone, une carte de visite sert surtout à une chose : finir dans
   les contacts. Le bouton principal télécharge donc une fiche vCard, que
   l'iPhone et Android proposent d'ajouter aux contacts ; à côté, appeler et
   écrire. Les coordonnées restent encodées dans le code livré (data dans
   BusinessCard.jsx) et ne sont reconstruites qu'à l'affichage.
   ════════════════════════════════════════════════════════════ */

/* Une valeur de vCard : les virgules et points-virgules sont échappés. */
const v = (t) => String(t).replace(/\\/g, '\\\\').replace(/([,;])/g, '\\$1');

function vcard(p, tel, mail) {
  const fr = p.fr;
  return [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${v(p.nomFamille)};${v(p.prenom)};;;`,
    `FN:${v(`${p.prenom} ${p.nomFamille}`)}`,
    'ORG:Reskope',
    `TITLE:${v(`${fr.titre} · ${fr.domaine.join(' ')}`)}`,
    `TEL;TYPE=CELL,VOICE:${tel}`,
    `EMAIL;TYPE=INTERNET,WORK:${mail}`,
    'URL:https://reskope.fr/',
    `NOTE:${v('Reskope, cabinet de conseil à Valenciennes et Lille. On vous aide à décider, et on construit la suite.')}`,
    'END:VCARD',
  ].join('\r\n');
}

function telecharger(contenu, nom, type) {
  const url = URL.createObjectURL(new Blob([contenu], { type }));
  const a = document.createElement('a');
  a.href = url;
  a.download = nom;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1500);
}

export default function CarteVivante() {
  const [qui, setQui] = useState('florian');
  const [dos, setDos] = useState(false);
  const carte = useRef(null);
  const svgRecto = useRef(null);
  const svgVerso = useRef(null);
  const p = PERSONNES[qui];
  const tel = dec(p.tel);
  const mail = dec(p.mail);

  const corpsRecto = useMemo(() => recto(
    { prenom: p.prenom, nom: p.nomFamille, tel, mail, ...p.fr },
    { geo: GEO, lang: 'fr', adresse: ADRESSE_AFFICHEE },
  ), [p, tel, mail]);
  const corpsVerso = useMemo(() => verso({ geo: GEO, lang: 'fr' }), []);

  /* La carte suit la souris, comme une carte qu'on tient en main. */
  const incliner = (e) => {
    if (e.pointerType !== 'mouse' || !carte.current) return;
    const r = carte.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    carte.current.style.setProperty('--rx', `${(-y * 10).toFixed(2)}deg`);
    carte.current.style.setProperty('--ry', `${(x * 14).toFixed(2)}deg`);
  };
  const reposer = () => {
    carte.current?.style.setProperty('--rx', '0deg');
    carte.current?.style.setProperty('--ry', '0deg');
  };

  const ajouterAuxContacts = () => {
    telecharger(vcard(p, tel, mail), `${p.prenom}-${p.nomFamille}-Reskope.vcf`.toLowerCase(), 'text/vcard;charset=utf-8');
    mesurer('contact_carte', { qui });
  };

  const telechargerCarte = async () => {
    const svg = (dos ? svgVerso : svgRecto).current;
    if (!svg) return;
    const copie = svg.cloneNode(true);
    copie.setAttribute('width', '85mm');
    copie.setAttribute('height', '55mm');
    copie.querySelector('defs')?.remove();
    copie.querySelector('g[clip-path]')?.removeAttribute('clip-path');
    try {
      const style = document.createElementNS('http://www.w3.org/2000/svg', 'style');
      style.textContent = await policesEmbarquees();
      copie.insertBefore(style, copie.firstChild);
    } catch {
      /* Hors ligne : le fichier part sans la police ; le logo, vectorisé, reste juste. */
    }
    telecharger(new XMLSerializer().serializeToString(copie), `reskope-carte-${qui}-${dos ? 'verso' : 'recto'}.svg`, 'image/svg+xml;charset=utf-8');
  };

  return (
    <section className="cvv" aria-labelledby="cvv-t">
      <div className="container cvv__in">
        <div className="cvv__texte">
          <h2 className="cvv__titre" id="cvv-t">Gardez notre contact</h2>
          <p className="cvv__dit">
            Thomy et Florian, à Valenciennes et à Lille. Ajoutez-nous à vos contacts en un geste, ou appelez directement.
          </p>
          <div className="cvv__qui" role="radiogroup" aria-label="La carte de">
            {Object.entries(PERSONNES).map(([id, x]) => (
              <button
                key={id}
                type="button"
                role="radio"
                aria-checked={qui === id}
                onClick={() => { setQui(id); setDos(false); }}
              >
                {x.prenom}
              </button>
            ))}
          </div>
          <div className="cvv__actions">
            <button type="button" className="btn btn--on-dark cvv__ajouter" onClick={ajouterAuxContacts}>
              Ajouter {p.prenom} à mes contacts
              <span className="btn__arrow" aria-hidden="true">↓</span>
            </button>
            <a className="cvv__lien" href={`tel:${tel.replace(/[^+\d]/g, '')}`}>Appeler</a>
            <a className="cvv__lien" href={`mailto:${mail}`}>Écrire</a>
            <button type="button" className="cvv__lien cvv__dl" onClick={telechargerCarte}>Télécharger la carte</button>
          </div>
        </div>

        <div className="cvv__scene">
          <button
            type="button"
            ref={carte}
            className={`cvv__carte${dos ? ' is-dos' : ''}`}
            onClick={() => setDos((d) => !d)}
            onPointerMove={incliner}
            onPointerLeave={reposer}
            aria-label={dos ? 'Revoir le recto de la carte' : 'Retourner la carte'}
          >
            <span className="cvv__flip">
              <span className="cvv__face cvv__face--recto">
                <Face corps={corpsRecto} clip="cvvRecto" label={`Carte de visite de ${p.prenom} ${p.nomFamille}`} svgRef={svgRecto} />
              </span>
              <span className="cvv__face cvv__face--verso">
                <Face corps={corpsVerso} clip="cvvVerso" label="Reskope : on vous aide à décider, et on construit la suite" svgRef={svgVerso} />
              </span>
            </span>
          </button>
          <p className="cvv__astuce">Touchez la carte pour la retourner</p>
        </div>
      </div>
    </section>
  );
}
