import { DOMAIN, NEW_STORE } from 'macro.json';

function postStore(token, body) {
  console.log(body)
  return fetch(DOMAIN+NEW_STORE, {
    method: 'POST',
    headers: {
      'Authorization': 'JWT '+token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
    .then(res => res.json())
    .catch(console.log)
}

export default postStore;