const intitialCards = [
  {
    name: "Golden Gate Bridge",
    link: "  https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
  },
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

//New Post Modal
const newPostModal = page.querySelector("#new-post-modal");
const newPostExitButton = page.querySelector(".modal__post-exit-button");
const newPostButton = page.querySelector(".profile__add-button");
const newPostUrl = page.querySelector("#link");
const newPostCaption = page.querySelector("#caption");

//Preview Modal
const previewModal = page.querySelector("#preview-modal");
const previewExitButton = previewModal.querySelector(
  ".modal__preview-exit-button"
);
const previewImage = previewModal.querySelector(".modal__preview-image");

//Edit Profile Modal Functions/Handlers/Listeners
function toggleModal(modal) {
  modal.classList.toggle("modal_is-open");
}

function handleProfileFormSubmit(evt) {
  profileName.textContent = editModalName.value;
  profileDesc.textContent = editModalDesc.value;
  toggleModal(editModal);
  evt.preventDefault();
}

function toggleProfileModal(modal) {
  editModalName.value = profileName.textContent;
  editModalDesc.value = profileDesc.textContent;
  toggleModal(modal);
}

profileEditButton.addEventListener("click", () => {
  toggleProfileModal(editModal);
});

editProfileExitButton.addEventListener("click", () => {
  toggleProfileModal(editModal);
});

const profileFormElement = document.forms["edit-profile-form"];

profileFormElement.addEventListener("submit", handleProfileFormSubmit);

//New Post Modal Functions/Handlers/Listeners

newPostButton.addEventListener("click", () => {
  toggleProfileModal(newPostModal);
});

newPostExitButton.addEventListener("click", () => {
  toggleProfileModal(newPostModal);
});

function handleNewPostFormSubmit(evt) {
  intitialCards.push({
    name: newPostCaption.value,
    link: newPostUrl.value,
  });
  cardList.prepend(getCardElement(intitialCards[intitialCards.length - 1]));
  console.log(intitialCards);
  toggleModal(newPostModal);

  evt.preventDefault();
}

const newPostFormElement = document.forms["new-post-form"];
newPostFormElement.addEventListener("submit", handleNewPostFormSubmit);

//Preview Modal Functions/Handlers/Listeners

previewExitButton.addEventListener("click", () => {
  toggleModal(previewModal);
});

//Card Functions/Handlers/Listeners

function getCardElement(data) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardDesc = cardElement.querySelector(".card__description");
  const cardImg = cardElement.querySelector(".card__image");

  cardImg.src = data.link;
  cardImg.alt = data.name;
  cardDesc.textContent = data.name;

  cardImg.addEventListener("click", () => {
    previewImage.src = cardImg.src;
    toggleModal(previewModal);
  });

  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_liked");
  });

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  return cardElement;
}

intitialCards.forEach((item) => cardList.append(getCardElement(item)));
