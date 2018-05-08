import _ from 'lodash';

function createQuery(url, params) {
  const createQueryString = (p) => {
    const createKeyValStrings = pairs => 
      _.map(pairs, x => `${x[0]}=${x[1]}`);

    const joinKeyValStrings = strings => 
      _.join(strings, '&');
  
    return _.flow(
      _.toPairs,
      createKeyValStrings,
      joinKeyValStrings,
    )(p);
  }

  return `${url}?${createQueryString(params)}`;
}

export default createQuery;