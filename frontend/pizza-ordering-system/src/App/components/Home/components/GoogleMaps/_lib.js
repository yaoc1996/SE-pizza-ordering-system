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
    // fetch 3 new stores here
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
    const createMarker = store => {
      const marker = new google.maps.Marker({
        position: {
          lat: store.lat,
          lng: store.lng,
        },
        map,
        animation: google.maps.Animation.DROP,
      });

      const contentString = `
        <div>
          <label>${store.name}</label>
          <p>${store.address}</p>
          <button id='button'>Enter Store</button>
        </div>
      `;

      marker.infoWindow = new google.maps.InfoWindow({
        content: contentString,
        closeControl: false,
        storeName: store.name,
        storeAddress: store.address,
      })

      return marker;
    }

    const initClickEvent = marker => {
      marker.addListener('click', () => {
        _.forEach(markers, otherMarker => {
          if (otherMarker !== marker) {
            otherMarker.infoWindow.close();
          }
        })
  
        if (marker.infoWindow.getMap()) {
          marker.infoWindow.close();
        } else {
          marker.infoWindow.open(map, marker);
          const redirectToStore = () => {
            console.log(marker.infoWindow.storeName);
            // code to redirect to store page here;
          }
          const enterButton = document.getElementById('button');
          enterButton.onclick = redirectToStore;

          marker.setAnimation(google.maps.Animation.BOUNCE);
          setTimeout(() => {
            marker.setAnimation(null);
          }, 700);
        }
      })

    }

    const markers = _.map(stores, createMarker);
    _.forEach(markers, initClickEvent);

    return markers
  }
}

export {
  loadGoogleMaps,
  initGoogleMaps,
  initSearchBox,
  createStoreMarkers,
};
