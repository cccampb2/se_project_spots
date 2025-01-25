import "./index.css";
import {
  settings,
  enableValidation,
  disableButton,
  toggleButtonState,
  resetValidation,
} from "../scripts/validation.js";

import { setButtonText, handleSubmit } from "../utils/helpers.js";

import Api from "../utils/Api.js";

import logo from "../images/Logo.svg";
const logoImage = document.getElementById("image-logo");
const avatarImage = document.getElementById("image-avatar");
logoImage.src = logo;

//Cards for deletion process
let selectedCard;
let selectedCardId;

const page = document.querySelector(".page");
const cardTemplate = page.querySelector("#card__template").content;
const cardList = page.querySelector(".cards__list");

//Edit Profile Modal
const editModal = page.querySelector("#edit-modal");
const editProfileExitButton = page.querySelector(".modal__profile-exit-button");
const profileEditButton = page.querySelector(".profile__edit-button");
const profileName = page.querySelector(".profile__name");
const profileDesc = page.querySelector(".profile__description");
const editModalName = editModal.querySelector("#name");
const editModalDesc = editModal.querySelector("#description");
const profileSaveBtn = editModal.querySelector(".modal__save-button");

//Edit Avatar Modal
const avatarModal = document.querySelector("#profile-link-modal");
const avatarForm = document.forms["profile-link"];
const avatarModalBtn = document.querySelector(".profile__avatar-btn");
const avatarInput = avatarModal.querySelector(".modal__input");
const avatarSaveBtn = avatarModal.querySelector(".modal__save-button");

//New Post Modal
const newPostModal = page.querySelector("#new-post-modal");
const newPostExitButton = page.querySelector(".modal__post-exit-button");
const newPostButton = page.querySelector(".profile__add-button");
const newPostUrl = page.querySelector("#link");
const newPostCaption = page.querySelector("#caption");
const buttonElement = page.querySelector("#new-post-btn");
const newPostSaveBtn = newPostModal.querySelector(".modal__save-button");

//Delete Modal
const deleteModal = document.querySelector("#delete-card-modal");
const deleteForm = document.forms["delete-card"];
const deleteBtn = deleteModal.querySelector(".modal__delete-button");
const cancelBtn = deleteModal.querySelector(".modal__cancel-button");

//Preview Modal
const previewModal = page.querySelector("#preview-modal");
const previewExitButton = previewModal.querySelector(
  ".modal__preview-exit-button"
);
const previewImage = previewModal.querySelector(".modal__preview-image");
const previewDesc = previewModal.querySelector(".modal__preview-desc");

//Universal function for close buttons
// Find all close buttons
const closeButtons = document.querySelectorAll(".modal__close");

const myApi = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "f6c1e3e7-6ede-480b-be3d-8b4192d2484b",
    "Content-Type": "application/json",
  },
});

closeButtons.forEach((button) => {
  // Find the closest popup only once
  const popup = button.closest(".modal");
  // Set the listener
  button.addEventListener("click", () => toggleModal(popup));
});

//Edit Profile Modal Functions/Handlers/Listeners
function toggleModal(modal) {
  modal.classList.toggle("modal_is-open");

  if (modal.classList.contains("modal_is-open")) {
    document.addEventListener("keyup", closeWithEscape);
  } else {
    document.removeEventListener("keyup", closeWithEscape);
  }
}

const closeWithEscape = (evt) => {
  if (evt.key === "Escape") {
    const currModal = page.querySelector(".modal_is-open");
    toggleModal(currModal);
  }
};

function handleProfileFormSubmit(evt) {
  function makeRequest() {
    return myApi
      .editUserInfo({ name: editModalName.value, about: editModalDesc.value })
      .then((data) => {
        profileName.textContent = data.name;
        profileDesc.textContent = data.about;
        toggleProfileModal();
        evt.preventDefault();
      });
  }

  handleSubmit(makeRequest, evt);
}

