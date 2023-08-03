export default class AppError{
  entryError() {
    const error = new Error('Accion no permitida')
    error.name = 'Valor de entrada no valido';
    error.code = 1001;
    
    return error;
  }

  operationStringError() {
    const error = new Error("Campo de operacion vacio");
    error.name = "Fallo en limpiar el string";
    error.code =  1002;
    return error;
  }

  operationError() {
    const error = new Error('Formato no valido');
    error.name = 'Fallo en la evaluacion del string'
    error.code = -1003;
    return error;
  }

  limitStringError() {
    const error = new Error("Maximo 30 caracteres permitidos");
    error.name = "Limite de caracteres en el string superado";
    error.code = 1004;
    return error;
  }

  resultOperationError() {
    const error = new Error("Formato no permitido");
    error.name = "Fallo en mostrar el resultado";
    error.code = 1005;
    return error;
  }

  historyError() {
    const error = new Error("Historial vacio");
    error.name = "Fallo al obtener datos del historial";
    error.code = 1006;
    return error;
  }

  storageError() {
    const error = new Error("No hay datos guardados aun");
    error.name = "Fallo al obtener datos datos guardados";
    error.code = -1007;
    return error;       
  }
}