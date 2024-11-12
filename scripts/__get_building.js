map.on("load", () => {
  // Add the 3D buildings layer
  map.addLayer({
    id: "3d-buildings",
    source: "composite",
    "source-layer": "building",
    filter: ["==", "extrude", "true"],
    type: "fill-extrusion",
    minzoom: 15,
    paint: {
      "fill-extrusion-color": "#aaa",
      "fill-extrusion-height": [
        "interpolate",
        ["linear"],
        ["zoom"],
        15,
        0,
        15.05,
        ["get", "height"],
      ],
      "fill-extrusion-base": [
        "interpolate",
        ["linear"],
        ["zoom"],
        15,
        0,
        15.05,
        ["get", "min_height"],
      ],
      "fill-extrusion-opacity": 0.6,
    },
  });

  // Add click event listener
  map.on("click", (event) => {
    const clickedPointCoords = [event.lngLat.lng, event.lngLat.lat];
    console.log("Point coords: ", clickedPointCoords);

    // Get the features at the click location
    const features = map.queryRenderedFeatures(event.point, {
      layers: ["3d-buildings"],
    });

    // Check if a building was clicked
    if (features.length > 0) {
      const building = features[0];
      // console.log(building);
      const coordinates = building.geometry.coordinates;

      console.log("Building:", coordinates);
      console.log("Height:", building.properties.height);
    }
  });
});
