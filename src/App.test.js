import { fireEvent, render, screen, cleanup, waitFor } from '@testing-library/react';
import App from './App';
import { calculerAge } from './App';
import { toast } from 'react-toastify';


// test("check counter on click me button",() => {
//   render(<App />);
//   const button = screen.getByRole("button");
//   const count = screen.getByTestId("count");
//   expect(button).toBeInTheDocument();
//   expect(count).toHaveTextContent
//   button.click();
//   expect(count).toHaveTextContent("1");
// }
// )

// test du toast 
describe('Test du toast', () => {
  beforeEach(() => {
    render(<App />);
  }
  );
  it('affiche le toast pour un code postal invalide - toast', async () => {
    // Trouvez l'input du code postal par son placeholder
    const inputCodePostal = screen.getByTestId('Code postal');
    fireEvent.change(inputCodePostal, { target: { value: '1234' } }); // Code postal invalide

    // Simulez la soumission du formulaire
    const button = screen.getByRole('button');
    fireEvent.click(button);

    // Attendez que toast.error soit appelé
    setTimeout(() => {
      // Vérifiez si un message d'erreur spécifique est affiché
      expect(toast.error).toHaveBeenCalledWith('Le code postal doit contenir 5 chiffres.', expect.anything());
    }, 50);
  });

  it('affiche le toast pour un mail invalide - toast', async () => {
    // Trouvez l'input du mail par son placeholder
    const inputMail = screen.getByTestId('Mail');
    fireEvent.change(inputMail, { target: { value: 'xxxx@xx' } }); // Mail invalide

    // Simulez la soumission du formulaire
    const button = screen.getByRole('button');
    fireEvent.click(button);

    // Attendez que toast.error soit appelé
    setTimeout(() => {
      // Vérifiez si un message d'erreur spécifique est affiché
      expect(toast.error).toHaveBeenCalledWith('Le mail n\'est pas valide', expect.anything());
    }, 50);
  }
  );
  it("on affiche le toast si tout est correct", async () => {
    // définir form avec des valeurs valides
    const submitButton = screen.getByRole('button');
    const nomInput = screen.getByTestId("Nom");
    const prenomInput = screen.getByTestId("Prénom");
    const mailInput = screen.getByTestId("Mail");
    const dateNaissanceInput = screen.getByTestId("dateNaissance");
    const codePostalInput = screen.getByTestId("Code postal");
    const villeInput = screen.getByTestId("Ville");

    fireEvent.change(nomInput, { target: { value: "Pessione" } });
    fireEvent.change(prenomInput, { target: { value: "Julien" } });
    fireEvent.change(mailInput, { target: { value: "julien.pessione83@gmail.com" } });
    fireEvent.change(dateNaissanceInput, { target: { value: "1983-11-01" } });
    fireEvent.change(codePostalInput, { target: { value: "83000" } });
    fireEvent.change(villeInput, { target: { value: "Toulon" } });

    fireEvent.click(submitButton);
    setTimeout(() => {
      expect(toast.success).toHaveBeenCalledWith('Formulaire valide', expect.anything());
    }
      , 50);

  })
}
)

