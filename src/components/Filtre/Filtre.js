import './Filtre.css';

// Filtre.js
function Filtre({props}) {
  return (
    <ul>
      <li onClick={() => props('titre', 'asc')}>Titre (A-Z)</li>
      <li onClick={() => props('titre', 'desc')}>Titre (Z-A)</li>
      <li onClick={() => props('realisation', 'asc')}>Réalisateur (A-Z)</li>
      <li onClick={() => props('realisation', 'desc')}>Réalisateur (Z-A)</li>
      <li onClick={() => props('annee', 'desc')}>Par année (du plus récent)</li>
      <li onClick={() => props('annee', 'asc')}>Par année (du plus ancien)</li>
    </ul>
  );
}

export default Filtre;
