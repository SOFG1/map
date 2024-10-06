// TO MAKE THE MAP APPEAR YOU MUST
// ADD YOUR ACCESS TOKEN FROM
// https://account.mapbox.com

const imageSrc =
  "https://media.istockphoto.com/id/511061090/photo/business-office-building-in-london-england.jpg?s=612x612&w=0&k=20&c=nYAn4JKoCqO1hMTjZiND1PAIWoABuy1BwH1MhaEoG6w=";

mapboxgl.accessToken =
  "pk.eyJ1Ijoib25lcGVhY2UiLCJhIjoiY2t1eHUxMmpiMGhxaTJucXFjd2k5ZjE2OSJ9.MwH_NiqfqOlyMU3j50Z1dw";

const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v9",
  //   projection: "globe", // Display the map as a globe, since satellite-v9 defaults to Mercator
  center: [30.45, 50.45], // Initial map center [longitude, latitude]
  zoom: 10, //
});

map.addControl(new mapboxgl.NavigationControl());
map.scrollZoom.disable();

//Finished setup
map.on("load", () => {
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

  // When a click event occurs on a feature in the unclustered-point layer, display a popup
  map.on("click", "unclustered-point", (e) => {
    const coordinates = e.features[0].geometry.coordinates.slice();
    const title = e.features[0].properties.title;

    // Ensure that if the map is zoomed out such that multiple copies of the feature are visible, the popup appears over the copy being clicked
    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }

    new mapboxgl.Popup()
      .setLngLat(coordinates)
      .setHTML(
        `    <div>
      <h2>Mafia club #1</h2>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
      <img
        height="200"
        width="200"
        src="${imageSrc}"
        alt=""
      />
    </div>`
      )
      .addTo(map);
  });

  // Change the cursor to a pointer when the mouse is over the clusters
  map.on("mouseenter", "clusters", () => {
    map.getCanvas().style.cursor = "pointer";
  });
  map.on("mouseleave", "clusters", () => {
    map.getCanvas().style.cursor = "";
  });
});

// function addMarker(lng, lat) {
//   const marker = new mapboxgl.Marker()
//     .setLngLat([lng, lat]) // Coordinates [longitude, latitude]
//     .addTo(map);
// }

// addMarker(30.45, 50.45);
// addMarker(30.44, 50.45);
// addMarker(30.44, 50.46);
