const form = document.querySelector("form");
let firstName = document.getElementById("first");
let lastName = document.querySelector("#last");
let email = document.querySelector("#email");
let birthdate = document.querySelector("#birthdate");
let tournoiQty = document.querySelector("#quantity");
let tournoiCity = document.querySelector(".radio-input").parentElement;
let cguCheckbox = document.querySelector("#checkbox1");
let modalBody = document.querySelector(".modal-body");
let tournoiValue;

if(form){
    form.addEventListener('submit', async event => {
        event.preventDefault();
        
        const data = {
            firstName: '',
            lastName: '',
            email: '',
            birthdate: '',
            quantity: ''
        }
        
        if(formIsValid()){
            try{
                const json = JSON.stringify(this.data);
                const response = await fetch('http://localhost:3000/api/users', {
                    method: 'POST',
                    body: json,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const body = await response.json();
                if(body.status === "success"){
                    modalBody.innerHTML ='<p style="margin-top: 48%; margin-bottom: 48%; text-align: center;">Merci pour votre inscription</p><button class="btn-close" type="button">Fermer</button>';
                    document.querySelector('.btn-close').addEventListener('click', (e) => {
                        closeModal();
                        
                    })
                }
                
            } catch(e){
                console.log(e);
            }
        }
    });

    form.addEventListener('input', (e) => {
        if(e.target.id === "first"){
            validateFirstname(firstName);
        }  else if(e.target.id === 'last'){
            validateLastname(lastName);
        } else if(e.target.id === 'email'){
            validateEmail(email);
        } else if(e.target.id === 'birthdate'){
            validateBirthdate(birthdate);
        } else if(e.target.id === 'quantity'){
            validateQty(tournoiQty);
        } else if(e.target.name === 'location'){
            validateTournoiCty(tournoiCity);
        } else if(e.target.id === 'checkbox1'){
            validateCgu(cguCheckbox);
        }
    })
}


function validateFirstname(firstName){
    if(firstName.value.length === 0 ){
        displayError(firstName, "Veuillez entrer votre prénom");
        return false;
    } else if(firstName.value.length < 2){
        displayError(firstName, "Veuillez entrer 2 caractères ou plus pour le champ du prénom");
        return false;
    } else {
        displaySuccess(firstName);
        return true;
    }
}

function validateLastname(lastName){
    if(lastName.value.length === 0 ){
        displayError(lastName, "Veuillez entrer votre nom");
        return false;
    } else if(lastName.value.length < 2){
        displayError(lastName, "Veuillez entrer 2 caractères ou plus pour le champ du nom");
        return false;
    } else {
        displaySuccess(lastName);
        return true;
    }
}

function validateEmail(email){
    let validMail = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+).[a-zA-Z0-9-]*$/;

    if(validMail.test(email.value) == false){
        displayError(email, 'Vous devez enter une adresse mail valide');
        return false;
    } else {
        displaySuccess(email)
        return true;
    }
}

function validateBirthdate(birthdate){
    let birthdateStr = birthdate.value;
        const getBirthdateYear = new Date(birthdateStr).getFullYear();
        const getCurrentYear = new Date().getFullYear();
        let rangeAge = getCurrentYear - getBirthdateYear;
    
        if(birthdateStr === ""){
            displayError(birthdate, "Vous devez selectionner votre âge");
            return false;
        } else if(rangeAge < 18){
            displayError(birthdate, "Vous devez être majeur pour participer");
            return false;
        } else {
            displaySuccess(birthdate);
            return true;
        }
}

function validateQty(tournoiQty){

    if(tournoiQty.value.length === 0){
        displayError(tournoiQty, "Vous devez remplir ce champs");
        return false;
        
    } else {
        displaySuccess(tournoiQty);
        return true;
    }
}

function validateTournoiCty(tournoiCity){
    let isChecked = false;
    let radioInputs = tournoiCity.querySelectorAll('.radio-input');
    if(radioInputs.length > 0){
        radioInputs.forEach((radioField) => {
            if(radioField.checked){
                isChecked = true;
                tournoiValue = radioField.value;
                return tournoiValue;
            } 
        });
        if(isChecked){
            displaySuccess(tournoiCity);
            return true;
        } 
        else {
            displayError(tournoiCity, "Vous devez selectionner une ville");
            return false;
        }
    }
}  

function validateCgu(cguCheckbox){
    if(cguCheckbox.checked === false){
        displayError(cguCheckbox, "Vous devez accepter les termes et conditions");
        return false;
    } else {
        displaySuccess(cguCheckbox);
        return true;
    }
}


function displayError(input, msg){
    if(input.classList.contains("formData")){
        
        input.dataset.errorVisible = "true"
        input.dataset.error = msg;
        
    } else {
        // display error border
        input.parentElement.dataset.errorVisible = "true"

    // display error msg
    input.parentElement.dataset.error = msg;
    }
    

}

function displaySuccess(input){
    if(input.classList.contains("formData")){
        input.dataset.errorVisible = "false";
            input.dataset.error = "";
        
    } else {
        // display error border
        input.parentElement.dataset.errorVisible = "false";
        input.parentElement.dataset.error = "";
    }
}

const formIsValid = () => {
    let firstnameIsVaild = validateFirstname(firstName),
    lastnameIsValid = validateLastname(lastName),
    emailIsValid = validateEmail(email),
    birthdateIsValid = validateBirthdate(birthdate),
    quantityIsVaild = validateQty(tournoiQty),
    tournoiCityIsVaild = validateTournoiCty(tournoiCity, tournoiValue),
    cguIsValid = validateCgu(cguCheckbox)

    fielsIsValid = firstnameIsVaild && lastnameIsValid && emailIsValid && birthdateIsValid && quantityIsVaild && tournoiCityIsVaild && cguIsValid;

    if(fielsIsValid){
        this.data = {
            firstName: firstName.value,
            lastName: lastName.value,
            email: email.value,
            birthdate: birthdate.value,
            quantity: parseInt(tournoiQty.value),
            tournoiCity: tournoiValue
        }
        return data;
    }
}

