import express from "express";

const router = express.Router();

// --- ANECDOTES --- //

import anecdotesActions from "./modules/anecdotes/anecdotesActions";
router.post("/api/anecdotes/", anecdotesActions.add);
router.get("/api/anecdotes", anecdotesActions.readAll);
router.get("/api/anecdotes/:id", anecdotesActions.readOne);

// --- USERS --- //

import usersActions from "./modules/users/usersActions";
router.post("/api/users/", usersActions.validate, usersActions.add);
router.post("/api/users/login", usersActions.login);
export default router;
