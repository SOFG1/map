function generatePopupHtml() {
  return `
      <img src="./images/1.jpg" alt="" class="popup__img" />
      <div class="popup__box">
        <div class="popup__content">
          <p class="popup__title">Mafia Kyiv Game</p>
          <p class="popup__city">Kyiv, Ukraine</p>
          <p class="popup__link">
            <img src="./images/icon4.svg" alt="" class="popup__icon" /> ресторан
            "Причал", Набережне Шосе, 11
          </p>
          <p class="popup__link">
            <img src="./images/icon3.svg" alt="" class="popup__icon" /> +38 050
            761 96 98
          </p>
          <a
            href="https://t.me/MafiaKyivGame"
            target="_blank"
            class="popup__link popup__link_blue"
          >
            <img src="./images/icon2.svg" alt="" class="popup__icon" />
            t.me/MafiaKyivGame
          </a>
          <a
            href="https://instagram.com/Man_of_Mafia"
            target="_blank"
            class="popup__link popup__link_blue"
          >
            <img src="./images/icon1.svg" alt="" class="popup__icon" />
            Instagram.com/Man_of_Mafia
          </a>
        </div>
        <img src="./images/logo.png" alt="" class="popup__logo" />
      </div>
      <div class="popup__text">
        Створюємо гарний настрій вже 13 років! Граємо кожні Ср, Пт та Нд в
        різних ресторанах в центрі міста. Завжди раді новим обличчям!
      </div>
      <div class="popup__slider">
        <button class="popup__slider-btn popup__slider-btn_left">
          <img
            src="./images/arrow-left.svg"
            alt=""
            class="popup__slider-arrow"
          />
        </button>
        <button class="popup__slider-btn popup__slider-btn_right">
          <img
            src="./images/arrow-right.svg"
            alt=""
            class="popup__slider-arrow"
          />
        </button>
        <img src="./images/1.jpg" alt="" class="popup__slider-img" />
        <img src="./images/2.jpg" alt="" class="popup__slider-img" />
        <img src="./images/1.jpg" alt="" class="popup__slider-img" />
      </div>
      <img src="./images/stripes.svg" class="popup__stripes" />
  `;
}

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
    .setHTML(generatePopupHtml())
    .addTo(map);
});
