export default class HistoryUI {
  constructor() {
    this.historyContainerOperations = document.querySelector(".container-history-operations"); 
    this.historyContainer = document.querySelector(".container-history");
    this.closerHistory = document.querySelector(".closer-history");
  }

  renderHistoryElement(calculatorData) {

    const {operation, result} = calculatorData;

    const historyDiv = document.createElement("DIV");
    historyDiv.classList.add("history-div");
    historyDiv.onclick = (e) => {
      this.getOperationFromHistory(e);
    };

    const historyOperation = document.createElement("DIV");
    historyOperation.classList.add("operation-history");
    historyOperation.innerText = operation;

    const historyResult = document.createElement("DIV");
    historyResult.classList.add("result-history");
    historyResult.innerText = result;

    historyDiv.appendChild(historyOperation);
    historyDiv.appendChild(historyResult);

    if (
      this.historyContainerOperations.children.length > 0 &&
      !this.historyContainerOperations.children[0].classList.contains(
        "history-empty"
      )
    ) {
      this.historyContainerOperations.insertBefore(
        historyDiv,
        this.historyContainerOperations.children[0]
      );
      return;
    }

    this.clearHistoryHTML();
    this.historyContainerOperations.appendChild(historyDiv);
  }

  getOperationFromHistory(e) {
    if (e.target.classList.contains("result-history")) {
      this.divOperations.innerText = e.target.innerText;
      calculator.updateOperationString(e.target.innerText);
    } else {
      if (e.target.innerText[0] === "(") {
        if (this.divOperations.innerText === "0") {
          this.divOperations.innerText = e.target.innerText;
          calculator.updateOperationString(e.target.innerText);
          calculator.makeOperation();
          return;
        }

        return;
      }

      this.divOperations.innerText = e.target.innerText;
      calculator.updateOperationString(e.target.innerText);
      calculator.makeOperation();
      return;
    }
  }

  addEmptyMessage() {
    const message = document.createElement("P");
    message.classList.add("history-empty");
    message.textContent = "El historial esta vacío";

    this.historyContainerOperations.appendChild(message);
  }

  clearHistoryHTML() {
    while (this.historyContainerOperations.firstChild) {
      this.historyContainerOperations.removeChild(
        this.historyContainerOperations.firstChild
      );
    }
  }

  toogleHistoryContainer(display = false) {
    if (display) { 
      this.historyContainer.classList.add("container-history-display");
      this.closerHistory.classList.add("closer-history-display");
      return;
    }

    this.historyContainer.classList.remove("container-history-display");
    this.closerHistory.classList.remove("closer-history-display");
  }
}