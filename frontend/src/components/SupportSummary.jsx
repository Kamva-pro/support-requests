import React from 'react';

const SupportSummary = ({ tickets }) => {
  const openTickets = tickets.filter(ticket => ticket.status === 'open');
  const inProgressTickets = tickets.filter(ticket => ticket.status === 'in-progress');
  const resolvedTickets = tickets.filter(ticket => ticket.status === 'resolved');
  const closedTickets = tickets.filter(ticket => ticket.status === 'closed');
  
  const urgentTickets = tickets.filter(ticket => ticket.priority === 'urgent' && ticket.status !== 'closed');
  const highPriorityTickets = tickets.filter(ticket => ticket.priority === 'high' && ticket.status !== 'closed');
  
  const calculateAvgResolutionTime = () => {
    const closedTicketsWithTime = closedTickets.filter(t => t.createdAt && t.updatedAt);
    if (closedTicketsWithTime.length === 0) return 0;
    
    const totalTime = closedTicketsWithTime.reduce((total, ticket) => {
      const created = new Date(ticket.createdAt);
      const updated = new Date(ticket.updatedAt);
      return total + (updated - created);
    }, 0);
    
    return Math.round(totalTime / closedTicketsWithTime.length / (1000 * 60 * 60 * 24));
  };
  
  return (
    <div className="support-summary">
      <h3>Support Summary</h3>
      <div className="summary-cards">
        <div className="summary-card">
          <div className="card-icon open">
            <i className="fas fa-folder-open"></i>
          </div>
          <div className="card-info">
            <span className="card-count">{openTickets.length}</span>
            <span className="card-label">Open Tickets</span>
          </div>
        </div>
        
        <div className="summary-card">
          <div className="card-icon progress">
            <i className="fas fa-tasks"></i>
          </div>
          <div className="card-info">
            <span className="card-count">{inProgressTickets.length}</span>
            <span className="card-label">In Progress</span>
          </div>
        </div>
        
        <div className="summary-card">
          <div className="card-icon urgent">
            <i className="fas fa-exclamation-circle"></i>
          </div>
          <div className="card-info">
            <span className="card-count">{urgentTickets.length}</span>
            <span className="card-label">Urgent</span>
          </div>
        </div>
        
        <div className="summary-card">
          <div className="card-icon resolved">
            <i className="fas fa-check-circle"></i>
          </div>
          <div className="card-info">
            <span className="card-count">{resolvedTickets.length + closedTickets.length}</span>
            <span className="card-label">Resolved</span>
          </div>
        </div>
      </div>
      
      <div className="summary-details">
        <div className="detail-item">
          <span>High Priority Tickets:</span>
          <span className="detail-value">{highPriorityTickets.length}</span>
        </div>
        <div className="detail-item">
          <span>Average Resolution Time:</span>
          <span className="detail-value">{calculateAvgResolutionTime()} days</span>
        </div>
        <div className="detail-item">
          <span>Total Tickets:</span>
          <span className="detail-value">{tickets.length}</span>
        </div>
      </div>
    </div>
  );
};

export default SupportSummary;