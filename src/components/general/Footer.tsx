import { useState } from 'react';

const Footer = () => {
  const [clicks, setClicks] = useState(0);
  const [showHeart, setShowHeart] = useState(true);

  const handleHeartClick = () => {
    const newClicks = clicks + 1;
    setClicks(newClicks);
    
    if (newClicks === 10) {
      const heart = document.getElementById('heart');
      if (heart) {
        heart.style.transition = 'transform 1s ease-out';
        heart.style.transform = 'scale(0)';
        setTimeout(() => setShowHeart(false), 1000);
      }
    }
  };

  return (
    <footer className=" w-full py-4 text-center">
      <p className="text-gray-600 select-none">
        Desarrollado por Agustin{' '}
        {showHeart && (
          <span
            id="heart"
            className="cursor-pointer inline-block transition-transform"
            onClick={handleHeartClick}
          >
            ❤️
          </span>
        )}
      </p>
    </footer>
  );
};

export default Footer;
