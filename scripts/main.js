import { validateDescription } from "./validators.js";

const form = document.querySelector("#transaction-form");
const descriptionInput = document.querySelector("#description");
const descriptionError = document.querySelector("#description-error");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const message = validateDescription(descriptionInput.value);

  descriptionError.textContent = message;
});