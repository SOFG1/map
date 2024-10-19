/////////////////////
map.on("click", "3d-buildings", (e) => {
  const feature = e.features[0];
  console.log(feature);
  feature.layer.paint["fill-extrusion-opacity"] = 0;
  map.triggerRepaint();
  console.log(feature);
  ////////////////////////
  map.addSource("currentBuildings", {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: [feature],
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
      "fill-extrusion-color": "#FF0000",
      "fill-extrusion-height": ["get", "height"],
      "fill-extrusion-base": 0,
      "fill-extrusion-opacity": 0.8,
    },
  });
  map.triggerRepaint();
});
