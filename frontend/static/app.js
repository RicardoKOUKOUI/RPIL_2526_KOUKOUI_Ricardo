// Frontend JS: envoie la requête au backend POST /api/match
const FILIERES_MATIERE = {
  'Sécurité Informatique': [
    'Sécurité des réseaux',
    'Cryptographie',
    'Audit, normes et gestion des risques',
    'Pentesting',
    'Sécurité applicative',
    'Politique de sécurité des systèmes d’information',
    'Commutation et routage',
    'Routage WAN et sécurité',
    'Sécurité des systèmes informatiques',
    'Management de la sécurité du système d’information',
    'Sécurité des réseaux',
    'Filtrage des accès',
    'Etude des protocoles',
    'Administration des réseaux TCP/IP sous Windows',
    'Administration des réseaux TCP/IP sous Linux/Unix'
  ],
  'Intelligence Artificielle': [
    'Mathématiques fondamentales',
    'Probabilité et statistique',
    'Statistiques et probabilités pour le scientifique de la donnée',
    'Base de la programmation',
    'Programmation python',
    'Architecture et topologie des réseaux informatiques',
    'Statistiques et probabilités',
    'Big Data',
    'Outils cloud de collecte et de traitement des données',
    'Concepts et applications de l’apprentissage automatique',
    'Vision par ordinateur',
    'Traitement automatique du langage naturel',
    'Machine Learning',
    'Data analytics',
    'Data science',
    'Communication',
    'Techniques entrepreneuriales',
    'Gestion des projets'
  ],
  'Système Embarqué & IoT': [
    'Administration des réseaux sous Windows/Linux',
    'Convergence et calcul différentiel',
    'Projet intégrateur',
    'Mathématiques appliquées',
    'Technologies web et infographie',
    'Base de données relationnelles',
    'Programmation python',
    'Architecture et intercommunication d’un réseau de capteurs et Internet des objets',
    'Veille technologique en systèmes embarqués et Internet des objets',
    'Administration d’un réseau de capteurs et Internet des objets',
    'Systèmes embarqués en entreprise',
    'Programmation système, réseau et temps réel',
    'Langages de description',
    'Électricité et électronique',
    'Maintenance des appareils électroniques',
    'Formation sur une certification en systèmes embarqués et Internet des objets',
    'Communication managériale',
    'Anglais pour la communication scientifique'
  ],
  'Génie Logiciel': [
    'Algèbre matricielle et applications avec Matlab',
    'Analyse',
    'Logique et techniques de preuves',
    'Mathématiques discrètes',
    'Numération',
    'Probabilités',
    'Statistiques inférentielles et applications avec Matlab',
    'Histoire de l’informatique',
    'Aspects juridiques liés aux systèmes d’information',
    'Introduction aux architectures client-serveur',
    'Installation des réseaux informatiques',
    'Code linguistique',
    'Pratique de la langue anglaise',
    'Théorie des systèmes d’exploitation',
    'Introduction à l’administration sous Windows',
    'Introduction à l’administration sous Linux/Unix',
    'Algorithmique',
    'Introduction au langage C',
    'Architecture et technologie des ordinateurs',
    'Maintenance informatique',
    'Séries numériques et séries de fonctions',
    'Équations différentielles',
    'Logique mathématique',
    'Théorie des graphes et applications',
    'Recherche opérationnelle et applications',
    'Algèbre de Boole et circuits logiques',
    'Théorie des bases de données relationnelles',
    'Algèbre relationnelle',
    'Introduction au langage SQL',
    'Introduction aux systèmes d’exploitation pour mobile',
    'Virtualisation',
    'Aspects avancés du langage SQL',
    'Initiation à MySQL et PostgreSQL',
    'Aspects avancés du langage C et structures des données',
    'Projet tutoré',
    'Architecture du Web',
    'Langages de programmation Web',
    'Séminaire : XHTML, CSS, Javascript, Ajax, PHP, MySQL',
    'Projet technologie Web',
    'Assurance qualité d’un logiciel',
    'Test de logiciel',
    'Maintenance et évolution de logiciel',
    'Introduction pratique à la maintenance des téléphones portables'
  ],
  'Systèmes d’Information': [
    'Logique, arithmétique et applications',
    'Mathématiques fondamentales',
    'Probabilité et statistique',
    'Analyse combinatoire, calcul des probabilités et applications',
    'Statistiques inférentielles et applications',
    'Architecture et topologie des réseaux informatiques',
    'Système d’exploitation et outils de base en informatique',
    'Utilisation et administration sous Windows/Linux',
    'Outils de base en informatique',
    'Base de la programmation',
    'Langages C',
    'Déontologie et droit liés aux TIC',
    'Techniques d’expression écrite et orale',
    'Administration des réseaux sous Windows/Linux',
    'Convergence et calcul différentiel',
    'Projet intégrateur',
    'Mathématiques appliquées',
    'Technologies web et infographie',
    'Base de données relationnelles',
    'Programmation python',
    'Anglais technique et discipline',
    'Structures algébriques et leurs applications en informatique',
    'Approche orientée objet',
    'Structure de données et applications avec C/Python',
    'Administration systèmes et réseaux',
    'Administration système et réseaux sous Windows',
    'Administration système et réseaux sous Linux',
    'Sécurité des systèmes informatiques',
    'Management de la sécurité du système d’information',
    'Sécurité des réseaux',
    'Maintenance des appareils électroniques',
    'Politique de sécurité des systèmes d’information',
    'Commutation et routage',
    'Projet de validation des acquis',
    'Infographie et introduction à l’ergonomie',
    'Mini-stage en entreprise',
    'Rédaction du rapport de stage'
  ],
  'Internet Multimedia': [
    'Web design',
    'HTML/CSS',
    'Multimédia',
    'UX/UI',
    'JavaScript',
    'Technologies web et infographie',
    'Développement web',
    'Infographie',
    'Bandes dessinées numériques',
    'Production multimédia'
  ],
  'SIRI': [
    'Systèmes d’information',
    'Réseaux',
    'Sécurité',
    'Intégration',
    'Développement',
    'Gestion des projets',
    'Communication',
    'Techniques entrepreneuriales'
  ]
};

