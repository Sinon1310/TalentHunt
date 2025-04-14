import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Users, Calendar, MessageSquare, Award, Search, Bell, ChevronDown, User, BookOpen } from 'lucide-react';
import axios from 'axios';

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                // Configure axios defaults
                axios.defaults.baseURL = 'http://localhost:5002';
                axios.defaults.withCredentials = true;

                // First, create sample data if none exists
                await axios.post('/dashboard/sample');
                
                // Then fetch dashboard data
                const response = await axios.get('/dashboard');
                setDashboardData(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
                setError(error.response?.data?.error || 'Failed to load dashboard data');
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-xl text-gray-600">Loading dashboard...</div>
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
            </div>
        );
    }

    const { competitions, teamRequests, mentorMessages, stats } = dashboardData;

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm">
                <div className="container mx-auto px-4 py-3">
                    <div className="flex justify-between items-center">
                        {/* Logo */}
                        <button onClick={() => navigate('/dashboard')} className="flex items-center space-x-2 focus:outline-none">
                            <div className="text-2xl font-bold text-blue-600">TalentHunt</div>
                        </button>
                        
                        {/* Search */}
                        <div className="hidden md:flex items-center flex-1 max-w-md mx-4">
                            <div className="relative w-full">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Search size={18} className="text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search for competitions, teammates..."
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                        </div>
                        
                        {/* User Menu and Test Button */}
                        <div className="flex items-center space-x-4">
                            {/* Take Test Button */}
                            <button 
                                onClick={() => navigate('/tests')}
                                className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                            >
                                <BookOpen size={18} />
                                <span>Take Test</span>
                            </button>

                            <button className="relative p-2 text-gray-600 hover:text-blue-600 focus:outline-none">
                                <Bell size={20} />
                                <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                                    {stats.mentorMessages}
                                </span>
                            </button>
                            
                            <div className="relative">
                                <button 
                                    className="flex items-center space-x-2 focus:outline-none"
                                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                                >
                                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                                        <User size={18} className="text-blue-600" />
                                    </div>
                                    <span className="hidden md:inline-block font-medium">Sinon Rodrigues</span>
                                    <ChevronDown size={16} className="text-gray-500" />
                                </button>
                                
                                {showProfileMenu && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                                        <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                            Your Profile
                                        </Link>
                                        <Link to="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                            Settings
                                        </Link>
                                        <div className="border-t border-gray-100 my-1"></div>
                                        <Link to="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                            Sign out
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            
            {/* Main Content */}
            <main className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Sidebar */}
                    <div className="md:w-64 flex-shrink-0">
                        <div className="bg-white rounded-lg shadow-sm p-4">
                            <nav className="space-y-1">
                                <button
                                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md ${
                                        activeTab === 'overview' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
                                    }`}
                                    onClick={() => setActiveTab('overview')}
                                >
                                    <Users size={20} />
                                    <span>Overview</span>
                                </button>
                                <button
                                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md ${
                                        activeTab === 'competitions' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
                                    }`}
                                    onClick={() => setActiveTab('competitions')}
                                >
                                    <Award size={20} />
                                    <span>Competitions</span>
                                </button>
                                <button
                                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md ${
                                        activeTab === 'teams' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
                                    }`}
                                    onClick={() => setActiveTab('teams')}
                                >
                                    <Users size={20} />
                                    <span>My Teams</span>
                                </button>
                                <button
                                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md ${
                                        activeTab === 'mentorship' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
                                    }`}
                                    onClick={() => setActiveTab('mentorship')}
                                >
                                    <MessageSquare size={20} />
                                    <span>Mentorship</span>
                                </button>
                                <button
                                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md ${
                                        activeTab === 'calendar' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
                                    }`}
                                    onClick={() => setActiveTab('calendar')}
                                >
                                    <Calendar size={20} />
                                    <span>Calendar</span>
                                </button>
                            </nav>
                        </div>
                    </div>
                    
                    {/* Main Dashboard Content */}
                    <div className="flex-1">
                        <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>
                        
                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <div className="bg-white rounded-lg shadow-sm p-6">
                                <div className="flex items-center">
                                    <div className="bg-blue-100 p-3 rounded-full">
                                        <Award size={24} className="text-blue-600" />
                                    </div>
                                    <div className="ml-4">
                                        <h2 className="text-sm font-medium text-gray-500">Active Competitions</h2>
                                        <p className="text-2xl font-semibold text-gray-800">{stats.activeCompetitions}</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="bg-white rounded-lg shadow-sm p-6">
                                <div className="flex items-center">
                                    <div className="bg-green-100 p-3 rounded-full">
                                        <Users size={24} className="text-green-600" />
                                    </div>
                                    <div className="ml-4">
                                        <h2 className="text-sm font-medium text-gray-500">Team Requests</h2>
                                        <p className="text-2xl font-semibold text-gray-800">{stats.teamRequests}</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="bg-white rounded-lg shadow-sm p-6">
                                <div className="flex items-center">
                                    <div className="bg-purple-100 p-3 rounded-full">
                                        <MessageSquare size={24} className="text-purple-600" />
                                    </div>
                                    <div className="ml-4">
                                        <h2 className="text-sm font-medium text-gray-500">Mentor Messages</h2>
                                        <p className="text-2xl font-semibold text-gray-800">{stats.mentorMessages}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Upcoming Competitions */}
                        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-lg font-semibold text-gray-800">Upcoming Competitions</h2>
                                <Link to="/competitions" className="text-sm text-blue-600 hover:text-blue-700">
                                    View All
                                </Link>
                            </div>
                            
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Competition
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Date
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Status
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Team
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Mentor
                                            </th>
                                            <th scope="col" className="relative px-6 py-3">
                                                <span className="sr-only">Actions</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {competitions.map((competition) => (
                                            <tr key={competition._id}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900">{competition.title}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-500">{competition.date}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                        competition.status === 'Registered' 
                                                            ? 'bg-green-100 text-green-800' 
                                                            : 'bg-yellow-100 text-yellow-800'
                                                    }`}>
                                                        {competition.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {competition.teamMembers}/4 Members
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {competition.mentorAssigned ? 'Assigned' : 'Pending'}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <Link to={`/competition/${competition._id}`} className="text-blue-600 hover:text-blue-900">
                                                        View
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        
                        {/* Team Requests and Mentor Messages */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Team Requests */}
                            <div className="bg-white rounded-lg shadow-sm p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-lg font-semibold text-gray-800">Team Requests</h2>
                                    <Link to="/teams/requests" className="text-sm text-blue-600 hover:text-blue-700">
                                        View All
                                    </Link>
                                </div>
                                
                                <div className="space-y-4">
                                    {teamRequests.map((request) => (
                                        <div key={request._id} className="border border-gray-200 rounded-md p-4">
                                            <div className="flex justify-between">
                                                <div>
                                                    <h3 className="font-medium text-gray-900">{request.name}</h3>
                                                    <p className="text-sm text-gray-500">{request.role}</p>
                                                </div>
                                                <div className="text-xs text-gray-500">
                                                    For: {request.competition}
                                                </div>
                                            </div>
                                            <div className="mt-2 flex flex-wrap gap-1">
                                                {request.skills.map((skill, index) => (
                                                    <span key={index} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                            <div className="mt-3 flex space-x-2">
                                                <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
                                                    Accept
                                                </button>
                                                <button className="px-3 py-1 border border-gray-300 text-gray-700 text-sm rounded hover:bg-gray-50">
                                                    Decline
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            
                            {/* Mentor Messages */}
                            <div className="bg-white rounded-lg shadow-sm p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-lg font-semibold text-gray-800">Mentor Messages</h2>
                                    <Link to="/mentorship/messages" className="text-sm text-blue-600 hover:text-blue-700">
                                        View All
                                    </Link>
                                </div>
                                
                                <div className="space-y-4">
                                    {mentorMessages.map((message) => (
                                        <div key={message._id} className="border border-gray-200 rounded-md p-4">
                                            <div className="flex justify-between">
                                                <h3 className="font-medium text-gray-900">{message.mentor}</h3>
                                                <span className="text-xs text-gray-500">{message.time}</span>
                                            </div>
                                            <p className="mt-1 text-sm text-gray-600">{message.message}</p>
                                            <div className="mt-3">
                                                <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
                                                    Reply
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;