import React, { useState } from 'react';
import './StressInfo.css';

function StressInfo() {
  const [activeTab, setActiveTab] = useState('coverTab');

  // Function to change the active tab
  const changeTab = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="stress-info-container">

        <div className="stress-info">
            <div className="content">
                {activeTab === 'coverTab' && <p>Click on the tabs to learn more about stress! → </p>}
                {activeTab === 'tab1' && <p>Short-term stress (eustress) can enhance motivation and performance.</p>}
                {activeTab === 'tab2' && <p>Stress triggers the body's "fight-or-flight" response, releasing adrenaline and cortisol.</p>}
                {activeTab === 'tab3' && <p>Individuals perceive and react to stress differently; what's stressful for one person may not be for another.</p>}
                {activeTab === 'tab4' && <p>High stress levels can decrease work or academic productivity due to decreased focus and motivation.</p>}
                {activeTab === 'tab5' && <p>Experiencing and overcoming moderate levels of stress can build resilience, teaching individuals how to effectively cope with life's challenges and uncertainties.</p>}
                {activeTab === 'tab6' && <p>Stress can result in changes in behavior, such as overeating, under-eating, drug or alcohol misuse, and social withdrawal.</p>}
            </div>

            <div className="tabs">
                <div className={`tab ${activeTab === 'coverTab' ? 'active' : ''}`} onClick={() => changeTab('coverTab')}></div>
                <div className={`tab ${activeTab === 'tab1' ? 'active' : ''}`} onClick={() => changeTab('tab1')}></div>
                <div className={`tab ${activeTab === 'tab2' ? 'active' : ''}`} onClick={() => changeTab('tab2')}></div>
                <div className={`tab ${activeTab === 'tab3' ? 'active' : ''}`} onClick={() => changeTab('tab3')}></div>
                <div className={`tab ${activeTab === 'tab4' ? 'active' : ''}`} onClick={() => changeTab('tab4')}></div>
                <div className={`tab ${activeTab === 'tab5' ? 'active' : ''}`} onClick={() => changeTab('tab5')}></div>
                <div className={`tab ${activeTab === 'tab6' ? 'active' : ''}`} onClick={() => changeTab('tab6')}></div>
            </div>
        </div>

    </div>
  );
}

export default StressInfo;
