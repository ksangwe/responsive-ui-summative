function highlightText(element, text, pattern) {
  if (!pattern) {
    element.textContent = text;
    return;
  }

  const regex = new RegExp(pattern.source, pattern.flags);
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    element.appendChild(
      document.createTextNode(text.slice(lastIndex, match.index))
    );

    const mark = document.createElement("mark");
    mark.textContent = match[0];
    element.appendChild(mark);

    lastIndex = match.index + match[0].length;

    if (match[0].length === 0) {
      regex.lastIndex++;
    }
  }

  element.appendChild(document.createTextNode(text.slice(lastIndex)));
}
export function renderTransactions(transactions) {
  const list = document.querySelector("#transaction-list");

  list.textContent = "";

  if (transactions.length === 0) {
    const message = document.createElement("p");
    message.textContent = "No transactions yet. Add one below.";
    list.appendChild(message);
    return;
  }

  transactions.forEach((transaction) => {
    const item = document.createElement("article");

    const description = document.createElement("h3");
    highlightText(description, transaction.description);

    const amount = document.createElement("p");
    amount.textContent = `Amount: $${transaction.amount}`;

    const category = document.createElement("p");
    category.textContent = `Category: ${transaction.category}`;

    const date = document.createElement("p");
    date.textContent = `Date: ${transaction.date}`;

    item.appendChild(description);
    item.appendChild(amount);
    item.appendChild(category);
    item.appendChild(date);

    list.appendChild(item);
  });
}