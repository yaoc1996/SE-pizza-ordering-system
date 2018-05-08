import { DOMAIN, STORE } from 'macro.json';

function getStore(id) {
  return fetch(DOMAIN+STORE+`?storeId=${id}`)
    .then(res => res.json())
    .catch(console.log)
}

export default getStore;