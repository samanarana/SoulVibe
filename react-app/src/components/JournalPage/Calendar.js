import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Calendar.css';
import { fetchJournalsThunk } from '../../store/journal';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const Calendar = ({ onDateSelect }) => {
    const dispatch = useDispatch();
    const journals = useSelector(state => state.journal.journals);
    const [date, setDate] = useState(new Date());
    const [currYear, setCurrYear] = useState(date.getFullYear());
    const [currMonth, setCurrMonth] = useState(date.getMonth());
    const [selectedDate, setSelectedDate] = useState(null);
    const [calendarDays, setCalendarDays] = useState([]);

    // Calendar setup
    const months = ["January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December"];

    const handleDateClick = useCallback((dateKey, day) => {
        setSelectedDate(new Date(currYear, currMonth, day));
        onDateSelect(dateKey);
    }, [onDateSelect, currYear, currMonth]);

    useEffect(() => {
        dispatch(fetchJournalsThunk());
    }, [dispatch, currMonth, currYear]);


    const renderCalendar = useCallback(() => {
        const firstDayOfMonth = new Date(currYear, currMonth, 1).getDay();
        const lastDateOfMonth = new Date(currYear, currMonth + 1, 0).getDate();
        const lastDayOfMonth = new Date(currYear, currMonth, lastDateOfMonth).getDay();
        const lastDateOfLastMonth = new Date(currYear, currMonth, 0).getDate();

        let days = [];

        // Loop for days of previous month shown in the current month's calendar
        for (let i = firstDayOfMonth; i > 0; i--) {
            days.push(<li key={`prev-${i}`} className="inactive">{lastDateOfLastMonth - i + 1}</li>);
        }

        // Loop for days of current month
        for (let i = 1; i <= lastDateOfMonth; i++) {
            let dateKey = `${currYear}-${String(currMonth + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
            let journalEntryExists = journals[dateKey] ? true : false;

            let journalClass = journalEntryExists ? 'journal-entry' : '';
            let isToday = i === date.getDate() && currMonth === new Date().getMonth() && currYear === new Date().getFullYear() ? "active" : "";
            let isSelected = selectedDate && i === selectedDate.getDate() && currMonth === selectedDate.getMonth();
            let className = `${isToday} ${journalClass} ${isSelected ? 'selected' : ''}`;
            days.push(
                <li key={i} className={className} onClick={() => handleDateClick(dateKey, i)}>
                    <span>{i}</span> {/* Date Number */}
                    {journalEntryExists && <span className="dot-indicator"></span>}
                </li>
            );
        }

        // Loop for days of next month shown in the current month's calendar
        for (let i = 1; i <= 6 - lastDayOfMonth; i++) {
            days.push(<li key={`next-${i}`} className="inactive">{i}</li>);
        }

        setCalendarDays(days);
    }, [currMonth, currYear, date, journals, selectedDate, handleDateClick]);


    useEffect(() => {
        renderCalendar();
    }, [renderCalendar]);

    const changeMonth = (direction) => {
        let newMonth = direction === 'prev' ? currMonth - 1 : currMonth + 1;
        let newDate = new Date(currYear, newMonth);
        setDate(newDate);
        setCurrYear(newDate.getFullYear());
        setCurrMonth(newDate.getMonth());
    };

    return (
        <div className="calendar-container">

          <div className="wrapper">
            <header>
              <p className="current-date">{`${months[currMonth]} ${currYear}`}</p>
                <div className="icons">
                    <span id="prev" onClick={() => changeMonth('prev')}>
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </span>
                    <span id="next" onClick={() => changeMonth('next')}>
                        <FontAwesomeIcon icon={faChevronRight} />
                    </span>
                </div>
            </header>
            <div className="calendar">
              <ul className="weeks">
                <li>Sun</li>
                <li>Mon</li>
                <li>Tue</li>
                <li>Wed</li>
                <li>Thu</li>
                <li>Fri</li>
                <li>Sat</li>
              </ul>
              <ul className="days">
                {calendarDays}
              </ul>
            </div>
          </div>

        </div>
      );
};

export default Calendar;
