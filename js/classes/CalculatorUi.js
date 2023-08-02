export default class CalculatorUI {
  constructor() {
    this.divOperations = document.querySelector(".operations");
    this.divResult = document.querySelector(".result");
  }

  renderResult(calculatorData) {
    const { success, operation, result } = calculatorData;

    this.divOperations.textContent = operation || 0;

    if (!success) {
      this.divResult.innerHTML = '&nbsp;';
      return;  
    }

    this.divResult.innerHTML = result;
  }

  resetResult() {
    this.divOperations.textContent = 0;
    this.divResult.innerHTML = "&nbsp;";
  }

  displayResult() {
    this.divOperations.innerText = this.divResult.textContent;
    calculator.changeOperationString(this.divResult.textContent);
    this.divResult.innerHTML = "&nbsp;";
  }
}
