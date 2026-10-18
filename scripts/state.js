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