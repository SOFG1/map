await waitForLoad();

// Data
map.addSource("points", {
  type: "geojson",
  data: {
    type: "FeatureCollection",
    features: mapPointsData.map((p) => {
      const { coordinates, ...properties } = p;
      return {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: coordinates,
        },
        properties,
      };
    }),
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
  },
});
