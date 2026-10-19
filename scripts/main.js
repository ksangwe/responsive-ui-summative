import { 
  validateDescription,
  validateAmount,
  validateDate,
  validateCategory
 } from "./validators.js";

 import { compileRegex } from "./search.js";

import {
  addTransaction,
  deleteTransaction,
  getTransactions,
  sortTransactions,
  updateTransaction
} from "./state.js";

import { renderTransactions } from "./ui.js";

const form = document.querySelector("#transaction-form");

let editingId = null;

const sortSelect = document.querySelector("#sort-select");
const formStatus = document.querySelector("#form-status");

const transactionsList = document.querySelector("#transaction-list");

transactionsList.addEventListener("click", (event) => {
  const button = event.target.closest("button");

  if (!button || !button.dataset.id) {
    return;
  }

  const transactionId = button.dataset.id;
  const action = button.dataset.action;

  if (action === "delete") {
    const confirmed = confirm("Delete this transaction?");

    if (!confirmed) {
      return;
    }  
  deleteTransaction(transactionId);
  updateSearch();

  formStatus.textContent = "Transaction deleted.";
  return;
  }

  if (action === "edit") {
    const transaction = getTransactions().find(
      (item) => item.id === transactionId
    );

    if (!transaction) {
      return;
    }

    descriptionInput.value = transaction.description;
    amountInput.value = transaction.amount;
    dateInput.value = transaction.date;
    categoryInput.value = transaction.category;

    editingId = transaction.id;

    const submitButton = form.querySelector(
      'button[type="submit"]'
    );
    submitButton.textContent = "Update Transaction";

    descriptionInput.focus();
    formStatus.textContent = `Editing ${transaction.description}.`;
  }
});

const searchInput = document.querySelector("#search-input");
const caseInsensitive = document.querySelector("#case-insensitive");
const searchStatus = document.querySelector("#search-status");

renderTransactions(
  sortTransactions(getTransactions(), sortSelect.value)
);

sortSelect.addEventListener("change", () => {
  updateSearch();
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

 const errors = [
  descriptionMessage,
  amountMessage,
  dateMessage,
  categoryMessage
 ];

 const allGood = errors.every((message) => message === "");

 if (allGood) {
  if (editingId !== null) {
    updateTransaction(editingId, {
      description: descriptionInput.value,
      amount: amountInput.value,
      category: categoryInput.value,
      date: dateInput.value
    });

    editingId = null;

    const submitButton = form.querySelector(
      'button[type="submit"]'
    );
    submitButton.textContent = "Save Transaction";

    formStatus.textContent = "Transaction updated.";
  } else {
    addTransaction({
      description: descriptionInput.value,
      amount: amountInput.value,
      category: categoryInput.value,
      date: dateInput.value
    });

    formStatus.textContent = "Transaction saved.";
  }

  updateSearch();
  form.reset();
} else {
  formStatus.textContent = "Please fix the errors above.";
}
});