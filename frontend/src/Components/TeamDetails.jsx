import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Users, Calendar, MessageSquare, ChevronLeft, Award, Clock, CheckCircle, AlertCircle, Send, X } from 'lucide-react';
import VideoMeeting from './VideoMeeting';
import { useUser } from '../Contexts/UserContext';

const TeamDetails = () => {
  const { teamId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const { user } = useUser();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [showChat, setShowChat] = useState(false);
  const messagesEndRef = useRef(null);

  // Sample teams data - in a real app, this would be fetched from your backend
  const teamsData = {
    1: {
      id: 1,
      name: "CodeCrafters",
      competition: "Annual Hackathon 2025",
      progress: 40,
      members: [
        { id: 1, name: "Sinon Rodrigues", role: "Team Lead", status: "active" },
        { id: 2, name: "Aditya Rao", role: "Frontend Developer", status: "active" },
        { id: 3, name: "Siddharth Nair", role: "Backend Developer", status: "active" }
      ],
      tasks: [
        { id: 1, title: "Project Proposal", status: "completed", dueDate: "2025-10-05" },
        { id: 2, title: "UI/UX Design", status: "in-progress", dueDate: "2025-10-10" },
        { id: 3, title: "Backend Setup", status: "pending", dueDate: "2025-10-15" }
      ],
      meetings: [
        { id: 1, title: "Weekly Progress Review", date: "2025-10-10", time: "2:00 PM", status: "scheduled" },
        { id: 2, title: "Technical Discussion", date: "2025-10-12", time: "10:00 AM", status: "pending" }
      ]
    },
    2: {
      id: 2,
      name: "DataDynamos",
      competition: "Annual Hackathon 2025",
      progress: 25,
      members: [
        { id: 4, name: "Pranav Kumar", role: "Data Scientist", status: "active" },
        { id: 5, name: "Rahul Sharma", role: "ML Engineer", status: "active" }
      ],
      tasks: [
        { id: 1, title: "Data Collection", status: "completed", dueDate: "2025-10-07" },
        { id: 2, title: "Model Training", status: "in-progress", dueDate: "2025-10-12" },
        { id: 3, title: "API Integration", status: "pending", dueDate: "2025-10-17" }
      ],
      meetings: [
        { id: 1, title: "Data Review", date: "2025-10-12", time: "10:00 AM", status: "scheduled" },
        { id: 2, title: "Model Evaluation", date: "2025-10-15", time: "2:00 PM", status: "pending" }
      ]
    },
    3: {
      id: 3,
      name: "DesignMasters",
      competition: "Design Challenge",
      progress: 60,
      members: [
        { id: 6, name: "Priya Patel", role: "UI Designer", status: "active" },
        { id: 7, name: "Arjun Menon", role: "UX Researcher", status: "active" },
        { id: 8, name: "Neha Singh", role: "Frontend Developer", status: "active" },
        { id: 9, name: "Karthik Raja", role: "Backend Developer", status: "active" }
      ],
      tasks: [
        { id: 1, title: "User Research", status: "completed", dueDate: "2025-10-08" },
        { id: 2, title: "Wireframes", status: "completed", dueDate: "2025-10-12" },
        { id: 3, title: "UI Design", status: "in-progress", dueDate: "2025-10-18" },
        { id: 4, title: "Usability Testing", status: "pending", dueDate: "2025-10-20" }
      ],
      meetings: [
        { id: 1, title: "Design Review", date: "2025-10-15", time: "3:00 PM", status: "scheduled" },
        { id: 2, title: "User Testing Plan", date: "2025-10-18", time: "11:00 AM", status: "pending" }
      ]
    }
  };

  // Get the team data based on the teamId
  const teamData = teamsData[teamId] || null;

  // If team not found, show error state
  if (!teamData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Team Not Found</h1>
          <button
            onClick={() => navigate(-1)}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Sample messages data - in a real app, this would be fetched from your backend
  const teamMessages = {
    1: [
      {
        id: 1,
        sender: "Sinon Rodrigues",
        content: "Hey team, how's the progress on the UI design?",
        timestamp: "2024-03-10T10:00:00Z",
        role: "Team Lead"
      },
      {
        id: 2,
        sender: "Aditya Rao",
        content: "Working on the final touches. Should be done by EOD.",
        timestamp: "2024-03-10T10:05:00Z",
        role: "Frontend Developer"
      },
      {
        id: 3,
        sender: "Siddharth Nair",
        content: "Backend APIs are ready for integration.",
        timestamp: "2024-03-10T10:10:00Z",
        role: "Backend Developer"
      }
    ],
    2: [
      {
        id: 1,
        sender: "Pranav Kumar",
        content: "Data collection phase is complete. Moving on to model training.",
        timestamp: "2024-03-10T09:00:00Z",
        role: "Data Scientist"
      },
      {
        id: 2,
        sender: "Rahul Sharma",
        content: "Great! I'll start preparing the training pipeline.",
        timestamp: "2024-03-10T09:05:00Z",
        role: "ML Engineer"
      }
    ],
    3: [
      {
        id: 1,
        sender: "Priya Patel",
        content: "UI wireframes are ready for review.",
        timestamp: "2024-03-10T11:00:00Z",
        role: "UI Designer"
      },
      {
        id: 2,
        sender: "Arjun Menon",
        content: "I'll schedule a user testing session for next week.",
        timestamp: "2024-03-10T11:05:00Z",
        role: "UX Researcher"
      },
      {
        id: 3,
        sender: "Neha Singh",
        content: "Perfect! I can start the implementation once approved.",
        timestamp: "2024-03-10T11:10:00Z",
        role: "Frontend Developer"
      }
    ]
  };

  useEffect(() => {
    // Load team-specific messages
    const teamSpecificMessages = teamMessages[teamId] || [];
    setMessages(teamSpecificMessages);
  }, [teamId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, showChat]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const newMsg = {
      id: messages.length + 1,
      sender: user?.name || "Anonymous",
      content: newMessage.trim(),
      timestamp: new Date().toISOString(),
      role: teamData.members.find(m => m.name === user?.name)?.role || "Team Member"
    };

    // Update messages for the current team
    setMessages(prevMessages => [...prevMessages, newMsg]);
    
    // In a real app, you would send this to your backend
    // and update teamMessages[teamId] accordingly
    
    setNewMessage('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            Back
          </button>

          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{teamData.name}</h1>
              <p className="text-gray-600">{teamData.competition}</p>
            </div>
            <div className="flex space-x-3">
              <VideoMeeting teamId={teamId} />
              <button
                onClick={() => setShowChat(true)}
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                <MessageSquare className="w-5 h-5 mr-2" />
                Team Chat
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Progress</span>
              <span className="text-sm font-medium text-gray-700">{teamData.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 rounded-full h-2"
                style={{ width: `${teamData.progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            {['overview', 'tasks', 'meetings', 'messages'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`${
                  activeTab === tab
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm capitalize`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Team Members */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Team Members</h2>
              <div className="space-y-4">
                {teamData.members.map((member) => (
                  <div key={member.id} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <Users className="w-5 h-5 text-gray-500" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">{member.name}</p>
                        <p className="text-sm text-gray-500">{member.role}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      member.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {member.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tasks and Meetings */}
          <div className="md:col-span-2">
            {/* Tasks */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Tasks</h2>
              <div className="space-y-4">
                {teamData.tasks.map((task) => (
                  <div key={task.id} className="flex items-center justify-between">
                    <div className="flex items-center">
                      {task.status === 'completed' ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-yellow-500" />
                      )}
                      <span className="ml-3 text-sm text-gray-900">{task.title}</span>
                    </div>
                    <div className="flex items-center">
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(task.status)}`}>
                        {task.status}
                      </span>
                      <span className="ml-4 text-sm text-gray-500">
                        <Calendar className="w-4 h-4 inline mr-1" />
                        {task.dueDate}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Meetings */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Upcoming Meetings</h2>
              <div className="space-y-4">
                {teamData.meetings.map((meeting) => (
                  <div key={meeting.id} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{meeting.title}</p>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="w-4 h-4 mr-1" />
                        {meeting.date}
                        <Clock className="w-4 h-4 ml-3 mr-1" />
                        {meeting.time}
                      </div>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      meeting.status === 'scheduled' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {meeting.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Modal */}
      {showChat && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl h-[600px] flex flex-col">
              {/* Chat Header */}
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-xl font-semibold">Team Chat - {teamData.name}</h2>
                <button
                  onClick={() => setShowChat(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === user?.name ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[70%] ${
                      message.sender === user?.name 
                        ? 'bg-blue-600 text-white rounded-l-lg rounded-tr-lg' 
                        : 'bg-gray-100 text-gray-900 rounded-r-lg rounded-tl-lg'
                    } p-3`}>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-sm">
                          {message.sender}
                        </span>
                        <span className={`text-xs ${
                          message.sender === user?.name ? 'text-blue-100' : 'text-gray-500'
                        }`}>
                          {message.role}
                        </span>
                      </div>
                      <p className="mt-1">{message.content}</p>
                      <span className={`text-xs ${
                        message.sender === user?.name ? 'text-blue-100' : 'text-gray-500'
                      } block mt-1`}>
                        {formatTimestamp(message.timestamp)}
                      </span>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Chat Input */}
              <form onSubmit={handleSendMessage} className="border-t p-4">
                <div className="flex space-x-4">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
                    disabled={!newMessage.trim()}
                  >
                    <Send size={18} className="mr-2" />
                    Send
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamDetails;