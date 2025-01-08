import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ParentPage from './pages/ParentPage';
import StudentPage from './pages/StudentPage';
import Sidebar from './components/Sidebar';

function App() {

  return (
    <Router>
      <div className="d-flex container-fluid">
        <Sidebar />
        <div className="mx-4   flex-grow-1">
          <Routes>
            <Route path="/" element={<ParentPage />} />
            <Route path="/parent" element={<ParentPage />} />
            <Route path="/student" element={<StudentPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;