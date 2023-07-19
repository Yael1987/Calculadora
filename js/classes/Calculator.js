import {history, ui} from "../app.js";

export default class Calculator {
  constructor() {
    this.value;
    this.operationString = "";
    this.openParentesis = 0;
    this.specialSigns = ["π", "%", "e", "!"];
    this.signs = ["+", "-", "*", "/"];
  }

  verifyValue(e) {
    if (e.target.classList.contains("btn-icon")) {
      return e.target.parentElement.value;
    }

    if (e.target.classList.length === 0) {
      if (e.target.parentElement.classList.contains("btn-icon")) {
        return e.target.parentElement.parentElement.value;
      }
    }

    return e.target.value;
  }

  btnActions(valueBtn) {
    this.value = valueBtn;

    switch (this.value) {
      case "delete":
        if (!this.operationString) return;

        if (this.operationString.slice(-1) === "(") {

          if (this.operationString.slice(-2) === "√(") {
            this.operationString = this.operationString.slice(0, this.operationString.length - 2);
            this.openParentesis -= 1;
            this.makeOperation();
            return;
          };

          if (['log(', 'abs(', 'sin(', 'cos(', 'tan('].includes(this.operationString.slice(-4))) {
            this.operationString = this.operationString.slice(0, this.operationString.length - 4);
            this.openParentesis -= 1;
            this.makeOperation();
            return;
          }

          this.openParentesis -= 1;
        }

        if (this.operationString.slice(-1) === ")") {
          this.openParentesis += 1;
        }

        this.operationString = this.operationString.slice(0, this.operationString.length - 1 );

        this.makeOperation();
        return;

      case "clear":
        if (!this.operationString) return;

        this.operationString = "";
        this.openParentesis = 0;

        this.makeOperation();
        return;

      case "result":
        const operation = this.operationString
              .replaceAll("*", "x")

        history.saveResult(operation, ui.getResultFromUI());

        ui.displayResult();
        return;

      default:
        if (this.operationString.length > 30) {
          ui.displayNotification("Solo 30 caracteres permitidos");
          return;
        }

        this.clearString();
        return;
    }
  }

  clearString() {
    const lastWord = this.operationString.slice(-1);

    switch (this.value) {
      case "square":
        this.evalsSquare(lastWord);
        return;

      case "pow":
        this.evalsPow(lastWord);
        return;

      case "e":
        this.evalsE(lastWord);
        return;

      case "pi":
        this.evalsPi(lastWord);
        return;
      
      default:
        break;
    }

    //Evaluate parentesis
    if (["sin", "cos", "tan", "log", "abs", "√"].includes(this.value)) {
      this.evalsProperty(lastWord, this.value);
      return;
    }

    if (this.value === "()") {
      this.evalsParentesis(lastWord);
      return;
    }

    if (this.value === "(") {
      this.evalsOpenParentesis(lastWord);
      return;
    }

    if (this.value === ")") {
      this.evalsCloseParentesis(lastWord);
      return;
    }

    //Evals the signs 
    if ([...this.signs, '!'].includes(this.value)) {
      this.evalsSigns(lastWord);
      return;
    }

    if (this.value === '%') {
      this.evalsPercent(lastWord);
      return;
    }

    //Evals the dot
    if (this.value === ".") {
      this.evalsDot(lastWord);
      return;
    }

    if ([...this.specialSigns, ')'].includes(lastWord) ) {
      this.operationString += `*${this.value}`;
      this.makeOperation();
      return;
    }

    this.operationString += this.value;
    this.makeOperation();
  }

  //Evaluations
  evalsSquare(lastWord) {
    if (!this.operationString || (isNaN(lastWord) && !this.specialSigns.includes(lastWord))) {
      ui.displayNotification("Accion no permitida");
      return;
    }
    
    this.operationString += "^(2)";
    this.makeOperation();
    return;
  }

  evalsPow(lastWord) {
    if (!this.operationString || (isNaN(lastWord) && !this.specialSigns.includes(lastWord))) {
      ui.displayNotification("Accion no permitida");
      return;
    }

    this.operationString += "^(";
    this.openParentesis += 1;
    this.makeOperation();
    return;
  }

  evalsE(lastWord) {
    if (!this.operationString) {
      this.operationString += "e";
      this.makeOperation();
      return;
    }

    if (
      lastWord === ")" ||
      !isNaN(lastWord)
    ) {
      this.operationString += "*e";
      this.makeOperation();
      return;
    }

    this.operationString += "e";
    this.makeOperation();
  }

  evalsPi(lastWord) {
    if (!this.operationString) {
      this.operationString += "π";
      this.makeOperation();
      return;
    }

    if (
      lastWord === ")" ||
      !isNaN(lastWord)
    ) {
      this.operationString += "*π";
      this.makeOperation();
      return;
    }

    this.operationString += "π";
    this.makeOperation();
  }

