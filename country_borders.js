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

//Fill Russia with grey color
map.addLayer(
  {
    id: "country-boundaries",
    source: {
      type: "vector",
      url: "mapbox://mapbox.country-boundaries-v1",
    },
    "source-layer": "country_boundaries",
    type: "fill",
    paint: {
      "fill-color": "#888",
      "fill-opacity": 0.9,
    },
  },
  "country-label"
);
map.setFilter("country-boundaries", ["in", "iso_3166_1_alpha_3", "RUS"]);

//Hide all labels inside Russia
map.getStyle().layers.forEach((layer) => {
  if (layer.id.includes("label")) {
    map.setFilter(layer.id, [
      "all",
      ["!=", ["get", "iso_3166_1"], "RU"], // Exclude cities in Russia
    ]);
  }
});

map.setFilter("country-label", [
  "match",
  ["get", "type"], // Replace 'name_en' with the appropriate property for your dataset
  ["country"], // List of countries to match
  true,
  false, // Default to false for all other features
]);

map.setPaintProperty("country-label", "text-color", "#fc3517");
