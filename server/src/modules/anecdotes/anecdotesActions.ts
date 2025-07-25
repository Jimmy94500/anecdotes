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
    const newAnecdote = req.body;
    const result = await anecdotesRepository.create(newAnecdote);

    if (result != null) {
      res.status(201).json(result);
    } else {
      res.sendStatus(400);
    }
  } catch (error) {
    next(error);
  }
};

const destroy: RequestHandler = async (req, res, next) => {
  try {
    const parseId = Number.parseInt(req.params.id);
    const result = await anecdotesRepository.deleteById(parseId);
    if (result.affectedRows > 0) {
      res.sendStatus(204);
    } else {
      res
        .status(404)
        .json(
          "La supression n'a pas pu être prise en compte, aucune ligne affectée",
        );
    }
  } catch (error) {
    next(error);
  }
};

export default {
  add,
  readOne,
  readAll,
  destroy,
};
