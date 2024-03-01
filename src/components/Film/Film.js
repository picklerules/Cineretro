
import { AppContext } from "../App/App"; 
import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import TuileFilm from "../TuileFilm/TuileFilm";
import "./Film.css";

function Film() {
  
  const context = useContext(AppContext);

  let { id } = useParams();
  const [filmDetails, setFilmDetails] = useState(null);
  const urlFilmDetail = `https://api-films-qfje.onrender.com/api/films/${id}`;


  useEffect(() => {
    fetch(urlFilmDetail)
      .then((reponse) => reponse.json())
      .then((data) => {
        setFilmDetails(data);
        //console.log(data.notes);

      })

      .catch((error) =>
        console.error("Erreur lors du chargement du détail du film:", error)
      );
  }, [id]);

  //console.log(filmDetails);

  if (!filmDetails) {
    return <div>Chargement des détails du film...</div>;
  }

  async function soumettreNote(e) { //ici je récupere en parametre la valeur de la note saisie par l'usagée 
    //console.log('soumettreNote');

    let aNotes;

    if (!filmDetails.notes) {
      aNotes = [1]; //je dois dynamiser la note
    } else {
      aNotes = filmDetails.notes;
      aNotes.push(1);
    }  //aNotes.length 

    const oOptions = {
      method : 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ notes: aNotes })
    }

    let putNote = await fetch(urlFilmDetail, oOptions),
      getFilmDetails = await fetch(urlFilmDetail);

    Promise.all([putNote, getFilmDetails])
      .then((reponse) => reponse[1].json())
      .then((data) => {
        
        console.log(data.notes);
        setFilmDetails(data);

        // setMoyenne()
        // setNbNotes()   , devra faire la déclaration correspondant a la methode dans le useEffect (au chargement de la page) codePen pour la démo des étoiles
      })


    // fetch(urlFilmDetail, oOptions)
    //   .then((reponse) => reponse.json())
    //   .then((data) => {
    //     console.log(data);

    //   })
  }

  //TODO: aller corriger commentaire dans le backend
  async function soumettreCommentaire(e) { //ici je récupere en parametre la valeur de la note saisie par l'usagée 
    //console.log('soumettreNote');
    e.preventDefault();
    console.log(e.target);
    let aCommentaires;

    if (!filmDetails.commentaires) {
      aCommentaires = [{ commentaire: 'Je suis un commentaire', usager: context }]; //je dois dynamiser le commentaire
    } else {
      aCommentaires = filmDetails.commentaires;
      aCommentaires.push({ commentaire: 'Je suis un commentaire', usager: context });
    }  

    const oOptions = {
      method : 'PUT', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ commentaires: aCommentaires })
    }

    let putCommentaire = await fetch(urlFilmDetail, oOptions),
      getFilmDetails = await fetch(urlFilmDetail);

    Promise.all([putCommentaire, getFilmDetails])
      .then((reponse) => reponse[1].json())
      .then((data) => {
        console.log(data);
        setFilmDetails(data);

      })


  }

  let blocAjoutCommentaire;
    if (context.estLog) {
      blocAjoutCommentaire = 
    
          <form onSubmit={soumettreCommentaire}>
            <textarea placeholder="Ajouter un commentaire"></textarea>
            <button>Soumettre</button>
          </form>
      
    }

  return (
    <div className="detail__container">
      <div className="detail__item">
        <h2>{filmDetails.titre}</h2>
        <img
          src={`/img/${filmDetails.titreVignette}`}
          alt={filmDetails.titre} loading="lazy"
        />
        <p>Realisateur: {filmDetails.realisation}</p>
        <p>Année: {filmDetails.annee}</p>
        <p>Genres: {Array.isArray(filmDetails.genres) ? filmDetails.genres.join(' | ') : filmDetails.genres}</p>
        <p>Description: {filmDetails.description}</p>

        <button onClick={soumettreNote}>Vote</button>

        {blocAjoutCommentaire}
      </div>
    </div>
  );
}

export default Film;
