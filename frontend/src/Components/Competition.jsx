import React, { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Users } from 'lucide-react';

const Competition = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('teams');

  // Sample data for teams
  const teams = [
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
    }
  ];

  const handleCreateTeam = () => {
    navigate(`/team/new/${id}`, { replace: true });
  };

  return (
    <div className="min-h-screen bg-white p-8">
      {/* Back Navigation */}
      <Link to="/dashboard" className="text-blue-600 hover:text-blue-700 mb-6 inline-block">
        ← Back to Dashboard
      </Link>

      {/* Title */}
      <h1 className="text-2xl font-bold text-gray-900 mt-4 mb-8">Annual Hackathon 2025</h1>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="-mb-px flex space-x-8">
          <button
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'overview'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'requirements'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('requirements')}
          >
            Requirements
          </button>
          <button
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'timeline'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('timeline')}
          >
            Timeline
          </button>
          <button
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'prizes'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('prizes')}
          >
            Prizes
          </button>
          <button
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'teams'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('teams')}
          >
            Teams
          </button>
        </nav>
      </div>

      {/* Teams Content */}
      {activeTab === 'teams' && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Registered Teams</h2>
            <button 
              onClick={handleCreateTeam}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Users className="mr-2 h-5 w-5" />
              Create Team
            </button>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {teams.map((team) => (
              <div key={team.id} className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">{team.name}</h3>
                  {team.lookingForMembers && (
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                      Looking for Members
                    </span>
                  )}
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="flex -space-x-2">
                      {team.memberInitials.map((initial, index) => (
                        <div 
                          key={index}
                          className="w-8 h-8 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center text-blue-600 text-sm font-medium"
                        >
                          {initial}
                        </div>
                      ))}
                    </div>
                    <span className="ml-3 text-sm text-gray-600">
                      {team.members}/{team.maxMembers} members
                    </span>
                  </div>
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    Request to Join
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Competition; 