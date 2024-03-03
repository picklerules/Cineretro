import "./Note.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";

function Note({ onNoteSubmit, moyenneNotes, nbVotes }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);

  const handleSubmit = () => {
    onNoteSubmit(rating);
  };

  return (
    <div>
      <div className="wrapper">
        {[...Array(5)].map((star, i) => {
          const ratingValue = i + 1;
          return (
            <label key={i}>
              <input
                type="radio"
                name="rating"
                value={ratingValue}
                onClick={() => setRating(ratingValue)}
                style={{ display: "none" }} // Cache les inputs radio si tu veux utiliser uniquement des icônes pour la notation
              />
              <FontAwesomeIcon
                icon={faStar}
                className={
                  ratingValue <= (hover || rating) ? "yellow" : "black"
                }
                onMouseEnter={() => setHover(ratingValue)}
                onMouseLeave={() => setHover(null)}
                style={{ cursor: "pointer" }}
              />
            </label>
          );
        })}
      </div>
      <button onClick={handleSubmit}>Soumettre</button>
      <div>
        {nbVotes > 0 ? (
          <>
            <p>Moyenne des votes : {moyenneNotes}</p>
            <p>
              Nombre de vote(s) : {nbVotes} {nbVotes > 1 ? "votes" : "vote"}
            </p>
          </>
        ) : (
          <p>Aucun vote enregistré</p>
        )}
      </div>
    </div>
  );
}

export default Note;

// référece codepen pour le star ratings: https://codepen.io/marcelloantunes/pen/wvMNYVv
