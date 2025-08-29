import React, { useState } from 'react';

const TicketItem = ({ ticket, onUpdate, onDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'low': return 'priority-low';
      case 'medium': return 'priority-medium';
      case 'high': return 'priority-high';
      case 'urgent': return 'priority-urgent';
      default: return '';
    }
  };
  
  const getStatusClass = (status) => {
    switch (status) {
      case 'open': return 'status-open';
      case 'in-progress': return 'status-in-progress';
      case 'resolved': return 'status-resolved';
      case 'closed': return 'status-closed';
      default: return '';
    }
  };
  
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  const calculateTimeLeft = (createdAt) => {
    const created = new Date(createdAt);
    const now = new Date();
    const diffTime = Math.abs(now - created);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    // Assuming SLA is 7 days for all tickets
    const slaDays = 7;
    const daysLeft = slaDays - diffDays;
    
    if (daysLeft <= 0) return { text: 'SLA Breached', class: 'sla-breached' };
    if (daysLeft <= 2) return { text: `${daysLeft} days left`, class: 'sla-warning' };
    return { text: `${daysLeft} days left`, class: 'sla-ok' };
  };
  
  const timeLeft = calculateTimeLeft(ticket.createdAt);
  
  const handleStatusChange = (newStatus) => {
    onUpdate(ticket.id, { ...ticket, status: newStatus, updatedAt: new Date() });
  };
  
  return (
    <div className={`ticket-item ${isExpanded ? 'expanded' : ''}`}>
      <div className="ticket-header" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="ticket-info">
          <span className="ticket-id">#{ticket.id.toString().slice(-4)}</span>
          <h4 className="ticket-title">{ticket.title}</h4>
          <span className={`priority-badge ${getPriorityClass(ticket.priority)}`}>
            {ticket.priority}
          </span>
          <span className={`status-badge ${getStatusClass(ticket.status)}`}>
            {ticket.status}
          </span>
          <span className={`sla-badge ${timeLeft.class}`}>
            {timeLeft.text}
          </span>
        </div>
        <div className="ticket-actions">
          <span className="ticket-date">{formatDate(ticket.updatedAt)}</span>
          <button 
            className="icon-btn" 
            onClick={(e) => {
              e.stopPropagation();
              onDelete(ticket.id);
            }}
            aria-label="Delete ticket"
          >
            <i className="fas fa-trash"></i>
          </button>
        </div>
      </div>
      
      {isExpanded && (
        <div className="ticket-details">
          <p className="ticket-description">{ticket.description}</p>
          <div className="ticket-meta">
            <span>Category: {ticket.category}</span>
            <span>Created: {formatDate(ticket.createdAt)}</span>
          </div>
          
          {ticket.status !== 'closed' && (
            <div className="ticket-action-buttons">
              <label>Update Status:</label>
              <div className="status-buttons">
                {ticket.status !== 'in-progress' && (
                  <button 
                    className="btn-in-progress"
                    onClick={() => handleStatusChange('in-progress')}
                  >
                    Mark as In Progress
                  </button>
                )}
                {ticket.status !== 'resolved' && (
                  <button 
                    className="btn-resolved"
                    onClick={() => handleStatusChange('resolved')}
                  >
                    Mark as Resolved
                  </button>
                )}
                <button 
                  className="btn-closed"
                  onClick={() => handleStatusChange('closed')}
                >
                  Close Ticket
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TicketItem;