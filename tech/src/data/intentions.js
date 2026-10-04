/* ════════════════════════════════════════════════════════════
   LES PAGES PAR INTENTION DE L'ESPACE DES ENTREPRISES (04/10/2026)

   Même logique que src/data/intentions.js (site principal) : une page par
   recherche réellement tapée (« création site internet valenciennes »,
   « site internet artisan », « prise de rendez-vous en ligne coiffeur »,
   « audit informatique pme », « transformation numérique pme »), qui mène
   vite à l'action. Chaque page appartient à UN espace (profil) : Define
   pour les TPE, Elevate pour les PME.

   Faits repris des offres (data/profils.js, data/site.js) : une vitrine
   sobre en cinq à huit jours de travail, une boutique en dix à quinze,
   facturé à la journée avec une estimation écrite, code et accès au nom du
   client ; l'audit, deux à cinq jours sur le terrain, un bilan que le
   client garde. Prix jamais chiffrés, aucune position Google promise.
   Pages en français seulement, comme les pages de la maison.
   ════════════════════════════════════════════════════════════ */

const RASSURE_TPE = [
  'Une vitrine sobre en cinq à huit jours de travail',
  'Facturé à la journée, estimation écrite avant de commencer',
  'Le code et les accès à votre nom, rien de verrouillé',
];

