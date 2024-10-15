function waitForLoad() {
  return new Promise((res) =>
    map.on("load", () => {
      res();
    })
  );
}

window.waitForLoad = waitForLoad;
