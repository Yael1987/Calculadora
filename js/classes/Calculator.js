import {history, appError} from "../app.js";
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
      case "result":

        history.saveResult(operation, ui.getResultFromUI());
        return;

      default:
        return;
    }
  }

  resultOperation() {
    try {
      this.operationString = this.stringModifier.adaptString();

      return this.makeOperation(null, true);
    } catch (error) {
      return {
        success: false,
        errorCode: error.code,
        errorName: error.name,
        message: error.message,
      };
    }
  }

  clearOperation(forResult = false) {
    try {
      this.operationString = forResult ? this.stringModifier.resetStringData(this.result) : this.stringModifier.resetStringData();
      this.result = 0;
      this.openParentesis = 0;

      return {
        success: true,
        message: 'Estado de la calculadora reseteado'
      }
    } catch (error) {
      return {
        success: false,
        errorCode: error.code,
        errorName: error.name,
        message: error.message,
      };
    }
  }

  undoOperation() {
    try {
      this.operationString = this.stringModifier.undoStringData();
      return {
        success: true,
        message: 'Backup string applied'
      }
    } catch (error) {
      return {
        success: false,
        errorCode: error.code,
        errorName: error.name,
        message: error.message,
      };
    }
  }

  makeOperation(userEntry = null, forResult = false) {
    try {
      if (userEntry !== null) {
        this.operationString = this.stringModifier.modifyString(userEntry);
      }

      this.stringToEvaluate = this.stringModifier.parseOperationString(this.operationString);
      
      if (!forResult) {
        if (this.openParentesis !== 0) throw appError.operationError();  
      }
      
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
          operation: this.operationString
        } 
      };
      
    } catch (error) {
      return {
        success: false,
        errorCode: error.code,
        errorName: error.name,
        message: error.message,
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