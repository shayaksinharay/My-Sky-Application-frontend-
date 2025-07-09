window.addEventListener('load', function() {

  async function fetchAndUpdateSky() {
    try {
      const res = await fetch('https://my-sky-application-backend-7.onrender.com/api/stars');
      const stars = await res.json();
      Celestial.display({
        datapath: "",
        interactive: true,
        location: [0,0],
        stars: stars
      });
    } catch (e) {
      console.error("Failed to load sky data:", e);
    }
  }

  fetchAndUpdateSky();

  if (navigator.geolocation) {
    document.querySelector('button').addEventListener('click', () => {
      navigator.geolocation.getCurrentPosition(pos => {
        Celestial.display({
          location: [pos.coords.longitude, pos.coords.latitude]
        });
      }, () => alert("Could not get location."));
    });
  }

});
