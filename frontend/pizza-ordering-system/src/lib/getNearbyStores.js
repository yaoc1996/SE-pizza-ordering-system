import { DOMAIN, NEARBY_STORES } from 'macro.json';
import createQuery from './createQuery';

function getNearbyStores(body) {
  return fetch(createQuery(DOMAIN+NEARBY_STORES, body))
    .then(res => res.json())
    .catch(console.log)
}

export default getNearbyStores;