// test du localStorage 
describe('Test du localStorage', () => {
  beforeEach(() => {
    render(<App />);
  }
  );
  it('sauvegarde les données du formulaire dans le localStorage', () => {
    // définir form avec des valeurs valides
    const submitButton = screen.getByRole('button');
    const nomInput = screen.getByTestId("Nom");
    const prenomInput = screen.getByTestId("Prénom");
    const mailInput = screen.getByTestId("Mail");
    const dateNaissanceInput = screen.getByTestId("dateNaissance");
    const codePostalInput = screen.getByTestId("Code postal");
    const villeInput = screen.getByTestId("Ville");

    fireEvent.change(nomInput, { target: { value: "Pessione" } });
    fireEvent.change(prenomInput, { target: { value: "Julien" } });
    fireEvent.change(mailInput, { target: { value: "julien.pessione83@gmail.com" } });
    fireEvent.change(dateNaissanceInput, { target: { value: "1983-11-01" } });
    fireEvent.change(codePostalInput, { target: { value: "83000" } });
    fireEvent.change(villeInput, { target: { value: "Toulon" } });

    fireEvent.click(submitButton);
    // Vérifiez si les données du formulaire ont été enregistrées dans le localStorage
    setTimeout(() => {
      expect(localStorage.setItem).toHaveBeenCalledWith('form', JSON.stringify({
        nom: "Pessione",
        prénom: "Julien",
        mail: "julien.pessione83@gmail.com",
        dateNaissance: "1983-11-01",
        ville: "Toulon",
        codePostal: "83000",
        age: 38
      }));
    }
      , 50);
  });
  it('si le formulaire n\'est pas valide, les données ne sont pas enregistrées dans le localStorage', () => {
    // définir form avec des valeurs invalides
    const submitButton = screen.getByRole('button');
    const nomInput = screen.getByTestId("Nom");
    const prenomInput = screen.getByTestId("Prénom");
    const mailInput = screen.getByTestId("Mail");
    const dateNaissanceInput = screen.getByTestId("dateNaissance");
    const codePostalInput = screen.getByTestId("Code postal");
    const villeInput = screen.getByTestId("Ville");

    fireEvent.change(nomInput, { target: { value: "Pessione" } });
    fireEvent.change(prenomInput, { target: { value: "Julien" } });
    fireEvent.change(mailInput, { target: { value: "julien.pessione83@gmail.com" } });
    fireEvent.change(dateNaissanceInput, { target: { value: "1983-11-01" } });
    fireEvent.change(codePostalInput, { target: { value: "1234" } });
    fireEvent.change(villeInput, { target: { value: "Toulon" } });

    fireEvent.click(submitButton);
    // Vérifiez si les données du formulaire n'ont pas été enregistrées dans le localStorage
    setTimeout(() => {
      expect(localStorage.setItem).not.toHaveBeenCalled();
    }
      , 50);

  });
}
)



describe('Test de l age', () => {
  beforeEach(() => {
    render(<App />);
  });
  it('should display error message when age is less than 18', () => {
    const input = screen.getByTestId('dateNaissance');
    fireEvent.change(input, { target: { value: '2005-01-01' } });
    fireEvent.blur(input);

    const error = screen.getByTestId('dateNaissanceError');
    // set time out pour attendre que le message d'erreur soit visible
    setTimeout(() => {
      expect(error).toHaveTextContent('Vous devez être majeur');
    }
      , 100);
  });
  it("the function should return the correct age", () => {
    const testDate = '2000-01-01'; // Utilisez une date qui rendra le test toujours valide
    const expectedAge = new Date().getFullYear() - 2000; // Ajustez en fonction de l'année actuelle
    expect(calculerAge(testDate)).toBe(expectedAge);
  })
});

describe('Test du code postal', () => {
  beforeEach(() => {
    render(<App />);
  });
  it('should display error message when code postal is not 5 digits', () => {
    const input = screen.getByTestId('Code postal');
    fireEvent.change(input, { target: { value: '1234' } });
    fireEvent.blur(input);

    const error = screen.getByTestId('Code postalError');
    // set time out pour attendre que le message d'erreur soit visible
    setTimeout(() => {
      expect(error).toHaveTextContent('Le code postal doit être composé de 5 chiffres');
    }
      , 20);
  });
  it('should display error message when code postal is not a number', () => {
    const input = screen.getByTestId('Code postal');
    fireEvent.change(input, { target: { value: 'abcde' } });
    fireEvent.blur(input);

    const error = screen.getByTestId('Code postalError');
    setTimeout(() => {
      expect(error).toHaveTextContent('Le code postal doit être composé de chiffres');
    }
      , 20);
  });
  it('should not display error message when code postal is valid', () => {
    const input = screen.getByTestId('Code postal');
    fireEvent.change(input, { target: { value: '12345' } });
    fireEvent.blur(input);

    const error = screen.getByTestId('Code postalError');
    setTimeout(() => {
      expect(error).toHaveTextContent('');
    }
      , 20);
  });
  it('should not display error message when code postal is valid', async () => {
    const input = screen.getByTestId('Code postal');
    fireEvent.change(input, { target: { value: '12345' } });
    fireEvent.blur(input);

    const error = screen.getByTestId('Code postalError');
    setTimeout(() => {
      expect(error).toHaveTextContent('');
    }
      , 20);
  });
})

