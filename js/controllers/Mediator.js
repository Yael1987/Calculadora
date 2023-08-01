import EntryValidator from "../classes/EntryValidator.js"
import Calculator from "../classes/Calculator.js";

export default class Mediator{
  constructor() {
    this.entryValidator = new EntryValidator();
    this.calculator = new Calculator();
    this.entryValue;
  }

  callKeyAction(keydown) {
    keydown.preventDefault();

    if (!this.entryValidator.validateKeyEntry(keydown.key)) return;

    switch (keydown.key) {
      case "Backspace":
        // calculator.btnActions("delete");
        return;
      case "Enter":
        // calculator.btnActions("result");
        return;
      default:
        // calculator.btnActions(e.key);
        return;
    }
  }

  callBtnAction(entry) {
    this.entryValue = this.entryValidator.validateBtnValue(entry);

    switch (this.entryValue) {
      case "delete":

        break;

      case "clear":
        break;

      case "result":
        break;

      default:
        const calculatorResponse = this.calculator.makeOperation(this.entryValue)
        console.log(calculatorResponse);
    }
  }
}