import { 
  validateDescription,
  validateAmount,
  validateDate,
  validateCategory
 } from "./validators.js";

 import { compileRegex } from "./search.js";

import { addTransaction, getTransactions, sortTransactions } from "./state.js";
import { renderTransactions } from "./ui.js";

const form = document.querySelector("#transaction-form");

const sortSelect = document.querySelector("#sort-select");

const searchInput = document.querySelector("#search-input");
const caseInsensitive = document.querySelector("#case-insensitive");
const searchStatus = document.querySelector("#search-status");

renderTransactions(
  sortTransactions(getTransactions(), sortSelect.value)
);

sortSelect.addEventListener("change", () => {
  renderTransactions(
    sortTransactions(getTransactions(), sortSelect.value)
  );
});

function updateSearch() {
  const pattern = compileRegex(
    searchInput.value,
    caseInsensitive.checked ? "i" : ""
  );

  if (searchInput.value.trim() !== "" && pattern === null) {
    searchStatus.textContent = "Invalid pattern.";
    renderTransactions(
      sortTransactions(getTransactions(), sortSelect.value)
    );
    return;
  }

  searchStatus.textContent = "";

  const filteredTransactions = getTransactions().filter((transaction) => {
    if (pattern === null) {
      return true;
    }

    return (
      pattern.test(transaction.description) ||
      pattern.test(transaction.category)
    );
  });

  renderTransactions(
    sortTransactions(filteredTransactions, sortSelect.value),
    pattern
  );
}

searchInput.addEventListener("input", updateSearch);
caseInsensitive.addEventListener("change", updateSearch);

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

  updateSearch();

  formStatus.textContent = "Transaction saved.";
  form.reset();
 } else {
   formStatus.textContent = "Please fix the errors above.";
 }
});