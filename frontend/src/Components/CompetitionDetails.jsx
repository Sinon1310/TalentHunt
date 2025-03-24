import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Users, Calendar, Clock, MapPin, Award, User, FileText, ChevronLeft, MessageSquare, Share2 } from 'lucide-react';

const CompetitionDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Use navigate instead of window.location.href
  const [activeTab, setActiveTab] = useState('overview');
  
  // Sample data - in a real app, this would be fetched from an API based on the ID
  const competition = {
    id: id,
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
              
              {/* This is the fixed button that navigates to team management */}
              <button 
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition flex items-center justify-center"
                onClick={() => navigate(`/team/1`)} // Using navigate instead of window.location.href
              >
                <Users size={18} className="mr-2" />
                Join a Team
              </button>
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
                    onClick={() => navigate(`/team/1`)} // Using navigate instead of window.location.href
                  >
                    <Users size={18} className="mr-2" />
                    Join a Team
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map((team) => (
                    <div key={team} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold text-gray-800">Team {team}</h4>
                          <p className="text-sm text-gray-600">3/4 members</p>
                        </div>
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                          Looking for Members
                        </span>
                      </div>
                      <div className="mt-3 flex -space-x-2">
                        {[1, 2, 3].map((member) => (
                          <div key={member} className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs font-medium">
                            {String.fromCharCode(64 + member)}
                          </div>
                        ))}
                        <div className="w-8 h-8 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center text-blue-600 text-xs">
                          +1
                        </div>
                      </div>
                      <div className="mt-3">
                        <button 
                          className="w-full px-3 py-1.5 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 transition text-sm"
                          onClick={() => navigate(`/team/${team}`)} // Using navigate instead of window.location.href
                        >
                          View Team
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CompetitionDetails;