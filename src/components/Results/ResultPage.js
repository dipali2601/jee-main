import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ScoreCard from './ScoreCard';
import Analysis from './Analysis';

function ResultPage() {
  const { resultId } = useParams();
  const navigate = useNavigate();
  const [resultData, setResultData] = useState(null);
  const [activeTab, setActiveTab] = useState('scorecard');

  useEffect(() => {
    // Load result data
    const allResults = JSON.parse(localStorage.getItem('test_results') || '[]');
    const result = allResults.find(r => r.id === resultId);
    
    if (result) {
      setResultData(result);
    } else {
      navigate('/tests');
    }
  }, [resultId, navigate]);

  if (!resultData) {
    return (
      <div className="loading-screen">
        <h2>Loading results...</h2>
      </div>
    );
  }

  const { results, timeTaken } = resultData;
  
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}h ${minutes}m ${secs}s`;
  };

  const getPerformanceLevel = (percentage) => {
    if (percentage >= 80) return { level: 'Excellent', color: 'success', emoji: '🏆' };
    if (percentage >= 60) return { level: 'Good', color: 'primary', emoji: '👍' };
    if (percentage >= 40) return { level: 'Average', color: 'warning', emoji: '📈' };
    return { level: 'Needs Improvement', color: 'danger', emoji: '📚' };
  };

  const performance = getPerformanceLevel(results.percentage);

  return (
    <div className="result-page">
      {/* Header */}
      <div className="result-header">
        <div className="result-header-content">
          <h1>🎉 Test Results</h1>
          <p>Submitted on {new Date(resultData.submittedAt).toLocaleString()}</p>
        </div>
        <div className="result-header-actions">
          <button 
            className="btn btn-outline"
            onClick={() => navigate('/tests')}
          >
            Back to Tests
          </button>
          <button 
            className="btn btn-primary"
            onClick={() => window.print()}
          >
            📥 Download PDF
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="quick-stats">
        <div className="stat-card highlight">
          <div className="stat-icon">🎯</div>
          <div className="stat-content">
            <div className="stat-value">{results.score} / {results.maxScore}</div>
            <div className="stat-label">Total Score</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <div className="stat-value">{results.percentage}%</div>
            <div className="stat-label">Percentage</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <div className="stat-value">{results.correct}</div>
            <div className="stat-label">Correct</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">❌</div>
          <div className="stat-content">
            <div className="stat-value">{results.wrong}</div>
            <div className="stat-label">Wrong</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⭕</div>
          <div className="stat-content">
            <div className="stat-value">{results.unattempted}</div>
            <div className="stat-label">Unattempted</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⏱️</div>
          <div className="stat-content">
            <div className="stat-value">{formatTime(timeTaken)}</div>
            <div className="stat-label">Time Taken</div>
          </div>
        </div>
      </div>

      {/* Performance Badge */}
      <div className={`performance-badge badge-${performance.color}`}>
        <span className="performance-emoji">{performance.emoji}</span>
        <span className="performance-text">Performance: {performance.level}</span>
      </div>

      {/* Tabs */}
      <div className="result-tabs">
        <button
          className={`tab-btn ${activeTab === 'scorecard' ? 'active' : ''}`}
          onClick={() => setActiveTab('scorecard')}
        >
          📋 Score Card
        </button>
        <button
          className={`tab-btn ${activeTab === 'analysis' ? 'active' : ''}`}
          onClick={() => setActiveTab('analysis')}
        >
          📊 Detailed Analysis
        </button>
        <button
          className={`tab-btn ${activeTab === 'solutions' ? 'active' : ''}`}
          onClick={() => setActiveTab('solutions')}
        >
          💡 Solutions
        </button>
      </div>

      {/* Tab Content */}
      <div className="result-content">
        {activeTab === 'scorecard' && (
          <ScoreCard results={results} resultData={resultData} />
        )}
        {activeTab === 'analysis' && (
          <Analysis results={results} resultData={resultData} />
        )}
        {activeTab === 'solutions' && (
          <div className="solutions-section">
            <h2>📝 Solutions & Explanations</h2>
            <p className="info-message">
              ℹ️ Detailed solutions with step-by-step explanations coming soon!
            </p>
            <button className="btn btn-primary" onClick={() => navigate('/tests')}>
              Practice More Tests
            </button>
          </div>
        )}
      </div>

      {/* Recommendations */}
      <div className="recommendations-section">
        <h2>💡 Recommendations</h2>
        <div className="recommendations-grid">
          <div className="recommendation-card">
            <h4>📚 Weak Topics</h4>
            <ul>
              {Object.entries(results.sectionStats).map(([section, stats]) => {
                if (stats.correct < stats.correct + stats.wrong + stats.unattempted) {
                  const accuracy = ((stats.correct / (stats.correct + stats.wrong)) * 100).toFixed(1);
                  return (
                    <li key={section}>
                      {section}: {accuracy}% accuracy
                    </li>
                  );
                }
                return null;
              })}
            </ul>
          </div>
          <div className="recommendation-card">
            <h4>🎯 Next Steps</h4>
            <ul>
              <li>Practice more sectional tests</li>
              <li>Review incorrect answers</li>
              <li>Focus on weak chapters</li>
              <li>Attempt previous year questions</li>
            </ul>
          </div>
          <div className="recommendation-card">
            <h4>⏱️ Time Management</h4>
            <ul>
              <li>Average time per question: {(timeTaken / results.totalQuestions).toFixed(1)}s</li>
              <li>Target: 144 seconds per question</li>
              <li>Practice with strict timing</li>
              <li>Skip difficult questions initially</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="result-actions">
        <button 
          className="btn btn-large btn-primary"
          onClick={() => navigate('/tests')}
        >
          🚀 Take Another Test
        </button>
        <button 
          className="btn btn-large btn-outline"
          onClick={() => navigate('/')}
        >
          🏠 Go to Home
        </button>
      </div>
    </div>
  );
}

export default ResultPage;
