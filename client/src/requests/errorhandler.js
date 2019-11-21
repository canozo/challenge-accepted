export default function errorHandler(res) {
  if (res.error) {
    if (res.errToken) {
      const error = { tipo: 'token' };
      throw error;
    }
    if (res.errFatal) {
      const error = { tipo: 'fatal' };
      throw error;
    }
    if (res.errores) {
      const error = { tipo: 'form', errores: res.errores };
      throw error;
    }
    throw new Error('Error al ejecutar la operacion');
  }
  return res;
}
