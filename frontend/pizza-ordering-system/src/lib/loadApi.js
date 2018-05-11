import createQuery from './createQuery';

function loadApi(tag, url, params) {
  if (!document.getElementById(tag)) {
    var ref = document.getElementsByTagName('script')[0];
    var script = document.createElement('script');

    Object.assign(script, {
      src: createQuery(url, params),
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