CREATE SCHEMA IF NOT EXISTS `anecdotes_BDD` DEFAULT CHARACTER SET utf8mb3;
USE `anecdotes_BDD`;

-- Table des utilisateurs
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  pseudo VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(100),
  profilPicture TEXT
);

INSERT INTO users (pseudo, email, profilPicture) VALUES
  ("Next", "Next@example.com", "https://api.dicebear.com/7.x/adventurer/svg?seed=Next"),
  ("Baboum97_Kat", "Baboum97_Kat@example.com", "https://api.dicebear.com/7.x/adventurer/svg?seed=Baboum97"),
  ("jean_drydry", "jeandrydry@example.com", "https://api.dicebear.com/7.x/adventurer/svg?seed=ChienFu"),
  ("Bababoy", "Bababoy@example.com", "https://api.dicebear.com/7.x/adventurer/svg?seed=RayBiscuit"),
  ("chienFu", "chienFu@example.com", "https://api.dicebear.com/7.x/adventurer/svg?seed=Katouille");

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
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  genre VARCHAR(100),
  content TEXT NOT NULL,
  user_id INT,
  category_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);

INSERT INTO anecdotes (title, genre, content, user_id, category_id) VALUES

  ("La discussion sur le trottoir", "Vie quotidienne",
  "Je sortais les poubelles en chaussettes, pas coiffé, pas réveillé. Une vieille dame m’a arrêtée pour parler de la météo. Elle m’a raconté ses douleurs au genou, ses plantes et que son fils n’appelle plus. J’ai écouté 15 minutes. C’est la seule personne avec qui j’ai parlé ce jour-là.", 2, 5),

  ("L’ami au mauvais moment", "Amitié",
  "J’étais en train de pleurer dans ma voiture, garée dans un parking souterrain. Mon pote est passé pile à ce moment-là et m’a fait un doigt d’honneur par la vitre, en rigolant. Il ne savait pas que j’étais au fond du seau. Quand je lui ai dit plus tard, il m’a juste dit : 'j’étais sûr que t’avais besoin d’un sourire'.", 3, 7),

  ("La lettre retrouvée", "Souvenirs",
  "En rangeant un tiroir, j’ai retrouvé une lettre que j’avais écrite à mon moi du futur à 15 ans. Elle disait : ‘J’espère que t’as toujours pas oublié comment on fait des crêpes’. J’ai ri, j’ai pleuré un peu, puis j’ai fait des crêpes, sans recette.", 4, 1),
  ("Le bain improvisé", "Famille",
  "Mon fils de 5 ans a rempli la baignoire tout seul pour ‘me faire plaisir’. L’eau débordait, il avait mis tous les gels douche, du shampoing, et un sachet de thé. J’étais tellement surpris que j’ai juste dit merci. J’ai pris le bain après lui, mousse violette et odeur de menthe poivrée comprise.", 1, 1),

  ("Silence dans le bus", "Transport",
  "Un matin, dans le bus, un petit garçon a crié : ‘Maman ! Pourquoi le monsieur il est triste ?’. Je n’étais pas triste, juste fatigué. Mais personne n’a rien dit. Sa mère a répondu doucement : ‘Peut-être qu’il pense à quelque chose’. J’ai trouvé ça très juste. Et très beau.", 5, 2);

-- Table des commentaires
CREATE TABLE comments (
  id INT PRIMARY KEY AUTO_INCREMENT,
  content TEXT NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  user_id INT NOT NULL,
  anecdote_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (anecdote_id) REFERENCES anecdotes(id) ON DELETE CASCADE
);

INSERT INTO comments (content, user_id, anecdote_id) VALUES
  ("Haha mais quelle angoisse t’as bien fait de pas valider !",  2, 1),
  ("Le pigeon est clairement le boss final des villes ",  3, 2),
  ("Gros malaise ça m’est déjà arrivé aussi !",  1, 3);

-- Table des favoris
CREATE TABLE favoris (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  anecdote_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (anecdote_id) REFERENCES anecdotes(id) ON DELETE CASCADE,
  UNIQUE(user_id, anecdote_id)
);
