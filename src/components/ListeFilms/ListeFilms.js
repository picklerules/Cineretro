import { useEffect, useState } from "react";
import TuileFilm from "../TuileFilm/TuileFilm";
import { Link } from "react-router-dom";
import "./ListeFilms.css";

function ListeFilms(props) {
  // const urlListeFilms = 'https://four1f-node-api.onrender.com/films';
  const urlListeFilms = "https://api-films-qfje.onrender.com/api/films";

  // mettre les données en statique si le server render ne marche pas
  //const urlListeFilms = "data/titre-asc.json";

  const [listeFilms, setListeFilms] = useState([]);
  //déclaration de la variable listeFilms et methose qui va permettre de mettre a jour la variable listeFilms, j'initialie la variable a un tableau vide car je n'ai pas encore la données, je vais la chercher avec un fetch
  const [urlFiltre, setUrlFiltre] = useState(urlListeFilms);

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
        <TuileFilm data={film} />
      </Link>
    );
  });
  //bonne stratégie serait d'envoyer le filtre à l'enfant

  function filtre(e) {
    console.log(e.target);
    //setUrlFiltre("data/realisation-asc.json");
    setUrlFiltre(`${urlListeFilms}?tri=realisation&ordre=asc`);
    //setUrlFiltre(`${urlListeFilms}?tri=${e.target.value}&ordre=asc`);
    //quel est l'élément qui a été cliqué et faire une structure conditionnelle selon le url a appelé
    
  }

  function maDeuxiemeFonction() {
    console.log('maDeuxiemeFonction');
  }

  return (
    <main>
      {/* placer le ul dans le composant enfant filtre, passé en props la fonction filtre qui pourra etre appelé dans l'enfant et remonté dans le parent, voir démo du compteur */}
      <ul>
        <li onClick={(e) => {filtre(e); maDeuxiemeFonction()}}>Réalisateur (A-Z)</li>
        
      </ul>
      <div className="grid">{tuilesFilm}</div>
    </main>
  );
}

export default ListeFilms;
