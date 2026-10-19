import { loadTransactions, saveTransactions } from "./storage.js";

let transactions = loadTransactions();

export function getTransactions() {
  return transactions;
}

export function addTransaction(data) {
  const timestamp = new Date().toISOString();

  const newTransaction = {
    id: crypto.randomUUID(),
    description: data.description,
    amount: Number(data.amount),
    category: data.category,
    date: data.date,
    createdAt: timestamp,
    updatedAt: timestamp
  };

  transactions.push(newTransaction);
  saveTransactions(transactions);

  return newTransaction;
}

export function deleteTransaction(id) {
  transactions = transactions.filter(
    (transaction) => transaction.id !== id
  );

  saveTransactions(transactions);
}

export function sortTransactions(transactions, sortKey) {
  return [...transactions].sort((a, b) => {
    switch (sortKey) {
      case "date-desc":
        return b.date.localeCompare(a.date);

      case "date-asc":
          return a.date.localeCompare(b.date);

      case "description-asc":
          return a.description.localeCompare(b.description);

      case "description-desc":
        return b.description.localeCompare(a.description);
        
      case "amount-asc":
        return a.amount - b.amount;

      case "amount-desc":
        return b.amount - a.amount;

      default:
        return 0;
    }
  });
}