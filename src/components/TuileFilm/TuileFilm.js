import { Link } from 'react-router-dom';
import './TuileFilm.css';

function TuileFilm(props) {

  return (
  <article className="grid__item">
    <Link to={`/film/${props.id}`}>
    <h3 >{props.data.titre}</h3>
    </Link>
    
    <p>Realisateur: {props.data.realisateur}</p>
    <p>Année: {props.data.annee}</p>
  </article>

  )
}

export default TuileFilm;
