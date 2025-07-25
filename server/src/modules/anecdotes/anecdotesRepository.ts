import type { Result, Rows } from "../../../database/client";
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
     JOIN categories ON category_id = categories.id
     ORDER BY anecdotes.id DESC`,
  );
  return anecdotes;
}
async function create(anecdoteData: {
  title: string;
  genre: string;
  content: string;
  user_id: number;
  category_id: number;
}) {
  const [result] = await db_client.query<Rows>(
    `INSERT INTO anecdotes (title, genre, content, user_id, category_id)
     VALUES (?, ?, ?, ?, ?)`,
    [
      anecdoteData.title,
      anecdoteData.genre,
      anecdoteData.content,
      anecdoteData.user_id,
      anecdoteData.category_id,
    ],
  );

  return { id: result, ...anecdoteData };
}

async function deleteById(id: number) {
  const [result] = await db_client.query<Result>(
    "DELETE FROM anecdotes WHERE id = ?",
    [id],
  );
  return result;
}

export default {
  create,
  selectOne,
  selectAllWithJointures,
  deleteById,
};