export const INTENTIONS = [
  {
    profil: 'tpe',
    route: '/creation-site-internet-valenciennes',
    type: 'local',
    ville: 'Valenciennes',
    priorite: '0.9',
    fil: 'Site internet à Valenciennes',
    titre: 'Création de site internet à Valenciennes',
    description: 'Création de site internet à Valenciennes pour TPE, artisans et commerçants : vitrine ou boutique, prise de rendez-vous, code et accès à votre nom.',
    h1: 'Création de site internet à Valenciennes',
    surtitre: 'Reskope Define · TPE, artisans et commerçants du Valenciennois',
    accroche: 'Un site qui dit en une phrase ce que vous faites et pour qui, qu’on trouve quand on cherche votre métier à Valenciennes, et qui vous appartient : code, hébergement et nom de domaine à votre nom.',
    points: RASSURE_TPE,
    sections: [
      {
        titre: 'Un site qui fait venir des clients, pas une plaquette',
        texte: [
          'On part de ce que vous vendez et de qui vous achète. Le site dit tout de suite ce que vous faites, pour qui et où ; il montre vos réalisations ; il donne un moyen simple de vous joindre : appeler, écrire, réserver.',
          'Il est aussi construit pour être trouvé : des titres et des textes qui reprennent ce que vos clients tapent sur Google, une page par service, votre ville.',
        ],
      },
      {
        titre: 'Ce qu’on construit',
        liste: [
          'Un site vitrine, ou une boutique en ligne si vous vendez',
          'Le formulaire de contact et la prise de rendez-vous',
          'Le paiement, la livraison et le stock, pour une boutique',
          'Les liaisons avec vos outils : le devis part en facture, la facture chez le comptable',
          'Le code, les fichiers sources et les accès à votre nom',
        ],
      },
      {
        titre: 'Comment ça se passe',
        texte: [
          'Un premier échange de 30 minutes pour comprendre votre activité, puis une estimation écrite, en jours. On avance ensuite par petites étapes que vous validez une par une : la structure, les textes, la maquette, le site en ligne.',
          'Vous pouvez vous arrêter à la fin de n’importe quelle étape : ce qui est fait vous reste, sources comprises.',
        ],
      },
      {
        titre: 'Dans le Valenciennois',
        texte: [
          'À Valenciennes et autour : Anzin, Saint-Saulve, Marly, Trith-Saint-Léger, Denain, Saint-Amand-les-Eaux. On vient vous voir pour comprendre votre métier, et le reste avance à distance, sans vous faire perdre de temps.',
        ],
        lien: { vers: '/creation-site-internet-lille', texte: 'La création de site internet à Lille' },
      },
    ],
    offres: ['site', 'reservation', 'marque'],
    faq: [
      { q: 'Combien coûte un site internet ?', r: 'Le prix dépend du nombre de pages, de la vente en ligne ou non, et des outils à relier. On le facture à la journée, avec une estimation écrite avant de commencer : vous savez ce que vous payez, et pourquoi.' },
      { q: 'Combien de temps pour avoir mon site en ligne ?', r: 'Un site vitrine sobre demande cinq à huit jours de travail, étalés sur deux à trois semaines pour laisser le temps des allers-retours. Une boutique en demande davantage, autour de dix à quinze. Le nombre exact est écrit avant de commencer.' },
      { q: 'Le site m’appartient-il à la fin ?', r: 'Oui, entièrement et sans condition : le code, les fichiers sources, l’hébergement et le nom de domaine sont à votre nom. Vous pouvez reprendre le travail avec n’importe qui, ou le continuer vous-même.' },
      { q: 'Mon site sera-t-il bien placé sur Google ?', r: 'On le construit pour être trouvé : des titres et des textes qui reprennent ce que vos clients cherchent, une page par service, votre ville. Le classement dépend aussi de votre fiche Google, des avis et du temps : on vous explique ce qui vous revient, et on ne promet pas de position.' },
    ],
    liens: ['/creation-site-internet-lille', '/site-internet-artisan', '/prise-de-rendez-vous-en-ligne', '/offres'],
    resume: 'Création de site internet à Valenciennes et dans le Valenciennois pour les TPE, artisans et commerçants : site vitrine ou boutique en ligne, prise de rendez-vous, liaisons avec vos outils. Une vitrine sobre en cinq à huit jours de travail, facturée à la journée avec une estimation écrite ; le code, l’hébergement et le nom de domaine à votre nom.',
  },

  {
    profil: 'tpe',
    route: '/creation-site-internet-lille',
    type: 'local',
    ville: 'Lille',
    priorite: '0.9',
    fil: 'Site internet à Lille',
    titre: 'Création de site internet à Lille',
    description: 'Création de site internet à Lille pour commerces, artisans et indépendants : un site clair qui fait choisir, une boutique si vous vendez, tout à votre nom.',
    h1: 'Création de site internet à Lille',
    surtitre: 'Reskope Define · TPE, artisans et commerçants de la métropole',
    accroche: 'Dans la métropole lilloise, vos clients comparent avant de choisir. Un site clair, rapide et honnête les fait choisir : ce que vous faites, pour qui, vos réalisations, et un moyen de vous joindre en un geste.',
    points: RASSURE_TPE,
    sections: [
      {
        titre: 'À Lille, être trouvé ne suffit pas : il faut être choisi',
        texte: [
          'Sur une recherche lilloise, votre site arrive à côté de dizaines d’autres. Le visiteur décide en quelques secondes : il doit comprendre ce que vous faites et pourquoi vous, puis trouver le bouton pour appeler, réserver ou acheter.',
          'C’est par là qu’on commence : vos clients, ce qui les décide, ce qu’ils comparent. Le site en découle, page par page.',
        ],
      },
      {
        titre: 'Ce qu’on construit',
        liste: [
          'Un site vitrine, ou une boutique en ligne si vous vendez',
          'La prise de rendez-vous en ligne, avec confirmation et rappel',
          'Le paiement, la livraison et le stock, pour une boutique',
          'Les liaisons avec vos outils existants',
          'Le code, les fichiers sources et les accès à votre nom',
        ],
      },
      {
        titre: 'Comment ça se passe',
        texte: [
          'Un premier échange de 30 minutes, une estimation écrite en jours, puis des petites étapes que vous validez une par une. Une vitrine sobre demande cinq à huit jours de travail, une boutique dix à quinze.',
        ],
      },
      {
        titre: 'Dans la métropole lilloise',
        texte: [
          'À Lille, Roubaix, Tourcoing, Villeneuve-d’Ascq, Lambersart, Marcq-en-Barœul et alentour. On vient vous voir pour comprendre votre métier, et le reste avance à distance.',
        ],
        lien: { vers: '/creation-site-internet-valenciennes', texte: 'La création de site internet à Valenciennes' },
      },
    ],
    offres: ['site', 'reservation', 'marque'],
    faq: [
      { q: 'Pourquoi vous plutôt qu’une agence lilloise ?', r: 'Comparez, c’est sain. Ce qu’on fait de façon sûre : on commence par comprendre votre métier et vos clients, tout est facturé à la journée avec une estimation écrite, et le site est à votre nom, sans rien de verrouillé de notre côté.' },
      { q: 'Vous faites aussi les boutiques en ligne ?', r: 'Oui : le catalogue, le paiement, la livraison et le stock. Comptez autour de dix à quinze jours de travail, selon le nombre de produits et les outils à relier.' },
      { q: 'J’ai déjà un site. Vous pouvez le reprendre ?', r: 'Oui. Souvent, on garde ce qui fonctionne et on refait ce qui fait fuir les visiteurs. On vous dit ce qui vaut la peine d’être repris, et ce qui ne la vaut pas.' },
      { q: 'Combien coûte un site à Lille ?', r: 'Le même prix qu’ailleurs chez nous : il dépend du nombre de pages, de la vente en ligne et des outils à relier. Facturé à la journée, estimation écrite avant de commencer.' },
    ],
    liens: ['/creation-site-internet-valenciennes', '/site-internet-artisan', '/prise-de-rendez-vous-en-ligne', '/offres'],
    resume: 'Création de site internet à Lille et dans la métropole (Roubaix, Tourcoing, Villeneuve-d’Ascq, Lambersart, Marcq-en-Barœul) pour les commerces, artisans et indépendants : un site clair qui fait choisir, une boutique en ligne si vous vendez, la prise de rendez-vous. Facturé à la journée avec une estimation écrite ; tout est à votre nom.',
  },

  {
    profil: 'tpe',
    route: '/site-internet-artisan',
    type: 'local',
    ville: 'Nord',
    priorite: '0.8',
    fil: 'Site internet pour artisan',
    titre: 'Site internet pour artisan, Valenciennes et Lille',
    description: 'Un site internet pour artisan qui montre vos chantiers, votre zone d’intervention et fait demander un devis en deux clics. À Valenciennes, Lille et alentour.',
    h1: 'Un site internet pour artisan, qui fait demander des devis',
    surtitre: 'Reskope Define · artisans du bâtiment, de bouche et de service',
    accroche: 'Vos clients vous trouvent par le bouche-à-oreille, puis vérifient sur internet. S’ils ne trouvent rien, ou une page vide, ils appellent quelqu’un d’autre. Un site d’artisan n’a pas besoin d’être grand : il doit rassurer et faire appeler.',
    points: RASSURE_TPE,
    sections: [
      {
        titre: 'Ce que doit faire le site d’un artisan',
        liste: [
          'Montrer vos réalisations, chantier après chantier',
          'Dire où vous intervenez, commune par commune',
          'Faire demander un devis en deux clics, ou appeler d’un geste',
          'Rassurer : vos qualifications, vos garanties, l’avis de vos clients',
          'Se trouver quand on cherche votre métier et votre ville',
        ],
      },
      {
        titre: 'Ce qu’on fait pour vous',
        texte: [
          'Un rendez-vous pour comprendre votre métier et vos clients, vos photos de chantier, vos validations : c’est tout ce qu’on vous demande. Les textes, la structure, le référencement de base et la mise en ligne, on s’en charge.',
          'Si vous prenez des rendez-vous ou envoyez des devis, on relie le site à vos outils : la demande arrive au bon endroit, le devis part en facture.',
        ],
      },
      {
        titre: 'Le prix, sans surprise',
        texte: [
          'Il dépend du nombre de pages, de la prise de rendez-vous ou non, et des outils à relier. On le facture à la journée, avec une estimation écrite avant de commencer, et le site est à votre nom à la fin.',
        ],
      },
      {
        titre: 'À Valenciennes, à Lille et autour',
        texte: [
          'Dans le Valenciennois comme dans la métropole lilloise. On vient voir votre activité sur place, et le reste avance à distance pour ne pas vous prendre de temps.',
        ],
        lien: { vers: '/creation-site-internet-valenciennes', texte: 'La création de site internet à Valenciennes' },
      },
    ],
    offres: ['site', 'reservation', 'marque'],
    faq: [
      { q: 'Je n’ai pas le temps de m’en occuper.', r: 'On vous demande peu : un rendez-vous pour comprendre votre métier, vos photos et vos validations. Le reste, on s’en charge, par petites étapes que vous validez quand ça vous arrange.' },
      { q: 'Je n’ai pas de belles photos de mes chantiers.', r: 'On vous dit lesquelles prendre avec votre téléphone, chantier après chantier. Le site peut démarrer avec ce que vous avez, et s’enrichir au fil des chantiers.' },
      { q: 'Un site, ça m’apportera vraiment des clients ?', r: 'Il ne remplace pas le bouche-à-oreille : il le confirme. Celui à qui on vous recommande vérifie sur internet avant d’appeler. Le site doit le rassurer et lui donner envie d’appeler ; avec une fiche Google bien remplie, il vous fait aussi trouver par ceux qui cherchent votre métier.' },
      { q: 'Combien coûte un site pour un artisan ?', r: 'Facturé à la journée, avec une estimation écrite avant de commencer. Le prix dépend du nombre de pages, de la prise de rendez-vous et des outils à relier.' },
    ],
    liens: ['/creation-site-internet-valenciennes', '/creation-site-internet-lille', '/prise-de-rendez-vous-en-ligne', '/offres'],
    resume: 'Création de site internet pour artisan à Valenciennes, à Lille et alentour : un site qui montre vos réalisations, votre zone d’intervention, rassure et fait demander un devis en deux clics. On vous demande peu de temps ; facturé à la journée avec une estimation écrite, et le site est à votre nom.',
  },

  {
    profil: 'tpe',
    route: '/prise-de-rendez-vous-en-ligne',
    type: 'local',
    ville: 'Nord',
    priorite: '0.8',
    fil: 'Rendez-vous en ligne',
    titre: 'Prise de rendez-vous en ligne pour votre activité',
    description: 'Prise de rendez-vous en ligne pour salons, instituts, artisans et indépendants : créneaux, confirmation, rappel la veille, relié à votre agenda.',
    h1: 'La prise de rendez-vous en ligne, reliée à votre agenda',
    surtitre: 'Reskope Define · salons, instituts, artisans, indépendants',
    accroche: 'Le téléphone sonne pendant que vous travaillez, vous rappelez le soir, et quelqu’un ne vient pas. Avec la prise de rendez-vous en ligne, le client réserve seul, reçoit sa confirmation, est rappelé la veille, et votre agenda se tient à jour.',
    points: ['Créneaux en ligne, confirmation et rappel automatiques', 'Relié à votre agenda et à votre site', 'Facturé à la journée, estimation écrite avant de commencer'],
    sections: [
      {
        titre: 'Ce qu’on met en place',
        liste: [
          'Vos créneaux réels en ligne, sur votre site',
          'La confirmation automatique, et le rappel la veille',
          'La relance des clients qui ne sont pas revenus depuis longtemps',
          'Le lien avec l’agenda que vous utilisez déjà',
          'Un fichier clients avec l’historique, et une carte de fidélité si vous en voulez une',
        ],
      },
      {
        titre: 'Avec vos outils, pas contre eux',
        texte: [
          'Il n’est presque jamais nécessaire de tout changer. Souvent, il suffit de faire parler entre eux ce que vous avez déjà : l’agenda, le site, le fichier clients. On ne remplace que ce qui coince vraiment, et on vous dit pourquoi.',
        ],
      },
      {
        titre: 'Pour qui',
        texte: [
          'Les salons de coiffure, les instituts de beauté, les artisans qui se déplacent, les professions libérales, les commerces de service : toutes les activités où un rendez-vous manqué ou un appel en plein travail coûte de l’argent. À Valenciennes, à Lille et alentour.',
        ],
      },
    ],
    offres: ['reservation', 'site'],
    faq: [
      { q: 'Il existe des applications de réservation toutes faites. Pourquoi vous ?', r: 'Elles conviennent souvent, et on vous le dit quand c’est le cas. On intervient quand il faut les relier à votre site, à votre agenda et à votre fichier clients, ou quand votre activité ne rentre pas dans leurs cases.' },
      { q: 'Et les clients qui ne viennent pas ?', r: 'Le rappel automatique la veille en évite déjà une bonne partie. Et si vous le souhaitez, un acompte peut être payé en ligne au moment de réserver.' },
      { q: 'Combien ça coûte ?', r: 'Le prix dépend du nombre de prestations et de personnes à gérer, de l’agenda déjà en place et du paiement d’acompte. Facturé à la journée, avec une estimation écrite avant de commencer.' },
    ],
    liens: ['/creation-site-internet-valenciennes', '/creation-site-internet-lille', '/site-internet-artisan', '/offres'],
    resume: 'Mise en place de la prise de rendez-vous en ligne pour les salons, instituts de beauté, artisans, professions libérales et commerces de service, à Valenciennes et à Lille : créneaux en ligne, confirmation et rappel la veille, relance des clients, lien avec votre agenda et votre fichier clients, acompte en ligne si besoin.',
  },

  {
    profil: 'pme',
    route: '/audit-informatique-pme',
    type: 'local',
    ville: 'Nord',
    priorite: '0.9',
    fil: 'Audit des outils',
    titre: 'Audit informatique de PME, Valenciennes et Lille',
    description: 'Audit des outils numériques de votre PME à Valenciennes et Lille : deux à cinq jours avec vos équipes, doublons et coûts cachés, un bilan que vous gardez.',
    h1: 'L’audit des outils numériques de votre PME, à Valenciennes et à Lille',
    surtitre: 'Reskope Elevate · PME de 10 à 250 personnes',
    accroche: 'Des logiciels payés que personne n’ouvre, la même information saisie trois fois, des équipes qui cherchent au lieu de travailler. On vient compter, poste par poste, ce que vos outils vous coûtent vraiment, et ce qu’il faut changer en premier.',
    points: ['Deux à cinq jours sur le terrain, avec vos équipes', 'Un bilan priorisé par impact, que vous gardez', 'Aucune obligation de continuer avec nous'],
    sections: [
      {
        titre: 'Ce qu’on regarde',
        liste: [
          'Chaque outil que vous payez, et qui s’en sert vraiment',
          'Les doublons : deux outils achetés pour le même travail',
          'Les ressaisies : la même information tapée d’un écran à l’autre',
          'Le temps perdu à chercher une information, ou à attendre quelqu’un',
          'Les coûts cachés : abonnements oubliés, licences en trop',
        ],
      },
      {
        titre: 'Comment ça se passe',
        texte: [
          'On passe deux à cinq jours sur le terrain, de visu : des entretiens individuels avec vos équipes, au poste de chacun, pour voir comment le travail se fait vraiment. Puis on cartographie vos outils et vos usages.',
          'À la fin, vous recevez un bilan priorisé par impact, pas par complexité technique, et des recommandations que vous pouvez mettre en œuvre avec nous, seuls, ou avec quelqu’un d’autre.',
        ],
      },
      {
        titre: 'Ce que ce n’est pas',
        texte: [
          'Ce n’est pas un audit de sécurité ni de réseau : on regarde vos outils et la façon dont vos équipes s’en servent. Si une question de sécurité apparaît, on vous le dit, et on vous oriente vers un spécialiste.',
        ],
      },
      {
        titre: 'Et après l’audit',
        texte: [
          'Vous choisissez. On peut relier les outils qui ne se parlent pas, automatiser les ressaisies, construire l’outil qui manque, puis former vos équipes. Chaque journée est estimée avant de commencer. Si vous voulez reprendre la main à mi-chemin, c’est possible.',
        ],
        lien: { vers: '/transformation-numerique-pme', texte: 'Le guide : transformation numérique d’une PME, par où commencer' },
      },
    ],
    offres: ['audit', 'audit-plus', 'suivi'],
    faq: [
      { q: 'Combien de temps dure l’audit ?', r: 'Deux à cinq jours sur le terrain, selon le nombre d’équipes et de sites. Le bilan suit, avec les priorités classées par impact.' },
      { q: 'Faut-il bloquer nos équipes ?', r: 'Non. Les entretiens sont individuels, au poste de chacun, sur des créneaux organisés avec vous pour ne pas arrêter le travail.' },
      { q: 'Combien coûte un audit ?', r: 'Le prix dépend du nombre d’équipes ou de sites à couvrir, de la complexité de vos outils et du format du bilan. Il est écrit avant de commencer.' },
      { q: 'Sommes-nous obligés de continuer avec vous ?', r: 'Non. Le bilan vous appartient, quelle que soit la suite : vous pouvez le mettre en œuvre seuls, avec nous ou avec quelqu’un d’autre.' },
    ],
    liens: ['/transformation-numerique-pme', '/offres', '/methode', '/exemple'],
    resume: 'Audit des outils numériques des PME de 10 à 250 personnes à Valenciennes et à Lille : deux à cinq jours sur le terrain, entretiens individuels avec les équipes, cartographie des outils et des usages, doublons, ressaisies et coûts cachés, puis un bilan priorisé par impact que vous gardez, sans obligation de continuer. Ce n’est pas un audit de sécurité ou de réseau.',
  },

  {
    profil: 'pme',
    route: '/transformation-numerique-pme',
    type: 'guide',
    ville: 'Nord',
    priorite: '0.8',
    fil: 'Transformation numérique',
    titre: 'Transformation numérique PME : par où commencer',
    description: 'Transformation numérique d’une PME : partir de l’existant, mesurer le temps perdu, relier avant de remplacer, avancer par petites étapes. Le guide de Reskope.',
    h1: 'Transformation numérique d’une PME : par où commencer',
    surtitre: 'Guide · dirigeants de PME',
    accroche: 'La transformation numérique ne commence pas par l’achat d’un logiciel. Elle commence par regarder comment le travail se fait aujourd’hui, et ce qu’il coûte. Voici l’ordre qui évite les projets qui s’enlisent.',
    sections: [
      {
        titre: 'Partir de l’existant, pas d’un catalogue',
        texte: [
          'Avant de choisir quoi que ce soit, faites l’inventaire : les outils que vous payez, qui s’en sert, et pour quoi faire. La plupart des PME découvrent des doublons, des abonnements oubliés et des tableurs qui font le travail d’un logiciel acheté.',
        ],
      },
      {
        titre: 'Mesurer le temps perdu',
        texte: [
          'Le coût du désordre numérique ne se voit pas sur une facture : il se voit dans les heures. Selon McKinsey, près de la moitié de la semaine de travail part dans les e-mails et la recherche d’information. Chez vous, demandez à chaque équipe ce qu’elle saisit deux fois, et ce qu’elle cherche le plus souvent.',
        ],
        source: { texte: 'McKinsey Global Institute', url: 'https://www.mckinsey.com/industries/technology-media-and-telecommunications/our-insights/the-social-economy' },
      },
      {
        titre: 'Relier avant de remplacer',
        texte: [
          'Remplacer un outil coûte cher, en licences et en habitudes. Le plus souvent, il suffit de faire parler entre eux ceux que vous avez : une information saisie une fois, et retrouvée partout. On ne remplace que ce qui coince vraiment.',
        ],
      },
      {
        titre: 'Classer par impact, avancer par petites étapes',
        texte: [
          'Classez les chantiers par le temps qu’ils rendent, pas par leur complexité technique. Commencez par celui qui soulage le plus de monde, mesurez le gain, puis passez au suivant. Un grand projet d’un an s’enlise ; dix petites étapes de quelques semaines avancent.',
        ],
      },
      {
        titre: 'Former, puis laisser les équipes autonomes',
        texte: [
          'Un outil que personne ne maîtrise retourne au tableur. Formez vos équipes sur leurs propres dossiers, écrivez une documentation pour elles, et gardez quelqu’un joignable les premiers mois.',
        ],
      },
      {
        titre: 'Comment on vous aide',
        texte: [
          'On commence par l’audit : deux à cinq jours sur le terrain, et un bilan priorisé par impact que vous gardez. Puis, si vous le souhaitez, on relie, on automatise, on construit ce qui manque, et on forme vos équipes, chaque journée estimée avant de commencer.',
        ],
        lien: { vers: '/audit-informatique-pme', texte: 'L’audit des outils numériques de votre PME' },
      },
    ],
    offres: ['audit', 'audit-plus', 'developpement', 'suivi'],
    faq: [
      { q: 'Faut-il un plan de transformation numérique écrit ?', r: 'Un plan court, oui : les chantiers classés par impact, avec leur gain attendu et leur ordre. Un document de cinquante pages, non : il vieillit avant d’être appliqué.' },
      { q: 'Par quel outil commencer ?', r: 'Par aucun. Commencez par l’inventaire de ce que vous avez et le temps que ça vous coûte ; l’outil vient après, et souvent c’est une liaison entre deux outils existants.' },
      { q: 'Combien de temps prend une transformation numérique ?', r: 'Elle ne se termine jamais vraiment, mais les premiers gains arrivent vite si on avance par petites étapes : quelques semaines par chantier, chacun mesuré avant et après.' },
    ],
    liens: ['/audit-informatique-pme', '/pourquoi', '/methode', '/offres'],
    resume: 'Guide pour les dirigeants de PME : par où commencer une transformation numérique. Partir de l’existant (inventaire des outils et des usages), mesurer le temps perdu (près de la moitié de la semaine part dans les e-mails et la recherche d’information selon McKinsey), relier avant de remplacer, classer par impact et avancer par petites étapes, former les équipes. Et comment Reskope accompagne, en commençant par l’audit.',
  },
];

const PAR_ROUTE = Object.fromEntries(INTENTIONS.map((p) => [p.route, p]));
/** La page par intention d'une adresse (sans l'espace), ou null. */
export const intention = (route) => PAR_ROUTE[route] || null;
