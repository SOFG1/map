function createSwiper() {
  const swiper = new Swiper(".swiper", {
    slidesPerView: 3,
    spaceBetween: 8,
    navigation: {
      nextEl: ".popup__slider-btn_right",
      prevEl: ".popup__slider-btn_left",
    },
  });
}

window.createSwiper = createSwiper;
