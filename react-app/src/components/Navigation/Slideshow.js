import React, { useState, useEffect } from 'react';
import './Slideshow.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb } from '@fortawesome/free-regular-svg-icons';

const quotes = [
  "Your limitation—it's only your imagination.",
  "Push yourself, because no one else is going to do it for you.",
  "Sometimes later becomes never. Do it now.",
  "The best way to predict the future is to invent it.",
  "Success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful.",
  "The only limit to our realization of tomorrow will be our doubts of today.",
  "Action is the foundational key to all success.",
  "Courage is resistance to fear, mastery of fear—not absence of fear.",
  "I am always doing that which I cannot do, in order that I may learn how to do it.",
];

function SlideShow() {
  const [currentQuote, setCurrentQuote] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentQuote((prevCurrent) => (prevCurrent + 1) % quotes.length);
    }, 5000); // changes quote every 5 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="quote-slider">

        <FontAwesomeIcon className="light-bulb" icon={faLightbulb} style={{ color: "#181c24", margin: '0 10px' }} />

        {quotes.map((quote, index) => (
            <div
            key={index}
            className={`slide ${index === currentQuote ? 'active' : ''}`}
            >
            <p className="quote">"{quote}"</p>
            </div>
        ))}
    </div>
  );
};

export default SlideShow;
