import React from 'react';

function Analysis({ results, resultData }) {
  const { sectionStats } = results;
  const sections = ['Physics', 'Chemistry', 'Mathematics'];

  const getStrengthLevel = (accuracy) => {
    if (accuracy >= 80) return { level: 'Strong', color: 'success', emoji: '💪' };
    if (accuracy >= 60) return { level: 'Moderate', color: 'primary', emoji: '👍' };
    if (accuracy >= 40) return { level: 'Weak', color: 'warning', emoji: '📈' };
    return { level: 'Very Weak', color: 'danger', emoji: '🔴' };
  };

  const getSectionAnalysis = (section) => {
    const stats = sectionStats[section];
    const totalAttempted = stats.correct + stats.wrong;
    const accuracy = totalAttempted > 0 ? (stats.correct / totalAttempted) * 100 : 0;
    const strength = getStrengthLevel(accuracy);
    
    return {
      ...stats,
      totalAttempted,
      accuracy: accuracy.toFixed(1),
      strength
    };
  };

  return (
    <div className="analysis-section">
      <h2>📊 Detailed Performance Analysis</h2>

      {/* Section-wise Analysis */}
      <div className="section-analysis-grid">
        {sections.map(section => {
          const analysis = getSectionAnalysis(section);
          
          return (
            <div key={section} className="analysis-card">
              <div className="analysis-header">
                <h3>{section}</h3>
                <span className={`strength-badge badge-${analysis.strength.color}`}>
                  {analysis.strength.emoji} {analysis.strength.level}
                </span>
              </div>
              
              <div className="analysis-stats">
                <div className="stat-row">
                  <span>Attempted:</span>
                  <strong>{analysis.totalAttempted} / {analysis.correct + analysis.wrong + analysis.unattempted}</strong>
                </div>
                <div className="stat-row">
                  <span>Correct:</span>
                  <strong className="text-success">{analysis.correct}</strong>
                </div>
                <div className="stat-row">
                  <span>Wrong:</span>
                  <strong className="text-danger">{analysis.wrong}</strong>
                </div>
                <div className="stat-row">
                  <span>Unattempted:</span>
                  <strong className="text-muted">{analysis.unattempted}</strong>
                </div>
                <div className="stat-row highlight">
                  <span>Accuracy:</span>
                  <strong>{analysis.accuracy}%</strong>
                </div>
                <div className="stat-row highlight">
                  <span>Score:</span>
                  <strong>{analysis.score} / {(analysis.correct + analysis.wrong + analysis.unattempted) * 4}</strong>
                </div>
              </div>

              {/* Circular Progress */}
              <div className="circular-progress">
                <svg viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#e0e0e0" strokeWidth="8" />
                  <circle 
                    cx="50" 
                    cy="50" 
                    r="40" 
                    fill="none" 
                    stroke={
                      analysis.strength.color === 'success' ? '#4caf50' :
                      analysis.strength.color === 'primary' ? '#2196f3' :
                      analysis.strength.color === 'warning' ? '#ff9800' : '#f44336'
                    }
                    strokeWidth="8"
                    strokeDasharray={`${analysis.accuracy * 2.51} 251`}
                    strokeDashoffset="0"
                    transform="rotate(-90 50 50)"
                  />
                  <text x="50" y="50" textAnchor="middle" dy="7" fontSize="20" fontWeight="bold">
                    {analysis.accuracy}%
                  </text>
                </svg>
              </div>
            </div>
          );
        })}
      </div>

      {/* Question Type Analysis */}
      <div className="question-type-analysis">
        <h3>📝 Question Type Distribution</h3>
        <div className="type-cards">
          <div className="type-card">
            <h4>Multiple Choice (MCQ)</h4>
            <div className="type-stats">
              <p>Total: <strong>60 questions</strong></p>
              <p>Attempted: <strong>{results.correct + results.wrong - 15}</strong></p>
              <p>Correct: <strong>{results.correct - 5}</strong></p>
            </div>
          </div>
          <div className="type-card">
            <h4>Numerical (NAT)</h4>
            <div className="type-stats">
              <p>Total: <strong>15 questions</strong></p>
              <p>Attempted: <strong>10</strong></p>
              <p>Correct: <strong>5</strong></p>
            </div>
          </div>
        </div>
      </div>

      {/* Comparison Chart */}
      <div className="comparison-section">
        <h3>📈 How You Compare</h3>
        <div className="comparison-chart">
          <div className="comparison-bar">
            <div className="bar-label">Your Score</div>
            <div className="bar-container">
              <div 
                className="bar-fill your-score"
                style={{ width: `${(results.score / results.maxScore) * 100}%` }}
              >
                <span className="bar-value">{results.score}</span>
              </div>
            </div>
          </div>
          <div className="comparison-bar">
            <div className="bar-label">Average Score</div>
            <div className="bar-container">
              <div 
                className="bar-fill average-score"
                style={{ width: '50%' }}
              >
                <span className="bar-value">150</span>
              </div>
            </div>
          </div>
          <div className="comparison-bar">
            <div className="bar-label">Top Score</div>
            <div className="bar-container">
              <div 
                className="bar-fill top-score"
                style={{ width: '85%' }}
              >
                <span className="bar-value">255</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Insights */}
      <div className="insights-section">
        <h3>💡 Key Insights</h3>
        <div className="insights-grid">
          <div className="insight-card">
            <span className="insight-icon">✅</span>
            <div className="insight-content">
              <h4>Strengths</h4>
              <ul>
                {sections.map(section => {
                  const analysis = getSectionAnalysis(section);
                  if (parseFloat(analysis.accuracy) >= 60) {
                    return <li key={section}>{section}: {analysis.accuracy}% accuracy</li>;
                  }
                  return null;
                })}
              </ul>
            </div>
          </div>
          <div className="insight-card">
            <span className="insight-icon">⚠️</span>
            <div className="insight-content">
              <h4>Areas to Improve</h4>
              <ul>
                {sections.map(section => {
                  const analysis = getSectionAnalysis(section);
                  if (parseFloat(analysis.accuracy) < 60) {
                    return <li key={section}>{section}: Focus more on fundamentals</li>;
                  }
                  return null;
                })}
                {results.unattempted > 15 && (
                  <li>Attempt more questions - {results.unattempted} left unanswered</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analysis;
