import argon from "argon2";
import type { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import usersRepository from "./usersRepository";

const add: RequestHandler = async (req, res, next) => {
  try {
    const user = req.body;
    user.password = await argon.hash(user.password);
    const affectedRows = await usersRepository.create(user);
    if (affectedRows) res.sendStatus(201);
    else res.status(422).json("Données manquantes ou erronées");
  } catch (error) {
    next(error);
  }
};

const login: RequestHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await usersRepository.readByEmail(email);
    if (!user) res.status(422).json("Les données saisies sont incorrect");
    else {
      const confirmPassword = await argon.verify(user.password, password);
      if (!confirmPassword)
        res.status(422).json("Les données saisies sont incorrect");
      else {
        const token = jwt.sign(
          { id: user.id },
          process.env.APP_SECRET as string,
        );
        const { password, ...userWithoutPassword } = user;
        res.json({ userWithoutPassword, token });
      }
    }
  } catch (error) {
    next(error);
  }
};

const validate: RequestHandler = async (req, res, next) => {
  try {
    const { pseudo, email, password, profilPicture } = req.body;
    if (!pseudo || pseudo === "" || pseudo.length < 4 || pseudo.length > 15)
      res
        .status(422)
        .json(
          "❗Le pseudo doit être renseigné et doit faire entre 4 et 15 caractères ❗",
        );
    else if (!email || email === "" || email.length < 4)
      res.status(422).json("❗L'adresse email doit être renseigné❗");
    else if (!password || password === "")
      res.status(422).json("N'oublie pas de renseigner ton mot de passe 🧠 ");
    else next();
  } catch (error) {}
};

export default {
  add,
  login,
  validate,
};
