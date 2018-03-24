import { SIGNUP } from 'const.json';

function postSignup(body) {
  return (
    fetch(SIGNUP, {
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