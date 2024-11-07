function waitForLoad() {
  return new Promise((res) => map.on("load", res));
}

window.waitForLoad = waitForLoad;

await waitForLoad();

//Load pin images
map.loadImage(
  "https://raw.githubusercontent.com/sofg1/map/main/assets/images/pin1.png",
  (err, img) => {
    map.addImage("pin1", img);
  }
);

map.loadImage(
  "https://raw.githubusercontent.com/sofg1/map/main/assets/images/pin2.png",
  (err, img) => {
    map.addImage("pin2", img);
  }
);

map.loadImage(
  "https://raw.githubusercontent.com/sofg1/map/main/assets/images/pin3.png",
  (err, img) => {
    map.addImage("pin3", img);
  }
);

map.loadImage(
  "https://raw.githubusercontent.com/sofg1/map/main/assets/images/pin4.png",
  (err, img) => {
    map.addImage("pin4", img);
  }
);
