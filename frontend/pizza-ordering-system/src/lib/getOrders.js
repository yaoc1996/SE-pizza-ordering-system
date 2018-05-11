import { DOMAIN, USER_ORDER } from 'macro.json';

function getOrders(token) {
  return fetch(DOMAIN+USER_ORDER, {
    headers: {
      Authorization: 'JWT '+token,
    }
  })
    .then(res => res.json())
    .catch(console.log)
}

export default getOrders;