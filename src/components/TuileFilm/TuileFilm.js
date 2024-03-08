import './TuileFilm.css';

function TuileFilm({ data, filtreActif }) { 

  return (
    <article className="grid__item">
      <img src={`/img/${data.titreVignette}`} alt={data.titre} />

      <h3>{data.titre}</h3>
      {/* {filtreActif.champ === 'realisation' && <p>Réalisateur: {data.realisation}</p>}
      {filtreActif.champ === 'annee' && <p>Année: {data.annee}</p>} */}

    </article>
  );
}

export default TuileFilm;
