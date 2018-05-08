import { DOMAIN, DELIVERY_STORE } from 'macro.json';

function getDeliveryStore(token) {
  return fetch(DOMAIN+DELIVERY_STORE, {
    headers: {
      Authorization: 'JWT ' + token,
    }
  })
    .then(res => res.json())
    .catch(console.log)
}

export default getDeliveryStore;