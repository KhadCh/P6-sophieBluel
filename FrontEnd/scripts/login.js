console.log("je suis bien dans mon fichier login.js")

document.addEventListener("DOMContentLoaded", function () {
    
    // Partie pour gérer le formulaire de connexion
    const loginForm = document.getElementById("login");
    const loginURL = "http://localhost:5678/api/users/login";
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const errorContainer = document.getElementById("error-message");

    console.log(loginForm);
    console.log(emailInput);
    console.log(passwordInput);
    
    if (loginForm) {
        loginForm.addEventListener("submit", async function (event) {
            event.preventDefault();

            console.log("Form submitted");
        
            // récupérées l'email et password
            const email = emailInput.value;
            const password = passwordInput.value;

            try {
           
           //(email et password) au format JSON.
                const response = await fetch(loginURL, {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json;charset=utf-8",
                    },
                    body: JSON.stringify({ email, password })
                });

                if (response.ok) {

                    const userData = await response.json();

                    localStorage.setItem("token", userData.token);

                    window.location.href = "./index.html";
                
                } else if (response.status === 401) {
                    errorContainer.textContent = "Combinaison email/mot de passe incorrecte";
                } else {
                    errorContainer.textContent = "Une erreur s'est produite lors de la connexion. Veuillez réessayer.";
                    console.error('Erreur lors de la connexion:', response.statusText);
                }
            } catch (error) {
                errorContainer.textContent = "Une erreur inattendue s'est produite lors de la connexion. Veuillez réessayer.";
                console.error('Erreur inattendue lors de la connexion:', error.message);
            }
        });
    }

});
