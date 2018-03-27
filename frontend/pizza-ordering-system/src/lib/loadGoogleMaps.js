import _ from 'lodash';

function createApiSrc(url, params) {
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

  return `${url}${createQueryString(params)}`;
}

function loadGoogleMaps(url, params) {
  if (!document.getElementById('google-maps')) {
    var ref = document.getElementsByTagName('script')[0];
    var script = document.createElement('script');

    Object.assign(script, {
      src: createApiSrc(url, params),
      id: 'google-maps',
      async: true,
      defer: true,
    })

    ref.parentNode.insertBefore(script, ref);

    return new Promise(resolve => {
      script.addEventListener('load', resolve);
    })

  } else {
    return new Promise(resolve => resolve());
  }
}

export default loadGoogleMaps;