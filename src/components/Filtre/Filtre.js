import './Filtre.css';

// Filtre.js
function Filtre({ onFiltreChange }) {
  return (
    <ul>
      <li onClick={() => onFiltreChange('titre', 'asc')}>Titre (A-Z)</li>
      <li onClick={() => onFiltreChange('titre', 'desc')}>Titre (Z-A)</li>
      <li onClick={() => onFiltreChange('realisation', 'asc')}>Réalisateur (A-Z)</li>
      <li onClick={() => onFiltreChange('realisation', 'desc')}>Réalisateur (Z-A)</li>
      <li onClick={() => onFiltreChange('annee', 'desc')}>Par année (du plus récent)</li>
      <li onClick={() => onFiltreChange('annee', 'asc')}>Par année (du plus ancien)</li>
    </ul>
  );
}

export default Filtre;
