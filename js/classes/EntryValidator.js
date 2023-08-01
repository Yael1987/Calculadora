export default class EntryValidator {
  constructor() {
    this.validKeyValues = [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "0",
      ".",
      "%",
      "(",
      ")",
      "/",
      "!",
      "+",
      "*",
      "-",
      "Enter",
      "Backspace",
    ];
  }

  validateKeyEntry(keydown) {
    return this.validKeyValues.includes(keydown);
  }

  validateBtnValue(click) {
    if (click.target.classList.contains("btn-icon")) {
      return click.target.parentElement.value;
    }

    if (click.target.classList.length === 0) {
      if (click.target.parentElement.classList.contains("btn-icon")) {
        return click.target.parentElement.parentElement.value;
      }
    }

    return click.target.value;
  }
}