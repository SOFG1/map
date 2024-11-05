await waitForLoad();

const language = new MapboxLanguage({ defaultLanguage: "uk" });
console.log(language);
map.addControl(language);

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