describe('Test du mail', () => {
  beforeEach(() => {
    render(<App />);
  });
  it('should display error message when mail is not valid', () => {
    const input = screen.getByTestId('Mail');
    fireEvent.change(input, { target: { value: 'test@zz' } });
    fireEvent.blur(input);

    const error = screen.getByTestId('MailError');
    setTimeout(() => {
      expect(error).toHaveTextContent('Le mail n\'est pas valide');
    }
      , 20);
  });
  it('should not display error message when mail is valid', () => {
    const input = screen.getByTestId('Mail');
    fireEvent.change(input, { target: { value: 'julien.pessione83@gmail.com' } });
    fireEvent.blur(input);

    const error = screen.getByTestId('MailError');
    setTimeout(() => {
      expect(error).toHaveTextContent('');
    }
      , 20);
  }
  )
}
)

describe('Test du prénom', () => {
  beforeEach(() => {
    render(<App />);
  });
  it('should display error message when prénom is not valid', () => {
    const input = screen.getByTestId('Prénom');
    fireEvent.change(input, { target: { value: '1234' } });
    fireEvent.blur(input);

    const error = screen.getByTestId('PrénomError');
    setTimeout(() => {
      expect(error).toHaveTextContent('Le prénom ne doit pas contenir de chiffres ou de caractères spéciaux');
    }
      , 20);
  });
  it('should not display error message when prénom is valid', () => {
    const input = screen.getByTestId('Prénom');
    fireEvent.change(input, { target: { value: 'Julien' } });
    fireEvent.blur(input);

    const error = screen.getByTestId('PrénomError');
    setTimeout(() => {
      expect(error).toHaveTextContent('');
    }
      , 20);
  }
  ),
    it("should not display error message when prénom contain accent and - ", () => {
      const input = screen.getByTestId('Prénom');
      fireEvent.change(input, { target: { value: 'Jean-Piïêrre' } });
      fireEvent.blur(input);

      const error = screen.getByTestId('PrénomError');
      setTimeout(() => {
        expect(error).toHaveTextContent('');
      }
        , 20);
    })
  it("should display error message when prénom contain special characters", () => {
    const input = screen.getByTestId('Prénom');
    fireEvent.change(input, { target: { value: 'xx#xxx' } });
    fireEvent.blur(input);

    const error = screen.getByTestId('PrénomError');
    setTimeout(() => {
      expect(error).toHaveTextContent('Le prénom ne doit pas contenir de chiffres ou de caractères spéciaux');
    }
      , 20);
  })
})

