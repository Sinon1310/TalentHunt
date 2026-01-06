import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Users, Calendar, MessageSquare, Award, Search, Bell, ChevronDown, User, X } from 'lucide-react';
import Sidebar from './Sidebar';
import { useUser } from '../Contexts/UserContext';
import { profileApi } from '../api/profile';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [replyMessage, setReplyMessage] = useState('');
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user, logout, updateUser } = useUser();

  // Load user profile data on component mount
  useEffect(() => {
    const loadProfileData = async () => {
      try {
        console.log('Loading profile data...', { user, token: localStorage.getItem('token') });
        const response = await profileApi.getProfile();
        console.log('Profile response:', response);
        
        setProfileData({
          ...response.data.user,
          profileCompleteness: response.data.profileCompleteness
        });
        updateUser({
          ...response.data.user,
          profileCompleteness: response.data.profileCompleteness
        });
        
        // Redirect to onboarding if profile is not complete
        if (!response.data.user.onboarding?.completed && response.data.profileCompleteness < 50) {
          console.log('Redirecting to onboarding - profile incomplete');
          navigate('/onboarding');
          return;
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error loading profile data:', error);
        console.error('Error details:', error.response?.data);
        setLoading(false);
      }
    };

    if (user) {
      loadProfileData();
    }
  }, [user, navigate, updateUser]);

  // Handle logout
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Sample data - in a real app, this would come from an API
  const [upcomingCompetitions] = useState([
    {
      id: 1,
      title: "Annual Hackathon 2025",
      description: "Build innovative solutions for real-world problems in 48 hours",
      date: "October 15-17, 2025",
      status: "Upcoming",
      participants: 48,
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80",
      bgColor: "from-blue-600 to-indigo-700"
    },
    {
      id: 2,
      title: "Design Challenge",
      description: "Create innovative and user-centered designs for next-generation applications",
      date: "November 5-7, 2025",
      status: "Open",
      participants: 32,
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80",
      bgColor: "from-purple-600 to-pink-600"
    }
  ]);
  
  const [teamRequests, setTeamRequests] = useState([
    {
      id: 1,
      name: "Sarah Dmello",
      role: "UI/UX Designer",
      skills: ["Figma", "User Research", "Prototyping"],
      competition: "Design Challenge",
      avatar: null,
      status: 'pending'
    },
    {
      id: 2,
      name: "Michael Johnson",
      role: "Backend Developer",
      skills: ["Node.js", "MongoDB", "Express"],
      competition: "Annual Hackathon 2025",
      avatar: null,
      status: 'pending'
    }
  ]);
  
  const [mentorMessages, setMentorMessages] = useState([
    {
      id: 1,
      mentor: "Dr. Joseph",
      message: "I've reviewed your project proposal. Let's schedule a meeting to discuss the technical approach.",
      time: "2 hours ago",
      avatar: null,
      replied: false
    },
    {
      id: 2,
      mentor: "Prof. Prachi Patil",
      message: "Your team's progress looks good. I've shared some resources that might help with the UI design.",
      time: "Yesterday",
      avatar: null,
      replied: false
    }
  ]);

  // Handler for team request actions
  const handleTeamRequest = (requestId, action) => {
    setTeamRequests(prevRequests =>
      prevRequests.map(request =>
        request.id === requestId
          ? { ...request, status: action }
          : request
      )
    );

    // Show notification (you can replace this with your preferred notification system)
    const request = teamRequests.find(r => r.id === requestId);
    alert(`${action === 'accepted' ? 'Accepted' : 'Declined'} team request from ${request.name}`);
  };

  // Handler for mentor message replies
  const handleReplySubmit = (e) => {
    e.preventDefault();
    if (!replyMessage.trim()) return;

    setMentorMessages(prevMessages =>
      prevMessages.map(message =>
        message.id === selectedMentor.id
          ? { ...message, replied: true }
          : message
      )
    );

    // In a real app, you would send this to an API
    console.log(`Replying to ${selectedMentor.mentor}: ${replyMessage}`);
    
    // Reset the form
    setReplyMessage('');
    setShowReplyModal(false);
    setSelectedMentor(null);

    // Show notification
    alert('Reply sent successfully!');
  };

  // Modal for replying to mentor messages
  const ReplyModal = () => {
    if (!showReplyModal || !selectedMentor) return null;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-bold">Reply to {selectedMentor.mentor}</h3>
            <button 
              onClick={() => setShowReplyModal(false)}
              className="p-1 hover:bg-gray-100 rounded-full"
            >
              <X size={20} className="text-gray-500" />
            </button>
          </div>
          
          <div className="mb-4">
            <p className="text-sm text-gray-600">{selectedMentor.message}</p>
          </div>

          <form onSubmit={handleReplySubmit}>
            <textarea
              value={replyMessage}
              onChange={(e) => setReplyMessage(e.target.value)}
              placeholder="Type your reply..."
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
            />
            <div className="flex justify-end mt-4 space-x-2">
              <button
                type="button"
                onClick={() => setShowReplyModal(false)}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700"
              >
                Send Reply
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  // Show loading state while profile data is being loaded
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-lg fixed top-0 left-0 right-0 z-10">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <button onClick={() => navigate('/dashboard')} className="flex items-center space-x-2 focus:outline-none">
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                TalentHunt
              </div>
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
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/50 backdrop-blur-sm"
                />
              </div>
            </div>
            
            {/* User Menu */}
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-600 hover:text-blue-600 focus:outline-none">
                <Bell size={20} />
                <span className="absolute top-0 right-0 h-4 w-4 bg-gradient-to-r from-red-500 to-pink-500 rounded-full text-xs text-white flex items-center justify-center">
                  3
                </span>
              </button>
              
              <div className="relative">
                <button 
                  className="flex items-center space-x-2 focus:outline-none"
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center">
                    {user?.profileImage ? (
                      <img 
                        src={user.profileImage} 
                        alt={user.name} 
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <User size={18} className="text-white" />
                    )}
                  </div>
                  <span className="hidden md:inline-block font-medium">{user?.name || 'User'}</span>
                  <ChevronDown size={16} className="text-gray-500" />
                </button>
                
                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white/80 backdrop-blur-md rounded-lg shadow-lg py-1 z-10">
                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50">
                      Your Profile
                    </Link>
                    <div className="border-t border-gray-100 my-1"></div>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
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
      <main className="pt-16">
        <div className="container mx-auto px-4 py-8 flex">
          {/* Sidebar */}
          <div className="w-64 flex-shrink-0 hidden md:block">
            <Sidebar />
          </div>
          
          {/* Main Dashboard Content */}
          <div className="flex-1 ml-0 md:ml-8">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 mb-8 text-white shadow-lg">
              <h1 className="text-3xl font-bold mb-2">Welcome Back, {profileData?.name || user?.name || 'User'}!</h1>
              <p className="text-blue-100 mb-4">
                {profileData?.bio || "Ready to showcase your talent and find amazing teammates!"}
              </p>
              
              {/* Profile Completeness Bar */}
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-blue-100">Profile Completeness</span>
                  <span className="text-sm font-bold text-white">
                    {profileData?.profileCompleteness || 0}%
                  </span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${profileData?.profileCompleteness || 0}%` }}
                  ></div>
                </div>
                {(profileData?.profileCompleteness || 0) < 100 && (
                  <button 
                    onClick={() => navigate('/profile')}
                    className="mt-2 text-sm text-yellow-200 hover:text-white font-medium"
                  >
                    Complete your profile →
                  </button>
                )}
              </div>
            </div>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-6 transform transition-all hover:scale-105 hover:shadow-xl border border-gray-100">
                <div className="flex items-center">
                  <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-3 rounded-xl shadow-lg">
                    <Award size={24} className="text-white" />
                  </div>
                  <div className="ml-4">
                    <h2 className="text-sm font-medium text-gray-600">Active Competitions</h2>
                    <p className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">2</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-6 transform transition-all hover:scale-105 hover:shadow-xl border border-gray-100">
                <div className="flex items-center">
                  <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-3 rounded-xl shadow-lg">
                    <Users size={24} className="text-white" />
                  </div>
                  <div className="ml-4">
                    <h2 className="text-sm font-medium text-gray-600">Team Requests</h2>
                    <p className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">5</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-6 transform transition-all hover:scale-105 hover:shadow-xl border border-gray-100">
                <div className="flex items-center">
                  <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-3 rounded-xl shadow-lg">
                    <MessageSquare size={24} className="text-white" />
                  </div>
                  <div className="ml-4">
                    <h2 className="text-sm font-medium text-gray-600">Mentor Messages</h2>
                    <p className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">3</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Competition Cards */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">
                Upcoming Competitions
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {upcomingCompetitions.map((competition) => (
                  <div key={competition.id} className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-xl border border-gray-100">
                    <div className="relative h-48">
                      <div className={`absolute inset-0 bg-gradient-to-r ${competition.bgColor} opacity-90`}></div>
                      <img 
                        src={competition.image} 
                        alt={competition.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                        <h3 className="text-xl font-bold text-white mb-1">{competition.title}</h3>
                        <div className="flex items-center space-x-3">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/20 text-white backdrop-blur-sm">
                            {competition.status}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <p className="text-gray-600 mb-4">{competition.description}</p>
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="flex items-center text-sm text-gray-500 mb-1">
                            <Calendar size={16} className="mr-2" />
                            {competition.date}
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <Users size={16} className="mr-2" />
                            {competition.participants} participants
                          </div>
                        </div>
                        <Link
                          to={`/competitions/${competition.id}`}
                          className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Team Requests and Mentor Messages */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Team Requests */}
              <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-6 border border-gray-100">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                    Team Requests
                  </h2>
                  {/* <Link to="/teams/requests" className="text-sm text-blue-600 hover:text-blue-700">
                    View All
                  </Link> */}
                </div>
                
                <div className="space-y-4">
                  {teamRequests.map((request) => (
                    <div key={request.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-all bg-white/50">
                      <div className="flex justify-between">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center shadow-md">
                            <User size={20} className="text-white" />
                          </div>
                          <div className="ml-3">
                            <h3 className="font-medium text-gray-900">{request.name}</h3>
                            <p className="text-sm text-gray-500">{request.role}</p>
                          </div>
                        </div>
                        <div className="text-xs text-gray-500">
                          For: {request.competition}
                        </div>
                      </div>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {request.skills.map((skill, index) => (
                          <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {skill}
                          </span>
                        ))}
                      </div>
                      {request.status === 'pending' ? (
                        <div className="mt-3 flex space-x-2">
                          <button 
                            onClick={() => handleTeamRequest(request.id, 'accepted')}
                            className="px-4 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg"
                          >
                            Accept
                          </button>
                          <button 
                            onClick={() => handleTeamRequest(request.id, 'declined')}
                            className="px-4 py-1.5 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50 transition-all"
                          >
                            Decline
                          </button>
                        </div>
                      ) : (
                        <div className="mt-3">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            request.status === 'accepted' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {request.status === 'accepted' ? 'Accepted' : 'Declined'}
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Mentor Messages */}
              <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-6 border border-gray-100">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                    Mentor Messages
                  </h2>
                  {/* <Link to="/mentorship/messages" className="text-sm text-blue-600 hover:text-blue-700">
                    View All
                  </Link> */}
                </div>
                
                <div className="space-y-4">
                  {mentorMessages.map((message) => (
                    <div key={message.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-all bg-white/50">
                      <div className="flex items-start">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-md">
                          <User size={20} className="text-white" />
                        </div>
                        <div className="flex-1 ml-3">
                          <div className="flex justify-between items-start">
                            <h3 className="font-medium text-gray-900">{message.mentor}</h3>
                            <span className="text-xs text-gray-500">{message.time}</span>
                          </div>
                          <p className="mt-1 text-sm text-gray-600">{message.message}</p>
                          {!message.replied ? (
                            <button 
                              onClick={() => {
                                setSelectedMentor(message);
                                setShowReplyModal(true);
                              }}
                              className="mt-3 px-4 py-1.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all shadow-md hover:shadow-lg"
                            >
                              Reply
                            </button>
                          ) : (
                            <span className="mt-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Replied
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Reply Modal */}
      <ReplyModal />
    </div>
  );
};

export default Dashboard;