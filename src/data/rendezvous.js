/* ════════════════════════════════════════════════════════════
   PRENDRE RENDEZ-VOUS : le bloc de l'agenda, sur l'accueil et sur la page
   Contact. Trente minutes offertes, une proposition écrite sous 48 h.
   ════════════════════════════════════════════════════════════ */
export const RENDEZ_VOUS = {
  title: 'Trente minutes, à l’heure qui vous arrange.',
  lead: 'Choisissez directement un créneau dans notre agenda. Vous nous racontez votre situation, et on vous dit franchement si on peut vous aider, ou non. À deux, on mène peu de dossiers à la fois : on vous dit tout de suite quand on peut commencer.',
  points: [
    { value: '30 min', label: 'Au téléphone ou en visio, comme vous préférez' },
    { value: '0 €', label: 'Gratuit, sans engagement et sans relance commerciale' },
    { value: '48 h', label: 'Pour recevoir ensuite une proposition écrite, à prix fixe' },
  ],
  cta: 'Choisir un créneau',
  ctaFallback: 'Écrire plutôt',
  loading: 'Ouverture de l’agenda…',
  or: 'Vous préférez écrire ?',
  error: 'L’agenda n’a pas pu s’ouvrir. Réessayez, ou passez directement par',
  privacy: 'L’agenda est fourni par Cal.com. Son script n’est chargé qu’au moment où vous cliquez : tant que vous ne demandez pas de rendez-vous, aucune donnée ne quitte ce site.',
};
