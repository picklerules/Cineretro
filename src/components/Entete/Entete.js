import { AppContext } from "../App/App";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import "./Entete.css";

function Entete(props) {

  const context = useContext(AppContext);

  console.log(props);

  return (
    <div>
      <header>
        <NavLink to="/">
          <h1>CineRetro</h1>
        </NavLink>
        <nav>
          {/* { props.estLog ? <NavLink to="/admin">Admin</NavLink> : '' } */}
          {/* { props.logging.estLog ? <NavLink to="/admin">Admin</NavLink> : '' } */}
          { context.estLog ? <NavLink to="/admin">Admin</NavLink> : ''}
         

          <NavLink to="/liste-films">Liste des films</NavLink>
        </nav>
      </header>
      <form onSubmit={props.handleLogin}>
          <input type="text" name="usager" placeholder="Nom d'usager"></input>
          <button>Login</button>
      </form>
      { context.estLog ? <p>Bonjour {context.usager}</p> : ''}
    </div>
  );
}

export default Entete;
