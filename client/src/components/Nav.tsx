import { Link } from "react-router";
import "./Nav.css";
function Nav() {
  return (
    <>
      <article className="nav">
        <div className="logo">
          <h1>Raconte 📖 </h1>
        </div>
        <div className="navigation">
          <Link to={""} className="nav-link">
            <h1>Se connecter</h1>
          </Link>
          <Link to={""} className="nav-link">
            <h1>S'inscire</h1>
          </Link>
        </div>
      </article>
    </>
  );
}

export default Nav;
