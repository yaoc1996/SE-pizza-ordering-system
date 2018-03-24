import { LOGIN } from 'const.json';

function postLogin(body) {
  return (
    fetch(LOGIN, {
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