
import { AppContext } from "../App/App"; 
import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Note from "../Note/Note";
import Commentaire from "../Commentaire/Commentaire";
import { useNavigate } from "react-router-dom";
import "./Film.css";

function Film() {
  
  const context = useContext(AppContext);
  const navigate = useNavigate();

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
  
        //mettre à jour le nombre de notes et la moyenne des notes
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

  const supprimerFilm = async () => {

    if (!window.confirm("Êtes-vous sûr de vouloir supprimer ce film ?")) return;
    const token = localStorage.getItem("api-film"); 

    try {
        const reponse = await fetch(`https://api-films-qfje.onrender.com/api/films/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (reponse.ok) {
            alert("Film supprimé avec succès.");
            navigate("/liste-films"); 
        } else {
            throw new Error('Echec de suppression du film');
        }
    } catch (erreur) {
        console.error(erreur);
        alert("Erreur lors de la suppression du film.");
    }
};
  

  return (
    <div className="detail__container">
      <div className="detail__item">
        <h2>{filmDetails.titre}</h2>
        <img
          src={`/img/${filmDetails.titreVignette}`}
          alt={filmDetails.titre} loading="lazy"
        />
        <p><strong>Realisateur : </strong>{filmDetails.realisation}</p>
        <p><strong>Année : </strong>{filmDetails.annee}</p>
        <p><strong>Genres : </strong>{Array.isArray(filmDetails.genres) ? filmDetails.genres.join(' | ') : filmDetails.genres}</p>
        <p>{filmDetails.description}</p>

        {/* Affichage du formulaire de note */}
        <Note onNoteSubmit={soumettreNote} moyenneNotes={moyenneNotes} nbVotes={nbVotes} />

        {context && (
                <button onClick={supprimerFilm}>Supprimer le film</button>
            )}

        {/* Affichage du formulaire de commentaire */}
        {context && (
          <Commentaire 
            filmId={id} 
            onCommentaireSubmit={soumettreCommentaire} 
          />
        )}

        {/* Affichage des commentaires existants */}
        <div className="commentaires">
          {filmDetails.commentaires && filmDetails.commentaires.length > 0 ? (
            filmDetails.commentaires.map((commentaire, index) => (
              <div key={index} className="commentaire">
                <p className="commentaire">{commentaire.texte}</p>
                <p className="usager">- {commentaire.usager}</p>
              </div>
            ))
          ) : (
            <p>Aucun commentaire pour ce film.</p>
          )}
        </div>
          
      </div>
    </div>
  );
}

export default Film;
