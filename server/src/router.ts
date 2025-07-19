import express from "express";

const router = express.Router();

// --- ANECDOTES --- //

import anecdotesActions from "./modules/anecdotes/anecdotesActions";
router.post("/api/anecdotes/", anecdotesActions.add);
router.get("/api/anecdotes", anecdotesActions.readAll);
router.get("/api/anecdotes/:id", anecdotesActions.readOne);

export default router;
