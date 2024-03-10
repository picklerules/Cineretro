import './Accueil.css';
import accueilDonnees from './Accueil.json'

function Accueil() {
  
  return (
    <main className="main__accueil">
      <img className="img__accueil" src="/img/cineretro.webp"/>
      <div className="accueil__container">
      {accueilDonnees.map((p, index) => (
        <p key={index}>{p}</p>
      ))}
      </div>
    </main>
)

}

export default Accueil;
