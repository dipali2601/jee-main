import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../App';

function Home() {
  const navigate = useNavigate();
  const { user, logout, theme, toggleTheme } = useContext(AuthContext);

  return (
    <div className="home-page">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <h2>🎓 JEE Mock Test</h2>
          </div>
          <div className="nav-links">
            {user ? (
              <>
                <span className="user-name">Welcome, {user.name}</span>
                <button onClick={() => navigate('/tests')} className="btn btn-primary">
                  My Tests
                </button>
                {user.isAdmin && (
                  <button onClick={() => navigate('/admin')} className="btn btn-secondary">
                    Admin Panel
                  </button>
                )}
                <button onClick={logout} className="btn btn-outline">
                  Logout
                </button>
              </>
            ) : (
              <>
                <button onClick={() => navigate('/login')} className="btn btn-outline">
                  Login
                </button>
                <button onClick={() => navigate('/signup')} className="btn btn-primary">
                  Sign Up
                </button>
              </>
            )}
            <button onClick={toggleTheme} className="btn btn-icon" title="Toggle Theme">
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">JEE Main Mock Test</h1>
          <p className="hero-subtitle">Real Exam Experience - Official NTA CBT Interface</p>
          <p className="hero-description">
            Practice with India's most accurate JEE Main simulator. 
            Experience the exact exam interface, timing, and evaluation system.
          </p>
          <div className="hero-buttons">
            <button 
              onClick={() => user ? navigate('/tests') : navigate('/signup')} 
              className="btn btn-large btn-primary"
            >
              🚀 Start Free Mock Test
            </button>
            <button 
              onClick={() => {
                const section = document.getElementById('features');
                section?.scrollIntoView({ behavior: 'smooth' });
              }} 
              className="btn btn-large btn-outline"
            >
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="stats-section">
        <div className="stats-container">
          <div className="stat-card">
            <div className="stat-icon">📝</div>
            <div className="stat-number">500+</div>
            <div className="stat-label">Mock Tests</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">👨‍🎓</div>
            <div className="stat-number">50,000+</div>
            <div className="stat-label">Students Practicing</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📈</div>
            <div className="stat-number">35%</div>
            <div className="stat-label">Avg. Score Improvement</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⭐</div>
            <div className="stat-number">4.8/5</div>
            <div className="stat-label">User Rating</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features-section">
        <h2 className="section-title">Why Choose Our Platform?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🖥️</div>
            <h3>Exact NTA Interface</h3>
            <p>Practice with the same interface you'll see in the real JEE Main CBT exam</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⏱️</div>
            <h3>Real-Time Timer</h3>
            <p>3-hour countdown timer with auto-submit functionality, just like the actual exam</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Instant Evaluation</h3>
            <p>Get immediate results with detailed section-wise and question-wise analysis</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3>Accurate Marking</h3>
            <p>Official JEE marking scheme: +4 for correct, -1 for wrong, 0 for unattempted</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📱</div>
            <h3>Fully Responsive</h3>
            <p>Practice on any device - desktop, tablet, or mobile with optimized UI</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📚</div>
            <h3>Comprehensive Tests</h3>
            <p>Full-length mocks, sectional tests, PYQs, and chapter-wise practice</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💾</div>
            <h3>Save & Resume</h3>
            <p>Save your progress and resume tests later without losing any data</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🧠</div>
            <h3>Smart Analytics</h3>
            <p>AI-powered weak topic identification and personalized recommendations</p>
          </div>
        </div>
      </section>

      {/* Test Types Section */}
      <section className="test-types-section">
        <h2 className="section-title">Available Test Types</h2>
        <div className="test-types-grid">
          <div className="test-type-card">
            <h3>🎯 Full Length Mock Tests</h3>
            <ul>
              <li>Complete 3-hour exam simulation</li>
              <li>75 questions across all sections</li>
              <li>Physics, Chemistry, Mathematics</li>
              <li>300 marks total</li>
            </ul>
            <button 
              onClick={() => user ? navigate('/tests') : navigate('/signup')} 
              className="btn btn-primary"
            >
              Start Now
            </button>
          </div>
          <div className="test-type-card">
            <h3>📖 Sectional Tests</h3>
            <ul>
              <li>Focus on individual subjects</li>
              <li>Physics (25 questions)</li>
              <li>Chemistry (25 questions)</li>
              <li>Mathematics (25 questions)</li>
            </ul>
            <button 
              onClick={() => user ? navigate('/tests') : navigate('/signup')} 
              className="btn btn-primary"
            >
              Practice Section
            </button>
          </div>
          <div className="test-type-card">
            <h3>📝 Previous Year Questions</h3>
            <ul>
              <li>Year-wise PYQ tests</li>
              <li>Chapter-wise practice</li>
              <li>Official exam patterns</li>
              <li>Real JEE Main questions</li>
            </ul>
            <button 
              onClick={() => user ? navigate('/tests') : navigate('/signup')} 
              className="btn btn-primary"
            >
              Solve PYQs
            </button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works-section">
        <h2 className="section-title">How It Works</h2>
        <div className="steps-container">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Sign Up Free</h3>
            <p>Create your account in less than a minute</p>
          </div>
          <div className="step-arrow">→</div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Choose a Test</h3>
            <p>Select from full-length, sectional, or PYQ tests</p>
          </div>
          <div className="step-arrow">→</div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Take the Exam</h3>
            <p>Experience real JEE Main CBT interface</p>
          </div>
          <div className="step-arrow">→</div>
          <div className="step">
            <div className="step-number">4</div>
            <h3>Analyze Results</h3>
            <p>Get detailed performance insights instantly</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Ace JEE Main 2026?</h2>
          <p>Join thousands of successful students who trust our platform</p>
          <button 
            onClick={() => user ? navigate('/tests') : navigate('/signup')} 
            className="btn btn-large btn-primary"
          >
            Start Practicing Now - It's Free! 🚀
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>About</h4>
            <p>The most accurate JEE Main mock test platform with official NTA CBT interface</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#features">Features</a></li>
              <li><a href="/tests">Mock Tests</a></li>
              <li><a href="/about">About Us</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Resources</h4>
            <ul>
              <li><a href="/syllabus">JEE Syllabus</a></li>
              <li><a href="/exam-pattern">Exam Pattern</a></li>
              <li><a href="/tips">Preparation Tips</a></li>
              <li><a href="/blog">Blog</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Connect</h4>
            <p>📧 support@jeemock.com</p>
            <p>📱 +91 1234567890</p>
            <div className="social-links">
              <a href="https://facebook.com">FB</a>
              <a href="https://twitter.com">TW</a>
              <a href="https://instagram.com">IG</a>
              <a href="https://youtube.com">YT</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 JEE Mock Test. All rights reserved. | Made with ❤️ for JEE Aspirants</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
