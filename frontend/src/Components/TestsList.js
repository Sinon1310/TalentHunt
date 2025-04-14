import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './TestsList.css';

const TestsList = () => {
    const [tests, setTests] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTests = async () => {
            try {
                const response = await axios.get('/api/tests');
                setTests(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching tests:', error);
                setLoading(false);
            }
        };
        fetchTests();
    }, []);

    const handleTestClick = (testId) => {
        navigate(`/test/${testId}`);
    };

    if (loading) return <div>Loading tests...</div>;

    return (
        <div className="tests-list">
            <h1>Available Tests</h1>
            <div className="tests-grid">
                {tests.map(test => (
                    <div 
                        key={test._id} 
                        className="test-card"
                        onClick={() => handleTestClick(test._id)}
                    >
                        <h2>{test.title}</h2>
                        <p>{test.description}</p>
                        <div className="test-info">
                            <span>Language: {test.language}</span>
                            <span>Max Score: {test.maxScore}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TestsList; 