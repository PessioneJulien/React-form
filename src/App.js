/**
 * @fileOverview This file contains the main component of the React application, which is a form.
 * @module App
 * @requires react
 * @requires react-toastify
 * @requires './App.css'
 * @requires './App.test.js'
 */

import React, { useEffect, useState } from 'react';
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { postalCodeVerification, MailVerification, CodeVilleVerification, DateDeNaissance, ValidationPrenom, VerificationNom, calculerAge } from './Fonctions';
/** 
 * Main component of the React application.
 * @returns {JSX.Element} The JSX element representing the form.
 */
function App() {
  // State variables for the form and form errors
  const [form, setForm] = useState({
    nom: "",
    prénom: "",
    mail: "",
    dateNaissance: "",
    ville: "",
    codePostal: "",
    age: 0
  });
  const [errorForm, setErrorForm] = useState({
    nom: "",
    prénom: "",
    mail: "",
    dateNaissance: "",
    ville: "",
    codePostal: ""
  });

  // Check if the form is valid
  const isFormValid = Object.values(form).every((value) => value !== "");

  // Load form data from local storage on component mount
  useEffect(() => {
    const form = JSON.parse(localStorage.getItem("form"));
    if (form) {
      setForm(form);
      toast.success("Récupération des données du formulaire");
    }
  }, []);

  /**
   * Handle form input change.
   * @name handleChange
   * @param {Event} e - The input change event.
   * @param {string} key - The key of the form field being changed.
   */
  const handleChange = (e, key) => {
    setForm({ ...form, [key]: e.target.value });
  };

  // Perform validation for name, surname, and city fields
  useEffect(() => {
    VerificationNom(form, errorForm, setErrorForm)


  }, [form.nom]);

  useEffect(() => {
    ValidationPrenom(form, errorForm, setErrorForm)

  }, [form.prénom]);

  useEffect(() => {
    CodeVilleVerification(form, errorForm, setErrorForm)
  }, [form.ville]);

  // Perform validation for age field
  useEffect(() => {
    DateDeNaissance(form, errorForm, setErrorForm)
  }, [form.dateNaissance]);

  // Perform validation for postal code field
  useEffect(() => {
    postalCodeVerification(form, errorForm, setErrorForm);
  }, [form.codePostal]);

  // Perform validation for email field
  useEffect(() => {
    MailVerification(form, errorForm, setErrorForm);
  }, [form.mail]);

  /**
   * Handle form submission.
   * @param {Event} e - The form submission event.
   */
  const onClickSubmit = (e) => {
    e.preventDefault();
    let error = false;

    // Check if all fields are filled
    Object.keys(form).forEach(key => {
      if (!form[key]) {
        setErrorForm({ ...errorForm, [key]: "Ce champ est obligatoire" });
        error = true;
      }
    });

    // Check if there are any form errors
    Object.keys(errorForm).forEach(key => {
      if (errorForm[key]) {
        toast.error(errorForm[key]);
        error = true;
      }
    });

    if (!error) {
      // Display success message and save form data to local storage
      toast.success("Formulaire validé");
      localStorage.setItem("form", JSON.stringify(form));
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
  };

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
          <div className='divInputsContainer'>
            {textInput({ value: form.nom, onChange: (e) => handleChange(e, "nom"), hoverText: "Nom", error: errorForm.nom })}
            {textInput({ value: form.prénom, onChange: (e) => handleChange(e, "prénom"), hoverText: "Prénom", error: errorForm.prénom })}
            <div className='divInput'>
              <label className="inputLabel">Date de naissance</label>
              <input
                type="date"
                value={form.dateNaissance}
                onChange={(e) => handleChange(e, "dateNaissance")}
                className='inputField'
                data-testid="dateNaissance"
                onFocus={(e) => e.target.style.borderColor = "violet"}
                onBlur={(e) => e.target.style.borderColor = errorForm.dateNaissance ? "red" : "gray"}
                style={{ borderColor: errorForm.dateNaissance ? "red" : "gray", flex: 1 }}
              />
              <label className='errorText' data-testid="dateNaissanceError">{errorForm.dateNaissance}</label>
            </div>
          </div>
          <div className='divInputsContainer'>
            {textInput({ value: form.ville, onChange: (e) => handleChange(e, "ville"), hoverText: "Ville", error: errorForm.ville })}
            {textInput({ value: form.codePostal, onChange: (e) => handleChange(e, "codePostal"), hoverText: "Code postal", error: errorForm.codePostal })}
          </div>
          <div className='divSubmitContainer'>
            <button
              className='submitButton'
              type="submit"
              onClick={(e) => {
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
              data-testid="cancelButton"
            >
              Supprimer
            </button>
            <button
              role='button'
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

/**
 * Render a text input field.
 * @name textInput
 * @param {Object} props - The input field properties.
 * @param {string} props.value - The value of the input field.
 * @param {Function} props.onChange - The function to handle input change.
 * @param {string} [props.placeholder=""] - The placeholder text for the input field.
 * @param {string} props.hoverText - The hover text for the input field.
 * @param {string} props.error - The error message for the input field.
 * @returns {JSX.Element} The JSX element representing the text input field.
 */
function textInput({ value, onChange, placeholder = "", hoverText, error }) {
  return (
    <div className='divInput'>
      <label className="inputLabel">{hoverText}</label>
      <input
        data-testid={hoverText}
        className='inputField'
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        onFocus={(e) => e.target.style.borderColor = "violet"}
        onBlur={(e) => e.target.style.borderColor = error ? "red" : "gray"}
        style={{ borderColor: error ? "red" : "gray", flex: 1 }}
      />
      <label className='errorText' data-testid={hoverText + "Error"}>{error}</label>
    </div>
  );
}



export default App;

