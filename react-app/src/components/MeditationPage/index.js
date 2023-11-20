import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createMeditationThunk, fetchMeditationsThunk } from '../../store/meditation';
import './MeditationPage.css';
import SleepSection from './SleepSection';
import StressSection from './StressSection';
import { VictoryPie, VictoryTheme, VictoryLegend } from 'victory';

function MeditationPage() {
  const [date, setDate] = useState('');
  const [duration, setDuration] = useState('');
  const [meditationType, setMeditationType] = useState('');
  const dispatch = useDispatch();
  const meditations = useSelector(state => state.meditation.meditations);

  useEffect(() => {
    dispatch(fetchMeditationsThunk());
  }, [dispatch]);

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMeditation = { date, duration, meditation_type: meditationType };
    dispatch(createMeditationThunk(newMeditation));
    setDate('');
    setDuration('');
    setMeditationType('');
  };

  const sortedMeditations = Object.values(meditations).sort((a, b) => new Date(b.date) - new Date(a.date));

  const getMeditationDataForChart = () => {
    const meditationData = {};

    sortedMeditations.forEach(meditation => {
      if (meditationData[meditation.meditation_type]) {
        meditationData[meditation.meditation_type] += parseInt(meditation.duration, 10);
      } else {
        meditationData[meditation.meditation_type] = parseInt(meditation.duration, 10);
      }
    });

    return Object.keys(meditationData).map((key) => {
      return { x: key, y: meditationData[key] };
    });
  };

  const colorScale = [
    "red", "orange", "yellow", "green", "blue",
    "pink", "purple", "cyan", "magenta", "lime"
  ];

  return (
    <div className="meditation-page-container">
      <SleepSection />

      <div className="meditation-section">
        <div className="meditation-form-section">
          <div className="form-meditations">
            <p className="title-meditation">What was today's meditation like?</p>
            <form onSubmit={handleSubmit}>
              <div>
                <label>Date:</label>
                <input type="date" value={date} onChange={handleDateChange} />
              </div>
              <div>
                <label>Duration:</label>
                <input type="number" value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="# Minutes"/>
              </div>
              <div>
                <label>Type:</label>
                <input type="text" value={meditationType} onChange={(e) => setMeditationType(e.target.value)} placeholder="Type of Meditation"/>
              </div>
              <div className="form-button-container">
                <button type="submit">ADD SESSION</button>
              </div>
            </form>
          </div>
        </div>

        <div className="my-meditations-section">
          <p className="title-my-meditation">My Meditation Practices</p>
            <div className="meditation-chart">
              <VictoryPie
                data={getMeditationDataForChart()}
                theme={VictoryTheme.material}
                colorScale={colorScale}
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
                  colorScale={colorScale}
                  data={getMeditationDataForChart().map(point => ({
                    name: point.x,
                    symbol: { size: 8 }
                  }))}
                  itemsPerRow={3}
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
