import { useRef } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useUser } from "../context/user.context";
import "./SeConnecter.css";

function SeConnecter() {
  const navigate = useNavigate();
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const { setUser } = useUser();

  const login = async () => {
    try {
      const fetchOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.current?.value,
          password: password.current?.value,
        }),
      };
      const response = await fetch(
        "http://localhost:3310/api/users/login",
        fetchOptions,
      );
      if (!response.ok)
        toast.warning(" 🧠 Tes identifiants ne sont pas les bons 🧠 ");
      else {
        const { userWithoutPassword, token } = await response.json();
        toast.success("Tu es bien connecté");
        const user = userWithoutPassword;
        user.token = token;
        setUser(user);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      toast.error("Une erreur pointe le bout de son nez");
    }
  };

  return (
    <div className="loginPage">
      <form className="loginForm">
        <h1>Se connecter</h1>
        <input ref={email} type="email" placeholder="Adresse email" required />
        <input
          ref={password}
          type="password"
          placeholder="Mot de passe"
          required
        />
        <button type="button" onClick={login}>
          Connecte toi
        </button>
        <label htmlFor="dejaInscris">Tu n'as pas de compte ?</label>

        <button type="button" onClick={() => navigate("/inscription")}>
          S'inscrire{" "}
        </button>
      </form>
    </div>
  );
}

export default SeConnecter;
