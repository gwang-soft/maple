import React, { useRef, useState, useEffect } from 'react';
import './VideoPlayer.css';

const VideoPlayer = ({ videoSrc }) => {
  const videoRef = useRef(null);
  const observerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const handlePlay = () => {
    videoRef.current.play();
    setIsPlaying(true);
  };

  const handlePause = () => {
    videoRef.current.pause();
    setIsPlaying(false);
  };

  const handleUnmute = () => {
    videoRef.current.muted = false;
    setIsMuted(false);
  };

  const handleFullscreen = () => {
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    } else if (videoRef.current.webkitRequestFullscreen) {
      videoRef.current.webkitRequestFullscreen();
    } else if (videoRef.current.mozRequestFullScreen) {
      videoRef.current.mozRequestFullScreen();
    }
  };

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          handlePlay();
        } else {
          handlePause();
        }
      },
      { threshold: 0.5 }
    );

    observerRef.current.observe(videoRef.current);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return (
    <div className="video-player">
      <div className={`play-icon ${isPlaying ? 'hidden' : ''}`} onClick={handlePlay}>
        <i className="fas fa-play"></i>
      </div>
      <video
        ref={videoRef}
        src={videoSrc}
        playsInline
        loop
        autoPlay
        muted={isMuted}
        onClick={isPlaying ? handlePause : handlePlay}
      />
      {isMuted && (
        <div className="unmute-button" onClick={handleUnmute}>
          <i className="fas fa-volume-up"></i> 음소거 해제
        </div>
      )}
      <button className="fullscreen-button" onClick={handleFullscreen}>
        <i className="fas fa-expand-arrows-alt"></i>
      </button>
    </div>
  );
};

export default VideoPlayer;