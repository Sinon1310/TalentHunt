import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, User, MessageSquare, Plus, X, Edit2, CheckCircle, Clock, AlertCircle, Award, Calendar, Users, Trash2 } from 'lucide-react';
import TeamChat from './TeamChat';
import VideoMeeting from './VideoMeeting';

const TeamManagement = () => {
  const { id } = useParams(); // Get team ID from URL parameters
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [showChat, setShowChat] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('');
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [messageContent, setMessageContent] = useState('');
  const [selectedMember, setSelectedMember] = useState(null);
  const [showMentorModal, setShowMentorModal] = useState(false);
  const [mentorMessage, setMentorMessage] = useState('');
  
  // Sample teams data - in a real app, this would be fetched from an API
  const teamsData = {
    // CodeCrafters - Annual Hackathon
    "101": {
      id: 101,
      name: "CodeCrafters",
      competition: "Annual Hackathon 2025",
      competitionId: 1,
      description: "We're building an AI-powered solution for sustainable urban planning. Our application will help city planners optimize resource allocation and reduce environmental impact.",
      members: [
        {
          id: 1,
          name: "Rahul Sharma",
          role: "Team Leader",
          skills: ["React", "Node.js", "Project Management"],
          avatar: null
        },
        {
          id: 2,
          name: "Priya Patel",
          role: "UI/UX Designer",
          skills: ["Figma", "User Research", "Prototyping"],
          avatar: null
        },
        {
          id: 3,
          name: "Arun Kumar",
          role: "Backend Developer",
          skills: ["Node.js", "MongoDB", "Express"],
          avatar: null
        }
      ],
      mentor: {
        id: 1,
        name: "Dr. Rajesh Verma",
        expertise: "AI and Machine Learning",
        department: "Computer Science"
      },
      tasks: [
        {
          id: 1,
          title: "Create project proposal",
          assignedTo: "Rahul Sharma",
          status: "completed",
          dueDate: "2025-10-05"
        },
        {
          id: 2,
          title: "Design UI mockups",
          assignedTo: "Priya Patel",
          status: "in-progress",
          dueDate: "2025-10-10"
        }
      ],
      lookingFor: ["Data Scientist"]
    },
    // TechTitans - Annual Hackathon
    "102": {
      id: 102,
      name: "TechTitans",
      competition: "Annual Hackathon 2025",
      competitionId: 1,
      description: "Developing a smart energy management system for homes using IoT and machine learning.",
      members: [
        {
          id: 4,
          name: "Vikram Singh",
          role: "Team Leader",
          skills: ["Python", "Machine Learning", "IoT"],
          avatar: null
        },
        {
          id: 5,
          name: "Neha Gupta",
          role: "Full Stack Developer",
          skills: ["React", "Node.js", "MongoDB"],
          avatar: null
        },
        {
          id: 6,
          name: "Raj Patel",
          role: "IoT Specialist",
          skills: ["Arduino", "Raspberry Pi", "Sensors"],
          avatar: null
        }
      ],
      mentor: {
        id: 2,
        name: "Dr. Meera Shah",
        expertise: "IoT and Embedded Systems",
        department: "Electronics Engineering"
      },
      tasks: [
        {
          id: 1,
          title: "IoT Architecture Design",
          assignedTo: "Raj Patel",
          status: "completed",
          dueDate: "2025-10-05"
        },
        {
          id: 2,
          title: "ML Model Development",
          assignedTo: "Vikram Singh",
          status: "in-progress",
          dueDate: "2025-10-12"
        }
      ],
      lookingFor: ["UI/UX Designer"]
    },
    // DesignDreamers - Design Challenge
    "201": {
      id: 201,
      name: "DesignDreamers",
      competition: "Design Challenge",
      competitionId: 2,
      description: "Creating an innovative healthcare app design focused on mental wellness and meditation.",
      members: [
        {
          id: 7,
          name: "Ananya Shah",
          role: "Team Leader",
          skills: ["UI/UX Design", "User Research", "Figma"],
          avatar: null
        },
        {
          id: 8,
          name: "Karan Mehta",
          role: "Visual Designer",
          skills: ["Illustration", "Animation", "Branding"],
          avatar: null
        },
        {
          id: 9,
          name: "Zara Khan",
          role: "UX Researcher",
          skills: ["User Research", "Prototyping", "Analytics"],
          avatar: null
        }
      ],
      mentor: {
        id: 3,
        name: "Prof. Arjun Desai",
        expertise: "Human-Computer Interaction",
        department: "Design"
      },
      tasks: [
        {
          id: 1,
          title: "User Research",
          assignedTo: "Zara Khan",
          status: "completed",
          dueDate: "2025-11-01"
        },
        {
          id: 2,
          title: "UI Design System",
          assignedTo: "Karan Mehta",
          status: "in-progress",
          dueDate: "2025-11-05"
        }
      ],
      lookingFor: ["Motion Designer"]
    }
  };

  // Get team data based on ID
  const [teamData, setTeamData] = useState(teamsData[id] || teamsData["101"]);

  const handleViewCompetition = () => {
    if (teamData && teamData.competitionId) {
      console.log('Navigating to competition:', teamData.competitionId);
      navigate(`/competitions/${teamData.competitionId}`, { replace: true });
    }
  };

  // Add useEffect to fetch team data based on ID
  useEffect(() => {
    // Update team data when ID changes
    setTeamData(teamsData[id] || teamsData["101"]);
    console.log(`Loading team data for ID: ${id}`);
  }, [id]);
  
  // State for new task form
  const [newTask, setNewTask] = useState({
    title: '',
    assignedTo: '',
    dueDate: ''
  });
  
  // State for task editing
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTask, setEditingTask] = useState({
    title: '',
    assignedTo: '',
    dueDate: '',
    status: ''
  });
  
  const handleAddTask = (e) => {
    e.preventDefault();
    
    const task = {
      id: teamData.tasks.length + 1,
      title: newTask.title,
      assignedTo: newTask.assignedTo,
      status: 'pending',
      dueDate: newTask.dueDate
    };
    
    setTeamData({
      ...teamData,
      tasks: [...teamData.tasks, task]
    });
    
    setNewTask({
      title: '',
      assignedTo: '',
      dueDate: ''
    });
    
    // Hide the form after adding
    document.getElementById('add-task-form').classList.add('hidden');
  };
  
  const handleEditTask = (taskId) => {
    const task = teamData.tasks.find(task => task.id === taskId);
    setEditingTaskId(taskId);
    setEditingTask({
      title: task.title,
      assignedTo: task.assignedTo,
      dueDate: task.dueDate,
      status: task.status
    });
  };
  
  const handleUpdateTask = (e) => {
    e.preventDefault();
    
    const updatedTasks = teamData.tasks.map(task => {
      if (task.id === editingTaskId) {
        return {
          ...task,
          title: editingTask.title,
          assignedTo: editingTask.assignedTo,
          dueDate: editingTask.dueDate,
          status: editingTask.status
        };
      }
      return task;
    });
    
    setTeamData({
      ...teamData,
      tasks: updatedTasks
    });
    
    setEditingTaskId(null);
  };
  
  const handleDeleteTask = (taskId) => {
    const updatedTasks = teamData.tasks.filter(task => task.id !== taskId);
    
    setTeamData({
      ...teamData,
      tasks: updatedTasks
    });
  };
  
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle size={16} className="text-green-600" />;
      case 'in-progress':
        return <Clock size={16} className="text-blue-600" />;
      case 'pending':
        return <AlertCircle size={16} className="text-yellow-600" />;
      default:
        return null;
    }
  };

  const handleSendMessage = (member) => {
    setSelectedMember(member);
    setShowMessageModal(true);
  };

  const handleSubmitMessage = (e) => {
    e.preventDefault();
    // Here you would typically send the message to your backend
    console.log(`Sending message to ${selectedMember.name}: ${messageContent}`);
    setShowMessageModal(false);
    setMessageContent('');
  };

  const handleInviteMember = () => {
    setShowInviteModal(true);
  };

  const handleSubmitInvite = (e) => {
    e.preventDefault();
    // Here you would typically send the invite to your backend
    console.log(`Inviting ${inviteEmail} as ${inviteRole}`);
    setShowInviteModal(false);
    setInviteEmail('');
    setInviteRole('');
  };

  const handleContactMentor = () => {
    setShowMentorModal(true);
  };

  const handleSubmitMentorMessage = (e) => {
    e.preventDefault();
    // Here you would typically send the message to your backend
    console.log(`Sending message to mentor ${teamData.mentor.name}: ${mentorMessage}`);
    setShowMentorModal(false);
    setMentorMessage('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="ml-1">Back</span>
            </button>
            <h1 className="text-2xl font-bold text-gray-900">{teamData?.name}</h1>
          </div>
          <button
            onClick={handleViewCompetition}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Award className="w-4 h-4 mr-2" />
            View Competition
          </button>
        </div>
      </div>
      
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link to="/dashboard" className="inline-flex items-center text-blue-600 hover:text-blue-800">
            <ChevronLeft size={20} />
            <span>Back to Dashboard</span>
          </Link>
        </div>
        
        {/* Team Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">{teamData.name}</h1>
              <p className="text-gray-600">Competition: {teamData.competition}</p>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-3">
              <VideoMeeting teamId={teamData.id} competitionId={teamData.competitionId} />
              <button 
                onClick={() => setShowChat(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition flex items-center"
              >
                <MessageSquare className="w-5 h-5 mr-2" />
                Team Chat
              </button>
              <Link
                to={`/competitions/${teamData.competitionId}`}
                className="px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition"
              >
                View Competition
              </Link>
            </div>
          </div>
          
          <div className="mt-4">
            <p className="text-gray-700">{teamData.description}</p>
          </div>
        </div>
        
        {/* Chat Modal */}
        {showChat && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
            <div className="fixed inset-0 flex items-center justify-center p-4">
              <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl h-[80vh] flex flex-col">
                <div className="flex items-center justify-between p-4 border-b">
                  <h2 className="text-xl font-semibold">Team Chat</h2>
                  <button
                    onClick={() => setShowChat(false)}
                    className="p-2 hover:bg-gray-100 rounded-full"
                  >
                    <X size={20} />
                  </button>
                </div>
                <TeamChat />
              </div>
            </div>
          </div>
        )}
        
        {/* Tabs */}
        <div className="mb-6 border-b border-gray-200">
          <nav className="flex space-x-8">
            <button
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'overview'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'members'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('members')}
            >
              Members
            </button>
            <button
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'tasks'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('tasks')}
            >
              Tasks
            </button>
            <button
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'resources'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('resources')}
            >
              Resources
            </button>
          </nav>
        </div>
        
        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-blue-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Team Members</h3>
                  <p className="text-3xl font-bold text-blue-600">{teamData.members.length}/4</p>
                  <p className="text-gray-600">Members in team</p>
                </div>
                
                <div className="bg-green-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Tasks Completed</h3>
                  <p className="text-3xl font-bold text-green-600">
                    {teamData.tasks.filter(task => task.status === 'completed').length}/{teamData.tasks.length}
                  </p>
                  <p className="text-gray-600">Tasks completed</p>
                </div>
                
                <div className="bg-purple-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Days Remaining</h3>
                  <p className="text-3xl font-bold text-purple-600">12</p>
                  <p className="text-gray-600">Until submission deadline</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Team Members</h3>
                  <div className="space-y-4">
                    {teamData.members.map((member) => (
                      <div key={member.id} className="flex items-start p-4 border border-gray-200 rounded-lg">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-4 flex-shrink-0">
                          <User size={20} className="text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-800">{member.name}</h4>
                          <p className="text-sm text-gray-600">{member.role}</p>
                          <div className="mt-1 flex flex-wrap gap-1">
                            {member.skills.map((skill, index) => (
                              <span key={index} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {teamData.lookingFor.length > 0 && (
                      <div className="p-4 border border-dashed border-gray-300 rounded-lg bg-gray-50">
                        <h4 className="font-medium text-gray-800 mb-2">Looking for:</h4>
                        <div className="flex flex-wrap gap-2">
                          {teamData.lookingFor.map((role, index) => (
                            <span key={index} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                              {role}
                            </span>
                          ))}
                        </div>
                        <button 
                          onClick={handleInviteMember}
                          className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition text-sm flex items-center"
                        >
                          <Plus size={16} className="mr-1" />
                          Invite Members
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Mentor</h3>
                  {teamData.mentor ? (
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-start">
                        <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mr-4 flex-shrink-0">
                          <User size={24} className="text-purple-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-800">{teamData.mentor.name}</h4>
                          <p className="text-sm text-gray-600">{teamData.mentor.expertise}</p>
                          <p className="text-sm text-gray-600">{teamData.mentor.department}</p>
                          <button 
                            onClick={handleContactMentor}
                            className="mt-3 px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition text-sm flex items-center"
                          >
                            <MessageSquare size={16} className="mr-1" />
                            Contact Mentor
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 border border-dashed border-gray-300 rounded-lg bg-gray-50">
                      <p className="text-gray-600 mb-3">No mentor assigned yet.</p>
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition text-sm">
                        Request a Mentor
                      </button>
                    </div>
                  )}
                  
                  <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Recent Activity</h3>
                  <div className="space-y-4">
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-start">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3 flex-shrink-0">
                          <User size={16} className="text-blue-600" />
                        </div>
                        <div>
                          <p className="text-gray-800">
                            <span className="font-medium">Priya Patel</span> completed the task <span className="font-medium">Design UI mockups</span>
                          </p>
                          <p className="text-sm text-gray-500">2 hours ago</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-start">
                        <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-3 flex-shrink-0">
                          <User size={16} className="text-purple-600" />
                        </div>
                        <div>
                          <p className="text-gray-800">
                            <span className="font-medium">Dr. Rajesh Verma</span> left a comment on your project proposal
                          </p>
                          <p className="text-sm text-gray-500">Yesterday</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-start">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3 flex-shrink-0">
                          <User size={16} className="text-blue-600" />
                        </div>
                        <div>
                          <p className="text-gray-800">
                            <span className="font-medium">Arun Kumar</span> started working on <span className="font-medium">Set up database schema</span>
                          </p>
                          <p className="text-sm text-gray-500">2 days ago</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Members Tab */}
          {activeTab === 'members' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Team Members</h2>
                <button 
                  onClick={handleInviteMember}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition flex items-center"
                >
                  <Plus size={18} className="mr-2" />
                  Invite Member
                </button>
              </div>
              
              <div className="space-y-6">
                {teamData.members.map((member) => (
                  <div key={member.id} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex flex-col md:flex-row md:items-start">
                      <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4 md:mb-0 md:mr-6 flex-shrink-0 mx-auto md:mx-0">
                        <User size={32} className="text-blue-600" />
                      </div>
                      <div className="flex-1 text-center md:text-left">
                        <h3 className="text-xl font-semibold text-gray-800">{member.name}</h3>
                        <p className="text-gray-600">{member.role}</p>
                        
                        <div className="mt-3 flex flex-wrap gap-2 justify-center md:justify-start">
                          {member.skills.map((skill, index) => (
                            <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {skill}
                            </span>
                          ))}
                        </div>
                        
                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="text-sm font-medium text-gray-700 mb-1">Assigned Tasks</h4>
                            <div className="space-y-2">
                              {teamData.tasks
                                .filter(task => task.assignedTo === member.name)
                                .map(task => (
                                  <div key={task.id} className="flex items-center">
                                    {getStatusIcon(task.status)}
                                    <span className="ml-2 text-sm text-gray-700">{task.title}</span>
                                  </div>
                                ))}
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-medium text-gray-700 mb-1">Contact</h4>
                            <button 
                              onClick={() => handleSendMessage(member)}
                              className="mt-1 px-3 py-1 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition text-sm flex items-center"
                            >
                              <MessageSquare size={14} className="mr-1" />
                              Send Message
                            </button>
                          </div>
                        </div>
                      </div>
                      
                      {member.name === "Rahul Sharma" && (
                        <div className="mt-4 md:mt-0 md:ml-4 flex-shrink-0 text-center md:text-left">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Team Leader
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                
                {teamData.lookingFor.length > 0 && (
                  <div className="border border-dashed border-gray-300 rounded-lg p-6 bg-gray-50 text-center">
                    <h3 className="text-lg font-medium text-gray-800 mb-2">Looking for team members</h3>
                    <div className="flex flex-wrap gap-2 justify-center mb-4">
                      {teamData.lookingFor.map((role, index) => (
                        <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          {role}
                        </span>
                      ))}
                    </div>
                    <button 
                      onClick={handleInviteMember}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition flex items-center mx-auto"
                    >
                      <Plus size={18} className="mr-2" />
                      Invite Members
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* Tasks Tab */}
          {activeTab === 'tasks' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Team Tasks</h2>
                <button 
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition flex items-center"
                  onClick={() => {
                    setNewTask({
                      title: '',
                      assignedTo: '',
                      dueDate: ''
                    });
                    document.getElementById('add-task-form').classList.toggle('hidden');
                  }}
                >
                  <Plus size={18} className="mr-2" />
                  Add Task
                </button>
              </div>
              
              {/* Add Task Form */}
              <div id="add-task-form" className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50 hidden">
                <h3 className="text-lg font-medium text-gray-800 mb-4">Add New Task</h3>
                <form onSubmit={handleAddTask} className="space-y-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="task-title">
                      Task Title
                    </label>
                    <input
                      id="task-title"
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={newTask.title}
                      onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="task-assigned">
                      Assigned To
                    </label>
                    <select
                      id="task-assigned"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={newTask.assignedTo}
                      onChange={(e) => setNewTask({...newTask, assignedTo: e.target.value})}
                      required
                    >
                      <option value="">Select a team member</option>
                      {teamData.members.map(member => (
                        <option key={member.id} value={member.name}>{member.name}</option>
                      ))}
                      <option value="Team">Entire Team</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="task-due-date">
                      Due Date
                    </label>
                    <input
                      id="task-due-date"
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={newTask.dueDate}
                      onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                      onClick={() => document.getElementById('add-task-form').classList.add('hidden')}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                      Add Task
                    </button>
                  </div>
                </form>
              </div>
              
              {/* Edit Task Form */}
              {editingTaskId && (
                <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Edit Task</h3>
                  <form onSubmit={handleUpdateTask} className="space-y-4">
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="edit-task-title">
                        Task Title
                      </label>
                      <input
                        id="edit-task-title"
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={editingTask.title}
                        onChange={(e) => setEditingTask({...editingTask, title: e.target.value})}
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="edit-task-assigned">
                        Assigned To
                      </label>
                      <select
                        id="edit-task-assigned"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={editingTask.assignedTo}
                        onChange={(e) => setEditingTask({...editingTask, assignedTo: e.target.value})}
                        required
                      >
                        <option value="">Select a team member</option>
                        {teamData.members.map(member => (
                          <option key={member.id} value={member.name}>{member.name}</option>
                        ))}
                        <option value="Team">Entire Team</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="edit-task-due-date">
                        Due Date
                      </label>
                      <input
                        id="edit-task-due-date"
                        type="date"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={editingTask.dueDate}
                        onChange={(e) => setEditingTask({...editingTask, dueDate: e.target.value})}
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="edit-task-status">
                        Status
                      </label>
                      <select
                        id="edit-task-status"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={editingTask.status}
                        onChange={(e) => setEditingTask({...editingTask, status: e.target.value})}
                        required
                      >
                        <option value="pending">Pending</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>
                    
                    <div className="flex justify-end space-x-3">
                      <button
                        type="button"
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                        onClick={() => setEditingTaskId(null)}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                      >
                        Update Task
                      </button>
                    </div>
                  </form>
                </div>
              )}
              
              {/* Tasks List */}
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Task
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Assigned To
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Due Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {teamData.tasks.map((task) => (
                      <tr key={task.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{task.title}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{task.assignedTo}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{task.dueDate}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(task.status)}`}>
                            {task.status.charAt(0).toUpperCase() + task.status.slice(1).replace('-', ' ')}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            className="text-blue-600 hover:text-blue-900 mr-3"
                            onClick={() => handleEditTask(task.id)}
                          >
                            Edit
                          </button>
                          <button
                            className="text-red-600 hover:text-red-900"
                            onClick={() => handleDeleteTask(task.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          Resources Tab
          {activeTab === 'resources' && (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Team Resources</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Project Documents</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span className="text-gray-700">Project Proposal.pdf</span>
                      </div>
                      <button className="text-blue-600 hover:text-blue-800">Download</button>
                    </li>
                    <li className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span className="text-gray-700">Project Timeline.xlsx</span>
                      </div>
                      <button className="text-blue-600 hover:text-blue-800">Download</button>
                    </li>
                    <li className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-gray-700">API Documentation.md</span>
                      </div>
                      <button className="text-blue-600 hover:text-blue-800">Download</button>
                    </li>
                  </ul>
                  <button className="mt-4 px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition flex items-center w-full justify-center">
                    <Plus size={18} className="mr-2" />
                    Upload Document
                  </button>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-800 mb-4">External Resources</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 015.656 0l4 4a4 4 0 01-5.656 5.656l-1.102-1.101" />
                        </svg>
                        <span className="text-gray-700">GitHub Repository</span>
                      </div>
                      <a href="#" className="text-blue-600 hover:text-blue-800">Visit</a>
                    </li>
                    <li className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 015.656 0l4 4a4 4 0 01-5.656 5.656l-1.102-1.101" />
                        </svg>
                        <span className="text-gray-700">Figma Design</span>
                      </div>
                      <a href="#" className="text-blue-600 hover:text-blue-800">Visit</a>
                    </li>
                    <li className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 015.656 0l4 4a4 4 0 01-5.656 5.656l-1.102-1.101" />
                        </svg>
                        <span className="text-gray-700">Project Management Board</span>
                      </div>
                      <a href="#" className="text-blue-600 hover:text-blue-800">Visit</a>
                    </li>
                  </ul>
                  <button className="mt-4 px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition flex items-center w-full justify-center">
                    <Plus size={18} className="mr-2" />
                    Add Resource
                  </button>
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="text-lg font-medium text-gray-800 mb-4">Meeting Notes</h3>
                <div className="border border-gray-200 rounded-lg p-6">
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-md">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium text-gray-800">Initial Team Meeting</h4>
                        <span className="text-sm text-gray-500">October 2, 2025</span>
                      </div>
                      <p className="text-gray-700">Discussed project scope, assigned initial tasks, and set up communication channels. Everyone agreed on the tech stack and project timeline.</p>
                    </div>
                    
                    <div className="p-4 bg-gray-50 rounded-md">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium text-gray-800">Mentor Check-in</h4>
                        <span className="text-sm text-gray-500">October 5, 2025</span>
                      </div>
                      <p className="text-gray-700">Dr. Rajesh Verma reviewed our project proposal and suggested focusing more on the AI algorithm's sustainability metrics. We'll incorporate his feedback in the next iteration.</p>
                    </div>
                  </div>
                  <button className="mt-4 px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition flex items-center w-full justify-center">
                    <Plus size={18} className="mr-2" />
                    Add Meeting Notes
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Message Modal */}
      {showMessageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-xl font-semibold">Send Message to {selectedMember?.name}</h2>
                <button
                  onClick={() => setShowMessageModal(false)}
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
                    required
                  />
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                    onClick={() => setShowMessageModal(false)}
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

      {/* Invite Member Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-xl font-semibold">Invite Team Member</h2>
                <button
                  onClick={() => setShowInviteModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X size={20} />
                </button>
              </div>
              <form onSubmit={handleSubmitInvite} className="p-4">
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Role
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={inviteRole}
                    onChange={(e) => setInviteRole(e.target.value)}
                    required
                  >
                    <option value="">Select a role</option>
                    <option value="Frontend Developer">Frontend Developer</option>
                    <option value="Backend Developer">Backend Developer</option>
                    <option value="UI/UX Designer">UI/UX Designer</option>
                    <option value="Data Scientist">Data Scientist</option>
                    <option value="ML Engineer">ML Engineer</option>
                  </select>
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                    onClick={() => setShowInviteModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Send Invite
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Mentor Contact Modal */}
      {showMentorModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-xl font-semibold">Contact Mentor - {teamData.mentor.name}</h2>
                <button
                  onClick={() => setShowMentorModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X size={20} />
                </button>
              </div>
              <form onSubmit={handleSubmitMentorMessage} className="p-4">
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows="4"
                    value={mentorMessage}
                    onChange={(e) => setMentorMessage(e.target.value)}
                    placeholder="Type your message to the mentor..."
                    required
                  />
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                    onClick={() => setShowMentorModal(false)}
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
    </div>
  );
};

export default TeamManagement;