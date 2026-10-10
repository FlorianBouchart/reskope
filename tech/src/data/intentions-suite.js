/* ════════════════════════════════════════════════════════════
   LES PAGES PAR INTENTION DE L'ESPACE DES ENTREPRISES, SUITE (10/10/2026)

   Recherches relevées le 10/10 dans les suggestions de Google, et sans page
   pour y répondre : « agence web valenciennes », « agence web lille »,
   « développeur web freelance lille », « création site e-commerce lille »,
   « identité visuelle lille », « création logo lille », « site vitrine
   prix », « refonte site internet », « fiche google entreprise »,
   « référencement local », « aide digitalisation entreprise 2026 »,
   « automatisation pme sur mesure », « logiciel sur mesure pme »,
   « application métier sur mesure », « intelligence artificielle pme »,
   « consultant ia lille ».

   Mêmes règles que intentions.js : les faits viennent des offres
   (data/profils.js, data/site.js), les chiffres extérieurs ont leur source
   (data/constat.js), aucun prix, aucun montant d'aide recopié, aucune
   position Google promise. Sur l'identité de marque, on dit franchement
   qu'on n'est pas graphistes diplômés.

   `ailleurs` : des cartes vers une page de l'autre espace ou du site
   principal (de vrais liens, pas des routes de cette application).
   ════════════════════════════════════════════════════════════ */

const RASSURE_TPE = [
  'Un premier échange de 30 minutes offert, réponse sous 24 h',
  'Facturé à la journée, estimation écrite avant de commencer',
  'Le code et les accès à votre nom, rien de verrouillé',
];

const RASSURE_PME = [
  'Un premier échange de 30 minutes offert, réponse sous 24 h',
  'Une estimation en jours, écrite avant de commencer',
  'Des petites étapes, que vous validez une par une',
];

