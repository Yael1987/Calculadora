import {history, ui, appError} from "../app.js";
import StringModifier from "./StringModifier.js";

export default class Calculator {
  constructor() {
    this.result = 0;
    this.operationString = "";
    this.stringToEvaluate = "";
    this.openParentesis = 0;
    this.stringModifier = new StringModifier(this);
  }

  btnActions(valueBtn) {
    switch (this.value) {
      case "delete":
        if (!this.operationString) return;

        if (this.operationString.slice(-1) === "(") {

          if (this.operationString.slice(-2) === "√(") {
            this.operationString = this.operationString.slice(0, this.operationString.length - 2);
            this.openParentesis -= 1;
            this.makeOperation();
            return;
          };

          if (['log(', 'abs(', 'sin(', 'cos(', 'tan('].includes(this.operationString.slice(-4))) {
            this.operationString = this.operationString.slice(0, this.operationString.length - 4);
            this.openParentesis -= 1;
            this.makeOperation();
            return;
          }

          this.openParentesis -= 1;
        }

        if (this.operationString.slice(-1) === ")") {
          this.openParentesis += 1;
        }

        this.operationString = this.operationString.slice(0, this.operationString.length - 1 );

        this.makeOperation();
        return;

      case "clear":
        if (!this.operationString) return;

        this.operationString = "";
        this.openParentesis = 0;

        this.makeOperation();
        return;

      case "result":
        const operation = this.operationString
              .replaceAll("*", "x")

        history.saveResult(operation, ui.getResultFromUI());

        ui.displayResult();
        return;

      default:
        if (this.operationString.length > 30) {
          ui.displayNotification("Solo 30 caracteres permitidos");
          return;
        }

        this.clearString();
        return;
    }
  }

  makeOperation(userEntry) {
    try {
      this.operationString = this.stringModifier.modifyString(userEntry);
      this.stringToEvaluate = this.stringModifier.parseOperationString(this.operationString);
      
      if (this.openParentesis !== 0) 
        throw appError.operationError();
      
      if (!this.stringToEvaluate || (this.stringToEvaluate.length === 1 && this.stringToEvaluate !== "e")) 
        throw appError.operationError();

      if ( !isNaN(this.stringToEvaluate) && this.stringToEvaluate.length >= 2 && !['e', 'pi'].includes(this.stringToEvaluate))
        throw appError.operationError();

      if (["+", "-", "*", "/", "("].includes(this.stringToEvaluate.slice(-1))) 
        throw appError.operationError();

      this.result = math.evaluate(this.stringToEvaluate);

      return {
        success: true,
        data: {
          result: this.result,
          operation: this.operationString,
        } 
      };
      
    } catch (error) {
      return {
        success: false,
        errorCode: error.code,
        errorName: error.name,
        error: error.message,
        data: {
          result: this.result,
          operation: this.operationString,
        },
      };
    }
  }

  increaseParentesisCounter() {
    this.openParentesis += 1;
  }

  decreaseParentesisCounter() {
    this.openParentesis -= 1;
  }

  getParentesisCounter() {
    return this.openParentesis;
  }
}