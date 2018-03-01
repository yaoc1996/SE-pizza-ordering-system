import { GoogleMapsApiKey } from './config/config.json';

const url = 'https://maps.googleapis.com/maps/api/js?';
const params = {
  key: GoogleMapsApiKey,
  v: '3.exp',
  callback: 'initMap',
}
const midTownManhattanCoords = {
  lat: 40.7549,
  lng: -73.9840,
}

export {
  url,
  params,
  midTownManhattanCoords,
}