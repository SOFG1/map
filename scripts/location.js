if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      map.easeTo({
        center: [longitude, latitude],
        // center: newPoints.at(-6).coordinates,
        // zoom: 11,
      });
    },
    (error) => {
      console.error("Error fetching location:", error.message);
    }
  );
} else {
  console.log("Geolocation is not supported by this browser.");
}
