// Change the cursor to a pointer when the mouse is over the clusters
map.on("mouseenter", "clusters", () => {
  map.getCanvas().style.cursor = "pointer";
});
map.on("mouseleave", "clusters", () => {
  map.getCanvas().style.cursor = "";
});
