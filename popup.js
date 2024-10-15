const imageSrc =
  "https://media.istockphoto.com/id/511061090/photo/business-office-building-in-london-england.jpg?s=612x612&w=0&k=20&c=nYAn4JKoCqO1hMTjZiND1PAIWoABuy1BwH1MhaEoG6w=";

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
      `<div>
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
