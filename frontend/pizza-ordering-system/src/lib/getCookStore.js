import { DOMAIN, COOK_STORE } from 'macro.json';

function getCookStore(token) {
  return fetch(DOMAIN+COOK_STORE, {
    headers: {
      Authorization: 'JWT '+token,
    }
  })
    .then(res => res.json())
    .catch(console.log)
}

export default getCookStore;