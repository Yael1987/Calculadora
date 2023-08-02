import Calculator from "./classes/Calculator.js";
import UI from "./classes/GeneralUI.js";

import History from "./controllers/History.js";
import Storage from "./controllers/Storage.js";

import AppError from "./classes/AppError.js";

import Mediator from "./classes/Mediator.js";
import GeneralUI from "./classes/GeneralUI.js";


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

    btnTheme.addEventListener('click', generalUI.changeTheme);
    btnDisplayHistory.addEventListener('click', generalUI.displayHistoryContainer)
    closerHistory.addEventListener("click", generalUI.hideHistoryContainer);

    generalUI.btnEraseHistory.addEventListener("click", () => {
      generalUI.displayPopup();
    });
  }
  
  const savedData = storage.getSavedData();

  generalUI.applyTheme(savedData);
  history.getHistory(savedData);
});

export {
  generalUI,
  history,
  calculator,
  storage,
  appError
};
