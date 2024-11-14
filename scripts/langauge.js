await waitForLoad();

const select = document.querySelector(".lang-select");

select.addEventListener("change", (e) => {
  const lang = e.target.value;
  window.geocoder.options.language = lang;

  map.getStyle().layers.forEach(function (thisLayer) {
    if (thisLayer.type == "symbol") {
      map.setLayoutProperty(thisLayer.id, "text-field", [
        "get",
        `name_${lang}`,
      ]);
    }
  });
});
