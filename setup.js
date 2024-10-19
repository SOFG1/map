mapboxgl.accessToken =
  "pk.eyJ1Ijoib25lcGVhY2UiLCJhIjoiY2t1eHUxMmpiMGhxaTJucXFjd2k5ZjE2OSJ9.MwH_NiqfqOlyMU3j50Z1dw";

const style = "mapbox://styles/mapbox/streets-v9";

mapboxgl.accessToken =
  "pk.eyJ1Ijoib25lcGVhY2UiLCJhIjoiY2t1eHUxMmpiMGhxaTJucXFjd2k5ZjE2OSJ9.MwH_NiqfqOlyMU3j50Z1dw";
const map = new mapboxgl.Map({
  container: "map", // container ID
  center: [30.44, 50.46], // starting position [lng, lat]
  zoom: 2.8, // starting zoom
  pitch: 30, // starting pitch
});

map.on("load", () => {
  // Add a 3D building layer with fill-extrusion properties
});

map.addControl(new mapboxgl.NavigationControl());
map.scrollZoom.disable();

window.map = map;
