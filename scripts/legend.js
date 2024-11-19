document.addEventListener("click", (e) => {
  const label = e.target.closest(".legend__item");
  if (!label) return;
  const layerId = label.getAttribute("data-layer-id");
  if (!label.classList.contains("deselected")) {
    label.classList.add("deselected");
    map.setLayoutProperty(layerId, "visibility", "none");
    return;
  }
  if (label.classList.contains("deselected")) {
    label.classList.remove("deselected");
    map.setLayoutProperty(layerId, "visibility", "visible");
    return;
  }
});
