mapboxgl.accessToken =
  "pk.eyJ1Ijoib25lcGVhY2UiLCJhIjoiY2t1eHUxMmpiMGhxaTJucXFjd2k5ZjE2OSJ9.MwH_NiqfqOlyMU3j50Z1dw";

const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v9",
  //   projection: "globe", // Display the map as a globe, since satellite-v9 defaults to Mercator
  center: [30.45, 50.45], // Initial map center [longitude, latitude]
  zoom: 10, //
});

map.addControl(new mapboxgl.NavigationControl());
map.scrollZoom.disable();

window.map = map;
