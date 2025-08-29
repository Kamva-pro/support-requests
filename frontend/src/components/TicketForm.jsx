import React, { useState } from 'react';

const TicketForm = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  
  const [priority, setPriority] = useState('medium');
  const [category, setCategory] = useState('technical');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description) return;
    
    const newTicket = {
      id: Date.now(),
      title,
      description,
      priority,
      category,
      status: 'open',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    onSubmit(newTicket);
    setTitle('');
    setDescription('');
    setPriority('medium');
    setCategory('technical');
  };

  return (
    <div className="ticket-form">
      <h3>Create New Support Ticket</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Brief description of your issue"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Detailed description of your issue..."
            rows="4"
            required
          ></textarea>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="priority">Priority</label>
            <select
              id="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="technical">Technical</option>
              <option value="billing">Billing</option>
              <option value="account">Account</option>
              <option value="general">General</option>
            </select>
          </div>
        </div>
        
        <button type="submit" className="submit-btn">Submit Ticket</button>
      </form>
    </div>
  );
};

export default TicketForm;