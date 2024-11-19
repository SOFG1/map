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
    properties: p,
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

const text = {
  "text-field": ["get", "label"],
  "text-size": 14,
  "text-font": ["Open Sans SemiBold"],
  "text-anchor": "top",
  "text-offset": [0, 0],
};

// map.addLayer({
//   id: "new-points-labels",
//   type: "symbol",
//   source: "newpoints",
//   layout: text,
//   paint: {
//     "text-color": "#000000", // Set text color
//   },
// });

// map.addLayer({
//   id: "points-labels",
//   type: "symbol",
//   source: "points",
//   layout: text,
//   paint: {
//     "text-color": "#000000", // Set text color
//   },
// });

map.moveLayer("new-point");

map.moveLayer("unclustered-point");

////Hover effect

const popup = new mapboxgl.Popup({
  closeButton: false,
  closeOnClick: false,
  offset: [0, -30],
  className: "location-popup",
  anchor: "bottom",
});

function addLocationPopup(e) {
  // Get the feature properties
  const properties = e.features[0].properties;

  // Set the popup content and position
  popup
    .setLngLat(e.lngLat)
    .setHTML(`<strong>${properties.label}</strong>`) // Adjust to your property
    .addTo(map);
}

// Add mousemove event
map.on("mousemove", "unclustered-point", addLocationPopup);
map.on("touchstart", "unclustered-point", addLocationPopup);
map.on("mousemove", "new-point", addLocationPopup);
map.on("touchstart", "new-point", addLocationPopup);

// Remove the popup when the mouse leaves the layer
map.on("mouseleave", "unclustered-point", () => {
  popup.remove();
});

map.on("mouseleave", "new-point", () => {
  popup.remove();
});

map.on("click", popup.remove);
