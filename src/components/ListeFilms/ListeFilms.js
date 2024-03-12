import { useEffect, useState } from "react";
import TuileFilm from "../TuileFilm/TuileFilm";
import { Link } from "react-router-dom";
import Filtre from "../Filtre/Filtre";
import "./ListeFilms.css";

function ListeFilms(props) {

  const urlListeFilms = "https://api-films-qfje.onrender.com/api/films";

  // mettre les données en statique si le server render ne marche pas
  //const urlListeFilms = "data/titre-asc.json";

  const [listeFilms, setListeFilms] = useState([]);
  const [urlFiltre, setUrlFiltre] = useState(urlListeFilms);
  const [filtreActif, setFiltreActif] = useState({ champ: 'titre', ordre: 'asc' });


  useEffect(() => {
    fetch(urlFiltre)
      .then((reponse) => reponse.json())
      .then((data) => {

        setListeFilms(data); 
      });
  }, [urlFiltre]); 

  const tuilesFilm = listeFilms.map((film) => {
    return (
      <Link key={film.id} to={`/film/${film.id}`}>
        {" "}
        <TuileFilm key={film.id} data={film} filtreActif={filtreActif} />
      </Link>
    );
  });


  function filtre(champTri, ordreTri) {
    
    const urlFiltre = `${urlListeFilms}?tri=${champTri}&ordre=${ordreTri}`;

    setUrlFiltre(urlFiltre);
    setFiltreActif({ champ: champTri, ordre: ordreTri });
    
  }


  return (
    <main>
      <Filtre onFiltreChange ={filtre} filtreActif={filtreActif}/>
      <div className="grid">{tuilesFilm}</div>
    </main>
  );
}

export default ListeFilms;
