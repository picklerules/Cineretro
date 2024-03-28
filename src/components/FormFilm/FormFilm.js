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

    //condition uniquement pour les checkbox
    if (name.startsWith("genre")) {
      //on récupère l'état du checkbox
      const isChecked = e.target.checked;
      let genres = formData.genres || [];
      //si on decoche, et que la valeur est dans le tableau de notre objet film
      if (!isChecked && genres.includes(value)) {
        //créer un nouveau tableau sans la donnée décochéee
        genres = genres.filter((genre, index) => {
          //si true, genre est ajouté au tableau, si false, genre n'est pas ajouté au tableau
          return genre !== value;
        });

        //si on coche la boite et que la valeur n'est pas dans le tableau de notre objet film
      } else if (isChecked && !genres.includes(value)) {
        //on ajoute la valeur au tableau
        genres.push(value);
      }

      //on met à jour notre objet
      const donneeModifiee = { ...formData, genres };
      setFormData(donneeModifiee);

    } else if (name === "titreVignette"){
      const nomFichier = e.target.files[0].name;
    
      const donneeModifiee = { ...formData, "titreVignette": nomFichier };
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
    if (request.status === 201) {
      TODO:
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

          <label htmlFor="titreVignette">Titre Vignette</label>
          <input
            className="input__formfilm"
            type="file"
            name="titreVignette"
            id="titreVignette"
            onChange={onFormDataChange}
            accept=".jpg, .jpeg, .png"
          />

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
