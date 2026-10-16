
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
- Search field with a case-insensitive toggle
- Sort by date, description, or amount
- Transaction details
- Edit and Delete options

## Settings
- Budget limit
- Default currency: USD
- Two additional currencies and manual exchange rates
- Import and Export JSON
- Editable expense categories, with defaults: Food, Books, Transport, Entertainment, Fees, Other

## About and Footer
- Purpose of the application
- GitHub link
- Email link

## Responsive Layout and Breakpoints

- Around 360px (mobile): Dashboard cards stack vertically. The transaction list uses cards to avoid horizontal scrolling.
- Around 768px (tablet): Dashboard cards use two columns. The transaction form and spending chart can appear side by side. Transactions remain in card layout.
- Around 1024px (desktop): Dashboard cards appear in one row. The main content uses wider columns, and transactions switch to a table with rows and columns.



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
- Use ARIA live regions to announce important updates. Budget messages use `aria-live="polite"` when spending is under the limit and `aria-live="assertive"` when spending exceeds the limit. Also announce transaction saves and validation errors.
- Add a skip link so keyboard users can jump directly to the main content.