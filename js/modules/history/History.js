import { appError } from "../../app.js";

export default class History {
  constructor() {
    this.savedOperations = [];
  }

  setSavedOperations({operations}) {
    this.savedOperations = operations;
    return {
      success: true,
      message: "Historial aplicado",
    };
  }

  saveResult(calculatorData) {
    this.savedOperations.unshift(calculatorData);

    return{
      success: true,
      message: 'Operacion guardada',
      data: {
        operations: this.savedOperations
      }
    }
  }

  getSavedOperations() {
    try {
      if (this.savedOperations.length === 0)
        throw appError.historyError();
      
      return {
        success: true,
        message: 'Historial devuelto',
        data: {
          operations: this.savedOperations,
        }
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
}
