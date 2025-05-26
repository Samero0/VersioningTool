export const fetchData = async (): Promise<number> => {
    try {
      const response = await fetch('https://placeholder.com/blah', {
        method: 'GET'
      });
  
      if (response.status === 200) {
        return 200;  
      } else {
        return response.status;  
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      return 500;  
    }
  };
  