CREATE SCHEMA IF NOT EXISTS `anecdotes_BDD` DEFAULT CHARACTER SET utf8mb3;

USE `anecdotes_BDD`;


-- Table des utilisateurs
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  pseudo VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  profilPicture TEXT
);
INSERT INTO users (pseudo, email, profilPicture) VALUES
  ("Albert", "albert@example.com", "https://cdn.example.com/avatar/albert.png"),
  ("Chloé", "chloe@example.com", "https://cdn.example.com/avatar/chloe.png"),
  ("Tonton Roger", "roger@example.com", "https://cdn.example.com/avatar/roger.png");

-- Table des catégories
CREATE TABLE categories (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL
);

INSERT INTO categories (name) VALUES
  ("Vie urbaine"),
  ("Tech"),
  ("Boulot");


-- Table des anecdotes
CREATE TABLE anecdotes (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  date DATE NOT NULL,
  genre VARCHAR(100),
  content TEXT NOT NULL,
  user_id INT NOT NULL,
  category_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);

INSERT INTO anecdotes (title, date, genre, content, user_id, category_id) VALUES
(
  "Le jour où j’ai failli effacer la base prod",
  "2024-10-12",
  "Tech",
  "J’étais en train de faire un `DELETE FROM` en pensant être en local... sauf que non. Heureusement, j’ai bloqué à temps. Depuis, je vérifie 3 fois le terminal avant d’appuyer sur Entrée.",
  1, 2
),
(
  "Une course poursuite avec un pigeon",
  "2023-05-22",
  "Vie urbaine",
  "Je mangeais un kebab tranquille sur un banc quand un pigeon a tenté un braquage de sauce blanche. S’en est suivie une course-poursuite ridicule sur 20 mètres. Le pigeon a gagné.",
  2, 1
),
(
  "Le jour où mon micro est resté allumé sur Zoom",
  "2022-11-08",
  "Boulot",
  "J’ai critiqué mon boss pendant une visio... sauf que j’avais laissé mon micro allumé. Le silence gênant qui a suivi était plus violent qu’un plantage en prod.",
  3, 3
);




-- Table des commentaires
CREATE TABLE comments (
  id INT PRIMARY KEY AUTO_INCREMENT,
  content TEXT NOT NULL,
  date DATE NOT NULL,
  user_id INT NOT NULL,
  anecdote_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (anecdote_id) REFERENCES anecdotes(id) ON DELETE CASCADE
);

INSERT INTO comments (content, date, user_id, anecdote_id) VALUES
(
  "Haha mais quelle angoisse t’as bien fait de pas valider !",
  "2024-10-13",
  2,
  1
),
(
  "Le pigeon est clairement le boss final des villes ",
  "2023-05-23",
  3,
  2
),
(
  "Gros malaise ça m’est déjà arrivé aussi !",
  "2022-11-09",
  1,
  3
);

-- Table des favoris
CREATE TABLE favoris (
  id INT PRIMARY KEY AUTO_INCREMENT,
  date DATE NOT NULL,
  user_id INT NOT NULL,
  anecdote_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (anecdote_id) REFERENCES anecdotes(id) ON DELETE CASCADE,
  UNIQUE(user_id, anecdote_id) -- un favori unique par utilisateur/anecdote
);