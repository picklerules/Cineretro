import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FormFilm.css";

function FormFilm() {
  const genres = [
    "Action",
    "Aventure",
    "Comédie",
    "Documentaire",
    "Drame",
    "Fantasie",
    "Horreur",
    "Policier",
    "Mystery",
    "Science-Fiction",
    "Thriller",
    "Western",
  ];

  const [formData, setFormData] = useState({
    titre: "",
    annee: "",
    description: "",
    realisation: "",
    titreVignette: "vide.jpg",
    genres: [],
  });

  const [formValidity, setFormValidity] = useState("invalid");
  const navigate = useNavigate();
  //TODO:
  //ici on utilise le usestate pour capter les messages d'erreur

  function onFormDataChange(e) {
    //on recupere le nom du champ
    const name = e.target.name;
    //on recupere la valeur du champ
    const value = e.target.value;

    if (name.startsWith("genre")) {

      const isChecked = e.target.checked;
      let genres = formData.genres || [];
      //si on decoche, on enleve
      if (!isChecked && genres.includes(value)) {
        genres = genres.filter((genre, index) => {
          return genre !== value;
        });

      } else if (isChecked && !genres.includes(value)) {
        genres.push(value);
      }

      //on met à jour la valeur du champ
      const donneeModifiee = {...formData, genres };
    
      setFormData(donneeModifiee);

    } else {
      //on met à jour la valeur du champ
      const donneeModifiee = { ...formData, [name]: value };

      const formIsValid = e.target.form.checkValidity() ? "valid" : "invalid";
      setFormValidity(formIsValid);

      setFormData(donneeModifiee);
    }
  }

  async function onFormSubmit(e) {
    e.preventDefault();
    //vérifie si le form est valide
    if (formValidity == "invalid") {
      //afficher message d'erreur
      e.target.reportValidity();
      return;
    }
    //prépare la donnée
    const data = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("api-film")}`,
      },
      body: JSON.stringify(formData),
    };
    //récupère le token
    //soumettre
    const request = await fetch("http://localhost:3301/api/films", data);
    const response = await request.json();
    //gérer la réponse du form
    if (request.status === 200) {
      //afficher un message de succcès

      //vider les données du formulaire
      setFormData({
        titre: "",
        annee: "",
        description: "",
        realisation: "",
        titreVignette: "vide.jpg",
        genres: [],
      });
      //réinitialiser le state de validité
      setFormValidity("invalid");
      navigate("/liste-films");
    } else {
      const messageError = response.message;
      console.log("erreur", messageError);
    }
  }

  return (
    <main>
      <div>
        <h1>Ajouter un film</h1>
        <form className={formValidity} onSubmit={onFormSubmit}>
          <input
            className="input__formfilm"
            type="text"
            name="titre"
            placeholder="Titre du film"
            value={formData.titre}
            onChange={onFormDataChange}
            required
            maxLength={150}
          ></input>

          <input
            className="input__formfilm"
            type="text"
            name="annee"
            placeholder="Année du film"
            value={formData.annee}
            onChange={onFormDataChange}
            minLength={4}
            max={4}
          ></input>

          <textarea
            className="textarea__formfilm"
            type="text"
            name="description"
            placeholder="Description du film"
            value={formData.description}
            onChange={onFormDataChange}
            minLength={1}
            maxLength={500}
          ></textarea>

          <input
            className="input__formfilm"
            type="text"
            name="realisation"
            placeholder="Réalisateur"
            value={formData.realisation}
            onChange={onFormDataChange}
            minLength={1}
            maxLength={50}
          ></input>

          <input
            className="input__formfilm"
            type="text"
            name="titreVignette"
            placeholder="Titre de la vignette"
            value={formData.titreVignette}
            onChange={onFormDataChange}
          ></input>

          {/* <input className="input__formfilm" type="text" name="genres" placeholder="Genre du film"
            value={formData.genres} onChange={onFormDataChange}></input> */}

          <div className="input__formfilm">
            <p>Genres</p>

            {genres.map((element, index) => {
              return (
                <div key={index}>
                  <input
                    type="checkbox"
                    id={element}
                    name={`genre-${element}`}
                    value={element}
                    onChange={onFormDataChange}
                    checked={formData.genres.includes(element)}
                  />
                  <label htmlFor={element}>{element}</label>
                </div>
              );
            })}
          </div>

          <button disabled={formValidity == "invalid" ? "disabled" : ""}>
            Ajouter un film
          </button>
        </form>
        {/* { messageError!== ""? <div className="message__erreur">{messageError}</div> : null} */}
      </div>
    </main>
  );
}

export default FormFilm;
