import { DOMAIN, COOK_MENU } from 'macro.json';

function postCookMenu(token, body) {
  return fetch(DOMAIN+COOK_MENU, {
    method: 'POST',
    headers: {
      Authorization: 'JWT '+token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
    .then(res => res.json())
    .catch(console.log);
}

export default postCookMenu;