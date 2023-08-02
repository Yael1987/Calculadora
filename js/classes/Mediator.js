import EntryValidator from "./EntryValidator.js"
import CalculatorUI from "./CalculatorUi.js";

import { calculator, generalUI } from "../app.js";

export default class Mediator{
  constructor() {
    this.calculatorResponse = {}
    this.entryValidator = new EntryValidator();
    this.calculatorUI = new CalculatorUI();
    this.entryValue;
  }

  callKeyAction(keydown) {
    if (!this.entryValidator.validateKeyEntry(keydown.key)) return;
    
    keydown.preventDefault();

    switch (keydown.key) {
      case "Backspace":
        return this.callUndoAction();
      
      case " ":
        return;
      
      case "Enter":
        // calculator.btnActions("result");
        return;
      
      case "c":
        return this.callClearAction();

      default:
        this.entryValue = this.entryValidator.replaceKeyValue(keydown.key);
        return this.callOperationsActions();
    }
  }

  callBtnAction(entry) {
    this.entryValue = this.entryValidator.validateBtnValue(entry);

    switch (this.entryValue) {
      case "delete":
        return this.callUndoAction();

      case "clear":
        return this.callClearAction();

      case "result":
        this.callResultAction();
        break;

      default:
        return this.callOperationsActions();
    }
  }

  callResultAction() {
    this.calculatorResponse = calculator.resultOperation();
    // calculator.clearOperation();
    if (!this.calculatorResponse.success) {
      return generalUI.displayNotification(this.calculatorResponse.message);
    }

    console.log(this.calculatorResponse);
  }

  callUndoAction() {
    this.calculatorResponse = calculator.undoOperation();

    if (!this.calculatorResponse.success) {
      return generalUI.displayNotification(this.calculatorResponse.message);
    }

    this.calculatorResponse = calculator.makeOperation();

    return this.calculatorUI.renderResult({
      success: this.calculatorResponse.success,
      ...this.calculatorResponse.data,
    });
  }

  callClearAction() {
    this.calculatorResponse = calculator.clearOperation();

    if (!this.calculatorResponse.success)
      return generalUI.displayNotification(this.calculatorResponse.message);

    return this.calculatorUI.resetResult();
  }

  callOperationsActions(){
    this.calculatorResponse = calculator.makeOperation(this.entryValue);

    if (!this.calculatorResponse.success) {
      if (this.calculatorResponse.errorCode === 1001) {
        return generalUI.displayNotification(this.calculatorResponse.message);
      }
    }

    return this.calculatorUI.renderResult({
        success: this.calculatorResponse.success,
        ...this.calculatorResponse.data,
      });
  }
}