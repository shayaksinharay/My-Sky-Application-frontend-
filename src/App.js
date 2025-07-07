import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [stars, setStars] = useState([]);
  const [constellations, setConstellations] = useState([]);
  const [planets, setPlanets] = useState([]);

  // Use the backend URL from environment variable
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const fetchData = () => {
      axios.get(`${backendUrl}/api/stars`)
        .then(response => setStars(response.data))
        .catch(error => console.error('Error fetching stars:', error));

      axios.get(`${backendUrl}/api/constellations`)
        .then(response => setConstellations(response.data))
        .catch(error => console.error('Error fetching constellations:', error));

      axios.get(`${backendUrl}/api/planets`)
        .then(response => setPlanets(response.data))
        .catch(error => console.error('Error fetching planets:', error));
    };

    fetchData();
    const intervalId = setInterval(fetchData, 10000); // update every 10s

    return () => clearInterval(intervalId);
  }, [backendUrl]);

  return (
    <div>
      <h1>Sky Viewer</h1>
      <h2>Stars</h2>
      <ul>{stars.map((star, idx) => <li key={idx}>{star.name}</li>)}</ul>
      <h2>Constellations</h2>
      <ul>{constellations.map((c, idx) => <li key={idx}>{c.star1} → {c.star2}</li>)}</ul>
      <h2>Planets & Moon</h2>
      <ul>{planets.map((p, idx) => <li key={idx}>{p.name}</li>)}</ul>
      <footer>Developed by ~ SHAYAK SINHA RAY</footer>
    </div>
  );
}

export default App;
