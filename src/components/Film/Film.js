import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TuileFilm from "../TuileFilm/TuileFilm";
import "./Film.css";

function Film() {
  let { id } = useParams();
  const [filmDetails, setFilmDetails] = useState(null);
  const urlFilmDetail = `https://api-films-qfje.onrender.com/api/films/${id}`;

  useEffect(() => {
    fetch(urlFilmDetail)
      .then((reponse) => reponse.json())
      .then((data) => {
        setFilmDetails(data);
      })

      .catch((error) =>
        console.error("Erreur lors du chargement du détail du film:", error)
      );
  }, [id]);

  console.log(filmDetails);

  if (!filmDetails) {
    return <div>Chargement des détails du film...</div>;
  }

  return (
    <div className="detail__container">
      <div className="detail__item">
        <h2>{filmDetails.titre}</h2>
        <img
          src={`/img/${filmDetails.titreVignette}`}
          alt={filmDetails.titre} loading="lazy"
        />
        <p>Realisateur: {filmDetails.realisation}</p>
        <p>Année: {filmDetails.annee}</p>
        <p>Genres: {filmDetails.genres}</p>
        <p>Description: {filmDetails.description}</p>
      </div>
    </div>
  );
}

export default Film;