function renderSubjectChecklist(subjects) {
  const container = document.getElementById('subjectsContainer');
  container.innerHTML = '';
  if (!subjects || subjects.length === 0) {
    container.innerHTML = '<p class="text-muted mb-0">Sélectionnez une filière pour afficher les matières.</p>';
    return;
  }
  subjects.forEach((subject, index) => {
    const id = `subject-check-${index}`;
    const checkbox = document.createElement('div');
    checkbox.className = 'form-check';
    checkbox.innerHTML = `
      <input class="form-check-input" type="checkbox" value="${subject}" id="${id}" checked>
      <label class="form-check-label" for="${id}">${subject}</label>
    `;
    container.appendChild(checkbox);
  });
}

document.getElementById('filiere').addEventListener('change', (e) => {
  const filiere = e.target.value;
  renderSubjectChecklist(FILIERES_MATIERE[filiere]);
});

document.getElementById('searchForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const time = document.getElementById('time').value || '';
  const filiere = document.getElementById('filiere').value || '';
  const format = document.getElementById('format').value || '';
  const subjects = Array.from(document.querySelectorAll('#subjectsContainer input[type=checkbox]:checked')).map(el => el.value.trim()).filter(Boolean);
  const payload = { subjects, time, filiere, format };
  showMessage('Recherche en cours...', 'info');

  try {
    const res = await fetch('/api/match', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error('backend error');
    const data = await res.json();
    renderResults(data.results);
  } catch (err) {
    // fallback demo
    const demo = demoMatch(payload);
    renderResults(demo);
  }
});

function showMessage(text, type='muted'){
  const r = document.getElementById('results');
  r.innerHTML = `<p class="text-${type}">${text}</p>`;
}

function renderResults(list){
  const r = document.getElementById('results');
  if (!list || list.length===0) { r.innerHTML = '<p class="text-warning">Aucun mentor trouvé.</p>'; return; }
  r.innerHTML = '';
  list.forEach(m => {
    const div = document.createElement('div');
    div.className = 'mentor-card mb-3';
    const common = (m.common_subjects||[]).map(s=>`<span class="badge bg-secondary badge-subject">${s}</span>`).join(' ');
    div.innerHTML = `
      <div class="d-flex justify-content-between">
        <div><h5>${m.name}</h5>${common}</div>
        <div class="score text-primary">Score: ${m.score ?? 'N/A'}</div>
      </div>
      <div class="small text-muted">Disponibilités: ${m.availabilities.join(', ')}</div>
      <div class="small">Format: ${m.format}</div>
    `;
    r.appendChild(div);
  });
}

// Demo data and matching used when backend is absent
const DEMO_MENTORS = [
  { name: 'Amina', subjects: ['Math','Physique'], availabilities:['09:00','14:00'], filiere:'Sciences', format:'En ligne' },
  { name: 'Jean', subjects: ['Programmation','Math'], availabilities:['10:00','16:00'], filiere:'Informatique', format:'Présentiel' },
  { name: 'Sophie', subjects: ['Chimie','Biologie'], availabilities:['11:00','18:00'], filiere:'Biologie', format:'Les deux' }
];

function timeToMinutes(t){ if(!t) return null; const [hh,mm]=t.split(':').map(Number); return hh*60+mm; }

function demoMatch({subjects, time}){
  const tmin = timeToMinutes(time);
  return DEMO_MENTORS.map(m => {
    const common = m.subjects.filter(s => subjects.map(x=>x.toLowerCase()).includes(s.toLowerCase()));
    let timeMatch = false;
    if (tmin!==null){
      for(const a of m.availabilities){
        const am = timeToMinutes(a);
        if (Math.abs(am - tmin) <= 60) { timeMatch = true; break; }
      }
    }
    const score = (common.length>0 && (tmin===null || timeMatch)) ? Math.round((common.length / Math.max(1, subjects.length)) * 100) : 0;
    return { name: m.name, common_subjects: common, availabilities: m.availabilities, format: m.format, score };
  }).filter(x => x.score>0);
}

// initialisation de la checklist si une filière est déjà sélectionnée
renderSubjectChecklist(FILIERES_MATIERE[document.getElementById('filiere').value]);
