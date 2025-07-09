// Define global function so button can call it
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

// On page load, initialize default celestial map
window.addEventListener('load', function() {
  Celestial.display({
    width: 800,
    projection: "aitoff",
    datapath: "",        // keep empty unless using extra data
    interactive: true,
    location: [0, 0]     // default location
  });
});
