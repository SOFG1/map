await waitForLoad();

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

map.getStyle().layers.forEach((layer) => {
  if (layer.id.includes("label")) {
    map.setFilter(layer.id, [
      "all",
      ["!=", ["get", "iso_3166_1"], "RU"], // Exclude cities in Russia
    ]);
  }
});

map.on("click", (e) => {
  console.log(123123);
  const features = map.queryRenderedFeatures(e.point, {
    layers: ["country-boundaries"], // Specify the layer(s) you want to query
  });

  if (features.length > 0) {
    console.log(features); // Log the feature data
  }
});
