import type { Rows } from "../../../database/client";
import db_client from "../../../database/client";

async function selectOne(id: number) {
  const [[anecdote]] = await db_client.query<Rows>(
    `SELECT title, genre, content, users.pseudo AS pseudo, users.profilPicture, categories.name AS nameCategory 
     FROM anecdotes 
     JOIN users ON user_id = users.id
     JOIN categories ON category_id = categories.id
     WHERE id = ?`,
    [id],
  );
  return anecdote;
}

async function selectAllWithJointures() {
  const [anecdotes] = await db_client.query(
    `SELECT title, genre, content, users.pseudo AS pseudo,  users.profilPicture, categories.name AS nameCategory 
     FROM anecdotes 
     JOIN users ON user_id = users.id
     JOIN categories ON category_id = categories.id`,
  );
  return anecdotes;
}
async function create(anecdoteData: {
  title: string;
  genre: string;
  content: string;
}) {
  const [result] = await db_client.query<Rows>(
    `INSERT INTO anecdotes (title, genre, content)
     VALUES (?, ?, ?, ?)`,
    [anecdoteData.title, anecdoteData.genre, anecdoteData.content],
  );

  return result;
}

export default {
  create,
  selectOne,
  selectAllWithJointures,
};
