/* ============================================================
   LES QUATRE UNIVERS — un métier, une page pilier, un monde visuel.

   Pourquoi ce fichier existe : les quatre offres ne s'adressent pas aux
   mêmes personnes. Un dirigeant de PME qui vient pour un audit n'a rien à
   faire dans une page qui parle de business plan, et l'inverse est vrai.
   Chaque univers porte donc son propre contenu ET son propre réglage
   visuel (`ton`, lu par data-univers dans index.css).

   Les pages existantes ne sont pas dupliquées : elles sont RATTACHÉES à
   l'univers auquel elles appartiennent, via `preuves`. C'est ce qui fait
   qu'on ne croise jamais les trois autres métiers quand on est dans le
   sien.

   Textes repris des plaquettes imprimées, à la lettre : un prospect qui a
   le livret en main et le site sous les yeux doit lire la même entreprise.
   ============================================================ */

export const UNIVERS = [
  /* ---------------------------------------------------------- 01 */
  {
    id: 'audit',
    slug: '/audit-et-cartographie',
    ton: 'audit',
    scene: 'facture',
    num: '01',
    fr: {
      nom: 'Audit et cartographie',
      court: 'Ce que vous payez, qui s’en sert, et où vivent vos données.',
      metaTitle: 'Audit et cartographie de vos outils',
      metaDesc:
        'Deux à cinq jours sur place, chaque personne rencontrée, chaque abonnement ouvert. Vous recevez le tableau de vos outils coût par coût, les doublons, et les chantiers chiffrés en jours.',
      eyebrow: 'Offre 01 · Audit et cartographie',
      titre: 'Vos équipes ne manquent pas d’outils. Elles en ont trop.',
      lead: 'C’est la remarque qui revient le plus souvent : des logiciels partout, plus personne ne sait lequel fait quoi, et la même information est saisie trois fois.',
      duree: '2 à 5 jours sur place',
      figTitre: 'Vos abonnements, mis en volume',
      figLeg:
        'Chaque bloc est un outil, et sa hauteur c’est ce qu’il coûte sur l’année. Le plein, c’est ce qui sert. Le fil de fer au-dessus, ce sont les comptes payés que personne n’ouvre. Exemple.',
      constatTitre: 'Deux chiffres qui ne viennent pas de nous.',
      sources: [
        {
          v: '36 %',
          t: 'des licences logicielles payées ne servent jamais',
          from: 'Zylo, 2026 SaaS Management Index',
          url: 'https://zylo.com/news/2026-saas-management-index',
        },
        {
          v: '118',
          t: 'applications en moyenne dans une entreprise',
          from: 'BetterCloud, The 2026 State of SaaS Report',
          url: 'https://www.bettercloud.com/monitor/the-2026-state-of-saas-report/',
        },
      ],
      tempsTitre: 'Comment on procède.',
      temps: [
        ['On voit chaque personne', 'Une demi-heure avec chacun : ce qu’il ouvre tous les jours, ce qu’il recopie d’un outil à l’autre, et ce qu’il n’ouvre jamais.'],
        ['On ouvre les abonnements', 'On regarde ce que chaque licence vous coûte, à quoi elle sert vraiment, et s’il en existe une moins chère qui fait la même chose.'],
        ['On suit une donnée', 'Prenons le chiffre d’affaires d’un client : dans combien d’outils est-il stocké, et lequel dit vrai quand ils ne sont pas d’accord ?'],
      ],
      recuTitre: 'Ce que vous recevez.',
      recu: [
        'Le tableau de vos outils, coût par coût',
        'Les doublons et les abonnements dormants',
        'Le schéma de circulation de vos données',
        'Les chantiers chiffrés en jours, classés par gain',
      ],
      faitsTitre: 'En pratique',
      faits: '<b>2 à 5 jours sur place</b>, document remis sous dix jours, aucune obligation de poursuivre. <b>Côté RGPD</b> : on relève des usages et des coûts, jamais des personnes. Aucune donnée personnelle n’est copiée, et rien de ce qu’on a vu ne sort de chez vous.',
      preuvesTitre: 'Pour aller plus loin.',
      preuves: [
        { to: '/pourquoi', t: 'Le constat', d: 'Trois situations dans lesquelles vous vous reconnaîtrez peut-être : la PME qui grossit, l’équipe en transition, l’artisan.', a: 'Lire le constat' },
        { to: '/exemple', t: 'Un exemple de bilan', d: 'Le document que vous recevez à la fin, en entier : cartographie, constats, recommandations chiffrées.', a: 'Voir le bilan' },
      ],
      finTitre: 'On commence par regarder, pas par vendre.',
      finTexte: 'Un premier échange de trente minutes pour comprendre votre contexte. Si l’audit n’a pas d’intérêt chez vous, on vous le dira.',
      finCta: 'Parler de vos outils',
    },
    en: {
      nom: 'Audit and mapping',
      court: 'What you pay for, who uses it, and where your data really lives.',
      metaTitle: 'Audit and mapping of your tools',
      metaDesc:
        'Two to five days on site, every person interviewed, every subscription opened. You receive the table of your tools cost by cost, the duplicates, and the work priced in days.',
      eyebrow: 'Offer 01 · Audit and mapping',
      titre: 'Your teams are not short of tools. They have too many.',
      lead: 'It is the remark we hear most: software everywhere, nobody knows which one does what, and the same information is keyed in three times.',
      duree: '2 to 5 days on site',
      figTitre: 'Your subscriptions, as volumes',
      figLeg:
        'Each block is a tool, and its height is what it costs over the year. The solid part is what gets used. The wireframe above is the seats you pay for and nobody opens. Example.',
      constatTitre: 'Two figures that are not ours.',
      sources: [
        {
          v: '36%',
          t: 'of paid software licences are never used',
          from: 'Zylo, 2026 SaaS Management Index',
          url: 'https://zylo.com/news/2026-saas-management-index',
        },
        {
          v: '118',
          t: 'applications on average in a company',
          from: 'BetterCloud, The 2026 State of SaaS Report',
          url: 'https://www.bettercloud.com/monitor/the-2026-state-of-saas-report/',
        },
      ],
      tempsTitre: 'How we work.',
      temps: [
        ['We meet every person', 'Half an hour each: what they open every day, what they retype from one tool into another, and what they never open at all.'],
        ['We open the subscriptions', 'What each licence costs you, what it is actually for, and whether a cheaper one does the same job.'],
        ['We follow one piece of data', 'Take a client’s revenue figure: how many tools store it, and which one is right when they disagree?'],
      ],
      recuTitre: 'What you receive.',
      recu: [
        'The table of your tools, cost by cost',
        'Duplicates and dormant subscriptions',
        'The map of how your data flows',
        'The work priced in days, ranked by gain',
      ],
      faitsTitre: 'In practice',
      faits: '<b>2 to 5 days on site</b>, report delivered within ten days, no obligation to continue. <b>On GDPR</b>: we record usage and costs, never people. No personal data is copied, and nothing we saw leaves your premises.',
      preuvesTitre: 'Going further.',
      preuves: [
        { to: '/pourquoi', t: 'The findings', d: 'Three situations you may recognise: the growing SME, the team in transition, the craftsman.', a: 'Read the findings' },
        { to: '/exemple', t: 'An example report', d: 'The document you receive at the end, in full: mapping, findings, priced recommendations.', a: 'See the report' },
      ],
      finTitre: 'We start by looking, not by selling.',
      finTexte: 'A first thirty-minute conversation to understand your context. If an audit is not worth it here, we will say so.',
      finCta: 'Talk about your tools',
    },
  },

  /* ---------------------------------------------------------- 02 */
  {
    id: 'solutions',
    slug: '/solutions-numeriques',
    ton: 'solutions',
    scene: 'chantier',
    num: '02',
    fr: {
      nom: 'Solutions numériques',
      court: 'Construire ce qui manque, réparer ce qui coince, vous laisser les clés.',
      metaTitle: 'Solutions numériques : sites, outils métier, liaisons',
      metaDesc:
        'Site vitrine, boutique, prise de réservation, reprise de vos outils internes, liaisons entre logiciels. Facturé à la journée, par itérations courtes. Code et accès à votre nom.',
      eyebrow: 'Offre 02 · Solutions numériques',
      titre: 'On construit ce qui manque. On répare ce qui coince.',
      lead: 'Un site vitrine, une boutique, une mise à jour de vos logiciels internes, ou simplement remettre de l’ordre dans ce que vous avez déjà.',
      duree: '5 à 15 jours',
      figTitre: 'Ce qu’une réservation déclenche',
      figLeg:
        'Un client réserve depuis votre site. En bas, ce qu’il fait de son côté. En haut, ce qui se déclenche chez vous sans que personne ait à y toucher. Exemple.',
      constatTitre: 'Zéro donnée gardée de notre côté.',
      sources: [
        { v: '0', t: 'donnée conservée chez nous à la fin de la mission', from: null, url: null },
        { v: '100 %', t: 'du code et des fichiers sources remis, sans exception', from: null, url: null },
      ],
      tempsTitre: 'Comment on procède.',
      temps: [
        ['On construit', 'Un site vitrine, une boutique, un module de réservation. Pour une petite entreprise comme pour une PME.'],
        ['On améliore l’existant', 'On met à jour et on simplifie vos outils internes. Avec vos développeurs si vous en avez, à leur place sinon, et toujours par petites étapes.'],
        ['On forme, puis on part', 'Vos équipes savent se servir de l’outil, et c’est vous qui décidez de la suite.'],
      ],
      recuTitre: 'Ce que vous recevez.',
      recu: [
        'Le site ou l’outil, en ligne',
        'Tout le code et les fichiers sources',
        'Les accès et les abonnements à votre nom',
        'Une demi-journée de prise en main',
      ],
      faitsTitre: 'En pratique',
      faits: '<b>Facturé à la journée</b>, par itérations courtes validées une par une, un hébergement à votre nom. À la fin, au choix : vous repartez avec tout et vous faites vos modifications vous-même, ou vous prenez un abonnement de maintenance et vous nous envoyez vos demandes au fil de l’eau.',
      preuvesTitre: 'Pour aller plus loin.',
      preuves: [
        { to: '/methode', t: 'La méthode', d: 'Le parcours complet, jalon par jalon, du cadrage jusqu’à votre autonomie.', a: 'Voir la méthode' },
        { to: '/numerique-responsable', t: 'Numérique responsable', d: 'Moins d’outils, c’est moins de serveurs, moins de données dupliquées et moins de matériel à remplacer.', a: 'Lire' },
      ],
      finTitre: 'Dites-nous ce qui coince.',
      finTexte: 'Trente minutes suffisent pour savoir si c’est un chantier d’une journée ou de trois semaines. Et on vous le dit avant de commencer.',
      finCta: 'Décrire votre besoin',
    },
    en: {
      nom: 'Digital solutions',
      court: 'Build what is missing, fix what gets in the way, hand you the keys.',
      metaTitle: 'Digital solutions: websites, business tools, integrations',
      metaDesc:
        'Website, online shop, booking, rework of your internal tools, integrations between software. Billed by the day, in short iterations. Code and access in your name.',
      eyebrow: 'Offer 02 · Digital solutions',
      titre: 'We build what is missing. We fix what gets in the way.',
      lead: 'A website, a shop, an update to your internal software, or simply putting order back into what you already have.',
      duree: '5 to 15 days',
      figTitre: 'What one booking sets off',
      figLeg:
        'A client books from your website. Below, what they do on their side. Above, what happens on yours without anyone touching it. Example.',
      constatTitre: 'Zero data kept on our side.',
      sources: [
        { v: '0', t: 'data kept by us once the engagement ends', from: null, url: null },
        { v: '100%', t: 'of the code and source files handed over, no exception', from: null, url: null },
      ],
      tempsTitre: 'How we work.',
      temps: [
        ['We build', 'A website, a shop, a booking module. For a small business as much as for an SME.'],
        ['We improve what exists', 'We update and simplify your internal tools. With your developers if you have any, in their place if you do not, and always in small steps.'],
        ['We train, then we leave', 'Your teams know how to use the tool, and you decide what comes next.'],
      ],
      recuTitre: 'What you receive.',
      recu: [
        'The site or the tool, live',
        'All the code and source files',
        'Access and subscriptions in your name',
        'Half a day of handover',
      ],
      faitsTitre: 'In practice',
      faits: '<b>Billed by the day</b>, in short iterations approved one by one, hosting in your name. At the end, your choice: you leave with everything and make your own changes, or you take a maintenance plan and send us requests as they come.',
      preuvesTitre: 'Going further.',
      preuves: [
        { to: '/methode', t: 'The method', d: 'The full journey, milestone by milestone, from framing to your autonomy.', a: 'See the method' },
        { to: '/numerique-responsable', t: 'Responsible digital', d: 'Fewer tools means fewer servers, less duplicated data and less hardware to replace.', a: 'Read' },
      ],
      finTitre: 'Tell us what gets in the way.',
      finTexte: 'Thirty minutes is enough to know whether it is a one-day job or a three-week one. And we tell you before we start.',
      finCta: 'Describe your need',
    },
  },

  /* ---------------------------------------------------------- 03 */
  {
    id: 'strategie',
    slug: '/strategie-et-modele',
    ton: 'strategie',
    scene: 'previsionnel',
    num: '03',
    fr: {
      nom: 'Stratégie et modèle',
      court: 'Le besoin réel, le modèle qui vous correspond, de quoi nourrir votre dossier.',
      metaTitle: 'Stratégie et modèle économique',
      metaDesc:
        'On ne rédige pas votre business plan à votre place : on rassemble avec vous les hypothèses, le coût de revient et le seuil à partir duquel vous vous payez. Recherche de fournisseurs en option.',
      eyebrow: 'Offre 03 · Stratégie et modèle',
      titre: 'Votre projet est celui d’une vie. Pas un document à rendre.',
      lead: 'On ne rédige pas votre business plan à votre place. On rassemble avec vous tout ce qui va le nourrir, et on vérifie que ce que vous voulez faire et ce que vous ferez réellement restent une seule et même chose.',
      duree: '2 à 4 jours',
      figTitre: 'Trois ans de prévisionnel',
      figLeg:
        'Chaque barre est le chiffre d’affaires prévu pour une année. Le plan qui les traverse, c’est le niveau à partir duquel vous commencez à vous payer. Exemple.',
      constatTitre: 'Ce qu’on regarde en premier.',
      sources: [
        { v: 'Vous', t: 'êtes le meilleur atout du projet : c’est de là qu’on part, pas d’un modèle tout fait', from: null, url: null },
        { v: '1 seuil', t: 'celui à partir duquel vous vous payez. Tant qu’il n’est pas su, rien n’est décidé', from: null, url: null },
      ],
      tempsTitre: 'Comment on procède.',
      temps: [
        ['On part de vous', 'Vous êtes le meilleur atout du projet. Ce qu’on cherche, c’est que ce que vous voulez et ce que vous savez faire aillent dans le même sens.'],
        ['On construit du concret', 'Les hypothèses et d’où elles sortent, ce que votre produit vous coûte vraiment, et le moment où vous commencez à vous payer.'],
        ['On trouve le modèle', 'Celui qui vous va à vous, pas celui du voisin. On peut aussi chercher vos fournisseurs et prestataires, en option.'],
      ],
      recuTitre: 'Ce que vous recevez.',
      recu: [
        'Les éléments chiffrés qui nourriront votre dossier',
        'Le prévisionnel en tableur, formules ouvertes',
        'Le coût de revient, produit par produit',
        'Les questions qu’on vous posera, et vos réponses',
      ],
      faitsTitre: 'En pratique',
      faits: '<b>2 à 4 jours</b> selon l’état du dossier, révisions comprises. <b>La recherche de fournisseurs et de prestataires</b> est une option chiffrée à part : elle dépend du nombre d’interlocuteurs, du besoin de nouer des relations de confiance, et de notre rôle d’intermédiaire ou non.',
      preuvesTitre: 'Pour aller plus loin.',
      preuves: [
        { to: '/methode', t: 'La méthode', d: 'Le parcours complet, jalon par jalon. Rien n’est engagé avant d’être chiffré.', a: 'Voir la méthode' },
        { to: '/a-propos', t: 'Qui nous sommes', d: 'Thomy tient le sens, la stratégie et l’identité. Florian tient la technique, les sites et les outils.', a: 'Nous connaître' },
      ],
      finTitre: 'Parlons de votre projet avant d’en parler à un financeur.',
      finTexte: 'Trente minutes pour comprendre où vous en êtes et ce qu’il vous manque. Gratuit, et sans engagement.',
      finCta: 'Prendre rendez-vous',
    },
    en: {
      nom: 'Strategy and model',
      court: 'The real need, the model that fits you, and what feeds your file.',
      metaTitle: 'Strategy and business model',
      metaDesc:
        'We do not write your business plan for you: we gather the assumptions, the unit cost and the break-even point with you. Supplier sourcing available as an option.',
      eyebrow: 'Offer 03 · Strategy and model',
      titre: 'Your project is a life’s work. Not a document to hand in.',
      lead: 'We do not write your business plan for you. We gather with you everything that will feed it, and we check that what you want to do and what you will actually do remain one and the same thing.',
      duree: '2 to 4 days',
      figTitre: 'Three years of forecast',
      figLeg:
        'Each bar is the revenue forecast for one year. The plane cutting through them is the level from which you start paying yourself. Example.',
      constatTitre: 'What we look at first.',
      sources: [
        { v: 'You', t: 'are the project’s best asset: that is where we start, not from an off-the-shelf model', from: null, url: null },
        { v: '1 point', t: 'the one from which you pay yourself. Until it is known, nothing is decided', from: null, url: null },
      ],
      tempsTitre: 'How we work.',
      temps: [
        ['We start from you', 'You are the project’s best asset. What we look for is that what you want and what you know how to do point the same way.'],
        ['We build something concrete', 'The assumptions and where they come from, what your product really costs you, and when you start paying yourself.'],
        ['We find the model', 'The one that suits you, not your neighbour. We can also source your suppliers and providers, as an option.'],
      ],
      recuTitre: 'What you receive.',
      recu: [
        'The figures that will feed your file',
        'The forecast as a spreadsheet, formulas open',
        'The unit cost, product by product',
        'The questions you will be asked, and your answers',
      ],
      faitsTitre: 'In practice',
      faits: '<b>2 to 4 days</b> depending on the state of the file, revisions included. <b>Supplier and provider sourcing</b> is priced separately: it depends on how many contacts are involved, whether trust has to be built, and whether we act as intermediary.',
      preuvesTitre: 'Going further.',
      preuves: [
        { to: '/methode', t: 'The method', d: 'The full journey, milestone by milestone. Nothing is committed before it is priced.', a: 'See the method' },
        { to: '/a-propos', t: 'Who we are', d: 'Thomy holds meaning, strategy and identity. Florian holds the technical side, websites and tools.', a: 'Meet us' },
      ],
      finTitre: 'Let us talk about your project before you talk to a funder.',
      finTexte: 'Thirty minutes to understand where you stand and what is missing. Free, and without commitment.',
      finCta: 'Book a meeting',
    },
  },

  /* ---------------------------------------------------------- 04 */
  {
    id: 'marque',
    slug: '/direction-artistique',
    ton: 'marque',
    scene: 'clientele',
    num: '04',
    fr: {
      nom: 'Direction artistique',
      court: 'Une marque qui vous ressemble, et qui tient sur tous les supports.',
      metaTitle: 'Direction artistique et identité de marque',
      metaDesc:
        'Le positionnement d’abord, les couleurs ensuite. On part de vous et de vos clients, on tranche avec des chiffres, et on vous remet un document de règles, pas une image à interpréter.',
      eyebrow: 'Offre 04 · Direction artistique',
      titre: 'Une marque qui vous ressemble. Pas qui ressemble à une autre.',
      lead: 'On commence par vous et par vos clients. Le positionnement d’abord, les couleurs ensuite : dans ce sens-là chaque choix se justifie, et votre marque tient aussi bien sur une devanture que sur un écran.',
      duree: '3 à 5 jours',
      figTitre: 'La carte de votre clientèle',
      figLeg:
        'Chaque bloc est un type de client. Sa position dit ce qu’il dépense et à quelle fréquence il revient ; sa hauteur, ce qu’il pèse dans le chiffre d’affaires. Le bloc bagué est celui qu’on vise. Exemple.',
      constatTitre: 'Choisir, c’est renoncer.',
      sources: [
        { v: '1 segment', t: 'visé, les autres écartés volontairement : c’est ce qui rend une marque lisible', from: null, url: null },
        { v: '0 image', t: 'à interpréter. Vous repartez avec des règles écrites, utilisables sans nous', from: null, url: null },
      ],
      tempsTitre: 'Comment on procède.',
      temps: [
        ['On part de vous', 'Ce que vous voulez que les gens ressentent en poussant votre porte, et ce que vous ne voulez surtout pas.'],
        ['On définit à qui vous parlez', 'Qui vient chez vous, ce qu’il dépense, à quelle fréquence il revient. Cela se tranche avec des chiffres, pas à l’intuition.'],
        ['On écrit les règles', 'Le nom, le ton, les couleurs, les matières, et la liste de ce qu’il faut produire, dans quel ordre et pour quel budget.'],
      ],
      recuTitre: 'Ce que vous recevez.',
      recu: [
        'Le document de règles complet',
        'Le positionnement et le persona écrits',
        'Palette, typographies, règles d’usage',
        'La liste de ce qu’il faut produire, chiffrée',
      ],
      faitsTitre: 'En pratique',
      faits: '<b>3 à 5 jours</b> étalés sur deux à trois semaines. Un document de règles, pas une image à interpréter. <b>Notre franchise</b> : le logo et la charte, on sait les dessiner et on le fait quand vous nous le demandez. Si votre identité demande un vrai studio, on vous le dit et on transmet le cadre au graphiste de votre choix.',
      preuvesTitre: 'Pour aller plus loin.',
      preuves: [
        { to: '/a-propos', t: 'Qui nous sommes', d: 'Deux personnes sur le même dossier : le sens et la stratégie d’un côté, la technique et les outils de l’autre.', a: 'Nous connaître' },
        { to: '/methode', t: 'La méthode', d: 'Le parcours complet, jalon par jalon. Vous pouvez vous arrêter à la fin de chaque étape.', a: 'Voir la méthode' },
      ],
      finTitre: 'Montrez-nous ce que vous avez, on vous dira ce qui manque.',
      finTexte: 'Un premier échange de trente minutes. Si votre identité tient déjà debout, on vous le dira plutôt que de vous vendre une refonte.',
      finCta: 'En parler',
    },
    en: {
      nom: 'Art direction',
      court: 'A brand that looks like you, and holds up on every medium.',
      metaTitle: 'Art direction and brand identity',
      metaDesc:
        'Positioning first, colours second. We start from you and your customers, we decide with figures, and we hand you a rulebook, not an image to interpret.',
      eyebrow: 'Offer 04 · Art direction',
      titre: 'A brand that looks like you. Not like someone else.',
      lead: 'We start from you and from your customers. Positioning first, colours second: that way round, every choice can be justified, and your brand holds up on a shopfront as well as on a screen.',
      duree: '3 to 5 days',
      figTitre: 'The map of your customers',
      figLeg:
        'Each block is a type of customer. Its position says what they spend and how often they come back; its height, what they weigh in revenue. The ringed block is the one we aim at. Example.',
      constatTitre: 'Choosing means giving up.',
      sources: [
        { v: '1 segment', t: 'targeted, the others deliberately set aside: that is what makes a brand legible', from: null, url: null },
        { v: '0 image', t: 'to interpret. You leave with written rules you can use without us', from: null, url: null },
      ],
      tempsTitre: 'How we work.',
      temps: [
        ['We start from you', 'What you want people to feel when they push your door open, and what you absolutely do not want.'],
        ['We define who you speak to', 'Who comes to you, what they spend, how often they return. That is decided with figures, not intuition.'],
        ['We write the rules', 'The name, the tone, the colours, the materials, and the list of what to produce, in what order and for what budget.'],
      ],
      recuTitre: 'What you receive.',
      recu: [
        'The complete rulebook',
        'Positioning and persona, written down',
        'Palette, typefaces, usage rules',
        'The list of what to produce, priced',
      ],
      faitsTitre: 'In practice',
      faits: '<b>3 to 5 days</b> spread over two or three weeks. A rulebook, not an image to interpret. <b>Our candour</b>: we know how to draw a logo and a brand sheet, and we do it when you ask. If your identity calls for a real studio, we say so and hand the brief to the designer of your choice.',
      preuvesTitre: 'Going further.',
      preuves: [
        { to: '/a-propos', t: 'Who we are', d: 'Two people on the same file: meaning and strategy on one side, technical work and tools on the other.', a: 'Meet us' },
        { to: '/methode', t: 'The method', d: 'The full journey, milestone by milestone. You can stop at the end of any stage.', a: 'See the method' },
      ],
      finTitre: 'Show us what you have, we will tell you what is missing.',
      finTexte: 'A first thirty-minute conversation. If your identity already stands up, we will say so rather than sell you a redesign.',
      finCta: 'Talk it through',
    },
  },
];


