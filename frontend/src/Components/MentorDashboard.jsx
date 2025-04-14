import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Users, Calendar, MessageSquare, Award, Search, Bell, ChevronDown, User, CheckCircle, Clock, AlertCircle, X } from 'lucide-react';
import { useUser } from '../Contexts/UserContext';

const MentorDashboard = ({ activeTab: initialActiveTab }) => {
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(initialActiveTab || 'teams');
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [selectedTeamMember, setSelectedTeamMember] = useState(null);
  const [messageContent, setMessageContent] = useState('');
  const [showMemberSelect, setShowMemberSelect] = useState(null);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [meetingForm, setMeetingForm] = useState({
    team: '',
    date: '',
    startTime: '',
    endTime: '',
    type: 'Progress Review',
    description: ''
  });
  const [isViewingAllTeams, setIsViewingAllTeams] = useState(initialActiveTab === 'teams');

  // Effect to update isViewingAllTeams when activeTab changes
  useEffect(() => {
    setIsViewingAllTeams(activeTab === 'teams');
  }, [activeTab]);

  // Handle logout
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Sample data - in a real app, this would be fetched from an API
  const mentorTeams = [
    {
      id: 1,
      name: "CodeCrafters",
      competition: "Annual Hackathon 2025",
      members: [
        { id: 1, name: "Sinon Rodrigues", role: "Team Lead" },
        { id: 2, name: "Aditya Rao", role: "Frontend Developer" },
        { id: 3, name: "Siddharth Nair", role: "Backend Developer" }
      ],
      progress: 40,
      lastActivity: "2 hours ago",
      pendingFeedback: true,
      nextMeeting: "October 10, 2025, 2:00 PM"
    },
    {
      id: 2,
      name: "DataDynamos",
      competition: "Annual Hackathon 2025",
      members: [
        { id: 4, name: "Pranav Kumar", role: "Data Scientist" },
        { id: 5, name: "Rahul Sharma", role: "ML Engineer" }
      ],
      progress: 25,
      lastActivity: "Yesterday",
      pendingFeedback: false,
      nextMeeting: "October 12, 2025, 10:00 AM"
    },
    {
      id: 3,
      name: "DesignMasters",
      competition: "Design Challenge",
      members: [
        { id: 6, name: "Priya Patel", role: "UI Designer" },
        { id: 7, name: "Arjun Menon", role: "UX Researcher" },
        { id: 8, name: "Neha Singh", role: "Frontend Developer" },
        { id: 9, name: "Karthik Raja", role: "Backend Developer" }
      ],
      progress: 60,
      lastActivity: "3 days ago",
      pendingFeedback: true,
      nextMeeting: "October 15, 2025, 3:00 PM"
    }
  ];
  
  const feedbackRequests = [
    {
      id: 1,
      team: "CodeCrafters",
      type: "Project Proposal",
      requestedBy: "Sinon Rodrigues",
      date: "October 5, 2025",
      status: "pending",
      priority: "high"
    },
    {
      id: 2,
      team: "DesignMasters",
      type: "UI Design Review",
      requestedBy: "Priya Patel",
      date: "October 7, 2025",
      status: "pending",
      priority: "medium"
    }
  ];
  
  const upcomingMeetings = [
    {
      id: 1,
      team: "CodeCrafters",
      date: "October 10, 2025",
      time: "2:00 PM - 3:00 PM",
      type: "Progress Review",
      status: "confirmed"
    },
    {
      id: 2,
      team: "DataDynamos",
      date: "October 12, 2025",
      time: "10:00 AM - 11:00 AM",
      type: "Technical Guidance",
      status: "pending"
    }
  ];

  const getProgressColorClass = (progress) => {
    if (progress < 30) return 'bg-red-100 text-red-800';
    if (progress < 60) return 'bg-yellow-100 text-yellow-800';
    return 'bg-green-100 text-green-800';
  };

  const getPriorityColorClass = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColorClass = (status) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Filter teams based on search query
  const filteredTeams = mentorTeams.filter(team => 
    team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    team.competition.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get teams to display based on view mode
  const teamsToDisplay = isViewingAllTeams ? filteredTeams : filteredTeams.slice(0, 3);

  const handleSendMessageClick = (team) => {
    setShowMemberSelect(team.id);
  };

  const handleSendMessage = (member) => {
    setSelectedTeamMember(member);
    setShowMessageModal(true);
    setShowMemberSelect(null);
  };

  const handleSubmitMessage = (e) => {
    e.preventDefault();
    // Here you would typically send the message to your backend
    console.log(`Sending message to ${selectedTeamMember.name}: ${messageContent}`);
    alert('Message sent successfully!');
    setShowMessageModal(false);
    setMessageContent('');
    setSelectedTeamMember(null);
  };

  // Add click outside handler to close member select dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showMemberSelect && !event.target.closest('.relative')) {
        setShowMemberSelect(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showMemberSelect]);

  // Handle meeting form changes
  const handleMeetingFormChange = (e) => {
    const { name, value } = e.target;
    setMeetingForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle schedule meeting
  const handleScheduleMeeting = (e) => {
    e.preventDefault();
    // Here you would typically send this to your backend
    console.log('Scheduling meeting:', meetingForm);
    alert('Meeting scheduled successfully!');
    setShowScheduleModal(false);
    setMeetingForm({
      team: '',
      date: '',
      startTime: '',
      endTime: '',
      type: 'Progress Review',
      description: ''
    });
  };

  // Handle reschedule meeting
  const handleRescheduleMeeting = (meeting) => {
    setSelectedMeeting(meeting);
    setShowRescheduleModal(true);
    // Pre-fill the form with current meeting details
    setMeetingForm({
      team: meeting.team,
      date: meeting.date,
      startTime: meeting.time.split(' - ')[0],
      endTime: meeting.time.split(' - ')[1],
      type: meeting.type,
      description: ''
    });
  };

  // Handle join meeting
  const handleJoinMeeting = (meeting) => {
    // Here you would typically integrate with your video conferencing solution
    window.open('https://meet.google.com', '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <button onClick={() => navigate('/mentor')} className="text-2xl font-bold text-blue-600">
              TalentHunt
            </button>
            
            {/* Search */}
            <div className="hidden md:flex items-center flex-1 max-w-md mx-4">
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search for teams, competitions..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            {/* User Menu */}
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-600 hover:text-blue-600 focus:outline-none">
                <Bell size={20} />
                <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                  {feedbackRequests.length}
                </span>
              </button>
              
              <div className="relative">
                <button 
                  className="flex items-center space-x-2 focus:outline-none"
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                >
                  <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                    {user?.profileImage ? (
                      <img 
                        src={user.profileImage} 
                        alt={user.name} 
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <User size={18} className="text-purple-600" />
                    )}
                  </div>
                  <span className="hidden md:inline-block font-medium">{user?.name || 'Mentor'}</span>
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
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign out
                    </button>
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
              <div className="p-4 text-center">
                <div className="w-20 h-20 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
                  {user?.profileImage ? (
                    <img 
                      src={user.profileImage} 
                      alt={user.name} 
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <User size={36} className="text-purple-600" />
                  )}
                </div>
                <h2 className="text-xl font-bold text-gray-800">{user?.name || 'Mentor'}</h2>
                <p className="text-gray-600">Faculty Mentor</p>
                <p className="text-sm text-gray-500 mt-1">AI and Machine Learning</p>
              </div>
              
              <div className="border-t border-gray-200 my-4"></div>
              
              <nav className="space-y-1">
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
                    activeTab === 'feedback' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => setActiveTab('feedback')}
                >
                  <MessageSquare size={20} />
                  <span>Feedback Requests</span>
                </button>
                <button
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md ${
                    activeTab === 'meetings' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => setActiveTab('meetings')}
                >
                  <Calendar size={20} />
                  <span>Meetings</span>
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
              </nav>
              
              <div className="border-t border-gray-200 my-4"></div>
              
              <div className="p-4">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Quick Stats</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Teams Mentoring</span>
                    <span className="font-medium text-gray-800">{mentorTeams.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Pending Feedback</span>
                    <span className="font-medium text-gray-800">{feedbackRequests.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Upcoming Meetings</span>
                    <span className="font-medium text-gray-800">{upcomingMeetings.length}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Main Dashboard Content */}
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Mentor Dashboard</h1>
            
            {/* Teams Tab */}
            {activeTab === 'teams' && (
              <div>
                <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold text-gray-800">
                      {isViewingAllTeams ? 'All Teams' : 'My Teams'}
                    </h2>
                    {!isViewingAllTeams && (
                      <Link to="/mentor/teams" className="text-sm text-blue-600 hover:text-blue-700">
                        View All
                      </Link>
                    )}
                  </div>
                  
                  <div className="space-y-6">
                    {teamsToDisplay.map((team) => (
                      <div key={team.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-800">{team.name}</h3>
                            <p className="text-gray-600">{team.competition}</p>
                            <div className="flex items-center mt-1">
                              <Users size={16} className="text-gray-500 mr-1" />
                              <span className="text-sm text-gray-500">{team.members.length} members</span>
                              <span className="mx-2 text-gray-300">•</span>
                              <span className="text-sm text-gray-500">Last activity: {team.lastActivity}</span>
                            </div>
                          </div>
                          
                          <div className="mt-4 md:mt-0 flex flex-col md:items-end">
                            <div className="flex items-center mb-2">
                              <span className="text-sm text-gray-600 mr-2">Progress:</span>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getProgressColorClass(team.progress)}`}>
                                {team.progress}%
                              </span>
                            </div>
                            {team.pendingFeedback && (
                              <span className="text-sm text-red-600">Feedback requested</span>
                            )}
                          </div>
                        </div>
                        
                        <div className="mt-4">
                          <h4 className="text-sm font-medium text-gray-700 mb-2">Team Members</h4>
                          <div className="flex flex-wrap gap-2">
                            {team.members.map((member) => (
                              <div key={member.id} className="flex items-center bg-gray-50 rounded-full px-3 py-1">
                                <User size={14} className="text-gray-500 mr-1" />
                                <span className="text-sm text-gray-700">{member.name}</span>
                                <span className="text-xs text-gray-500 ml-1">({member.role})</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="mt-4 flex space-x-3">
                          <Link 
                            to={`/mentor/team/${team.id}`} 
                            className="text-blue-600 hover:text-blue-800 font-medium"
                          >
                            View Team
                          </Link>
                          <div className="relative">
                            <button 
                              onClick={() => handleSendMessageClick(team)}
                              className="px-3 py-1 border border-blue-600 text-blue-600 text-sm rounded hover:bg-blue-50"
                            >
                              Send Message
                            </button>
                            {showMemberSelect === team.id && (
                              <div className="absolute z-10 mt-1 w-48 bg-white rounded-md shadow-lg py-1">
                                {team.members.map((member) => (
                                  <button
                                    key={member.id}
                                    onClick={() => handleSendMessage(member)}
                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                  >
                                    {member.name} ({member.role})
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                          {team.pendingFeedback && (
                            <Link
                              to={`/team/${team.id}?tab=feedback`}
                              className="px-3 py-1 border border-green-600 text-green-600 text-sm rounded hover:bg-green-50"
                            >
                              Provide Feedback
                            </Link>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {/* Feedback Requests Tab */}
            {activeTab === 'feedback' && (
              <div>
                <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold text-gray-800">Pending Feedback Requests</h2>
                  </div>
                  
                  <div className="space-y-4">
                    {feedbackRequests.map((request) => (
                      <div key={request.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                          <div>
                            <div className="flex items-center space-x-2">
                              <h3 className="font-semibold text-gray-800">{request.team}</h3>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColorClass(request.priority)}`}>
                                {request.priority}
                              </span>
                            </div>
                            <p className="text-gray-600">{request.type}</p>
                            <div className="flex items-center mt-1">
                              <User size={16} className="text-gray-500 mr-1" />
                              <span className="text-sm text-gray-500">Requested by: {request.requestedBy}</span>
                              <span className="mx-2 text-gray-300">•</span>
                              <span className="text-sm text-gray-500">Date: {request.date}</span>
                            </div>
                          </div>
                          
                          <div className="mt-4 md:mt-0 flex space-x-3">
                            <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
                              Review
                            </button>
                            <button className="px-3 py-1 border border-gray-300 text-gray-700 text-sm rounded hover:bg-gray-50">
                              Schedule Meeting
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {/* Meetings Tab */}
            {activeTab === 'meetings' && (
              <div>
                <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold text-gray-800">Upcoming Meetings</h2>
                    <button 
                      onClick={() => setShowScheduleModal(true)}
                      className="text-sm text-blue-600 hover:text-blue-700 flex items-center"
                    >
                      <Calendar size={16} className="mr-1" />
                      Schedule Meeting
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    {upcomingMeetings.map((meeting) => (
                      <div key={meeting.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                          <div>
                            <div className="flex items-center space-x-2">
                              <h3 className="font-semibold text-gray-800">{meeting.team}</h3>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColorClass(meeting.status)}`}>
                                {meeting.status}
                              </span>
                            </div>
                            <p className="text-gray-600">{meeting.type}</p>
                            <div className="flex items-center mt-1">
                              <Calendar size={16} className="text-gray-500 mr-1" />
                              <span className="text-sm text-gray-500">{meeting.date}</span>
                              <span className="mx-2 text-gray-300">•</span>
                              <Clock size={16} className="text-gray-500 mr-1" />
                              <span className="text-sm text-gray-500">{meeting.time}</span>
                            </div>
                          </div>
                          
                          <div className="mt-4 md:mt-0 flex space-x-3">
                            <button 
                              onClick={() => handleJoinMeeting(meeting)}
                              className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                            >
                              Join Meeting
                            </button>
                            <button 
                              onClick={() => handleRescheduleMeeting(meeting)}
                              className="px-3 py-1 border border-gray-300 text-gray-700 text-sm rounded hover:bg-gray-50"
                            >
                              Reschedule
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {/* Competitions Tab */}
            {activeTab === 'competitions' && (
              <div>
                <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold text-gray-800">Active Competitions</h2>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800">Annual Hackathon 2025</h3>
                          <p className="text-gray-600">October 15-17, 2025</p>
                          <p className="text-sm text-gray-700 mt-2">
                            Build innovative solutions for real-world problems in 48 hours. This hackathon focuses on creating technology that addresses sustainability challenges.
                          </p>
                          <div className="flex items-center mt-3">
                            <Users size={16} className="text-gray-500 mr-1" />
                            <span className="text-sm text-gray-500">Teams mentoring: {mentorTeams.filter(team => team.competition === "Annual Hackathon 2025").length}</span>
                          </div>
                        </div>
                        
                        <div className="mt-4 md:mt-0 md:ml-6 flex-shrink-0">
                          <Link 
                            to="/competition/1" 
                            className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                          >
                            View Details
                          </Link>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800">Design Challenge</h3>
                          <p className="text-gray-600">November 5-7, 2025</p>
                          <p className="text-sm text-gray-700 mt-2">
                            Create user-centered designs for next-gen applications. This challenge focuses on innovative UI/UX solutions for complex problems.
                          </p>
                          <div className="flex items-center mt-3">
                            <Users size={16} className="text-gray-500 mr-1" />
                            <span className="text-sm text-gray-500">Teams mentoring: {mentorTeams.filter(team => team.competition === "Design Challenge").length}</span>
                          </div>
                        </div>
                        
                        <div className="mt-4 md:mt-0 md:ml-6 flex-shrink-0">
                          <Link 
                            to="/competition/2" 
                            className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                          >
                            View Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Message Modal */}
      {showMessageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-xl font-semibold">Send Message to {selectedTeamMember?.name}</h2>
                <button
                  onClick={() => {
                    setShowMessageModal(false);
                    setSelectedTeamMember(null);
                    setMessageContent('');
                  }}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X size={20} />
                </button>
              </div>
              <form onSubmit={handleSubmitMessage} className="p-4">
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows="4"
                    value={messageContent}
                    onChange={(e) => setMessageContent(e.target.value)}
                    placeholder="Type your message here..."
                    required
                  />
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                    onClick={() => {
                      setShowMessageModal(false);
                      setSelectedTeamMember(null);
                      setMessageContent('');
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Schedule Meeting Modal */}
      {showScheduleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-xl font-semibold">Schedule New Meeting</h2>
                <button
                  onClick={() => setShowScheduleModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X size={20} />
                </button>
              </div>
              <form onSubmit={handleScheduleMeeting} className="p-4">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Team
                    </label>
                    <select
                      name="team"
                      value={meetingForm.team}
                      onChange={handleMeetingFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Select a team</option>
                      {mentorTeams.map(team => (
                        <option key={team.id} value={team.name}>{team.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={meetingForm.date}
                      onChange={handleMeetingFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Start Time
                      </label>
                      <input
                        type="time"
                        name="startTime"
                        value={meetingForm.startTime}
                        onChange={handleMeetingFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        End Time
                      </label>
                      <input
                        type="time"
                        name="endTime"
                        value={meetingForm.endTime}
                        onChange={handleMeetingFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Meeting Type
                    </label>
                    <select
                      name="type"
                      value={meetingForm.type}
                      onChange={handleMeetingFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="Progress Review">Progress Review</option>
                      <option value="Technical Guidance">Technical Guidance</option>
                      <option value="Project Planning">Project Planning</option>
                      <option value="Code Review">Code Review</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description (Optional)
                    </label>
                    <textarea
                      name="description"
                      value={meetingForm.description}
                      onChange={handleMeetingFormChange}
                      rows="3"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Add meeting agenda or notes..."
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowScheduleModal(false)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Schedule Meeting
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Reschedule Meeting Modal */}
      {showRescheduleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-xl font-semibold">Reschedule Meeting</h2>
                <button
                  onClick={() => {
                    setShowRescheduleModal(false);
                    setSelectedMeeting(null);
                  }}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X size={20} />
                </button>
              </div>
              <form onSubmit={handleScheduleMeeting} className="p-4">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Team
                    </label>
                    <input
                      type="text"
                      value={meetingForm.team}
                      className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md"
                      disabled
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      New Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={meetingForm.date}
                      onChange={handleMeetingFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        New Start Time
                      </label>
                      <input
                        type="time"
                        name="startTime"
                        value={meetingForm.startTime}
                        onChange={handleMeetingFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        New End Time
                      </label>
                      <input
                        type="time"
                        name="endTime"
                        value={meetingForm.endTime}
                        onChange={handleMeetingFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Reason for Rescheduling
                    </label>
                    <textarea
                      name="description"
                      value={meetingForm.description}
                      onChange={handleMeetingFormChange}
                      rows="3"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Provide a reason for rescheduling..."
                      required
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    type="button"
                    onClick={() => {
                      setShowRescheduleModal(false);
                      setSelectedMeeting(null);
                    }}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Reschedule Meeting
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

export default MentorDashboard;