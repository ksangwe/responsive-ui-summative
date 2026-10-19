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

    const button = document.createElement("button");
    button.type = "button";
    button.textContent = "Delete";
    button.setAttribute(
      "aria-label",
      `Delete ${transaction.description}`
    );
    button.dataset.id = transaction.id;

    item.appendChild(button);
    list.appendChild(item);
  });
}