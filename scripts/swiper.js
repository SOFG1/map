function createSwiper() {
  window.swiper = new Swiper(".swiper", {
    slidesPerView: 3,
    spaceBetween: 8,
    navigation: {
      nextEl: ".popup__slider-btn_right",
      prevEl: ".popup__slider-btn_left",
    },
  });
  swiper.on("click", (e) => {
    const opened = document.body.classList.contains("swiper-opened");
    if (opened) {
      swiper.params.slidesPerView = 3;
      swiper.params.gap = 8;
      swiper.params.loop = false;
      document.body.classList.remove("swiper-opened");
      setTimeout(() => {
        window.miniSwiper?.slideTo(0);
      }, 2000);
    }
    if (!opened) {
      window.openSwiper();
      setTimeout(() => {
        swiper.slideTo(e.clickedIndex);
      }, 100);
    }
  });
}

window.openSwiper = () => {
  swiper.params.slidesPerView = 1;
  swiper.params.gap = 40;
  swiper.params.loop = true;
  document.body.classList.add("swiper-opened");
};

window.createSwiper = createSwiper;

//Prevent underlying links click
document.addEventListener("touchend", (e) => {
  const link = e.target.closest("body.swiper-opened");
  if (link) {
    e.preventDefault();
  }
});
