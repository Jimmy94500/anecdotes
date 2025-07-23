import AnecdoteList from "../components/AnecdotesList";
import "./Accueil.css";

function Accueil() {
  return (
    <>
      <article className="interactionPage">
        <button type="button" className="btnPostAnecdote">
          Poste ton anecdote
        </button>
        <div className="filtre">
          <button type="button" className="btnCateg">
            Catégories
          </button>
          <form className="searchbar" action="/recherche" method="get">
            <input
              className="searchbar"
              type="search"
              name="q"
              placeholder="Recherchez ce que tu veux..."
            />
            <button type="submit">🔍</button>
          </form>
        </div>
      </article>
      <main>
        <AnecdoteList />
      </main>
    </>
  );
}

export default Accueil;
