import './Accueil.css';
import accueilDonnees from './Accueil.json'

function Accueil() {
  
  return (
    <main>
      {/*Le contenu du fichier accueil.json importé, placer accueil.json dans le composants accueil*/}
      {accueilDonnees.map((p, index) => (
        <p key={index}>{p}</p>
      ))}
    </main>
)

}

export default Accueil;
