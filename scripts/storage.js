const STORAGE_KEY = "finance-tracker:transactions";
const SETTINGS_KEY = "finance-tracker:settings";

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

export function loadSettings() {
  const savedSettings = localStorage.getItem(SETTINGS_KEY);

  if (savedSettings === null) {
    return {};
  }

  try {
    const settings = JSON.parse(savedSettings);

    if (
      settings === null ||
      typeof settings !== "object" ||
      Array.isArray(settings)
    ) {
      return {};
    }

    return settings;
  } catch (error) {
    return {};
  }
}

export function saveSettings(settings) {
  const savedText = JSON.stringify(settings);

  localStorage.setItem(SETTINGS_KEY, savedText);
}