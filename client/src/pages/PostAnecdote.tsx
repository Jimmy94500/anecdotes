import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAnecdote } from "../context/AnecdoteContext";
import { useUser } from "../context/user.context";
import "./PostAnecdote.css";

function PostAnecdote() {
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<null | {
    id: number;
    name: string;
  }>(null);
  const { anecdotes, setAnecdotes } = useAnecdote();
  const { user } = useUser();
  const navigate = useNavigate();

  const categoryMap = [
    { id: 1, name: "QUOTIDIEN" },
    { id: 2, name: "FAMILLE" },
    { id: 3, name: "AMITIÉ" },
    { id: 4, name: "SOUVENIRS" },
    { id: 5, name: "BOULOT" },
    { id: 6, name: "HONTE" },
    { id: 7, name: "TRANSPORTS" },
    { id: 8, name: "COUPLE" },
  ];
  // FETCH ANECDOTES

  const postAnecdote = async () => {
    const trimmed = text.trim();
    if (!trimmed || !selectedCategory) {
      toast.warning("Tu dois écrire une anecdote et choisir une catégorie");
      return;
    }
    try {
      const response = await fetch("http://localhost:3310/api/anecdotes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          genre: selectedCategory?.name,
          content: trimmed,
          user_id: user?.id,
          category_id: selectedCategory?.id,
          profilPicture: user?.profilPicture,
        }),
      });

      if (!response.ok) throw new Error("Erreur lors du POST");

      const newAnecdote = await response.json();
      setAnecdotes([newAnecdote, ...anecdotes]);

      toast.success("Anecdote postée !");
      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error("Une erreur est survenue");
    }
  };

  return (
    <div className="postPage">
      <h1>Donne un titre à ton anecdote</h1>
      <textarea
        placeholder="Ici, le titre..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <h1>Écris ton anecdote</h1>
      <textarea
        placeholder="Ecris un moment de ta vie..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="categoryButtons">
        {categoryMap.map((cat) => (
          <button
            type="button"
            key={cat.id}
            className={selectedCategory === cat ? "selected" : ""}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat.name}
          </button>
        ))}
      </div>
      <div className="postButton">
        <button type="button" onClick={postAnecdote}>
          POSTER
        </button>
      </div>
    </div>
  );
}

export default PostAnecdote;
