function generateSlider(photos) {
  return `
      <div class="slider-wrapper">
      <div class="swiper">
        <div class="swiper-wrapper">
        ${photos
          .map(
            (p) => `
          <div class="swiper-slide">
            <img src="${p}" alt="photo" />
          </div>
          `
          )
          .join("")}
        </div>
      </div>
      <button class="popup__slider-btn popup__slider-btn_left">
        <img src="./assets/images/arrow-left.svg" class="popup__slider-arrow" />
      </button>
      <button class="popup__slider-btn popup__slider-btn_right">
        <img
          src="./assets/images/arrow-right.svg"
          class="popup__slider-arrow"
        />
      </button>
    </div>
    `;
}

function generateMiniSwiper(photos) {
  setTimeout(() => {
    window.miniSwiper = new Swiper(".mini-swiper", {
      allowTouchMove: false,
      centeredSlides: true,
      loop: true,
      spaceBetween: 15,
      autoplay: {
        delay: 2000,
        disableOnInteraction: false,
      },
      pauseOnInteraction: false,
      speed: 1000,
    });
  }, 400);
  return `
  <div class="mini-swiper">
    <div class="swiper-wrapper">
    ${photos
      .map(
        (p, i) => `<div class="swiper-slide">
        <img src="${p}" alt="image" class="popup-main-js" data-index="${i}" />
      </div>`
      )
      .join("")}
    </div>
  </div>
`;
}

function generatePopupHtml(props) {
  const photos = Array.isArray(props.photos)
    ? props.photos
    : JSON.parse(props.photos);
  queueMicrotask(createSwiper); //Create a swiper after render
  return `

      ${generateMiniSwiper(photos)}
      <div class="popup__box">
        <div class="popup__content">
          <p class="popup__title">${props.title}</p>
          <p class="popup__city">${props.location}</p>
          <p class="popup__link ${props.address ? "" : "hidden"}">
            <img src="./assets/images/icon4.svg" alt="" class="popup__icon" />${
              props.address
            }</p>
          <a href="tel: ${props.phone}" class="popup__link popup__link_blue ${
    props.phone ? "" : "hidden"
  }">
            <img src="./assets/images/icon3.svg" alt="" class="popup__icon" />${
              props.phone
            }</a>
          <a
            href="https://${props.telegram}"
            target="_blank"
            class="popup__link popup__link_blue ${
              props.telegram ? "" : "hidden"
            }"
          >
            <img src="./assets/images/icon2.svg" alt="" class="popup__icon" />
            ${props.telegram}
          </a>
          <a
            href="https://${props.insta}"
            target="_blank"
            class="popup__link popup__link_blue  ${props.insta ? "" : "hidden"}"
          >
            <img src="./assets/images/icon1.svg" alt="" class="popup__icon" />
            ${props.insta}
          </a>
        </div>
        <img src="${props.logo}" alt="" class="popup__logo" />
      </div>
      ${props.text ? `<div class="popup__text">${props.text}</div>` : ""}
      ${generateSlider(photos)}
      ${window.generateMarque("marque1")}
      ${window.generateMarque("marque2")}
  `;
}

// Popup
map.on("click", "unclustered-point", (e) => {
  if (window.openedPopup) window.openedPopup.remove(); //Remove popup if there is one
  const coordinates = e.features[0].geometry.coordinates.slice();

  // Ensure that if the map is zoomed out such that multiple copies of the feature are visible, the popup appears over the copy being clicked
  while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
  }

  window.openPopup1(e.features[0].properties, coordinates);
});

window.openPopup1 = function (properties, coordinates) {
  window.openedPopup = new mapboxgl.Popup({
    className: "primary-popup",
  })
    .setLngLat(coordinates)
    .setHTML(generatePopupHtml(properties))
    .addTo(map)
    .on("close", () => {
      window.swiper?.destroy();
      document.body.classList.remove("swiper-opened");
    });
};

document.addEventListener("click", (e) => {
  if (e.target.closest(".popup-main-js")) {
    const index = e.target.getAttribute("data-index");
    setTimeout(() => {
      window.swiper?.slideTo(index);
    }, 100);
    window.openSwiper();
  }
});
