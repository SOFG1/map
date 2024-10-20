mapboxgl.accessToken =
  "pk.eyJ1Ijoib25lcGVhY2UiLCJhIjoiY2t1eHUxMmpiMGhxaTJucXFjd2k5ZjE2OSJ9.MwH_NiqfqOlyMU3j50Z1dw";

const style = "mapbox://styles/mapbox/dark-v11";
const map = new mapboxgl.Map({
  style,
  projection: "globe",
  container: "map", // container ID
  center: [30.44053553463158, 50.45924483725847], // starting position [lng, lat]
  zoom: 18, // starting zoom
  pitch: 30, // starting pitch
});

map.on("load", () => {
  // Add a 3D building layer with fill-extrusion properties
});

map.addControl(new mapboxgl.NavigationControl());

// map.addControl(
//   new MapboxDirections({
//     accessToken: mapboxgl.accessToken,
//   }),
//   "top-left"
// );

window.map = map;
