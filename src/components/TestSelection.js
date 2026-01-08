import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../App';
import questionsData from '../data/questions.json';

function TestSelection() {
  const navigate = useNavigate();
  const { user, logout, theme, toggleTheme } = useContext(AuthContext);
  
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [availableTests, setAvailableTests] = useState([]);

  useEffect(() => {
    // Load tests from questions.json
    const tests = [];
    
    // Add all tests from questions.json
    if (questionsData && questionsData.tests) {
      questionsData.tests.forEach(test => {
        // Determine category based on test id
        let category = 'full-length';
        let difficulty = test.difficulty ? test.difficulty.toLowerCase() : 'medium';
        
        if (test.id.startsWith('pyq-')) {
          category = 'pyq';
        } else if (test.id.includes('sectional')) {
          category = 'sectional';
        } else if (test.id.includes('chapter')) {
          category = 'chapter';
        }
        
        // Get question count - for full-length mocks, always show 75 questions even if bank is larger
        const questionCount = test.questions ? test.questions.length : 75;
        const displayQuestions = (category === 'full-length' && questionCount > 75) ? 75 : questionCount;
        const displayMarks = displayQuestions * 4;
        
        tests.push({
          id: test.id,
          title: test.title,
          category: category,
          difficulty: difficulty,
          duration: 180,
          questions: displayQuestions,
          marks: displayMarks,
          sections: ['Physics', 'Chemistry', 'Mathematics'],
          attempts: 0,
          description: test.year ? `Actual questions from JEE Main ${test.year}` : 'Complete simulation of JEE Main exam with latest pattern',
          year: test.year
        });
      });
    }
    
    // Add additional hardcoded tests
    tests.push(
      {
        id: 'physics-1',
        title: 'Physics Sectional Test 1',
        category: 'sectional',
        difficulty: 'medium',
        duration: 60,
        questions: 25,
        marks: 100,
        sections: ['Physics'],
        attempts: 0,
        description: 'Focus on Physics - Mechanics, Electrodynamics, Modern Physics'
      },
      {
        id: 'chemistry-1',
        title: 'Chemistry Sectional Test 1',
        category: 'sectional',
        difficulty: 'medium',
        duration: 60,
        questions: 25,
        marks: 100,
        sections: ['Chemistry'],
        attempts: 0,
        description: 'Focus on Chemistry - Physical, Organic, Inorganic'
      },
      {
        id: 'maths-1',
        title: 'Mathematics Sectional Test 1',
        category: 'sectional',
        difficulty: 'medium',
        duration: 60,
        questions: 25,
        marks: 100,
        sections: ['Mathematics'],
        attempts: 0,
        description: 'Focus on Mathematics - Algebra, Calculus, Coordinate Geometry'
      },
      {
        id: 'chapter-mechanics',
        title: 'Mechanics - Chapter Test',
        category: 'chapter',
        difficulty: 'easy',
        duration: 45,
        questions: 20,
        marks: 80,
        sections: ['Physics'],
        attempts: 0,
        description: 'Newton\'s Laws, Work Energy, Rotational Motion'
      }
    );
    
    // Sort PYQ tests by year (newest first)
    tests.sort((a, b) => {
      if (a.category === 'pyq' && b.category === 'pyq') {
        return (b.year || 0) - (a.year || 0);
      }
      return 0;
    });
    
    setAvailableTests(tests);
  }, []);

  const testCategories = [
    { id: 'all', name: 'All Tests', icon: '📚' },
    { id: 'full-length', name: 'Full Length', icon: '🎯' },
    { id: 'sectional', name: 'Sectional', icon: '📖' },
    { id: 'pyq', name: 'Previous Year', icon: '📝' },
    { id: 'chapter', name: 'Chapter-wise', icon: '📑' }
  ];

  // Filter tests
  const filteredTests = availableTests.filter(test => {
    const categoryMatch = selectedCategory === 'all' || test.category === selectedCategory;
    const difficultyMatch = selectedDifficulty === 'all' || test.difficulty === selectedDifficulty;
    return categoryMatch && difficultyMatch;
  });

  const startTest = (testId) => {
    // Check if it's a sectional/practice test
    const test = availableTests.find(t => t.id === testId);
    if (test && test.category === 'sectional') {
      navigate(`/practice/${testId}`);
    } else {
      navigate(`/exam/${testId}`);
    }
  };

  const getDifficultyColor = (difficulty) => {
    const colors = {
      easy: 'success',
      medium: 'warning',
      hard: 'danger'
    };
    return colors[difficulty] || 'primary';
  };

  return (
    <div className="test-selection-page">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <h2>🎓 JEE Mock Test</h2>
          </div>
          <div className="nav-links">
            <span className="user-name">Welcome, {user?.name}</span>
            <button onClick={() => navigate('/')} className="btn btn-outline">
              Home
            </button>
            {user?.isAdmin && (
              <button onClick={() => navigate('/admin')} className="btn btn-secondary">
                Admin Panel
              </button>
            )}
            <button onClick={toggleTheme} className="btn btn-icon" title="Toggle Theme">
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
            <button onClick={logout} className="btn btn-outline">
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Page Header */}
      <div className="page-header">
        <h1>Select Your Test</h1>
        <p>Choose from a variety of mock tests, sectional tests, and previous year questions</p>
      </div>

      {/* Filters */}
      <div className="filters-section">
        <div className="filter-group">
          <label>Category:</label>
          <div className="category-pills">
            {testCategories.map(cat => (
              <button
                key={cat.id}
                className={`pill ${selectedCategory === cat.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat.id)}
              >
                <span className="pill-icon">{cat.icon}</span>
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        <div className="filter-group">
          <label>Difficulty:</label>
          <div className="difficulty-pills">
            <button
              className={`pill ${selectedDifficulty === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedDifficulty('all')}
            >
              All Levels
            </button>
            <button
              className={`pill pill-success ${selectedDifficulty === 'easy' ? 'active' : ''}`}
              onClick={() => setSelectedDifficulty('easy')}
            >
              Easy
            </button>
            <button
              className={`pill pill-warning ${selectedDifficulty === 'medium' ? 'active' : ''}`}
              onClick={() => setSelectedDifficulty('medium')}
            >
              Medium
            </button>
            <button
              className={`pill pill-danger ${selectedDifficulty === 'hard' ? 'active' : ''}`}
              onClick={() => setSelectedDifficulty('hard')}
            >
              Hard
            </button>
          </div>
        </div>
      </div>

      {/* Test Cards */}
      <div className="tests-container">
        {filteredTests.length === 0 ? (
          <div className="no-tests">
            <p>No tests found matching your filters</p>
          </div>
        ) : (
          <div className="tests-grid">
            {filteredTests.map(test => (
              <div key={test.id} className="test-card">
                <div className="test-card-header">
                  <h3>{test.title}</h3>
                  <span className={`badge badge-${getDifficultyColor(test.difficulty)}`}>
                    {test.difficulty.toUpperCase()}
                  </span>
                </div>
                
                <p className="test-description">{test.description}</p>
                
                <div className="test-meta">
                  <div className="meta-item">
                    <span className="meta-icon">⏱️</span>
                    <span>{test.duration} mins</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-icon">📝</span>
                    <span>{test.questions} questions</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-icon">🎯</span>
                    <span>{test.marks} marks</span>
                  </div>
                </div>

                <div className="test-sections">
                  {test.sections.map(section => (
                    <span key={section} className="section-tag">{section}</span>
                  ))}
                </div>

                <div className="test-card-footer">
                  <div className="test-attempts">
                    Attempts: {test.attempts}
                  </div>
                  <button 
                    className="btn btn-primary"
                    onClick={() => startTest(test.id)}
                  >
                    Start Test →
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Instructions Section */}
      <div className="instructions-section">
        <h2>📋 Important Instructions</h2>
        <div className="instructions-grid">
          <div className="instruction-card">
            <h4>⏱️ Time Management</h4>
            <ul>
              <li>Full Length: 180 minutes (3 hours)</li>
              <li>Sectional: 60 minutes per section</li>
              <li>Timer starts immediately when you begin</li>
              <li>Auto-submit when time ends</li>
            </ul>
          </div>
          <div className="instruction-card">
            <h4>📝 Marking Scheme</h4>
            <ul>
              <li>Correct Answer: +4 marks</li>
              <li>Wrong Answer: -1 mark</li>
              <li>Unattempted: 0 marks</li>
              <li>No negative marking for numerical questions</li>
            </ul>
          </div>
          <div className="instruction-card">
            <h4>🎯 Navigation</h4>
            <ul>
              <li>Save & Next: Save answer and move forward</li>
              <li>Mark for Review: Flag question for later</li>
              <li>Clear Response: Remove your answer</li>
              <li>Switch sections anytime during exam</li>
            </ul>
          </div>
          <div className="instruction-card">
            <h4>💾 Progress Saving</h4>
            <ul>
              <li>Your answers are auto-saved</li>
              <li>Can resume test if interrupted</li>
              <li>Result available immediately after submit</li>
              <li>Detailed analysis provided</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TestSelection;
