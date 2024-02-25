
import './TuileFilm.css';

function TuileFilm(props) {

  return (
  <article className="grid__item">
    <img src={`img/${props.data.titreVignette}`} alt={props.data.titre}></img>
    <h3 >{props.data.titre}</h3>
    {/* utilisé l'opérateur ternaire pour passé le filtre à l'enfant */}
  </article>

  )
}

export default TuileFilm;
