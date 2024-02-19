import './TuileFilm.css';

function TuileFilm(props) {

  return (
  <article className="grid__item">
    <h3 >{props.data.titre}</h3>
    <p>Realisateur: {props.data.realisateur}</p>
    <p>Année: {props.data.annee}</p>
  </article>

  )
}

export default TuileFilm;
