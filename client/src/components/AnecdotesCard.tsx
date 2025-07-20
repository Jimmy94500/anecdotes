import type { Anecdotes } from "../types/vite-env";

type AnecdoteCardProps = {
  anecdoteProps: Anecdotes;
};

const AnecdoteCard = ({ anecdoteProps }: AnecdoteCardProps) => {
  return (
    <div>
      <h2>{anecdoteProps.title}</h2>
      <p>{anecdoteProps.content}</p>
    </div>
  );
};

export default AnecdoteCard;
