import React from 'react';

function QuestionPanel({ question, questionNumber, totalQuestions, selectedAnswer, onAnswerChange }) {
  if (!question) {
    return <div className="question-panel">Loading question...</div>;
  }

  const handleOptionClick = (option) => {
    if (question.type === 'MCQ') {
      onAnswerChange(option);
    }
  };

  const handleNumericalChange = (e) => {
    onAnswerChange(e.target.value);
  };

  return (
    <div className="question-panel">
      {/* Question Header */}
      <div className="question-header">
        <div className="question-meta">
          <span className="question-number">Question {questionNumber}</span>
          <span className="question-type-badge">{question.type}</span>
          <span className="section-badge">{question.section}</span>
        </div>
        <div className="question-marks">
          <span>Marks: <strong>+4</strong> / <strong>-1</strong></span>
        </div>
      </div>

      {/* Question Text */}
      <div className="question-text">
        <p dangerouslySetInnerHTML={{ __html: question.question }}></p>
      </div>

      {/* Question Image (if any) */}
      {question.image && (
        <div className="question-image">
          <img src={question.image} alt="Question diagram" />
        </div>
      )}

      {/* Options for MCQ */}
      {question.type === 'MCQ' && (
        <div className="options-container">
          {question.options.map((option, index) => (
            <div
              key={index}
              className={`option ${selectedAnswer === option ? 'selected' : ''}`}
              onClick={() => handleOptionClick(option)}
            >
              <input
                type="radio"
                name="answer"
                checked={selectedAnswer === option}
                onChange={() => handleOptionClick(option)}
              />
              <label>
                <span className="option-label">{String.fromCharCode(65 + index)}.</span>
                <span className="option-text" dangerouslySetInnerHTML={{ __html: option }}></span>
              </label>
            </div>
          ))}
        </div>
      )}

      {/* Input for Numerical */}
      {question.type === 'Numerical' && (
        <div className="numerical-answer">
          <label>Enter your answer:</label>
          <input
            type="number"
            step="0.01"
            value={selectedAnswer || ''}
            onChange={handleNumericalChange}
            placeholder="Enter numerical value"
            className="numerical-input"
          />
          <p className="numerical-hint">
            ℹ️ Enter the answer as a numerical value (up to 2 decimal places)
          </p>
        </div>
      )}

      {/* Question Info */}
      <div className="question-info">
        <p>
          <strong>Section:</strong> {question.section} | 
          <strong> Type:</strong> {question.type} | 
          <strong> Difficulty:</strong> {question.difficulty}
        </p>
      </div>
    </div>
  );
}

export default QuestionPanel;
