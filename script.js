function useMyLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(pos => {
      Celestial.display({
        location: [pos.coords.longitude, pos.coords.latitude]
      });
    }, () => alert("Could not get location."));
  } else {
    alert("Geolocation not supported.");
  }
}

// Initialize celestial map
Celestial.display({
  width: 800,
  projection: "aitoff",
  datapath: "", // where star data is located, left empty if not loading extra files
  interactive: true,
  location: [0,0] // default until user clicks button
});
