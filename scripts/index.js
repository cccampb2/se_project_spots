const intitialCards = [
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
];

let page = document.querySelector(".page");
let modal = page.querySelector("#edit-modal");
let modalExitButton = page.querySelector(".modal__exit-button");
let profileEditButton = page.querySelector(".profile__edit-button");
let profileName = page.querySelector(".profile__name").textContent;
let profileDesc = page.querySelector(".profile__description").textContent;
let modalName = modal.querySelector("#name");
let modalDesc = modal.querySelector("#description");

function toggleEditModal() {
  modalName.value = profileName;
  modalDesc.value = profileDesc;
  modal.classList.toggle("modal__open");
}

profileEditButton.addEventListener("click", toggleEditModal);
modalExitButton.addEventListener("click", toggleEditModal);
