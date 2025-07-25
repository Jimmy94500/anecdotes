import { useState } from "react";
import { useAnecdote } from "../context/AnecdoteContext";
import type { Anecdotes } from "../types/vite-env";

import AnecdoteCard from "./AnecdotesCard";
import "./AnecdotesList.css";
import Searchbar from "./Searchbar";

function AnecdoteList() {
  const [search, setSearch] = useState("");
  const { anecdotes } = useAnecdote();

  const filteredSearchAnecdotes = anecdotes.filter((anecdote) =>
    anecdote.content.toLowerCase().includes(search?.toLowerCase()),
  );

  return (
    <section className="listAnecdotes">
      <Searchbar search={search} setSearch={setSearch} />

      {filteredSearchAnecdotes.map((anecdote: Anecdotes) => (
        <AnecdoteCard key={anecdote.id} anecdoteProps={anecdote} />
      ))}
    </section>
  );
}

export default AnecdoteList;
