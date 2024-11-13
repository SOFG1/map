mapboxgl.accessToken =
  "pk.eyJ1IjoibWFmaWF3b3JsZCIsImEiOiJjbTFrZDJjeHEwNG95MmlzM2ZjZmJxaGg3In0.TbBxbFICvziZWMaii_RjMQ";

const style = "mapbox://styles/mapbox/streets-v12";
const map = new mapboxgl.Map({
  style,
  projection: "globe",
  container: "map", // container ID
  center: [25, 42], // starting position [lng, lat]
  zoom: 2.7,
  pitch: 30,
  crossSourceCollisions: false,
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
