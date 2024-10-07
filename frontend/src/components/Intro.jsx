import React, { useState, useEffect, useRef } from 'react';
import videosrc from '../assets/introvideo.mp4';
import './Intro.css';
import { useNavigate } from 'react-router-dom';

function Intro() {
    const [showText, setShowText] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false); // State to manage play status
    const videoRef = useRef(null); // Reference to the video element
    const navigate = useNavigate();

    useEffect(() => {
        let timer;
        if (isPlaying) {
            timer = setTimeout(() => {
                setShowText(true);
                navigate('/Home');
            }, 22500); // 22.5 seconds
        }
        return () => clearTimeout(timer);
    }, [isPlaying, navigate]);

    const handlePlay = () => {
        if (videoRef.current) {
            videoRef.current.play(); // Play video when the button is clicked
            setIsPlaying(true);
        }
    };

    return (
        <div id="container">
            <div id="videoid">
                <video ref={videoRef} controls={false}>
                    <source src={videosrc} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                {!isPlaying && (
                    <button className="play-button" onClick={handlePlay}>
                        Play Video
                    </button>
                )}
            </div>

            {showText && <h1 className="intro-text">This is text</h1>}
        </div>
    );
}

export default Intro;
