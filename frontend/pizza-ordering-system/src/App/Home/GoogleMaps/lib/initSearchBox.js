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

export default initSearchBox;