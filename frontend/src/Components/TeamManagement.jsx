import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, User, Users, Calendar, AlertCircle, Plus, RefreshCw } from 'lucide-react';
import axios from 'axios';

const TeamManagement = () => {
  const navigate = useNavigate();
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5002/api/teams');
      console.log('Fetched teams:', response.data);
      setTeams(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching teams:', err);
      setError('Failed to load teams');
    } finally {
      setLoading(false);
    }
  };
  
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800 border border-green-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 border border-red-200';
      case 'pending':
        return 'bg-amber-100 text-amber-800 border border-amber-200';
      default:
        return 'bg-gray-100 text-gray-800 border border-gray-200';
    }
  };

  const filteredTeams = teams.filter(team => {
    const matchesSearch = team.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         team.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || team.status === statusFilter;
    return matchesSearch && matchesStatus;
  });
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-xl shadow-md">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto"></div>
          <p className="mt-6 text-gray-600 font-medium">Loading teams...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-md max-w-md w-full">
          <div className="text-center mb-6">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-800 mb-2">Something went wrong</h2>
            <p className="text-red-600">{error}</p>
          </div>
          <div className="flex justify-center">
            <button
              onClick={() => fetchTeams()}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition mr-3 flex items-center"
            >
              <RefreshCw className="w-4 h-4 mr-2" /> Try Again
            </button>
            <button
              onClick={() => navigate(-1)}
              className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-gray-600 hover:text-gray-900 transition"
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="ml-1 font-medium">Back</span>
            </button>
            <h1 className="text-3xl font-bold text-gray-900">Teams Management</h1>
          </div>
          <Link
            to="/create-team"
            className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-sm flex items-center justify-center"
          >
            <Plus className="w-4 h-4 mr-2" /> Create New Team
          </Link>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search teams..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2.5 pl-4 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
              </div>
            </div>
            <div className="w-full md:w-48">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-white"
              >
                <option value="all">All Statuses</option>
                <option value="approved">Approved</option>
                <option value="pending">Pending</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Teams Grid */}
        {filteredTeams.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTeams.map((team) => (
              <div
                key={team._id}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden border border-gray-100"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-xl font-bold text-gray-800 hover:text-blue-600 transition">{team.name}</h2>
                      <div className="flex items-center mt-1 text-sm text-gray-500">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>Created {new Date(team.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                    </div>
                    <span className={`px-3 py-1.5 rounded-full text-xs font-medium ${getStatusBadgeClass(team.status)}`}>
                      {team.status || 'pending'}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-5 line-clamp-2 text-sm">{team.description}</p>

                  <div className="space-y-3 bg-gray-50 p-3 rounded-lg">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 flex items-center">
                        <Users className="w-4 h-4 mr-2 text-gray-500" />
                        Members
                      </span>
                      <span className="font-medium">{team.members?.length || 0}/{team.maxMembers}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Recruiting</span>
                      <span className={`font-medium ${team.lookingForMembers ? 'text-green-600' : 'text-gray-600'}`}>
                        {team.lookingForMembers ? 'Yes' : 'No'}
                      </span>
                    </div>
                  </div>
                      
                  {team.members && team.members.length > 0 && (
                    <div className="mt-5">
                      <p className="text-sm font-medium text-gray-700 mb-2">Team Members:</p>
                      <div className="flex flex-wrap gap-2">
                        {team.members.slice(0, 3).map((member, index) => (
                          <div
                            key={index}
                            className="flex items-center bg-gray-50 rounded-full px-3 py-1.5 border border-gray-200"
                          >
                            <User className="w-3.5 h-3.5 text-gray-500 mr-1.5" />
                            <span className="text-sm text-gray-700 truncate max-w-[100px]">{member.userId}</span>
                          </div>
                        ))}
                        {team.members.length > 3 && (
                          <div className="flex items-center bg-gray-50 rounded-full px-3 py-1.5 border border-gray-200">
                            <span className="text-sm text-gray-700">+{team.members.length - 3} more</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="mt-6 pt-4 border-t border-gray-100">
                    <Link
                      to={`/teams/${team._id}`}
                      className="w-full inline-block text-center py-2.5 bg-blue-50 text-blue-700 font-medium rounded-lg hover:bg-blue-100 transition"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center bg-white rounded-xl shadow-sm py-16 px-6">
            <div className="bg-blue-50 p-4 rounded-full mb-4">
              <Users className="w-12 h-12 text-blue-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">No teams found</h3>
            <p className="text-gray-500 mb-6 text-center max-w-md">
              {searchTerm || statusFilter !== 'all' 
                ? "No teams match your current filters. Try adjusting your search criteria."
                : "You haven't created or joined any teams yet. Create your first team to get started!"}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/create-team"
                className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-sm flex items-center justify-center"
              >
                <Plus className="w-4 h-4 mr-2" /> Create Your First Team
              </Link>
              {(searchTerm || statusFilter !== 'all') && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setStatusFilter('all');
                  }}
                  className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition flex items-center justify-center"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamManagement;