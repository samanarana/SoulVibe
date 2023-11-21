import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createMeditationThunk, fetchMeditationsThunk } from '../../store/meditation';
import './MeditationPage.css';
import SleepSection from './SleepSection';
import StressSection from './StressSection';
import { VictoryPie, VictoryTheme, VictoryLegend } from 'victory';
import MeditationForm from './MeditationModal';
import { useModal } from './../../context/Modal';

// Color types for pie chart
const meditationTypeColors = {
  "Mindfulness": "red",
  "Guided Visualization": "orange",
  "Kundalini Yoga": "yellow",
  "Tai Chi": "green",
  "Nature Walk": "blue",
  "Mantra": "pink",
  "Chakra Meditation": "purple",
  "Writing": "cyan",
  "Psychedelics": "magenta",
  "Reflective Meditation": "lime"
};

function MeditationPage() {
  const dispatch = useDispatch();
  const meditations = useSelector(state => state.meditation.meditations);
  const { setModalContent, closeModal } = useModal();

  useEffect(() => {
    dispatch(fetchMeditationsThunk());
  }, [dispatch]);

  const handleSubmit = (meditationData) => {
    dispatch(createMeditationThunk(meditationData))
      .then(() => {
        dispatch(fetchMeditationsThunk());
        closeModal();
      });
  };

  const openModal = () => {
    setModalContent(<MeditationForm handleSubmit={handleSubmit} />);
  };

  const getMeditationDataForChart = () => {
    const meditationData = Object.keys(meditationTypeColors).reduce((acc, type) => {
      acc[type] = 0; // Initialize all types with 0 duration
      return acc;
    }, {});

    Object.values(meditations).forEach(meditation => {
      const type = meditation.meditation_type;
      meditationData[type] += parseInt(meditation.duration, 10);
    });

    return Object.keys(meditationData).map((key) => {
      return { x: key, y: meditationData[key], color: meditationTypeColors[key] };
    });
  };

  return (
    <div className="meditation-page-container">

      <SleepSection />

      <div className="meditation-section">
        <div className="meditation-form-container">
          <button onClick={openModal}>Add Meditation Session</button>
        </div>

        <div className="my-meditations-section">
          <p className="title-my-meditation">My Meditation Practices</p>
            <div className="meditation-chart">
              <VictoryPie
                data={getMeditationDataForChart()}
                theme={VictoryTheme.material}
                colorScale={getMeditationDataForChart().map(data => data.color)}
                labels={() => null}
                style={{
                  data: { stroke: "#c43a31", strokeWidth: 0.5 }
                }}
              />
              <div className="legend-container">
                <VictoryLegend
                  title="Meditation Types"
                  centerTitle
                  orientation="horizontal"
                  style={{
                    title: { fontSize: 25 },
                    labels: { fontSize: 16 },
                  }}
                  colorScale={getMeditationDataForChart().map(data => data.color)}
                  data={getMeditationDataForChart().map(point => ({
                    name: point.x,
                    symbol: { size: 8 }
                  }))}
                  itemsPerRow={2}
                />
              </div>
            </div>
        </div>
      </div>

      <StressSection />
    </div>
  );
}

export default MeditationPage;
