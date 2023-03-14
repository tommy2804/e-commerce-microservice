import axios from 'axios';

export const makeRequest = () => {
  if (typeof window === 'undefined') {
    return axios.create({
      baseURL: 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
    });
  } else {
    return axios.create({
      baseURL: '/',
    });
  }
};
