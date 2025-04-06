import React, { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ChevronLeft, Users, Plus } from 'lucide-react';

const TeamCreate = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [teamData, setTeamData] = useState({
    name: '',
    description: '',
    maxMembers: 4,
    lookingForMembers: true
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically make an API call to create the team
    console.log('Creating team:', teamData);
    // For now, just show an alert and navigate back
    alert('Team created successfully!');
    navigate(`/competition/${id}`);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTeamData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <Link to={`/competition/${id}`} className="inline-flex items-center text-blue-600 hover:text-blue-700">
            <ChevronLeft size={20} className="mr-1" />
            Back to Competition
          </Link>
          <h1 className="text-3xl font-bold text-gray-800 mt-2">Create New Team</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Team Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Team Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={teamData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter team name"
                />
              </div>

              {/* Team Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Team Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  required
                  value={teamData.description}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Describe your team's goals and expertise"
                />
              </div>

              {/* Team Size */}
              <div>
                <label htmlFor="maxMembers" className="block text-sm font-medium text-gray-700 mb-1">
                  Maximum Team Size *
                </label>
                <select
                  id="maxMembers"
                  name="maxMembers"
                  value={teamData.maxMembers}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value={2}>2 Members</option>
                  <option value={3}>3 Members</option>
                  <option value={4}>4 Members</option>
                </select>
              </div>

              {/* Looking for Members */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="lookingForMembers"
                  name="lookingForMembers"
                  checked={teamData.lookingForMembers}
                  onChange={(e) => setTeamData(prev => ({
                    ...prev,
                    lookingForMembers: e.target.checked
                  }))}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="lookingForMembers" className="ml-2 block text-sm text-gray-700">
                  Open to New Members
                </label>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2 font-medium"
                >
                  <Plus size={18} />
                  Create Team
                </button>
              </div>
            </form>
          </div>

          {/* Guidelines Card */}
          <div className="mt-6 bg-blue-50 border border-blue-100 rounded-lg p-4">
            <h3 className="text-blue-800 font-medium flex items-center gap-2">
              <Users size={18} />
              Team Guidelines
            </h3>
            <ul className="mt-2 space-y-2 text-sm text-blue-700">
              <li>• Teams must have 2-4 members</li>
              <li>• Each team must have at least one experienced member</li>
              <li>• All team members must be registered participants</li>
              <li>• Teams can be open or closed to new members</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TeamCreate; 