import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Users, Calendar, Clock, MapPin, Award, User, FileText, ChevronLeft, MessageSquare, Share2, CheckCircle } from 'lucide-react';

const CompetitionDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Use navigate instead of window.location.href
  const [activeTab, setActiveTab] = useState('overview');
  
  // Sample teams data
  const teamsData = {
    1: [ // Teams for Annual Hackathon
      {
        id: 101,
        name: "CodeCrafters",
        members: 3,
        maxMembers: 4,
        lookingForMembers: true,
        memberInitials: ["A", "B", "C"]
      },
      {
        id: 102,
        name: "TechTitans",
        members: 3,
        maxMembers: 4,
        lookingForMembers: true,
        memberInitials: ["D", "E", "F"]
      },
      {
        id: 103,
        name: "ByteBusters",
        members: 3,
        maxMembers: 4,
        lookingForMembers: true,
        memberInitials: ["G", "H", "I"]
      },
      {
        id: 104,
        name: "DataDynamos",
        members: 3,
        maxMembers: 4,
        lookingForMembers: true,
        memberInitials: ["J", "K", "L"]
      }
    ],
    2: [ // Teams for Design Challenge
      {
        id: 201,
        name: "DesignDreamers",
        members: 3,
        maxMembers: 4,
        lookingForMembers: true,
        memberInitials: ["M", "N", "O"]
      },
      {
        id: 202,
        name: "UXUnicorns",
        members: 3,
        maxMembers: 4,
        lookingForMembers: true,
        memberInitials: ["P", "Q", "R"]
      },
      {
        id: 203,
        name: "PixelPioneers",
        members: 3,
        maxMembers: 4,
        lookingForMembers: true,
        memberInitials: ["S", "T", "U"]
      },
      {
        id: 204,
        name: "CreativeCore",
        members: 3,
        maxMembers: 4,
        lookingForMembers: true,
        memberInitials: ["V", "W", "X"]
      }
    ],
    3: [ // Teams for AI Innovation Contest
      {
        id: 301,
        name: "AI Innovators",
        members: 3,
        maxMembers: 4,
        lookingForMembers: true,
        memberInitials: ["R", "S", "T"],
        description: "Focusing on developing cutting-edge AI solutions for healthcare"
      },
      {
        id: 302,
        name: "Neural Networks",
        members: 2,
        maxMembers: 4,
        lookingForMembers: true,
        memberInitials: ["U", "V"],
        description: "Specializing in deep learning and computer vision"
      },
      {
        id: 303,
        name: "ML Masters",
        members: 3,
        maxMembers: 4,
        lookingForMembers: true,
        memberInitials: ["W", "X", "Y"],
        description: "Expert team in machine learning and data analytics"
      },
      {
        id: 304,
        name: "DataMinds",
        members: 2,
        maxMembers: 4,
        lookingForMembers: true,
        memberInitials: ["Z", "A"],
        description: "Focused on AI-driven data analysis and predictions"
      }
    ]
  };

  // Sample competition data based on ID
  const competitions = {
    1: {
      id: 1,
      name: "Annual Hackathon 2025",
      description: "Build innovative solutions for real-world problems in 48 hours. This hackathon focuses on creating technology that addresses sustainability challenges.",
      date: "October 15-17, 2025",
      time: "9:00 AM - 5:00 PM",
      location: "University Main Campus, Building A",
      registrationDeadline: "October 10, 2025",
      prizes: [
        "1st Place: $5,000",
        "2nd Place: $2,500",
        "3rd Place: $1,000",
        "Best UI/UX: $500",
        "Most Innovative: $500"
      ],
      requirements: [
        "Teams of 2-4 students",
        "At least one team member must have programming experience",
        "All team members must be currently enrolled students",
        "Projects must be started during the hackathon (no pre-built projects)"
      ],
      timeline: [
        { date: "October 15, 9:00 AM", event: "Opening Ceremony" },
        { date: "October 15, 10:00 AM", event: "Hacking Begins" },
        { date: "October 16, 2:00 PM", event: "Midway Check-in" },
        { date: "October 17, 10:00 AM", event: "Hacking Ends" },
        { date: "October 17, 1:00 PM", event: "Project Presentations" },
        { date: "October 17, 4:00 PM", event: "Awards Ceremony" }
      ],
      organizers: [
        { name: "Dr. Sarah Chen", role: "Faculty Advisor" },
        { name: "Tech Innovation Club", role: "Student Organization" }
      ],
      registeredTeams: 12,
      maxTeams: 20,
      isRegistered: false
    },
    2: {
      id: 2,
      name: "Design Challenge",
      description: "Create innovative and user-centered designs for next-generation applications. This challenge focuses on solving real-world UX problems with creative solutions.",
      date: "November 5-7, 2025",
      time: "9:00 AM - 6:00 PM",
      location: "Design Innovation Center, Building B",
      registrationDeadline: "November 1, 2025",
      prizes: [
        "1st Place: $3,000",
        "2nd Place: $1,500",
        "3rd Place: $750",
        "Best Innovation: $500",
        "People's Choice: $500"
      ],
      requirements: [
        "Teams of 2-4 designers/developers",
        "At least one UI/UX designer per team",
        "All team members must be currently enrolled students",
        "Designs must be original and created during the challenge"
      ],
      timeline: [
        { date: "November 5, 9:00 AM", event: "Opening & Brief" },
        { date: "November 5, 10:00 AM", event: "Design Sprint Begins" },
        { date: "November 6, 2:00 PM", event: "Design Review" },
        { date: "November 7, 10:00 AM", event: "Final Touches" },
        { date: "November 7, 2:00 PM", event: "Presentations" },
        { date: "November 7, 5:00 PM", event: "Awards" }
      ],
      organizers: [
        { name: "Prof. Emily Wong", role: "Design Lead" },
        { name: "Design Innovation Lab", role: "Host Organization" }
      ],
      registeredTeams: 8,
      maxTeams: 15,
      isRegistered: false
    },
    3: {
      id: 3,
      name: "AI Innovation Contest",
      description: "Develop AI solutions that can transform industries. Put your machine learning skills to the test and create impactful solutions.",
      date: "December 10-12, 2025",
      time: "9:00 AM - 6:00 PM",
      location: "AI Research Center, Building C",
      registrationDeadline: "November 30, 2025",
      prizes: [
        "1st Place: $4,000",
        "2nd Place: $2,000",
        "3rd Place: $1,000",
        "Best AI Implementation: $500",
        "Most Innovative Solution: $500"
      ],
      requirements: [
        "Teams of 2-4 members",
        "At least one member with ML/AI experience",
        "All team members must be currently enrolled students",
        "Solutions must be developed during the contest"
      ],
      timeline: [
        { date: "December 10, 9:00 AM", event: "Opening Ceremony" },
        { date: "December 10, 10:00 AM", event: "Development Begins" },
        { date: "December 11, 2:00 PM", event: "Progress Review" },
        { date: "December 12, 10:00 AM", event: "Development Ends" },
        { date: "December 12, 1:00 PM", event: "Project Demonstrations" },
        { date: "December 12, 4:00 PM", event: "Awards Ceremony" }
      ],
      organizers: [
        { name: "Dr. Michael Zhang", role: "AI Research Lead" },
        { name: "AI Innovation Lab", role: "Host Organization" }
      ],
      registeredTeams: 5,
      maxTeams: 15,
      isRegistered: false
    }
  };

  // Add console logging for debugging
  console.log('Competition ID:', id);
  console.log('Available competitions:', Object.keys(competitions));
  console.log('Selected competition:', competitions[id]);

  const competition = competitions[id];
  
  // If competition not found, redirect to competitions page
  useEffect(() => {
    if (!competition) {
      navigate('/competitions');
    }
  }, [competition, navigate]);

  // If competition is not found, show loading or return null
  if (!competition) {
    return null;
  }

  const teams = teamsData[id] || [];

  // Function to handle team join request
  const handleJoinTeam = (teamId) => {
    alert('Join request sent to team!');
    // Here you would typically make an API call to handle the join request
  };

  // Function to handle team creation
  const handleCreateTeam = () => {
    navigate(`/team/new/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <Link to="/dashboard" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4 md:mb-0">
                <ChevronLeft size={20} className="mr-1" />
                Back to Dashboard
              </Link>
              <h1 className="text-3xl font-bold text-gray-800 mt-2">{competition.name}</h1>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 mt-4 md:mt-0">
              {!competition.isRegistered ? (
                <button 
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition flex items-center justify-center"
                  onClick={() => alert('Registration successful!')}
                >
                  Register Now
                </button>
              ) : (
                <button 
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition flex items-center justify-center"
                  disabled
                >
                  <CheckCircle size={18} className="mr-2" />
                  Registered
                </button>
              )}
            </div>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Competition Banner */}
          <div className="h-48 bg-gradient-to-r from-blue-600 to-purple-600 relative">
            <div className="absolute inset-0 flex items-center justify-center text-white">
              <div className="text-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-2">{competition.name}</h2>
                <div className="flex flex-wrap justify-center gap-4">
                  <div className="flex items-center">
                    <Calendar size={18} className="mr-1" />
                    <span>{competition.date}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock size={18} className="mr-1" />
                    <span>{competition.time}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin size={18} className="mr-1" />
                    <span>{competition.location}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <div className="flex overflow-x-auto">
              <button
                className={`px-4 py-3 font-medium text-sm border-b-2 ${
                  activeTab === 'overview' 
                    ? 'border-blue-600 text-blue-600' 
                    : 'border-transparent text-gray-600 hover:text-gray-800'
                }`}
                onClick={() => setActiveTab('overview')}
              >
                Overview
              </button>
              <button
                className={`px-4 py-3 font-medium text-sm border-b-2 ${
                  activeTab === 'requirements' 
                    ? 'border-blue-600 text-blue-600' 
                    : 'border-transparent text-gray-600 hover:text-gray-800'
                }`}
                onClick={() => setActiveTab('requirements')}
              >
                Requirements
              </button>
              <button
                className={`px-4 py-3 font-medium text-sm border-b-2 ${
                  activeTab === 'timeline' 
                    ? 'border-blue-600 text-blue-600' 
                    : 'border-transparent text-gray-600 hover:text-gray-800'
                }`}
                onClick={() => setActiveTab('timeline')}
              >
                Timeline
              </button>
              <button
                className={`px-4 py-3 font-medium text-sm border-b-2 ${
                  activeTab === 'prizes' 
                    ? 'border-blue-600 text-blue-600' 
                    : 'border-transparent text-gray-600 hover:text-gray-800'
                }`}
                onClick={() => setActiveTab('prizes')}
              >
                Prizes
              </button>
              <button
                className={`px-4 py-3 font-medium text-sm border-b-2 ${
                  activeTab === 'teams' 
                    ? 'border-blue-600 text-blue-600' 
                    : 'border-transparent text-gray-600 hover:text-gray-800'
                }`}
                onClick={() => setActiveTab('teams')}
              >
                Teams
              </button>
            </div>
          </div>
          
          {/* Tab Content */}
          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">About This Competition</h3>
                <p className="text-gray-600 mb-6">{competition.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">Registration</h4>
                    <div className="flex items-center text-gray-600 mb-2">
                      <Calendar size={18} className="mr-2 text-blue-600" />
                      <span>Deadline: {competition.registrationDeadline}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Users size={18} className="mr-2 text-blue-600" />
                      <span>{competition.registeredTeams} / {competition.maxTeams} teams registered</span>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">Organizers</h4>
                    {competition.organizers.map((organizer, index) => (
                      <div key={index} className="flex items-center text-gray-600 mb-2 last:mb-0">
                        <User size={18} className="mr-2 text-blue-600" />
                        <span>{organizer.name} - {organizer.role}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <button className="px-4 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 transition flex items-center justify-center">
                    <FileText size={18} className="mr-2" />
                    Download Info Packet
                  </button>
                  <button className="px-4 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 transition flex items-center justify-center">
                    <MessageSquare size={18} className="mr-2" />
                    Contact Organizers
                  </button>
                  <button className="px-4 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 transition flex items-center justify-center">
                    <Share2 size={18} className="mr-2" />
                    Share
                  </button>
                </div>
              </div>
            )}
            
            {/* Requirements Tab */}
            {activeTab === 'requirements' && (
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Participation Requirements</h3>
                <ul className="space-y-3">
                  {competition.requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center mt-0.5 mr-3">
                        <span className="text-blue-600 text-xs font-bold">{index + 1}</span>
                      </div>
                      <span className="text-gray-600">{requirement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* Timeline Tab */}
            {activeTab === 'timeline' && (
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Event Timeline</h3>
                <div className="relative">
                  {/* Timeline line */}
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-blue-200"></div>
                  
                  <div className="space-y-6">
                    {competition.timeline.map((item, index) => (
                      <div key={index} className="flex items-start ml-2">
                        <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-600 flex items-center justify-center mt-0.5 mr-4 z-10">
                          <div className="h-2 w-2 rounded-full bg-white"></div>
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">{item.event}</p>
                          <p className="text-sm text-gray-600">{item.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {/* Prizes Tab */}
            {activeTab === 'prizes' && (
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Prizes & Awards</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {competition.prizes.map((prize, index) => {
                    const isTopThree = index < 3;
                    const colors = [
                      'bg-yellow-100 text-yellow-800 border-yellow-200',
                      'bg-gray-100 text-gray-800 border-gray-200',
                      'bg-orange-100 text-orange-800 border-orange-200'
                    ];
                    
                    return (
                      <div 
                        key={index} 
                        className={`p-4 rounded-lg border ${
                          isTopThree ? colors[index] : 'bg-blue-50 text-blue-800 border-blue-100'
                        }`}
                      >
                        <div className="flex items-center">
                          {isTopThree && (
                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mr-3">
                              <Award size={20} className={index === 0 ? 'text-yellow-500' : index === 1 ? 'text-gray-500' : 'text-orange-500'} />
                            </div>
                          )}
                          <span className="font-medium">{prize}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            
            {/* Teams Tab */}
            {activeTab === 'teams' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold text-gray-800">Registered Teams</h3>
                  <button 
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition flex items-center"
                    onClick={handleCreateTeam}
                  >
                    <Users size={18} className="mr-2" />
                    Create Team
                  </button>
                </div>
                
                {teams.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-600">No teams registered yet. Be the first to create a team!</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {teams.map((team) => (
                      <div key={team.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="font-semibold text-gray-800 text-lg">{team.name}</h4>
                            {team.description && (
                              <p className="text-sm text-gray-600 mt-1">{team.description}</p>
                            )}
                          </div>
                          {team.lookingForMembers && (
                            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                              Looking for Members
                            </span>
                          )}
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <div className="flex -space-x-2 mr-3">
                              {team.memberInitials.map((initial, index) => (
                                <div 
                                  key={index} 
                                  className="w-8 h-8 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center text-blue-600 text-xs font-medium"
                                >
                                  {initial}
                                </div>
                              ))}
                            </div>
                            <span className="text-sm text-gray-600">
                              {team.members}/{team.maxMembers} members
                            </span>
                          </div>
                          
                          {team.lookingForMembers && (
                            <button 
                              onClick={() => handleJoinTeam(team.id)}
                              className="px-3 py-1.5 text-sm border border-blue-600 text-blue-600 rounded hover:bg-blue-50 transition"
                            >
                              Request to Join
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CompetitionDetails;