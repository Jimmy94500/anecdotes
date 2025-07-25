import { useRef } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Inscription.css";

function Inscription() {
  const navigate = useNavigate();
  const pseudo = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);

  const register = async () => {
    try {
      const fetchOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pseudo: pseudo.current?.value,
          email: email.current?.value,
          password: password.current?.value,
        }),
      };
      const response = await fetch(
        "http://localhost:3310/api/users",
        fetchOptions,
      );

      if (response.ok) {
        toast.success("Inscription réussie, bienvenue!");
        navigate("/seconnecter");
      } else {
        const Errormessage = await response.json();
        toast.warning(Errormessage);
      }
    } catch (error) {
      console.error(error);
      toast.error("Une erreur est survenue");
    }
  };

  return (
    <div className="loginPage">
      <form className="loginForm" onSubmit={register}>
        <h1>S'inscrire</h1>
        <input
          type="text"
          placeholder=" Un pseudo original ou pas"
          ref={pseudo}
          required
        />
        <input type="email" placeholder="Adresse email" ref={email} required />
        <input
          type="password"
          placeholder="Mot de passe"
          ref={password}
          required
        />
        <label htmlFor="profilPicture">Photo de profil :</label>
        <input
          type="file"
          id="profilPicture"
          name="profilPicture"
          accept="image/*"
        />

        <button type="button" onClick={register}>
          Valider l'inscription
        </button>
        <label htmlFor="dejaInscris">Tu as déjà un compte ?</label>

        <button type="button" onClick={() => navigate("/seconnecter")}>
          Se connecter
        </button>
      </form>
    </div>
  );
}
export default Inscription;
