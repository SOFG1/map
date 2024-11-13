const options = mapPointsData.map((p) => p.location);

const config = {
  placeHolder: "Search for clubs",
  data: {
    src: options,
  },
  resultItem: {
    highlight: true,
  },
  resultsList: {
    maxResults: 8,
  },
};

const autoCompleteJS = new autoComplete(config);

document
  .querySelector("#autoComplete")
  .addEventListener("selection", function (event) {
    // "event.detail" carries the autoComplete.js "feedback" object
    const val = event.detail.selection.value;
    event.target.value = val;
    const option = mapPointsData.find((p) => p.location === val);
    const coordinates = option.points[0];
    if (coordinates) {
      openPopup(option, coordinates);
      map.flyTo({
        center: coordinates,
        zoom: 6,
      });
    }
  });
