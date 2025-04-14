import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const TestsList = () => {
    const [tests, setTests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTests = async () => {
            try {
                // Configure axios defaults
                axios.defaults.baseURL = 'http://localhost:5002';
                axios.defaults.withCredentials = true;

                console.log('Creating sample test...');
                // First, create a sample test if none exists
                await axios.post('/tests/sample');
                
                console.log('Fetching tests...');
                // Then fetch all tests
                const response = await axios.get('/tests');
                console.log('Tests fetched:', response.data);
                setTests(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error details:', error.response || error);
                setError(error.response?.data?.error || 'Failed to load tests. Please try again later.');
                setLoading(false);
            }
        };

        fetchTests();
    }, []);

    const handleStartTest = async (testId) => {
        try {
            // Verify the test exists before navigation
            const response = await axios.get(`/tests/${testId}`);
            if (response.data) {
                navigate(`/test/${testId}`);
            }
        } catch (error) {
            console.error('Error accessing test:', error);
            setError('Unable to access this test. Please try again later.');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-xl text-gray-600">Loading tests...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center space-y-4">
                <div className="text-xl text-red-600">{error}</div>
                <button
                    onClick={() => window.location.reload()}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                    Try Again
                </button>
                <button
                    onClick={() => navigate('/dashboard')}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                >
                    Back to Dashboard
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4">
                <div className="mb-8">
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                        ← Back to Dashboard
                    </button>
                </div>

                <h1 className="text-3xl font-bold text-gray-800 mb-8">Available Tests</h1>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tests.map((test) => (
                        <div 
                            key={test._id}
                            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                        >
                            <div className="p-6">
                                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                                    {test.title}
                                </h2>
                                <p className="text-gray-600 mb-4">
                                    {test.description}
                                </p>
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-sm text-gray-500">
                                        Language: {test.language}
                                    </span>
                                    <span className="text-sm font-medium text-blue-600">
                                        Max Score: {test.maxScore}
                                    </span>
                                </div>
                                <button
                                    onClick={() => handleStartTest(test._id)}
                                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                                >
                                    Start Test
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {tests.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-xl text-gray-600">No tests available at the moment.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TestsList; 