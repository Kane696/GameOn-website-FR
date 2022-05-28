
let btnSubmit = document.querySelector(".btn-submit");
let firstName = document.querySelector("#first");
let lastName = document.querySelector("#last");
let email = document.querySelector("#email");
let birthdate = document.querySelector("#birthdate");
let cguCheckbox = document.querySelector("#checkbox1");
let form = document.querySelector("form");


form.addEventListener('submit', (e) => {
    e.preventDefault();
    if(firstName.value.length < 2){
        formData[0].dataset.errorVisible = "true";
        formData[0].dataset.error = "Veuillez entrer 2 caractères ou plus pour le champ du prénom";
    } else if(firstName.value.length === 0){
        formData[0].dataset.errorVisible = "true";
        formData[0].dataset.error = "Veuillez entrer votre prénom";
    } else{
        formData[0].dataset.errorVisible = "false";
    }

    if(lastName.value.length < 2){
        formData[1].dataset.errorVisible = "true";
        formData[1].dataset.error = "Veuillez entrer 2 caractères ou plus pour le champ du nom";
    } else{
        formData[1].dataset.errorVisible = "false";
    }


    let validMail = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+).[a-zA-Z0-9-]*$/;

    console.log(validMail.test(email.value))

    if(validMail.test(email.value) == false){
        formData[2].dataset.errorVisible = "true";
        formData[2].dataset.error = "Vous devez enter une adresse mail valide";
    } else {
        formData[2].dataset.errorVisible = "false";
    }



    let birthdateStr = birthdate.value;
        const getBirthdateYear = new Date(birthdateStr).getFullYear();
        const getCurrentYear = new Date().getFullYear();
        let rangeAge = getCurrentYear - getBirthdateYear;
    
        if(birthdateStr === ""){
            formData[3].dataset.errorVisible = "true";
            formData[3].dataset.error = "Vous devez selectionner votre âge";
        } else if(rangeAge < 18){
            formData[3].dataset.errorVisible = "true";
            formData[3].dataset.error = "Vous devez être majeur pour participer";
        } else {
            formData[3].dataset.errorVisible = "false";
        }

    let radioArr = formData[5].children;

    let radioInputs = [];
    let radioValidate = false; 

    for(element of radioArr){
        if(element.type == 'radio'){
            radioInputs.push(element)
        }
    }
    for(let i = 0; i < radioInputs.length; i++){

        if(radioInputs[i].checked){
            radioValidate = true;
        }
        if(radioValidate){
            formData[5].dataset.errorVisible = "false";
            
        } else {
            formData[5].dataset.errorVisible = "true";
            formData[5].dataset.error = "Vous devez selectionner un tournoi";
        }
    }


        if(cguCheckbox.checked === false){
            formData[6].dataset.errorVisible = "true";
            formData[6].dataset.error = "Vous devez vérifier que vous acceptez les termes et conditions";
        } else {
            formData[6].dataset.errorVisible = "false";
        }
})

