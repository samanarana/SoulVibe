import React from 'react';
import { useModal } from './../../context/Modal';
import StressForm from './StressForm';
import LineGraphStress from './LineGraphStress';

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

        <dib className="line-graph">
          <LineGraphStress />
        </dib>
    </div>
  );
}

export default StressSection;
