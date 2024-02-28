import './Filtre.css';

// Filtre.js
function Filtre({ onFiltreChange, filtreActif }) {
  return (
    <ul>
       <li className={filtreActif.champ === 'titre' && filtreActif.ordre === 'asc' ? 'active' : ''} onClick={() => onFiltreChange('titre', 'asc')}>Titre (A-Z)</li>
      <li className={filtreActif.champ === 'titre' && filtreActif.ordre === 'desc' ? 'active' : ''} onClick={() => onFiltreChange('titre', 'desc')}>Titre (Z-A)</li>
      <li className={filtreActif.champ === 'realisation' && filtreActif.ordre === 'asc' ? 'active' : ''} onClick={() => onFiltreChange('realisation', 'asc')}>Réalisateur (A-Z)</li>
      <li className={filtreActif.champ === 'realisation' && filtreActif.ordre === 'desc' ? 'active' : ''} onClick={() => onFiltreChange('realisation', 'desc')}>Réalisateur (Z-A)</li>
      <li className={filtreActif.champ === 'annee' && filtreActif.ordre === 'desc' ? 'active' : ''} onClick={() => onFiltreChange('annee', 'desc')}>Par année (du plus récent)</li>
      <li className={filtreActif.champ === 'annee' && filtreActif.ordre === 'asc' ? 'active' : ''} onClick={() => onFiltreChange('annee', 'asc')}>Par année (du plus ancien)</li>
    </ul>
  );
}

export default Filtre;
