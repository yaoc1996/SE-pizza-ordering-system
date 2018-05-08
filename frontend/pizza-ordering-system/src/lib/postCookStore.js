import { DOMAIN, COOK_STORE } from 'macro.json';

function postCookStore(token, body) {
  return fetch(DOMAIN+COOK_STORE, {
    method: 'POST',
    headers: {
      Authorization: 'JWT '+token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
    .then(res => res.json())
    .catch(console.log)
}

export default postCookStore;