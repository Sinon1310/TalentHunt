import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Users, Calendar, MessageSquare, Award, Search, Bell, ChevronDown, User } from 'lucide-react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigate = useNavigate();
  // Sample data - in a real app, this would come from an API
  const upcomingCompetitions = [
    {
      id: 1,
      title: "Annual Hackathon 2025",
      date: "Oct 15-17, 2025",
      status: "Registered",
      teamMembers: 3,
      mentorAssigned: true
    },
    {
      id: 2,
      title: "Design Challenge",
      date: "Nov 5-7, 2025",
      status: "Team Incomplete",
      teamMembers: 2,
      mentorAssigned: false
    }
  ];
  
  const teamRequests = [
    {
      id: 1,
      name: "Sarah Dmello",
      role: "UI/UX Designer",
      skills: ["Figma", "User Research", "Prototyping"],
      competition: "Design Challenge"
    },
    {
      id: 2,
      name: "Michael Johnson",
      role: "Backend Developer",
      skills: ["Node.js", "MongoDB", "Express"],
      competition: "Annual Hackathon 2025"
    }
  ];
  
  const mentorMessages = [
    {
      id: 1,
      mentor: "Dr. Joseph",
      message: "I've reviewed your project proposal. Let's schedule a meeting to discuss the technical approach.",
      time: "2 hours ago"
    },
    {
      id: 2,
      mentor: "Prof. Prachi Patil",
      message: "Your team's progress looks good. I've shared some resources that might help with the UI design.",
      time: "Yesterday"
    }
  ];

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
            
            {/* User Menu */}
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-600 hover:text-blue-600 focus:outline-none">
                <Bell size={20} />
                <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                  3
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
                    <p className="text-2xl font-semibold text-gray-800">2</p>
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
                    <p className="text-2xl font-semibold text-gray-800">5</p>
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
                    <p className="text-2xl font-semibold text-gray-800">3</p>
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
                    {upcomingCompetitions.map((competition) => (
                      <tr key={competition.id}>
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
                          <Link to={`/competition/${competition.id}`} className="text-blue-600 hover:text-blue-900">
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
                    <div key={request.id} className="border border-gray-200 rounded-md p-4">
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
                    <div key={message.id} className="border border-gray-200 rounded-md p-4">
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