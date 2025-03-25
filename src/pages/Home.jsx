import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <section className="hero-section">
        <h1>Welcome to VIT Query System</h1>
        <p>Your one-stop solution for all academic queries and support</p>
        <div className="hero-buttons">
          <Link to="/login" className="btn btn-primary">
            Login
          </Link>
          <Link to="/signup" className="btn btn-secondary">
            Sign Up
          </Link>
        </div>
      </section>

      <section className="features-section">
        <h2>Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>Easy Query Submission</h3>
            <p>Submit your academic queries easily and track their status</p>
          </div>
          <div className="feature-card">
            <h3>Quick Response</h3>
            <p>Get quick responses from faculty and administrators</p>
          </div>
          <div className="feature-card">
            <h3>Query History</h3>
            <p>Access your query history and previous interactions</p>
          </div>
          <div className="feature-card">
            <h3>24/7 Support</h3>
            <p>Get support anytime, anywhere through our platform</p>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <h2>Ready to Get Started?</h2>
        <p>Join our community of students and get your queries resolved</p>
        <Link to="/signup" className="btn btn-primary">
          Create Account
        </Link>
      </section>
    </div>
  );
};

export default Home; 