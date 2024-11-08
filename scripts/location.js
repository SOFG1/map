if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      map.easeTo({
        //center: [longitude, latitude],
        center: [-112.65748364850434, 53.52671732985374],
        zoom: 9,
      });
    },
    (error) => {
      console.error("Error fetching location:", error.message);
    }
  );
} else {
  console.log("Geolocation is not supported by this browser.");
}
