import { storage } from "../app.js";

export default class History {
  constructor() {
    this.savedOperations = [];
  }

  getHistory({operations}) {
    this.savedOperations = operations

    for (let i = this.savedOperations.length - 1; i >= 0; i--) {
      ui.renderHistoryElement(this.savedOperations[i]);
    }
  }

  saveResult(operations, result) {

    const objOperation = {operations, result};

    this.savedOperations.unshift(objOperation);
    storage.updateSavedOperations(this.savedOperations)

    ui.renderHistoryElement(objOperation);
  }

  clearHistory() {
    storage.clearSavedOperations();

    ui.clearHistoryHTML();
  }
}
