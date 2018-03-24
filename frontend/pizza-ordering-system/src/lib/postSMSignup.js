import { SMSIGNUP } from 'const.json';

function postSMSignup(body) {
  return (
    fetch(SMSIGNUP, {
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

export default postSMSignup;