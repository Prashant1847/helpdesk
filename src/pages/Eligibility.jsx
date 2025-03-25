import './Eligibility.css';

const Eligibility = () => {
  const eligibilityCriteria = [
    {
      title: "Student Status",
      description: "Must be a currently enrolled student at VIT University",
      requirements: [
        "Valid student registration number",
        "Active semester registration",
        "No academic holds on account"
      ]
    },
    {
      title: "Account Requirements",
      description: "Must have a verified VIT Query System account",
      requirements: [
        "Verified institutional email address",
        "Complete profile information",
        "Accepted terms of service"
      ]
    },
    {
      title: "Query Guidelines",
      description: "Queries must follow the established guidelines",
      requirements: [
        "Clear and specific query description",
        "Relevant supporting documentation (if required)",
        "Appropriate category selection",
        "Professional and respectful communication"
      ]
    }
  ];

  const queryTypes = [
    {
      category: "Academic",
      examples: [
        "Course registration issues",
        "Grade disputes",
        "Academic calendar queries",
        "Faculty-related concerns"
      ]
    },
    {
      category: "Administrative",
      examples: [
        "Document requests",
        "Fee-related queries",
        "ID card issues",
        "Registration problems"
      ]
    },
    {
      category: "Technical",
      examples: [
        "VTOP access issues",
        "Online portal problems",
        "Wi-Fi connectivity",
        "Lab-related queries"
      ]
    },
    {
      category: "Facilities",
      examples: [
        "Hostel maintenance",
        "Library services",
        "Sports facilities",
        "Transportation"
      ]
    }
  ];

  return (
    <div className="eligibility-container">
      <div className="eligibility-header">
        <h1>Query Submission Eligibility</h1>
        <p>
          Before submitting a query, please ensure you meet all the eligibility
          criteria and understand the query guidelines.
        </p>
      </div>

      <section className="criteria-section">
        <h2>Eligibility Criteria</h2>
        <div className="criteria-grid">
          {eligibilityCriteria.map((criteria, index) => (
            <div key={index} className="criteria-card">
              <h3>{criteria.title}</h3>
              <p>{criteria.description}</p>
              <ul>
                {criteria.requirements.map((req, reqIndex) => (
                  <li key={reqIndex}>{req}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="query-types-section">
        <h2>Acceptable Query Types</h2>
        <div className="query-types-grid">
          {queryTypes.map((type, index) => (
            <div key={index} className="query-type-card">
              <h3>{type.category}</h3>
              <ul>
                {type.examples.map((example, exIndex) => (
                  <li key={exIndex}>{example}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="submission-process">
        <h2>Submission Process</h2>
        <div className="process-steps">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Verify Eligibility</h3>
            <p>Ensure you meet all the eligibility criteria listed above.</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Prepare Information</h3>
            <p>Gather all necessary information and documentation for your query.</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Submit Query</h3>
            <p>Log in to your account and submit your query through the dashboard.</p>
          </div>
          <div className="step">
            <div className="step-number">4</div>
            <h3>Track Progress</h3>
            <p>Monitor your query status and respond to any follow-up questions.</p>
          </div>
        </div>
      </section>

      <section className="important-notes">
        <h2>Important Notes</h2>
        <ul>
          <li>All queries must be submitted in English.</li>
          <li>Provide accurate and complete information to ensure quick resolution.</li>
          <li>Maintain professional communication throughout the process.</li>
          <li>Check your email regularly for updates on your query.</li>
          <li>Multiple similar queries from the same student will be merged.</li>
        </ul>
      </section>

      <div className="eligibility-footer">
        <p>Ready to submit a query?</p>
        <div className="footer-buttons">
          <a href="/login" className="btn btn-primary">Login to Submit</a>
          <a href="/contact" className="btn btn-secondary">Contact Support</a>
        </div>
      </div>
    </div>
  );
};

export default Eligibility; 