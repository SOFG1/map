const text =
  "Шукаємо партнерів для відкриття клубу Мафії в цьому чудовому місті 😎";
const phone = "+38 050 761 96 98";
const link = "https://franchise.mafia.events/";
const linkText = "franchise.mafia.events";
const instaLink = "https://www.instagram.com/man_of_mafia/";
const instaText = "man_of_mafia";

function generatePopupHtml(props) {
  return `
      <img src="./assets/images/new-point-photo.png" alt="image" class="popup__img" />
      <div class="popup__box">
        <div class="popup__content">
          <p class="popup__title">${props.location}</p>
            <a href="tel: ${phone}" class="popup__link popup__link_black">
              <img src="./assets/images/icon3.svg" alt="" class="popup__icon" />
              ${phone}
            </a>
            <a href="${link}" target="_blank" class="popup__link popup__link_blue">
              <img src="./assets/images/icon4.svg" alt="" class="popup__icon" />
              ${linkText}
              </p>
            <a href="${instaLink}"
              target="_blank"
              class="popup__link popup__link_blue"
            >
              <img src="./assets/images/icon1.svg" alt="" class="popup__icon" />
              ${instaText}
            </a>
        </div>
      </div>
      <div class="popup__text">${text}</div>
        <img src="./assets/logos/New.png" alt="" class="popup__logo" />
      <img src="./assets/images/stripes.svg" class="popup__stripes" />
  `;
}

// Popup
map.on("click", "new-point", (e) => {
  const coordinates = e.features[0].geometry.coordinates.slice();

  // Ensure that if the map is zoomed out such that multiple copies of the feature are visible, the popup appears over the copy being clicked
  while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
  }

  new mapboxgl.Popup()
    .setLngLat(coordinates)
    .setHTML(generatePopupHtml(e.features[0].properties))
    .addTo(map);
});
