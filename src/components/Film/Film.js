
import { AppContext } from "../App/App"; 
import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Note from "../Note/Note";
import Commentaire from "../Commentaire/Commentaire";
import "./Film.css";

function Film() {
  
  const context = useContext(AppContext);

  let { id } = useParams();
  const [filmDetails, setFilmDetails] = useState(null);
  const urlFilmDetail = `https://api-films-qfje.onrender.com/api/films/${id}`;
  const [moyenneNotes, setMoyenneNotes] = useState(0);
  const [nbVotes, setNbVotes] = useState(0);
  

  useEffect(() => {
    fetch(urlFilmDetail)
      .then((reponse) => reponse.json())
      .then((data) => {
        setFilmDetails(data);
        if (data.notes && data.notes.length > 0) {
          const sommeNotes = data.notes.reduce((acc, curr) => acc + curr, 0);
          const moyenne = sommeNotes / data.notes.length;
          setMoyenneNotes(parseFloat(moyenne.toFixed(2)));
          setNbVotes(data.notes.length);
        } else {
          setMoyenneNotes(0);
          setNbVotes(0); 
        }
      })
      .catch((error) => console.error("Erreur lors du chargement du détail du film:", error));
  }, [id, filmDetails]);

  //console.log(filmDetails);

  if (!filmDetails) {
    return <div>Chargement des détails du film...</div>;
  }

  async function soumettreNote(noteSelectionnee) {
    let aNotes = filmDetails.notes ? [...filmDetails.notes, noteSelectionnee] : [noteSelectionnee];
  
    const oOptions = {
      method : 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ notes: aNotes })
    };
  
    let putNote = await fetch(urlFilmDetail, oOptions);
    let getFilmDetails = await fetch(urlFilmDetail);
  
    Promise.all([putNote, getFilmDetails])
      .then(async (reponses) => {
        const data = await reponses[1].json();
        setFilmDetails(data);
  
        // Recalcule et mise à jour de la moyenne et du nombre de votes immédiatement
        if (data.notes && data.notes.length > 0) {
          const sommeNotes = data.notes.reduce((acc, curr) => acc + curr, 0);
          const moyenne = sommeNotes / data.notes.length;
          setMoyenneNotes(parseFloat(moyenne.toFixed(2)));
          setNbVotes(data.notes.length);
        } else {
          setMoyenneNotes(0);
          setNbVotes(0);
        }
      })
      .catch((error) => console.error("Erreur lors de la mise à jour du vote:", error));
  }

  async function soumettreCommentaire(commentaireTexte, usager) {

    const commentaire = {
      texte: commentaireTexte,
      usager: context
    };
  
    let nouveauxCommentaires = filmDetails.commentaires ? [...filmDetails.commentaires, commentaire] : [commentaire];
  
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ commentaires: nouveauxCommentaires }),
    };

    let putCommentaire = await fetch(urlFilmDetail, options);
    let getFilmDetails = await fetch(urlFilmDetail);

    Promise.all([putCommentaire, getFilmDetails])

   .then(async (reponses) => {
        const data = await reponses[1].json();
        setFilmDetails(data);
      })

  
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
        <Note onNoteSubmit={soumettreNote} moyenneNotes={moyenneNotes} nbVotes={nbVotes} />
        {context.estLog && (
          <Commentaire 
            filmId={id} 
            onCommentaireSubmit={soumettreCommentaire} 
          />
        )}
      </div>
    </div>
  );
}

export default Film;
