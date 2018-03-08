function login(email, password) {
  return (
    fetch('/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      })
    })
      .then(res => res.json())
      .catch(e => {
        console.log(e)
      })
  )
}

export default login;