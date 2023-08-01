import EntryEvaluator from "../classes/EntryEvaluator.js";
import { appError } from "../app.js";

export default class StringModifier {
  constructor(calculator) {
    this.string = "";
    this.backup = "";
    // this.openParentesis = 0;
    this.specialSigns = ["π", "%", "e", "!"];
    this.signs = ["+", "-", "*", "/"];
    this.calculator = calculator;
    this.evaluator = new EntryEvaluator(this);
  }

  modifyString(userEntry) {
    const lastWord = this.string.slice(-1);

    return this.evaluator.evaluateEntry(lastWord, userEntry);
  }

  addSquare(lastWord) {
    if (!this.string || (isNaN(lastWord) && !this.specialSigns.includes(lastWord)))
      throw appError.entryError();

    this.backup = this.string;
    return (this.string += "^(2)");
  }

  addPow(lastWord) {
    if (!this.string || (isNaN(lastWord) && !this.specialSigns.includes(lastWord)))
      throw appError.entryError();
    
    this.backup = this.string;
    this.calculator.increaseParentesisCounter();
    
    return (this.string += "^(");
  }

  addE(lastWord) {
    this.backup = this.string;

    if (!this.string) 
      return (this.string += "e");

    if (lastWord === ")" || !isNaN(lastWord))
      return this.string += "*e";

    return (this.string += "e");
  }

  addPi(lastWord) {
    this.backup = this.string;

    if (!this.string)
      return (this.string += "π");

    if (lastWord === ")" || !isNaN(lastWord))
      return (this.string += "*π");

    return(this.string += "π");
  }

  addProperty(lastWord, userEntry) {
    this.backup = this.string;
    this.calculator.increaseParentesisCounter();

    if (!this.string)
      return(this.string += `${userEntry}(`);
    

    if (lastWord === ")" || !isNaN(lastWord))
      return(this.string += `*${userEntry}(`);
    
    return(this.string += `${userEntry}(`);
  }

  addParentesis(lastWord) {
    if (lastWord === ".")
      throw appError.entryError();

    if ([...this.signs, "("].includes(lastWord) || !lastWord) {
      this.calculator.increaseParentesisCounter();
      return(this.string += "(");
    }

    //add de close parentesis
    if (this.calculator.getParentesisCounter() !== 0) {
      if (isNaN(lastWord) && this.string.includes("(")) {
        if ([...this.signs, "("].includes(lastWord)) {
          this.calculator.increaseParentesisCounter();
          return(this.string += "(");
        }
      }

      if (
        isNaN(lastWord) &&
        ![...this.specialSigns, "(", ")"].includes(lastWord)
      )
        throw appError.entryError();

      if (!isNaN(lastWord) || [...this.specialSigns, ")"].includes(lastWord)) {
        this.calculator.decreaseParentesisCounter();
        return(this.string += ")");
      }

      if (lastWord === "(") {
        this.calculator.decreaseParentesisCounter();
        return(this.string += "0)");
      }
    }

    if (!isNaN(lastWord) || [...this.specialSigns, ")"].includes(lastWord)) {
      this.calculator.increaseParentesisCounter();
      return(this.string += "*(");
    }
  }

  addOpenParentesis(lastWord) {
    if (lastWord === ".")
      throw appError.entryError();

    this.backup = this.string;

    if (!isNaN(lastWord) || [...this.specialSigns, ")"].includes(lastWord)) {
      this.calculator.increaseParentesisCounter();
      return(this.string += "*(");
    }

    if ([...this.signs, "("].includes(lastWord) || !lastWord) {
      this.calculator.increaseParentesisCounter();
      return(this.string += '(');
    }
  }

  addCloseParentesis(lastWord) {
    if (this.calculator.getParentesisCounter() === 0)
      throw appError.entryError();

    if (isNaN(lastWord) && ![...this.specialSigns, ")", "("].includes(lastWord))
      throw appError.entryError();

    this.backup = this.string;
    
    if (!isNaN(lastWord) || [...this.specialSigns, ")"].includes(lastWord)) {
      this.calculator.decreaseParentesisCounter();
      return(this.string += ')');
    }

    if (lastWord === "(") { 
      this.calculator.decreaseParentesisCounter();
      
      return(this.string += "0)");
    }
  }

  addSigns(lastWord, userEntry) {
    if (!lastWord)
      throw appError.entryError();

    this.backup = this.string;
    
    if (
      !isNaN(lastWord) ||
      (lastWord === "(" && userEntry === "-") ||
      [...this.specialSigns, ")"].includes(lastWord)
    ) 
      return (this.string += userEntry);

    return this.string;
  }

  addPercent(lastWord) {
    if (
      !lastWord ||
      (isNaN(lastWord) && !["π", "e", ")", "!"].includes(lastWord))
    )
      throw appError.entryError();

    
    this.backup = this.string;
    return(this.string += '%');
  }

  addDot(lastWord) {
    for (let i = this.string.length - 1; i >= 0; i--) {
      if (isNaN(this.string[i]))
        break;

      if (this.string[i] === ".")
       throw appError.entryError();
    }

    this.backup = this.string;

    if ([...this.signs, "("].includes(lastWord) || !lastWord) 
      return(this.string += "0.");
    

    if ([...this.specialSigns, ")"].includes(lastWord)) 
      return(this.string += "*0.");
    

    return(this.string += '.');
  }

  addMultiplyNumber(userEntry) {
    this.backup = this.string;
    return (this.string += `*${userEntry}`);
  }

  addNumber(userEntry) {
    this.backup = this.string;
    return(this.string += userEntry)
  }

  parseOperationString(string) {
    return string.replaceAll("π", "pi")
        .replaceAll("√", "sqrt")
        .replaceAll("log", "log10")
        .replaceAll(/sin\((.*?)\)/g, "sin(unit($1, 'deg'))")
        .replaceAll(/cos\((.*?)\)/g, "cos(unit($1, 'deg'))")
        .replaceAll(/tan\((.*?)\)/g, "tan(unit($1, 'deg'))");
  }
};