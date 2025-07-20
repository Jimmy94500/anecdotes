import AnecdoteList from "../components/AnecdotesList";

function Accueil() {
  return (
    <>
      <article>
        <button type="button">Poster une anecdote</button>
      </article>
      <main>
        <AnecdoteList />
      </main>
    </>
  );
}

export default Accueil;
