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
  var ref = window.document.getElementsByTagName('script')[0];
  if (!window.document.getElementById('google-maps')) {
    var scriptTag = window.document.createElement('script');
  
    scriptTag.id = 'google-maps';
    scriptTag.src = createApiSrc(url, params);
    scriptTag.async = true;
    scriptTag.defer = true;
    ref.parentNode.insertBefore(scriptTag, ref);

    return true;
  }

  return false;
}

export default loadGoogleMaps;