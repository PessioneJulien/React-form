/**
 * Verify the postal code format and set an error message if it is invalid.
 * @name postalCodeVerification
 * @param {object} form - The form object.
 * @param {object} errorForm - The error form object.
 * @param {function} setErrorForm - The function to set the error form object.
 */
export function postalCodeVerification(form, errorForm, setErrorForm) {
    if (form.codePostal) {
        if (form.codePostal.length !== 5) {
            setErrorForm({ ...errorForm, codePostal: "Le code postal doit être composé de 5 chiffres" });
        } else if (isNaN(form.codePostal)) {
            setErrorForm({ ...errorForm, codePostal: "Le code postal doit être composé de chiffres" });
        } else {
            setErrorForm({ ...errorForm, codePostal: "" });
        }
    }
}

/**
 * Verify the email format and set an error message if it is invalid.
 * @name MailVerification
 * @param {object} form - The form object.
 * @param {object} errorForm - The error form object.
 * @param {function} setErrorForm - The function to set the error form object.
 */
export function MailVerification(form, errorForm, setErrorForm) {
    if (form.mail) {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!regex.test(form.mail)) {
            setErrorForm({ ...errorForm, mail: "Le mail n'est pas valide" });
        } else {
            setErrorForm({ ...errorForm, mail: "" });
        }
    }
}

/**
 * Verify the city name format and set an error message if it is invalid.
 * @name CodeVilleVerification
 * @param {object} form - The form object.
 * @param {object} errorForm - The error form object.
 * @param {function} setErrorForm - The function to set the error form object.
 */
export function CodeVilleVerification(form, errorForm, setErrorForm) {
    if (form.ville) {
        const regex = /^[a-zA-ZÀ-ÿ-]+(?:\s[a-zA-ZÀ-ÿ-]+)*$/;
        if (!regex.test(form.ville)) {
            setErrorForm({ ...errorForm, ville: "La ville ne doit pas contenir de chiffres ou de caractères spéciaux" });
        } else {
            setErrorForm({ ...errorForm, ville: "" });
        }
    }
}

/**
 * Verify the date of birth and set an error message if the person is under 18 years old.
 * @name DateDeNaissance
 * @param {object} form - The form object.
 * @param {object} errorForm - The error form object.
 * @param {function} setErrorForm - The function to set the error form object.
 */
export function DateDeNaissance(form, errorForm, setErrorForm) {
    if (form.dateNaissance) {
        const age = calculerAge(form.dateNaissance);
        if (age < 18) {
            setErrorForm({ ...errorForm, dateNaissance: "Vous devez être majeur" });
        } else {
            setErrorForm({ ...errorForm, dateNaissance: "" });
        }
    }
}

/**
 * Verify the first name format and set an error message if it is invalid.
 * @name ValidationPrenom
 * @param {object} form - The form object.
 * @param {object} errorForm - The error form object.
 * @param {function} setErrorForm - The function to set the error form object.
 */
export function ValidationPrenom(form, errorForm, setErrorForm) {
    if (form.prénom) {
        const regex = /^[a-zA-ZÀ-ÿ-]+(?:\s[a-zA-ZÀ-ÿ-]+)*$/;
        if (!regex.test(form.prénom)) {
            setErrorForm({ ...errorForm, prénom: "Le prénom ne doit pas contenir de chiffres ou de caractères spéciaux" });
        } else {
            setErrorForm({ ...errorForm, prénom: "" });
        }
    }
}

/**
 * Verify the last name format and set an error message if it is invalid.
 * @name VerificationNom
 * @param {object} form - The form object.
 * @param {object} errorForm - The error form object.
 * @param {function} setErrorForm - The function to set the error form object.
 */
export function VerificationNom(form, errorForm, setErrorForm) {
    if (form.nom) {
        const regex = /^[a-zA-ZÀ-ÿ-]+(?:\s[a-zA-ZÀ-ÿ-]+)*$/;
        if (!regex.test(form.nom)) {
            setErrorForm({ ...errorForm, nom: "Le nom ne doit pas contenir de chiffres ou de caractères spéciaux" });
        } else {
            setErrorForm({ ...errorForm, nom: "" });
        }
    }
}

/**
 * Calculate the age based on the given date of birth.
 * @name calculerAge
 * @param {string} dateNaissance - The date of birth in the format "YYYY-MM-DD".
 * @returns {number} The calculated age.
 */
export const calculerAge = (dateNaissance) => {
    const date = new Date(dateNaissance);
    const now = new Date();
    const age = now.getFullYear() - date.getFullYear();
    return age;
};

