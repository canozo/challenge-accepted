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

request.getAll = signal => fetch('/api/challenges', {
  method: 'get',
  signal,
  headers: {
    Authorization: `bearer ${localStorage.getItem('auth-token')}`,
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})
  .then(res => res.json())
  .then(errorHandler);

request.getAvailable = signal => fetch('/api/challenges/available', {
  method: 'get',
  signal,
  headers: {
    Authorization: `bearer ${localStorage.getItem('auth-token')}`,
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})
  .then(res => res.json())
  .then(errorHandler);

request.getBy = signal => fetch('/api/challenges/by', {
  method: 'get',
  signal,
  headers: {
    Authorization: `bearer ${localStorage.getItem('auth-token')}`,
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})
  .then(res => res.json())
  .then(errorHandler);

request.getTakenBy = signal => fetch('/api/challenges/takenby', {
  method: 'get',
  signal,
  headers: {
    Authorization: `bearer ${localStorage.getItem('auth-token')}`,
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})
  .then(res => res.json())
  .then(errorHandler);

request.accept = (signal, data) => fetch('/api/challenges/accept', {
  method: 'put',
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

request.deny = (signal, data) => fetch('/api/challenges/deny', {
  method: 'put',
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
