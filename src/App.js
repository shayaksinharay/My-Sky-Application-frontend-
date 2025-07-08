import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [stars, setStars] = useState([]);
  const [constellations, setConstellations] = useState([]);
  const [planets, setPlanets] = useState([]);

  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const fetchData = () => {
      axios.get(`${backendUrl}/api/stars`)
        .then(res => setStars(res.data))
        .catch(err => console.error('Error fetching stars:', err));

      axios.get(`${backendUrl}/api/constellations`)
        .then(res => setConstellations(res.data))
        .catch(err => console.error('Error fetching constellations:', err));

      axios.get(`${backendUrl}/api/planets`)
        .then(res => setPlanets(res.data))
        .catch(err => console.error('Error fetching planets:', err));
    };

    fetchData(); // fetch immediately on load
    const intervalId = setInterval(fetchData, 10000); // update every 10s

    return () => clearInterval(intervalId);
  }, [backendUrl]);

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Sky Viewer</h1>
      <canvas id="skyCanvas" width="800" height="600" style={{ border:'1px solid black' }}></canvas>
      
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
