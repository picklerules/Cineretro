//npm install react-router-dom
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import React, { useState } from "react";
import Accueil from "../Accueil/Accueil";
import Entete from "../Entete/Entete";
import ListeFilms from "../ListeFilms/ListeFilms";
import Film from "../Film/Film";
import Admin from "../Admin/Admin";
import Page404 from "../Page404/Page404";
import "./App.css";

export const AppContext = React.createContext();

function App() {


  const [logging, setLogging] = useState({ estLog: false, usager: "" });

  function login(e) {
    e.preventDefault();

    if (e.target.usager.value === "admin") {

      setLogging(logging => ({ ...logging, estLog: true, usager: e.target.usager.value }));
      e.target.reset();
    }
  }

  function logout() {
    console.log('logout');
    setLogging({ estLog: false, usager: "" });
  }
  

  return (

    <AppContext.Provider value={logging}>

      <Router>
      {/* <Router basename="/Cineretro">  */}

        <Entete handleLogin={login} handleLogout={logout} />
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/liste-films" element={<ListeFilms />} />
          <Route path="/film/:id" element={<Film />}  />
          <Route path="*" element={<Page404 />} />

          <Route
            path="/admin"
            element={logging.estLog ? <Admin /> : <Navigate to="/" />}
          />
        </Routes>
      </Router>
      
    </AppContext.Provider>
  );
}

export default App;
