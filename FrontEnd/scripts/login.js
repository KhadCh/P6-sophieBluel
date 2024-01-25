const alredyLoggedError = document.querySelector(".alredyLogged__error"); 
const loginEmailError = document.querySelector(".loginEmail__error"); 
const loginMdpError = document.querySelector(".loginMdp__error"); 

const email = document.getElementById("email");
const password = document.getElementById("password");

const submit = document.getElementById("submit");


// Au clic, on envoie les valeurs de connexion

submit.addEventListener("click", function (event) {
    
    event.preventDefault();
    let user = {
        email: email.value,
        password: password.value
       
    };
    console.log("jai bien cliqué sur submit ");
    login(user);
});
    
  async function login(id) {
            loginEmailError.innerHTML = "";
            loginMdpError.innerHTML = "";
        try {
          const response = await fetch("http://localhost:5678/api/users/login", {
            method: "POST", // or 'PUT'
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(id),
          });
      
          const result = await response.json();
          console.log("Success:", result);
            // véeification de l'email
            if (!id.email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]{2,}\.[a-z]{2,4}$/g)) {
                const p = document.createElement("p");
                p.innerHTML = "Veuillez entrer une adresse mail valide";
                loginEmailError.appendChild(p);
                return;
            }
          // Si couple email/mdp est incorrect
          if (result.error || result.message) {
            const p = document.createElement("p");
            p.innerHTML = "La combinaison e-mail/mot de passe est incorrecte";
            loginMdpError.appendChild(p);
            return;

        // Si couple email/mdp correct
           } else if (result.token) {
            localStorage.setItem("token", result.token);
            window.location.href = "index.html";
           }
        
        
        } catch (error) {
          console.error("Error:", error);
        }    

}




