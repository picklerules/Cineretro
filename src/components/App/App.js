//npm install react-router-dom
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import React, { useEffect, useState } from "react";
import Accueil from "../Accueil/Accueil";
import Entete from "../Entete/Entete";
import ListeFilms from "../ListeFilms/ListeFilms";
import Film from "../Film/Film";
import Admin from "../Admin/Admin";
import Page404 from "../Page404/Page404";
import FormFilm from "../FormFilm/FormFilm";
import { jwtDecode } from "jwt-decode";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import "./App.css";

export const AppContext = React.createContext();

function App() {
  const [logging, setLogging] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("api-film")) {
      //on vérifie si le token est expiré a chaque chargement de page
      setLogging(tokenValide());
    }
  });

  async function login(e) {
    //si on est connectés et qu'on appuie sur le bouton Login

    e.preventDefault();
    const form = e.target;

    if (form.dataset.connexion == "false") {
      const body = {
        courriel: form.courriel.value,
        mdp: form.mdp.value,
      };
      //console.log(body);

      const data = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      };

      const reponse = await fetch(
        "http://localhost:3301/api/utilisateurs/connexion",
        data
      );

      const token = await reponse.json();
      console.log(token);

      if (reponse.status === 200) {
        localStorage.setItem("api-film", token);
        setLogging(tokenValide());
        console.log(tokenValide());
      }

      form.reset();
    } else {
      setLogging(false);
      localStorage.removeItem("api-film");
      return;
    }
  }

  function tokenValide() {
    try {
      const token = localStorage.getItem("api-film");
      const decode = jwtDecode(token);
      //on vérifie si le token est expiré
      if (Date.now() < decode.exp * 1000) {
        return true;
      } else {
        //si le token est expiré, on supprime le token du storage
        localStorage.removeItem("api-film");
        return false;
      }
    } catch (erreur) {
      console.log(erreur);
      return false;
    }
  }

  return (
    <AppContext.Provider value={logging}>
      <Router>
        {/* <Router basename="/Cineretro">  */}

        <Entete handleLogin={login} />
        <Routes>
          {/* Les routes privées requierent d'être connecté */}
          <Route element={<PrivateRoute />}>
            <Route path="/admin" element={<Admin />} />
     
          </Route>
          <Route path="/admin/ajout-film" element={<FormFilm />} />
          <Route path="/" element={<Accueil />} />
          <Route path="/liste-films" element={<ListeFilms />} />
          <Route path="/film/:id" element={<Film />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </Router>
    </AppContext.Provider>
  );
}

export default App;
