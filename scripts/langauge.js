await waitForLoad();

const select = document.querySelector(".lang-select");

const legendLabels = {
  en: ["Opened clubs", "For franchisee"],
  ru: ["Відкриті клуби", "У планах"],
};

select.addEventListener("change", (e) => {
  const lang = e.target.value;
  //Switch search input language
  window.geocoder.options.language = lang;

  //Switch map labels language
  map.getStyle().layers.forEach(function (thisLayer) {
    if (thisLayer.type == "symbol") {
      map.setLayoutProperty(thisLayer.id, "text-field", [
        "get",
        `name_${lang}`,
      ]);
    }
  });

  //Switch legend labels
  const labels = document.querySelectorAll(".legend__text");
  labels.forEach((l, i) => (l.textContent = legendLabels[lang][i]));
});
