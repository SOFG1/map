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

console.log(window.MapboxGeocoder);

// Add the Geocoder control
const geocoder = new MapboxGeocoder({
  accessToken: mapboxgl.accessToken,
  mapboxgl: mapboxgl,
  marker: false, // Set to true to add a marker for the result
  placeholder: "Search for places", // Customize placeholder text
});

// Add the geocoder to the map
map.addControl(geocoder);

// Optional: Use the result event to do something when a location is found
geocoder.on("result", (e) => {
  console.log("Found location:", e.result);
  // Center the map on the searched location
  map.flyTo({
    center: e.result.center,
    zoom: 12,
  });
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
