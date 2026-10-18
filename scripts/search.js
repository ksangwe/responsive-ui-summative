export function compileRegex(input, flags = "") {
  if (input.trim() === "") {
    return null;
  }

  try {
    return new RegExp(input, flags);
  } catch (error) {
    return null;
  }
}