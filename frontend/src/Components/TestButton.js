import React from 'react';
import { useNavigate } from 'react-router-dom';
import './TestButton.css';

const TestButton = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/tests');
    };

    return (
        <button 
            className="test-button"
            onClick={handleClick}
        >
            Take Test
        </button>
    );
};

export default TestButton; 