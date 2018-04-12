import { DOMAIN, LOGIN } from 'macro.json';

function postLogin(body) {
  return (
    fetch(DOMAIN+LOGIN, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    })
      .then(res => res.json())
      .catch(e => console.log(e))
  )
}

export default postLogin;