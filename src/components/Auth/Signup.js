import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../App';

function Signup() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    targetYear: '2026'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validate inputs
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all required fields');
      setLoading(false);
      return;
    }

    // Name validation
    if (formData.name.trim().length < 3) {
      setError('Name must be at least 3 characters long');
      setLoading(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }

    // Password validation
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      // Get existing users
      const users = JSON.parse(localStorage.getItem('jee_users') || '[]');
      
      // Check if email already exists
      if (users.some(u => u.email === formData.email)) {
        setError('Email already registered. Please login.');
        setLoading(false);
        return;
      }

      // Create new user
      const newUser = {
        id: Date.now().toString(),
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        targetYear: formData.targetYear,
        createdAt: new Date().toISOString(),
        isAdmin: false
      };

      // Save to localStorage
      users.push(newUser);
      localStorage.setItem('jee_users', JSON.stringify(users));

      // Login user
      const { password, ...userWithoutPassword } = newUser;
      login(userWithoutPassword);
      
      navigate('/tests');
      setLoading(false);
    }, 500);
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card signup-card">
          <div className="auth-header">
            <h1>Create Account 🚀</h1>
            <p>Join thousands of JEE aspirants</p>
          </div>

          {error && (
            <div className="alert alert-error">
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="name">Full Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="form-input"
                autoComplete="name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="form-input"
                autoComplete="email"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="password">Password *</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Min. 6 characters"
                  className="form-input"
                  autoComplete="new-password"
                />
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password *</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-enter password"
                  className="form-input"
                  autoComplete="new-password"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="phone">Phone Number (Optional)</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="10-digit mobile number"
                  className="form-input"
                  autoComplete="tel"
                />
              </div>

              <div className="form-group">
                <label htmlFor="targetYear">Target Year</label>
                <select
                  id="targetYear"
                  name="targetYear"
                  value={formData.targetYear}
                  onChange={handleChange}
                  className="form-input"
                >
                  <option value="2026">JEE Main 2026</option>
                  <option value="2027">JEE Main 2027</option>
                  <option value="2028">JEE Main 2028</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="checkbox-label">
                <input type="checkbox" required />
                <span>I agree to the Terms & Conditions and Privacy Policy</span>
              </label>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary btn-full"
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Already have an account? 
              <Link to="/login" className="link"> Login</Link>
            </p>
            <p>
              <Link to="/" className="link">← Back to Home</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
