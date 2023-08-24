import React, { useState, useEffect } from 'react';
import './App.css';
import ImageViewer from './ImageViewer';
import VideoPlayer from './VideoPlayer';

const App = () => {
  const [currentContentIndex, setCurrentContentIndex] = useState(0);
  const [networkType, setNetworkType] = useState(null);

  const contentByNetwork = {
    'slow-2g': [
      '/images/slow2g/m_story_001.jpg',
      '/images/slow2g/m_story_002.jpg',
      '/images/slow2g/m_story_003.jpg',
      '/images/slow2g/m_story_004.jpg',
      '/images/slow2g/m_story_005.jpg',
      '/images/slow2g/m_story_006.jpg',
      '/videos/sample_video.mp4',
      '/images/slow2g/m_story_007.jpg',
      '/images/slow2g/m_story_008.jpg',
      '/images/slow2g/m_story_009.jpg',
      '/images/slow2g/m_story_010.jpg',
      '/images/slow2g/m_story_011.jpg',
      '/images/slow2g/m_story_012.jpg',
      '/videos/sample_video.mp4',
      '/images/slow2g/m_story_013.jpg'
    ],
    '2g': [
      '/images/2g/m_story_001.jpg',
      '/images/2g/m_story_002.jpg',
      '/images/2g/m_story_003.jpg',
      '/images/2g/m_story_004.jpg',
      '/images/2g/m_story_005.jpg',
      '/images/2g/m_story_006.jpg',
      '/videos/sample_video.mp4',
      '/images/2g/m_story_007.jpg',
      '/images/2g/m_story_008.jpg',
      '/images/2g/m_story_009.jpg',
      '/images/2g/m_story_010.jpg',
      '/images/2g/m_story_011.jpg',
      '/images/2g/m_story_012.jpg',
      '/videos/sample_video.mp4',
      '/images/2g/m_story_013.jpg'
    ],
    '3g': [
      '/images/3g/m_story_001.jpg',
      '/images/3g/m_story_002.jpg',
      '/images/3g/m_story_003.jpg',
      '/images/3g/m_story_004.jpg',
      '/images/3g/m_story_005.jpg',
      '/images/3g/m_story_006.jpg',
      '/videos/sample_video.mp4',
      '/images/3g/m_story_007.jpg',
      '/images/3g/m_story_008.jpg',
      '/images/3g/m_story_009.jpg',
      '/images/3g/m_story_010.jpg',
      '/images/3g/m_story_011.jpg',
      '/images/3g/m_story_012.jpg',
      '/videos/sample_video.mp4',
      '/images/3g/m_story_013.jpg'
    ],
    '4g': [
      '/images/4g/m_story_001.jpg',
      '/images/4g/m_story_002.jpg',
      '/images/4g/m_story_003.jpg',
      '/images/4g/m_story_004.jpg',
      '/images/4g/m_story_005.jpg',
      '/images/4g/m_story_006.jpg',
      '/videos/sample_video.mp4',
      '/images/4g/m_story_007.jpg',
      '/images/4g/m_story_008.jpg',
      '/images/4g/m_story_009.jpg',
      '/images/4g/m_story_010.jpg',
      '/images/4g/m_story_011.jpg',
      '/images/4g/m_story_012.jpg',
      '/videos/sample_video.mp4',
      '/images/4g/m_story_013.jpg'
    ]
  };

  const getCurrentContent = () => contentByNetwork[networkType] || contentByNetwork['3g']; // Fallback to 3g

  useEffect(() => {
    if (navigator.connection) {
      setNetworkType(navigator.connection.effectiveType);
      navigator.connection.addEventListener('change', () => {
        setNetworkType(navigator.connection.effectiveType);
      });
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      if (scrollPercentage >= 80) {
        setCurrentContentIndex(prevIndex => Math.min(prevIndex + 1, getCurrentContent().length - 1));
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [networkType]); // networkType 의존성 추가

  return (
    <div className="app">
      {getCurrentContent().slice(0, currentContentIndex + 1).map((item, index) => {
        if (item.endsWith('.mp4')) {
          return <VideoPlayer key={index} videoSrc={item} playThreshold={100} />;
        } else {
          return <ImageViewer key={index} images={[item]} />;
        }
      })}
    </div>
  );
};

export default App;