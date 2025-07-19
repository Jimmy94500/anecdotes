import type { RequestHandler } from "express";
import anecdotesRepository from "./anecdotesRepository";

const readOne: RequestHandler = async (req, res, next) => {
  try {
    const parseId = Number.parseInt(req.params.id);
    const anecdote = await anecdotesRepository.selectOne(parseId);
    if (anecdote != null) {
      res.json(anecdote);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    next(error);
  }
};

const readAll: RequestHandler = async (req, res, next) => {
  try {
    const anecdote = await anecdotesRepository.selectAllWithJointures();
    if (anecdote != null) {
      res.json(anecdote);
    }
  } catch (error) {
    next(error);
  }
};

const add: RequestHandler = async (req, res, next) => {
  try {
    const result = await anecdotesRepository.create(req.body);

    if (result != null) {
      res.status(201).json(result);
    } else {
      res.sendStatus(400);
    }
  } catch (error) {
    next(error);
  }
};

export default {
  add,
  readOne,
  readAll,
};
