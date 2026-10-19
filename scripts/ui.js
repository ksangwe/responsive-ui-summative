function highlightText(element, text, pattern) {
  if (pattern === null) {
    element.appendChild(document.createTextNode(text));
    return;
  }

  const flags = pattern.flags.includes("g")
  ? pattern.flags
  : pattern.flags + "g";

  const regex = new RegExp(pattern.source, flags);
  let lastIndex = 0;

  for (const match of text.matchAll(regex)) {
    element.appendChild(
      document.createTextNode(text.slice(lastIndex, match.index))
    );

    const mark = document.createElement("mark");
    mark.textContent = match[0];
    element.appendChild(mark);

    lastIndex = match.index + match[0].length;
  }

  element.appendChild(document.createTextNode(text.slice(lastIndex)));
}

export function renderTransactions(transactions, pattern = null) {
  const list = document.querySelector("#transaction-list");

  list.textContent = "";

  if (transactions.length === 0) {
    const message = document.createElement("p");
    message.textContent = pattern
      ? "No matching transactions."
      : "No transactions yet. Add one below.";
    list.appendChild(message);
    return;
  }

  transactions.forEach((transaction) => {
    const item = document.createElement("article");

    const description = document.createElement("h3");
    highlightText(description, transaction.description, pattern);

    const amount = document.createElement("p");
    amount.textContent = `Amount: $${transaction.amount}`;

    const category = document.createElement("p");
    category.appendChild(document.createTextNode("Category: "));
    highlightText(category, transaction.category, pattern);
  
    const date = document.createElement("p");
    date.textContent = `Date: ${transaction.date}`;

    item.appendChild(description);
    item.appendChild(amount);
    item.appendChild(category);
    item.appendChild(date);

    const editButton = document.createElement("button");
    editButton.type = "button";
    editButton.textContent = "Edit";
    editButton.setAttribute(
      "aria-label",
      `Edit ${transaction.description}`
    );
    editButton.dataset.action = "edit";
    editButton.dataset.id = transaction.id;

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.textContent = "Delete";
    deleteButton.setAttribute(
      "aria-label",
      `Delete ${transaction.description}`
    );
    deleteButton.dataset.action = "delete";
    deleteButton.dataset.id = transaction.id;

    item.appendChild(editButton);
    item.appendChild(deleteButton);
    list.appendChild(item);
  });
}

export function renderStats(stats) {
  const dashboard = document.querySelector("#dashboard-status");

  dashboard.textContent = "";

  const records = document.createElement("p");
  records.textContent = `Total records: ${stats.count}`;

  const spent = document.createElement("p");
  spent.textContent = `Total spent: $${stats.total.toFixed(2)}`;

  const category = document.createElement("p");
  category.textContent = `Top category: ${stats.topCategory}`;

  dashboard.appendChild(records);
  dashboard.appendChild(spent);
  dashboard.appendChild(category);
}

export function renderBudgetMessage(total, limit) {
  const remainingMessage = document.querySelector("#budget-cap-message");
  const alertMessage = document.querySelector("#budget-cap-alert");

  remainingMessage.textContent = "";
  alertMessage.textContent = "";

  const numericLimit = Number(limit);

  if (
    limit == null ||
    Number.isNaN(numericLimit) ||
    numericLimit === 0
  ) {
    return;
  }

  const difference = numericLimit - Number(total);

  if (difference >= 0) {
    remainingMessage.textContent =
      `Remaining budget: $${difference.toFixed(2)} of $${numericLimit.toFixed(2)}`;
  } else {
    alertMessage.textContent =
     `Over budget by $${Math.abs(difference).toFixed(2)}`;
  }
}