import { NavLink } from 'react-router-dom';
import './Entete.css';

function Entete() {
  
  return (
  <header>
    <NavLink to="/"><h1>CinéRétro</h1></NavLink>
    <nav>
      <NavLink to="/liste-films">Liste des films</NavLink>
    </nav>
  </header>
  )

}

export default Entete;
