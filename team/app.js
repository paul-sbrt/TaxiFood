// appelle de la fonction pour que ca marche 
clic();

// fonction qui pour chaque personne capte le clic (edit save supr) puis en fonction envoie la fonction associee//

function clic (){

    // recuperation de touts les fichiers personne de html//
      const personnes = document.querySelectorAll(".personne");
    
    
      personnes.forEach((personne) => {
        const editButton = personne.querySelector(".edit-but");
        const saveButton = personne.querySelector(".register");
        const deleteBtn = personne.querySelector(".suprimer");
    
        editButton.addEventListener ("click", () => {
            editMode(personne);
        })
    
        saveButton.addEventListener ("click", () => {
            save(personne);
        })
    
        deleteBtn.addEventListener('click', () => {
            deleteCard(personne);
        });
    })
    
}


// Fonction pour rogner //
function editMode (personne) {
    const name = personne.querySelector(".name");
    const job = personne.querySelector(".job");
    const description = personne.querySelector(".description");
    const editButton = personne.querySelector(".edit-but");
    const saveButton = personne.querySelector(".register");

    name.setAttribute("contenteditable","true");
    job.setAttribute("contenteditable","true");
    description.setAttribute("contenteditable","true");

    editButton.style.display = 'none';
    saveButton.style.display = 'block';
}

// fonction pour save //
function save (personne) {
    const name = personne.querySelector(".name");
    const job = personne.querySelector(".job");
    const description = personne.querySelector(".description");
    const editButton = personne.querySelector(".edit-but");
    const saveButton = personne.querySelector(".register");

    name.setAttribute("contenteditable","false");
    job.setAttribute("contenteditable","false");
    description.setAttribute("contenteditable","false");

    editButton.style.display = 'block';
    saveButton.style.display = 'none';

}

function deleteCard(personne) {
    personne.remove()
}

// bouton ajout //

const addButton = document.querySelector('.add');
addButton.addEventListener('click', addNewPerson);

//fonction pour ajout//

function addNewPerson() {
    const container = document.querySelector('.container');
    const newPerson = document.createElement('div');
    newPerson.className = 'personne';

    newPerson.innerHTML = ` 
    <div class="delete">
       <button class="suprimer"><i class="fa-solid fa-trash-can"></i></button>
    </div>
    <div class="editable">
      <button class="edit-but"><i class="fa-solid fa-pen"></i></button>
    </div>
    <div class="reg">
       <button class="register" style="display: none;"><i class="fa-solid fa-check"></i></button>
    </div>
    <img src="ressources/images/unknow.png" alt="unknow">
    <h2 class="name">Prenom Nom </h2>
    <h3 class="job">job</h3>
    <p class="description">Description </p>
    </div>`;


    container.append(newPerson);
    editMode(newPerson)
    clic();
}

