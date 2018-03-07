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
  var scriptTag = window.document.createElement('script');
  scriptTag.src = createApiSrc(url, params);
  scriptTag.async = true;
  scriptTag.defer = true;
  ref.parentNode.insertBefore(scriptTag, ref);
}

function initGoogleMaps(mapCenter) {
  const { google } = window;
  const mapDiv = document.getElementById('map');

  const map = new google.maps.Map(mapDiv, {
    zoom: 14,
    center: mapCenter,
    mapTypeControl: false,
    fullscreenControl: false,
    streetViewControl: false,
    styles: [
      {
        featureType: 'poi',
        elementType: 'labels',
        stylers: [{ visibility: 'off' }],
      },
      {
        featureType: 'transit',
        elementType: 'labels',
        stylers: [{ visibility: 'off' }],
      }
    ]
  });

  const marker = new google.maps.Marker({
    map,
    position: mapCenter,
    animation: google.maps.Animation.DROP,
  });

  google.maps.event.addListener(map, 'click', e => {
    marker.setPosition(e.latLng);
  })

  return {
    map,
    marker,
  }
}

function initSearchBox(
  inputId, 
  map, 
  reAdjustMarker, 
  reAdjustCenter, 
  setMapZoom
) {
  if (inputId) {
    const { google } = window;
    const input = document.getElementById(inputId);
    const searchBox = new google.maps.places.SearchBox(input);

    map.addListener('bounds_changed', () => {
      searchBox.setBounds(map.getBounds());
    })

    searchBox.addListener('places_changed', () => {
      const places = searchBox.getPlaces();

      if (places.length === 0) return;
      
      const { location } = places[0].geometry
      reAdjustMarker(location);
      reAdjustCenter(location);
      setMapZoom(14);
    })

    return searchBox;
  }
}

function createStoreMarkers(stores, map) {
  const { google } = window;
  if (google && map) {
    const markers = _.map(stores, x => 
      new google.maps.Marker({
        position: {
          lat: x.lat,
          lng: x.lng,
        },
        map,
        animation: google.maps.Animation.DROP,
      })
    )
    return markers;
  }
}

export {
  loadGoogleMaps,
  initGoogleMaps,
  initSearchBox,
  createStoreMarkers,
};
