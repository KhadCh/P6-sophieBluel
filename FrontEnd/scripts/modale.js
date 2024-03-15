

// update de la galerie apres suppression et ajout de projet
const updateSectionProjets = document.querySelector(".gallery"); 
function resetSectionProjets() {  
	updateSectionProjets.innerHTML = "";  // Reset la section projets
}
// Génère les projets
async function updateGenerationProjets(id) { 
   
    try {
        const response = await fetch('http://localhost:5678/api/works'); 
        works = await response.json();
        console.log('je suis bien dans le fichier try .js');
        console.log(works);
    }
    catch{
        const p = document.createElement("p");
        p.classList.add("error");
        p.innerHTML = "Une erreur est survenue lors de la récupération des projets<br><br>Une tentative de reconnexion automatique auras lieu dans une minute<br><br><br><br>Si le problème persiste, veuillez contacter l'administrateur du site";
        sectionProjets.appendChild(p);
       // await new Promise(resolve => setTimeout(resolve, 60000));
        window.location.href = "index.html";
    }

    resetSectionProjets()

    // Génère les projets

        for (let i = 0; i < works.length; i++) {

            const itemCategory = works[i].category.name;
            console.log('la categorie est : '+itemCategory);

            const figure = document.createElement("figure"); 
            sectionProjets.appendChild(figure);
            figure.classList.add(`js-projet-${works[i].id}`); // Ajoute l'id du projet pour le lien vers la modale lors de la supression 
            const img = document.createElement("img");
            img.src = works[i].imageUrl;
            img.alt = works[i].title;
            figure.appendChild(img);

            const figcaption = document.createElement("figcaption");
            figcaption.innerHTML = works[i].title;
            figure.appendChild(figcaption);
        }

}

// Reset la section projets dans la modale
function resetmodaleSectionProjets() {  
    modaleSectionProjets.innerHTML = "";  
}

// Reset le formulaire d'ajout de photo apres envoi
function formulaireReset(){
    const container = document.querySelector('.form-group-photo');

    container.style = 'display';
    const image = document.querySelector(".js-image");

    const fileSize = document.querySelector(".js-fileSize");
    const faImage = document.querySelector('.fa-image');
    const photoLabel = document.querySelector('.add-picture');
    const descr = document.querySelector('.js-image');

    image.style = 'display';
    faImage.style = 'display';
    photoLabel.style = 'display';
    descr.style = 'display';
    fileSize.style = 'display';

    formulaire.reset();
    document.getElementById("photo").value = '';
    document.querySelector(".js-image").files[0] = '';
    console.log('je suis bien ds la fonction resetFonction');
}




// Ouverture de la modale
let modale = null;
let dataAdmin;
const modaleSectionProjets = document.querySelector(".js-admin-projets"); 
const formulaire = document.querySelector(".modale-projet-form"); 

const openModale = function(e) {
    e.preventDefault()
    modale = document.querySelector(e.target.getAttribute("href"))

    modaleProjets(); // Génère les projets dans la modale admin
    // attendre la fin de la génération des projets
    setTimeout(() => {
        modale.style.display = null
        modale.removeAttribute("aria-hidden")
        modale.setAttribute("aria-modal", "true")
    }, 25);
    // Ajout EventListener sur les boutons pour ouvrir la modale projet
    document.querySelectorAll(".js-modale-projet").forEach(a => {
        a.addEventListener("click", openModaleProjet)});

    // Apl fermeture modale
    modale.addEventListener("click", closeModale)
    modale.querySelector(".js-modale-close").addEventListener("click", closeModale)
    modale.querySelector(".js-modale-stop").addEventListener("click", stopPropagation)
    formulaire.reset();
};

