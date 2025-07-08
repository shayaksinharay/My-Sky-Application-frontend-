const backendUrl = "https://my-sky-application-backend-7.onrender.com";

async function fetchAndUpdateSky() {
  try {
    const [starsRes, constRes] = await Promise.all([
      fetch(`${backendUrl}/api/stars`),
      fetch(`${backendUrl}/api/constellations`)
    ]);
    const stars = await starsRes.json();
    const constellations = await constRes.json();

    Celestial.display({
      width: 800,
      projection: "aitoff",
      interactive: true,
      datapath: "",
      location: [0,0],  // default until location fetched
      stars: {
        data: stars,
        names: true
      },
      constellations: {
        lines: true,
        data: constellations
      }
    });
  } catch (e) {
    console.error("Failed to load sky data:", e);
  }
}

function useMyLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(pos => {
      Celestial.location([pos.coords.longitude, pos.coords.latitude]);
    }, () => alert("Could not get location."));
  } else {
    alert("Geolocation not supported.");
  }
}

fetchAndUpdateSky();
