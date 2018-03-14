import _ from 'lodash';

function initStoreMarkers(stores, map) {
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
        store,
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
            console.log(marker.infoWindow.store);
            
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

export default initStoreMarkers;