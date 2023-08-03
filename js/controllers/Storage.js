import { appError } from "../app.js";
export default class Storage{
  constructor() {
    this.userData = {
      theme: "light",
      operations: [],
    };
  }

  setData() {
    localStorage.setItem("datosCalculadora", JSON.stringify({...this.userData}));
  }

  getSavedData() {
    const savedData = JSON.parse(localStorage.getItem("datosCalculadora"));

    try {
      if (!savedData) {
        throw appError.storageError();
      }

      this.userData = savedData;
  
      return {
        success: true,
        message: 'Datos obtenidos',
        data: {...this.userData}
      }
    } catch (error) {
      return {
        success: false,
        errorCode: error.code,
        errorName: error.name,
        message: error.message,
      };
    }
  }

  updateSavedTheme({newTheme}) {
    this.userData.theme = newTheme;
    localStorage.setItem("datosCalculadora", JSON.stringify({ ...this.userData }));
  }

  updateSavedOperations({operations}) {
    this.userData.operations = operations;
    localStorage.setItem("datosCalculadora", JSON.stringify({ ...this.userData }));
  }

  clearSavedOperations() {
    this.userData.operations = [];

    localStorage.setItem("datosCalculadora", JSON.stringify({ ...this.userData }));
    
    return {
      success: true,
      message: 'Historial eliminado'
    }
  }
}