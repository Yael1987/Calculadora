import EntryValidator from "../utils/EntryValidator.js"
import Storage from "./Storage.js";

import { calculator, generalUI, history } from "../app.js";

export default class Mediator{
  constructor() {
    this.calculatorResponse = {}
    this.historyResponse = {}
    this.uiResponse = {}
    this.storageResponse = {}
    this.entryValidator = new EntryValidator();
    this.calculatorUI = generalUI.getCalculatorUI();
    this.historyUI = generalUI.getHistoryUI();
    this.storage = new Storage();
    this.entryValue;
  }

  callKeyAction(keydown) {
    if (!this.entryValidator.validateKeyEntry(keydown.key)) return;
    
    keydown.preventDefault();

    if (keydown.key === 'i' && keydown.ctrlKey) {
      return console.log('Cambio de tema');
    }

    switch (keydown.key) {
      case "Backspace":
        return this.callUndoAction();
      
      case " ":
        return this.callResultAction();
      
      case "Enter":
        return this.callResultAction();
      
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
        return this.callResultAction();

      default:
        return this.callOperationsActions();
    }
  }

  callResultAction() {
    this.calculatorResponse = calculator.resultOperation();
    if (!this.calculatorResponse.success) {
      return generalUI.displayNotification(this.calculatorResponse.message);
    }
    
    this.historyResponse = history.saveResult(this.calculatorResponse.data);
    this.storage.updateSavedOperations(this.historyResponse.data)

    this.calculatorUI.displayResult(this.calculatorResponse.data);
    this.historyUI.renderHistoryElement(this.calculatorResponse.data);
    
    calculator.clearOperation(true);

    return generalUI.displayNotification(this.historyResponse.message);
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

  callOperationsActions() {
    this.calculatorResponse = calculator.makeOperation(this.entryValue);

    if (!this.calculatorResponse.success) {
      if (this.calculatorResponse.errorCode === 1001) {
        return generalUI.displayNotification(this.calculatorResponse.message);
      }

      if (this.calculatorResponse.errorCode === 1004) {
        return generalUI.displayNotification(this.calculatorResponse.message);
      }
    }

    return this.calculatorUI.renderResult({
        success: this.calculatorResponse.success,
        ...this.calculatorResponse.data,
      });
  }

  callChangeThemeAction() {
    this.uiResponse = generalUI.changeTheme();
    this.storage.updateSavedTheme(this.uiResponse.data);
  }

  callHistoryContainer(display = false) {
    this.historyUI.toogleHistoryContainer(display);
  }

  async callClearHistory() {
    this.historyResponse = history.getSavedOperations();

    if (!this.historyResponse.success) return generalUI.displayNotification(this.historyResponse.message);

    this.uiResponse = await generalUI.displayPopup();
    if (!this.uiResponse.success) return generalUI.displayNotification(this.uiResponse.message);
    
    this.storageResponse = this.storage.clearSavedOperations();
    this.historyUI.clearHistoryHTML();
    this.historyUI.addEmptyMessage();

    generalUI.displayNotification(this.storageResponse.message)
  }

  applyUserData() {
    this.storageResponse = this.storage.getSavedData();
    if (!this.storageResponse.success) return this.storage.setData();

    generalUI.applyTheme(this.storageResponse.data);
    history.setSavedOperations(this.storageResponse.data);

    const savedOperations = this.storageResponse.data.operations;
    for (let i = savedOperations.length - 1; i >= 0; i--) {
      this.historyUI.renderHistoryElement(savedOperations[i]);
    }
  }

  callGetHistoryOperation(e) {
    this.uiResponse = this.historyUI.getOperationFromHistory(e.target);

    if (!this.uiResponse.success) return;

    this.calculatorResponse = calculator.updateCurrentOperation(this.uiResponse.operation);

    console.log(this.calculatorResponse);

    if (!this.calculatorResponse.success) {
      if (this.calculatorResponse.errorCode === 1001) 
        return generalUI.displayNotification(this.calculatorResponse.message);
    }

    return this.calculatorUI.renderResult({
      success: this.calculatorResponse.success,
      ...this.calculatorResponse.data,
    });
  }
}