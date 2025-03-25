import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './StudentDashboard.css';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [queries, setQueries] = useState([]);
  const [newQuery, setNewQuery] = useState({
    subject: '',
    description: '',
    priority: 'medium'
  });
  const [showNewQueryForm, setShowNewQueryForm] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/login');
      return;
    }
    setUser(JSON.parse(userData));
    // TODO: Fetch user's queries from API
    fetchQueries();
  }, [navigate]);

  const fetchQueries = async () => {
    try {
      // TODO: Replace with actual API call
      const response = await fetch('/api/queries', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      setQueries(data.queries);
    } catch (error) {
      console.error('Failed to fetch queries:', error);
    }
  };

  const handleSubmitQuery = async (e) => {
    e.preventDefault();
    try {
      // TODO: Replace with actual API call
      const response = await fetch('/api/queries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(newQuery)
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      
      setQueries([...queries, data.query]);
      setNewQuery({ subject: '', description: '', priority: 'medium' });
      setShowNewQueryForm(false);
    } catch (error) {
      console.error('Failed to submit query:', error);
    }
  };

  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'high': return 'priority-high';
      case 'medium': return 'priority-medium';
      case 'low': return 'priority-low';
      default: return '';
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Welcome, {user?.name}</h1>
        <button 
          className="btn btn-primary"
          onClick={() => setShowNewQueryForm(true)}
        >
          New Query
        </button>
      </div>

      {showNewQueryForm && (
        <div className="query-form-container">
          <h2>Submit New Query</h2>
          <form onSubmit={handleSubmitQuery}>
            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                value={newQuery.subject}
                onChange={(e) => setNewQuery({...newQuery, subject: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                value={newQuery.description}
                onChange={(e) => setNewQuery({...newQuery, description: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="priority">Priority</label>
              <select
                id="priority"
                value={newQuery.priority}
                onChange={(e) => setNewQuery({...newQuery, priority: e.target.value})}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div className="form-actions">
              <button type="submit" className="btn btn-primary">Submit Query</button>
              <button 
                type="button" 
                className="btn btn-secondary"
                onClick={() => setShowNewQueryForm(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="queries-section">
        <h2>Your Queries</h2>
        {queries.length === 0 ? (
          <p className="no-queries">No queries submitted yet.</p>
        ) : (
          <div className="queries-grid">
            {queries.map((query) => (
              <div key={query.id} className="query-card">
                <div className={`query-priority ${getPriorityClass(query.priority)}`}>
                  {query.priority}
                </div>
                <h3>{query.subject}</h3>
                <p>{query.description}</p>
                <div className="query-status">
                  Status: <span className={`status-${query.status}`}>{query.status}</span>
                </div>
                {query.response && (
                  <div className="query-response">
                    <strong>Response:</strong>
                    <p>{query.response}</p>
                  </div>
                )}
                <div className="query-date">
                  Submitted: {new Date(query.createdAt).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard; 