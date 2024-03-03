import './Note.css';
import React, { useState } from "react";

function Note({ filmDetails, onNoteSubmit, moyenneNotes, nbVotes }) {
  const [noteSelectionnee, setNoteSelectionnee] = useState(1);

  const handleChange = (e) => {
    setNoteSelectionnee(parseInt(e.target.value, 10));
  };

  const handleSubmit = () => {
    onNoteSubmit(noteSelectionnee);
  };

  return (
    <div>
      <div>
        <select value={noteSelectionnee} onChange={handleChange}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <button onClick={handleSubmit}>Vote</button>
      </div>
      <div>
        {nbVotes > 0 ? (
          <>
            <p>Moyenne des votes : {moyenneNotes}</p>
            <p>Nombre de vote(s) : {nbVotes} {nbVotes > 1 ? "votes" : "vote"}</p>
          </>
        ) : (
          <p>Aucun vote enregistré</p>
        )}
      </div>
    </div>
  );
}

export default Note;