// Génère les projets dans la modale admin
async function modaleProjets() { 
    const response = await fetch('http://localhost:5678/api/works'); 
    dataAdmin = await response.json();
      resetmodaleSectionProjets() 
    for (let i = 0; i < dataAdmin.length; i++) {
        
        const div = document.createElement("div");
        div.classList.add("gallery__item-modale");
        modaleSectionProjets.appendChild(div);

        const img = document.createElement("img");
        img.src = dataAdmin[i].imageUrl;
        img.alt = dataAdmin[i].title;
        div.appendChild(img);

        const p = document.createElement("p");
        div.appendChild(p);
        p.classList.add(dataAdmin[i].id, "js-delete-work");

        const icon = document.createElement("i");
        icon.classList.add("fa-solid", "fa-trash-can"); 
        p.appendChild(icon);

    }
    deleteWork()
    formulaire.reset();
}

//  Ferme la modale
const closeModale = function(e) {
    e.preventDefault() 
    if (modale === null) return

    modale.setAttribute("aria-hidden", "true")
    modale.removeAttribute("aria-modal")

    modale.querySelector(".js-modale-close").removeEventListener("click", closeModale)
    formulaire.reset();
    // Fermeture de la modale apres 400ms 
    window.setTimeout(function() {
        modale.style.display = "none"
        modale = null
       resetmodaleSectionProjets()
    }, 30)
};

// ferme la modale lors de la suppression
const closeModaleSuppression= function() {

    if (modale === null) return

    modale.setAttribute("aria-hidden", "true")
    modale.removeAttribute("aria-modal")

    modale.querySelector(".js-modale-close").removeEventListener("click", closeModale)
    formulaire.reset();
    // Fermeture de la modale apres 400ms 
    window.setTimeout(function() {
        modale.style.display = "none"
        modale = null
       resetmodaleSectionProjets()
    }, 30)
};


const stopPropagation = function(e) {
    e.stopPropagation()
};
// Selectionne les éléments qui ouvrent la modale
document.querySelectorAll(".js-modale").forEach(a => {
    a.addEventListener("click", openModale)
});
// Ferme la modale avec la touche echap
window.addEventListener("keydown", function(e) {
    if (e.key === "Escape" || e.key === "Esc") {
        closeModale(e)
        closeModaleSuppression(e)
        closeModaleProjet(e)}
});

////////////////////////////////////////////////////////////
// INDEX : 3-// GESTION SUPPRESSION D'UN PROJET /////////////
////////////////////////////////////////////////////////////

// Event listener sur les boutons supprimer par apport a leur id
function deleteWork() {
    let btnDelete = document.querySelectorAll(".js-delete-work");
    for (let i = 0; i < btnDelete.length; i++) {
        btnDelete[i].addEventListener("click", deleteProjets);
    }}

    // Supprimer le projet
async function deleteProjets() {

    await fetch(`http://localhost:5678/api/works/${this.classList[0]}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}`},
    })
    .then (response => {
    
        // Token good
        if (response.status === 204) {
    
            updateGenerationProjets('all');
            closeModaleSuppression(); // ferme la modale sans eventDefault 
            console.log(" SUPPRESION DU PROJET " + this.classList[0])
           
        }
        // Token inorrect
        else if (response.status === 401) {
            alert("Vous n'êtes pas autorisé à supprimer ce projet, merci de vous connecter avec un compte valide")
            window.location.href = "login.html";
        }
    })
    .catch (error => {
        console.log(error)
    })
}


////////////////////////////////////////////////////
// INDEX : 4-/ GESTION BOITE MODALE AJOUT PROJET ///
////////////////////////////////////////////////////

// Ouverture de la modale projet

const modaleErrorMsg = document.querySelector(".modale_error_msg"); 
let modaleProjet = null;
const openModaleProjet = function(e) {
    e.preventDefault() 
    modaleProjet = document.querySelector(e.target.getAttribute("href"))

    modaleProjet.style.display = null
    modaleProjet.removeAttribute("aria-hidden")
    modaleProjet.setAttribute("aria-modal", "true")

    // Apl fermeture modale
    modaleProjet.addEventListener("click", closeModaleProjet)
    modaleProjet.querySelector(".js-modale-close").addEventListener("click", closeModaleProjet)
    modaleProjet.querySelector(".js-modale-stop").addEventListener("click", stopPropagation)

    modaleProjet.querySelector(".js-modale-return").addEventListener("click", backToModale)

    formulaire.reset();
    console.log('le reset a ete effectuer ');
    modaleErrorMsg.innerHTML="";
    modaleErrorMsg.style.background='white';
};

