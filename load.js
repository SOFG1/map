function waitForLoad() {
  return new Promise((res) =>
    map.on("load", async () => {
      map.loadImage(
        "https://raw.githubusercontent.com/sofg1/map/main/images/pin1.png",
        (err, img) => {
          map.addImage("pin1", img);
          map.loadImage(
            "https://raw.githubusercontent.com/sofg1/map/main/images/pin1.png",
            (err, img) => {
              map.addImage("pin2", img);
              res();
            }
          );
        }
      );
    })
  );
}

window.waitForLoad = waitForLoad;
