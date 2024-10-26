await waitForLoad();

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
          coordinates: [30.440631987769308, 50.459191771660386],
        },
        properties: {
          title: "Dubai Mafia Game",
          location: "Dubai, OAE",
          address: "Ресторан REN By Sushi Library",
          phone: "+971585921103",
          telegram: "t.me/MafiaDubaiGame",
          insta: "instagram.com/dubai_mafia_game",
          photos: [
            "./photos/1-1.jpg",
            "./photos/1-2.jpg",
            "./photos/1-3.jpg",
            "./photos/1-4.jpg",
            "./photos/1-5.jpg",
          ],
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
    // "icon-image": ["get", "pin"],
    "icon-image": "pin2",
    "icon-anchor": "bottom",
  },
});
