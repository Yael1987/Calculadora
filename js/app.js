import Calculator from "./classes/Calculator.js";
import History from "./classes/History.js";
import UI from "./classes/UI.js";
import Storage from "./controllers/Storage.js";

//Instances
const ui = new UI();
const history = new History();
const calculator = new Calculator();
const storage = new Storage();

document.addEventListener("DOMContentLoaded", () => {
  eventListeners();
  function eventListeners() {
    const btnsCalculator = document.querySelectorAll(".btn-action");
    const btnDelete = document.querySelector('.btn-option-delete');
    const btnTheme = document.querySelector(".btn-header-calculator");
    const btnDisplayHistory = document.querySelector(".btn-option-history");
    const closerHistory = document.querySelector(".closer-history");

    window.addEventListener('keydown', (e) => {
      const options = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '.', '%', '(', ')', '/', '!', '+', '*', '-', 'Enter', 'Backspace'];
      if (options.includes(e.key)) {
        e.preventDefault();

        switch (e.key) {
          case 'Backspace':
            calculator.btnActions('delete');
            return;
          case 'Enter':
            calculator.btnActions('result');
            return;
          default: 
            calculator.btnActions(e.key);
            return;
        }
      }
    })

    btnsCalculator.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        calculator.btnActions(calculator.verifyValue(e));
      });
    });

    btnDelete.addEventListener("click", (e) => {
      calculator.btnActions(calculator.verifyValue(e));
    });

    btnTheme.addEventListener('click', ui.changeTheme);
    btnDisplayHistory.addEventListener('click', ui.displayHistoryContainer)
    closerHistory.addEventListener("click", ui.hideHistoryContainer);

    ui.btnEraseHistory.addEventListener("click", () => {
      ui.displayPopup();
    });
  }
  
  const savedData = storage.getSavedData();

  ui.applyTheme(savedData);
  history.getHistory(savedData);
});

export {ui, history, calculator, storage};
