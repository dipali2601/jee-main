import React, { useEffect } from 'react';

function Timer({ timeRemaining, setTimeRemaining, onTimeEnd }) {
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          onTimeEnd();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [setTimeRemaining, onTimeEnd]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const getTimerClass = () => {
    if (timeRemaining < 300) return 'timer-critical'; // Last 5 minutes
    if (timeRemaining < 900) return 'timer-warning'; // Last 15 minutes
    return 'timer-normal';
  };

  return (
    <div className={`exam-timer ${getTimerClass()}`}>
      <div className="timer-label">Time Remaining</div>
      <div className="timer-display">
        ⏱️ {formatTime(timeRemaining)}
      </div>
      {timeRemaining < 300 && (
        <div className="timer-alert">
          ⚠️ Hurry! Only {Math.floor(timeRemaining / 60)} minutes left!
        </div>
      )}
    </div>
  );
}

export default Timer;
