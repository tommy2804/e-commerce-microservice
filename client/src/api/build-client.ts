import axios from 'axios';

export const makeRequest = () => {
  if (typeof window === 'undefined') {
    return axios.create({
      baseURL: 'http://www.tommy-websit-microkube.online',
    });
  } else {
    return axios.create({
      baseURL: '/',
    });
  }
};
