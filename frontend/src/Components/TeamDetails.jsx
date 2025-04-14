import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Users, Calendar, MessageSquare, ChevronLeft, User, CheckCircle, Clock, AlertCircle, Send, FileText } from 'lucide-react';

const TeamDetails = () => {
  const { teamId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [messageText, setMessageText] = useState('');
  const [feedbackText, setFeedbackText] = useState('');
  const [teamData, setTeamData] = useState(null);

  // Sample teams data - in a real app, this would be fetched from an API
  const teamsData = {
    1: {
      id: 1,
      name: "CodeCrafters",
      competition: "Annual Hackathon 2025",
      members: [
        { id: 1, name: "Sinon Rodrigues", role: "Team Lead", email: "sinon.r@email.com" },
        { id: 2, name: "Aditya Rao", role: "Frontend Developer", email: "aditya.r@email.com" },
        { id: 3, name: "Siddharth Nair", role: "Backend Developer", email: "siddharth.n@email.com" }
      ],
      progress: 40,
      lastActivity: "2 hours ago",
      pendingFeedback: true,
      nextMeeting: "October 10, 2025, 2:00 PM",
      projectDetails: {
        description: "Building a sustainable energy monitoring system using IoT devices and machine learning.",
        technologies: ["React", "Node.js", "TensorFlow", "IoT Sensors"],
        milestones: [
          { id: 1, title: "Project Planning", status: "completed", date: "October 1, 2025" },
          { id: 2, title: "Design Phase", status: "in-progress", date: "October 5-10, 2025" },
          { id: 3, title: "Development", status: "pending", date: "October 11-15, 2025" },
          { id: 4, title: "Testing", status: "pending", date: "October 16-17, 2025" }
        ]
      },
      meetings: [
        {
          id: 1,
          type: "Progress Review",
          date: "October 10, 2025",
          time: "2:00 PM - 3:00 PM",
          status: "scheduled"
        }
      ],
      feedback: [
        {
          id: 1,
          type: "Project Proposal",
          date: "October 5, 2025",
          status: "pending",
          requestedBy: "Sinon Rodrigues"
        }
      ]
    },
    2: {
      id: 2,
      name: "DataDynamos",
      competition: "Annual Hackathon 2025",
      members: [
        { id: 4, name: "Pranav Kumar", role: "Data Scientist", email: "pranav.k@email.com" },
        { id: 5, name: "Rahul Sharma", role: "ML Engineer", email: "rahul.s@email.com" }
      ],
      progress: 25,
      lastActivity: "Yesterday",
      pendingFeedback: false,
      nextMeeting: "October 12, 2025, 10:00 AM",
      projectDetails: {
        description: "Developing an AI-powered data analysis platform for predictive analytics.",
        technologies: ["Python", "TensorFlow", "PostgreSQL", "Docker"],
        milestones: [
          { id: 1, title: "Project Planning", status: "completed", date: "October 1, 2025" },
          { id: 2, title: "Data Collection", status: "in-progress", date: "October 5-10, 2025" },
          { id: 3, title: "Model Development", status: "pending", date: "October 11-15, 2025" },
          { id: 4, title: "Testing & Validation", status: "pending", date: "October 16-17, 2025" }
        ]
      },
      meetings: [
        {
          id: 1,
          type: "Technical Guidance",
          date: "October 12, 2025",
          time: "10:00 AM - 11:00 AM",
          status: "scheduled"
        }
      ],
      feedback: []
    },
    3: {
      id: 3,
      name: "DesignMasters",
      competition: "Design Challenge",
      members: [
        { id: 6, name: "Priya Patel", role: "UI Designer", email: "priya.p@email.com" },
        { id: 7, name: "Arjun Menon", role: "UX Researcher", email: "arjun.m@email.com" },
        { id: 8, name: "Neha Singh", role: "Frontend Developer", email: "neha.s@email.com" },
        { id: 9, name: "Karthik Raja", role: "Backend Developer", email: "karthik.r@email.com" }
      ],
      progress: 60,
      lastActivity: "3 days ago",
      pendingFeedback: true,
      nextMeeting: "October 15, 2025, 3:00 PM",
      projectDetails: {
        description: "Creating an innovative design system for accessible web applications.",
        technologies: ["Figma", "React", "Storybook", "Tailwind CSS"],
        milestones: [
          { id: 1, title: "Research Phase", status: "completed", date: "October 1, 2025" },
          { id: 2, title: "Design System", status: "completed", date: "October 5-8, 2025" },
          { id: 3, title: "Component Library", status: "in-progress", date: "October 9-14, 2025" },
          { id: 4, title: "Documentation", status: "pending", date: "October 15-17, 2025" }
        ]
      },
      meetings: [
        {
          id: 1,
          type: "Design Review",
          date: "October 15, 2025",
          time: "3:00 PM - 4:00 PM",
          status: "scheduled"
        }
      ],
      feedback: [
        {
          id: 1,
          type: "UI Design Review",
          date: "October 7, 2025",
          status: "pending",
          requestedBy: "Priya Patel"
        }
      ]
    }
  };

  useEffect(() => {
    // In a real app, this would be an API call
    const team = teamsData[teamId];
    if (team) {
      setTeamData(team);
    } else {
      // Handle invalid team ID
      navigate('/mentor');
    }
  }, [teamId, navigate]);

  if (!teamData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading team details...</p>
        </div>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'pending': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleSendMessage = () => {
    if (messageText.trim()) {
      // In a real app, send message to backend
      alert('Message sent successfully!');
      setMessageText('');
    }
  };

  const handleProvideFeedback = () => {
    if (feedbackText.trim()) {
      // In a real app, send feedback to backend
      alert('Feedback submitted successfully!');
      setFeedbackText('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/mentor')}
            className="flex items-center text-blue-600 hover:text-blue-700 mb-4"
          >
            <ChevronLeft size={20} />
            <span>Back to Dashboard</span>
          </button>
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{teamData.name}</h1>
              <p className="text-gray-600">{teamData.competition}</p>
            </div>
            
            <div className="mt-4 md:mt-0 flex items-center space-x-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                teamData.progress < 30 ? 'bg-red-100 text-red-800' :
                teamData.progress < 60 ? 'bg-yellow-100 text-yellow-800' :
                'bg-green-100 text-green-800'
              }`}>
                Progress: {teamData.progress}%
              </span>
              <button
                onClick={() => setActiveTab('meetings')}
                className="flex items-center px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                <Calendar size={16} className="mr-2" />
                Schedule Meeting
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-6 border-b border-gray-200">
          <nav className="flex space-x-8">
            <button
              className={`px-1 py-4 text-sm font-medium border-b-2 ${
                activeTab === 'overview'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button
              className={`px-1 py-4 text-sm font-medium border-b-2 ${
                activeTab === 'meetings'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('meetings')}
            >
              Meetings
            </button>
            <button
              className={`px-1 py-4 text-sm font-medium border-b-2 ${
                activeTab === 'feedback'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('feedback')}
            >
              Feedback
            </button>
          </nav>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="md:col-span-2">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Project Details */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-lg font-semibold text-gray-800 mb-4">Project Details</h2>
                  <p className="text-gray-700 mb-4">{teamData.projectDetails.description}</p>
                  
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Technologies</h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {teamData.projectDetails.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-sm font-medium text-gray-700 mb-2">Milestones</h3>
                  <div className="space-y-3">
                    {teamData.projectDetails.milestones.map((milestone) => (
                      <div
                        key={milestone.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div>
                          <p className="font-medium text-gray-800">{milestone.title}</p>
                          <p className="text-sm text-gray-600">{milestone.date}</p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(milestone.status)}`}>
                          {milestone.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Message Box */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-lg font-semibold text-gray-800 mb-4">Send Message to Team</h2>
                  <div className="space-y-4">
                    <textarea
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      placeholder="Type your message here..."
                      className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      onClick={handleSendMessage}
                      className="flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      <Send size={16} className="mr-2" />
                      Send Message
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'meetings' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Team Meetings</h2>
                
                {/* Schedule Meeting Form */}
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-700 mb-4">Schedule New Meeting</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="date"
                      className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="time"
                      className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                    Schedule Meeting
                  </button>
                </div>

                {/* Upcoming Meetings */}
                <div className="space-y-4">
                  {teamData.meetings.map((meeting) => (
                    <div
                      key={meeting.id}
                      className="flex flex-col md:flex-row md:items-center md:justify-between p-4 border border-gray-200 rounded-lg"
                    >
                      <div>
                        <h3 className="font-medium text-gray-800">{meeting.type}</h3>
                        <div className="flex items-center mt-1">
                          <Calendar size={16} className="text-gray-500 mr-1" />
                          <span className="text-sm text-gray-600">{meeting.date}</span>
                          <span className="mx-2 text-gray-300">•</span>
                          <Clock size={16} className="text-gray-500 mr-1" />
                          <span className="text-sm text-gray-600">{meeting.time}</span>
                        </div>
                      </div>
                      <div className="mt-4 md:mt-0 flex space-x-3">
                        <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
                          Join Meeting
                        </button>
                        <button className="px-3 py-1 border border-gray-300 text-gray-700 text-sm rounded hover:bg-gray-50">
                          Reschedule
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'feedback' && (
              <div className="space-y-6">
                {/* Pending Feedback Requests */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-lg font-semibold text-gray-800 mb-4">Pending Feedback Requests</h2>
                  <div className="space-y-4">
                    {teamData.feedback.map((item) => (
                      <div
                        key={item.id}
                        className="border border-gray-200 rounded-lg p-4"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium text-gray-800">{item.type}</h3>
                            <div className="flex items-center mt-1">
                              <User size={16} className="text-gray-500 mr-1" />
                              <span className="text-sm text-gray-600">Requested by: {item.requestedBy}</span>
                              <span className="mx-2 text-gray-300">•</span>
                              <Calendar size={16} className="text-gray-500 mr-1" />
                              <span className="text-sm text-gray-600">{item.date}</span>
                            </div>
                          </div>
                          <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                            {item.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Provide Feedback Form */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-lg font-semibold text-gray-800 mb-4">Provide Feedback</h2>
                  <div className="space-y-4">
                    <textarea
                      value={feedbackText}
                      onChange={(e) => setFeedbackText(e.target.value)}
                      placeholder="Type your feedback here..."
                      className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      onClick={handleProvideFeedback}
                      className="flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      <FileText size={16} className="mr-2" />
                      Submit Feedback
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Team Members */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Team Members</h2>
              <div className="space-y-4">
                {teamData.members.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <User size={20} className="text-blue-600" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">{member.name}</h3>
                      <p className="text-sm text-gray-600">{member.role}</p>
                      <a
                        href={`mailto:${member.email}`}
                        className="text-sm text-blue-600 hover:text-blue-700"
                      >
                        {member.email}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <button
                  onClick={() => setActiveTab('meetings')}
                  className="w-full flex items-center justify-between px-4 py-2 bg-gray-50 text-gray-700 rounded hover:bg-gray-100"
                >
                  <span>Schedule Meeting</span>
                  <Calendar size={16} />
                </button>
                <button
                  onClick={() => setActiveTab('feedback')}
                  className="w-full flex items-center justify-between px-4 py-2 bg-gray-50 text-gray-700 rounded hover:bg-gray-100"
                >
                  <span>Provide Feedback</span>
                  <MessageSquare size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamDetails; 