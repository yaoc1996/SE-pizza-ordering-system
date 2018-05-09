import { DOMAIN, STORE } from 'macro.json';
import createQuery from './createQuery';

function getStore(params) {
  if (!params.userId) params.userId = -1
  return fetch(createQuery(DOMAIN+STORE, params))
    .then(res => res.json())
    .catch(console.log)
}

export default getStore;