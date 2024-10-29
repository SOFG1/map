// Add building layers with 3D extrusion if not already present

map.on("load", () => {
  map.getStyle().layers.forEach(function (layer) {
    // Check for road-related text layers, which usually have 'road' and 'label' in their IDs
    if (layer.id.includes("road") && layer.type === "symbol") {
      // Hide the layer by setting its visibility to 'none'
      map.setLayoutProperty(layer.id, "visibility", "none");
    }
  });

  ////////////////////////
  map.addSource("currentBuildings", {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: mapPointsData.map((p) => {
        return {
          type: "Feature",
          state: {},
          geometry: {
            type: "Polygon",
            coordinates: p.buildingModel,
          },
          properties: {
            type: "building",
            min_height: 0,
            iso_3166_2: "UA-30",
            height: 15.5,
            underground: "false",
            extrude: "true",
            iso_3166_1: "UA",
          },
          id: 100738522,
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
        };
      }),
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
});
