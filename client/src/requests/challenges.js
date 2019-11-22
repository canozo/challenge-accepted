import errorHandler from './errorhandler';

const request = {};

request.create = (signal, data) => fetch('/api/challenges', {
  method: 'post',
  signal,
  body: JSON.stringify(data),
  headers: {
    Authorization: `bearer ${localStorage.getItem('auth-token')}`,
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})
  .then(res => res.json())
  .then(errorHandler);

export default request;