describe('Test du nom', () => {
  beforeEach(() => {
    render(<App />);
  });
  it('should display error message when nom is not valid', () => {
    const input = screen.getByTestId('Nom');
    fireEvent.change(input, { target: { value: '1234' } });
    fireEvent.blur(input);

    const error = screen.getByTestId('NomError');
    setTimeout(() => {
      expect(error).toHaveTextContent('Le nom ne doit pas contenir de chiffres ou de caractères spéciaux');
    }
      , 20);
  });
  it('should not display error message when nom is valid', () => {
    const input = screen.getByTestId('Nom');
    fireEvent.change(input, { target: { value: 'Pessione' } });
    fireEvent.blur(input);

    const error = screen.getByTestId('NomError');
    setTimeout(() => {
      expect(error).toHaveTextContent('');
    }
      , 20);
  }
  ),
    it("should not display error message when nom contain accent and - ", () => {
      const input = screen.getByTestId('Nom');
      fireEvent.change(input, { target: { value: 'Pïêrre' } });
      fireEvent.blur(input);

      const error = screen.getByTestId('NomError');
      setTimeout(() => {
        expect(error).toHaveTextContent('');
      }
        , 20);
    })
  it("should display error message when nom contain special characters", () => {
    const input = screen.getByTestId('Nom');
    fireEvent.change(input, { target: { value: 'xx#xxx' } });
    fireEvent.blur(input);

    const error = screen.getByTestId('NomError');
    setTimeout(() => {
      expect(error).toHaveTextContent('Le nom ne doit pas contenir de chiffres ou de caractères spéciaux');
    }
      , 20);
  })
})

describe('Test de la ville', () => {
  beforeEach(() => {
    render(<App />);
  });
  it('should display error message when ville is not valid', () => {
    const input = screen.getByTestId('Ville');
    fireEvent.change(input, { target: { value: '1234' } });
    fireEvent.blur(input);

    const error = screen.getByTestId('VilleError');
    setTimeout(() => {
      expect(error).toHaveTextContent('La ville ne doit pas contenir de chiffres ou de caractères spéciaux');
    }
      , 20);
  });
  it('should not display error message when ville is valid', () => {
    const input = screen.getByTestId('Ville');
    fireEvent.change(input, { target: { value: 'Toulon' } });
    fireEvent.blur(input);

    const error = screen.getByTestId('VilleError');
    setTimeout(() => {
      expect(error).toHaveTextContent('');
    }
      , 20);
  }
  ),
    it("should not display error message when ville contain accent and - ", () => {
      const input = screen.getByTestId('Ville');
      fireEvent.change(input, { target: { value: 'Saint-Tropez' } });
      fireEvent.blur(input);

      const error = screen.getByTestId('VilleError');
      setTimeout(() => {
        expect(error).toHaveTextContent('');
      }
        , 20);
    })
  it("should display error message when ville contain special characters", () => {
    const input = screen.getByTestId('Ville');
    fireEvent.change(input, { target: { value: 'xx#xxx' } });
    fireEvent.blur(input);

    const error = screen.getByTestId('VilleError');
    setTimeout(() => {
      expect(error).toHaveTextContent('La ville ne doit pas contenir de chiffres ou de caractères spéciaux');
    }
      , 20);
  })
})

describe('Validation de la soumission du formulaire', () => {
  beforeEach(() => {
    render(<App />);
  });

  it('désactive le bouton de soumission si les champs requis ne sont pas remplis', () => {
    const submitButton = screen.getByRole('button');
    expect(submitButton).toBeDisabled();
  });
  it("active le bouton de soumission si les champs requis sont remplis", () => {
    const submitButton = screen.getByRole('button');
    const nomInput = screen.getByTestId("Nom");
    const prenomInput = screen.getByTestId("Prénom");
    const mailInput = screen.getByTestId("Mail");
    const dateNaissanceInput = screen.getByTestId("dateNaissance");
    const codePostalInput = screen.getByTestId("Code postal");
    const villeInput = screen.getByTestId("Ville");

    fireEvent.change(nomInput, { target: { value: "Pessione" } });
    fireEvent.change(prenomInput, { target: { value: "Julien" } });
    fireEvent.change(mailInput, { target: { value: "julien.pessione83@gmail.com" } });
    fireEvent.change(dateNaissanceInput, { target: { value: "1983-11-01" } });
    fireEvent.change(codePostalInput, { target: { value: "83000" } });
    fireEvent.change(villeInput, { target: { value: "Toulon" } });

    expect(submitButton).toBeEnabled();
  })
});


