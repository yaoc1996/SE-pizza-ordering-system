import { DOMAIN, SMLOGIN } from 'const.json';

function postSMLogin(body) {
  return (
    fetch(DOMAIN+SMLOGIN, {
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

export default postSMLogin;