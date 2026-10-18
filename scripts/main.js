import { 
  validateDescription,
  validateAmount,
  validateDate,
  validateCategory
 } from "./validators.js";

import { addTransaction, getTransactions, sortTransactions } from "./state.js";
import { renderTransactions } from "./ui.js";

const form = document.querySelector("#transaction-form");

const sortSelect = document.querySelector("#sort-select");

renderTransactions(
  sortTransactions(getTransactions(), sortSelect.value)
);

sortSelect.addEventListener("change", () => {
  renderTransactions(
    sortTransactions(getTransactions(), sortSelect.value)
  );
});

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

 const formStatus = document.querySelector("#form-status");

 const errors = [
  descriptionMessage,
  amountMessage,
  dateMessage,
  categoryMessage
 ];

 const allGood = errors.every((message) => message === "");

 if (allGood) {
  addTransaction({
    description: descriptionInput.value,
    amount: amountInput.value,
    category: categoryInput.value,
    date: dateInput.value
  });

  renderTransactions(
    sortTransactions(getTransactions(), sortSelect.value)
  );

  formStatus.textContent = "Transaction saved.";
  form.reset();
 } else {
   formStatus.textContent = "Please fix the errors above.";
 }
});