function handleAvatarSubmit(evt) {
  function makeRequest() {
    return myApi.editAvatarInfo({ avatar: avatarInput.value }).then((data) => {
      avatarImage.src = data.avatar;
      toggleModal(avatarModal);
    });
  }
  handleSubmit(makeRequest, evt);
}

function toggleProfileModal() {
  toggleModal(editModal);
}

profileEditButton.addEventListener("click", () => {
  editModalName.value = profileName.textContent;
  editModalDesc.value = profileDesc.textContent;
  resetValidation(profileFormElement, [editModalName, editModalDesc], settings);
  toggleProfileModal();
});

const profileFormElement = document.forms["edit-profile-form"];

profileFormElement.addEventListener("submit", handleProfileFormSubmit);

//New Post Modal Functions/Handlers/Listeners

newPostButton.addEventListener("click", () => {
  toggleModal(newPostModal);
});

function handleNewPostFormSubmit(evt) {
  function makeRequest() {
    return myApi
      .addNewCard({
        name: newPostCaption.value,
        link: newPostUrl.value,
      })
      .then((card) => {
        renderCard(card);
        toggleModal(newPostModal);
        disableButton(buttonElement, settings);
        evt.target.reset();
      });
  }

  handleSubmit(makeRequest, evt);
}

function handleDeleteSubmit(evt) {
  function makeRequest() {
    return myApi.deleteCard({ id: selectedCardId }).then(() => {
      selectedCard.remove();
      toggleModal(deleteModal);
    });
  }

  handleSubmit(makeRequest, evt, "Deleting...");
}

const newPostFormElement = document.forms["new-post-form"];
newPostFormElement.addEventListener("submit", handleNewPostFormSubmit);

//Card Functions/Handlers/Listeners

function getCardElement(data) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardDesc = cardElement.querySelector(".card__description");
  const cardImg = cardElement.querySelector(".card__image");
  const likeButton = cardElement.querySelector(".card__like-button");

  cardImg.src = data.link;
  cardImg.alt = data.name;
  cardDesc.textContent = data.name;
  if (data.isLiked) {
    likeButton.classList.add("card__like-button_liked");
  }

  cardImg.addEventListener("click", () => {
    previewImage.src = cardImg.src;
    previewDesc.textContent = cardDesc.textContent;
    previewImage.alt = cardDesc.textContent;

    toggleModal(previewModal);
  });

  likeButton.addEventListener("click", (evt) => {
    handleLike(evt, data);
  });

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", (evt) => {
    handleCardDelete(cardElement, data);
  });

  return cardElement;
}

function handleLike(evt, data) {
  const isLiked = evt.target.classList.contains("card__like-button_liked");
  myApi
    .handleCardLikeStatus({ id: data._id }, isLiked)
    .then((data) => {
      evt.target.classList.toggle("card__like-button_liked");
    })
    .catch(console.error);
}

function handleCardDelete(cardElement, data) {
  selectedCard = cardElement;
  selectedCardId = data._id;
  toggleModal(deleteModal);
}

cancelBtn.addEventListener("click", () => {
  toggleModal(deleteModal);
});

deleteForm.addEventListener("submit", handleDeleteSubmit);

function renderCard(item, method = "prepend") {
  const cardElement = getCardElement(item);
  // Add the card into the section using the method
  cardList[method](cardElement);
}

//Modal Listeners/functions
avatarModalBtn.addEventListener("click", () => {
  toggleModal(avatarModal);
});

avatarForm.addEventListener("submit", handleAvatarSubmit);

const modals = Array.from(page.querySelectorAll(".modal"));
modals.forEach((modal) => {
  modal.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("modal")) {
      toggleModal(evt.target);
    }
  });
});

myApi
  .getAppInfo()
  .then(([cards, user]) => {
    cards.forEach((card) => {
      renderCard(card, "append");
    });
    //Set User Info
    profileName.textContent = user.name;
    profileDesc.textContent = user.about;
    avatarImage.src = user.avatar;
    avatarImage.alt = `Photo of ${user.name}`;
  })
  .catch(console.error);

enableValidation(settings);
