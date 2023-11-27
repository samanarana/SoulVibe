import React from 'react';
import { useModal } from './../../context/Modal';
import StressForm from './StressForm';
import './StressSection.css';
import BatteryStress from './BatteryStress';

function StressSection() {
  const { setModalContent, closeModal } = useModal();

  const openModal = () => {
    setModalContent(<StressForm closeModal={closeModal} />);
  };

  return (
    <div className="stress-section-page">
        <div className="stress-section-page-form">
            <button onClick={openModal}>Add Stress Data</button>
        </div>

        <div>
          <BatteryStress />
        </div>
    </div>
  );
}

export default StressSection;
