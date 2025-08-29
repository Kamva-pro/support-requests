import React, { useState, useEffect } from 'react';
import TicketForm from '../components/TicketForm';
import TicketList from '../components/TicketList';
import SupportSummary from '../components/SupportSummary';
import '../Dashboard.css';

const Dashboard = () => {
  const [tickets, setTickets] = useState([]);
  const [activeTab, setActiveTab] = useState('summary');

  useEffect(() => {
    const savedTickets = localStorage.getItem('supportTickets');
    if (savedTickets) {
      setTickets(JSON.parse(savedTickets));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('supportTickets', JSON.stringify(tickets));
  }, [tickets]);

  const handleNewTicket = (newTicket) => {
    setTickets([newTicket, ...tickets]);
  };

  const handleUpdateTicket = (id, updatedTicket) => {
    setTickets(tickets.map(ticket => 
      ticket.id === id ? updatedTicket : ticket
    ));
  };

  const handleDeleteTicket = (id) => {
    setTickets(tickets.filter(ticket => ticket.id !== id));
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Dynamite Website Support</h1>
        <p>Manage your support requests and track their status</p>
      </header>

      <div className="dashboard-tabs">
        <button 
          className={activeTab === 'summary' ? 'active' : ''}
          onClick={() => setActiveTab('summary')}
        >
          <i className="fas fa-chart-pie"></i> Summary
        </button>
        <button 
          className={activeTab === 'new' ? 'active' : ''}
          onClick={() => setActiveTab('new')}
        >
          <i className="fas fa-plus-circle"></i> New Ticket
        </button>
        <button 
          className={activeTab === 'tickets' ? 'active' : ''}
          onClick={() => setActiveTab('tickets')}
        >
          <i className="fas fa-ticket-alt"></i> My Tickets ({tickets.length})
        </button>
      </div>

      <div className="dashboard-content">
        {activeTab === 'summary' && (
          <div className="tab-content">
            <SupportSummary tickets={tickets} />
          </div>
        )}
        
        {activeTab === 'new' && (
          <div className="tab-content">
            <TicketForm onSubmit={handleNewTicket} />
          </div>
        )}
        
        {activeTab === 'tickets' && (
          <div className="tab-content">
            <TicketList 
              tickets={tickets} 
              onUpdateTicket={handleUpdateTicket}
              onDeleteTicket={handleDeleteTicket}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;