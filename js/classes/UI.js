import { history, calculator, storage } from "../app.js";

export default class UI {
  constructor() {
    this.btnEraseHistory = document.querySelector(".btn-delete-history");
    this.divOperations = document.querySelector(".operations");
    this.divResult = document.querySelector(".result");
    this.historyContainerOperations = document.querySelector(".container-history-operations");
  }

  changeTheme() {
    const body = document.querySelector("body");
    const btnIconsTheme = document.querySelectorAll(".btn-icon-header");

    btnIconsTheme.forEach((btnIcon) => {
      if (btnIcon.classList.contains("display-icon-header")) {
        btnIcon.classList.remove("display-icon-header");
        btnIcon.classList.add("hide-icon-header");
        return;
      }

      if (btnIcon.classList.contains("hide-icon-header")) {
        btnIcon.classList.remove("hide-icon-header");
        btnIcon.classList.add("display-icon-header");
        return;
      }
    });

    if (body.classList.contains("light")) {
      body.classList.remove("light");
      body.classList.add("dark");
    } else {
      body.classList.remove("dark");
      body.classList.add("light");
    }

    storage.updateSavedTheme(body.classList[0]);
  }

  renderResult(result, operation) {
    this.divOperations.textContent = operation;

    if (!result && result !== 0) {
      this.divResult.innerHTML = this.divResult.innerHTML;
      return;
    }

    this.divResult.innerHTML = result;
  }

  renderHistoryElement({operations, result}) {
    const historyDiv = document.createElement("DIV");
    historyDiv.classList.add("history-div");
    historyDiv.onclick = (e) => {
      this.getOperationFromHistory(e);
    };

    const historyOperation = document.createElement("DIV");
    historyOperation.classList.add("operation-history");
    historyOperation.innerText = operations;

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

  displayResult() {
    this.divOperations.innerText = this.divResult.textContent;
    calculator.changeOperationString(this.divResult.textContent);
    this.divResult.innerHTML = "&nbsp;";
  }

  addEmptyMessage() {
    const message = document.createElement("P");
    message.classList.add("history-empty");
    message.textContent = "El historial esta vacío";

    this.historyContainerOperations.appendChild(message);
  }

  displayPopup() {
    const popupAlert = document.querySelector(".popup-alert");

    popupAlert.classList.add("popup-alert-display");

    popupAlert.addEventListener("click", (e) => {
      if (
        e.target.classList.contains("popup-alert") ||
        e.target.classList.contains("alert-cancel")
      ) {
        popupAlert.classList.remove("popup-alert-display");
      }

      if (e.target.classList.contains("alert-delete")) {
        history.clearHistory();
        popupAlert.classList.remove("popup-alert-display");

        this.addEmptyMessage();
        this.displayNotification('Historial borrado')
      }
    });
  }

  clearHistoryHTML() {
    while (this.historyContainerOperations.firstChild) {
      this.historyContainerOperations.removeChild(
        this.historyContainerOperations.firstChild
      );
    }
  }

  getResultFromUI() {
    return this.divResult.innerText;
  }

  displayHistoryContainer() {
    const historyContainer = document.querySelector(".container-history");
    const closerHistory = document.querySelector(".closer-history");

    historyContainer.classList.add("container-history-display");
    closerHistory.classList.add("closer-history-display");
  }

  hideHistoryContainer(e) {
    const historyContainer = document.querySelector(".container-history");

    historyContainer.classList.remove("container-history-display");
    e.target.classList.remove("closer-history-display");
  }

  applyTheme({theme}) {
    const body = document.querySelector("body");
    const btnIconsTheme = document.querySelectorAll(".btn-icon-header");

    body.className = theme;

    btnIconsTheme.forEach((btnIcon) => {
      if (btnIcon.id === theme) {
        if (btnIcon.classList.contains("hide-icon-header")) {
          btnIcon.classList.remove("hide-icon-header");
          btnIcon.classList.add("display-icon-header");
        }

        return;
      }

      if (btnIcon.classList.contains("display-icon-header")) {
        btnIcon.classList.remove("display-icon-header");
        btnIcon.classList.add("hide-icon-header");
      }
    });
  }

  displayNotification(message) {
    const notification = document.querySelector('.container-notification');
    const notificationText = document.querySelector('.notification-text');

    notification.classList.add("display-notification");
    notificationText.textContent = message;

    notification.onclick = () => {
      notification.classList.remove("display-notification");
    }

    setTimeout(() => {
      notification.classList.remove("display-notification");
    }, 2000);
  }
}
