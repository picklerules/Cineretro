import './Commentaire.css';
import React, { useState } from 'react';


// Dans le composant Commentaire
function Commentaire({ onCommentaireSubmit }) {
    const [commentaireTexte, setCommentaireTexte] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault(); 

      onCommentaireSubmit(commentaireTexte); 
      setCommentaireTexte(''); 
    };
  
    return (
      <form onSubmit={handleSubmit} className='form__commentaire'>
        <textarea
          value={commentaireTexte}
          onChange={(e) => setCommentaireTexte(e.target.value)}
          placeholder="Ajouter un commentaire"
        ></textarea>
        <button type="submit">Soumettre</button>
      </form>
    );
  }
  

export default Commentaire;
