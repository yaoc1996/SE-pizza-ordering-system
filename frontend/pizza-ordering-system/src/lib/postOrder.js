import { DOMAIN, ORDER } from 'macro.json';

function postOrder(body) {
  return fetch(DOMAIN+ORDER, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body)
  })
    .then(res => res.json())
    .catch(console.log);
}

export default postOrder;