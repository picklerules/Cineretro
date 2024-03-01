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

  //const [estLog, setEstLog] = useState(false);
  const [logging, setLogging] = useState({ estLog: false, usager: "" });

  function login(e) {
    e.preventDefault();
    //console.log('login');

    if (e.target.usager.value === "admin") {
      // setEstLog(prevEstLog => !prevEstLog);
      e.target.reset();
      setLogging(logging => ({ ...logging, estLog: true, usager: e.target.usager.value }));
    }
  }

  return (

    <AppContext.Provider value={logging}>

      <Router>
        {/* <Entete handleLogin={login} estLog={estLog}/> */}
        <Entete handleLogin={login} logging={logging} />
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/liste-films" element={<ListeFilms />} />
          <Route path="/film/:id" element={<Film />}  />
          <Route path="*" element={<Page404 />} />

          {/* <Route path="/admin" element={estLog ? <Admin /> : <Navigate to="/" />} /> */}
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
