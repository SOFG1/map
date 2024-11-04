mapboxgl.accessToken =
  "pk.eyJ1Ijoib25lcGVhY2UiLCJhIjoiY2t1eHUxMmpiMGhxaTJucXFjd2k5ZjE2OSJ9.MwH_NiqfqOlyMU3j50Z1dw";

const style = "mapbox://styles/mapbox/streets-v12";
const map = new mapboxgl.Map({
  style,
  projection: "globe",
  container: "map", // container ID
  center: [25, 42], // starting position [lng, lat]
  zoom: 3.6,
  pitch: 30,
});

map.addControl(new mapboxgl.NavigationControl());

window.map = map;

//Set zoom step size
document
  .querySelector(".mapboxgl-ctrl-zoom-in")
  .addEventListener("click", () => {
    map.zoomTo(map.getZoom() + 3); // Adjust step as needed
  });

// Zoom out button
document
  .querySelector(".mapboxgl-ctrl-zoom-out")
  .addEventListener("click", () => {
    map.zoomTo(map.getZoom() - 3); // Adjust step as needed
  });
