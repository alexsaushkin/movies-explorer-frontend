import {useEffect, useState} from 'react';

export default function Resize() {
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize(window.innerWidth);
    }

    const timer = setTimeout(() => {
      handleWindowResize();
    }, 1000);

    window.addEventListener('resize', handleWindowResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleWindowResize);
    };

  }, []);

  return windowSize;
}
