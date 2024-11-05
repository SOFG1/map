if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

      map.jumpTo({
        center: [longitude, latitude],
      });
    },
    (error) => {
      console.error("Error fetching location:", error.message);
    }
  );
} else {
  console.log("Geolocation is not supported by this browser.");
}
