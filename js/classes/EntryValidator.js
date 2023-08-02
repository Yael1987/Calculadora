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
      "Enter", //Result
      "Backspace", //Delete
      " ", //Result
      "s", //Square
      "l", //Log
      "S", //sin
      "C", //Cos
      "T", //Tan
      "a", //Abs
      "e", //e
      "r", //root
      "p", //pi
      "P", //pow
      "c", //clear
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

  replaceKeyValue(keydown) {
    switch (keydown) {
      case "s":
        return 'square';
      case "l":
        return 'log';
      case "S":
        return 'sin';
      case "C":
        return 'cos';
      case "T":
        return 'tan';
      case "a":
        return 'abs';
      case "e":
        return 'e';
      case "r":
        return "√";
      case "p":
        return 'pi';
      case "P":
        return 'pow';
      default:
        return;
    }
  }
}