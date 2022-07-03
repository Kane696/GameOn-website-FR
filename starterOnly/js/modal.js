function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const closeBtn = document.querySelector(".close");
const modalContent = document.querySelector(".content");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// close modal event
closeBtn.addEventListener("click", closeModal);


// launch modal form
function launchModal() {
  modalContent.style.animationName = "modalopen";
  modalContent.style['-webkit-animation-duration'] = ".8s";
  modalbg.style.display = "block";
}

// close modal form
function closeModal() {
    modalContent.style.animationName = "modalclose"
    modalContent.style['-webkit-animation-duration'] = "1s";

  setTimeout(function(){
    modalbg.style.display = "none";
    location.reload();
  }, 950);
  
}
