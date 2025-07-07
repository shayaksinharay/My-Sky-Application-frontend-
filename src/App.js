import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [stars, setStars] = useState([]);
  const [constellations, setConstellations] = useState([]);
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      axios.get('/api/stars').then(res => setStars(res.data));
      axios.get('/api/constellations').then(res => setConstellations(res.data));
      axios.get('/api/planets').then(res => setPlanets(res.data));
    };
    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Sky Viewer</h1>
      <canvas id="skyCanvas" width="800" height="600" style={{ border:'1px solid black' }}></canvas>
      <div>
        <h3>Stars:</h3>
        <ul>{stars.map(s => <li key={s.name}>{s.name}</li>)}</ul>
        <h3>Planets:</h3>
        <ul>{planets.map(p => <li key={p.name}>{p.name}</li>)}</ul>
      </div>
    </div>
  );
}

export default App;
