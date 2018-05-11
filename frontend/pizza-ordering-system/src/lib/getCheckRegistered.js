import { DOMAIN, STORE_CUSTOMER } from 'macro.json';

function getCheckRegistered(token, storeId) {
  return fetch(DOMAIN+STORE_CUSTOMER+`?storeId=${storeId}`, {
    headers: {
      Authorization: 'JWT '+ token,
    },
  })
    .then(res => res.json())
    .catch(console.log)
}

export default getCheckRegistered;