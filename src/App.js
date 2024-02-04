import React, { useEffect, useState } from 'react';
import './App.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [form, setForm] = useState({
    nom: "",
    prénom: "",
    mail: "",
    dateNaissance: "",
    ville: "",
    codePostal: "",
    age: 0
  })
  const [errorForm, setErrorForm] = useState({
    nom: "",
    prénom: "",
    mail: "",
    dateNaissance: "",
    ville: "",
    codePostal: ""
  })

  const isFormValid = Object.values(form).every((value) => value !== "");


  useEffect(() => {
    const form = JSON.parse(localStorage.getItem("form"));
    if (form) {
      setForm(form);
      toast.success("Récupération des données du formulaire");
    }
  }
    , []);


  const handleChange = (e, key) => {
    setForm({ ...form, [key]: e.target.value });
  };

  // faire les vérification des noms et prénoms et ville (pas de chiffres, pas de caractères spéciaux)
  useEffect(() => {
    if (form.nom) {
      const regex = /^[a-zA-ZÀ-ÿ-]+(?:\s[a-zA-ZÀ-ÿ-]+)*$/;
      if (!regex.test(form.nom)) {
        setErrorForm({ ...errorForm, nom: "Le nom ne doit pas contenir de chiffres ou de caractères spéciaux" });
      } else {
        setErrorForm({ ...errorForm, nom: "" });
      }
    }
  }, [form.nom]);

  useEffect(() => {
    if (form.prénom) {
      const regex = /^[a-zA-ZÀ-ÿ-]+(?:\s[a-zA-ZÀ-ÿ-]+)*$/;
      if (!regex.test(form.prénom)) {
        setErrorForm({ ...errorForm, prénom: "Le prénom ne doit pas contenir de chiffres ou de caractères spéciaux" });
      } else {
        setErrorForm({ ...errorForm, prénom: "" });
      }
    }
  }, [form.prénom]);

  useEffect(() => {
    if (form.ville) {
      const regex = /^[a-zA-ZÀ-ÿ-]+(?:\s[a-zA-ZÀ-ÿ-]+)*$/;
      if (!regex.test(form.ville)) {
        setErrorForm({ ...errorForm, ville: "La ville ne doit pas contenir de chiffres ou de caractères spéciaux" });
      }
      else {
        setErrorForm({ ...errorForm, ville: "" });
      }
    }
  }
    , [form.ville]);




  // faire les vérification de l'age
  useEffect(() => {
    if (form.dateNaissance) {
      const age = calculerAge(form.dateNaissance);
      if (age < 18) {
        setErrorForm({ ...errorForm, dateNaissance: "Vous devez être majeur" });
      }
      else {
        setErrorForm({ ...errorForm, dateNaissance: "" });
      }
    }
  }, [form.dateNaissance]);

  // faire les vérification du code postal (5 chiffres, que des chiffres)
  useEffect(() => {
    if (form.codePostal) {
      if (form.codePostal.length !== 5) {
        setErrorForm({ ...errorForm, codePostal: "Le code postal doit être composé de 5 chiffres" });
      } else if (isNaN(form.codePostal)) {
        setErrorForm({ ...errorForm, codePostal: "Le code postal doit être composé de chiffres" });
      } else {
        setErrorForm({ ...errorForm, codePostal: "" });
      }
    }
  }, [form.codePostal]);

  // faire les vérification du mail (format mail valide avec un regex)
  useEffect(() => {
    if (form.mail) {
      const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      if (!regex.test(form.mail)) {
        setErrorForm({ ...errorForm, mail: "Le mail n'est pas valide" });
      } else {
        setErrorForm({ ...errorForm, mail: "" });
      }
    }
  }, [form.mail]);

  const onClickSubmit = (e) => {
    e.preventDefault();
    // vériifer que tout les champs sont remplis
    let error = false;
    // vérifier que tout les champs sont remplis
    Object.keys(form).forEach(key => {
      if (!form[key]) {
        setErrorForm({ ...errorForm, [key]: "Ce champ est obligatoire" });
        error = true;
      }
    })
    // vérifier que tout les champs sont valides (pas d'erreur dans le formulaire)
    Object.keys(errorForm).forEach(key => {
      if (errorForm[key]) {
        toast.error(errorForm[key]);
        error = true;
      }
    })

    if (!error) {
      // appeler le composant popUp avec le message de validation et un bouton pour fermer la popUp
      toast.success("Formulaire validé");
      // enregistrer dans le local storage les données du formulaire
      localStorage.setItem("form", JSON.stringify(form));
      // mettre tout les champs du formulaire à vide
      setForm({
        nom: "",
        prénom: "",
        mail: "",
        dateNaissance: "",
        ville: "",
        codePostal: "",
        age: ""
      });
    }


  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Formulaire #1</h1>
        <ToastContainer />
      </header>
      <div className='body'>
        <form className="Formulaire-view">
          <div className='divInputsContainer'>
            {textInput({ value: form.mail, onChange: (e) => handleChange(e, "mail"), hoverText: "Mail", error: errorForm.mail })}
          </div>
          {/* faire le champ pour nom prenom date */}
          <div className='divInputsContainer'>
            {textInput({ value: form.nom, onChange: (e) => handleChange(e, "nom"), hoverText: "Nom", error: errorForm.nom })}
            {textInput({ value: form.prénom, onChange: (e) => handleChange(e, "prénom"), hoverText: "Prénom", error: errorForm.prénom })}
            <div className='divInput'>
              <label className="inputLabel" >Date de naissance</label>
              <input
                type="date"
                value={form.dateNaissance}
                onChange={(e) => handleChange(e, "dateNaissance")}
                className='inputField'
                data-testid="dateNaissance"
                onFocus={(e) => e.target.style.borderColor = "violet"}
                // si il n'y as plus le focus on remet la couleur de base
                onBlur={(e) => e.target.style.borderColor = errorForm.dateNaissance ? "red" : "gray"}
                style={{ borderColor: errorForm.dateNaissance ? "red" : "gray", flex: 1 }}
              />
              <label className='errorText' data-testid="dateNaissanceError">{errorForm.dateNaissance}</label>
            </div>
          </div>
          {/* faire le champ pour mail ville code postal */}

          <div className='divInputsContainer'>
            {textInput({ value: form.ville, onChange: (e) => handleChange(e, "ville"), hoverText: "Ville", error: errorForm.ville })}
            {textInput({ value: form.codePostal, onChange: (e) => handleChange(e, "codePostal"), hoverText: "Code postal", error: errorForm.codePostal })}
          </div>

          <div className='divSubmitContainer'>
            <button
              className='submitButton'
              type="submit"
              onClick={(e) => {
                // set les valeurs du formulaire à vide sans recharger la page
                e.preventDefault();
                setForm({
                  nom: "",
                  prénom: "",
                  mail: "",
                  dateNaissance: "",
                  ville: "",
                  codePostal: "",
                  age: ""
                });
              }}
              style={{
                color: "black",
                backgroundColor: "transparent",
                border: "1px solid black",
                marginRight: "10px",
                cursor: "pointer"
              }}
              // le curseur change en pointer si le bouton est cliquable
              data-testid="submitButton"
            >
              Supprimer
            </button>
            <button
              className='submitButton'
              type="submit"
              onClick={(e) => {
                onClickSubmit(e);
              }}
              disabled={!isFormValid}
              style={{
                backgroundColor: isFormValid ? "#7A1CFF" : "grey",
                cursor: isFormValid ? "pointer" : "not-allowed"
              }}
              // le curseur change en pointer si le bouton est cliquable
              data-testid="submitButton"
            >
              Valider
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function textInput({ value, onChange, placeholder = "", hoverText, error }) {
  return (
    <div className='divInput'>
      <label className="inputLabel"
      >{hoverText}</label>
      <input
        data-testid={hoverText}
        className='inputField'
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        // on focus the border color is violet
        onFocus={(e) => e.target.style.borderColor = "violet"}
        // si il n'y as plus le focus on remet la couleur de base
        onBlur={(e) => e.target.style.borderColor = error ? "red" : "gray"}
        style={{ borderColor: error ? "red" : "gray", flex: 1 }}
      />
      <label className='errorText' data-testid={hoverText + "Error"}
      >{error}</label>
    </div>
  )
}

export const calculerAge = (dateNaissance) => {
  const date = new Date(dateNaissance);
  const now = new Date();
  const age = now.getFullYear() - date.getFullYear();
  return age;
}


export default App;

