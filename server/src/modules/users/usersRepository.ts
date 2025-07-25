import type { Result, Rows } from "../../../database/client";
import db_client from "../../../database/client";

interface User {
  id: number;
  pseudo: string;
  email: string;
  password: string;
  profilPicture: string;
}

async function create(newUser: User) {
  const defaultAvatar = `https://api.dicebear.com/9.x/bottts/png?seed=${encodeURIComponent(
    newUser.pseudo,
  )}`;

  const [result] = await db_client.query<Result>(
    "INSERT INTO users (pseudo, email, password, profilPicture) VALUES (?, ?, ?, ?)",
    [
      newUser.pseudo,
      newUser.email,
      newUser.password,
      newUser.profilPicture ?? defaultAvatar,
    ],
  );
  return result.affectedRows;
}

async function readByEmail(email: string) {
  const [rows] = await db_client.query<Rows>(
    "SELECT * FROM users WHERE email = ? ",
    [email],
  );
  return rows[0] as User;
}

export default {
  create,
  readByEmail,
};
