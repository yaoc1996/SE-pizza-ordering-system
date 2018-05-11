import { DOMAIN, MGMT_LOGIN } from 'macro.json';

function postMgmtLogin(body) {
  return (
    fetch(DOMAIN+MGMT_LOGIN, {
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

export default postMgmtLogin;