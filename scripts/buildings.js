// Add building layers with 3D extrusion if not already present
await waitForLoad();

map.getStyle().layers.forEach(function (layer) {
  // Check for road-related text layers, which usually have 'road' and 'label' in their IDs
  if (layer.id.includes("road") && layer.type === "symbol") {
    // Hide the layer by setting its visibility to 'none'
    map.setLayoutProperty(layer.id, "visibility", "none");
  }
});

const features = [];

mapPointsData.forEach((p, pointIndex) => {
  p.buildings.forEach((b, index) => {
    features.push({
      type: "Feature",
      state: {},
      geometry: {
        type: "Polygon",
        coordinates: b.coords,
      },
      properties: {
        type: "building",
        min_height: 0,
        iso_3166_2: "UA-30",
        height: b.height,
        underground: "false",
        extrude: "true",
        iso_3166_1: "UA",
      },
      id: pointIndex + index,
      layer: {
        id: "red-buildings",
        type: "fill-extrusion",
        source: "composite",
        "source-layer": "building",
        layout: {
          visibility: "visible",
        },
        paint: {
          "fill-extrusion-color": {
            r: 0.6666666666666666,
            g: 0.6666666666666666,
            b: 0.6666666666666666,
            a: 1,
          },
          "fill-extrusion-height": 15.5,
          "fill-extrusion-base": 0,
          "fill-extrusion-opacity": 0.5,
        },
      },
      source: "composite",
      sourceLayer: "building",
    });
  });
});

map.addSource("currentBuildings", {
  type: "geojson",
  data: {
    type: "FeatureCollection",
    features,
  },
});

map.addLayer({
  id: "red-buildings",
  source: "currentBuildings",
  type: "fill-extrusion",
  layout: {
    visibility: "visible",
  },
  paint: {
    "fill-extrusion-color": "yellow",
    "fill-extrusion-height": ["get", "height"],
    "fill-extrusion-base": 1,
    "fill-extrusion-opacity": 0.8,
  },
});
