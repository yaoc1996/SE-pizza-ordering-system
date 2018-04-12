import { DOMAIN, SIGNUP } from 'macro.json';

function postSignup(body) {
  return (
    fetch(DOMAIN+SIGNUP, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then(res => res.json())
      .catch(e => console.log(e))
  )
}

export default postSignup;