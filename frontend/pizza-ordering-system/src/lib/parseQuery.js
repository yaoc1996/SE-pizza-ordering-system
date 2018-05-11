import _ from 'lodash';

function parseQuery(query) {
  if (query === '') return {}
  query = query.slice(1)
  if (query === '') return {}

  var KV = query.split('&');
  var params = {}
  KV.forEach(kv => {
    kv = kv.split('=');
    if (kv.length !== 2) return

    const [key, val] = kv;
    params[key] = val 
  })
  
  return params
}

export default parseQuery;