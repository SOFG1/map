await waitForLoad();

const select = document.querySelector(".lang-select");

select.addEventListener("change", (e) => {
  map.getStyle().layers.forEach(function (thisLayer) {
    if (thisLayer.type == "symbol") {
      map.setLayoutProperty(thisLayer.id, "text-field", [
        "get",
        `name_${e.target.value}`,
      ]);
    }
  });
});
