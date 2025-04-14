import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Editor } from '@monaco-editor/react';

const TestPage = () => {
    const { testId } = useParams();
    const [test, setTest] = useState(null);
    const [code, setCode] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchTest = async () => {
            try {
                const response = await axios.get(`/api/tests/${testId}`);
                setTest(response.data);
                // Set default code template
                setCode(`<!DOCTYPE html>
<html>
<head>
    <title>Form Validation</title>
    <style>
        .error {
            color: red;
            font-size: 12px;
            margin-top: 5px;
        }
    </style>
</head>
<body>
    <form id="myForm">
        <!-- Your code here -->
    </form>
    <script>
        // Your JavaScript validation code here
    </script>
</body>
</html>`);
            } catch (error) {
                console.error('Error fetching test:', error);
            }
        };
        fetchTest();
    }, [testId]);

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const response = await axios.post('/api/tests/submit', {
                testId,
                code
            });
            setResult(response.data);
        } catch (error) {
            console.error('Error submitting test:', error);
            setResult({ error: 'Submission failed' });
        }
        setLoading(false);
    };

    if (!test) return <div>Loading...</div>;

    return (
        <div className="test-page">
            <h1>{test.title}</h1>
            <p>{test.description}</p>
            <div className="problem-statement">
                <h2>Problem Statement</h2>
                <pre>{test.problemStatement}</pre>
            </div>
            
            <div className="editor-container">
                <h2>Your Solution</h2>
                <Editor
                    height="400px"
                    defaultLanguage="html"
                    value={code}
                    onChange={setCode}
                    theme="vs-dark"
                />
            </div>

            <button 
                onClick={handleSubmit}
                disabled={loading}
                className="submit-button"
            >
                {loading ? 'Submitting...' : 'Submit Solution'}
            </button>

            {result && (
                <div className="result">
                    <h2>Results</h2>
                    <p>Score: {result.score}/{test.maxScore}</p>
                    {result.results && (
                        <div className="test-cases">
                            {result.results.test_cases.map((testCase, index) => (
                                <div key={index} className={`test-case ${testCase.status.id === 3 ? 'passed' : 'failed'}`}>
                                    <p>Test Case {index + 1}: {testCase.status.description}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default TestPage; 