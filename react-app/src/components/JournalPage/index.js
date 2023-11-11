import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './JournalPage.css';
import Calendar from './Calendar';

function JournalPage() {
  const [currentDate, setCurrentDate] = useState('');
  const [currentJournalEntry, setCurrentJournalEntry] = useState(null);
  const journals = useSelector(state => state.journal.journals);

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0]; // Format date as 'YYYY-MM-DD'
    setCurrentDate(formattedDate);
    setCurrentJournalEntry(journals[formattedDate]); // Set today's journal entry if it exists
  }, [journals]);

  const handleDateSelection = (selectedDate) => {
    setCurrentDate(selectedDate);
    const selectedJournalEntry = journals[selectedDate];
    setCurrentJournalEntry(selectedJournalEntry);
  };

  return (
    <div className="parent-container">
      <Calendar onDateSelect={handleDateSelection} />

      <div className="journal-button-container">
        <div className="journal-container">
          <div className="notebook-holes"></div>
          <div className="journal-title-container">
            <p className="journal-title">My Journal</p>
            <p className="journal-date">{currentDate}</p>
          </div>
          <div className="notebook">
            <div className="lines"></div>
            <textarea
              className="textbox"
              placeholder={currentJournalEntry ? '' : 'No entry for today. Tell me about your day...'}
              value={currentJournalEntry ? currentJournalEntry.content : ''}
            ></textarea>
          </div>
        </div>
        <button className="submit-journal-button">Submit Entry</button>
      </div>
    </div>
  );
}

export default JournalPage;
