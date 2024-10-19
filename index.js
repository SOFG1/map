await waitForLoad();

map.getStyle().layers.forEach(function (layer) {
  // Check for road-related text layers, which usually have 'road' and 'label' in their IDs
  if (layer.id.includes("road") && layer.type === "symbol") {
    // Hide the layer by setting its visibility to 'none'
    map.setLayoutProperty(layer.id, "visibility", "none");
  }
});

// Data
map.addSource("points", {
  type: "geojson",
  data: {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [30.45, 50.45],
        },
        properties: {
          title: "Point 1",
          pin: "pin2",
        },
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [30.44, 50.45],
        },
        properties: {
          title: "Point 2",
          pin: "pin1",
        },
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [30.44, 50.46],
        },
        properties: {
          title: "Point 3",
          pin: "pin2",
        },
      },
    ],
  },
});

// Points
map.addLayer({
  id: "unclustered-point",
  type: "symbol",
  source: "points",
  layout: {
    "icon-image": ["get", "pin"],
  },
});

// Zoom in cluster
map.on("click", "clusters", (e) => {
  const features = map.queryRenderedFeatures(e.point, {
    layers: ["clusters"],
  });
  const clusterId = features[0].properties.cluster_id;
  map.getSource("points").getClusterExpansionZoom(clusterId, (err, zoom) => {
    if (err) return;

    map.easeTo({
      center: features[0].geometry.coordinates,
      zoom: zoom,
    });
  });
});
