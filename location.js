if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      map.easeTo({
        center: [longitude, latitude],
        // center: mapPointsData.at(-1).points[0],
        // zoom: 18,
      });
    },
    (error) => {
      console.error("Error fetching location:", error.message);
    }
  );
} else {
  console.log("Geolocation is not supported by this browser.");
}
