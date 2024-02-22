
import './TuileFilm.css';

function TuileFilm(props) {

  return (
  <article className="grid__item">
    <img src={`img/${props.data.titreVignette}`} alt={props.data.titre}></img>
    <h3 >{props.data.titre}</h3>
    {/* <p>Realisateur: {props.data.realisation}</p>
    <p>Année: {props.data.annee}</p> */}
    
  </article>

  )
}

export default TuileFilm;
