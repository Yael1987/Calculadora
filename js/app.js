import Calculator from "./classes/Calculator.js";
import History from "./controllers/History.js";
import UI from "./classes/UI.js";
import Storage from "./controllers/Storage.js";

import Mediator from "./controllers/Mediator.js";
import StringModifier from "./controllers/StringModifier.js";

import AppError from "./classes/AppError.js";

const test = new StringModifier();

// try {
//   const operacion = test.modifyString('+');

//   console.log({operacion});
// } catch (error) {
//   console.log({
//     error: error.message
//   });
// }

//Instances
const ui = new UI();
const history = new History();
const calculator = new Calculator();
const storage = new Storage();

const mediator = new Mediator();
const appError = new AppError();

document.addEventListener("DOMContentLoaded", () => {
  eventListeners();
  function eventListeners() {
    const btnsCalculator = document.querySelectorAll(".btn-action");
    const btnDelete = document.querySelector('.btn-option-delete');
    const btnTheme = document.querySelector(".btn-header-calculator");
    const btnDisplayHistory = document.querySelector(".btn-option-history");
    const closerHistory = document.querySelector(".closer-history");

    window.addEventListener('keydown', e => mediator.callKeyAction(e))

    btnsCalculator.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        // calculator.btnActions(evaluator.verifyValue(e));
        mediator.callBtnAction(e)
      });
    });

    btnDelete.addEventListener("click", (e) => {
      // calculator.btnActions(evaluator.verifyValue(e));
      mediator.callBtnAction(e)
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

export {
  ui,
  history,
  calculator,
  storage,
  appError
};
