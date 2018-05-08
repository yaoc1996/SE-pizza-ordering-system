import { DOMAIN, STORE_REGISTER } from 'macro.json';

function putStoreRegister(token, storeId) {
  return fetch(DOMAIN+STORE_REGISTER+`?storeId=${storeId}`, {
    method: 'PUT',
    headers: {
      Authorization: 'JWT '+ token,
    },
  })
    .then(res => res.json())
    .catch(console.log)
}

export default putStoreRegister;