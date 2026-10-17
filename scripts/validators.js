const descriptionRegex = /^\S(?:.*\S)?$/;
const amountRegex = /^(0|[1-9]\d*)(\.\d{1,2})?$/;
const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
const categoryRegex = /^[A-Za-z]+(?:[ -][A-Za-z]+)*$/;

// 2. Advanced regex: detects repeated consecutive words.

const duplicateWordRegex = /\b(\w+)\s+\1\b/i;

// 3. Description validator.

export function validateDescription(value) {
  if (!descriptionRegex.test(value)) {
    return "Description must not start or end with spaces.";
  }

  if (duplicateWordRegex.test(value)) {
    return "Description must not contain repeated consecutive words.";
  }

  return "";
}

// 4. Amount validator.

export function validateAmount(value) {
  if (!amountRegex.test(value)) {
    return "Amount must be a number with up to 2 decimals.";
  }

  return "";
}

// 5. Date validator.

export function validateDate(value) {
  if (!dateRegex.test(value)) {
    return "Date must use the YYYY-MM-DD format.";
  }

  return "";
}

//6.category validator.

export function validateCategory(value) {
  if (!categoryRegex.test(value)) {
    return "Category must contain only letters, spaces, or hyphens.";
  }

  return "";
}