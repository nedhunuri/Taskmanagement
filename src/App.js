// import logo from './logo.svg';
// import './App.css';
// import Dashborad from './Dashborad';

// function App() {
//   return (
//     <div className="App">
//     <Dashborad/>
//     </div>
//   );
// }

// export default App;
import React from 'react';
import { Route,Routes, Switch, BrowserRouter } from 'react-router-dom';
import TaskList from './Tasks/TaskList';
import AddTask from './Tasks/AddTask';
import Dashboard from './Dashborad';
import EditTask from './Tasks/EditTask';

function App() {
  return (
    <BrowserRouter>

    <Routes>

      {/* <Route path="/" element={<Login/>}/> */}

      <Route path="/" element={<Dashboard />} />
      <Route path="/add-task" element={<AddTask />} />
      <Route path="/edit-task/:id" element={<EditTask />} />

    </Routes>
  </BrowserRouter>
  );
}

export default App;
