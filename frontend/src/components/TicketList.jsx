import React from 'react';
import TicketItem from './TicketItem';

const TicketList = ({ tickets, onUpdateTicket, onDeleteTicket }) => {
  const openTickets = tickets.filter(ticket => ticket.status !== 'closed');
  const closedTickets = tickets.filter(ticket => ticket.status === 'closed');

  return (
    <div className="ticket-list">
      <div className="ticket-section">
        <h3>Open Tickets ({openTickets.length})</h3>
        {openTickets.length === 0 ? (
          <p className="no-tickets">No open tickets</p>
        ) : (
          openTickets.map(ticket => (
            <TicketItem 
              key={ticket.id} 
              ticket={ticket} 
              onUpdate={onUpdateTicket}
              onDelete={onDeleteTicket}
            />
          ))
        )}
      </div>
      
      <div className="ticket-section">
        <h3>Closed Tickets ({closedTickets.length})</h3>
        {closedTickets.length === 0 ? (
          <p className="no-tickets">No closed tickets</p>
        ) : (
          closedTickets.map(ticket => (
            <TicketItem 
              key={ticket.id} 
              ticket={ticket} 
              onUpdate={onUpdateTicket}
              onDelete={onDeleteTicket}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TicketList;