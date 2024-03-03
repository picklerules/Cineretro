
import { AppContext } from "../App/App"; 
import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import TuileFilm from "../TuileFilm/TuileFilm";
// import Note from "../Note/Note";
import "./Film.css";

function Film() {
  
  const context = useContext(AppContext);

  let { id } = useParams();
  const [filmDetails, setFilmDetails] = useState(null);
  const urlFilmDetail = `https://api-films-qfje.onrender.com/api/films/${id}`;
  const [noteSoumise, setNoteSoumise] = useState(null);
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

  async function soumettreNote(e) { //ici je récupere en parametre la valeur de la note saisie par l'usagée 
    //console.log('soumettreNote');

    let aNotes = filmDetails.notes ? [...filmDetails.notes, noteSoumise] : [noteSoumise];

    // if (!filmDetails.notes) {
    //   aNotes = [1]; //je dois dynamiser la note
    // } else {
    //   aNotes = filmDetails.notes;
    //   aNotes.push(1);
    // }  //aNotes.length 

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
      .then((reponses) => {
      const data = reponses[1].json();
      setFilmDetails(data);

        // Calcul et mise à jour de la moyenne et du nombre de votes
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
    
  //appelAsync({})  passer la valeur a aller porter a la BD
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

        <select onChange={(e) => setNoteSoumise(parseInt(e.target.value, 10))}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <button onClick={() => soumettreNote(noteSoumise)}>Vote</button>

        
        <div>
          Moyenne des votes : {nbVotes > 0 ? moyenneNotes : "Aucun vote enregistré"}
        </div>
        <div>
          Nombre de vote(s) : {nbVotes} {nbVotes <= 1 ? "vote" : "votes"}
        </div>


        {blocAjoutCommentaire}
      </div>
    </div>
  );
}

export default Film;
