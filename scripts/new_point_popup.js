const text =
  "Шукаємо партнерів для відкриття клубу Мафії в цьому чудовому місті 😎";
const phone = "+380507619698";
const link = "https://franchise.mafia.events/";
const linkText = "Franchise.Mafia.Events";
const instaLink = "https://www.instagram.com/man_of_mafia/";
const instaText = "man_of_mafia";

function generatePopupHtml(props) {
  return `
      <img src="./assets/images/stripes2.png" class="popup__stripes" />
      <img src="./assets/images/new-point-photo.png" alt="image" class="popup__img popup__img_secondary" />
      <div class="popup__box popup__box_secondary">
        <div class="popup__content popup__content_secondary">
          <p class="popup__title popup__title_secondary">${props.location}</p>
          <div class="popup__text">${text}</div>
          <a href="tel: ${phone}" class="popup__link popup__link_black popup__link_center">
            <img src="./assets/images/icon3.svg" alt="" class="popup__icon" />
            ${phone}
          </a>
          <div class="popup__link-box">
            <a href="${link}" target="_blank" class="popup__link popup__link_blue">
              <img src="./assets/images/link-icon.svg" alt="" class="popup__icon" />
              ${linkText}
            </a>
            <a href="${instaLink}"
              target="_blank"
              class="popup__link popup__link_blue"
            >
              <img src="./assets/images/icon1.svg" alt="" class="popup__icon" />
              ${instaText}
            </a>
          </div>
        </div>
      </div>
      <img src="./assets/logos/New.png" alt="" class="popup__logo popup__logo_secondary" />
      ${window.generateMarque("marque3 marque_secondary")}
      ${window.generateMarque("marque4 marque_secondary")}
      ${window.generateMarque("marque5 marque_secondary")}
      ${window.generateMarque("marque6 marque_secondary")}
  `;
}

// Popup
map.on("click", "new-point", (e) => {
  if (window.openedPopup) window.openedPopup.remove(); //Remove popup if there is one
  const coordinates = e.features[0].geometry.coordinates.slice();

  // Ensure that if the map is zoomed out such that multiple copies of the feature are visible, the popup appears over the copy being clicked
  while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
  }
  openPopup2(e.features[0].properties, coordinates);
});

window.openPopup2 = function (option, coordinates) {
  window.openedPopup = new mapboxgl.Popup({
    className: "primary-popup",
  })
    .setLngLat(coordinates)
    .setHTML(generatePopupHtml(option))
    .addTo(map);
};
