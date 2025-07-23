import { useEffect, useState } from "react";
import type { Anecdotes } from "../types/vite-env";
import AnecdoteCard from "./AnecdotesCard";
import "./AnecdotesList.css";

function AnecdoteList() {
  const [anecdotesData, setAnecdotesData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3310/api/anecdotes")
      .then((res) => res.json())
      .then((json) => {
        setAnecdotesData(json);
      });
  }, []);

  return (
    <section className="listAnecdotes">
      {anecdotesData.map((anecdote: Anecdotes) => (
        <AnecdoteCard key={anecdote.id} anecdoteProps={anecdote} />
      ))}
    </section>
  );
}

export default AnecdoteList;
