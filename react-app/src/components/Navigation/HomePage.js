import React from 'react';
import './HomePage.css';
import SlideShow from './Slideshow';

import EstherImage from './images/Esther.jpg';
import FoodImage from './images/Food.jpg';
import SprintImage from './images/Sprint.jpg';

function HomePage() {
  return (
        <div className="homepage">

        <section className="welcome-section">
            <p className="welcome">Get In Tune with Your Well-Being</p>
            <p className="message2">Track Your Wellness Journey All In One Place!</p>
        </section>

        <section className="quote-slider-section">
            <SlideShow />
        </section>

        <div className="philosophy-page-container">
            <section className="philosophy-section">

                <div className="image-container">
                {/* Left Image */}
                <div className="left-image">
                <img src={SprintImage} alt="Sprint" />
                </div>

                {/* Middle Image */}
                <div className="middle-image">
                <img src={EstherImage} alt="Esther" />
                </div>

                {/* Right Image */}
                <div className="right-image">
                <img src={FoodImage} alt="Food" />
                </div>
                </div>

                <div className="text-block">
                <p className="little">Our Philosophy</p>
                <p className="big">Knowledge is Power</p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ac efficitur est.
                    Fusce vulputate, nisl in luctus auctor, sapien odio euismod dolor, non fringilla
                    ipsum est in velit.
                </p>
                <p>
                    Vestibulum non erat vel purus condimentum vestibulum. Curabitur euismod mi non
                    massa porttitor, at venenatis nunc tempor.
                </p>
                </div>
            </section>
        </div>

        {/* Add more sections as needed */}

        </div>
    );
}

export default HomePage;
