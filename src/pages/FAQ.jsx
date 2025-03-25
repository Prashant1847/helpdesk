import { useState } from 'react';
import './FAQ.css';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "How do I submit a query?",
      answer: "To submit a query, first log in to your student account. Once logged in, navigate to the dashboard and click on the 'New Query' button. Fill in the required details about your query and submit the form."
    },
    {
      question: "How long does it take to get a response?",
      answer: "We aim to respond to all queries within 24-48 hours during working days. However, complex queries might take longer to resolve. You can always check the status of your query in your dashboard."
    },
    {
      question: "What should I do if I don't receive a response?",
      answer: "If you haven't received a response within 48 hours, you can: 1) Check your query status in the dashboard, 2) Submit a follow-up message, or 3) Contact the support team directly through the Contact page."
    },
    {
      question: "Can I modify my query after submission?",
      answer: "No, you cannot modify a query once it's submitted. However, you can add additional information or context by submitting a follow-up message to the same query thread."
    },
    {
      question: "What types of queries can I submit?",
      answer: "You can submit queries related to academics, administration, examinations, facilities, and general student services. Please ensure your query is specific and includes all relevant details for faster resolution."
    },
    {
      question: "How do I track my query status?",
      answer: "You can track your query status through your student dashboard. Each query will show its current status (Pending, In Progress, Resolved, or Closed) and any responses from the administrative team."
    },
    {
      question: "Can I submit multiple queries?",
      answer: "Yes, you can submit multiple queries. However, please ensure each query is unique and not a duplicate of an existing one. This helps us maintain efficient response times for all students."
    },
    {
      question: "What are the different query priority levels?",
      answer: "Queries can be marked as High, Medium, or Low priority. High priority should be used for urgent matters requiring immediate attention, Medium for standard requests, and Low for general inquiries or suggestions."
    },
    {
      question: "How do I close a resolved query?",
      answer: "Once your query is marked as 'Resolved' by the administrative team, you can either: 1) Mark it as 'Closed' if you're satisfied with the resolution, or 2) Reopen it with additional comments if you need further assistance."
    },
    {
      question: "Is my query information confidential?",
      answer: "Yes, all query information is confidential and can only be accessed by you and authorized administrative staff. We follow strict data protection protocols to ensure your privacy."
    }
  ];

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
      <div className="faq-header">
        <h1>Frequently Asked Questions</h1>
        <p>Find answers to common questions about the VIT Query System</p>
      </div>

      <div className="faq-content">
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`faq-item ${activeIndex === index ? 'active' : ''}`}
            >
              <button 
                className="faq-question"
                onClick={() => toggleAccordion(index)}
              >
                {faq.question}
                <span className="faq-icon">
                  {activeIndex === index ? '−' : '+'}
                </span>
              </button>
              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="faq-footer">
          <h3>Still have questions?</h3>
          <p>If you cannot find answer to your question in our FAQ, you can always contact us.</p>
          <a href="/contact" className="btn btn-primary">Contact Us</a>
        </div>
      </div>
    </div>
  );
};

export default FAQ; 