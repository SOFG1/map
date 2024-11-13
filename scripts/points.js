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
    "icon-size": 1, // Make the icon size consistent across zooms
    "icon-ignore-placement": true, // Prevent the icon from being hidden due to placement restrictions
  },
});

//////////////////////////////////////////////////////////////////////////////////////////////////

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
    "icon-allow-overlap": true,
    "icon-size": 1, // Make the icon size consistent across zooms
    "icon-ignore-placement": true, // Prevent the icon from being hidden due to placement restrictions
  },
});

map.moveLayer("unclustered-point");
