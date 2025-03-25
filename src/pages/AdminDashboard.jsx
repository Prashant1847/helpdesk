import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [queries, setQueries] = useState([]);
  const [selectedQuery, setSelectedQuery] = useState(null);
  const [response, setResponse] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData || JSON.parse(userData).role !== 'admin') {
      navigate('/admin-login');
      return;
    }
    setUser(JSON.parse(userData));
    fetchQueries();
  }, [navigate]);

  const fetchQueries = async () => {
    try {
      // TODO: Replace with actual API call
      const response = await fetch('/api/admin/queries', {
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

  const handleStatusChange = async (queryId, newStatus) => {
    try {
      // TODO: Replace with actual API call
      const response = await fetch(`/api/admin/queries/${queryId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      
      setQueries(queries.map(q => 
        q.id === queryId ? { ...q, status: newStatus } : q
      ));
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  const handleSubmitResponse = async (e) => {
    e.preventDefault();
    if (!selectedQuery || !response.trim()) return;

    try {
      // TODO: Replace with actual API call
      const apiResponse = await fetch(`/api/admin/queries/${selectedQuery.id}/response`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ response })
      });
      const data = await apiResponse.json();
      if (!apiResponse.ok) throw new Error(data.message);
      
      setQueries(queries.map(q => 
        q.id === selectedQuery.id ? { ...q, response, status: 'resolved' } : q
      ));
      setSelectedQuery(null);
      setResponse('');
    } catch (error) {
      console.error('Failed to submit response:', error);
    }
  };

  const filteredQueries = queries.filter(query => {
    if (filter === 'all') return true;
    return query.status === filter;
  });

  return (
    <div className="admin-dashboard-container">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <div className="filter-section">
          <label htmlFor="status-filter">Filter by Status:</label>
          <select
            id="status-filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Queries</option>
            <option value="pending">Pending</option>
            <option value="inProgress">In Progress</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
          </select>
        </div>
      </div>

      <div className="admin-content">
        <div className="queries-list">
          <h2>Student Queries ({filteredQueries.length})</h2>
          {filteredQueries.map((query) => (
            <div 
              key={query.id} 
              className={`query-item ${selectedQuery?.id === query.id ? 'selected' : ''}`}
              onClick={() => setSelectedQuery(query)}
            >
              <div className="query-header">
                <h3>{query.subject}</h3>
                <span className={`status-badge status-${query.status}`}>
                  {query.status}
                </span>
              </div>
              <p className="query-preview">{query.description}</p>
              <div className="query-meta">
                <span>From: {query.studentName}</span>
                <span>Date: {new Date(query.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>

        {selectedQuery && (
          <div className="query-details">
            <h2>Query Details</h2>
            <div className="detail-card">
              <div className="detail-header">
                <h3>{selectedQuery.subject}</h3>
                <select
                  value={selectedQuery.status}
                  onChange={(e) => handleStatusChange(selectedQuery.id, e.target.value)}
                >
                  <option value="pending">Pending</option>
                  <option value="inProgress">In Progress</option>
                  <option value="resolved">Resolved</option>
                  <option value="closed">Closed</option>
                </select>
              </div>
              <div className="detail-content">
                <p>{selectedQuery.description}</p>
                <div className="student-info">
                  <strong>Student Information:</strong>
                  <p>Name: {selectedQuery.studentName}</p>
                  <p>Email: {selectedQuery.studentEmail}</p>
                  <p>Registration: {selectedQuery.registrationNumber}</p>
                </div>
                {selectedQuery.response && (
                  <div className="previous-response">
                    <strong>Previous Response:</strong>
                    <p>{selectedQuery.response}</p>
                  </div>
                )}
              </div>
              <form onSubmit={handleSubmitResponse} className="response-form">
                <div className="form-group">
                  <label htmlFor="response">Your Response</label>
                  <textarea
                    id="response"
                    value={response}
                    onChange={(e) => setResponse(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Submit Response
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard; 