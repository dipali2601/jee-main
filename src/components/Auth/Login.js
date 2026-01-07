import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../App';

function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
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
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
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

    // Simulate API call
    setTimeout(() => {
      // Get users from localStorage
      const users = JSON.parse(localStorage.getItem('jee_users') || '[]');
      
      // Check for admin credentials
      if (formData.email === 'admin@jee.com' && formData.password === 'admin123') {
        const adminUser = {
          id: 'admin',
          name: 'Admin',
          email: 'admin@jee.com',
          isAdmin: true
        };
        login(adminUser);
        navigate('/admin');
        return;
      }

      // Find user
      const user = users.find(u => 
        u.email === formData.email && u.password === formData.password
      );

      if (user) {
        const { password, ...userWithoutPassword } = user;
        login(userWithoutPassword);
        navigate('/tests');
      } else {
        setError('Invalid email or password');
      }
      
      setLoading(false);
    }, 500);
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h1>Welcome Back! 👋</h1>
            <p>Login to continue your JEE preparation</p>
          </div>

          {error && (
            <div className="alert alert-error">
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
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

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="form-input"
                autoComplete="current-password"
              />
            </div>

            <div className="form-extras">
              <label className="checkbox-label">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>
              <a href="#forgot" className="link">Forgot Password?</a>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary btn-full"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div className="auth-divider">
            <span>OR</span>
          </div>

          <div className="demo-credentials">
            <p><strong>Demo Credentials:</strong></p>
            <p>📧 Email: admin@jee.com</p>
            <p>🔑 Password: admin123</p>
          </div>

          <div className="auth-footer">
            <p>
              Don't have an account? 
              <Link to="/signup" className="link"> Sign Up</Link>
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

export default Login;
