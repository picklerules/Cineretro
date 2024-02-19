import TuileFilm from '../TuileFilm/TuileFilm';
import './ListeFilms.css';

function ListeFilms() {

  const listeFilms = [
    { id: 1, titre: 'Film 1', realisateur:'Bilo', annee:'1992' },
    { id: 2, titre: 'Film 2', realisateur:'Alex', annee:'2020' },
    { id: 3, titre: 'Film 3', realisateur:'Memo', annee:'1999' }
  ];

  const tuilesFilm = listeFilms.map((film, index)=> {
    return <TuileFilm key={index} data={film}/>
  });
  
  return (
  <main >
    <h2>Liste des films</h2>
    <div className="grid">
      {tuilesFilm}
    </div>
    
  </main>
  )

}

export default ListeFilms;
