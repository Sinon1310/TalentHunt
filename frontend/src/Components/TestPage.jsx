import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import MonacoEditor from '@monaco-editor/react';

const TestPage = () => {
    const { testId } = useParams();
    const navigate = useNavigate();
    const [test, setTest] = useState(null);
    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTest = async () => {
            try {
                const response = await axios.get(`http://localhost:5002/tests/${testId}`);
                console.log('Test fetched:', response.data);
                setTest(response.data);
                // Set initial template
                setCode(`<!DOCTYPE html>
<html>
<head>
    <title>Form Validation</title>
    <style>
        .error { color: red; font-size: 12px; }
    </style>
</head>
<body>
    <!-- Write your code here -->

    <script>
        // Write your JavaScript code here
    </script>
</body>
</html>`);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching test:', error);
                setError('Failed to load test. Please try again later.');
                setLoading(false);
            }
        };

        fetchTest();
    }, [testId]);

    const handleSubmit = async () => {
        setSubmitting(true);
        try {
            const response = await axios.post('http://localhost:5002/tests/submit', {
                testId,
                code
            });
            setResult(response.data);
        } catch (error) {
            setError('Failed to submit test. Please try again.');
            console.error('Error submitting test:', error);
        }
        setSubmitting(false);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-xl text-gray-600">Loading test...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-xl text-red-600">{error}</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4">
                <div className="mb-8">
                    <button
                        onClick={() => navigate('/tests')}
                        className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                        ← Back to Tests
                    </button>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">{test?.title}</h1>
                    <p className="text-gray-600 mb-4">{test?.description}</p>
                    
                    <div className="bg-gray-50 rounded-md p-4 mb-6">
                        <h2 className="text-lg font-semibold text-gray-800 mb-2">Problem Statement</h2>
                        <pre className="whitespace-pre-wrap text-gray-700">{test?.problemStatement}</pre>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Your Solution</h2>
                    <div className="h-[500px] border rounded-md overflow-hidden">
                        <MonacoEditor
                            height="100%"
                            language="html"
                            theme="vs-dark"
                            value={code}
                            onChange={setCode}
                            options={{
                                minimap: { enabled: false },
                                fontSize: 14,
                                lineNumbers: 'on',
                                automaticLayout: true,
                            }}
                        />
                    </div>
                </div>

                <div className="flex justify-end">
                    <button
                        onClick={handleSubmit}
                        disabled={submitting}
                        className={`px-6 py-3 rounded-md text-white font-medium ${
                            submitting 
                                ? 'bg-gray-400 cursor-not-allowed' 
                                : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                    >
                        {submitting ? 'Submitting...' : 'Submit Solution'}
                    </button>
                </div>

                {result && (
                    <div className="mt-8 bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">Test Results</h2>
                        <div className="mb-4">
                            <div className="text-2xl font-bold">
                                Score: {result.score}/{test.maxScore}
                            </div>
                        </div>
                        <div className="space-y-4">
                            {result.testCases?.map((testCase, index) => (
                                <div
                                    key={index}
                                    className={`p-4 rounded-md ${
                                        testCase.passed ? 'bg-green-50' : 'bg-red-50'
                                    }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="font-medium">
                                            Test Case {index + 1}
                                        </span>
                                        <span className={`px-2 py-1 rounded text-sm ${
                                            testCase.passed 
                                                ? 'bg-green-100 text-green-800' 
                                                : 'bg-red-100 text-red-800'
                                        }`}>
                                            {testCase.passed ? 'Passed' : 'Failed'}
                                        </span>
                                    </div>
                                    {!testCase.passed && (
                                        <div className="mt-2 text-sm text-red-600">
                                            {testCase.error}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TestPage; 