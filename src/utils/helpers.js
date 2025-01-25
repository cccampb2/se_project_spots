export function setButtonText(
  btn,
  isLoading,
  defaultText = "Save",
  loadingText = "Saving..."
) {
  btn.textContent = isLoading ? loadingText : defaultText;
}

export function handleSubmit(request, evt, loadingText = "Saving...") {
  evt.preventDefault();

  const submitButton = evt.submitter;
  const initialText = submitButton.textContent;

  setButtonText(submitButton, true, initialText, loadingText);
  // call the request function to be able to use the promise chain
  request()
    .then(() => {
      // any form should be reset after a successful response
      // evt.target is the form in any submit handler
      evt.target.reset();
    })
    // we need to catch possible errors
    // console.error is used to handle errors if you don’t have any other ways for that
    .catch(console.error)

    // and in finally we need to stop loading
    .finally(() => {
      setButtonText(submitButton, false, initialText);
    });
}
