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
const editModal = page.querySelector("#edit-modal");
const modalExitButton = page.querySelector(".modal__exit-button");
const profileEditButton = page.querySelector(".profile__edit-button");
let profileName = page.querySelector(".profile__name");
let profileDesc = page.querySelector(".profile__description");
const modalName = editModal.querySelector("#name");
const modalDesc = editModal.querySelector("#description");
let cardTemplate = page.querySelector("#card__template").content;
let cardList = page.querySelector(".cards__list");

function toggleEditModal() {
  modalName.value = profileName.textContent;
  modalDesc.value = profileDesc.textContent;
  editModal.classList.toggle("modal__open");
}

function handleProfileFormSubmit(evt) {
  profileName.textContent = modalName.value;
  profileDesc.textContent = modalDesc.value;
  editModal.classList.toggle("modal__open");
  evt.preventDefault();
}

function getCardElement(data) {
  let cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  let cardDesc = cardElement.querySelector(".card__description");
  let cardImg = cardElement.querySelector(".card__image");

  cardImg.src = data.link;
  cardImg.alt = data.name;
  cardDesc.textContent = data.name;
  return cardElement;
}

profileEditButton.addEventListener("click", toggleEditModal);
modalExitButton.addEventListener("click", toggleEditModal);

const profileFormElement = page.querySelector("#edit-profile");

profileFormElement.addEventListener("submit", handleProfileFormSubmit);

for (item of intitialCards) {
  cardList.append(getCardElement(item));
}
