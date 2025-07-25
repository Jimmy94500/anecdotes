import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import AnecdoteList from "../components/AnecdotesList";
import { useUser } from "../context/user.context";
import "./Accueil.css";

function Accueil() {
  const { user } = useUser();
  // LE USECONTEXT DU CONTEXT ANECDOTES
  const navigate = useNavigate();

  return (
    <>
      <article className="interactionPage">
        <button
          onClick={() => {
            if (user) navigate("/PostAnecdote");
            else
              toast.warning("Tu dois être connecté pour poster une anecdote !");
          }}
          type="button"
          className="btnPostAnecdote"
        >
          Poste ton anecdote
        </button>
        <h2>{user?.pseudo}</h2>
        {user && <img src={user.profilPicture} alt="profilPictureUser" />}
        <div className="filtre">
          <button type="button" className="btnCateg">
            Catégories
          </button>
        </div>
      </article>
      <main>
        <AnecdoteList />
      </main>
    </>
  );
}

export default Accueil;
