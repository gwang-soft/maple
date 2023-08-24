import React, { useRef, useState, useEffect, useCallback } from 'react';
import './ImageViewer.css';

const ImageViewer = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const imageRefs = useRef([]);
  const lastScrollTime = useRef(0);

  const handleScroll = useCallback(() => {
    const now = Date.now();
    if (now - lastScrollTime.current >= 300 && currentImageIndex < images.length - 1) {
      lastScrollTime.current = now;
      const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      if (scrollPercentage >= 80) {
        setCurrentImageIndex(prevIndex => prevIndex + 1);
      }
    }
  }, [currentImageIndex, images.length]);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const lazyImage = entry.target;
          lazyImage.src = lazyImage.dataset.src;
          observer.unobserve(entry.target);
        }
      });
    });

    imageRefs.current.forEach((ref, index) => {
      if (ref) {
        observer.observe(ref);
      }
    });

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return (
    <div className="image-viewer">
      {images.slice(0, currentImageIndex + 1).map((image, index) => (
        <img
          key={index}
          ref={el => (imageRefs.current[index] = el)}
          src='/images/loading_image.png'
          data-index={index}
          data-src={image}
          alt={`${index}`}
          className="lazy"
        />
      ))}
    </div>
  );
};

export default ImageViewer;