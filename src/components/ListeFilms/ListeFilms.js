import { useEffect, useState } from "react";
import TuileFilm from "../TuileFilm/TuileFilm";
import { Link } from "react-router-dom";
import Filtre from "../Filtre/Filtre";
import "./ListeFilms.css";

function ListeFilms(props) {
  // const urlListeFilms = 'https://four1f-node-api.onrender.com/films';
  const urlListeFilms = "https://api-films-qfje.onrender.com/api/films";

  // mettre les données en statique si le server render ne marche pas
  //const urlListeFilms = "data/titre-asc.json";

  const [listeFilms, setListeFilms] = useState([]);
  //déclaration de la variable listeFilms et methose qui va permettre de mettre a jour la variable listeFilms, j'initialie la variable a un tableau vide car je n'ai pas encore la données, je vais la chercher avec un fetch
  const [urlFiltre, setUrlFiltre] = useState(urlListeFilms);
  const [filtreActif, setFiltreActif] = useState({ champ: 'titre', ordre: 'asc' });


  useEffect(() => {
    fetch(urlFiltre)
      .then((reponse) => reponse.json())
      .then((data) => {
        // console.log(data);
        setListeFilms(data); //assigne la data (reponse) a la variable listeFilms avec la methode qui me permet de mettre à jour la variable listeFilms
      });
  }, [urlFiltre]); //tableau vide veut dire execute le rendement du useEffect uniquement lors du premier rendu (chargement de la page), ou variable conditon execution

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
    //setUrlFiltre("data/realisation-asc.json");
    setUrlFiltre(urlFiltre);
    //setUrlFiltre(`${urlListeFilms}?tri=${e.target.value}&ordre=asc`);
    setFiltreActif({ champ: champTri, ordre: ordreTri });
    
  }


  return (
    <main>
      <Filtre onFiltreChange ={filtre} filtreActif={filtreActif}/>
      {/* <p>Filtre actif : {filtreActif.champ} ({filtreActif.ordre === 'asc' ? 'A-Z' : 'Z-A'})</p> */}
      <div className="grid">{tuilesFilm}</div>
    </main>
  );
}

export default ListeFilms;
