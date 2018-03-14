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

export default initGoogleMaps;