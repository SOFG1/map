const options1 = mapPointsData.map((p) => p.location);
const options2 = newPoints.map((p) => p.location);

const config = {
  placeHolder: "Search for clubs",
  data: {
    src: [...options1, ...options2],
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
    hideKeyboard(event.target);

    const option1 = mapPointsData.find((p) => p.location === val);
    if (option1) {
      const coordinates = option1.points[0];
      openPopup1(option1, coordinates);
      map.flyTo({
        center: coordinates,
        zoom: 6,
      });
    }

    const option2 = newPoints.find((p) => p.location === val);
    if (option2) {
      const coordinates = option2.coordinates;
      openPopup2(option2, coordinates);
      map.flyTo({
        center: coordinates,
        zoom: 6,
      });
    }
  });

function hideKeyboard(element) {
  element.setAttribute("readonly", true);
  element.setAttribute("disabled", true);
  setTimeout(function () {
    element.blur(); //actually close the keyboard
    // Remove readonly attribute after keyboard is hidden.
    element.removeAttribute("readonly");
    element.removeAttribute("disabled");
  }, 100);
}
