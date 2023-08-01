export default class AppError{
  entryError() {
    const error = new Error('Accion no permitida')
    error.name = 'Valor de entrada no valido';
    error.code = 1001;
    
    return error;
  }

  operationError() {
    const error = new Error('No se pudo completar la operacion');
    error.name = 'Fallo en la evaluacion del string'
    error.code = -1002;
    return error;
  }
}