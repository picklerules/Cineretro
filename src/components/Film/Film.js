import { useParams } from 'react-router-dom';
import './Film.css';

function Film() {
  let { id } = useParams();


  return (
    <div className="grid__item">

      <h2>Détails du Film</h2>

    </div>
  );
}

export default Film;
