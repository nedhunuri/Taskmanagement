import TaskList from './Tasks/TaskList';

import React, { useState, useEffect } from 'react';

const Dashboard = () => {
    const [upcomingTasks, setUpcomingTasks] = useState([]);
    const [overdueTasks, setOverdueTasks] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const storedTasks = localStorage.getItem('tasks');
        const parsedTasks = storedTasks ? JSON.parse(storedTasks) : [];
        setTasks(parsedTasks);
    }, []);

    useEffect(() => {
        if (tasks.length > 0) {
            const currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
            const upcoming = tasks.filter(task => task.dueDate > currentDate);
            const overdue = tasks.filter(task => task.dueDate < currentDate);
            const completed = tasks.filter(task => task.dueDate === currentDate);

            setUpcomingTasks(upcoming);
            setOverdueTasks(overdue);
            setCompletedTasks(completed);
        }
    }, [tasks]);

    return (
        <>
        <div className="container mt-5">
            <h1 className="mt-3 mb-4">Dashboard</h1>
            <div className="row">
                <div className="col">
                    <div className="card">
                        <div className="card-header bg-primary text-white">
                            Upcoming Tasks
                        </div>
                        <ul className="list-group list-group-flush">
                            {upcomingTasks.map(task => (
                                <li className="list-group-item" key={task.taskId}>{task.title}</li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="col">
                    <div className="card">
                        <div className="card-header bg-warning">
                            Overdue Tasks
                        </div>
                        <ul className="list-group list-group-flush">
                            {overdueTasks.map(task => (
                                <li className="list-group-item" key={task.taskId}>{task.title}</li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="col">
                    <div className="card">
                        <div className="card-header bg-success text-white">
                            Completed Tasks
                        </div>
                        <ul className="list-group list-group-flush">
                            {completedTasks.map(task => (
                                <li className="list-group-item" key={task.taskId}>{task.title}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <TaskList/>
        </>
        
    );
};

export default Dashboard;
