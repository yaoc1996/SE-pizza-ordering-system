import { DOMAIN, MANAGER_STORE } from 'macro.json';

function getManagerStore(token) {
  return fetch(DOMAIN+MANAGER_STORE, {
    headers: {
      Authorization: 'JWT ' + token,
    }
  })
    .then(res => res.json())
    .catch(console.log)
}

export default getManagerStore;