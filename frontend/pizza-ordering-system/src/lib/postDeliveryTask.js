import { DOMAIN, MANAGER_TASK } from 'macro.json'

function postDeliveryTask(token, body) {
  return fetch(DOMAIN+MANAGER_TASK, {
    method: 'POST',
    headers: {
      Authorization: 'JWT '+token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body)
  })
    .then(res => res.json())
    .catch(console.log);
}

export default postDeliveryTask;