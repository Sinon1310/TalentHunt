import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Components/Dashboard';
import TestsList from './Components/TestsList';
import TestPage from './Components/TestPage';
import Login from './Components/Login';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/tests" element={<TestsList />} />
                <Route path="/test/:testId" element={<TestPage />} />
            </Routes>
        </Router>
    );
}

export default App; 