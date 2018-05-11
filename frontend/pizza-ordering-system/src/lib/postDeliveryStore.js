import { DOMAIN, DELIVERY_STORE } from 'macro.json';

function postDeliveryStore(token, body) {
  return fetch(DOMAIN+DELIVERY_STORE, {
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

export default postDeliveryStore;