import axios from 'axios';

export const connectApi = async (
  method: string,
  url: string,
  param: any = {},
) => {
  let options: any = {
    method: method,
    url: url,
    headers: {'Content-Type': 'application/json'},
  };
  if (method.toUpperCase() === 'GET') {
    options['params'] = param;
  } else {
    options['data'] = JSON.stringify(param);
  }
  try {
    const response = await axios(options);
    return response;
  } catch (error) {
    throw error;
  }
};
