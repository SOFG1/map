await waitForLoad();

// Add a new source from our GeoJSON data with clustering enabled
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

// Add a layer for the clusters
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

// Add a layer for the cluster count (the number displayed on each cluster)
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

// Add a layer for the individual unclustered points
map.addLayer({
  id: "unclustered-point",
  type: "circle",
  source: "points",
  filter: ["!", ["has", "point_count"]],
  paint: {
    "circle-color": "#FF0000",
    "circle-radius": 8,
    "circle-stroke-width": 1,
    "circle-stroke-color": "#fff",
  },
});

// Inspect a cluster on click
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
