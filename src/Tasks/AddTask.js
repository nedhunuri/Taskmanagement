import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddTask = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('Low');

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();

    const existingTasks = JSON.parse(localStorage.getItem('tasks')) || [];

    const maxTaskId = existingTasks.reduce((maxId, task) => Math.max(maxId, task.taskId), 0);

    // Create new object
    const newTask = {
      taskId: maxTaskId + 1,
      title,
      description,
      dueDate,
      priority
    };

    // Add new task to existing tasks
    const updatedTasks = [...existingTasks, newTask];

    localStorage.setItem('tasks', JSON.stringify(updatedTasks));

    setTitle('');
    setDescription('');
    setDueDate('');
    setPriority('Low');

    navigate('/')
  }





  return (
    <div className="container">
      <h2 className="my-4">Add New Task</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" className="form-control" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea className="form-control" id="description" rows="3" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="dueDate" className="form-label">Due Date</label>
          <input type="date" className="form-control" id="dueDate" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label htmlFor="priority" className="form-label">Priority</label>
          <select className="form-select" id="priority" value={priority} onChange={(e) => setPriority(e.target.value)} required>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Add Task</button>
      </form>
    </div>
  );
}

export default AddTask;
