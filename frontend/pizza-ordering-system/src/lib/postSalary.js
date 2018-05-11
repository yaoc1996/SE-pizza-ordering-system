import { DOMAIN, MANAGER_SALARY } from 'macro.json';

function postSalary(token, body) {
  return fetch(DOMAIN+MANAGER_SALARY, {
    method: 'POST',
    headers: {
      Authorization: 'JWT '+token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body)
  })
    .then(res => res.json())
    .catch(console.log)
}

export default postSalary;