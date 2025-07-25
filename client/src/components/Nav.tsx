import { Link } from "react-router";
import "./Nav.css";

function Nav() {
  return (
    <>
      <article className="nav">
        <div className="logo">
          <Link to={"/"} className="logo">
            <h1>Raconte 📖</h1>
          </Link>
        </div>
        <div className="navigation">
          <Link to={"/Seconnecter"} className="nav-link">
            <h1>Se connecter</h1>
          </Link>
          <Link to={"/Inscription"} className="nav-link">
            <h1>S'inscrire</h1>
          </Link>
        </div>
      </article>
    </>
  );
}

export default Nav;
