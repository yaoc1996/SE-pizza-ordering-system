import { DOMAIN, AUTH } from 'macro.json';

function getAuth(token) {
  return fetch(DOMAIN+AUTH, {
    headers: {
      Authorization: 'JWT ' + token,
    }
  })
    .then(res => res.json())
    .catch(console.log)
}

export default getAuth;