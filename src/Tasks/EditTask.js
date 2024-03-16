import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditTask = () => {
  const [editedTitle, setEditedTitle] = useState('');
  const [editedDescription, setEditedDescription] = useState('');
  const [editedDueDate, setEditedDueDate] = useState('');
  const [editedPriority, setEditedPriority] = useState('');
  const [editedTask, setEditedTask] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');

    const tasks = storedTasks ? JSON.parse(storedTasks) : [];

    const task = tasks.find(task => task.taskId === parseInt(id));

    setEditedTask(task);

    if (task) {
      setEditedTitle(task.title);
      setEditedDescription(task.description);
      setEditedDueDate(task.dueDate);
      setEditedPriority(task.priority);
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const storedTasks = localStorage.getItem('tasks');
    
    const tasks = storedTasks ? JSON.parse(storedTasks) : [];
    
    const taskIndex = tasks.findIndex(task => task.taskId === parseInt(id));
    
    if (taskIndex !== -1) {
      tasks[taskIndex] = {
        taskId: parseInt(id),
        title: editedTitle,
        description: editedDescription,
        dueDate: editedDueDate,
        priority: editedPriority
      };
  
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  
    navigate('/');
  };

  if (!editedTask) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h2 className="my-4">Edit Task</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="editedTitle" className="form-label">Title</label>
          <input type="text" className="form-control" id="editedTitle" value={editedTitle} onChange={(e) => setEditedTitle(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label htmlFor="editedDescription" className="form-label">Description</label>
          <textarea className="form-control" id="editedDescription" rows="3" value={editedDescription} onChange={(e) => setEditedDescription(e.target.value)} required></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="editedDueDate" className="form-label">Due Date</label>
          <input type="date" className="form-control" id="editedDueDate" value={editedDueDate} onChange={(e) => setEditedDueDate(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label htmlFor="editedPriority" className="form-label">Priority</label>
          <select className="form-select" id="editedPriority" value={editedPriority} onChange={(e) => setEditedPriority(e.target.value)} required>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Save Changes</button>
      </form>
    </div>
  );
}

export default EditTask;
