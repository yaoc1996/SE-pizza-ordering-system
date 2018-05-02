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

  return `${url}?${createQueryString(params)}`;
}

function loadApi(tag, url, params) {
  if (!document.getElementById(tag)) {
    var ref = document.getElementsByTagName('script')[0];
    var script = document.createElement('script');

    Object.assign(script, {
      src: createApiSrc(url, params),
      id: tag,
      async: true,
      defer: true,
    })

    ref.parentNode.insertBefore(script, ref);

    return new Promise(resolve => {
      const start = Date.now();
      script.addEventListener('load', () => {
        console.log(`Google Maps Loading Time: ${Date.now() - start}ms`);
        resolve(window)
      });
    })

  } else {
    return new Promise(resolve => resolve(window));
  }
}

export default loadApi;