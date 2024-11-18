await waitForLoad();

map.addSource("countries", {
  type: "vector",
  url: "mapbox://mapbox.mapbox-streets-v8", // Ensure your style uses this or similar source
});

//Make country borders blue
map.addLayer({
  id: "country-borders",
  type: "line",
  source: "countries",
  "source-layer": "admin", // This layer holds boundary data
  filter: ["==", ["get", "admin_level"], 0], // Filter for country borders
  paint: {
    "line-color": "#000", // Set the border color
    "line-width": [
      "interpolate", // Interpolates between two values
      ["linear"], // Linear interpolation
      ["zoom"], // Current zoom level
      10,
      1,
      18,
      40,
    ],
    "line-opacity": 0.7,
  },
});

//Make country labels blue
map.setPaintProperty("country-label", "text-color", [
  "case",
  ["==", ["get", "type"], "country"], // Condition check
  "#242ad4", // Color if condition is true
  ["to-color", ["coalesce", ["get", "text-color"], "#000000"]], // Leave default color if condition is false
]);

map.setLayoutProperty("settlement-major-label", "visibility", "none");
map.setLayoutProperty("settlement-minor-label", "visibility", "none");

//Hide other labels (city, town, village)

map.setPaintProperty("country-label", "text-opacity", [
  "case",
  ["any", ["==", ["get", "type"], "country"], ["==", ["get", "type"], "city"]],
  ["coalesce", ["get", "text-opacity"], 1],
  0,
]);

map.setLayoutProperty("country-label", "text-allow-overlap", false);
