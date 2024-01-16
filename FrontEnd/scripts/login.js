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
        
          // Si couple email/mdp est incorrect
          if (result.error || result.message) {
            const p = document.createElement("p");
            p.innerHTML = "La combinaison e-mail/mot de passe est incorrecte";
            loginMdpError.appendChild(p);

        // Si couple email/mdp correct
           } else if (result.token) {
            localStorage.setItem("token", result.token);
            window.location.href = "index.html";
           }
        
        
        } catch (error) {
          console.error("Error:", error);
        }    

}




// // Récupération du token
// const token = localStorage.getItem("token");
// const AlredyLogged = document.querySelector(".js-alredy-logged");

// adminPanel()
// // Gestion de l'affichage des boutons admin
// function adminPanel() {
//     document.querySelectorAll(".admin__modifer").forEach(a => {
//         if (token === null) {
//             return;
//         }
//         else {
//             a.removeAttribute("aria-hidden")
//             a.removeAttribute("style")
//             AlredyLogged.innerHTML = "deconnexion";
//         }
//     });
// }