// Fermeture de la modale projet
const closeModaleProjet = function(e) {
  
    if (modaleProjet === null) return

    modaleProjet.setAttribute("aria-hidden", "true")
    modaleProjet.removeAttribute("aria-modal")

    modaleProjet.querySelector(".js-modale-close").removeEventListener("click", closeModaleProjet)
    modaleProjet.querySelector(".js-modale-stop").removeEventListener("click", stopPropagation)

    modaleProjet.style.display = "none"
    modaleProjet = null
    
    closeModale(e)
    generationProjets('all');
};

// Retour au modale 
const backToModale = function(e) {
    e.preventDefault() 
    modaleProjet.style.display = "none"
    modaleProjet = null
    resetmodaleSectionProjets()
    modaleProjets(dataAdmin)
};

// ////////////////////////////////////////////////////
// // INDEX : 5-/ GESTION AJOUT D'UN PROJET        ///
// ////////////////////////////////////////////////////

//------Aperçu photo avant upload (ajout photo)---------

const image = document.querySelector(".js-image");
const title = document.querySelector(".js-title").value;
const categoryId = document.querySelector(".js-categoryId").value;
const btnSubmit = document.querySelector(".js-add-work") ;
const error_msg= document.querySelector(".modale_error_msg");
const fileSize = document.querySelector(".js-fileSize");

// Événement lorsque l'utilisateur sélectionne une image
image.addEventListener('change', function(event) {
    event.preventDefault()
  const file = image.files[0];
  const container = document.querySelector('.form-group-photo');

  container.style.background = 'center / contain no-repeat url(' + URL.createObjectURL(file) + '), #E8F1F6';
  const faImage = document.querySelector('.fa-image');
  const photoLabel = document.querySelector('.add-picture');
  const descr = document.querySelector('.js-image');
  
  image.style.display="none";
  faImage.style.display = 'none';
  photoLabel.style.display = 'none';
  descr.style.display = 'none';
  fileSize.style.display='none';

  if (title != "" && categoryId != "" && image != undefined) {
    btnSubmit.style.background="red";
    btnSubmit.style.border="#1D6154";
    btnSubmit.style.color='white';
  } 
});

const btnAjouterProjet = document.querySelector(".js-add-work");
btnAjouterProjet.addEventListener("click", addWork);

// Ajouter un projet
async function addWork(event) {
    event.preventDefault();

    const image = document.querySelector(".js-image").files[0];
    const title = document.querySelector(".js-title").value;
    const categoryId = document.querySelector(".js-categoryId").value;
    // Événement lorsque l'utilisateur sélectionne une image

    if (title === "" || categoryId === "" || image === undefined) {

       error_msg.innerHTML = "Merci de remplir tous les champs";
       error_msg.style.background="red";
       return;

    } else if (categoryId !== "1" && categoryId !== "2" && categoryId !== "3") {
        return;

    } else {
    try {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("category", categoryId);
        formData.append("image", image);

        const response = await fetch("http://localhost:5678/api/works", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        });

        if (response.status === 201) {

           updateGenerationProjets('all');
           alert("Projet ajouté avec succès :)");
           modaleProjets(dataAdmin);
           formulaireReset();
       
           closeModaleSuppression();
           closeModaleProjet();
           formulaire.reset();
           

        } else if (response.status === 400) {
            alert("Merci de remplir tous les champs");
        } else if (response.status === 500) {
            alert("Erreur serveur");
        } else if (response.status === 401) {
            alert("Vous n'êtes pas autorisé à ajouter un projet");
            window.location.href = "login.html";
    }}

    catch (error) {
        console.log(error);
    }
    }
}