export const SUITE = [
  /* ── TPE ─────────────────────────────────────────────────── */
  {
    profil: 'tpe',
    route: '/agence-web-ou-freelance',
    type: 'guide',
    publie: '2026-10-10',
    maj: '10 octobre 2026',
    priorite: '0.8',
    fil: 'Agence web ou freelance',
    titre: 'Agence web, freelance ou cabinet : qui choisir',
    description: 'Agence web, développeur freelance ou cabinet de conseil, à Valenciennes ou à Lille : ce que chacun fait bien, et les six questions à poser avant de signer.',
    h1: 'Agence web, freelance ou cabinet : qui choisir pour votre site, à Valenciennes ou à Lille',
    surtitre: 'Guide · site internet des petites entreprises',
    accroche: 'Trois sortes de prestataires peuvent construire votre site, et aucun n’est le bon pour tout le monde. Voici ce que chacun fait bien, ce qu’il faut surveiller, et les questions à poser aux trois avant de signer quoi que ce soit.',
    sections: [
      {
        titre: 'Trois façons de faire faire un site',
        texte: [
          'Une agence web est une entreprise qui réunit plusieurs métiers : graphiste, développeur, rédacteur, spécialiste de la publicité en ligne. Un développeur freelance est un indépendant qui construit le site seul. Un cabinet de conseil, comme Reskope, part de votre activité et de vos clients, décide avec vous de ce qu’il faut construire, puis le construit.',
          'Les trois peuvent livrer un bon site. La différence est ailleurs : dans ce qui se passe avant, et dans ce qui vous reste après.',
        ],
      },
      {
        titre: 'L’agence web : une équipe et des méthodes',
        texte: [
          'C’est le bon choix quand le projet demande plusieurs métiers à la fois : un gros site, une boutique avec beaucoup de références, des campagnes de publicité à gérer chaque mois.',
        ],
        liste: [
          'À vérifier : qui vous aurez au téléphone, le commercial ou celui qui fait le site',
          'À vérifier : la durée d’engagement, surtout pour les formules par abonnement',
          'À vérifier : ce qui vous appartient si vous arrêtez',
        ],
      },
      {
        titre: 'Le développeur freelance : un interlocuteur, un besoin précis',
        texte: [
          'C’est le bon choix quand vous savez exactement ce que vous voulez : la structure, les textes et les images sont prêts, il reste à construire. Vous parlez à celui qui fait.',
        ],
        liste: [
          'À vérifier : qui écrit les textes et qui fournit les photos',
          'À vérifier : sa disponibilité après la mise en ligne',
          'À vérifier : ce qui se passe s’il n’est plus joignable',
        ],
      },
      {
        titre: 'Le cabinet de conseil : partir du besoin avant de construire',
        texte: [
          'C’est le bon choix quand vous n’êtes pas sûr de ce qu’il vous faut. On commence par ce que vous vendez et par ceux qui vous achètent, on décide ensemble de ce que le site doit dire et faire, puis on le construit. S’il vous faut plutôt une prise de rendez-vous ou une liaison entre deux logiciels qu’un nouveau site, on vous le dit.',
          'Ce qu’on ne fait pas : la gestion de vos campagnes publicitaires. Si c’est votre premier besoin, une agence sera mieux placée.',
        ],
      },
      {
        titre: 'Les six questions à poser, aux trois',
        liste: [
          'À qui appartiendront le nom de domaine, le code et les accès ?',
          'Que se passe-t-il si j’arrête le contrat ?',
          'Qui écrit les textes, qui fournit les photos ?',
          'Qui vais-je avoir au téléphone pendant et après le projet ?',
          'Combien coûte une modification après la mise en ligne ?',
          'Le prix est-il écrit avant de commencer ?',
        ],
      },
      {
        titre: 'À Valenciennes et à Lille',
        texte: [
          'Les deux villes ont des agences installées depuis longtemps et de bons indépendants. Notre conseil vaut pour tous, nous compris : demandez à voir un site fait pour une entreprise qui ressemble à la vôtre, puis appelez ce client. Cinq minutes au téléphone avec lui vous en diront plus qu’une plaquette.',
        ],
        lien: { vers: '/creation-site-internet-valenciennes', texte: 'Notre façon de créer un site, à Valenciennes' },
      },
    ],
    offres: ['site', 'reservation', 'marque'],
    faq: [
      { q: 'Un site par abonnement mensuel, est-ce une bonne idée ?', r: 'Ça dépend de ce qui vous reste à la fin. Dans beaucoup de formules, le site est loué : si vous arrêtez de payer, il disparaît, et vous repartez de zéro. Posez la question avant de signer. Chez nous, le code, le nom de domaine et les accès sont à votre nom dès le départ.' },
      { q: 'Combien de temps faut-il pour un site vitrine ?', r: 'Chez nous, un site vitrine sobre demande cinq à huit jours de travail, étalés sur deux à trois semaines pour laisser le temps des allers-retours.' },
      { q: 'Je peux faire mon site moi-même avec un outil en ligne ?', r: 'Oui, et pour démarrer c’est parfois le bon choix. Ce qui prend du temps n’est pas l’outil : c’est de savoir quoi dire, à qui, et dans quel ordre. C’est là qu’un regard extérieur sert.' },
      { q: 'Travaillez-vous aussi à Lille ?', r: 'Oui. On travaille à Valenciennes et à Lille. On vient vous voir pour comprendre votre métier, et la construction avance ensuite à distance.' },
    ],
    liens: ['/creation-site-internet-valenciennes', '/creation-site-internet-lille', '/site-vitrine', '/refonte-site-internet'],
    resume: 'Guide de Reskope pour choisir entre une agence web, un développeur freelance et un cabinet de conseil pour faire faire son site internet, à Valenciennes ou à Lille. L’agence convient aux projets qui demandent plusieurs métiers et de la publicité ; le freelance, à un besoin déjà précis ; le cabinet, quand il faut d’abord décider quoi construire. Six questions à poser aux trois : la propriété du nom de domaine, du code et des accès, la sortie du contrat, les textes et photos, l’interlocuteur, le coût des modifications, le prix écrit avant de commencer.',
  },

  {
    profil: 'tpe',
    route: '/creation-boutique-en-ligne',
    type: 'local',
    priorite: '0.8',
    fil: 'Boutique en ligne',
    titre: 'Création de boutique en ligne, Lille, Valenciennes',
    description: 'Création de boutique en ligne à Lille et à Valenciennes pour artisans et commerçants : catalogue, paiement, livraison, stock, et les clés à votre nom.',
    h1: 'Création de boutique en ligne à Lille et à Valenciennes',
    surtitre: 'Reskope Define · artisans, commerçants et créateurs qui vendent',
    accroche: 'Vous vendez en boutique, sur les marchés ou sur commande, et vous voulez vendre aussi en ligne. On construit la boutique, le paiement et la livraison, on la relie à votre stock et à vos factures, et tout est à votre nom.',
    points: ['Une boutique en dix à quinze jours de travail', 'Facturé à la journée, estimation écrite avant de commencer', 'Le code et les accès à votre nom, rien de verrouillé'],
    sections: [
      {
        titre: 'Ce qu’est une boutique en ligne qui tient debout',
        texte: [
          'Une boutique en ligne, ou site e-commerce, est un site où le client choisit, paie et se fait livrer sans vous appeler. Elle tient debout quand quatre choses fonctionnent ensemble : un catalogue clair, un paiement sûr, une livraison annoncée avant de payer, et un stock juste.',
          'La plupart des boutiques qui déçoivent n’ont pas un problème de technique. Elles ont un problème de stock faux, de frais de port découverts à la dernière étape, ou de photos qui ne donnent pas envie.',
        ],
      },
      {
        titre: 'Ce qu’on construit',
        liste: [
          'Le catalogue : produits, variantes, prix, photos',
          'Le paiement en ligne par carte',
          'La livraison et le retrait en boutique, avec leurs tarifs affichés tôt',
          'Le stock, tenu à jour à chaque vente',
          'Les e-mails de confirmation et de suivi de commande',
          'Les liaisons avec vos outils : la commande devient facture, la facture part chez le comptable',
          'Les pages obligatoires de la vente en ligne, préparées avec vous : conditions de vente, mentions légales, rétractation',
        ],
      },
      {
        titre: 'Ce que vous préparez de votre côté',
        texte: [
          'Trois choses ne peuvent venir que de vous : les photos de vos produits, vos prix, et vos règles de livraison et de retour. On vous aide à les décider, mais ce sont vos choix de commerçant. Plus ils sont clairs au départ, plus la boutique sort vite.',
        ],
      },
      {
        titre: 'Vendre en ligne quand on a déjà une boutique',
        texte: [
          'Pour un commerce de Lille, de Roubaix ou de Valenciennes, la boutique en ligne ne remplace pas le magasin : elle le prolonge. Le retrait sur place fait venir en boutique des clients qui ont commandé de chez eux, et le site sert de vitrine à ceux qui veulent vérifier que vous avez l’article avant de se déplacer.',
          'D’où une question à régler dès le départ : comment votre stock est-il tenu ? Un article vendu au comptoir ne doit plus être vendable en ligne une minute plus tard.',
        ],
      },
      {
        titre: 'Une aide régionale existe',
        texte: [
          'La Région Hauts-de-France soutient les investissements numériques des artisans, des commerçants et des entreprises de l’économie sociale de moins de vingt salariés, site internet compris. Les conditions changent : vérifiez-les sur la page officielle, et déposez votre demande avant de signer un devis.',
        ],
        lien: { vers: '/aides-numerique-hauts-de-france', texte: 'Le guide des aides au numérique dans les Hauts-de-France' },
      },
    ],
    offres: ['site', 'marque', 'lancement'],
    faq: [
      { q: 'Combien coûte une boutique en ligne ?', r: 'Le prix dépend du nombre de produits, des modes de livraison et des outils à relier. On facture à la journée, avec une estimation écrite avant de commencer. S’y ajoutent les frais du prestataire de paiement, que vous réglez directement.' },
      { q: 'Faut-il plutôt vendre sur une place de marché ?', r: 'Les deux se complètent. Une place de marché vous apporte des visiteurs, mais prend une commission et garde la relation avec le client. Votre boutique vous laisse la marge et le fichier clients. Beaucoup commencent par l’une et ajoutent l’autre.' },
      { q: 'Pourrai-je ajouter mes produits moi-même ?', r: 'Oui. On vous montre comment ajouter un produit, changer un prix et suivre une commande. Vous n’avez pas à nous appeler pour ça.' },
      { q: 'Combien de temps avant d’ouvrir ?', r: 'Une boutique demande dix à quinze jours de travail, étalés sur quelques semaines. Le délai dépend surtout de la vitesse à laquelle les photos et les prix sont prêts.' },
    ],
    liens: ['/creation-site-internet-lille', '/creation-site-internet-valenciennes', '/aides-numerique-hauts-de-france', '/offres'],
    resume: 'Création de boutique en ligne (site e-commerce) à Lille et à Valenciennes par Reskope, pour les artisans, commerçants et créateurs : catalogue, paiement par carte, livraison et retrait en boutique, stock tenu à jour, e-mails de commande, liaisons avec la facturation et le comptable, pages légales obligatoires. Dix à quinze jours de travail, facturés à la journée avec une estimation écrite ; le code et les accès sont au nom du client.',
  },

  {
    profil: 'tpe',
    route: '/identite-visuelle-logo',
    type: 'local',
    priorite: '0.7',
    fil: 'Identité visuelle et logo',
    titre: 'Identité visuelle et logo, Lille et Valenciennes',
    description: 'Identité visuelle et logo pour une petite entreprise, à Lille et à Valenciennes : on part de vos clients, on écrit les règles, le logo vient en dernier.',
    h1: 'Identité visuelle et logo pour une petite entreprise, à Lille et à Valenciennes',
    surtitre: 'Reskope Define · identité de marque',
    accroche: 'Un logo ne règle rien s’il ne dit pas à qui vous parlez. On commence par vos clients et par ce que vous voulez qu’ils ressentent, on écrit les règles de votre identité, et le logo vient en dernier.',
    points: ['Trois à cinq jours de travail, étalés sur deux ou trois semaines', 'Un document de règles, utilisable par n’importe quel imprimeur', 'Facturé à la journée, estimation écrite avant de commencer'],
    sections: [
      {
        titre: 'Identité visuelle, logo, charte graphique : de quoi parle-t-on',
        texte: [
          'L’identité visuelle est l’ensemble de ce qui fait qu’on reconnaît votre entreprise : son nom, son logo, ses couleurs, ses caractères d’écriture, le ton de ses phrases, le style de ses photos. La charte graphique est le document qui écrit ces règles. Le logo n’en est qu’un morceau.',
          'Une petite entreprise qui commande « un logo » repart souvent avec une image, et sans savoir quoi en faire sur une devanture, une facture ou un compte de réseau social. C’est la charte qui répond à ces questions.',
        ],
      },
      {
        titre: 'On commence par vos clients, jamais par les couleurs',
        texte: [
          'Avant de choisir un bleu, il faut savoir à qui vous parlez et ce que vous voulez qu’il ressente : la confiance d’un artisan installé, l’énergie d’une jeune marque, le calme d’un cabinet. On le tranche avec vous, à partir de vos vrais clients.',
          'Le reste en découle : le nom s’il n’existe pas encore, le ton, les couleurs, les matières, et les règles pour s’en servir.',
        ],
      },
      {
        titre: 'Ce que vous recevez',
        liste: [
          'Ce que vous voulez que vos clients ressentent, écrit en une page',
          'À qui vous parlez, tranché avec des chiffres',
          'Le nom, le ton, les couleurs, les matières, les règles d’usage',
          'La liste de ce qu’il faut produire, dans l’ordre, avec un budget en face',
          'Un document de règles, pas une image à interpréter',
        ],
      },
      {
        titre: 'Ce qu’on vous dit franchement',
        texte: [
          'Ni Thomy ni Florian ne sont graphistes diplômés. Notre métier est de poser le cadre : à qui vous parlez, ce que votre marque doit dire, les règles qui la tiennent. Le logo, l’enseigne, la charte dessinée, on sait les faire et on les fait quand c’est à notre portée.',
          'Quand une identité demande un spécialiste, on vous le dit, et on transmet le cadre à votre graphiste : il gagne du temps, et vous payez son talent pour dessiner, pas pour deviner.',
        ],
      },
      {
        titre: 'À Lille et à Valenciennes',
        texte: [
          'On vient vous voir, dans votre boutique ou votre atelier. Une identité se décide en regardant le lieu, les produits et les clients qui passent, pas sur une planche d’images.',
        ],
        lien: { vers: '/offres', texte: 'Le détail de l’offre Identité de marque' },
      },
    ],
    offres: ['marque', 'site', 'lancement'],
    faq: [
      { q: 'Je veux seulement un logo. C’est possible ?', r: 'Oui, mais on vous posera quand même les questions du dessus : à qui vous parlez, ce que vous voulez faire ressentir. Sans ça, un logo est un pari. Si votre projet demande un graphiste spécialisé, on vous le dit.' },
      { q: 'J’ai déjà un logo. Faut-il tout refaire ?', r: 'Rarement. Souvent, il manque les règles autour : les couleurs exactes, les caractères, ce qu’on a le droit d’en faire. On peut reprendre une identité existante et l’écrire, sans la changer.' },
      { q: 'Quels fichiers vais-je recevoir ?', r: 'Le document de règles, et les fichiers sources de ce qu’on a dessiné, dans des formats que tout imprimeur ou graphiste peut ouvrir. Ils sont à vous.' },
      { q: 'Combien de temps ça prend ?', r: 'Trois à cinq jours de travail, étalés sur deux ou trois semaines.' },
    ],
    liens: ['/creation-site-internet-lille', '/creation-site-internet-valenciennes', '/site-vitrine', '/offres'],
    resume: 'Identité visuelle et logo pour les petites entreprises de Lille et de Valenciennes, par Reskope. On part des clients et de ce qu’on veut leur faire ressentir, puis on écrit les règles : nom, ton, couleurs, matières, usages, et la liste de ce qu’il faut produire avec un budget en face. Trois à cinq jours de travail sur deux ou trois semaines. Thomy et Florian ne sont pas graphistes diplômés : quand une identité demande un spécialiste, ils le disent et transmettent le cadre au graphiste du client.',
  },

  {
    profil: 'tpe',
    route: '/site-vitrine',
    type: 'guide',
    publie: '2026-10-10',
    maj: '10 octobre 2026',
    priorite: '0.7',
    fil: 'Site vitrine',
    titre: 'Site vitrine : contenu, prix, délais',
    description: 'Ce qu’un site vitrine doit contenir, ce qui fait varier son prix, combien de temps il faut, et les erreurs qui font partir un visiteur en dix secondes.',
    h1: 'Site vitrine : ce qu’il doit contenir, et ce qui fait son prix',
    surtitre: 'Guide · site internet des petites entreprises',
    accroche: 'Un site vitrine a un seul travail : dire en quelques secondes ce que vous faites, pour qui, et comment vous joindre. Voici ce qu’il doit contenir, ce qui fait monter ou baisser son prix, et les erreurs qu’on voit le plus souvent.',
    sections: [
      {
        titre: 'Un site vitrine, c’est quoi',
        texte: [
          'Un site vitrine est un site qui présente une entreprise sans vendre en ligne : ce qu’elle fait, pour qui, où, et comment la contacter. C’est le site de l’artisan, du commerçant, du cabinet, du restaurant. Quand on peut y payer, on parle de boutique en ligne.',
        ],
      },
      {
        titre: 'Les cinq pages qui suffisent',
        liste: [
          'L’accueil : ce que vous faites, pour qui et où, en une phrase, avec un bouton pour vous joindre',
          'Vos services ou produits : une page par service, c’est ce que Google lit le mieux',
          'Vos réalisations : des photos de vrais chantiers, de vrais plats, de vrais clients',
          'Qui vous êtes : un visage, une histoire courte, ce qui rassure',
          'Le contact : téléphone cliquable, formulaire, horaires, zone où vous vous déplacez',
        ],
      },
      {
        titre: 'Ce qui fait varier le prix',
        liste: [
          'Le nombre de pages et de mises en page différentes',
          'Les textes et les photos : fournis par vous, ou à produire',
          'Ce que le site doit faire : formulaire, prise de rendez-vous, devis en ligne',
          'Les outils à relier : agenda, facturation, fichier clients',
          'Une identité à créer, ou déjà en place',
        ],
      },
      {
        titre: 'Combien de temps',
        texte: [
          'Chez nous, un site vitrine sobre demande cinq à huit jours de travail, étalés sur deux à trois semaines. Ce qui allonge un projet n’est presque jamais la technique : ce sont les textes et les photos qui arrivent tard. Prévoyez-les tôt.',
        ],
      },
      {
        titre: 'Les erreurs qui font partir un visiteur',
        liste: [
          'On ne comprend pas ce que vous faites dans les cinq premières secondes',
          'Le téléphone n’est pas visible, ou pas cliquable sur un mobile',
          'Des photos achetées dans une banque d’images, qu’on a vues partout',
          'Un site lent, ou illisible sur un téléphone',
          'Pas de ville, pas de zone : on ne sait pas si vous venez jusqu’ici',
          'Pas de mentions légales, alors qu’elles sont obligatoires',
        ],
      },
      {
        titre: 'Ce qui doit vous appartenir',
        texte: [
          'Le nom de domaine, l’hébergement, le code et les accès doivent être à votre nom. Si votre prestataire disparaît ou si vous changez d’avis, vous gardez votre site et votre adresse. Vérifiez-le avant de signer, chez nous comme ailleurs.',
        ],
        lien: { vers: '/agence-web-ou-freelance', texte: 'Agence web, freelance ou cabinet : qui choisir' },
      },
    ],
    offres: ['site', 'reservation', 'marque'],
    faq: [
      { q: 'Combien coûte un site vitrine ?', r: 'On ne publie pas de tarif, parce que deux sites n’ont jamais le même contenu. On facture à la journée, avec une estimation écrite avant de commencer : vous savez ce que vous payez, et pourquoi.' },
      { q: 'Un site gratuit fait avec un outil en ligne suffit-il ?', r: 'Pour exister en ligne rapidement, oui. Ses limites arrivent plus tard : une adresse qui n’est pas la vôtre, de la publicité, peu de liberté pour être trouvé sur Google. Si vous démarrez ainsi, prenez au moins votre propre nom de domaine.' },
      { q: 'Pourrai-je modifier mon site moi-même ?', r: 'Oui. On vous montre comment changer un texte, une photo ou un horaire. Les accès sont à votre nom.' },
      { q: 'Mon site sera-t-il trouvé sur Google ?', r: 'On le construit pour : une page par service, votre ville, des titres qui reprennent ce que vos clients tapent. Personne ne peut promettre une position, et méfiez-vous de ceux qui le font. La fiche Google de votre entreprise compte autant que le site.' },
    ],
    liens: ['/creation-site-internet-valenciennes', '/creation-site-internet-lille', '/fiche-google-entreprise', '/refonte-site-internet'],
    resume: 'Guide de Reskope sur le site vitrine d’une petite entreprise : cinq pages suffisent (accueil, services, réalisations, qui vous êtes, contact), ce qui fait varier le prix (nombre de pages, textes et photos, fonctions, outils à relier, identité), les délais (cinq à huit jours de travail sur deux à trois semaines), les erreurs qui font partir un visiteur, et ce qui doit appartenir au client : nom de domaine, hébergement, code et accès.',
  },

  {
    profil: 'tpe',
    route: '/refonte-site-internet',
    type: 'local',
    priorite: '0.7',
    fil: 'Refonte de site internet',
    titre: 'Refonte de site internet, Lille et Valenciennes',
    description: 'Refonte de site internet à Lille et à Valenciennes : on garde ce qui marche, on refait ce qui fait fuir, sans perdre votre place sur Google.',
    h1: 'Refonte de site internet à Lille et à Valenciennes',
    surtitre: 'Reskope Define · TPE, artisans et commerçants',
    accroche: 'Votre site date, il ne vous ressemble plus, ou il ne vous amène personne. On ne repart pas de zéro : on regarde ce qui marche encore, on refait le reste, et on déménage sans perdre ce que Google connaît déjà de vous.',
    points: RASSURE_TPE,
    sections: [
      {
        titre: 'Les signes qu’un site est à refaire',
        liste: [
          'Il est difficile à lire sur un téléphone',
          'Il met plusieurs secondes à s’afficher',
          'Vous ne pouvez rien y changer sans appeler quelqu’un',
          'Il parle d’une activité que vous ne faites plus',
          'Personne ne vous dit jamais « je vous ai trouvé sur internet »',
          'Vous ne savez pas à qui appartiennent le nom de domaine et les accès',
        ],
      },
      {
        titre: 'Refaire n’est pas tout jeter',
        texte: [
          'Une refonte de site internet consiste à reconstruire un site existant : sa structure, ses textes, son apparence, parfois son outil. Elle ne veut pas dire tout effacer. Un site ancien a souvent une chose précieuse : des pages que Google connaît, et que des clients trouvent encore.',
          'On commence donc par un relevé : quelles pages sont visitées, d’où viennent les visiteurs, ce qu’ils cherchaient. Ce qui marche est gardé ou amélioré. Ce qui ne sert à personne disparaît.',
        ],
      },
      {
        titre: 'Le piège : perdre sa place sur Google',
        texte: [
          'C’est l’erreur la plus fréquente d’une refonte. Les adresses des pages changent, personne ne prévient Google, et les visites tombent du jour au lendemain. On l’évite avec un plan de redirections : chaque ancienne adresse renvoie vers la nouvelle page qui la remplace.',
          'On vérifie aussi, après la mise en ligne, qu’aucune ancienne page ne mène à une erreur.',
        ],
      },
      {
        titre: 'Comment ça se passe',
        liste: [
          'Le relevé de l’existant : pages, visites, accès, nom de domaine',
          'Ce que le nouveau site doit dire et faire, décidé avec vous',
          'La maquette, puis la construction, par étapes que vous validez',
          'Le plan de redirections, et la mise en ligne',
          'La vérification, et la remise des accès à votre nom',
        ],
      },
      {
        titre: 'Quand on récupère un site qu’on n’a pas fait',
        texte: [
          'Souvent, le premier chantier est de retrouver les clés : qui possède le nom de domaine, où est l’hébergement, quels sont les mots de passe. On vous aide à les récupérer et à tout remettre à votre nom. C’est parfois le travail le plus utile de toute la refonte.',
        ],
        lien: { vers: '/site-vitrine', texte: 'Ce qu’un site vitrine doit contenir' },
      },
    ],
    offres: ['site', 'marque', 'reservation'],
    faq: [
      { q: 'Refonte ou nouveau site : comment choisir ?', r: 'Si votre site a des pages qui amènent encore des visiteurs et un nom de domaine connu, on refait en gardant. S’il n’a jamais été trouvé, on repart d’une page blanche, en gardant seulement l’adresse.' },
      { q: 'Vais-je perdre mes visiteurs pendant la refonte ?', r: 'Non, si les redirections sont faites : l’ancien site reste en ligne jusqu’à la bascule, et chaque ancienne adresse renvoie vers la nouvelle. Personne ne peut promettre une position sur Google, mais on peut éviter de casser ce qui existe.' },
      { q: 'Faut-il changer de nom de domaine ?', r: 'Presque jamais. Votre adresse est ce que Google et vos clients connaissent. On la garde, sauf si elle ne correspond plus du tout à votre activité.' },
      { q: 'Combien de temps dure une refonte ?', r: 'Du même ordre qu’une création : cinq à huit jours de travail pour un site vitrine, plus le temps du relevé et des redirections. Le nombre de jours est écrit avant de commencer.' },
    ],
    liens: ['/site-vitrine', '/creation-site-internet-lille', '/creation-site-internet-valenciennes', '/fiche-google-entreprise'],
    resume: 'Refonte de site internet à Lille et à Valenciennes par Reskope, pour les TPE, artisans et commerçants. On relève d’abord ce qui marche dans le site existant (pages visitées, origine des visiteurs), on garde ou on améliore ces pages, on refait le reste, et on déménage avec un plan de redirections pour ne pas perdre la place acquise sur Google. Le nom de domaine, l’hébergement et les accès sont remis au nom du client.',
  },

  {
    profil: 'tpe',
    route: '/fiche-google-entreprise',
    type: 'guide',
    publie: '2026-10-10',
    maj: '10 octobre 2026',
    priorite: '0.7',
    fil: 'Fiche Google entreprise',
    titre: 'Fiche Google entreprise : la créer, la remplir',
    description: 'Créer et remplir la fiche Google de votre entreprise, étape par étape, pour être trouvé près de chez vous : catégorie, zone, photos, avis, cohérence.',
    h1: 'Fiche Google de votre entreprise : la créer, la remplir, être trouvé près de chez vous',
    surtitre: 'Guide · référencement local',
    accroche: 'Quand quelqu’un cherche « plombier Valenciennes » ou « coiffeur Lille », Google affiche d’abord une carte avec trois entreprises. Pour y figurer, il faut une fiche. Elle est gratuite, et voici comment la remplir pour qu’elle travaille pour vous.',
    sections: [
      {
        titre: 'La fiche Google, c’est quoi',
        texte: [
          'La fiche d’établissement Google, qu’on appelait Google My Business, est la carte d’identité de votre entreprise dans Google et dans Google Maps : nom, activité, adresse ou zone desservie, téléphone, horaires, photos, avis. Elle est gratuite et se gère depuis un compte Google.',
          'Le référencement local, c’est le fait d’apparaître quand quelqu’un cherche un métier près de lui. La fiche en est la première pièce, avant même le site.',
        ],
        source: { texte: 'Aide Google : ajouter ou revendiquer sa fiche d’établissement', url: 'https://support.google.com/business/answer/2911778?hl=fr' },
      },
      {
        titre: 'La créer, dans l’ordre',
        liste: [
          'Cherchez d’abord votre entreprise sur Google Maps : une fiche existe peut-être déjà, à revendiquer',
          'Sinon, créez-la avec le nom exact de votre entreprise, sans mots-clés ajoutés',
          'Choisissez la catégorie principale qui décrit votre métier, puis quelques catégories secondaires',
          'Indiquez votre adresse si vous recevez du public, ou seulement votre zone si vous vous déplacez',
          'Ajoutez le téléphone, le site et les horaires réels',
          'Validez la fiche par la méthode que Google vous propose',
        ],
      },
      {
        titre: 'Ce qui fait la différence',
        liste: [
          'La catégorie principale : c’est le réglage qui pèse le plus',
          'Des photos à vous, récentes : la devanture, l’équipe, des réalisations',
          'La liste de vos services, écrite avec les mots de vos clients',
          'Des horaires à jour, y compris les jours fériés',
          'Une description qui dit ce que vous faites, pour qui et où',
        ],
      },
      {
        titre: 'Les avis : en demander, y répondre',
        texte: [
          'Demandez un avis à chaque client content, au moment où il vous remercie : c’est là qu’il le fera. Envoyez-lui le lien direct vers votre fiche. Répondez à tous les avis, les bons comme les mauvais, calmement.',
          'Deux choses sont interdites par Google : acheter des avis, et trier vos clients pour n’envoyer le lien qu’à ceux qui sont satisfaits. Quelques avis réguliers valent mieux que vingt d’un coup.',
        ],
      },
      {
        titre: 'La cohérence : le même nom, partout',
        texte: [
          'Google recoupe ce qu’il lit sur vous. Votre nom, votre adresse et votre téléphone doivent être écrits de la même façon sur la fiche, sur votre site, dans les annuaires et sur vos réseaux sociaux. Une différence d’orthographe ou un ancien numéro suffit à semer le doute.',
          'Faites le tour une fois : PagesJaunes, les annuaires de votre métier, la fiche Bing, le plan d’Apple.',
        ],
      },
      {
        titre: 'Et le site, dans tout ça',
        texte: [
          'La fiche vous fait apparaître sur la carte. Le site convainc celui qui clique, et aide Google à comprendre ce que vous faites : une page par service, votre ville, vos réalisations. Les deux se renforcent.',
        ],
        lien: { vers: '/site-vitrine', texte: 'Ce qu’un site vitrine doit contenir' },
      },
    ],
    offres: ['site', 'reservation'],
    faq: [
      { q: 'La fiche Google est-elle vraiment gratuite ?', r: 'Oui. Google ne fait pas payer la création ni la gestion d’une fiche. Méfiez-vous des appels qui prétendent le contraire ou qui se présentent comme « Google » pour vous vendre un abonnement.' },
      { q: 'Je travaille chez mes clients, sans local. Puis-je avoir une fiche ?', r: 'Oui. Vous indiquez une zone desservie au lieu d’une adresse visible : les communes ou le rayon où vous vous déplacez.' },
      { q: 'Combien de temps avant d’apparaître ?', r: 'La fiche est visible peu après sa validation. Monter dans la carte prend plus de temps, et dépend de la distance avec la personne qui cherche, de vos avis et de la concurrence. Personne ne peut promettre une place.' },
      { q: 'Vous pouvez la créer pour moi ?', r: 'On vous guide et on prépare les textes, les catégories et les photos avec vous quand on fait votre site. La fiche reste créée depuis votre compte : elle doit vous appartenir.' },
    ],
    liens: ['/site-vitrine', '/creation-site-internet-valenciennes', '/creation-site-internet-lille', '/site-internet-artisan'],
    resume: 'Guide de Reskope pour créer et remplir la fiche d’établissement Google (ex Google My Business) d’une petite entreprise et apparaître dans les recherches locales : chercher une fiche existante, nom exact, catégorie principale, adresse ou zone desservie, téléphone, horaires, validation. Ce qui compte ensuite : la catégorie, des photos récentes, la liste des services, des avis demandés à de vrais clients et auxquels on répond, et le même nom, la même adresse et le même téléphone partout. La fiche est gratuite.',
  },

  {
    profil: 'tpe',
    route: '/aides-numerique-hauts-de-france',
    type: 'guide',
    publie: '2026-10-10',
    maj: '10 octobre 2026',
    priorite: '0.7',
    fil: 'Aides au numérique',
    titre: 'Aides au numérique, Hauts-de-France : le point',
    description: 'Les aides à la numérisation des petites entreprises dans les Hauts-de-France : Région, CCI, France Num, Bpifrance. Qui fait quoi, et où vérifier.',
    h1: 'Aides à la numérisation des petites entreprises dans les Hauts-de-France',
    surtitre: 'Guide · financer un site, une boutique, un outil',
    accroche: 'Un site, une boutique en ligne ou un logiciel peuvent être financés en partie. Mais les montants qui circulent sur internet se contredisent. Voici qui aide vraiment, pour quoi, et les pages officielles où vérifier avant de signer.',
    sections: [
      {
        titre: 'D’abord, une mise en garde',
        texte: [
          'Beaucoup de pages annoncent des « chèques numériques » et des pourcentages de prise en charge. Certaines décrivent des aides qui n’existent plus, d’autres mélangent plusieurs dispositifs. Les règles changent chaque année, parfois en cours d’année.',
          'On ne recopie donc aucun montant ici. On vous dit qui aide, pour quel type de projet, et on vous donne le lien officiel. C’est la seule source qui compte au moment de déposer un dossier.',
        ],
      },
      {
        titre: 'La Région Hauts-de-France : une aide à l’investissement',
        texte: [
          'La Région soutient la transition numérique des petites entreprises : d’après sa page officielle, les artisans et commerçants inscrits au registre du commerce ou au répertoire des métiers, et les entreprises de l’économie sociale et solidaire, de moins de vingt salariés. L’aide porte sur des investissements comme un site internet ou du matériel informatique, et la demande se fait en ligne sur la plateforme de la Région.',
        ],
        source: { texte: 'Région Hauts-de-France : transition numérique des TPE', url: 'https://entreprises.hautsdefrance.fr/Transition-numerique-la-Region-accompagne-les-TPE' },
      },
      {
        titre: 'La CCI : le Booster numérique',
        texte: [
          'La CCI Hauts-de-France propose un accompagnement en deux temps : une demi-journée pour faire le point sur vos usages numériques et vos projets, puis deux jours pour établir un plan d’actions et commencer à l’appliquer. Il s’adresse aux petites entreprises installées depuis plus de trois ans, et il est financé en grande partie par l’Europe et la Région.',
        ],
        source: { texte: 'CCI Hauts-de-France : Booster numérique', url: 'https://hautsdefrance.cci.fr/solutions/booster-numerique/' },
      },
      {
        titre: 'France Num : le catalogue national',
        texte: [
          'France Num est le portail de l’État pour la transformation numérique des petites entreprises. Il ne verse pas d’argent lui-même : il recense les aides existantes, nationales et régionales, et met en relation avec des conseillers. Son moteur de recherche d’aides est le bon endroit pour vérifier ce qui est ouvert aujourd’hui.',
        ],
        source: { texte: 'France Num : les aides financières', url: 'https://www.francenum.gouv.fr/aides-financieres' },
      },
      {
        titre: 'Bpifrance : un prêt, pas une subvention',
        texte: [
          'Pour un projet plus lourd, Bpifrance propose un prêt consacré à la transformation numérique. C’est de l’argent à rembourser, pas une aide : il sert à étaler un investissement, pas à le réduire.',
        ],
        source: { texte: 'Bpifrance : prêt pour la transformation numérique', url: 'https://www.bpifrance.fr/catalogue-offres/pret-boost-transformation-numerique' },
      },
      {
        titre: 'La règle à retenir : demander avant de signer',
        texte: [
          'Dans la plupart des dispositifs, la demande doit être déposée avant de signer le devis ou de payer quoi que ce soit. Une dépense déjà engagée n’est en général plus finançable. Vérifiez ce point pour votre aide, et gardez l’accusé de dépôt.',
        ],
      },
      {
        titre: 'Ce qu’on fait de notre côté',
        texte: [
          'Notre estimation est écrite, en jours, avant de commencer : elle sert de devis pour votre dossier. On vous indique les pages officielles à consulter. Le dépôt de la demande reste le vôtre, et c’est l’organisme qui décide.',
        ],
        lien: { vers: '/creation-boutique-en-ligne', texte: 'La création de boutique en ligne' },
      },
    ],
    offres: ['site', 'reservation'],
    ailleurs: [
      { href: '/guides/aides-creation-entreprise/', nom: 'Les aides à la création d’entreprise', dit: 'Exonérations, allocations, prêts d’honneur, microcrédit : le guide pour ceux qui créent ou reprennent.' },
    ],
    faq: [
      { q: 'Existe-t-il encore un chèque numérique national ?', r: 'Ne vous fiez à aucune page qui l’affirme sans date, la nôtre comprise. Vérifiez sur France Num, qui recense les aides ouvertes aujourd’hui.' },
      { q: 'Mon projet est déjà commencé. Est-ce trop tard ?', r: 'Souvent oui pour la partie déjà engagée, puisque la plupart des aides demandent un dépôt avant la signature. Renseignez-vous quand même : une seconde phase du projet peut rester finançable.' },
      { q: 'Qui peut m’aider à monter le dossier ?', r: 'Votre chambre de commerce ou votre chambre de métiers : c’est leur rôle, et c’est en général gratuit.' },
      { q: 'Une PME de plus de vingt salariés a-t-elle droit à quelque chose ?', r: 'Les aides régionales décrites ici visent les plus petites entreprises. Pour une PME, regardez le catalogue de France Num et les prêts de Bpifrance, et interrogez votre CCI.' },
    ],
    liens: ['/creation-boutique-en-ligne', '/creation-site-internet-valenciennes', '/creation-site-internet-lille', '/site-vitrine'],
    resume: 'Guide de Reskope sur les aides à la numérisation des petites entreprises dans les Hauts-de-France, sans montant recopié : l’aide à l’investissement de la Région pour les artisans, commerçants et entreprises de l’économie sociale de moins de vingt salariés ; le Booster numérique de la CCI (une demi-journée de diagnostic puis deux jours de plan d’actions) ; France Num, portail de l’État qui recense les aides ; le prêt de Bpifrance pour la transformation numérique. Règle à retenir : déposer la demande avant de signer un devis.',
  },

  {
    profil: 'tpe',
    route: '/ia-petite-entreprise',
    type: 'guide',
    publie: '2026-10-10',
    maj: '10 octobre 2026',
    priorite: '0.7',
    fil: 'L’IA pour une TPE',
    titre: 'L’IA pour une petite entreprise : les usages',
    description: 'Artisan, commerçant, TPE : les usages de l’IA qui font gagner du temps, ce qu’il ne faut pas lui confier, et comment commencer en une heure, sans risque.',
    h1: 'L’IA pour une petite entreprise : ce qu’elle peut faire pour vous, concrètement',
    surtitre: 'Guide · artisans, commerçants et TPE',
    accroche: 'Vous n’avez ni service informatique ni temps à perdre. Bonne nouvelle : les assistants d’IA d’aujourd’hui s’utilisent en écrivant une phrase. Voici ce qu’ils font bien pour une petite entreprise, ce qu’ils font mal, et par où commencer.',
    sections: [
      {
        titre: 'L’IA, pour un artisan ou un commerçant, c’est quoi',
        texte: [
          'Un assistant d’IA est un programme auquel on écrit comme à une personne : « rédige une réponse polie à ce client mécontent », « résume ce document en cinq lignes ». Il répond en quelques secondes. Il ne remplace ni votre métier ni votre jugement : il vous fait gagner du temps sur ce qui s’écrit et se lit.',
          'Les plus connus se valent pour ces usages. Le choix compte moins que la façon de s’en servir : lui donner le contexte, et relire ce qu’il rend.',
        ],
      },
      {
        titre: 'Sept usages qui font gagner du temps',
        liste: [
          'Répondre à un avis ou à un e-mail délicat, sans y passer la soirée',
          'Décrire un service ou un produit, à partir de vos notes en vrac',
          'Préparer la trame d’un devis ou d’un courrier que vous envoyez souvent',
          'Résumer un document long : un contrat fournisseur, une notice, un courrier administratif',
          'Trouver des idées de publications pour vos réseaux, à partir de vos chantiers du mois',
          'Traduire une fiche ou un menu, à faire relire ensuite',
          'Préparer un rendez-vous : les questions à poser à un fournisseur, à la banque, à un candidat',
        ],
      },
      {
        titre: 'Faire son site ou son logo avec une IA : bonne idée ?',
        texte: [
          'Des outils promettent un site ou un logo en quelques minutes. Ils tiennent parole : vous obtenez vite quelque chose de propre. La limite est ailleurs. Le texte est celui que l’outil écrit pour tout le monde, l’apparence aussi, et rien ne dit ce qui vous distingue de votre concurrent de la rue d’à côté.',
          'Pour démarrer, c’est parfois suffisant. Vérifiez seulement deux choses : que l’adresse du site est bien la vôtre, et les conditions d’usage du logo, car la protection d’un visuel entièrement généré reste incertaine.',
        ],
        lien: { vers: '/site-vitrine', texte: 'Ce qu’un site vitrine doit contenir' },
      },
      {
        titre: 'Ce qu’il ne faut pas lui confier',
        liste: [
          'Les données de vos clients : noms, téléphones, adresses, dossiers',
          'Un chiffre que vous ne vérifiez pas : une IA peut se tromper avec assurance',
          'Un avis juridique, fiscal ou médical : elle n’est ni avocat, ni comptable',
          'Le dernier mot : c’est vous qui signez ce qui part',
        ],
      },
      {
        titre: 'Commencer en une heure',
        liste: [
          'Choisissez une tâche qui revient chaque semaine et qui vous ennuie',
          'Écrivez la consigne comme à un apprenti : qui vous êtes, pour qui c’est, le ton voulu',
          'Donnez-lui un exemple de ce que vous faites d’habitude',
          'Relisez, corrigez, et gardez la consigne qui a marché',
          'Recommencez la semaine suivante avec une autre tâche',
        ],
      },
      {
        titre: 'Et nous, dans tout ça',
        texte: [
          'On ne crée pas d’IA. On vous montre comment vous servir de celles qui existent, on les relie à vos outils quand ça vaut le coup, et on construit le reste : votre site, votre prise de rendez-vous, votre identité.',
          'Et quand une tâche se répète toujours de la même façon, on vous dit qu’une simple automatisation fera mieux, et moins cher, qu’une IA.',
        ],
        lien: { vers: '/offres', texte: 'Ce qu’on construit pour les petites entreprises' },
      },
    ],
    offres: ['site', 'reservation', 'lancement'],
    faq: [
      { q: 'Faut-il payer pour utiliser une IA ?', r: 'On peut commencer gratuitement. Les versions payantes vont plus loin et, pour certaines, donnent des garanties sur ce que deviennent vos données. Lisez ce point avant de choisir.' },
      { q: 'Une IA peut-elle répondre à mes clients à ma place ?', r: 'Elle peut préparer la réponse, et vous la relisez avant de l’envoyer. Laisser une IA répondre seule à vos clients demande un vrai travail de réglage : ce n’est pas par là qu’on commence.' },
      { q: 'Est-ce risqué pour mes données ?', r: 'Oui si vous y collez un fichier clients. Non si vous vous en tenez à vos propres textes et à des informations qui ne concernent personne en particulier. Dans le doute, retirez les noms.' },
      { q: 'Vous proposez des formations à l’IA ?', r: 'On vous montre, sur vos propres tâches, comment vous en servir, dans le cadre de ce qu’on construit avec vous. On ne délivre pas de certificat de formation.' },
    ],
    liens: ['/site-vitrine', '/fiche-google-entreprise', '/prise-de-rendez-vous-en-ligne', '/aides-numerique-hauts-de-france'],
    resume: 'Guide de Reskope sur l’intelligence artificielle pour les artisans, commerçants et petites entreprises. Sept usages qui font gagner du temps : répondre à un avis ou à un e-mail, décrire un service, préparer la trame d’un devis, résumer un document, trouver des idées de publications, traduire, préparer un rendez-vous. Ce qu’il ne faut pas lui confier : les données des clients, un chiffre non vérifié, un avis juridique ou fiscal. Un site ou un logo générés par IA dépannent, mais ne disent pas ce qui distingue l’entreprise. Reskope ne crée pas d’IA : il aide à bien se servir de celles qui existent.',
  },

  /* ── PME ─────────────────────────────────────────────────── */
  {
    profil: 'pme',
    route: '/automatisation-pme',
    type: 'local',
    priorite: '0.8',
    fil: 'Automatisation',
    titre: 'Automatisation des tâches pour PME',
    description: 'Automatisation sur mesure pour PME, à Lille et à Valenciennes : ressaisies, relances, rapports. On mesure le temps perdu, puis on automatise ce qui le mérite.',
    h1: 'Automatisation pour PME : supprimer les tâches qui se répètent',
    surtitre: 'Reskope Elevate · PME de Lille, de Valenciennes et du Nord',
    accroche: 'Dans votre entreprise, quelqu’un recopie chaque semaine les mêmes lignes d’un logiciel dans un autre. On repère ces tâches, on mesure ce qu’elles coûtent, et on automatise celles qui le méritent, sans changer vos outils.',
    points: RASSURE_PME,
    sections: [
      {
        titre: 'Automatiser, c’est quoi au juste',
        texte: [
          'Automatiser une tâche, c’est la confier à un programme qui la fait à la place d’une personne, toujours de la même façon, dès qu’un événement se produit : un devis signé, une facture reçue, un formulaire rempli. La personne n’a plus à y penser, et elle n’a plus à la refaire.',
          'Dans une PME, les bons candidats se ressemblent : tout ce qui est saisi deux fois, tout ce qui est copié d’un outil vers un autre, tout ce qui part à date fixe.',
        ],
      },
      {
        titre: 'Ce que coûte le travail refait',
        texte: [
          'Selon l’étude Anatomy of Work d’Asana, une personne perd en moyenne 209 heures par an à refaire un travail déjà fait : ressaisies entre outils, documents recréés faute de les retrouver, informations redemandées. C’est environ six semaines.',
          'Chez vous, le chiffre sera différent. C’est pour ça qu’on commence par le mesurer, poste par poste.',
        ],
        source: { texte: 'Asana, Anatomy of Work Global Index 2023', url: 'https://asana.com/resources/anatomy-of-work' },
      },
      {
        titre: 'Ce qu’on automatise le plus souvent',
        liste: [
          'Le devis accepté qui devient facture, sans ressaisie',
          'La facture qui part chez le comptable, au bon format',
          'Les relances de paiement et de devis sans réponse',
          'Le rapport du lundi matin, construit tout seul à partir des outils',
          'La demande reçue par le site qui arrive dans le bon dossier, chez la bonne personne',
          'Les fichiers Excel qui se remplissent à partir de vos logiciels',
        ],
      },
      {
        titre: 'Vos fichiers Excel, on ne les jette pas',
        texte: [
          'Beaucoup de PME tournent sur des tableurs que quelqu’un a construits il y a des années, et qui marchent. On ne vous demande pas de les abandonner. On les alimente automatiquement, on supprime les copier-coller, et on ne les remplace que lorsqu’ils sont devenus fragiles.',
        ],
      },
      {
        titre: 'Notre règle : ranger avant d’automatiser',
        texte: [
          'Automatiser un processus mal fichu, c’est faire plus vite une chose inutile. On regarde donc d’abord comment le travail circule, on retire les étapes qui ne servent à rien, et on automatise ce qui reste.',
          'On choisit ensuite l’outil le plus simple qui fait le travail : une liaison entre deux logiciels que vous avez déjà, un outil d’automatisation, ou un petit développement. Vous gardez la main : chaque automatisation est documentée, et vos équipes savent comment elle marche.',
        ],
        lien: { vers: '/audit-informatique-pme', texte: 'L’audit de vos outils, pour savoir par où commencer' },
      },
      {
        titre: 'À Lille, à Valenciennes et dans le Nord',
        texte: [
          'On vient sur place pour voir les tâches telles qu’elles se font, à côté de ceux qui les font. La construction avance ensuite à distance, par petites étapes : une automatisation à la fois, testée avec vous avant de passer à la suivante.',
        ],
      },
    ],
    offres: ['developpement', 'audit-plus', 'suivi'],
    ailleurs: [
      { href: '/cabinet-conseil-numerique-lille/', nom: 'Cabinet de conseil numérique à Lille', dit: 'Le conseil avant le devis : on regarde vos outils sur place, puis on construit.' },
      { href: '/cabinet-conseil-numerique-valenciennes/', nom: 'Cabinet de conseil numérique à Valenciennes', dit: 'Pour les TPE et PME du Valenciennois : audit, liaisons entre outils, automatisation.' },
    ],
    faq: [
      { q: 'Faut-il un audit avant d’automatiser ?', r: 'Pas toujours. Si le besoin est clair, une tâche précise qui se répète, on la traite directement. L’audit sert quand vous sentez que du temps se perd sans savoir où.' },
      { q: 'Quels outils utilisez-vous ?', r: 'Celui qui convient au problème : les liaisons déjà prévues entre vos logiciels quand elles existent, un outil d’automatisation, ou du développement sur mesure. On vous explique le choix avant de construire.' },
      { q: 'Et si l’automatisation tombe en panne ?', r: 'Chaque automatisation est documentée, pour qu’on sache la remettre en route. Notre offre de suivi sert à ça : des contrôles réguliers et une personne joignable, résiliable à tout moment.' },
      { q: 'L’automatisation supprime-t-elle des postes ?', r: 'Ce n’est pas le but. On supprime des tâches de recopie, pour que ceux qui les faisaient aient le temps du travail pour lequel on les a embauchés.' },
    ],
    liens: ['/audit-informatique-pme', '/logiciel-sur-mesure-pme', '/intelligence-artificielle-pme', '/offres'],
    resume: 'Automatisation sur mesure pour les PME de Lille, de Valenciennes et du Nord, par Reskope. On repère les tâches qui se répètent (ressaisies, copies d’un outil à l’autre, relances, rapports), on mesure ce qu’elles coûtent, on range le processus, puis on automatise avec l’outil le plus simple : liaison entre logiciels existants, outil d’automatisation ou développement. Selon Asana, une personne perd en moyenne 209 heures par an à refaire un travail déjà fait. Estimation en jours avant de commencer.',
  },

  {
    profil: 'pme',
    route: '/logiciel-sur-mesure-pme',
    type: 'local',
    priorite: '0.8',
    fil: 'Logiciel sur mesure',
    titre: 'Logiciel et application métier sur mesure, PME',
    description: 'Logiciel sur mesure et application métier pour PME, à Lille et à Valenciennes : quand le standard ne suffit plus, on construit l’outil qu’il vous faut.',
    h1: 'Logiciel sur mesure et application métier pour PME',
    surtitre: 'Reskope Elevate · PME de Lille, de Valenciennes et du Nord',
    accroche: 'Vos équipes contournent le logiciel avec des tableurs, ou aucun outil du marché ne fait ce que votre métier demande. On construit l’application qui colle à votre façon de travailler, par étapes, et elle vous appartient.',
    points: RASSURE_PME,
    sections: [
      {
        titre: 'Logiciel sur mesure, application métier : de quoi parle-t-on',
        texte: [
          'Une application métier est un logiciel construit pour une tâche précise de votre entreprise : suivre des chantiers, planifier des tournées, gérer des contrats, calculer des devis complexes. Un logiciel sur mesure est développé pour vous, à partir de votre façon de travailler, au lieu d’être acheté tout fait.',
          'L’un n’exclut pas l’autre : la plupart des PME gardent leurs logiciels standards pour la comptabilité ou la paie, et font construire seulement ce qui fait leur différence.',
        ],
      },
      {
        titre: 'Standard ou sur mesure : comment trancher',
        liste: [
          'Un logiciel standard suffit si votre façon de faire ressemble à celle de vos concurrents',
          'Le sur-mesure se justifie quand vos équipes contournent l’outil tous les jours',
          'Il se justifie quand trois logiciels font chacun un morceau du travail, sans se parler',
          'Il se justifie quand votre savoir-faire tient dans un fichier que seule une personne comprend',
          'Il ne se justifie pas pour refaire ce qu’un outil du marché fait déjà bien',
        ],
      },
      {
        titre: 'Les signes qu’on y est',
        texte: [
          'Selon une étude publiée par la Harvard Business Review, un salarié bascule d’une application à l’autre près de 1 200 fois par jour, et y laisse environ quatre heures par semaine. Quand vos équipes passent leur journée à faire le lien entre des outils qui s’ignorent, le logiciel ne les aide plus : ce sont elles qui le font tenir.',
        ],
        source: { texte: 'Harvard Business Review, 2022', url: 'https://hbr.org/2022/08/how-much-time-and-energy-do-we-waste-toggling-between-applications' },
      },
      {
        titre: 'Comment on construit',
        liste: [
          'On regarde le travail tel qu’il se fait, sur place, avec ceux qui le font',
          'On dessine une maquette que vos équipes peuvent critiquer avant qu’une ligne soit écrite',
          'On livre d’abord une première version utile, pas un cahier des charges de cent pages',
          'On ajoute le reste par étapes, chacune estimée en jours et validée par vous',
          'On forme vos équipes, et on reste joignables après',
        ],
      },
      {
        titre: 'Ce qui vous appartient',
        texte: [
          'Le code, les données et les accès sont à vous. L’application est documentée, pour qu’un autre développeur puisse la reprendre. Si vous arrêtez avec nous, vous repartez avec tout.',
        ],
        lien: { vers: '/offres', texte: 'Le détail de l’offre Outils sur mesure' },
      },
      {
        titre: 'À Lille, à Valenciennes et dans le Nord',
        texte: [
          'Négoce, bâtiment, industrie, services : les PME du Nord ont des métiers précis, que les logiciels généralistes couvrent mal. On vient voir comment vous travaillez avant de proposer quoi que ce soit, et il arrive qu’on conclue qu’un outil standard, mieux réglé, suffit.',
        ],
      },
    ],
    offres: ['developpement', 'audit', 'suivi'],
    ailleurs: [
      { href: '/cabinet-conseil-numerique-lille/', nom: 'Cabinet de conseil numérique à Lille', dit: 'Le conseil avant le devis : on regarde vos outils sur place, puis on construit.' },
      { href: '/cabinet-conseil-numerique-valenciennes/', nom: 'Cabinet de conseil numérique à Valenciennes', dit: 'Pour les TPE et PME du Valenciennois : audit, liaisons entre outils, automatisation.' },
    ],
    faq: [
      { q: 'Combien coûte un logiciel sur mesure ?', r: 'Le prix dépend de ce que l’application doit faire, des outils auxquels elle se relie et du délai. On chiffre en jours, par écrit, après avoir regardé. Avancer par étapes permet de s’arrêter à tout moment avec quelque chose d’utilisable.' },
      { q: 'Développement classique ou outil sans code ?', r: 'Les deux existent, et on choisit selon le besoin : un outil sans code va plus vite pour une application simple, le développement tient mieux quand les règles sont complexes. On vous explique le choix avant de construire.' },
      { q: 'Qui s’occupe de l’application après la livraison ?', r: 'Vous, si vous avez quelqu’un en interne, puisque le code est à vous et documenté. Sinon, notre offre de suivi : contrôles réguliers, petites modifications, engagement mensuel résiliable à tout moment.' },
      { q: 'Faut-il passer par un audit avant ?', r: 'Non, si le besoin est clair. L’audit sert quand vous n’êtes pas sûr que le sur-mesure soit la bonne réponse.' },
    ],
    liens: ['/automatisation-pme', '/audit-informatique-pme', '/intelligence-artificielle-pme', '/offres'],
    resume: 'Logiciel sur mesure et application métier pour les PME de Lille, de Valenciennes et du Nord, par Reskope. Une application métier est un logiciel construit pour une tâche précise de l’entreprise. Le sur-mesure se justifie quand les équipes contournent l’outil, quand plusieurs logiciels ne se parlent pas ou quand un savoir-faire tient dans un seul fichier ; pas pour refaire ce qu’un outil du marché fait bien. Construction par étapes : observation sur place, maquette, première version utile, ajouts estimés en jours. Le code, les données et les accès appartiennent au client.',
  },

  {
    profil: 'pme',
    route: '/intelligence-artificielle-pme',
    type: 'guide',
    publie: '2026-10-10',
    maj: '10 octobre 2026',
    priorite: '0.8',
    fil: 'IA en PME',
    titre: 'Intelligence artificielle en PME, par où commencer',
    description: 'L’IA dans une PME, sans effet de mode : les usages qui marchent, ce qu’il faut ranger avant, les règles de confidentialité, et par quoi commencer.',
    h1: 'L’intelligence artificielle dans une PME : par où commencer',
    surtitre: 'Guide · conseil en IA à Lille et à Valenciennes',
    accroche: 'L’intelligence artificielle ne remet pas de l’ordre dans une entreprise désordonnée : elle travaille avec ce qu’on lui donne. Voici les usages qui tiennent leurs promesses dans une PME, ce qu’il faut régler avant, et un premier pas raisonnable.',
    sections: [
      {
        titre: 'De quoi parle-t-on',
        texte: [
          'L’intelligence artificielle dont tout le monde parle depuis 2023 est dite générative : ce sont des programmes capables de lire, de résumer, de rédiger et de classer du texte, des images ou des tableaux, à partir d’une consigne écrite en langage courant. Dans une PME, elle sert surtout à gagner du temps sur des tâches de lecture et d’écriture.',
          'Elle ne décide pas à votre place, elle ne connaît pas vos clients, et elle peut se tromper avec assurance. C’est un assistant rapide, qu’il faut relire.',
        ],
      },
      {
        titre: 'Les usages qui tiennent dans une PME',
        liste: [
          'Rédiger un premier jet : réponse à un client, compte rendu, offre',
          'Résumer un long document, un contrat, un fil de messages',
          'Extraire les informations d’une facture ou d’un bon de commande pour éviter la ressaisie',
          'Trier et orienter les demandes reçues par e-mail ou par le site',
          'Retrouver une information dans vos propres documents, en posant une question',
          'Aider à analyser un tableau, quand les données sont propres',
        ],
      },
      {
        titre: 'Ce qu’il faut régler avant',
        texte: [
          'Une IA qui cherche dans vos documents ne trouvera rien de fiable si trois versions du même fichier traînent dans trois dossiers. Un outil qui extrait vos factures ne servira à rien si personne ne sait où va la donnée ensuite. L’IA arrive en bout de chaîne : elle amplifie l’ordre, ou le désordre.',
          'C’est pourquoi on commence presque toujours par la carte de vos outils et de vos fichiers, avant de parler d’intelligence artificielle.',
        ],
        lien: { vers: '/audit-informatique-pme', texte: 'L’audit de vos outils numériques' },
      },
      {
        titre: 'La confidentialité, avant le premier essai',
        texte: [
          'Ce que vos équipes collent dans un outil grand public peut sortir de l’entreprise : un fichier clients, un contrat, des salaires. Avant de laisser chacun essayer dans son coin, fixez trois règles : quels outils sont autorisés, quelles données n’y entrent jamais, et qui relit ce qui sort.',
          'Dès que des données personnelles sont en jeu, le RGPD s’applique comme pour n’importe quel autre traitement. La CNIL publie des recommandations claires sur le sujet.',
        ],
        source: { texte: 'CNIL : intelligence artificielle', url: 'https://www.cnil.fr/fr/intelligence-artificielle' },
      },
      {
        titre: 'Un premier pas raisonnable',
        liste: [
          'Choisir une seule tâche, répétitive, où une erreur ne coûte pas cher',
          'Mesurer le temps qu’elle prend aujourd’hui',
          'L’essayer pendant un mois, avec deux ou trois volontaires',
          'Mesurer de nouveau, et décider : on garde, on ajuste, ou on arrête',
          'Écrire la règle d’usage, puis seulement passer à la tâche suivante',
        ],
      },
      {
        titre: 'À Lille et à Valenciennes : qui peut vous aider',
        texte: [
          'La CCI Hauts-de-France propose, dans son Booster numérique, une initiation aux usages concrets de l’IA pour les petites entreprises. C’est un bon point de départ pour se faire une idée.',
          'De notre côté, on ne crée pas d’IA : on vous aide à bien vous servir de celles qui existent. On repère les tâches qui s’y prêtent chez vous, on branche l’outil sur vos logiciels, on écrit les règles d’usage et on forme vos équipes. On ne vend pas de licence, et on vous dit quand une simple automatisation fait mieux qu’une IA.',
        ],
        source: { texte: 'CCI Hauts-de-France : Booster numérique', url: 'https://hautsdefrance.cci.fr/solutions/booster-numerique/' },
      },
    ],
    offres: ['audit', 'developpement', 'suivi'],
    ailleurs: [
      { href: '/cabinet-conseil-numerique-lille/', nom: 'Cabinet de conseil numérique à Lille', dit: 'Le conseil avant le devis : on regarde vos outils sur place, puis on construit.' },
      { href: '/cabinet-conseil-numerique-valenciennes/', nom: 'Cabinet de conseil numérique à Valenciennes', dit: 'Pour les TPE et PME du Valenciennois : audit, liaisons entre outils, automatisation.' },
    ],
    faq: [
      { q: 'L’IA est-elle utile dans une entreprise de vingt personnes ?', r: 'Oui, sur des tâches précises : rédiger, résumer, extraire, trier. Elle est rarement utile comme « projet IA » sans tâche définie. Commencez par une seule, et mesurez.' },
      { q: 'Faut-il un outil payant ?', r: 'Pour un usage professionnel, souvent oui : les versions destinées aux entreprises donnent des garanties sur ce que deviennent vos données. Lisez ces conditions avant le prix.' },
      { q: 'Quelle différence entre automatisation et intelligence artificielle ?', r: 'Une automatisation applique toujours la même règle : quand un devis est signé, créer la facture. Une IA traite ce qui n’est pas régulier : lire un e-mail écrit librement et comprendre ce qu’on y demande. Beaucoup de besoins relèvent de la première, plus simple et plus sûre.' },
      { q: 'Faites-vous du conseil en IA à Lille et à Valenciennes ?', r: 'Oui, dans le cadre de nos missions pour les PME : on repère les usages qui valent le coup chez vous, on les met en place et on forme vos équipes. On ne développe pas de modèle d’IA : on vous aide à adopter, dans de bonnes conditions, celles qui existent déjà.' },
    ],
    liens: ['/automatisation-pme', '/audit-informatique-pme', '/transformation-numerique-pme', '/logiciel-sur-mesure-pme'],
    resume: 'Guide de Reskope sur l’intelligence artificielle dans une PME, à Lille, à Valenciennes et dans le Nord. Les usages qui tiennent : rédiger un premier jet, résumer, extraire les données d’une facture, trier les demandes, retrouver une information dans ses propres documents. Avant : ranger ses outils et ses fichiers, et fixer trois règles de confidentialité (outils autorisés, données interdites, relecture), le RGPD s’appliquant aux données personnelles. Premier pas : une seule tâche, mesurée avant et après un mois d’essai. Une automatisation simple fait souvent mieux qu’une IA.',
  },
];
