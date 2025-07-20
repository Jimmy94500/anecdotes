import { useEffect, useState } from "react";
import type { Anecdotes } from "../types/vite-env";

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
        <div key={anecdote.id}>
          <h1>{anecdote.title}</h1>
          <p>{anecdote.content}</p>
        </div>
      ))}
    </div>
  );
}

export default AnecdoteList;
