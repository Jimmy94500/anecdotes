import type { Anecdotes } from "../types/vite-env";
import "./AnecdoteCard.css";

type AnecdoteCardProps = {
  anecdoteProps: Anecdotes;
};

const AnecdoteCard = ({ anecdoteProps }: AnecdoteCardProps) => {
  return (
    <article>
      <div className="anecdoteCard">
        <h2>{anecdoteProps.title}</h2>
        <p>{anecdoteProps.content}</p>
      </div>
    </article>
  );
};

export default AnecdoteCard;