  evalsProperty(lastWord, property) {
    if (!this.operationString) {
      this.operationString += `${property}(`;
      this.openParentesis += 1;
      this.makeOperation();
      return;
    }

    if (lastWord === ")" || !isNaN(lastWord)) {
      this.operationString += `*${property}(`;
      this.openParentesis += 1;
      this.makeOperation();
      return;
    }

    this.operationString += `${property}(`;
    this.openParentesis += 1;
    this.makeOperation();
  }

  evalsParentesis(lastWord) {
    if (lastWord === ".") return;

    if ([...this.signs, "("].includes(lastWord) || !lastWord) {
      this.operationString += "(";
      this.openParentesis += 1;
      this.makeOperation();
      return;
    }

    //Evals de close parentesis
    if (this.openParentesis !== 0) {
      if (isNaN(lastWord) && this.operationString.includes("(")) {
        if ([...this.signs, "("].includes(lastWord)) {
          this.operationString += "(";
          this.openParentesis += 1;
          this.makeOperation();
          return;
        }
      }

      if (isNaN(lastWord) && ![...this.specialSigns, '(', ')'].includes(lastWord)) return;

      if (!isNaN(lastWord) || [...this.specialSigns, ')'].includes(lastWord) ) {
        this.operationString += ")";
        this.openParentesis -= 1;
        this.makeOperation();
        return;
      }

      if (lastWord === "(") {
        this.operationString += "0)";
        this.openParentesis -= 1;
        this.makeOperation();
        return;
      }
    }

    if (!isNaN(lastWord) || [...this.specialSigns, ')'].includes(lastWord)) {
      this.operationString += "*(";
      this.openParentesis += 1;
      this.makeOperation();
      return;
    }
  }

  evalsOpenParentesis(lastWord) {
    if (lastWord === ".") return;

    if (!isNaN(lastWord) || [...this.specialSigns, ')'].includes(lastWord)) {
      this.operationString += "*(";
      this.openParentesis += 1;
      this.makeOperation();
      return;
    }

    if ([...this.signs, "("].includes(lastWord) || !lastWord) {
      this.operationString += this.value;
      this.openParentesis += 1;
      this.makeOperation();
      return;
    }
  }

  evalsCloseParentesis(lastWord) {
    if (this.openParentesis === 0) return;

    if (isNaN(lastWord) && ![...this.specialSigns, ')', '('].includes(lastWord))
      return;

    if (!isNaN(lastWord) || [...this.specialSigns, ')'].includes(lastWord)) {
      this.operationString += this.value;
      this.openParentesis -= 1;
      this.makeOperation();
    }

    if (lastWord === "(") {
      this.operationString += "0)";

      this.openParentesis -= 1;

      this.makeOperation();
      return;
    }
  }

  evalsSigns(lastWord) {
    if (!lastWord) return;

    if (
      !isNaN(lastWord) ||
      (lastWord === "(" && this.value === "-") ||
      [...this.specialSigns, ')'].includes(lastWord)
    ) {
      this.operationString += this.value;
      this.makeOperation();
      return;
    }
  }

  evalsPercent(lastWord) {
    if (!lastWord || (isNaN(lastWord) && !["π", 'e', ')', '!'].includes(lastWord))) {
      ui.displayNotification("Acción no valida");
      return;
    }

    this.operationString += this.value;
    this.makeOperation();
    return;
  }

  evalsDot(lastWord) {
    if ([...this.signs, '('].includes(lastWord) || !lastWord) {
      this.operationString += "0.";
      this.makeOperation();
      return;
    }

    if ([...this.specialSigns, ')'].includes(lastWord)) {
      this.operationString += "*0.";
      this.makeOperation();
      return;
    }

    for (let i = this.operationString.length - 1; i >= 0; i--) {
      if (this.operationString[i] === ".") {
        return;
      }
    }

    this.operationString += this.value;
    this.makeOperation();
  }

  makeOperation() {
    let fixedString = this.operationString
      .replaceAll("π", "pi")
      .replaceAll("√", "sqrt")
      .replaceAll("log", "log10")
      .replaceAll(/sin\((.*?)\)/g, "sin(unit($1, 'deg'))")
      .replaceAll(/cos\((.*?)\)/g, "cos(unit($1, 'deg'))")
      .replaceAll(/tan\((.*?)\)/g, "tan(unit($1, 'deg'))");
    
    let result = "";

    const operation = !this.operationString ? 0 : this.operationString.replaceAll("*", "x");
    
    try {
      if (!fixedString || (fixedString.length === 1 && fixedString !== "e")) {
        result = "&nbsp;";
        ui.renderResult(result, operation);
        return;
      }

      if ( !isNaN(fixedString) && fixedString.length >= 2 && !['e', 'pi'].includes(fixedString)) {
        result = "&nbsp;";
        ui.renderResult(result, operation);
        return;
      }

      if (["+", "-", "*", "/", "("].includes(fixedString.slice(-1))) {
        result = "&nbsp;";
        ui.renderResult(result, operation);
        return;
      }

      result = math.evaluate(fixedString);
      ui.renderResult(result, operation);
    } catch (error) {
      ui.renderResult(result, operation);
    }
  }

  updateOperationString(addedString) {
    this.operationString += addedString;
  }

  changeOperationString(newString) {
    this.operationString = newString;
  }
}
