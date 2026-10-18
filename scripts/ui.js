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
    description.textContent = transaction.description;

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