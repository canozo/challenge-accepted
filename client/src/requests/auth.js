import errorHandler from './errorhandler';

const request = {};

request.verify = async token => fetch('/api/auth/verify', {
  method: 'post',
  headers: {
    Authorization: `bearer ${token}`,
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})
  .then(res => res.json())
  .then(errorHandler);

request.login = async (correo, pass) => fetch('/api/auth/login', {
  method: 'post',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    correo,
    pass,
  }),
})
  .then(res => res.json())
  .then(errorHandler);

request.register = async (nombres, correo, pass) => fetch('/api/auth/register', {
  method: 'post',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    nombres,
    correo,
    pass,
  }),
})
  .then(res => res.json())
  .then(errorHandler);

export default request;
