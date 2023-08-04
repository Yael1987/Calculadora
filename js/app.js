import Calculator from "./modules/calculator/Calculator.js";
import GeneralUI from "./modules/ui/GeneralUI.js";
import History from "./modules/history/History.js";

import AppError from "./utils/AppError.js";

import Mediator from "./controllers/Mediator.js";

// const test = new StringModifier();

// try {
//   const operacion = test.modifyString('+');

//   console.log({operacion});
// } catch (error) {
//   console.log({
//     error: error.message
//   });
// }

//Instances
const generalUI = new GeneralUI();
const calculator = new Calculator();
const history = new History();

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
    const historyContainer = document.querySelector(".container-history-operations")

    window.addEventListener('keydown', e => mediator.callKeyAction(e))

    btnsCalculator.forEach((btn) => {
      btn.addEventListener("click", e => mediator.callBtnAction(e));
    });

    btnDelete.addEventListener("click", e => mediator.callBtnAction(e));

    btnTheme.addEventListener('click', () => mediator.callChangeThemeAction());
    btnDisplayHistory.addEventListener('click', () => mediator.callHistoryContainer(true))
    closerHistory.addEventListener("click", () => mediator.callHistoryContainer());

    generalUI.btnEraseHistory.addEventListener("click", () => mediator.callClearHistory());

    historyContainer.addEventListener("click", e => {
      mediator.callGetHistoryOperation(e)
    })
  }
  
  mediator.applyUserData();

  // const savedData = storage.getSavedData();

  // generalUI.applyTheme(savedData);
  // history.getHistory(savedData);
});

export {
  generalUI,
  history,
  calculator,
  appError
};
