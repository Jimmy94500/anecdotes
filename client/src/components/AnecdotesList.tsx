import { useEffect, useState } from "react";
import type { Anecdotes } from "../types/vite-env";
import AnecdoteCard from "./AnecdotesCard";

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
    <div>
      {anecdotesData.map((anecdote: Anecdotes) => (
        <AnecdoteCard key={anecdote.id} anecdoteProps={anecdote} />
      ))}
    </div>
  );
}

export default AnecdoteList;
