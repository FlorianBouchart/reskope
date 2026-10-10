import { SUITE } from './intentions-suite.js';
/* ════════════════════════════════════════════════════════════
   LES PAGES PAR INTENTION — là où arrivent ceux qui cherchent.

   Retour d'un consultant SEO, relayé le 04/10/2026 : les visiteurs
   n'arrivent presque jamais par l'accueil. Ils arrivent par une recherche
   précise (« accompagnement création entreprise valenciennes », « business
   plan banque ») et restent une trentaine de secondes. Chaque page répond
   donc à UNE intention réellement tapée sur Google (relevé des suggestions
   du 04/10) et mène vite à l'action : réserver 30 minutes, être rappelé,
   écrire.

   Trois sortes de pages :
   - local : une prestation dans une ville, pour qui cherche quelqu'un ;
   - guide : pour qui se renseigne, et deviendra peut-être client ;
   - hub : la page qui rassemble les guides.

   On n'en fait pas des centaines : des pages qui ne changent que le nom de
   la ville sont des « pages satellites » pour Google, qui les déclasse.
   Chacune dit quelque chose de propre à sa ville ou à sa question.

   Règles : faits vérifiés, prix jamais chiffrés, jamais « on fait votre
   business plan » (on le construit avec vous), pas de tiret cadratin.
   Les montants et conditions des aides publiques changent : on renvoie
   aux sources officielles plutôt que de les recopier.
   ════════════════════════════════════════════════════════════ */

const RASSURE_CREATION = [
  'Un premier échange de 30 minutes offert, réponse sous 24 h',
  'Un prix fixe, écrit avant de commencer',
];

