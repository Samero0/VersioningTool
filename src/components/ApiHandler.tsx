const ApiHandler = {
  
  simulateApiRequest: async () => {
    console.log(localStorage.getItem('url'))
    const isSuccess = Math.random() > 0.5;
    if (isSuccess) {
      return { status: 200, message: '¡Solicitud exitosa!' };
    } else {
      return { status: 400, message: 'Error en la solicitud, por favor intente de nuevo.' };
    }
  },
}
export default ApiHandler;