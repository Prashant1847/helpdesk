import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      const userData = JSON.parse(user);
      setIsLoggedIn(true);
      setUserType(userData.type);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUserType(null);
    navigate('/');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="navbar-logo">
          VIT Query System
        </Link>
      </div>

      <button className="navbar-toggle" onClick={toggleMenu}>
        <MenuIcon />
      </button>

      <div className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
        <Link to="/eligibility" className="navbar-link">
          Eligibility
        </Link>
        <Link to="/faq" className="navbar-link">
          FAQs
        </Link>
        <Link to="/contact" className="navbar-link">
          Contact
        </Link>
        {isLoggedIn ? (
          <Link
            to={userType === 'admin' ? '/admin-dashboard' : '/student-dashboard'}
            className="navbar-link"
          >
            Dashboard
          </Link>
        ) : (
          <Link to="/login" className="navbar-link">
            Login
          </Link>
        )}
        {isLoggedIn ? (
          <button onClick={handleLogout} className="navbar-link btn-logout">
            Logout
          </button>
        ) : (
          <Link to="/signup" className="navbar-link">
            Sign Up
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 