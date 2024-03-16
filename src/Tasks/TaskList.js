import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterPriority, setFilterPriority] = useState('All');

    const navigate = useNavigate();

    useEffect(() => {

        // Retrieve tasks from localStorage
        const storedTasks = localStorage.getItem('tasks');

        const parsedTasks = storedTasks ? JSON.parse(storedTasks) : [];

        setTasks(parsedTasks);

    }, [])

    const editTask = (id) => {
        console.log(id);
        navigate(`/edit-task/${id}`);
    };

    // Function to delete a task
    const deleteTask = (taskId) => {
        const existingTasks = JSON.parse(localStorage.getItem('tasks')) || [];

        const filteredTasks = existingTasks.filter(task => task.taskId !== taskId);

        localStorage.setItem('tasks', JSON.stringify(filteredTasks));

        setTasks(filteredTasks);
    };

    const updatePriority = (taskId, priority) => {
        const updatedTasks = tasks.map(task => {
            if (task.taskId === taskId) {
                return { ...task, priority };
            }
            return task;
        });
        setTasks(updatedTasks);

        const existingTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const updatedLocalStorageTasks = existingTasks.map(task => {
            if (task.taskId === taskId) {
                return { ...task, priority };
            }
            return task;
        });
        localStorage.setItem('tasks', JSON.stringify(updatedLocalStorageTasks));

        toast.success('Priority updated successfully!');
    };

    const filteredTasks = tasks.filter(task => {
        const matchSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchPriority = filterPriority === 'All' || task.priority === filterPriority;
        return matchSearch && matchPriority;
    });

    const handleAddTask = () => {
        navigate('./add-task');
    };

    return (
        <div className="container">
            <ToastContainer />
            <h2 className="my-4">Task List</h2>
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search tasks..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <select
                    className="form-select"
                    value={filterPriority}
                    onChange={(e) => setFilterPriority(e.target.value)}
                >
                    <option value="All">All Priorities</option>
                    <option value="Low">Low Priority</option>
                    <option value="Medium">Medium Priority</option>
                    <option value="High">High Priority</option>
                </select>
            </div>
            <br />
            <div style={{ textAlign: "right" }}>
                <button className="btn btn-primary btn-sm mx-1" onClick={handleAddTask}>Add Task</button>
            </div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Task ID</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Due Date</th>
                        <th>Priority</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredTasks.length === 0 ? (
                        <tr>
                            <td className="6">No tasks available</td>
                        </tr>
                    ) :
                        (filteredTasks.map(task => (
                            <tr key={task.taskId}>
                                <td>{task.taskId}</td>
                                <td>{task.title}</td>
                                <td>{task.description}</td>
                                <td>{task.dueDate}</td>
                                <td>
                                    <select
                                        className="form-select"
                                        value={task.priority}
                                        onChange={(e) => updatePriority(task.taskId, e.target.value)}
                                    >
                                        <option value="Low">Low</option>
                                        <option value="Medium">Medium</option>
                                        <option value="High">High</option>
                                    </select>
                                </td>
                                <td>
                                    <div className="d-inline">
                                        <button className="btn btn-primary btn-sm mx-1" onClick={() => editTask(task.taskId)}>Edit</button>
                                        <button className="btn btn-danger btn-sm mx-1" onClick={() => deleteTask(task.taskId)}>Delete</button>
                                    </div>
                                </td>
                            </tr>
                        )))}
                </tbody>
            </table>
        </div>
    );
}

export default TaskList;
