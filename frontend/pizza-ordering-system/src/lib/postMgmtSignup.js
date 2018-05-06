import { DOMAIN, SMSIGNUP } from 'macro.json';

function postMgmtSignup(body) {
  return (
    fetch(DOMAIN+SMSIGNUP, {
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

export default postMgmtSignup;