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

INSERT INTO categories (id, name) VALUES
(1, 'Famille'),
(2, 'Transport'),
(3, 'Boulot'),
(4, 'Couple'),
(5, 'Vie quotidienne'),
(6, 'Souvenirs'),
(7, 'Amitié')
ON DUPLICATE KEY UPDATE name = VALUES(name);


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
  "Le bain improvisé",
  "2024-07-10",
  "Famille",
  "Mon fils de 5 ans a rempli la baignoire tout seul pour ‘me faire plaisir’. L’eau débordait, il avait mis tous les gels douche, du shampoing, et un sachet de thé. J’étais tellement surpris que j’ai juste dit merci. J’ai pris le bain après lui, mousse violette et odeur de menthe poivrée comprise.",
  1, 1
),
(
  "La discussion sur le trottoir",
  "2024-06-22",
  "Vie quotidienne",
  "Je sortais les poubelles en chaussettes, pas coiffé, pas réveillé. Une vieille dame m’a arrêtée pour parler de la météo. Elle m’a raconté ses douleurs au genou, ses plantes et que son fils n’appelle plus. J’ai écouté 15 minutes. C’est la seule personne avec qui j’ai parlé ce jour-là.",
  2, 5
),
(
  "L’ami au mauvais moment",
  "2024-05-09",
  "Amitié",
  "J’étais en train de pleurer dans ma voiture, garée dans un parking souterrain. Mon pote est passé pile à ce moment-là et m’a fait un doigt d’honneur par la vitre, en rigolant. Il ne savait pas que j’étais au fond du seau. Quand je lui ai dit plus tard, il m’a juste dit : 'j’étais sûr que t’avais besoin d’un sourire'.",
  3, 7
),
(
  "La lettre retrouvée",
  "2024-07-01",
  "Souvenirs",
  "En rangeant un tiroir, j’ai retrouvé une lettre que j’avais écrite à mon moi du futur à 15 ans. Elle disait : ‘J’espère que t’as toujours pas oublié comment on fait des crêpes’. J’ai ri, j’ai pleuré un peu, puis j’ai fait des crêpes, sans recette.",
  1, 1
),
(
  "Silence dans le bus",
  "2024-06-17",
  "Transport",
  "Un matin, dans le bus, un petit garçon a crié : ‘Maman ! Pourquoi le monsieur il est triste ?’. Je n’étais pas triste, juste fatigué. Mais personne n’a rien dit. Sa mère a répondu doucement : ‘Peut-être qu’il pense à quelque chose’. J’ai trouvé ça très juste. Et très beau.",
  2, 2
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