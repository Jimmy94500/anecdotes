import type { Anecdotes } from "../types/vite-env";
import "./AnecdoteCard.css";

type AnecdoteCardProps = {
  anecdoteProps: Anecdotes;
};

function AnecdoteCard({ anecdoteProps }: AnecdoteCardProps) {
  return (
    <article>
      <div className="anecdoteCard">
        <div className="idAvatar">
          <img src={anecdoteProps.profilPicture} alt="pictureAvatar" />
          <p>{anecdoteProps.pseudo}</p>
        </div>
        <article className="iconsBadge">
          <div className="action-icons">
            <button type="button">💬</button>
            <button type="button">💾</button>
          </div>
          <div className="badgeGenre">{anecdoteProps.genre}</div>
        </article>
        <h2>{anecdoteProps.title}</h2>
        <p>{anecdoteProps.content}</p>
      </div>
    </article>
  );
}

export default AnecdoteCard;