export const INTENTIONS = [
  {
    route: '/accompagnement-creation-entreprise-valenciennes',
    type: 'local',
    parent: '/creation',
    espace: 'creation',
    ville: 'Valenciennes',
    priorite: '0.9',
    fil: 'Valenciennes',
    titre: 'Accompagnement création d’entreprise, Valenciennes',
    description: 'Créer ou reprendre une entreprise à Valenciennes : on rencontre vos futurs clients, on construit votre business plan avec vous et on prépare la banque.',
    h1: 'Accompagnement à la création d’entreprise à Valenciennes',
    surtitre: 'Reskope Create · Valenciennes et le Valenciennois',
    accroche: 'Vous créez ou reprenez une entreprise dans le Valenciennois. On va voir vos futurs clients sur le terrain, on construit avec vous un business plan nourri de leurs réponses, et vous arrivez devant la banque avec des preuves.',
    points: [...RASSURE_CREATION, 'En rendez-vous dans le Valenciennois, ou en visio'],
    sections: [
      {
        titre: 'Ce qu’on fait pour vous, concrètement',
        texte: [
          'Tout part de la personne qui vous achètera. Avant de chiffrer quoi que ce soit, on rencontre une dizaine de vos futurs clients là où ils sont : dans leur commerce, sur leur lieu de travail, au téléphone. On leur pose des questions sur ce qu’ils vivent, pas sur votre idée.',
          'Avec leurs réponses, on construit avec vous votre business plan, chapitre par chapitre : votre client, votre offre et votre prix, vos chiffres sur trois ans, le financement et le plan pour aller chercher vos premiers clients. Puis on le relit comme la banque le lira, avant qu’elle le lise.',
        ],
      },
      {
        titre: 'Pourquoi commencer par vos futurs clients',
        texte: [
          'Un prévisionnel repose sur une hypothèse : que des gens achèteront, à ce prix, à cet endroit. Vos proches vous diront que l’idée est bonne ; ce ne sont pas eux qui paieront. Quelques semaines d’entretiens vous disent qui est vraiment votre client, ce qui le décide et ce qu’il faut lui dire.',
          'C’est aussi ce que cherche la banque : un chiffre d’affaires qui s’appuie sur quelque chose. Arriver avec les mots de vos clients change la conversation.',
        ],
      },
      {
        titre: 'Ce qui existe déjà à Valenciennes, et ce qu’on y ajoute',
        texte: [
          'Le Valenciennois ne manque pas d’appuis : la CCI, la chambre de métiers, les réseaux d’accompagnement, France Travail, l’agglomération et les organismes de microcrédit vous aident sur les démarches, la formation et le financement, souvent gratuitement. Allez-y.',
          'Ce qu’on ajoute, c’est le terrain : on va chercher la preuve chez vos clients, et on la met au service de votre dossier. Beaucoup de créateurs combinent les deux.',
        ],
        lien: { vers: '/guides/aides-creation-entreprise', texte: 'Le guide des aides à la création, à Valenciennes et à Lille' },
      },
      {
        titre: 'Où on vous rencontre',
        texte: [
          'À Valenciennes et dans tout le Valenciennois : Anzin, Saint-Saulve, Marly, Trith-Saint-Léger, Denain, Condé-sur-l’Escaut, Saint-Amand-les-Eaux. On se voit chez vous, sur le lieu de votre futur commerce, ou en visio si c’est plus simple.',
          'On accompagne aussi les créateurs de Lille et de sa métropole, avec la même méthode.',
        ],
        lien: { vers: '/accompagnement-creation-entreprise-lille', texte: 'L’accompagnement à la création d’entreprise à Lille' },
      },
    ],
    missions: ['idee', 'bp', 'dossier', 'clients'],
    faq: [
      { q: 'Combien coûte un accompagnement à la création d’entreprise ?', r: 'Chaque mission a un prix fixe, écrit dans une proposition avant de commencer, et plus rien ne bouge ensuite. Le premier échange de 30 minutes est offert : on vous dit ce qui vous servirait, et ce qui ne vous servirait pas.' },
      { q: 'La CCI et France Travail accompagnent gratuitement. Pourquoi faire appel à vous ?', r: 'Leur accompagnement est utile, et on vous conseille d’en profiter. On fait autre chose : on va interroger vos futurs clients sur le terrain, et on construit votre business plan à partir de leurs réponses. Les deux se complètent.' },
      { q: 'Combien de temps faut-il compter ?', r: 'Tester votre idée prend trois à quatre semaines, à raison d’une heure et demie de votre temps par semaine. Construire le business plan, quatre à six semaines. Relire un dossier avant la banque, une à deux semaines.' },
      { q: 'Vous rédigez le business plan à ma place ?', r: 'Non. On le construit avec vous, on le challenge et on le nourrit de ce que vos clients ont dit. C’est vous qui allez le défendre devant la banque : il doit rester le vôtre.' },
      { q: 'Je reprends une entreprise près de Valenciennes. Vous m’aidez aussi ?', r: 'Oui. Pour une reprise, la question décisive est de savoir si les clients resteront après le départ du cédant. On va le leur demander, puis on construit avec vous le dossier de reprise.' },
    ],
    liens: ['/reprise-entreprise-nord', '/guides/business-plan-banque', '/guides/etude-de-marche', '/tester-une-idee'],
    resume: 'Accompagnement à la création et à la reprise d’entreprise à Valenciennes et dans le Valenciennois (Anzin, Saint-Saulve, Marly, Trith-Saint-Léger, Denain, Saint-Amand-les-Eaux) : entretiens avec vos futurs clients sur le terrain, business plan construit avec vous à partir de leurs réponses, relecture du dossier avant la banque. Prix fixe écrit avant de commencer, premier échange de 30 minutes offert.',
  },

  {
    route: '/accompagnement-creation-entreprise-lille',
    type: 'local',
    parent: '/creation',
    espace: 'creation',
    ville: 'Lille',
    priorite: '0.9',
    fil: 'Lille',
    titre: 'Accompagnement création d’entreprise à Lille',
    description: 'Créer ou reprendre une entreprise à Lille : entretiens avec vos futurs clients, business plan construit avec vous, dossier prêt pour la banque.',
    h1: 'Accompagnement à la création d’entreprise à Lille',
    surtitre: 'Reskope Create · Lille et la métropole',
    accroche: 'À Lille, la concurrence est dense et les clients ont le choix. Avant d’engager vos économies, on va voir ceux qui devraient vous acheter, on construit avec vous un business plan qui part d’eux, et on prépare votre passage devant la banque.',
    points: [...RASSURE_CREATION, 'En rendez-vous dans la métropole lilloise, ou en visio'],
    sections: [
      {
        titre: 'Dans une métropole, tout se joue sur la cible',
        texte: [
          'Dans la métropole lilloise, presque chaque idée a déjà des concurrents à quelques rues. Ce qui fera la différence, c’est de savoir précisément pour qui vous existez : quel client, à quel moment de sa journée, dans quel quartier, à quel prix. Une cible floue se noie ; une cible précise se trouve.',
          'C’est ce que donnent les entretiens : au bout d’une dizaine de conversations avec vos futurs clients, les mêmes phrases reviennent. Elles disent qui vous achètera, pourquoi, et ce qui le ferait hésiter.',
        ],
      },
      {
        titre: 'Ce qu’on fait pour vous',
        texte: [
          'On mène les entretiens avec vos futurs clients et on en tire le portrait de votre client idéal. Puis on construit avec vous votre business plan : l’offre et le prix, un prévisionnel sur trois ans dont chaque chiffre a sa source, le financement et le plan pour vos premiers clients.',
          'Avant la banque ou le réseau de prêt, on relit le dossier avec les yeux de ceux qui vont le juger, et on vous prépare aux questions qu’ils vous poseront.',
        ],
      },
      {
        titre: 'Ce qui existe à Lille, et ce qu’on y ajoute',
        texte: [
          'La métropole a de quoi vous aider : la CCI, la chambre de métiers, les réseaux d’accompagnement, les incubateurs et France Travail accompagnent les démarches, la formation et le financement. Profitez-en.',
          'On ajoute le terrain : la preuve que des clients achèteront, recueillie auprès d’eux, et mise au service de votre dossier.',
        ],
        lien: { vers: '/guides/aides-creation-entreprise', texte: 'Le guide des aides à la création, à Valenciennes et à Lille' },
      },
      {
        titre: 'Où on vous rencontre',
        texte: [
          'À Lille et dans la métropole : Roubaix, Tourcoing, Villeneuve-d’Ascq, Lambersart, Marcq-en-Barœul, La Madeleine. On se voit sur le lieu de votre projet, chez vous, ou en visio.',
          'On accompagne aussi les créateurs du Valenciennois, avec la même méthode.',
        ],
        lien: { vers: '/accompagnement-creation-entreprise-valenciennes', texte: 'L’accompagnement à la création d’entreprise à Valenciennes' },
      },
    ],
    missions: ['idee', 'bp', 'dossier', 'clients'],
    faq: [
      { q: 'Vous êtes installés à Lille ?', r: 'On travaille à Valenciennes et à Lille. Dans la métropole lilloise, on vient sur le lieu de votre projet ou chez vous, et une partie du travail peut se faire en visio.' },
      { q: 'Je lance un projet numérique. Votre méthode s’applique ?', r: 'Oui. Une application ou un service en ligne a les mêmes questions à trancher : qui l’utilisera, qui paiera, et combien. Et quand il faudra construire le site ou l’outil, c’est aussi notre métier.' },
      { q: 'Combien coûte l’accompagnement ?', r: 'Chaque mission a un prix fixe, écrit avant de commencer. Le premier échange de 30 minutes est offert.' },
      { q: 'Mon projet est déjà bien avancé. C’est trop tard ?', r: 'Non. Si votre business plan est écrit, la relecture avant les financeurs prend une à deux semaines et deux heures de votre temps. Si vos premiers clients tardent à venir, on peut aller leur demander pourquoi.' },
    ],
    liens: ['/reprise-entreprise-nord', '/guides/business-plan-banque', '/guides/questions-futurs-clients', '/construire-votre-business-plan'],
    resume: 'Accompagnement à la création et à la reprise d’entreprise à Lille et dans la métropole (Roubaix, Tourcoing, Villeneuve-d’Ascq, Lambersart, Marcq-en-Barœul, La Madeleine) : entretiens avec vos futurs clients pour préciser votre cible, business plan construit avec vous, relecture du dossier avant la banque. Prix fixe écrit avant de commencer, premier échange de 30 minutes offert.',
  },

  {
    route: '/reprise-entreprise-nord',
    type: 'local',
    parent: '/creation',
    espace: 'creation',
    ville: 'Nord',
    priorite: '0.8',
    fil: 'Reprise d’entreprise',
    titre: 'Reprise d’entreprise à Valenciennes et Lille',
    description: 'Reprendre une entreprise dans le Nord : vérifier que ses clients resteront, construire le dossier de reprise avec vous et le préparer pour la banque.',
    h1: 'Reprendre une entreprise à Valenciennes, à Lille ou dans le Nord',
    surtitre: 'Reskope Create · reprise d’entreprise',
    accroche: 'Vous reprenez un commerce, un atelier ou une société. Les chiffres du cédant disent ce qui s’est passé ; ils ne disent pas si ses clients resteront avec vous. On va le leur demander, avant que vous signiez.',
    points: [...RASSURE_CREATION, 'Valenciennes, Lille et tout le Nord'],
    sections: [
      {
        titre: 'Le vrai risque d’une reprise : les clients qui partent avec le cédant',
        texte: [
          'Dans beaucoup de petites entreprises, les clients achètent autant une personne qu’un produit. Quand le cédant part, certains gardent leurs habitudes, d’autres non. C’est ce qui décide de votre chiffre d’affaires des premières années, et c’est rarement écrit dans le bilan.',
          'Avec l’accord du cédant, on interroge ses clients, fidèles, perdus et partis : ce qui les fait venir, ce qui les ferait partir, ce qu’ils attendent du nouveau dirigeant. Vous savez sur quoi vous pouvez compter, et ce qu’il faudra reconquérir.',
        ],
      },
      {
        titre: 'Le dossier de reprise, construit avec vous',
        texte: [
          'Avec ces réponses, on construit avec vous le dossier de reprise : ce que vous gardez, ce que vous changez, votre prévisionnel sur trois ans et son financement. Chaque hypothèse a sa source.',
          'Puis on le relit comme la banque le lira, et on vous prépare aux questions qu’on vous posera.',
        ],
      },
      {
        titre: 'Dans le Nord, de Valenciennes à Lille',
        texte: [
          'On accompagne les reprises dans le Valenciennois, dans la métropole lilloise et dans le reste du Nord. Les entretiens se font chez les clients, au téléphone ou en visio, selon ce qui les arrange.',
        ],
      },
    ],
    missions: ['clients', 'bp', 'dossier'],
    faq: [
      { q: 'Le cédant doit-il être d’accord pour que vous parliez à ses clients ?', r: 'Oui, toujours. On lui explique la démarche ; les clients savent pourquoi on les appelle et peuvent refuser, et on ne garde pas leurs coordonnées après la mission.' },
      { q: 'À quel moment faut-il faire cette étude ?', r: 'Avant de signer, ou au plus tard avant de boucler le financement. Ce que disent les clients peut changer le prix que vous êtes prêt à payer.' },
      { q: 'Combien de temps cela prend-il ?', r: 'Comprendre ce que pensent les clients prend trois à quatre semaines, à raison d’une heure et demie de votre temps par semaine. Le dossier de reprise, quatre à six semaines.' },
      { q: 'Combien coûte l’accompagnement d’une reprise ?', r: 'Un prix fixe, écrit avant de commencer, selon les missions dont vous avez besoin. Le premier échange de 30 minutes est offert.' },
    ],
    liens: ['/comprendre-vos-clients', '/guides/business-plan-banque', '/accompagnement-creation-entreprise-valenciennes', '/accompagnement-creation-entreprise-lille'],
    resume: 'Accompagnement à la reprise d’entreprise à Valenciennes, à Lille et dans le Nord : avec l’accord du cédant, entretiens avec ses clients pour savoir s’ils resteront, dossier de reprise et prévisionnel construits avec vous, relecture avant la banque. Prix fixe écrit avant de commencer.',
  },

  {
    route: '/guides',
    type: 'hub',
    espace: 'creation',
    priorite: '0.7',
    fil: 'Guides',
    titre: 'Guides pour créer ou reprendre une entreprise',
    description: 'Les guides de Reskope pour créer ou reprendre une entreprise : aides, étude de marché, business plan, banque, et les questions à poser à vos clients.',
    h1: 'Les guides pour créer ou reprendre une entreprise',
    surtitre: 'Guides · gratuits, sans adresse e-mail à donner',
    accroche: 'Ce qu’on explique à chaque premier rendez-vous, écrit une fois pour toutes. Lisez-les, servez-vous-en, et appelez-nous quand vous voulez aller plus loin.',
    liens: ['/guides/aides-creation-entreprise', '/guides/etude-de-marche', '/guides/questions-futurs-clients', '/guides/business-plan-banque', '/guides/previsionnel-financier', '/guides/business-plan-avec-ia', '/guides/reprendre-une-entreprise'],
    resume: 'Les guides gratuits de Reskope pour créer ou reprendre une entreprise à Valenciennes et à Lille : les aides à la création, l’étude de marché auprès de vrais clients, les 12 questions à poser à vos futurs clients, et ce que la banque regarde dans un business plan.',
  },

  {
    route: '/guides/aides-creation-entreprise',
    type: 'guide',
    parent: '/guides',
    espace: 'creation',
    priorite: '0.8',
    fil: 'Aides à la création',
    titre: 'Aides création d’entreprise, Valenciennes, Lille',
    description: 'Les aides pour créer ou reprendre une entreprise à Valenciennes et Lille : exonérations, allocations, prêts d’honneur, microcrédit, accompagnement gratuit.',
    h1: 'Les aides à la création d’entreprise, à Valenciennes et à Lille',
    surtitre: 'Guide · créer ou reprendre une entreprise',
    accroche: 'Exonérations, allocations, prêts, accompagnement : ce qui existe, à qui s’adresser, et ce que ces aides ne font pas à votre place. Les montants et les conditions changent souvent ; on vous renvoie aux sources officielles.',
    sections: [
      {
        titre: 'Vos cotisations sociales : l’ACRE',
        texte: ['L’aide à la création ou à la reprise d’une entreprise (ACRE) allège une partie de vos cotisations sociales pendant les premiers mois d’activité, sous conditions. Elle relève de l’Urssaf, et ses règles ont souvent changé : vérifiez votre situation avant de bâtir votre prévisionnel dessus.'],
        source: { texte: 'urssaf.fr', url: 'https://www.urssaf.fr/' },
      },
      {
        titre: 'Si vous touchez le chômage : garder vos allocations, ou en toucher une partie',
        texte: ['Inscrit à France Travail, vous pouvez en général continuer à percevoir une partie de vos allocations pendant le lancement, ou demander à en recevoir une partie en capital pour financer votre projet (l’ARCE). Les deux ne se cumulent pas : le bon choix dépend de ce que l’entreprise vous rapportera les premiers mois.'],
        source: { texte: 'francetravail.fr', url: 'https://www.francetravail.fr/' },
      },
      {
        titre: 'Les prêts d’honneur',
        texte: ['Des réseaux d’accompagnement accordent des prêts personnels à taux zéro, sans garantie, après présentation de votre projet. Ils renforcent votre apport, ce qui aide ensuite à obtenir un prêt bancaire. Il en existe dans le Valenciennois comme dans la métropole lilloise.'],
      },
      {
        titre: 'Le microcrédit',
        texte: ['Si la banque ne vous suit pas, l’Adie finance de petits projets par microcrédit, avec un accompagnement avant et après le lancement. Elle a des agences dans le Nord, dont une à Valenciennes.'],
        source: { texte: 'adie.org', url: 'https://www.adie.org/' },
      },
      {
        titre: 'Les garanties de Bpifrance',
        texte: ['Bpifrance peut garantir une partie d’un prêt bancaire, ce qui rassure la banque sur un projet jeune. La demande passe par votre banque.'],
        source: { texte: 'bpifrance-creation.fr', url: 'https://bpifrance-creation.fr/' },
      },
      {
        titre: 'L’accompagnement gratuit ou peu cher',
        texte: ['La CCI, la chambre de métiers et de l’artisanat, les boutiques de gestion (BGE) et les agglomérations proposent des rendez-vous, des formations à la création et de l’aide aux démarches. Valenciennes Métropole a un service dédié aux créateurs ; dans la métropole lilloise, la CCI Grand Lille est un bon point de départ.'],
        source: { texte: 'valenciennes-metropole.fr', url: 'https://www.valenciennes-metropole.fr/investir-entreprendre/services-aux-entreprises/je-cree-mon-entreprise/' },
      },
      {
        titre: 'Ce que ces aides ne font pas',
        texte: ['Aucune de ces aides ne vous dit si des clients achèteront. C’est pourtant la question que la banque, le réseau de prêt et vous-même vous posez. C’est là qu’on intervient : on va voir vos futurs clients, et on met leurs réponses au service de votre dossier, pour qu’il convainque ceux qui financent.'],
      },
    ],
    missions: ['idee', 'bp', 'dossier'],
    faq: [
      { q: 'Peut-on cumuler plusieurs aides ?', r: 'Souvent, oui : une exonération de cotisations, un prêt d’honneur et un prêt bancaire garanti se combinent régulièrement. Les règles de cumul dépendent de votre situation ; vérifiez-les auprès de chaque organisme avant de les inscrire dans votre prévisionnel.' },
      { q: 'Les aides suffisent-elles à financer un projet ?', r: 'Rarement à elles seules. Elles complètent votre apport et un prêt bancaire. C’est pour ça que le dossier doit convaincre : une aide accordée ne remplace pas un client qui achète.' },
      { q: 'Vous montez les demandes d’aides à ma place ?', r: 'Non : les organismes qui les accordent vous accompagnent sur ces démarches. On s’occupe de ce qu’ils ne font pas : prouver que votre projet a des clients, et construire avec vous le business plan qui le montre.' },
    ],
    liens: ['/guides/business-plan-banque', '/accompagnement-creation-entreprise-valenciennes', '/accompagnement-creation-entreprise-lille', '/relire-votre-dossier'],
    resume: 'Guide des aides à la création et à la reprise d’entreprise, à Valenciennes et à Lille : l’ACRE (Urssaf), le maintien des allocations ou l’ARCE (France Travail), les prêts d’honneur, le microcrédit de l’Adie, les garanties de Bpifrance, l’accompagnement de la CCI, de la chambre de métiers, des BGE et de Valenciennes Métropole. Et ce que ces aides ne font pas : prouver que des clients achèteront.',
  },

  {
    route: '/guides/business-plan-banque',
    type: 'guide',
    parent: '/guides',
    espace: 'creation',
    priorite: '0.8',
    fil: 'Business plan et banque',
    titre: 'Business plan : ce que la banque regarde vraiment',
    description: 'Ce qu’un banquier lit en premier dans un business plan, les erreurs qui font refuser un prêt, et comment préparer le rendez-vous. Le guide de Reskope.',
    h1: 'Business plan : ce que la banque regarde vraiment',
    surtitre: 'Guide · financer votre projet',
    accroche: 'Un banquier lit beaucoup de dossiers. Il ne cherche pas un beau document : il cherche à savoir si vous pourrez rembourser. Voici ce qu’il regarde, dans l’ordre, et les erreurs qu’on voit le plus souvent.',
    sections: [
      {
        titre: 'D’abord vous, et la cohérence du projet',
        texte: ['Avant les chiffres, le banquier regarde la personne et l’histoire : votre parcours, votre lien avec le métier, et si le projet tient debout d’un bout à l’autre. Une offre pensée pour un client précis, un prix cohérent avec ce client, un emplacement cohérent avec ce prix.'],
      },
      {
        titre: 'D’où vient votre chiffre d’affaires',
        texte: ['C’est la question qui revient toujours. Un chiffre d’affaires sorti d’un tableur ne convainc personne ; un chiffre qui s’appuie sur des clients interrogés, des prix testés et une zone de chalandise mesurée, si. Chaque hypothèse doit avoir sa source.'],
      },
      {
        titre: 'Votre apport, et le financement',
        texte: ['Le banquier regarde ce que vous mettez vous-même, et comment le reste est financé. Un apport renforcé par un prêt d’honneur, une garantie, des aides obtenues : tout ce qui réduit son risque compte.'],
        lien: { vers: '/guides/aides-creation-entreprise', texte: 'Les aides qui renforcent votre apport' },
      },
      {
        titre: 'La trésorerie des premiers mois',
        texte: ['Beaucoup de dossiers oublient le temps qu’il faut pour que les ventes arrivent, les stocks à financer, les clients qui paient en retard. Un plan de trésorerie mois par mois sur la première année montre que vous avez vu venir les creux.'],
      },
      {
        titre: 'Le seuil de rentabilité, et votre revenu',
        texte: ['À partir de quel chiffre d’affaires l’entreprise couvre-t-elle ses charges, et quand pourrez-vous vous verser un revenu ? Si la réponse est floue, la banque le verra.'],
      },
      {
        titre: 'Les erreurs qu’on voit le plus souvent',
        liste: [
          'Un chiffre d’affaires sans source',
          'Des charges oubliées : assurances, expert-comptable, logiciels, entretien',
          'Aucun revenu prévu pour vous',
          'Une trésorerie qui passe sous zéro sans que personne l’ait vu',
          'Un dossier qu’on ne sait pas défendre à l’oral',
        ],
      },
      {
        titre: 'Comment on vous aide',
        texte: ['On construit avec vous le business plan en partant de votre client, puis on le relit comme la banque le lira. Thomy a accompagné pendant deux ans des créateurs jusqu’à ce rendez-vous : elle sait ce qu’un financeur lit en premier.'],
      },
    ],
    missions: ['bp', 'dossier'],
    faq: [
      { q: 'Faut-il un business plan pour emprunter ?', r: 'Pour un prêt de création ou de reprise, oui, presque toujours. Les réseaux de prêt d’honneur le demandent aussi. C’est surtout l’outil qui vous permet, à vous, de vérifier que le projet tient.' },
      { q: 'Combien de pages doit-il faire ?', r: 'Assez pour répondre aux questions ci-dessus, pas plus. Un dossier clair et sourcé vaut mieux qu’un document épais : le banquier cherche des réponses, pas du volume.' },
      { q: 'Vous écrivez le business plan à ma place ?', r: 'Non. On le construit avec vous, on le challenge et on le nourrit de ce que vos clients ont dit. C’est vous qui le défendrez : il doit rester le vôtre.' },
      { q: 'Mon dossier est déjà écrit. Vous pouvez le relire ?', r: 'Oui, c’est la mission « Relire votre dossier » : une à deux semaines, deux heures de votre temps, et des retours classés du bloquant au détail, avec les questions qu’on vous posera.' },
    ],
    liens: ['/guides/etude-de-marche', '/guides/aides-creation-entreprise', '/construire-votre-business-plan', '/relire-votre-dossier'],
    resume: 'Ce qu’un banquier regarde dans un business plan : la cohérence du projet et la personne, l’origine du chiffre d’affaires, l’apport et le financement, la trésorerie des premiers mois, le seuil de rentabilité et le revenu du dirigeant. Les erreurs les plus fréquentes, et comment Reskope construit le business plan avec vous puis le relit avant la banque.',
  },

  {
    route: '/guides/etude-de-marche',
    type: 'guide',
    parent: '/guides',
    espace: 'creation',
    priorite: '0.8',
    fil: 'Étude de marché',
    titre: 'Étude de marché : la faire auprès de vrais clients',
    description: 'Comment faire une étude de marché utile pour créer votre entreprise : les entretiens avec de vrais clients, les questions à poser, ce qu’on en tire.',
    h1: 'Étude de marché : la faire auprès de vrais clients',
    surtitre: 'Guide · tester votre idée',
    accroche: 'Une étude de marché faite de chiffres trouvés en ligne dit la taille du marché. Elle ne dit pas si vos clients achèteront chez vous. Pour le savoir, il faut aller leur parler. Voici comment.',
    sections: [
      {
        titre: 'Deux études, deux questions',
        texte: ['L’étude documentaire répond à « combien de clients possibles, et quelle concurrence ? » : les statistiques publiques, les annuaires et les études de branche suffisent. L’étude terrain répond à « qui achètera chez moi, pourquoi, et à quel prix ? » : seules les conversations avec vos futurs clients y répondent.'],
      },
      {
        titre: 'Qui interroger, et combien',
        texte: ['Des personnes qui vivent le problème que vous voulez régler, pas vos proches. Au bout de dix à douze entretiens, les mêmes phrases reviennent : c’est votre client idéal qui parle.'],
      },
      {
        titre: 'Les trois règles d’un bon entretien',
        liste: [
          'Parlez de leur vie, pas de votre idée : si vous présentez votre projet, on vous fera des compliments, pas des réponses.',
          'Demandez ce qu’ils ont fait, pas ce qu’ils feraient : le passé dit la vérité, les intentions rarement.',
          'Écoutez plus que vous ne parlez : un bon entretien, c’est l’autre qui parle presque tout le temps.',
        ],
      },
      {
        titre: 'Les questions à ne jamais poser',
        liste: [
          '« Vous achèteriez ça ? » Tout le monde dit oui, personne n’achète.',
          '« Combien vous seriez prêt à payer ? » Personne ne le sait avant d’avoir payé.',
          '« Vous trouvez que c’est une bonne idée ? » On vous répondra pour vous faire plaisir.',
        ],
        lien: { vers: '/guides/questions-futurs-clients', texte: 'Les 12 questions à poser à la place' },
      },
      {
        titre: 'Ce que vous en tirez',
        texte: ['Le portrait de votre client idéal, l’endroit où le trouver, les mots qui le font venir, et vos hypothèses avec leur verdict. Ce sont ces phrases qui doivent écrire votre offre, votre prix et le chapitre « marché » de votre business plan.'],
      },
      {
        titre: 'Si vous préférez qu’on la mène pour vous',
        texte: ['C’est la mission « Tester votre idée » : trois à quatre semaines, une heure et demie de votre temps par semaine, un prix fixe écrit avant de commencer. Et si la synthèse ne vous apprend rien, vous ne la payez pas.'],
      },
    ],
    missions: ['idee', 'clients'],
    faq: [
      { q: 'La banque demande une étude de marché. Des chiffres trouvés en ligne suffisent ?', r: 'Ils sont utiles pour la taille du marché et la concurrence. Mais la banque veut surtout savoir d’où vient votre chiffre d’affaires : des clients interrogés, des prix testés et une zone de chalandise mesurée la convainquent bien mieux.' },
      { q: 'Combien d’entretiens faut-il faire ?', r: 'Dix à douze, en général. Au-delà, les mêmes réponses reviennent ; en deçà, vous risquez de prendre une exception pour une règle.' },
      { q: 'Et un questionnaire en ligne ?', r: 'Il sert à compter, une fois que vous savez quoi compter. Pour comprendre ce qui décide un client, rien ne remplace une conversation.' },
    ],
    liens: ['/guides/questions-futurs-clients', '/guides/business-plan-banque', '/tester-une-idee', '/comprendre-vos-clients'],
    resume: 'Comment faire une étude de marché utile avant de créer une entreprise : la différence entre étude documentaire et étude terrain, qui interroger et combien (dix à douze entretiens), les trois règles d’un bon entretien, les questions à ne jamais poser, et ce qu’on en tire pour l’offre, le prix et le business plan.',
  },

  {
    route: '/guides/questions-futurs-clients',
    type: 'guide',
    parent: '/guides',
    espace: 'creation',
    priorite: '0.7',
    fil: 'Les 12 questions',
    titre: 'Les 12 questions à poser à vos futurs clients',
    description: 'Le guide gratuit de Reskope : les 12 questions à poser à vos futurs clients avant de créer votre entreprise, les 3 règles et les 3 questions à éviter.',
    h1: 'Les 12 questions à poser à vos futurs clients',
    surtitre: 'Guide gratuit · à utiliser dès cette semaine',
    accroche: 'Avant d’investir vos économies ou un prêt, vérifiez que des gens achèteront vraiment. Ce sont les questions qu’on utilise en entretien, en version courte. Le guide existe aussi en PDF, sans adresse e-mail à donner.',
    pdf: true,
    sections: [
      {
        titre: 'Trois règles avant de commencer',
        liste: [
          'Parlez de leur vie, pas de votre idée. Si vous présentez votre projet, on vous fera des compliments, pas des réponses.',
          'Demandez ce qu’ils ont fait, pas ce qu’ils feraient. Le passé dit la vérité ; les intentions, rarement.',
          'Écoutez plus que vous ne parlez. Un bon entretien, c’est l’autre qui parle presque tout le temps.',
        ],
      },
      {
        titre: 'Le problème est-il réel ?',
        liste: [
          '« Racontez-moi la dernière fois que ce problème vous est arrivé. »',
          '« Qu’est-ce qui a été le plus pénible, ce jour-là ? »',
          '« Ça vous arrive souvent ? À quand remonte la dernière fois ? »',
        ],
      },
      {
        titre: 'Comment ils font aujourd’hui',
        liste: [
          '« Comment vous débrouillez-vous aujourd’hui ? »',
          '« Qu’avez-vous déjà essayé pour régler ça, et pourquoi ça n’a pas marché ? »',
          '« Combien ça vous coûte aujourd’hui, en temps ou en argent ? »',
        ],
      },
      {
        titre: 'Comment ils décident d’acheter',
        liste: [
          '« La dernière fois que vous avez payé pour régler ce genre de problème, comment avez-vous choisi ? »',
          '« Qui d’autre a son mot à dire avant d’acheter ? »',
          '« Qu’est-ce qui vous ferait changer de solution demain ? »',
        ],
      },
      {
        titre: 'Où les trouver, et la suite',
        liste: [
          '« Où cherchez-vous quand vous avez ce genre de besoin ? »',
          '« Qui d’autre vit la même chose ? Vous pourriez me le présenter ? »',
          '« Je peux revenir vers vous quand j’aurai quelque chose à vous montrer ? »',
        ],
      },
      {
        titre: 'Les trois questions à ne jamais poser',
        liste: [
          '« Vous achèteriez ça ? » Tout le monde dit oui, personne n’achète.',
          '« Combien vous seriez prêt à payer ? » Personne ne le sait avant d’avoir payé.',
          '« Vous trouvez que c’est une bonne idée ? » On vous répondra pour vous faire plaisir.',
        ],
      },
      {
        titre: 'Après l’entretien',
        texte: ['Notez les phrases exactes, pas votre interprétation. Au bout de dix à douze entretiens, les mêmes phrases reviennent : c’est votre client idéal qui parle. Ce sont elles qui doivent écrire votre offre, votre prix et vos premiers messages.'],
      },
    ],
    missions: ['idee', 'clients'],
    faq: [
      { q: 'Je peux utiliser ces questions pour une reprise d’entreprise ?', r: 'Oui, avec les clients du cédant et avec son accord. La question « Qu’est-ce qui vous ferait changer de solution demain ? » y prend tout son sens.' },
      { q: 'Et si je n’ose pas aller voir des inconnus ?', r: 'Commencez par trois personnes qui vivent le problème sans vous connaître de près : collègues de collègues, clients d’un commerce voisin. Ou confiez-nous les entretiens : c’est la mission « Tester votre idée ».' },
    ],
    liens: ['/guides/etude-de-marche', '/tester-une-idee', '/comprendre-vos-clients', '/guides/business-plan-banque'],
    resume: 'Le guide gratuit de Reskope pour interroger ses futurs clients avant de créer une entreprise : trois règles d’entretien, douze questions en quatre blocs (le problème est-il réel, comment ils font aujourd’hui, comment ils décident d’acheter, où les trouver), trois questions à ne jamais poser, et quoi faire après l’entretien. Disponible aussi en PDF, sans adresse e-mail.',
  },

  /* Les pages ajoutées le 10/10/2026 (conseil numérique, étude de marché,
     reprise, prévisionnel, zone d'intervention) : data/intentions-suite.js. */
  ...SUITE,
];

const PAR_ROUTE = Object.fromEntries(INTENTIONS.map((p) => [p.route, p]));
/** La page par intention d'une adresse, ou null. */
export const intention = (route) => PAR_ROUTE[route] || null;
