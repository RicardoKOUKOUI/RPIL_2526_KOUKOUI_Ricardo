# 🎓 Mentor Matching App

Application web de recherche et de matching de mentors par compétences, disponibilité et filières académiques.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Python](https://img.shields.io/badge/python-3.8+-green.svg)
![License](https://img.shields.io/badge/license-MIT-orange.svg)

## 📋 Description

Cette application permet aux étudiants de trouver rapidement un mentor adapté à leurs besoins en fonction de :
- **Matières/Compétences** recherchées
- **Disponibilité horaire** (avec tolérance de ±60 minutes)
- **Filière académique** (Intelligence Artificielle, Sécurité Informatique, etc.)
- **Format de mentorat** (En ligne, Présentiel, Les deux)

Le système calcule automatiquement un **score de compatibilité** et trie les résultats pour présenter les meilleurs matchs en premier.

## 🎯 Fonctionnalités

✅ Recherche intelligente avec filtres multiples
✅ 7 filières supportées avec leurs matières spécifiques
✅ 12 mentors disponibles dans différents domaines
✅ Système de scoring automatique
✅ Interface responsive et moderne
✅ Mode démo intégré (fonctionne sans backend)
✅ API REST pour intégration facile
✅ Déploiement serverless sur Vercel

## 🏗️ Structure du projet

```
RPIL_2526_KOUKOUI_Ricardo/
├── frontend/              # Interface utilisateur
│   ├── index.html        # Page principale
│   ├── 404.html          # Page d'erreur
│   └── static/
│       ├── app.js        # Logique frontend
│       ├── style.css     # Styles personnalisés
│       └── logo.svg      # Logo de l'application
├── backend/              # Serveur Flask (développement local)
│   ├── app.py           # API Flask
│   ├── init_db.sql      # Script d'initialisation MySQL
│   └── requirements.txt # Dépendances Python
├── api/                 # Fonctions serverless (production)
│   └── match.py         # Endpoint de matching
├── vercel.json          # Configuration Vercel
├── .gitignore           # Fichiers à ignorer
├── .env.example         # Template variables d'environnement
├── DEPLOY.md            # Guide de déploiement
└── README.md            # Ce fichier
```

## 🚀 Installation et démarrage

### Prérequis

- Python 3.8+
- MySQL 5.7+ (pour le backend local)
- Git

### Installation rapide

1. **Cloner le projet**
```bash
git clone <votre-repo>
cd RPIL_2526_KOUKOUI_Ricardo
```

2. **Configurer la base de données**
```bash
mysql -u root -p < backend/init_db.sql
```

3. **Configurer l'environnement**
```bash
cp .env.example .env
# Éditer .env avec vos paramètres MySQL
```

4. **Installer les dépendances**
```bash
cd backend
python -m venv venv

# Windows
venv\Scripts\activate

# Linux/Mac
source venv/bin/activate

pip install -r requirements.txt
```

5. **Lancer le serveur**
```bash
python app.py
```

6. **Ouvrir l'interface**
Ouvrez `frontend/index.html` dans votre navigateur ou utilisez un serveur local :
```bash
cd frontend
python -m http.server 8000
# Puis ouvrir http://localhost:8000
```

## 🌐 Déploiement sur Vercel

Pour déployer l'application en production, consultez le guide détaillé : **[DEPLOY.md](DEPLOY.md)**

Résumé rapide :
1. Pousser le code sur GitHub
2. Connecter le dépôt sur Vercel
3. Vercel déploie automatiquement !

Vercel utilisera `vercel.json` pour configurer :
- `/api/match` via `api/match.py` (fonction serverless)
- Les fichiers statiques depuis `/frontend`

## 📡 API Documentation

### Endpoint : `POST /api/match`

Recherche des mentors correspondant aux critères.

**Payload JSON :**
```json
{
  "subjects": ["Machine Learning", "Programmation python"],
  "time": "14:00",
  "filiere": "Intelligence Artificielle",
  "format": "En ligne"
}
```

**Paramètres :**
- `subjects` (array) : Liste des matières recherchées
- `time` (string) : Heure souhaitée au format `HH:MM`
- `filiere` (string, optionnel) : Filière académique
- `format` (string, optionnel) : Format de mentorat ("En ligne", "Présentiel", "Les deux")

**Réponse :**
```json
{
  "results": [
    {
      "id": 1,
      "name": "Amina Ndiaye",
      "filiere": "Intelligence Artificielle",
      "format": "En ligne",
      "availabilities": ["09:00", "14:00", "17:30"],
      "common_subjects": ["Machine Learning", "Programmation python"],
      "score": 100
    }
  ]
}
```

## 🎨 Technologies utilisées

- **Frontend** : HTML5, CSS3, JavaScript ES6+, Bootstrap 5
- **Backend** : Python 3, Flask, PyMySQL
- **Base de données** : MySQL
- **Déploiement** : Vercel (serverless)
- **API** : REST JSON

## 📚 Filières supportées

1. Intelligence Artificielle
2. Sécurité Informatique
3. Système Embarqué & IoT
4. Génie Logiciel
5. Systèmes d'Information
6. Internet Multimedia
7. SIRI

## 👥 Mentors disponibles

L'application contient actuellement **12 mentors** couvrant différentes filières et compétences. Consultez `backend/init_db.sql` pour la liste complète.

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :
1. Fork le projet
2. Créer une branche (`git checkout -b feature/amelioration`)
3. Commit vos changements (`git commit -m 'Ajout fonctionnalité'`)
4. Push vers la branche (`git push origin feature/amelioration`)
5. Ouvrir une Pull Request

## 📝 License

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 📧 Contact

Pour toute question ou suggestion, n'hésitez pas à ouvrir une issue sur GitHub.

---

**Développé avec ❤️ pour faciliter le mentorat académique**
