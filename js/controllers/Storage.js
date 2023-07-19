export default class Storage{
  constructor() {
    this.data = {
      theme: "light",
      operations: [],
    };
  }

  setData() {
    localStorage.setItem("datosCalculadora", JSON.stringify({...this.data}));
  }

  getSavedData() {
    const savedData = JSON.parse(localStorage.getItem("datosCalculadora"));

    if (!savedData) {
      this.setData();
      return this.data;
    }
    this.data = savedData;

    return this.data;
  }

  updateSavedTheme(newTheme) {
    this.data.theme = newTheme;

    localStorage.setItem("datosCalculadora", JSON.stringify({ ...this.data }));
  }

  updateSavedOperations(updatedOperations) {
    this.data.operations = updatedOperations;

    localStorage.setItem("datosCalculadora", JSON.stringify({ ...this.data }));
  }

  clearSavedOperations() {
    this.data.operations = [];

    localStorage.setItem("datosCalculadora", JSON.stringify({...this.data}));
  }
}