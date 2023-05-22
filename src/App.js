import React, { useEffect, useState } from 'react';
import axios from 'axios';
import md5 from 'md5';

function Series() {

  const [series, setSeries] = useState([])

  useEffect(() => {
    const fetchSeries = async () => {
      const publicKey = '35d6fbcb2413aab1756a879bb6f3bf8f';
      const privateKey = '267516c272f405cb810a1bfc666dc0bb6c306764';
      const timestamp = Date.now();
      const hash = md5(`${timestamp}${privateKey}${publicKey}`);

      try {
        const response = await axios.get(
          `https://gateway.marvel.com/v1/public/series?apikey=${publicKey}&ts=${timestamp}&hash=${hash}`
        );
        setSeries(response.data.data.results);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSeries();
  }, []);

  return (
    <div className="Series" style={seriesContainerStyle}>
      <h1 style={headerStyle}>Lista de Series de Marvel</h1>
      <div className="series-grid" style={seriesGridStyle}>
        {series.map((series) => (
          <div className="series-card" key={series.id} style={seriesCardStyle}>
            <img src={`${series.thumbnail.path}.${series.thumbnail.extension}`} alt={series.title} style={seriesImageStyle} />
            <p style={seriesTitleStyle}>{series.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const seriesContainerStyle = {
  background: 'linear-gradient(135deg, #990000, #ffcccc)',
  backgroundSize: 'cover',
  padding: '20px',
};

const headerStyle = {
  textAlign: 'center',
  color: 'white',
  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.6)',
};

const seriesGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: '20px',
  justifyContent: 'center',
};

const seriesCardStyle = {
  textAlign: 'center',
  background: 'white',
  padding: '10px',
  borderRadius: '5px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
};

const seriesImageStyle = {
  maxWidth: '100%',
  maxHeight: '200px',
  objectFit: 'cover',
};

const seriesTitleStyle = {
  fontWeight: 'bold',
};

export default Series;
