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
          { context.estLog ? <NavLink to="/admin">Admin</NavLink> : ''}
          <NavLink to="/liste-films">Films</NavLink>
               
      { context.estLog ? <button  onClick={props.handleLogout} >Logout</button> : 
       <form onSubmit={props.handleLogin}>
       <input type="text" name="usager" placeholder="Nom d'usager"></input>
          <button>Login</button>
      </form>
      }
        </nav>

      </header>
      { context.estLog ? <p><i>Yeehaw, {context.usager} ! </i></p> : ''}
    </div>
    
  );
}

export default Entete;
