await waitForLoad();

const features = [];

mapPointsData.forEach((properties) => {
  properties.points.forEach((coordinates) => {
    features.push({
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates,
      },
      properties,
    });
  });
});

// Data
map.addSource("points", {
  type: "geojson",
  data: {
    type: "FeatureCollection",
    features,
  },
});

// Points
map.addLayer({
  id: "unclustered-point",
  type: "symbol",
  source: "points",
  layout: {
    // "icon-image": ["get", "pin"],
    "icon-image": "pin2",
    "icon-anchor": "bottom",
    // "icon-allow-overlap": true,
  },
});
