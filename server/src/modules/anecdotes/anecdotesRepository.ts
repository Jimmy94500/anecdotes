import type { Rows } from "../../../database/client";
import db_client from "../../../database/client";

async function selectOne(id: number) {
  const [[anecdote]] = await db_client.query<Rows>(
    `SELECT title, date, genre, content, user_id, category_id 
     FROM anecdotes 
     WHERE id = ?`,
    [id],
  );
  return anecdote;
}

async function selectAllWithJointures() {
  const [anecdotes] = await db_client.query(
    `SELECT a.id, a.title, a.date, a.genre, a.content,
            u.pseudo AS user_name,
            c.name AS category_name
     FROM anecdotes a
     JOIN users u ON a.user_id = u.id
     JOIN categories c ON a.category_id = c.id`,
  );
  return anecdotes;
}
async function create(anecdoteData: {
  title: string;
  date: string;
  genre: string;
  content: string;
}) {
  const [result] = await db_client.query<Rows>(
    `INSERT INTO anecdotes (title, date, genre, content)
     VALUES (?, ?, ?, ?)`,
    [
      anecdoteData.title,
      anecdoteData.date,
      anecdoteData.genre,
      anecdoteData.content,
    ],
  );

  return result;
}

export default {
  create,
  selectOne,
  selectAllWithJointures,
};
