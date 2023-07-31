export default class Evaluator {
  constructor() {
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
};