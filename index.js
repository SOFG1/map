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
        },
      },
    ],
  },
  cluster: true,
  clusterMaxZoom: 14, // Max zoom to cluster points on
  clusterRadius: 50, // Radius of each cluster when clustering points (defaults to 50)
});

// Cluster
map.addLayer({
  id: "clusters",
  type: "circle",
  source: "points",
  filter: ["has", "point_count"],
  paint: {
    "circle-color": [
      "step",
      ["get", "point_count"],
      "#FF0000",
      10,
      "#FF0000",
      20,
      "#FF0000",
    ],
    "circle-radius": ["step", ["get", "point_count"], 15, 10, 20, 20, 25],
  },
});

// Cluster count text
map.addLayer({
  id: "cluster-count",
  type: "symbol",
  source: "points",
  filter: ["has", "point_count"],
  layout: {
    "text-field": "{point_count_abbreviated}",
    "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
    "text-size": 12,
  },
});

// Points
map.addLayer({
  id: "unclustered-point",
  type: "symbol",
  source: "points",
  layout: {
    "icon-image": "pin2",
    // get the title name from the source's "title" property
    // "text-field": ["get", "title"],
    // "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
    // "text-offset": [0, 1.25],
    // "text-anchor": "top",
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
