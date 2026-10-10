/* ════════════════════════════════════════════════════════════
   LES PAGES PAR INTENTION, SUITE (10/10/2026)

   Constat du 10/10 : sur « cabinet de conseil numérique valenciennes »,
   Reskope n'apparaissait nulle part. Trois raisons relevées ce jour-là :
   aucune page ne répondait à cette recherche, Google n'avait indexé que 16
   des 40 pages, et la première page de résultats est tenue par la carte
   (fiches Google) et par des annuaires.

   Ce fichier ajoute les pages qui manquaient, chacune sur une formulation
   relevée dans les suggestions de Google le 10/10 (« cabinet conseil
   valenciennes », « cabinet de conseil lille », « transformation digitale
   lille », « étude de marché lille », « reprendre une entreprise comment
   faire », « prévisionnel financier sur 3 ans »).

   Mêmes règles que intentions.js : faits vérifiés et sourcés, prix jamais
   chiffrés, aucun montant d'aide recopié, pas de tiret cadratin. Une page
   de ville dit quelque chose que l'autre ne dit pas : si on peut échanger
   le nom de la ville sans rien changer d'autre, la page est à refaire.

   `ailleurs` : des cartes vers l'espace des entreprises (/tpe, /pme), qui
   vit dans l'autre application : ce sont de vrais liens, pas des routes.
   ════════════════════════════════════════════════════════════ */

const RASSURE_NUMERIQUE = [
  'Un premier échange de 30 minutes offert, réponse sous 24 h',
  'Une estimation écrite, en jours, avant de commencer',
];

const RASSURE_CREATION = [
  'Un premier échange de 30 minutes offert, réponse sous 24 h',
  'Un prix fixe, écrit avant de commencer',
];

