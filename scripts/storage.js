const STORAGE_KEY = "finance-tracker:transactions";

export function loadTransactions() {
  const savedTransactions = localStorage.getItem(STORAGE_KEY);

  if (savedTransactions === null) {
    return [];
  }

  try {
    const transactions = JSON.parse(savedTransactions);

    if (!Array.isArray(transactions)) {
      return [];
    }

    return transactions;
  } catch (error) {
    return [];
  }
}

export function saveTransactions(transactions) {
  const savedText = JSON.stringify(transactions);

  localStorage.setItem(STORAGE_KEY, savedText);
}