/* ============================================================
   LES TROIS PROFILS — c'est la page d'accueil.

   On ne demande pas au visiteur quelle offre il veut : personne ne sait
   répondre à ça. On lui demande QUI IL EST, parce que ça il le sait
   toujours, et parce que la réponse détermine réellement ce qu'on peut
   lui proposer. Un audit poste par poste chez une entreprise de trois
   personnes n'a aucun sens, et on préfère l'écrire que le vendre.

   Chaque porte ne montre que ce qui concerne CE profil. Deux offres au
   maximum : au-delà, on redevient un catalogue, et un catalogue ne range
   rien.
   ============================================================ */
export const PROFILS = [
  {
    id: 'createur',
    shape: 'createur',
    fr: {
      q: 'Vous montez un projet',
      taille: 'Avant le premier salarié',
      situation: 'Vous avez une idée, peut-être un début de dossier, et beaucoup de questions sans réponse. À ce stade, il n’y a rien à auditer : il y a un modèle à éprouver et une marque à poser.',
      offres: [
        { to: '/strategie-et-modele', nom: 'Stratégie et modèle', duree: '2 à 4 jours', quoi: 'Le besoin réel, le modèle économique, les chiffres qui nourriront votre dossier. La recherche de fournisseurs en option.' },
        { to: '/direction-artistique', nom: 'Direction artistique', duree: '3 à 5 jours', quoi: 'Le positionnement d’abord, les couleurs ensuite. Vous repartez avec des règles écrites, pas une image à interpréter.' },
      ],
      franchise: 'Ce qu’on ne vous proposera pas : un audit de vos outils. Vous n’en avez pas encore.',
    },
    en: {
      q: 'You are starting a project',
      taille: 'Before the first employee',
      situation: 'You have an idea, maybe the beginning of a file, and a lot of open questions. At this stage there is nothing to audit: there is a model to test and a brand to set.',
      offres: [
        { to: '/strategie-et-modele', nom: 'Strategy and model', duree: '2 to 4 days', quoi: 'The real need, the business model, the figures that will feed your file. Supplier sourcing as an option.' },
        { to: '/direction-artistique', nom: 'Art direction', duree: '3 to 5 days', quoi: 'Positioning first, colours second. You leave with written rules, not an image to interpret.' },
      ],
      franchise: 'What we will not offer you: an audit of your tools. You do not have any yet.',
    },
  },
  {
    id: 'tpe',
    shape: 'tpe',
    fr: {
      q: 'Vous faites tourner une TPE',
      taille: 'De 1 à 10 personnes',
      situation: 'Tout le monde se parle, les décisions se prennent vite, et le numérique n’est pas votre métier. Ce qu’il vous faut, c’est un site qui tienne debout et deux ou trois outils qui vous fassent gagner du temps.',
      offres: [
        { to: '/solutions-numeriques', nom: 'Solutions numériques', duree: '5 à 15 jours', quoi: 'Le site vitrine, la boutique, la prise de réservation. Et les liaisons entre les outils que vous avez déjà, pour arrêter les saisies en double.' },
        { to: '/direction-artistique', nom: 'Direction artistique', duree: '3 à 5 jours', quoi: 'Si votre image ne vous ressemble plus, ou si vous partez de rien.' },
      ],
      franchise: 'Ce qu’on ne vous proposera pas : un audit poste par poste. À cinq personnes, ça ne se fait pas, et on vous le dira plutôt que de vous le vendre.',
    },
    en: {
      q: 'You run a small business',
      taille: 'From 1 to 10 people',
      situation: 'Everyone talks to everyone, decisions are quick, and digital is not your trade. What you need is a website that stands up and two or three tools that save you time.',
      offres: [
        { to: '/solutions-numeriques', nom: 'Digital solutions', duree: '5 to 15 days', quoi: 'The website, the shop, the booking module. And the links between the tools you already have, to stop double entry.' },
        { to: '/direction-artistique', nom: 'Art direction', duree: '3 to 5 days', quoi: 'If your image no longer looks like you, or if you are starting from nothing.' },
      ],
      franchise: 'What we will not offer you: a desk-by-desk audit. At five people it makes no sense, and we will say so rather than sell it to you.',
    },
  },
  {
    id: 'pme',
    shape: 'pme',
    fr: {
      q: 'Vous dirigez une PME',
      taille: 'De 10 à 250 personnes',
      situation: 'Des logiciels partout, plus personne ne sait lequel fait quoi, et la même information est saisie trois fois. Là, il y a quelque chose à regarder avant de construire quoi que ce soit.',
      offres: [
        { to: '/audit-et-cartographie', nom: 'Audit et cartographie', duree: '2 à 5 jours', quoi: 'On rencontre chaque personne, on ouvre chaque abonnement, on suit une donnée d’un bout à l’autre. Vous recevez les chantiers chiffrés en jours, classés par gain.' },
        { to: '/solutions-numeriques', nom: 'Solutions numériques', duree: '5 à 15 jours', quoi: 'La mise en œuvre des chantiers que vous retenez, dans l’ordre que vous choisissez, et la formation des équipes.' },
      ],
      franchise: 'Ce qu’on ne fait pas : les ETI. À deux, on ne saurait pas suivre une structure de cette taille.',
    },
    en: {
      q: 'You run an SME',
      taille: 'From 10 to 250 people',
      situation: 'Software everywhere, nobody knows which one does what, and the same information is keyed in three times. Here, there is something to look at before building anything.',
      offres: [
        { to: '/audit-et-cartographie', nom: 'Audit and mapping', duree: '2 to 5 days', quoi: 'We meet every person, open every subscription, follow one piece of data end to end. You receive the work priced in days, ranked by gain.' },
        { to: '/solutions-numeriques', nom: 'Digital solutions', duree: '5 to 15 days', quoi: 'Delivery of the work you select, in the order you choose, and training for your teams.' },
      ],
      franchise: 'What we do not do: mid-caps. At two, we could not properly follow a structure that size.',
    },
  },
];

