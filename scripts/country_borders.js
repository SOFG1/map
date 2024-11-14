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

/////////////////////////////////////////////////////////////////////////// Optional functionality below

//Hide other labels (city, town, village)
map.setPaintProperty("country-label", "text-opacity", [
  "case",
  ["==", ["get", "type"], "country"], // Condition check
  1, // Color if condition is true
  0, // Leave default color if condition is false
]);

map.on("click", function (e) {
  const features = map.queryRenderedFeatures(e.point);

  if (features.length > 0) {
    // Log each feature's layer ID
    features.forEach((feature) => {
      console.log("Layer ID:", feature.layer.id);
      console.log("Feature properties:", feature.properties);
      console.log("Feature geometry:", feature.geometry);
    });
  } else {
    console.log("No features found at the clicked location.");
  }
});
