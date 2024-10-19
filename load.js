function waitForLoad() {
  return new Promise((res) =>
    map.on("load", async () => {
      map.loadImage("/pin1.png", (err, img) => {
        map.addImage("pin1", img);
        map.loadImage("/pin2.png", (err, img) => {
          map.addImage("pin2", img);
          res();
        });
      });
    })
  );
}

window.waitForLoad = waitForLoad;
