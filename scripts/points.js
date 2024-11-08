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
    "icon-allow-overlap": true,
  },
});

//New points data
const newPointsFeatures = newPoints.map((p) => {
  return {
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: p.coordinates,
    },
    properties: {
      location: p.location,
    },
  };
});

//New points source
map.addSource("newpoints", {
  type: "geojson",
  data: {
    type: "FeatureCollection",
    features: newPointsFeatures,
  },
});

// Points
map.addLayer({
  id: "new-point",
  type: "symbol",
  source: "newpoints",
  layout: {
    "icon-image": "pin3",
    "icon-anchor": "bottom",
  },
});
