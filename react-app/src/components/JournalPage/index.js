import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './JournalPage.css';
import Calendar from './Calendar';
import { fetchJournalsThunk, createJournalThunk } from '../../store/journal';

function JournalPage() {
  const [currentDate, setCurrentDate] = useState('');
  const [journalContent, setJournalContent] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const journals = useSelector(state => state.journal.journals);
  const dispatch = useDispatch();

  const emojis = ["😀", "😢", "😨", "😌",  "😍", "😴", "😎", "🤢", "😞", "😡"];

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0]; // Format date as 'YYYY-MM-DD'
    setCurrentDate(formattedDate); // Set the current date as today

    const currentEntry = journals[formattedDate];
    if (currentEntry) {
      setJournalContent(currentEntry.content);
      setSelectedEmoji(currentEntry.mood_emoji);
    } else {
      setJournalContent('');
      setSelectedEmoji(null);
    }
  }, [journals]);

  const handleDateSelection = (selectedDate) => {
    setCurrentDate(selectedDate);
    const selectedJournalEntry = journals[selectedDate];

    if (selectedJournalEntry) {
      setJournalContent(selectedJournalEntry.content);
      setSelectedEmoji(selectedJournalEntry.mood_emoji);
    } else {
      setJournalContent('');
      setSelectedEmoji(null);
    }
  }

  const handleEmojiSelection = (emoji) => {
    setSelectedEmoji(emoji);
  };

  const handleContentChange = (e) => {
    setJournalContent(e.target.value);
  };

  const handleSubmit = async () => {
    setSubmitAttempted(true);

    if (journalContent.length < 30) {
      setErrorMessage('Content is too short. It should be at least 30 characters.');
      return;
    } else if (journalContent.length > 350) {
      setErrorMessage('Content is too long. It should not exceed 350 characters.');
      return;
    } else if (!selectedEmoji) {
      setErrorMessage('Please select an emoji.');
      return;
    } else {
      setErrorMessage('');
    }

    const journalData = {
      content: journalContent,
      mood_emoji: selectedEmoji,
      date: currentDate
    };
    const result = await dispatch(createJournalThunk(journalData));

    if (result === 'success') {
      await dispatch(fetchJournalsThunk());

      setJournalContent('');
      setSelectedEmoji(null);
      setErrorMessage('');
      setSubmitAttempted(false);
    } else {
      setErrorMessage('Failed to create journal entry. Please try again.');
    }
  };


  return (
    <div className="parent-container">
      <Calendar onDateSelect={handleDateSelection} />

      <div className="journal-emoji-button-container">
          <div className="journal-emoji-container">
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
                  placeholder='No entry for today. Tell me about your day...'
                  value={journalContent}
                  onChange={handleContentChange}
                ></textarea>
              </div>
            </div>

            <div className="emoji-selector">
              {emojis.map(emoji => (
                <button
                  key={emoji}
                  onClick={() => handleEmojiSelection(emoji)}
                  className={selectedEmoji === emoji ? 'selected' : ''}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          {submitAttempted && errorMessage && <div className="error-message">{errorMessage}</div>}

          <button
            className="submit-journal-button"
            onClick={handleSubmit}
            disabled={journalContent.length < 30 || journalContent.length > 350 || !selectedEmoji}
          >
            Submit Entry
          </button>

      </div>
    </div>
  );

}

export default JournalPage;