export const PAR_SLUG = Object.fromEntries(UNIVERS.map((u) => [u.slug, u]));

/* Les cinq âges d'un projet — la question qu'on pose au visiteur sur la
   home. On ne lui demande pas quelle offre il veut (il n'en sait rien),
   on lui demande où il en est (il le sait toujours). */
export const AGES = {
  fr: [
    ['La graine', 'Avant N0', 'Vous avez une idée et vous cherchez si elle tient.', '/strategie-et-modele'],
    ['La pousse', 'N0', 'Vous ouvrez : identité, site, premiers outils.', '/direction-artistique'],
    ['La floraison', 'N+1', 'L’activité tient et vos outils commencent à grincer.', '/solutions-numeriques'],
    ['L’arbre', 'N+3', 'Vous avez des équipes, et plus personne ne sait qui fait quoi.', '/audit-et-cartographie'],
    ['La forêt', 'Au-delà', 'Vous tenez seuls, et vous voulez que ça dure.', '/methode'],
  ],
  en: [
    ['The seed', 'Before Y0', 'You have an idea and you want to know if it holds.', '/strategie-et-modele'],
    ['The shoot', 'Y0', 'You open: identity, website, first tools.', '/direction-artistique'],
    ['The bloom', 'Y+1', 'Business holds and your tools start to creak.', '/solutions-numeriques'],
    ['The tree', 'Y+3', 'You have teams, and nobody knows who does what any more.', '/audit-et-cartographie'],
    ['The forest', 'Beyond', 'You stand on your own, and you want it to last.', '/methode'],
  ],
};
