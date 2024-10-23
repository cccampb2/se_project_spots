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

const page = document.querySelector(".page");
const editModal = page.querySelector("#edit-modal");
const modalExitButton = page.querySelector(".modal__exit-button");
const profileEditButton = page.querySelector(".profile__edit-button");
const profileName = page.querySelector(".profile__name");
const profileDesc = page.querySelector(".profile__description");
const modalName = editModal.querySelector("#name");
const modalDesc = editModal.querySelector("#description");
const cardTemplate = page.querySelector("#card__template").content;
const cardList = page.querySelector(".cards__list");

function toggleEditModal() {
  editModal.classList.toggle("modal_open");
}

function handleProfileFormSubmit(evt) {
  profileName.textContent = modalName.value;
  profileDesc.textContent = modalDesc.value;
  toggleEditModal();
  evt.preventDefault();
}

function openProfileModal() {
  modalName.value = profileName.textContent;
  modalDesc.value = profileDesc.textContent;
  toggleEditModal(); // here to toggle the modal
}

function getCardElement(data) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardDesc = cardElement.querySelector(".card__description");
  const cardImg = cardElement.querySelector(".card__image");

  cardImg.src = data.link;
  cardImg.alt = data.name;
  cardDesc.textContent = data.name;
  return cardElement;
}

profileEditButton.addEventListener("click", openProfileModal);
modalExitButton.addEventListener("click", openProfileModal);

const profileFormElement = document.forms["edit-profile-form"];

profileFormElement.addEventListener("submit", handleProfileFormSubmit);

intitialCards.forEach((item) => cardList.append(getCardElement(item)));
