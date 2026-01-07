import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../App';
import QuestionPanel from './QuestionPanel';
import QuestionPalette from './QuestionPalette';
import Timer from './Timer';
import questionsData from '../../data/questions.json';

function ExamScreen() {
  const { testId } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  // State management
  const [currentSection, setCurrentSection] = useState('Physics');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [markedForReview, setMarkedForReview] = useState({});
  const [visited, setVisited] = useState({});
  const [timeRemaining, setTimeRemaining] = useState(180 * 60); // 3 hours in seconds
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);

  // Load test questions
  const [questions, setQuestions] = useState([]);
  const sections = ['Physics', 'Chemistry', 'Mathematics'];

  useEffect(() => {
    // Load questions from data file
    if (questionsData && questionsData.tests) {
      const test = questionsData.tests.find(t => t.id === testId);
      if (test) {
        // Shuffle questions for full-mock tests to ensure different question order each time
        let testQuestions = test.questions || [];
        if (testId.startsWith('full-mock')) {
          // Fisher-Yates shuffle algorithm
          testQuestions = [...testQuestions];
          for (let i = testQuestions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [testQuestions[i], testQuestions[j]] = [testQuestions[j], testQuestions[i]];
          }
        }
        setQuestions(testQuestions);
        
        // Try to restore saved progress
        const savedState = localStorage.getItem(`test_${testId}`);
        if (savedState) {
          const state = JSON.parse(savedState);
          setAnswers(state.answers || {});
          setMarkedForReview(state.markedForReview || {});
          setVisited(state.visited || {});
          setTimeRemaining(state.timeRemaining || 180 * 60);
          setCurrentSection(state.currentSection || 'Physics');
          setCurrentQuestionIndex(state.currentQuestionIndex || 0);
        }
      }
    }
  }, [testId]);

  // Auto-save progress
  useEffect(() => {
    const saveProgress = () => {
      const state = {
        answers,
        markedForReview,
        visited,
        timeRemaining,
        currentSection,
        currentQuestionIndex,
        lastSaved: new Date().toISOString()
      };
      localStorage.setItem(`test_${testId}`, JSON.stringify(state));
    };

    const interval = setInterval(saveProgress, 10000); // Save every 10 seconds
    return () => clearInterval(interval);
  }, [answers, markedForReview, visited, timeRemaining, currentSection, currentQuestionIndex, testId]);

  // Get current question
  const currentQuestion = questions[currentQuestionIndex];

  // Get questions by section
  const getQuestionsBySection = (section) => {
    return questions.filter(q => q.section === section);
  };

  // Navigation functions
  const goToQuestion = (index) => {
    setCurrentQuestionIndex(index);
    markAsVisited(index);
  };

  const saveAndNext = () => {
    markAsVisited(currentQuestionIndex);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      markAsVisited(currentQuestionIndex + 1);
    }
  };

  const markForReviewAndNext = () => {
    setMarkedForReview({
      ...markedForReview,
      [currentQuestionIndex]: true
    });
    markAsVisited(currentQuestionIndex);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      markAsVisited(currentQuestionIndex + 1);
    }
  };

  const clearResponse = () => {
    const newAnswers = { ...answers };
    delete newAnswers[currentQuestionIndex];
    setAnswers(newAnswers);
  };

  const markAsVisited = (index) => {
    setVisited({
      ...visited,
      [index]: true
    });
  };

  // Answer handling
  const handleAnswer = (answer) => {
    setAnswers({
      ...answers,
      [currentQuestionIndex]: answer
    });
  };

  // Section switching
  const switchSection = (section) => {
    setCurrentSection(section);
    const sectionQuestions = getQuestionsBySection(section);
    if (sectionQuestions.length > 0) {
      const firstQuestionIndex = questions.findIndex(q => q.section === section);
      setCurrentQuestionIndex(firstQuestionIndex);
      markAsVisited(firstQuestionIndex);
    }
  };

  // Submit test
  const handleSubmit = () => {
    // Calculate results
    const results = calculateResults();
    
    // Save results
    const resultId = Date.now().toString();
    const resultData = {
      id: resultId,
      testId,
      userId: user.id,
      userName: user.name,
      answers,
      markedForReview,
      results,
      submittedAt: new Date().toISOString(),
      timeTaken: (180 * 60) - timeRemaining
    };
    
    // Save to localStorage
    const allResults = JSON.parse(localStorage.getItem('test_results') || '[]');
    allResults.push(resultData);
    localStorage.setItem('test_results', JSON.stringify(allResults));
    
    // Clear current test state
    localStorage.removeItem(`test_${testId}`);
    
    // Navigate to results
    navigate(`/result/${resultId}`);
  };

  // Calculate results
  const calculateResults = () => {
    let correct = 0;
    let wrong = 0;
    let unattempted = 0;
    let score = 0;
    
    const sectionStats = {};
    sections.forEach(section => {
      sectionStats[section] = {
        correct: 0,
        wrong: 0,
        unattempted: 0,
        score: 0
      };
    });

    questions.forEach((question, index) => {
      const userAnswer = answers[index];
      const section = question.section;

      if (!userAnswer) {
        unattempted++;
        sectionStats[section].unattempted++;
      } else if (userAnswer === question.correctAnswer) {
        correct++;
        score += 4;
        sectionStats[section].correct++;
        sectionStats[section].score += 4;
      } else {
        wrong++;
        score -= 1;
        sectionStats[section].wrong++;
        sectionStats[section].score -= 1;
      }
    });

    return {
      correct,
      wrong,
      unattempted,
      score,
      totalQuestions: questions.length,
      maxScore: questions.length * 4,
      percentage: ((score / (questions.length * 4)) * 100).toFixed(2),
      sectionStats
    };
  };

  // Get question status
  const getQuestionStatus = (index) => {
    if (answers[index]) {
      return markedForReview[index] ? 'answered-marked' : 'answered';
    } else if (markedForReview[index]) {
      return 'marked';
    } else if (visited[index]) {
      return 'not-answered';
    }
    return 'not-visited';
  };

  // Count questions by status
  const getStatusCounts = () => {
    let answered = 0;
    let notAnswered = 0;
    let marked = 0;
    let notVisited = 0;

    questions.forEach((_, index) => {
      const status = getQuestionStatus(index);
      if (status === 'answered') answered++;
      else if (status === 'answered-marked') { answered++; marked++; }
      else if (status === 'marked') marked++;
      else if (status === 'not-answered') notAnswered++;
      else notVisited++;
    });

    return { answered, notAnswered, marked, notVisited };
  };

  if (showInstructions) {
    return (
      <div className="exam-instructions">
        <div className="instructions-container">
          <h1>📋 General Instructions</h1>
          
          <div className="instructions-content">
            <div className="instruction-section">
              <h3>1. Test Details</h3>
              <ul>
                <li>Total Duration: <strong>180 minutes (3 hours)</strong></li>
                <li>Total Questions: <strong>75 (25 per section)</strong></li>
                <li>Maximum Marks: <strong>300</strong></li>
                <li>Sections: Physics, Chemistry, Mathematics</li>
              </ul>
            </div>

            <div className="instruction-section">
              <h3>2. Marking Scheme</h3>
              <ul>
                <li>Correct Answer: <strong>+4 marks</strong></li>
                <li>Wrong Answer: <strong>-1 mark</strong></li>
                <li>Unattempted: <strong>0 marks</strong></li>
              </ul>
            </div>

            <div className="instruction-section">
              <h3>3. Navigation</h3>
              <ul>
                <li><strong>Save & Next:</strong> Save your answer and move to next question</li>
                <li><strong>Mark for Review & Next:</strong> Mark question and move forward</li>
                <li><strong>Clear Response:</strong> Clear your current answer</li>
                <li><strong>Question Palette:</strong> Click any question number to jump to it</li>
              </ul>
            </div>

            <div className="instruction-section">
              <h3>4. Question Status Colors</h3>
              <div className="status-legend">
                <div className="legend-item">
                  <span className="status-indicator not-visited"></span>
                  <span>Not Visited</span>
                </div>
                <div className="legend-item">
                  <span className="status-indicator not-answered"></span>
                  <span>Not Answered</span>
                </div>
                <div className="legend-item">
                  <span className="status-indicator answered"></span>
                  <span>Answered</span>
                </div>
                <div className="legend-item">
                  <span className="status-indicator marked"></span>
                  <span>Marked for Review</span>
                </div>
                <div className="legend-item">
                  <span className="status-indicator answered-marked"></span>
                  <span>Answered & Marked</span>
                </div>
              </div>
            </div>

            <div className="instruction-section">
              <h3>5. Important Points</h3>
              <ul>
                <li>You can switch between sections at any time</li>
                <li>Timer will count down automatically</li>
                <li>Test will auto-submit when time ends</li>
                <li>Your progress is auto-saved every 10 seconds</li>
                <li>Review all questions before final submission</li>
              </ul>
            </div>
          </div>

          <div className="instructions-footer">
            <label className="checkbox-label">
              <input type="checkbox" id="agree-instructions" />
              <span>I have read and understood all instructions</span>
            </label>
            <button 
              className="btn btn-large btn-primary"
              onClick={() => {
                const checkbox = document.getElementById('agree-instructions');
                if (checkbox.checked) {
                  setShowInstructions(false);
                  markAsVisited(0);
                } else {
                  alert('Please confirm that you have read the instructions');
                }
              }}
            >
              Start Test →
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="loading-screen">
        <h2>Loading test questions...</h2>
      </div>
    );
  }

  return (
    <div className="exam-screen">
      {/* Header */}
      <div className="exam-header">
        <div className="exam-header-left">
          <h2 className="exam-title">JEE Main Mock Test</h2>
          <div className="user-info">
            <span>Candidate: <strong>{user?.name}</strong></span>
          </div>
        </div>
        <div className="exam-header-center">
          <Timer 
            timeRemaining={timeRemaining}
            setTimeRemaining={setTimeRemaining}
            onTimeEnd={handleSubmit}
          />
        </div>
        <div className="exam-header-right">
          <button 
            className="btn btn-danger"
            onClick={() => setShowSubmitConfirm(true)}
          >
            Submit Test
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="exam-content">
        {/* Left Panel - Question */}
        <div className="question-section">
          <QuestionPanel
            question={currentQuestion}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={questions.length}
            selectedAnswer={answers[currentQuestionIndex]}
            onAnswerChange={handleAnswer}
          />
          
          {/* Navigation Buttons */}
          <div className="question-controls">
            <button 
              className="btn btn-outline"
              onClick={() => goToQuestion(Math.max(0, currentQuestionIndex - 1))}
              disabled={currentQuestionIndex === 0}
            >
              ← Previous
            </button>
            <button 
              className="btn btn-primary"
              onClick={saveAndNext}
            >
              Save & Next
            </button>
            <button 
              className="btn btn-warning"
              onClick={markForReviewAndNext}
            >
              Mark for Review & Next
            </button>
            <button 
              className="btn btn-secondary"
              onClick={clearResponse}
            >
              Clear Response
            </button>
          </div>
        </div>

        {/* Right Panel - Question Palette */}
        <div className="palette-section">
          <QuestionPalette
            questions={questions}
            currentQuestion={currentQuestionIndex}
            currentSection={currentSection}
            sections={sections}
            onQuestionClick={goToQuestion}
            onSectionChange={switchSection}
            getQuestionStatus={getQuestionStatus}
            statusCounts={getStatusCounts()}
          />
        </div>
      </div>

      {/* Submit Confirmation Modal */}
      {showSubmitConfirm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>⚠️ Submit Test?</h2>
            <div className="modal-body">
              <p>Are you sure you want to submit the test?</p>
              <div className="submit-summary">
                <p>Answered: <strong>{getStatusCounts().answered}</strong></p>
                <p>Not Answered: <strong>{getStatusCounts().notAnswered}</strong></p>
                <p>Marked for Review: <strong>{getStatusCounts().marked}</strong></p>
                <p>Not Visited: <strong>{getStatusCounts().notVisited}</strong></p>
              </div>
              <p className="warning-text">⚠️ You cannot change your answers after submission!</p>
            </div>
            <div className="modal-actions">
              <button 
                className="btn btn-outline"
                onClick={() => setShowSubmitConfirm(false)}
              >
                Cancel
              </button>
              <button 
                className="btn btn-danger"
                onClick={handleSubmit}
              >
                Yes, Submit Test
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ExamScreen;
