import { DOMAIN, DELIVERY_TASK } from 'macro.json'

function postFinishDelivery(token, body) {
  return fetch(DOMAIN+DELIVERY_TASK, {
    method: 'POST',
    headers: {
      Authorization: 'JWT ' +token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
    .then(res => res.json())
    .catch(console.log)
} 

export default postFinishDelivery;