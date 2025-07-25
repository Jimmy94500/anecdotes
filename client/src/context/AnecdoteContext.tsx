import { createContext, useContext, useEffect, useState } from "react";
import type { Anecdotes } from "../types/vite-env";

interface AnecdoteContextType {
  anecdotes: Anecdotes[];
  setAnecdotes: React.Dispatch<React.SetStateAction<Anecdotes[]>>;
}

const AnecdoteContext = createContext<AnecdoteContextType | null>(null);

export const AnecdoteProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [anecdotes, setAnecdotes] = useState<Anecdotes[]>([]);

  useEffect(() => {
    fetch("http://localhost:3310/api/anecdotes")
      .then((res) => res.json())
      .then(setAnecdotes)
      .catch((err) => console.error("Erreur fetch anecdotes:", err));
  }, []);
  return (
    <AnecdoteContext.Provider value={{ anecdotes, setAnecdotes }}>
      {children}
    </AnecdoteContext.Provider>
  );
};

export const useAnecdote = () => {
  const context = useContext(AnecdoteContext);
  if (!context)
    throw new Error("useAnecdote doit être utilisé dans un AnecdoteProvider");
  return context;
};
