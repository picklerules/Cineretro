//npm install react-router-dom
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Accueil  from '../Accueil/Accueil';
import Entete from '../Entete/Entete';
import ListeFilms from '../ListeFilms/ListeFilms';
import Film from '../Film/Film';
import Page404 from '../Page404/Page404';
import './App.css';

function App() {
  
  return (
    <Router>
      <Entete />
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/liste-films" element={<ListeFilms />} />
        <Route path="/film/:id" element={<Film />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </Router>
  )

}

export default App;
