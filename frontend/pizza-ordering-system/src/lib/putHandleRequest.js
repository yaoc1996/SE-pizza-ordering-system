import { DOMAIN, REQUEST } from 'macro.json';

function putHandleRequest(token, decision, body) {
  return fetch(DOMAIN+REQUEST+decision, {
    method: 'PUT',
    headers: {
      Authorization: 'JWT '+token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
    .then(res => res.json())
    .catch(console.log)
}

export default putHandleRequest;