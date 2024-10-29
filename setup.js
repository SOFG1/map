mapboxgl.accessToken =
  "pk.eyJ1Ijoib25lcGVhY2UiLCJhIjoiY2t1eHUxMmpiMGhxaTJucXFjd2k5ZjE2OSJ9.MwH_NiqfqOlyMU3j50Z1dw";

const style = "mapbox://styles/mapbox/streets-v12";
const map = new mapboxgl.Map({
  style,
  projection: "globe",
  container: "map", // container ID
  center: [-9.292787, 38.700374], // starting position [lng, lat]
  zoom: 16, // starting zoom
  pitch: 30, // starting pitch
});

map.addControl(new mapboxgl.NavigationControl());

window.map = map;
