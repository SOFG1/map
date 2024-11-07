if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      map.easeTo({
        //center: [longitude, latitude],
        center: [-74.01006506279532, 40.72078039153243],
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
