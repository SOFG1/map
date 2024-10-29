function generateSlider(photos) {
  return `
      <div class="slider-wrapper">
      <div class="swiper">
        <div class="swiper-wrapper">
        ${photos.map(
          (p) => `
          <div class="swiper-slide">
            <img class="js-image" src="${p}" alt="photo" />
          </div>
          `
        )}
        </div>
      </div>
      <button class="popup__slider-btn popup__slider-btn_left">
        <img src="./images/arrow-left.svg" class="popup__slider-arrow" />
      </button>
      <button class="popup__slider-btn popup__slider-btn_right">
        <img
          src="./images/arrow-right.svg"
          class="popup__slider-arrow"
        />
      </button>
    </div>
    `;
}

function generatePopupHtml(props) {
  const photos = JSON.parse(props.photos);
  queueMicrotask(createSwiper);
  return `
      ${
        photos[0]
          ? `<img src="${photos[0]}" alt="image" class="popup__img js-image" />`
          : ""
      }
      <div class="popup__box">
        <div class="popup__content">
          <p class="popup__title">${props.title}</p>
          <p class="popup__city">${props.location}</p>
          <p class="popup__link">
            <img src="./images/icon4.svg" alt="" class="popup__icon" />${
              props.address
            }</p>
          <a href="tel: +380507619698" class="popup__link popup__link_blue">
            <img src="./images/icon3.svg" alt="" class="popup__icon" />${
              props.phone
            }</a>
          <a
            href="https://${props.telegram}"
            target="_blank"
            class="popup__link popup__link_blue"
          >
            <img src="./images/icon2.svg" alt="" class="popup__icon" />
            ${props.telegram}
          </a>
          <a
            href="https://${props.insta}"
            target="_blank"
            class="popup__link popup__link_blue"
          >
            <img src="./images/icon1.svg" alt="" class="popup__icon" />
            ${props.insta}
          </a>
        </div>
        <img src="./images/logo.png" alt="" class="popup__logo" />
      </div>
      ${props.text ? `<div class="popup__text">${props.text}</div>` : ""}
      ${generateSlider(photos)}
      <img src="./images/stripes.svg" class="popup__stripes" />
  `;
}

function zoomImage(e) {
  const image = e.target;
  console.log(image.src);
  const el = document.createElement("img");
  el.src = image.src;
  el.classList.add("image-full");
  document.body.appendChild(el);
  el.addEventListener("click", () => el.remove());
}

function makeImagesFull() {
  const images = document.querySelectorAll(".js-image");
  console.log(images);
  images.forEach((i) => i.addEventListener("click", zoomImage));
}

// Popup
map.on("click", "unclustered-point", (e) => {
  const coordinates = e.features[0].geometry.coordinates.slice();

  // Ensure that if the map is zoomed out such that multiple copies of the feature are visible, the popup appears over the copy being clicked
  while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
  }

  new mapboxgl.Popup()
    .setLngLat(coordinates)
    .setHTML(generatePopupHtml(e.features[0].properties))
    .addTo(map);

  makeImagesFull();
});