export const SUITE = [
  {
    route: '/cabinet-conseil-numerique-valenciennes',
    type: 'local',
    espace: 'maison',
    ville: 'Valenciennes',
    priorite: '0.9',
    fil: 'Conseil numérique à Valenciennes',
    titre: 'Cabinet de conseil numérique à Valenciennes',
    description: 'Cabinet de conseil numérique à Valenciennes : site internet, outils qui se parlent, automatisation et audit, pour les TPE et PME du Valenciennois.',
    h1: 'Cabinet de conseil numérique à Valenciennes',
    surtitre: 'Reskope · TPE et PME du Valenciennois',
    accroche: 'Vous dirigez une entreprise dans le Valenciennois, et le numérique vous prend plus de temps qu’il ne vous en rend. On vient voir comment vous travaillez, on vous dit quoi garder, quoi relier et quoi construire, puis on le fait avec vous.',
    points: [...RASSURE_NUMERIQUE, 'Sur place dans le Valenciennois : on vient voir avant de conseiller'],
    sections: [
      {
        titre: 'Ce que fait un cabinet de conseil numérique, concrètement',
        texte: [
          'Un cabinet de conseil numérique aide une entreprise à choisir et à mettre en place ses outils : le site internet, la prise de rendez-vous, la facturation, les fichiers partagés, les logiciels de gestion, les automatisations. Il ne vend pas un logiciel. Il regarde comment l’entreprise travaille, repère où le temps se perd, et propose l’ordre dans lequel régler les choses.',
          'Chez Reskope, on fait les deux moitiés du travail : le conseil (aller voir, mesurer, classer par priorité) et la construction (le site, les liaisons entre vos outils, l’application sur mesure). Vous n’avez pas à chercher un second prestataire pour appliquer les recommandations du premier.',
        ],
      },
      {
        titre: 'Pour une petite entreprise : être trouvé, être joignable, gagner du temps',
        texte: [
          'Artisan, commerçant, profession de service, entreprise de un à dix salariés : votre sujet est rarement « la transformation numérique ». C’est un site qui dit en une phrase ce que vous faites, des rendez-vous qui se prennent sans vous, et des devis qui deviennent des factures sans tout retaper.',
          'Un site vitrine sobre demande cinq à huit jours de travail. Le code, le nom de domaine et les accès sont à votre nom : vous repartez avec les clés.',
        ],
      },
      {
        titre: 'Pour une PME : des outils qui se parlent',
        texte: [
          'Dans une entreprise de dix à deux cent cinquante personnes, les outils se sont empilés au fil des années. Chacun a ses habitudes, et plus personne n’a la vue d’ensemble. Selon McKinsey, près de la moitié de la semaine de travail part dans les e-mails et la recherche d’information.',
          'On passe deux à cinq jours dans vos murs, avec vos équipes. Vous recevez un bilan classé par impact, que vous gardez quelle que soit la suite. Ensuite, si vous le voulez, on relie vos outils, on automatise ce qui se répète et on construit ce qui manque, par petites étapes que vous validez une par une.',
        ],
        source: { texte: 'McKinsey Global Institute, The Social Economy', url: 'https://www.mckinsey.com/industries/technology-media-and-telecommunications/our-insights/the-social-economy' },
      },
      {
        titre: 'Dans le Valenciennois, on vient sur place',
        texte: [
          'Le Valenciennois est une terre d’industrie : l’automobile, le ferroviaire, leurs sous-traitants, et autour d’eux de nombreuses PME de mécanique, de logistique, de bâtiment et de services. C’est aussi un territoire qui a investi dans le numérique : à Valenciennes, la Serre Numérique, développée par la CCI Grand Hainaut sur le parc des Rives Créatives de l’Escaut, réunit sur 17 000 m² des écoles, de jeunes entreprises et des bureaux partagés.',
          'On se déplace à Valenciennes, Anzin, Saint-Saulve, Marly, Trith-Saint-Léger, Onnaing, Petite-Forêt, Denain et Saint-Amand-les-Eaux. Un audit se fait dans vos murs : on s’assoit à côté de ceux qui utilisent les outils, parce que c’est là que se voit ce qui coince.',
        ],
        source: { texte: 'La Serre Numérique, Valenciennes', url: 'https://serre-numerique.fr/' },
      },
      {
        titre: 'Comment se passe une mission',
        liste: [
          'Trente minutes au téléphone ou en visio, pour comprendre votre situation',
          'Une visite chez vous, pour voir les outils et ceux qui s’en servent',
          'Une estimation écrite, en jours : vous savez ce que vous payez, et pourquoi',
          'Des petites étapes, validées une par une ; vous pouvez arrêter à la fin de chacune',
          'À la fin, tout vous reste : le bilan, le code, les accès',
        ],
      },
      {
        titre: 'Ce qu’on ne fait pas',
        texte: [
          'On n’est ni un prestataire de maintenance informatique, ni un revendeur de logiciels, ni une agence de publicité. On n’installe pas votre réseau, on ne répare pas vos postes et on ne gère pas vos campagnes. Si c’est ce qu’il vous faut, on vous le dit au premier échange, et on vous oriente.',
        ],
      },
    ],
    ailleursTitre: 'Selon la taille de votre entreprise',
    ailleurs: [
      { href: '/tpe/', nom: 'Reskope Define : de 1 à 10 personnes', dit: 'Site internet, boutique en ligne, prise de rendez-vous, identité de marque. En quelques semaines, et vous repartez avec les clés.' },
      { href: '/pme/', nom: 'Reskope Elevate : de 10 à 250 personnes', dit: 'Audit de vos outils, mise en ordre, automatisations et outils sur mesure. Un bilan que vous gardez.' },
      { href: '/tpe/creation-site-internet-valenciennes/', nom: 'Création de site internet à Valenciennes', dit: 'Un site vitrine ou une boutique pour les artisans, commerçants et TPE du Valenciennois.' },
      { href: '/pme/audit-informatique-pme/', nom: 'L’audit des outils numériques de votre PME', dit: 'Deux à cinq jours sur place, un bilan classé par impact, aucune obligation de continuer.' },
    ],
    faq: [
      { q: 'Quelle différence entre un cabinet de conseil numérique et une agence web ?', r: 'Une agence web construit des sites et gère souvent la publicité en ligne. Un cabinet de conseil numérique part de votre façon de travailler : il peut conclure qu’il vous faut un site, mais aussi que le vrai problème est une double saisie entre deux logiciels. On fait les deux : le diagnostic, puis la construction.' },
      { q: 'Vous intervenez pour quelle taille d’entreprise ?', r: 'De l’artisan seul à la PME de deux cent cinquante personnes. En dessous de dix personnes, on construit surtout : un site, la prise de rendez-vous, une identité. Au-dessus, on commence presque toujours par un audit des outils.' },
      { q: 'Combien coûte une mission de conseil numérique ?', r: 'Chaque mission est estimée en jours, par écrit, avant de commencer. Deux entreprises de la même taille n’ont jamais le même chantier : on regarde d’abord, on chiffre ensuite. Pour une PME, l’audit est déduit si vous nous confiez la suite.' },
      { q: 'Faut-il changer tous nos outils ?', r: 'Rarement. Le but est de mieux utiliser ce que vous avez, de relier ce qui doit l’être, et de n’ajouter un outil que lorsqu’il fait gagner du temps.' },
      { q: 'Existe-t-il des aides pour financer un projet numérique ?', r: 'Oui. La Région Hauts-de-France et la CCI en proposent pour les petites entreprises, et Bpifrance pour les projets plus lourds. Les conditions changent : on les détaille, avec les liens officiels, dans notre guide des aides au numérique.' },
      { q: 'Vous êtes installés à Valenciennes ?', r: 'On travaille à Valenciennes et à Lille, et on se déplace dans tout le Valenciennois. Le premier échange se fait au téléphone ou en visio ; la suite, chez vous.' },
    ],
    liens: ['/cabinet-conseil-numerique-lille', '/zone-intervention', '/accompagnement-creation-entreprise-valenciennes', '/qui-on-est'],
    resume: 'Reskope est un cabinet de conseil numérique qui intervient à Valenciennes et dans le Valenciennois (Anzin, Saint-Saulve, Marly, Trith-Saint-Léger, Onnaing, Petite-Forêt, Denain, Saint-Amand-les-Eaux). Pour les entreprises de 1 à 10 personnes : site internet, boutique en ligne, prise de rendez-vous, identité de marque. Pour les PME de 10 à 250 personnes : audit des outils sur place en deux à cinq jours, bilan classé par impact, puis liaisons entre outils, automatisations et outils sur mesure. Estimation écrite en jours avant de commencer, premier échange de 30 minutes offert. Reskope ne fait ni maintenance informatique, ni revente de logiciels, ni publicité.',
  },

  {
    route: '/cabinet-conseil-numerique-lille',
    type: 'local',
    espace: 'maison',
    ville: 'Lille',
    priorite: '0.9',
    fil: 'Conseil numérique à Lille',
    titre: 'Cabinet de conseil numérique à Lille',
    description: 'Cabinet de conseil numérique à Lille pour TPE et PME : on regarde vos outils sur place, on vous dit quoi garder et quoi relier, puis on le construit.',
    h1: 'Cabinet de conseil numérique à Lille',
    surtitre: 'Reskope · TPE et PME de la métropole lilloise',
    accroche: 'À Lille, les prestataires du numérique ne manquent pas. Ce qui manque, c’est quelqu’un qui vienne voir comment vous travaillez avant de vous vendre quoi que ce soit. On commence par là, et on construit ensuite ce qui sert vraiment.',
    points: [...RASSURE_NUMERIQUE, 'Dans la métropole lilloise, sur place ou en visio'],
    sections: [
      {
        titre: 'À Lille, le difficile n’est pas de trouver un prestataire',
        texte: [
          'Agences web, sociétés de services informatiques, grands cabinets, indépendants : la métropole en compte de toutes les tailles. Le difficile, pour le dirigeant d’une entreprise de vingt ou de quatre-vingts personnes, c’est de savoir quoi leur demander. Un nouveau logiciel de gestion ? Une refonte du site ? Une automatisation ? Chacun vous répondra avec ce qu’il vend.',
          'On répond avec ce qu’on a vu chez vous. On passe d’abord du temps avec vos équipes, on dresse la carte de vos outils et de ce qu’ils coûtent en heures, et on classe les chantiers par ce qu’ils rapportent. Le conseil vient avant le devis.',
        ],
      },
      {
        titre: 'Le diagnostic, puis la construction',
        texte: [
          'Le conseil numérique, tel qu’on le pratique, tient en deux temps. D’abord comprendre : quels outils vous utilisez, qui s’en sert vraiment, ce qui est saisi deux fois, ce qu’on cherche sans le trouver. Ensuite agir : relier les outils existants, automatiser les tâches qui se répètent, construire le site ou l’application qui manque.',
          'Les deux temps sont séparés. Le bilan de l’audit vous appartient : vous pouvez le confier à vos équipes, à un autre prestataire, ou à nous.',
        ],
      },
      {
        titre: 'Vous n’êtes pas une startup, et c’est très bien',
        texte: [
          'La métropole lilloise a un écosystème numérique reconnu. EuraTechnologies, créé en 2009, se présente comme un incubateur et accélérateur de startups, avec 158 000 m² répartis sur cinq sites dans les Hauts-de-France. C’est une chance pour la région.',
          'Mais une entreprise de négoce, un cabinet, un atelier, un commerce ou une PME de services ne se pose pas les questions d’une startup. Elle n’a pas à lever des fonds ni à « passer à l’échelle » : elle veut arrêter de perdre du temps, mieux servir ses clients, et savoir où va son argent. C’est à ces entreprises-là qu’on parle.',
        ],
        source: { texte: 'EuraTechnologies', url: 'https://www.euratechnologies.com/' },
      },
      {
        titre: 'Ce qu’on construit, selon votre taille',
        liste: [
          'De 1 à 10 personnes : un site ou une boutique en ligne, la prise de rendez-vous, une identité de marque',
          'De 10 à 250 personnes : la cartographie de vos outils et de vos usages',
          'Les liaisons entre logiciels : le devis part en facture, la facture chez le comptable',
          'Les automatisations : relances, rapports, saisies qui se répètent',
          'L’application métier sur mesure, quand aucun outil du marché ne convient',
          'La formation de vos équipes, et un suivi sans engagement de durée',
        ],
      },
      {
        titre: 'Où on vient',
        texte: [
          'À Lille et dans la métropole : Roubaix, Tourcoing, Villeneuve-d’Ascq, Marcq-en-Barœul, Lambersart, La Madeleine, Lomme, Wasquehal, Lesquin, Seclin. L’audit se fait dans vos locaux. La construction avance ensuite à distance, avec un point régulier, pour ne pas vous prendre de temps.',
        ],
      },
    ],
    ailleursTitre: 'Selon la taille de votre entreprise',
    ailleurs: [
      { href: '/pme/', nom: 'Reskope Elevate : de 10 à 250 personnes', dit: 'Audit de vos outils, mise en ordre, automatisations et outils sur mesure. Un bilan que vous gardez.' },
      { href: '/tpe/', nom: 'Reskope Define : de 1 à 10 personnes', dit: 'Site internet, boutique en ligne, prise de rendez-vous, identité de marque.' },
      { href: '/pme/transformation-numerique-pme/', nom: 'Transformation numérique d’une PME : par où commencer', dit: 'Partir de l’existant, mesurer le temps perdu, relier avant de remplacer.' },
      { href: '/tpe/creation-site-internet-lille/', nom: 'Création de site internet à Lille', dit: 'Un site vitrine ou une boutique pour les TPE, artisans et commerçants de la métropole.' },
    ],
    faq: [
      { q: 'Quelle différence avec une société de services informatiques ou un grand cabinet lillois ?', r: 'La taille, et ce qui va avec. On est deux : ceux que vous rencontrez au premier rendez-vous sont ceux qui font le travail. On ne place pas de consultants chez vous au mois, on ne vend pas de licences, et on ne s’adresse pas aux grands groupes.' },
      { q: 'Travaillez-vous avec des startups ?', r: 'Ce n’est pas notre cœur de métier. On aide les créateurs à vérifier leur idée auprès de vrais clients et à construire leur business plan, startup ou non. Pour les outils, on travaille surtout avec des entreprises déjà installées.' },
      { q: 'Combien de temps dure un audit ?', r: 'Selon la taille de l’équipe, de quelques jours à deux semaines entre les entretiens, l’analyse et la remise du bilan. Le nombre de jours est écrit avant de commencer.' },
      { q: 'Pouvez-vous intervenir à distance ?', r: 'Pour la construction, oui. Pour l’audit, on préfère venir : ce qu’on voit en s’asseyant à côté de quelqu’un ne se voit pas en visio.' },
      { q: 'Faites-vous de la maintenance informatique ?', r: 'Non. On ne gère ni votre réseau, ni vos postes, ni votre sécurité informatique. On s’occupe des outils de travail et de la façon dont ils s’enchaînent.' },
    ],
    liens: ['/cabinet-conseil-numerique-valenciennes', '/zone-intervention', '/accompagnement-creation-entreprise-lille', '/qui-on-est'],
    resume: 'Reskope est un cabinet de conseil numérique qui intervient à Lille et dans la métropole (Roubaix, Tourcoing, Villeneuve-d’Ascq, Marcq-en-Barœul, Lambersart, La Madeleine, Lomme, Wasquehal, Lesquin, Seclin). Le conseil vient avant le devis : audit des outils et des usages sur place, bilan classé par impact que l’entreprise garde, puis liaisons entre logiciels, automatisations, application métier sur mesure, site internet, formation. Pour les TPE et PME déjà installées, pas pour les grands groupes. Reskope ne fait ni maintenance informatique ni revente de licences.',
  },

  {
    route: '/etude-de-marche-lille-valenciennes',
    type: 'local',
    parent: '/creation',
    espace: 'creation',
    priorite: '0.8',
    fil: 'Étude de marché',
    titre: 'Étude de marché à Lille et Valenciennes',
    description: 'Étude de marché à Lille et à Valenciennes, faite sur le terrain : dix à douze entretiens avec vos futurs clients, votre client idéal, un prix testé.',
    h1: 'Étude de marché à Lille et à Valenciennes, faite sur le terrain',
    surtitre: 'Reskope Create · créateurs et repreneurs du Nord',
    accroche: 'Une étude de marché n’est pas un dossier de chiffres à joindre au business plan. C’est la réponse à une question : des gens vous achèteront-ils, ici, à ce prix ? On va la chercher là où elle se trouve, chez vos futurs clients.',
    points: [...RASSURE_CREATION, 'Trois à quatre semaines, une heure et demie de votre temps par semaine'],
    sections: [
      {
        titre: 'Ce qu’est une étude de marché, et ce qu’elle doit vous dire',
        texte: [
          'Une étude de marché est le travail qui vérifie, avant de créer ou de reprendre une entreprise, qu’il existe assez de clients prêts à payer pour ce que vous proposez. Elle répond à quatre questions : qui achètera, combien ils sont près de vous, ce qu’ils achètent aujourd’hui à la place, et à quel prix ils vous choisiront.',
          'Les deux premières se règlent en partie avec des chiffres publics. Les deux dernières ne se trouvent dans aucune base de données : il faut aller le demander.',
        ],
      },
      {
        titre: 'Les chiffres gratuits, et leur limite',
        texte: [
          'L’Insee publie, commune par commune et parfois quartier par quartier, la population, les âges, les revenus et le nombre d’entreprises par activité. C’est gratuit, et c’est par là qu’on commence pour dessiner votre zone.',
          'Mais un chiffre de population ne dit pas si les habitants ont le problème que vous réglez, ni s’ils changeront leurs habitudes pour vous. C’est la limite de l’étude faite derrière un écran, et la raison pour laquelle les banques posent toujours la même question : « comment le savez-vous ? ».',
        ],
        source: { texte: 'Insee, statistiques locales', url: 'https://statistiques-locales.insee.fr/' },
      },
      {
        titre: 'Notre façon de faire : dix à douze entretiens',
        texte: [
          'On rencontre dix à douze personnes qui ressemblent à vos futurs clients, là où elles sont : dans leur commerce, sur leur lieu de travail, au téléphone. On ne leur demande pas si votre idée leur plaît. On leur demande ce qu’elles vivent, ce qu’elles ont déjà essayé et ce que ça leur a coûté.',
          'Au bout d’une dizaine de conversations, les mêmes phrases reviennent. Elles dessinent le portrait de votre client idéal, l’endroit où le trouver, ce qu’il faut lui dire, et le prix qu’il juge normal.',
        ],
        lien: { vers: '/guides/questions-futurs-clients', texte: 'Les 12 questions qu’on pose, à reprendre telles quelles' },
      },
      {
        titre: 'Lille et Valenciennes ne se lisent pas de la même façon',
        texte: [
          'Dans la métropole lilloise, presque chaque idée a déjà des concurrents à quelques rues. L’étude sert à trouver pour qui vous serez le premier choix : quel client, dans quel quartier, à quel moment de sa journée.',
          'Dans le Valenciennois, la question est plus souvent la distance. Vos clients viennent de plus loin, et il faut savoir jusqu’où ils acceptent de se déplacer, et pour quoi. On ne pose donc pas les mêmes questions aux deux endroits.',
        ],
      },
      {
        titre: 'Ce que vous recevez',
        liste: [
          'Le portrait de votre client idéal, écrit avec ses mots',
          'Votre zone : où sont ces clients, et combien ils sont',
          'Ce qu’ils achètent aujourd’hui à la place, et pourquoi',
          'Un prix testé auprès d’eux, pas deviné',
          'Les phrases à reprendre dans votre business plan et devant la banque',
        ],
      },
    ],
    missions: ['idee', 'clients', 'bp'],
    faq: [
      { q: 'Combien coûte une étude de marché ?', r: 'La mission a un prix fixe, écrit dans une proposition avant de commencer. Le premier échange de 30 minutes est offert : on vous dit si une étude terrain vous servirait, ou si vous en savez déjà assez pour avancer.' },
      { q: 'Je peux faire mon étude de marché moi-même ?', r: 'Oui, et on publie gratuitement notre guide et nos douze questions pour ça. La difficulté n’est pas la méthode, c’est de ne pas orienter les réponses quand on est le porteur du projet. C’est ce qu’un regard extérieur apporte.' },
      { q: 'Une étude de marché est-elle obligatoire pour un prêt ?', r: 'Aucun texte ne l’impose, mais une banque ou un réseau de prêt d’honneur voudra savoir d’où vient votre chiffre d’affaires. Des entretiens datés, avec les mots de vos clients, y répondent mieux qu’une statistique nationale.' },
      { q: 'Et pour une reprise d’entreprise ?', r: 'On interroge les clients de l’entreprise à reprendre, avec l’accord du cédant. La question décisive devient : resteront-ils après son départ ?' },
    ],
    liens: ['/guides/etude-de-marche', '/tester-une-idee', '/accompagnement-creation-entreprise-lille', '/accompagnement-creation-entreprise-valenciennes'],
    resume: 'Étude de marché à Lille et à Valenciennes pour les créateurs et repreneurs d’entreprise, menée sur le terrain par Reskope : chiffres publics de l’Insee pour dessiner la zone, puis dix à douze entretiens avec de futurs clients. Vous recevez le portrait de votre client idéal, votre zone, ce que vos clients achètent aujourd’hui à la place, un prix testé et les phrases à reprendre devant la banque. Trois à quatre semaines, une heure et demie de votre temps par semaine, prix fixe écrit avant de commencer.',
  },

  {
    route: '/guides/reprendre-une-entreprise',
    type: 'guide',
    publie: '2026-10-10',
    maj: '10 octobre 2026',
    parent: '/guides',
    espace: 'creation',
    priorite: '0.7',
    fil: 'Reprendre une entreprise',
    titre: 'Reprendre une entreprise : les étapes',
    description: 'Comment reprendre une entreprise : où la trouver, comment l’évaluer, quoi vérifier, comment la financer avec peu d’apport, et la question oubliée.',
    h1: 'Reprendre une entreprise : comment faire, étape par étape',
    surtitre: 'Guide · reprise d’entreprise',
    accroche: 'Reprendre une entreprise, c’est acheter des clients, une équipe et des habitudes. Voici les étapes dans l’ordre, les endroits où chercher, ce qu’il faut vérifier avant de signer, et la question que presque personne ne pose.',
    sections: [
      {
        titre: 'Reprendre plutôt que créer : ce que ça change',
        texte: [
          'Reprendre une entreprise, c’est racheter une activité qui existe déjà : ses clients, ses salariés, son matériel, son bail, sa réputation. Vous avez un chiffre d’affaires dès le premier jour, ce qu’une création ne donne pas. En échange, vous payez ce passé, et vous héritez de ce qui va avec.',
          'La reprise demande donc un travail que la création ne demande pas : comprendre ce que vous achetez vraiment.',
        ],
      },
      {
        titre: 'Les étapes, dans l’ordre',
        liste: [
          'Définir ce que vous cherchez : un secteur, une taille, une zone, un budget',
          'Trouver des entreprises à céder et prendre contact',
          'Signer un engagement de confidentialité, puis recevoir les comptes',
          'Évaluer l’entreprise et faire une première offre',
          'Vérifier en détail : comptes, contrats, salariés, bail, clients',
          'Monter le financement',
          'Signer le protocole, puis l’acte de cession',
          'Organiser le passage de relais avec le cédant',
        ],
      },
      {
        titre: 'Où trouver une entreprise à reprendre',
        texte: [
          'Deux bourses publiques recensent les entreprises à céder : la Bourse de la transmission de Bpifrance, et Transentreprise, le service des chambres de commerce et des chambres de métiers. On y cherche par secteur et par département.',
          'Beaucoup de cessions ne passent par aucune annonce. Les experts-comptables, les banques, les fournisseurs du secteur et les fédérations professionnelles savent souvent, avant tout le monde, quel dirigeant pense à partir. Dites autour de vous ce que vous cherchez.',
        ],
        source: { texte: 'Bpifrance, Bourse de la transmission', url: 'https://reprise-entreprise.bpifrance.fr/' },
      },
      {
        titre: 'Ce qu’il faut vérifier avant de signer',
        liste: [
          'Les comptes des trois dernières années, et la rémunération réelle du dirigeant',
          'Le poids des premiers clients dans le chiffre d’affaires',
          'Les contrats en cours : bail, crédits-bails, fournisseurs, assurances',
          'Les salariés : ancienneté, savoir-faire, qui pourrait partir',
          'L’état du matériel et des locaux, et ce qu’il faudra remplacer',
          'Les dettes, les litiges et les engagements hors bilan',
        ],
      },
      {
        titre: 'La question oubliée : les clients resteront-ils ?',
        texte: [
          'Dans une petite entreprise, les clients sont souvent attachés à une personne : le cédant. Les comptes disent ce qu’ils ont acheté hier. Ils ne disent pas s’ils reviendront demain, quand il ne sera plus là.',
          'La seule façon de le savoir est de leur demander, avec l’accord du cédant : pourquoi ils viennent, ce qui les ferait partir, ce qu’ils attendent du repreneur. Dix conversations suffisent pour savoir si vous achetez une clientèle ou une relation personnelle.',
        ],
        lien: { vers: '/comprendre-vos-clients', texte: 'La discovery client, pour une reprise' },
      },
      {
        titre: 'Financer une reprise avec peu d’apport',
        texte: [
          'Une banque attend presque toujours un apport personnel. Plusieurs leviers permettent de le compléter : le prêt d’honneur, accordé à la personne et sans garantie, que les banques comptent comme des fonds propres ; le crédit-vendeur, quand le cédant accepte d’être payé en partie plus tard ; les garanties publiques, qui couvrent une part du prêt.',
          'Les conditions et les montants changent : vérifiez-les à la source. Reprendre sans aucun apport reste rare, et les annonces qui le promettent méritent de la prudence.',
        ],
        lien: { vers: '/guides/aides-creation-entreprise', texte: 'Le guide des aides à la création et à la reprise' },
      },
      {
        titre: 'Comment on vous aide',
        texte: [
          'On interroge les clients de l’entreprise que vous visez, on en tire ce qui les retient, puis on construit avec vous le dossier de reprise : le prévisionnel et le financement. Avant la banque, on le relit comme elle le lira.',
        ],
        lien: { vers: '/reprise-entreprise-nord', texte: 'L’accompagnement à la reprise, à Valenciennes et à Lille' },
      },
    ],
    missions: ['clients', 'bp', 'dossier'],
    faq: [
      { q: 'Peut-on reprendre une entreprise sans apport ?', r: 'C’est rare. Une banque finance difficilement la totalité d’un rachat. En pratique, on complète un apport modeste par un prêt d’honneur, un crédit-vendeur ou une garantie publique. Méfiez-vous des promesses de reprise « sans un euro ».' },
      { q: 'Combien de temps prend une reprise ?', r: 'Comptez plusieurs mois entre le premier contact et la signature, souvent près d’un an avec la recherche. Les vérifications et le financement prennent le plus de temps.' },
      { q: 'Comment évalue-t-on une entreprise ?', r: 'Par plusieurs méthodes croisées : ce que l’entreprise gagne vraiment une fois le dirigeant payé normalement, ce qu’elle possède, et ce que se vendent des entreprises comparables. Votre expert-comptable est le bon interlocuteur ; on vous aide à vérifier que le chiffre d’affaires tiendra.' },
      { q: 'Reprendre une entreprise en difficulté, bonne idée ?', r: 'Le prix est bas, le risque est haut, et la procédure passe par le tribunal. C’est un métier à part : faites-vous accompagner par un avocat et un expert-comptable qui en ont l’habitude.' },
    ],
    liens: ['/reprise-entreprise-nord', '/guides/business-plan-banque', '/guides/previsionnel-financier', '/comprendre-vos-clients'],
    resume: 'Guide de Reskope pour reprendre une entreprise : les huit étapes dans l’ordre (définir sa cible, trouver, confidentialité, évaluer, vérifier, financer, signer, passer le relais), où trouver une entreprise à céder (Bourse de la transmission de Bpifrance, Transentreprise des CCI et CMA, experts-comptables et banques), ce qu’il faut vérifier avant de signer, comment financer avec peu d’apport (prêt d’honneur, crédit-vendeur, garanties publiques), et la question oubliée : les clients resteront-ils après le départ du cédant ?',
  },

  {
    route: '/guides/previsionnel-financier',
    type: 'guide',
    publie: '2026-10-10',
    maj: '10 octobre 2026',
    parent: '/guides',
    espace: 'creation',
    priorite: '0.7',
    fil: 'Prévisionnel financier',
    titre: 'Prévisionnel financier sur 3 ans : le contenu',
    description: 'Le prévisionnel financier sur 3 ans : les quatre tableaux, dans quel ordre les remplir, d’où sortir vos chiffres, et les erreurs que la banque repère.',
    h1: 'Prévisionnel financier sur 3 ans : ce qu’il contient, et comment le remplir',
    surtitre: 'Guide · business plan',
    accroche: 'Un prévisionnel n’est pas un exercice de comptabilité. C’est votre projet traduit en chiffres : combien vous vendrez, ce que ça vous coûtera, et s’il reste de quoi vous payer. Voici ses quatre tableaux, et l’ordre pour les remplir.',
    sections: [
      {
        titre: 'À quoi sert un prévisionnel financier',
        texte: [
          'Le prévisionnel financier est la partie chiffrée du business plan. Il estime, sur trois ans, ce que l’entreprise va vendre, dépenser, investir et emprunter. Il sert d’abord à vous : savoir si le projet vous fera vivre, et à partir de quand. Il sert ensuite à la banque, qui y cherche une seule chose : la preuve que vous pourrez rembourser.',
        ],
      },
      {
        titre: 'Les quatre tableaux',
        liste: [
          'Le compte de résultat prévisionnel : ce que vous gagnez et dépensez chaque année, et ce qu’il reste',
          'Le plan de financement : ce qu’il faut pour démarrer, et qui le paie (vous, la banque, les aides)',
          'Le plan de trésorerie : l’argent qui entre et qui sort, mois par mois, la première année',
          'Le seuil de rentabilité : le chiffre d’affaires à partir duquel vous ne perdez plus d’argent',
        ],
      },
      {
        titre: 'Dans quel ordre les remplir',
        texte: [
          'Commencez par les ventes, pas par les dépenses. Combien de clients par semaine, pour quel panier, combien de semaines par an : écrivez le calcul, pas seulement le résultat. Tout le reste en découle.',
          'Listez ensuite les charges, y compris celles qu’on oublie : assurances, expert-comptable, logiciels, entretien, et votre propre rémunération. Puis les investissements de départ. Le plan de trésorerie vient en dernier : c’est lui qui montre si vous tenez les premiers mois, quand les dépenses arrivent avant les recettes.',
        ],
      },
      {
        titre: 'D’où sortir vos chiffres',
        texte: [
          'Un chiffre d’affaires prévisionnel est une hypothèse. Sa valeur dépend de sa source. Les meilleures : des entretiens avec de futurs clients, des précommandes ou des lettres d’intention, les chiffres d’un concurrent comparable, les devis de vos fournisseurs.',
          'Un chiffre « à la louche » se repère tout de suite. Devant chaque ligne importante, vous devez pouvoir répondre à la question : comment le savez-vous ?',
        ],
        lien: { vers: '/guides/etude-de-marche', texte: 'Faire son étude de marché auprès de vrais clients' },
      },
      {
        titre: 'Les erreurs que la banque repère',
        liste: [
          'Un chiffre d’affaires qui monte tout seul, sans explication',
          'Aucune rémunération prévue pour le dirigeant',
          'Des charges oubliées, ou la TVA mal traitée',
          'Une trésorerie négative dès le troisième mois, que personne n’a vue',
          'Trois années identiques, comme si rien ne changeait',
          'Un tableau qu’on ne sait pas expliquer à l’oral',
        ],
      },
      {
        titre: 'Comment on vous aide',
        texte: [
          'On ne remplit pas le tableau à votre place : on le construit avec vous, ligne par ligne, en partant de ce que vos clients ont dit. Vous repartez avec un prévisionnel dont chaque chiffre a sa source, que vous savez défendre et modifier seul.',
        ],
        lien: { vers: '/construire-votre-business-plan', texte: 'Construire votre business plan, avec nous' },
      },
    ],
    missions: ['bp', 'dossier'],
    faq: [
      { q: 'Pourquoi trois ans ?', r: 'C’est l’habitude des banques et des réseaux de prêt : une première année de démarrage, une deuxième de montée en charge, une troisième où l’activité doit tenir seule. La première année se détaille mois par mois.' },
      { q: 'Faut-il un expert-comptable pour le faire ?', r: 'Ce n’est pas obligatoire, mais sa validation rassure un financeur, et il évite les erreurs de TVA et de charges sociales. Notre rôle est en amont : que chaque chiffre ait une source.' },
      { q: 'Un modèle Excel gratuit suffit-il ?', r: 'Pour la forme, oui : les modèles gratuits calculent correctement. Ce qu’ils ne donnent pas, ce sont vos hypothèses. Un modèle bien rempli avec des chiffres sans source ne convainc personne.' },
      { q: 'Peut-on faire son prévisionnel avec une IA ?', r: 'Une IA aide à structurer et à vérifier les calculs. Elle ne connaît ni vos clients, ni votre zone, ni vos prix : si vous la laissez inventer les hypothèses, vous obtiendrez un tableau cohérent et faux.' },
    ],
    liens: ['/guides/business-plan-banque', '/guides/etude-de-marche', '/construire-votre-business-plan', '/relire-votre-dossier'],
    resume: 'Guide de Reskope sur le prévisionnel financier à trois ans d’un business plan : ses quatre tableaux (compte de résultat prévisionnel, plan de financement, plan de trésorerie mois par mois, seuil de rentabilité), l’ordre pour les remplir (les ventes d’abord, la trésorerie en dernier), d’où sortir des chiffres crédibles (entretiens clients, précommandes, devis), et les erreurs qu’une banque repère : chiffre d’affaires sans source, dirigeant non rémunéré, charges oubliées, trésorerie négative.',
  },

  {
    route: '/guides/business-plan-avec-ia',
    type: 'guide',
    publie: '2026-10-10',
    maj: '10 octobre 2026',
    parent: '/guides',
    espace: 'creation',
    priorite: '0.8',
    fil: 'Business plan avec l’IA',
    titre: 'Faire son business plan avec l’IA (ChatGPT)',
    description: 'Faire son business plan ou son étude de marché avec ChatGPT ou une autre IA : ce qu’elle fait bien, ce qu’elle invente, et la méthode pour s’en servir.',
    h1: 'Faire son business plan avec l’IA : ce qui marche, et ce qui trompe',
    surtitre: 'Guide · créer son entreprise avec l’IA',
    accroche: 'Une IA écrit un business plan en trente secondes, avec un marché, des chiffres et une conclusion optimiste. Tout y est, sauf la seule chose qui compte : la preuve que des gens vous achèteront. Voici comment s’en servir sans se faire piéger.',
    sections: [
      {
        titre: 'Ce qu’une IA fait bien pour votre projet',
        texte: [
          'Un assistant d’IA comme ChatGPT est très bon pour mettre en forme ce que vous savez déjà. Il structure, il reformule, il repère les trous. Utilisé ainsi, il vous fait gagner des jours.',
        ],
        liste: [
          'Proposer le plan d’un business plan, chapitre par chapitre',
          'Lister les charges qu’on oublie pour votre type d’activité',
          'Vérifier la cohérence d’un calcul que vous lui donnez',
          'Reformuler un passage confus en trois phrases claires',
          'Préparer les questions qu’un banquier vous posera',
        ],
      },
      {
        titre: 'Ce qu’elle invente',
        texte: [
          'Une IA ne connaît ni vos futurs clients, ni votre rue, ni vos prix. Si vous lui demandez « la taille du marché de la coiffure à Valenciennes », elle vous donnera un chiffre : plausible, bien écrit, et parfois inventé de toutes pièces. Elle ne ment pas, elle complète.',
          'C’est le vrai danger d’une étude de marché faite avec une IA : elle a l’air terminée. Or un chiffre sans source est exactement ce qu’une banque repère en premier.',
        ],
      },
      {
        titre: 'Le piège du dossier trop lisse',
        texte: [
          'Un texte généré se reconnaît : des phrases bien rondes, des chiffres sans origine, aucune aspérité. Deux dossiers écrits de cette façon se ressemblent, quel que soit le projet.',
          'Ce qui distingue le vôtre, aucune IA ne peut l’écrire à votre place : les mots de vos futurs clients, relevés lors d’entretiens datés, et les raisons précises pour lesquelles ils achèteraient.',
        ],
        lien: { vers: '/guides/questions-futurs-clients', texte: 'Les 12 questions à poser à vos futurs clients' },
      },
      {
        titre: 'La bonne méthode : l’IA après le terrain, pas avant',
        liste: [
          'Allez d’abord voir dix à douze futurs clients, et notez leurs phrases exactes',
          'Retirez les noms, puis donnez vos notes à l’IA pour qu’elle les classe par problème',
          'Écrivez vos hypothèses de chiffre d’affaires, et faites-lui chercher ce que vous avez oublié',
          'Demandez-lui de jouer un banquier prudent et de vous poser ses dix questions',
          'Relisez tout, et vérifiez chaque chiffre à sa source',
        ],
      },
      {
        titre: 'Quatre consignes à reprendre telles quelles',
        liste: [
          '« Voici mes notes de dix entretiens. Classe ce que les gens disent par problème, sans rien ajouter. »',
          '« Voici mon prévisionnel pour un commerce de proximité. Quelles charges ai-je probablement oubliées ? »',
          '« Joue un banquier prudent. Quelles sont les dix questions que tu me poserais sur ce dossier ? »',
          '« Relis ce texte et signale chaque chiffre qui n’a pas de source. »',
        ],
      },
      {
        titre: 'La confidentialité',
        texte: [
          'Ne collez pas dans un outil grand public les noms, les téléphones ou les propos identifiables des personnes que vous avez rencontrées. Anonymisez vos notes d’abord. La CNIL publie des recommandations sur l’usage de ces outils.',
        ],
        source: { texte: 'CNIL : intelligence artificielle', url: 'https://www.cnil.fr/fr/intelligence-artificielle' },
      },
      {
        titre: 'Comment on vous aide',
        texte: [
          'L’IA fait partie de nos outils de tous les jours, et on vous montre comment vous en servir pour votre projet. Mais on ne lui délègue pas l’essentiel : les entretiens avec vos futurs clients, on va les mener nous-mêmes, sur le terrain. Votre business plan se construit ensuite à partir de ce qu’ils ont dit.',
        ],
        lien: { vers: '/construire-votre-business-plan', texte: 'Construire votre business plan, avec nous' },
      },
    ],
    missions: ['idee', 'bp', 'dossier'],
    faq: [
      { q: 'ChatGPT peut-il faire mon étude de marché ?', r: 'Il peut vous aider à la préparer et à en ranger les résultats. Il ne peut pas la faire : il n’a jamais parlé à vos futurs clients, et les chiffres locaux qu’il donne ne sont pas fiables sans vérification.' },
      { q: 'Une banque accepte-t-elle un business plan écrit avec une IA ?', r: 'Elle juge le contenu, pas l’outil. Ce qu’elle veut, ce sont des chiffres qui ont une source et un porteur de projet capable de les défendre à l’oral. Un dossier que vous ne savez pas expliquer vous desservira, qu’une IA l’ait écrit ou non.' },
      { q: 'Quelle IA choisir ?', r: 'Pour cet usage, les assistants les plus connus se valent. Prenez-en un, apprenez à lui donner du contexte, et regardez ce qu’il fait de vos données avant d’y mettre quoi que ce soit de sensible.' },
      { q: 'L’IA peut-elle remplir mon prévisionnel ?', r: 'Elle peut construire les tableaux et vérifier les calculs. Les hypothèses, combien de clients, à quel prix, restent les vôtres : si vous la laissez les inventer, vous obtiendrez un tableau cohérent et faux.' },
    ],
    liens: ['/guides/etude-de-marche', '/guides/previsionnel-financier', '/guides/business-plan-banque', '/tester-une-idee'],
    resume: 'Guide de Reskope pour faire son business plan ou son étude de marché avec une IA comme ChatGPT. Ce qu’elle fait bien : proposer un plan, lister les charges oubliées, vérifier un calcul, reformuler, préparer les questions du banquier. Ce qu’elle invente : les chiffres de marché locaux, plausibles et sans source. La méthode : aller d’abord voir dix à douze futurs clients, anonymiser ses notes, puis s’en servir pour classer, chercher les oublis et s’entraîner. Quatre consignes à reprendre telles quelles, et les précautions de confidentialité.',
  },

  {
    route: '/zone-intervention',
    type: 'local',
    espace: 'maison',
    priorite: '0.6',
    fil: 'Zone d’intervention',
    titre: 'Zone d’intervention : Valenciennes, Lille, Nord',
    description: 'Où intervient Reskope : Valenciennes et le Valenciennois, Lille et sa métropole, Douai, Cambrai, Maubeuge et le reste du Nord. Sur place ou en visio.',
    h1: 'Où nous intervenons : Valenciennes, Lille et le Nord',
    surtitre: 'Reskope · cabinet de conseil dans les Hauts-de-France',
    accroche: 'On travaille à Valenciennes et à Lille, et on se déplace dans tout le département du Nord. Voici où on vient, ce qui se fait sur place et ce qui peut se faire à distance.',
    points: ['Un premier échange de 30 minutes offert, au téléphone ou en visio', 'Les entretiens et les audits se font sur place', 'Le reste avance à distance, sans vous prendre de temps'],
    sections: [
      {
        titre: 'Valenciennes et le Valenciennois',
        texte: [
          'Valenciennes, Anzin, Saint-Saulve, Marly, Trith-Saint-Léger, Onnaing, Petite-Forêt, Aulnoy-lez-Valenciennes, Bruay-sur-l’Escaut, Condé-sur-l’Escaut, Denain et Saint-Amand-les-Eaux. C’est notre premier terrain.',
        ],
        lien: { vers: '/cabinet-conseil-numerique-valenciennes', texte: 'Le conseil numérique à Valenciennes' },
      },
      {
        titre: 'Lille et la métropole',
        texte: [
          'Lille, Roubaix, Tourcoing, Villeneuve-d’Ascq, Marcq-en-Barœul, Lambersart, La Madeleine, Lomme, Wasquehal, Lesquin et Seclin. On s’y rend pour les rendez-vous, les entretiens avec vos clients et les audits.',
        ],
        lien: { vers: '/cabinet-conseil-numerique-lille', texte: 'Le conseil numérique à Lille' },
      },
      {
        titre: 'Le reste du Nord',
        texte: [
          'Douai et le Douaisis, Cambrai et le Cambrésis, Maubeuge et la Sambre-Avesnois, la Pévèle. On s’y déplace pour les temps qui comptent : la première visite, les entretiens, la remise du bilan.',
          'Plus loin dans les Hauts-de-France, on travaille surtout à distance, avec un déplacement quand il le faut. On vous le dit dès le premier échange.',
        ],
      },
      {
        titre: 'Ce qui se fait sur place, et ce qui se fait à distance',
        liste: [
          'Sur place : les entretiens avec vos futurs clients ou vos clients actuels',
          'Sur place : l’audit de vos outils, à côté de ceux qui s’en servent',
          'Sur place ou en visio : les points d’étape et la remise des livrables',
          'À distance : la construction du business plan, du site, des automatisations',
          'Au téléphone : le premier échange, et toutes les questions entre deux rendez-vous',
        ],
      },
      {
        titre: 'Pourquoi on tient à venir',
        texte: [
          'Notre méthode repose sur ce qu’on voit et ce qu’on entend : un client qui explique pourquoi il achète, un salarié qui montre le fichier qu’il remplit deux fois. Ça ne se devine pas depuis un bureau. C’est aussi pour ça qu’on reste dans le Nord : on préfère peu de dossiers, près de chez nous.',
        ],
      },
    ],
    ailleursTitre: 'Selon la taille de votre entreprise',
    ailleurs: [
      { href: '/tpe/', nom: 'Reskope Define : de 1 à 10 personnes', dit: 'Site internet, boutique en ligne, prise de rendez-vous, identité de marque.' },
      { href: '/pme/', nom: 'Reskope Elevate : de 10 à 250 personnes', dit: 'Audit de vos outils, mise en ordre, automatisations et outils sur mesure.' },
    ],
    faq: [
      { q: 'Où peut-on vous rencontrer ?', r: 'On vient chez vous, ou on se retrouve dans un lieu qui vous arrange, à Valenciennes ou à Lille. Le premier échange se fait au téléphone ou en visio.' },
      { q: 'Intervenez-vous hors du Nord ?', r: 'Oui, à distance, pour la construction d’un business plan, d’un site ou d’un outil. Les entretiens terrain et les audits demandent d’être là : au-delà du Nord, on en discute au cas par cas.' },
    ],
    liens: ['/cabinet-conseil-numerique-valenciennes', '/cabinet-conseil-numerique-lille', '/accompagnement-creation-entreprise-valenciennes', '/accompagnement-creation-entreprise-lille', '/contact'],
    resume: 'Reskope intervient à Valenciennes et dans le Valenciennois (Anzin, Saint-Saulve, Marly, Trith-Saint-Léger, Onnaing, Petite-Forêt, Denain, Saint-Amand-les-Eaux), à Lille et dans sa métropole (Roubaix, Tourcoing, Villeneuve-d’Ascq, Marcq-en-Barœul, Lambersart, La Madeleine), ainsi qu’à Douai, Cambrai, Maubeuge et dans le reste du Nord. Les entretiens et les audits se font sur place ; la construction du business plan, des sites et des outils avance à distance. On vient chez vous, ou dans un lieu qui vous arrange.',
  },
];
