import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './HomePage.css';

import SlideShow from './Slideshow';
import LoginFormModal from '../LoginFormModal/index';
import EstherImage from './images/Esther.jpg';
import FoodImage from './images/Food.jpg';
import SprintImage from './images/Sprint.jpg';

function HomePage() {
    const user = useSelector(state => state.session.user);
    const [isLoginFormOpen, setIsLoginFormOpen] = useState(false);

    // open the login modal
    const openLoginForm = () => {
        setIsLoginFormOpen(true);
    };

    // close the login modal
    const closeLoginForm = () => {
        setIsLoginFormOpen(false);
    };

  return (
        <div className="homepage">

        <section className="welcome-section">
            <p className="welcome">Get In Tune with Your Well-Being</p>
            <p className="message2">Track Your Wellness Journey All In One Place!</p>
            <div className="stars-container">
                {'★★★★★'}
            </div>
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
                <p className="texts">
                SoulVibe invites you on an enlightening journey towards holistic well-being, where the tracking of your
                exercise and nutrition intertwines with the profound practice of journaling and meditation.

                </p>
                <p className="texts">
                SoulVibe isn't just a tool; it's a companion in your quest for balance, offering guidance and insight as
                you walk the path of self-improvement and inner peace. Through this integrated approach, you’ll find that
                achieving your health goals is about cultivating a vibrant spirit as much as it is about physical wellness.
                </p>
                </div>
            </section>
        </div>

        <section className="footer-section">
            <p className="footer-title">SoulVibe</p>
            <p className="message3">Find your healthy, and your happy.</p>
        </section>

        </div>
    );
}

export default HomePage;
