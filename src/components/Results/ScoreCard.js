import React from 'react';

function ScoreCard({ results, resultData }) {
  const { sectionStats } = results;
  const sections = ['Physics', 'Chemistry', 'Mathematics'];

  const getAccuracy = (correct, wrong) => {
    const total = correct + wrong;
    return total > 0 ? ((correct / total) * 100).toFixed(1) : '0';
  };

  return (
    <div className="scorecard-section">
      <h2>📊 Section-wise Performance</h2>
      
      <div className="sections-table">
        <table>
          <thead>
            <tr>
              <th>Section</th>
              <th>Correct</th>
              <th>Wrong</th>
              <th>Unattempted</th>
              <th>Score</th>
              <th>Accuracy</th>
            </tr>
          </thead>
          <tbody>
            {sections.map(section => {
              const stats = sectionStats[section];
              const accuracy = getAccuracy(stats.correct, stats.wrong);
              
              return (
                <tr key={section}>
                  <td className="section-name"><strong>{section}</strong></td>
                  <td className="correct-count">{stats.correct}</td>
                  <td className="wrong-count">{stats.wrong}</td>
                  <td className="unattempted-count">{stats.unattempted}</td>
                  <td className="score-value"><strong>{stats.score}</strong></td>
                  <td className="accuracy-value">{accuracy}%</td>
                </tr>
              );
            })}
            <tr className="total-row">
              <td><strong>Total</strong></td>
              <td><strong>{results.correct}</strong></td>
              <td><strong>{results.wrong}</strong></td>
              <td><strong>{results.unattempted}</strong></td>
              <td><strong>{results.score}</strong></td>
              <td><strong>{results.percentage}%</strong></td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Visual Breakdown */}
      <div className="visual-breakdown">
        <h3>📈 Visual Breakdown</h3>
        <div className="breakdown-bars">
          {sections.map(section => {
            const stats = sectionStats[section];
            const total = stats.correct + stats.wrong + stats.unattempted;
            const correctPercent = (stats.correct / total) * 100;
            const wrongPercent = (stats.wrong / total) * 100;
            const unattPercent = (stats.unattempted / total) * 100;
            
            return (
              <div key={section} className="section-bar">
                <div className="section-bar-label">{section}</div>
                <div className="progress-bar">
                  <div 
                    className="progress-segment correct"
                    style={{ width: `${correctPercent}%` }}
                    title={`Correct: ${stats.correct}`}
                  ></div>
                  <div 
                    className="progress-segment wrong"
                    style={{ width: `${wrongPercent}%` }}
                    title={`Wrong: ${stats.wrong}`}
                  ></div>
                  <div 
                    className="progress-segment unattempted"
                    style={{ width: `${unattPercent}%` }}
                    title={`Unattempted: ${stats.unattempted}`}
                  ></div>
                </div>
                <div className="section-bar-score">Score: {stats.score}</div>
              </div>
            );
          })}
        </div>
        
        <div className="legend">
          <div className="legend-item">
            <span className="legend-color correct"></span>
            <span>Correct</span>
          </div>
          <div className="legend-item">
            <span className="legend-color wrong"></span>
            <span>Wrong</span>
          </div>
          <div className="legend-item">
            <span className="legend-color unattempted"></span>
            <span>Unattempted</span>
          </div>
        </div>
      </div>

      {/* Rank Prediction */}
      <div className="rank-prediction">
        <h3>🏆 Approximate Rank Prediction</h3>
        <div className="rank-card">
          <div className="rank-info">
            <p>Based on your score of <strong>{results.score}</strong> marks:</p>
            <div className="predicted-rank">
              <span className="rank-label">Expected Rank Range:</span>
              <span className="rank-value">15,000 - 25,000</span>
            </div>
            <p className="rank-note">
              ℹ️ This is an approximate prediction based on previous year trends. 
              Actual rank depends on overall difficulty and competition.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScoreCard;
