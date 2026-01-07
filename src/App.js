import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import TestSelection from './components/TestSelection';
import ExamScreen from './components/ExamInterface/ExamScreen';
import ResultPage from './components/Results/ResultPage';
import AdminDashboard from './components/Admin/AdminDashboard';

// Auth Context
export const AuthContext = React.createContext();

function App() {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    // Check if user is logged in
    const savedUser = localStorage.getItem('jee_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    // Check theme preference
    const savedTheme = localStorage.getItem('jee_theme');
    if (savedTheme) {
      setTheme(savedTheme);
      document.body.classList.toggle('dark-mode', savedTheme === 'dark');
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('jee_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('jee_user');
    localStorage.removeItem('current_test');
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('jee_theme', newTheme);
    document.body.classList.toggle('dark-mode', newTheme === 'dark');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, theme, toggleTheme }}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={user ? <Navigate to="/tests" /> : <Login />} />
          <Route path="/signup" element={user ? <Navigate to="/tests" /> : <Signup />} />
          <Route 
            path="/tests" 
            element={user ? <TestSelection /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/exam/:testId" 
            element={user ? <ExamScreen /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/result/:resultId" 
            element={user ? <ResultPage /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/admin" 
            element={user?.isAdmin ? <AdminDashboard /> : <Navigate to="/" />} 
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
