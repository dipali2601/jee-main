import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../App';

function AdminDashboard() {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('overview');

  if (!user || !user.isAdmin) {
    navigate('/');
    return null;
  }

  return (
    <div className="admin-dashboard">
      {/* Admin Header */}
      <div className="admin-header">
        <h1>🔧 Admin Dashboard</h1>
        <div className="admin-header-actions">
          <button onClick={() => navigate('/')} className="btn btn-outline">
            Home
          </button>
          <button onClick={logout} className="btn btn-danger">
            Logout
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="admin-tabs">
        <button
          className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          📊 Overview
        </button>
        <button
          className={`tab-btn ${activeTab === 'questions' ? 'active' : ''}`}
          onClick={() => setActiveTab('questions')}
        >
          📝 Manage Questions
        </button>
        <button
          className={`tab-btn ${activeTab === 'tests' ? 'active' : ''}`}
          onClick={() => setActiveTab('tests')}
        >
          🎯 Manage Tests
        </button>
        <button
          className={`tab-btn ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          👥 Users
        </button>
        <button
          className={`tab-btn ${activeTab === 'analytics' ? 'active' : ''}`}
          onClick={() => setActiveTab('analytics')}
        >
          📈 Analytics
        </button>
      </div>

      {/* Content */}
      <div className="admin-content">
        {activeTab === 'overview' && <OverviewSection />}
        {activeTab === 'questions' && <QuestionsSection />}
        {activeTab === 'tests' && <TestsSection />}
        {activeTab === 'users' && <UsersSection />}
        {activeTab === 'analytics' && <AnalyticsSection />}
      </div>
    </div>
  );
}

// Overview Section
function OverviewSection() {
  return (
    <div className="overview-section">
      <h2>Platform Overview</h2>
      
      <div className="stats-grid">
        <div className="admin-stat-card">
          <div className="stat-icon">📝</div>
          <div className="stat-details">
            <h3>500</h3>
            <p>Total Questions</p>
          </div>
        </div>
        <div className="admin-stat-card">
          <div className="stat-icon">🎯</div>
          <div className="stat-details">
            <h3>50</h3>
            <p>Active Tests</p>
          </div>
        </div>
        <div className="admin-stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-details">
            <h3>1,234</h3>
            <p>Registered Users</p>
          </div>
        </div>
        <div className="admin-stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-details">
            <h3>5,678</h3>
            <p>Tests Completed</p>
          </div>
        </div>
      </div>

      <div className="recent-activity">
        <h3>Recent Activity</h3>
        <ul>
          <li>✅ User "John Doe" completed Full Mock Test 1</li>
          <li>➕ 20 new questions added to Physics section</li>
          <li>👤 15 new users registered today</li>
          <li>🎯 Mock Test 3 created successfully</li>
        </ul>
      </div>
    </div>
  );
}

// Questions Section
function QuestionsSection() {
  const [formData, setFormData] = useState({
    section: 'Physics',
    type: 'MCQ',
    difficulty: 'Medium',
    question: '',
    options: ['', '', '', ''],
    correctAnswer: '',
    solution: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...formData.options];
    newOptions[index] = value;
    setFormData({ ...formData, options: newOptions });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Question added successfully! (This is a demo)');
    // In real app, save to backend/database
  };

  return (
    <div className="questions-section">
      <h2>Add New Question</h2>
      
      <form onSubmit={handleSubmit} className="question-form">
        <div className="form-row">
          <div className="form-group">
            <label>Section</label>
            <select name="section" value={formData.section} onChange={handleChange}>
              <option>Physics</option>
              <option>Chemistry</option>
              <option>Mathematics</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Type</label>
            <select name="type" value={formData.type} onChange={handleChange}>
              <option>MCQ</option>
              <option>Numerical</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Difficulty</label>
            <select name="difficulty" value={formData.difficulty} onChange={handleChange}>
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>Question Text</label>
          <textarea
            name="question"
            value={formData.question}
            onChange={handleChange}
            rows="4"
            placeholder="Enter question text"
            required
          ></textarea>
        </div>

        {formData.type === 'MCQ' && (
          <>
            <div className="form-group">
              <label>Options</label>
              {formData.options.map((option, index) => (
                <input
                  key={index}
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  placeholder={`Option ${index + 1}`}
                  required
                />
              ))}
            </div>
          </>
        )}

        <div className="form-group">
          <label>Correct Answer</label>
          <input
            type="text"
            name="correctAnswer"
            value={formData.correctAnswer}
            onChange={handleChange}
            placeholder="Enter correct answer"
            required
          />
        </div>

        <div className="form-group">
          <label>Solution</label>
          <textarea
            name="solution"
            value={formData.solution}
            onChange={handleChange}
            rows="3"
            placeholder="Enter detailed solution"
            required
          ></textarea>
        </div>

        <button type="submit" className="btn btn-primary">
          Add Question
        </button>
      </form>
    </div>
  );
}

// Tests Section
function TestsSection() {
  return (
    <div className="tests-section">
      <h2>Manage Tests</h2>
      <button className="btn btn-primary">Create New Test</button>
      
      <div className="tests-list">
        <p>Test management features coming soon!</p>
      </div>
    </div>
  );
}

// Users Section
function UsersSection() {
  const users = JSON.parse(localStorage.getItem('jee_users') || '[]');
  
  return (
    <div className="users-section">
      <h2>Registered Users</h2>
      
      <table className="users-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Target Year</th>
            <th>Registered Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.targetYear}</td>
              <td>{new Date(user.createdAt).toLocaleDateString()}</td>
              <td>
                <button className="btn btn-sm btn-outline">View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Analytics Section
function AnalyticsSection() {
  return (
    <div className="analytics-section">
      <h2>Platform Analytics</h2>
      
      <div className="analytics-grid">
        <div className="analytics-card">
          <h3>Test Completion Rate</h3>
          <div className="big-number">78%</div>
          <p>Students completing tests</p>
        </div>
        
        <div className="analytics-card">
          <h3>Average Score</h3>
          <div className="big-number">156</div>
          <p>Out of 300 marks</p>
        </div>
        
        <div className="analytics-card">
          <h3>Most Difficult Section</h3>
          <div className="big-number">Physics</div>
          <p>45% average accuracy</p>
        </div>
        
        <div className="analytics-card">
          <h3>Peak Usage Time</h3>
          <div className="big-number">8-10 PM</div>
          <p>Most active hours</p>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
