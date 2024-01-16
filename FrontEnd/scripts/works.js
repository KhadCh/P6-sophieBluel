// >>> GENERATION DES PROJETS
console.log('je suis bien dans le fichier works.js');


const btnAll = document.querySelector(".filter__btn-id-all");
const btnId1 = document.querySelector(".filter__btn-id-1");
const btnId2 = document.querySelector(".filter__btn-id-2");
const btnId3 = document.querySelector(".filter__btn-id-3");

const sectionProjets = document.querySelector(".gallery"); 


generationProjets('all');

// Reset la section projets
function resetSectionProjets() {  
	sectionProjets.innerHTML = "";
}

// Génère les projets
async function generationProjets(id) { 
    console.log('je suis bien dans le fichier function.js');

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


    if ((id===1) || (id===2) || (id===3)){
        works = works.filter(works => works.categoryId === id);
        console.log("le data filter est : "+works.categoryId);
    }

     // Change la couleur du bouton en fonction du filtre

    let btn = document.querySelectorAll(".filter__btn");
    for (let i=0; i<btn.length; i++){
        btn[i].classList.remove("filter__btn-active");
    }
    document.querySelector(`.filter__btn-id-${id}`).classList.add("filter__btn-active");



    if (works.length === 0 || works === undefined) { 
        const p = document.createElement("p");
        p.classList.add("error");
        p.innerHTML = "Aucun projet à afficher <br><br>Toutes nos excuses pour la gêne occasionnée";
        sectionProjets.appendChild(p);
        return;
    }

    // Génère les projets
    if (id === 'all' || [1, 2, 3].includes(id)) {

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

}

// >>> FILTRES

btnAll.addEventListener("click", () => { // Tous les projets
    generationProjets('all');})

btnId1.addEventListener("click", () => { // Objets
    generationProjets(1);})

btnId2.addEventListener("click", () => { // Appartements
    generationProjets(2);})

btnId3.addEventListener("click", () => { // Hôtels & restaurants
    generationProjets(3);})