// src/services/sessionServices.js
import rideryTestClient from '../api/rideryTestClient';

const logIn = async (body) => {
  const response = await rideryTestClient.post('/api/v1/login', body);
  if (response.data.jwt) {
    sessionStorage.setItem('jwt', response.data.jwt);
  }
  return response;
}

const logOut = async () => {
  sessionStorage.removeItem('jwt');
  const response = await rideryTestClient.post('/api/v1/logout');
  return response;
}

const signUp = async (body) => {
  const response = await rideryTestClient.post('/api/v1/signup', body);
  return response;
}

export const sessionServices = {
  logIn,
  logOut,
  signUp
}
