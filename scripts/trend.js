export function renderSpendingTrend(transactions) {
  const chart = document.querySelector("#spending-chart");
  chart.textContent = "";

  const heading = document.createElement("h3");
  heading.textContent = "Spending Trend — Last 7 Days";
  chart.appendChild(heading);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const dailyTotals = [];

  for (let offset = 6; offset >= 0; offset--) {
    const day = new Date(today);
    day.setDate(today.getDate() - offset);

    const dateKey = [
      day.getFullYear(),
      String(day.getMonth() + 1).padStart(2, "0"),
      String(day.getDate()).padStart(2, "0")
    ].join("-");

    const total = transactions.reduce((sum, transaction) => {
      if (transaction.date === dateKey) {
        return sum + Number(transaction.amount);
      }

      return sum;
    }, 0);

    dailyTotals.push({
      date: dateKey,
      label: day.toLocaleDateString(undefined, {
        weekday: "short"
      }),
      total
    });
  }

  const highestTotal = Math.max(
    ...dailyTotals.map((day) => day.total),
    1
  );

  const list = document.createElement("div");
  list.setAttribute("role", "list");
  list.setAttribute("aria-label", "Daily spending for the last seven days");

  dailyTotals.forEach((day) => {
    const row = document.createElement("div");
    row.setAttribute("role", "listitem");
    row.className = "trend-day";

    const label = document.createElement("div");
    label.textContent = 
      `${day.label} (${day.date}): $${day.total.toFixed(2)}`;

    const track = document.createElement("div");
    track.className = "trend-track";
    track.setAttribute("aria-hidden", "true");

    const bar = document.createElement("div");
    bar.className = "trend-bar";
    bar.style.width = `${(day.total / highestTotal) * 100}%`;

    track.appendChild(bar);
    row.appendChild(label);
    row.appendChild(track);
    list.appendChild(row);
  });

  chart.appendChild(list);
}