
# Student Finance Tracker - Wireframe

## Header
- App name: Student Finance Tracker
- Navigation: Dashboard, Transactions, Settings, About

## Dashboard
- Total spent
- Number of transactions
- Budget remaining
- Top expense category
- Spending chart for the last 7 days

## Add Transaction Form
- Description
- Amount in USD
- Category
- Date
- Save button

## Transactions
- Search field
- Sort by date, description, or amount
- Transaction details
- Edit and Delete options

## Settings
- Budget limit
- Default currency: USD
- Two additional currencies and manual exchange rates
- Import and Export JSON

## About and Footer
- Purpose of the application
- GitHub link
- Email link

## Mobile Layout
On smaller screens, dashboard cards and the form
will stack vertically. Transactions will be displayed
as cards to avoid horizontal scrolling.



## Data Model

Each transaction will be stored as an object with these fields:

| Field | Type | Purpose |
|---|---|---|
| `id` | String | Unique identifier for the transaction |
| `description` | String | Name or explanation of the expense |
| `amount` | Number | Expense amount, stored as a positive number |
| `category` | String | Expense category, such as Food or Transport |
| `date` | String | Date of the expense in `YYYY-MM-DD` format |
| `createdAt` | String | Date and time the record was created, in ISO 8601 format |
| `updatedAt` | String | Date and time the record was last edited, in ISO 8601 format |

### Example Transaction

```json
{
  "id": "rec_0001",
  "description": "Lunch at cafeteria",
  "amount": 12.5,
  "category": "Food",
  "date": "2026-10-16",
  "createdAt": "2026-10-16T12:30:00Z",
  "updatedAt": "2026-10-16T12:30:00Z"
}
```

## Accessibility Plan

- Use semantic HTML elements such as `header`, `nav`, `main`, and `footer`.
- Give every form input a visible, descriptive label.
- Make the website usable with a keyboard, with a visible focus indicator.
- Provide sufficient color contrast and readable text.
- Use ARIA live regions to announce important updates, such as saving a transaction or validation errors.
- Add a skip link so keyboard users can jump directly to the main content.