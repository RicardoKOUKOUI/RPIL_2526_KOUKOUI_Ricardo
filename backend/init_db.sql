CREATE DATABASE IF NOT EXISTS mentorapp CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE mentorapp;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  email VARCHAR(150) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  filiere VARCHAR(100),
  role VARCHAR(50) DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS mentors (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  filiere VARCHAR(100),
  subjects TEXT NOT NULL,
  availabilities TEXT NOT NULL,
  format VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS mentor_matches (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  mentor_id INT NOT NULL,
  matched_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (mentor_id) REFERENCES mentors(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insertion des mentors
INSERT INTO mentors (name, filiere, subjects, availabilities, format) VALUES
('Amina Ndiaye', 'Intelligence Artificielle', 'Mathématiques fondamentales,Programmation python,Machine Learning,Vision par ordinateur', '09:00,14:00,17:30', 'En ligne'),
('Jean Dupont', 'Système Embarqué & IoT', 'Programmation python,Systèmes embarqués en entreprise,Programmation système, réseau et temps réel,Électricité et électronique', '10:00,15:30', 'Présentiel'),
('Sophie Martin', 'Sécurité Informatique', 'Cryptographie,Sécurité des réseaux,Pentesting,Sécurité applicative', '11:00,18:00', 'Les deux'),
('Kofi Mensah', 'Intelligence Artificielle', 'Probabilité et statistique,Data science,Big Data,Traitement automatique du langage naturel', '08:00,13:00,16:00', 'En ligne'),
('Marie Dubois', 'Génie Logiciel', 'Algorithmique,Introduction au langage C,Architecture du Web,Test de logiciel', '09:30,14:30,18:30', 'Les deux'),
('Ahmed Ben Ali', 'Sécurité Informatique', 'Audit, normes et gestion des risques,Filtrage des accès,Administration des réseaux TCP/IP sous Linux/Unix,Sécurité des systèmes informatiques', '10:30,15:00,19:00', 'Présentiel'),
('Fatou Diop', 'Système Embarqué & IoT', 'Architecture et intercommunication d'un réseau de capteurs et Internet des objets,Langages de description,Maintenance des appareils électroniques', '11:30,16:30', 'En ligne'),
('Pierre Lefebvre', 'Systèmes d'Information', 'Base de données relationnelles,Administration système et réseaux sous Windows,Sécurité des systèmes informatiques,Commutation et routage', '08:30,13:30,17:00', 'Les deux'),
('Aïcha Traoré', 'Intelligence Artificielle', 'Statistiques et probabilités pour le scientifique de la donnée,Concepts et applications de l'apprentissage automatique,Data analytics,Gestion des projets', '09:00,15:00,18:00', 'En ligne'),
('Carlos Silva', 'Internet Multimedia', 'Web design,HTML/CSS,JavaScript,UX/UI,Infographie', '10:00,14:00,19:30', 'Les deux'),
('Yuki Tanaka', 'Génie Logiciel', 'Théorie des bases de données relationnelles,Langages de programmation Web,Assurance qualité d'un logiciel,Maintenance et évolution de logiciel', '08:00,12:00,16:00', 'Présentiel'),
('Léa Rousseau', 'SIRI', 'Systèmes d'information,Réseaux,Intégration,Développement,Communication', '11:00,15:30,20:00', 'En ligne')
ON DUPLICATE KEY UPDATE name=name;

-- Made with Bob
