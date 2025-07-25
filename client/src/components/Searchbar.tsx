import "./Searchbar.css";

type SearchbarProps = {
  search: string;
  setSearch: (value: string) => void;
};

function Searchbar({ search, setSearch }: SearchbarProps) {
  return (
    <form className="searchbar" action="/recherche" method="get">
      <input
        className="searchbar"
        type="search"
        name="q"
        placeholder="un mot, une lettre ..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </form>
  );
}

export default Searchbar;
