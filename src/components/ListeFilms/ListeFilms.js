import { useEffect, useState } from'react';
import TuileFilm from '../TuileFilm/TuileFilm';
import { Link } from 'react-router-dom';
import './ListeFilms.css';

function ListeFilms(props) {

  // const urlListeFilms = 'https://four1f-node-api.onrender.com/films';
  const urlListeFilms = 'https://api-films-qfje.onrender.com/api/films';
  const [listeFilms, setListeFilms] = useState([]);
  //déclaration de la variable listeFilms et methose qui va permettre de mettre a jour la variable listeFilms, j'initialie la variable a un tableau vide car je n'ai pas encore la données, je vais la chercher avec un fetch

  useEffect(() => { 

    fetch(urlListeFilms)
      .then((reponse) => reponse.json())
      .then((data) => { 
        // console.log(data);
        setListeFilms(data); //assigne la data (reponse) a la variable listeFilms avec la methode qui me permet de mettre à jour la variable listeFilms
      });

  }, []); //tableau vide veut dire execute le rendement du useEffect uniquement lors du premier rendu (chargement de la page)

  const tuilesFilm = listeFilms.map((film)=> {
    return <Link key={film.id} to={`/film/${film.id}`}> <TuileFilm data={film}/></Link>
  });
  
  return (
  <main >

    <h2>Liste des films</h2>
    <div className="grid">
      {tuilesFilm}
    </div>
    
  </main>
  )

}

export default ListeFilms;
