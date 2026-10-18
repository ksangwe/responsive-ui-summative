import { 
  validateDescription,
  validateAmount,
  validateDate,
  validateCategory
 } from "./validators.js";

const form = document.querySelector("#transaction-form");

const descriptionInput = document.querySelector("#description");
const descriptionError = document.querySelector("#description-error");

const amountInput = document.querySelector("#amount");
const amountError = document.querySelector("#amount-error");

const dateInput = document.querySelector("#date");
const dateError = document.querySelector("#date-error");

const categoryInput = document.querySelector("#category");
const categoryError = document.querySelector("#category-error");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const descriptionMessage = validateDescription(descriptionInput.value);
  descriptionError.textContent = descriptionMessage;

  const amountMessage = validateAmount(amountInput.value);
  amountError.textContent = amountMessage;

  const dateMessage = validateDate(dateInput.value);
  dateError.textContent = dateMessage;

  const categoryMessage = validateCategory(categoryInput.value);
  categoryError.textContent = categoryMessage;
});