import React from 'react';

function QuestionPalette({ 
  questions, 
  currentQuestion, 
  currentSection,
  sections,
  onQuestionClick, 
  onSectionChange,
  getQuestionStatus,
  statusCounts 
}) {
  
  const getStatusClass = (status) => {
    const classes = {
      'answered': 'status-answered',
      'not-answered': 'status-not-answered',
      'marked': 'status-marked',
      'answered-marked': 'status-answered-marked',
      'not-visited': 'status-not-visited'
    };
    return classes[status] || 'status-not-visited';
  };

  const getQuestionsBySection = (section) => {
    return questions
      .map((q, index) => ({ ...q, index }))
      .filter(q => q.section === section);
  };

  return (
    <div className="question-palette">
      {/* Section Selector */}
      <div className="section-selector">
        <h3>Sections</h3>
        <div className="section-tabs">
          {sections.map(section => (
            <button
              key={section}
              className={`section-tab ${currentSection === section ? 'active' : ''}`}
              onClick={() => onSectionChange(section)}
            >
              {section}
            </button>
          ))}
        </div>
      </div>

      {/* Status Summary */}
      <div className="status-summary">
        <h4>Question Status</h4>
        <div className="status-items">
          <div className="status-item">
            <span className="status-indicator status-answered"></span>
            <span className="status-label">Answered</span>
            <span className="status-count">{statusCounts.answered}</span>
          </div>
          <div className="status-item">
            <span className="status-indicator status-not-answered"></span>
            <span className="status-label">Not Answered</span>
            <span className="status-count">{statusCounts.notAnswered}</span>
          </div>
          <div className="status-item">
            <span className="status-indicator status-marked"></span>
            <span className="status-label">Marked</span>
            <span className="status-count">{statusCounts.marked}</span>
          </div>
          <div className="status-item">
            <span className="status-indicator status-not-visited"></span>
            <span className="status-label">Not Visited</span>
            <span className="status-count">{statusCounts.notVisited}</span>
          </div>
        </div>
      </div>

      {/* Question Grid */}
      <div className="question-grid-container">
        <h4>{currentSection} Questions</h4>
        <div className="question-grid">
          {getQuestionsBySection(currentSection).map((q) => {
            const status = getQuestionStatus(q.index);
            const isCurrent = q.index === currentQuestion;
            
            return (
              <button
                key={q.index}
                className={`question-number-btn ${getStatusClass(status)} ${isCurrent ? 'current' : ''}`}
                onClick={() => onQuestionClick(q.index)}
                title={`Question ${q.index + 1} - ${status.replace('-', ' ')}`}
              >
                {q.index + 1}
              </button>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="palette-legend">
        <h4>Legend</h4>
        <div className="legend-items">
          <div className="legend-item">
            <span className="legend-box status-not-visited"></span>
            <span>Not Visited</span>
          </div>
          <div className="legend-item">
            <span className="legend-box status-not-answered"></span>
            <span>Not Answered</span>
          </div>
          <div className="legend-item">
            <span className="legend-box status-answered"></span>
            <span>Answered</span>
          </div>
          <div className="legend-item">
            <span className="legend-box status-marked"></span>
            <span>Marked</span>
          </div>
          <div className="legend-item">
            <span className="legend-box status-answered-marked"></span>
            <span>Answered & Marked</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuestionPalette;
