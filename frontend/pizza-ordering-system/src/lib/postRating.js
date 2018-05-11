import { DOMAIN, RATING } from 'macro.json';

function postRating(token, body) {
  return fetch(DOMAIN+RATING, {
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

export default postRating;