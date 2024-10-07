import React from 'react';
import imgsrc from '../assets/THE ceo.png';
import { Link, useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/Posts');
  };

  return (
    <div className="home-container">
      <nav className="nav-bar">
        <button className="nav-button" onClick={handleClick}>Posts</button>
        <Link to="/Alumnisection" className="nav-button">Connect Alumni</Link>
        <Link to="/Vision" className="nav-button">Vision</Link>
      </nav>
      <img src={imgsrc} alt="CEO" className="home-image" />
    </div>
  );
}

export default Home;
