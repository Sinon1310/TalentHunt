import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ChevronLeft, Users, Plus, AlertCircle, X } from 'lucide-react';
import { useUser } from '../Contexts/UserContext';

const TeamCreate = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useUser();
  const [error, setError] = useState('');
  const [teamData, setTeamData] = useState({
    name: '',
    description: '',
    maxMembers: 4,
    lookingForMembers: true,
    skills: [],
    competitionId: id
  });
  const [currentSkill, setCurrentSkill] = useState('');
  const [errors, setErrors] = useState({});

  // Validate user is logged in
  useEffect(() => {
    if (!user) {
      navigate('/auth', { state: { from: `/team/new/${id}` } });
    }
  }, [user, navigate, id]);

  const validateForm = () => {
    const newErrors = {};
    if (!teamData.name.trim()) {
      newErrors.name = 'Team name is required';
    }
    if (!teamData.description.trim()) {
      newErrors.description = 'Team description is required';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Here you would typically send the data to your backend
    console.log('Creating team:', teamData);
    
    // For now, we'll just navigate back to the competition page
    navigate(`/competitions/${id}`, { replace: true });
  };

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (currentSkill.trim() && !teamData.skills.includes(currentSkill.trim())) {
      setTeamData({
        ...teamData,
        skills: [...teamData.skills, currentSkill.trim()]
      });
      setCurrentSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setTeamData({
      ...teamData,
      skills: teamData.skills.filter(skill => skill !== skillToRemove)
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTeamData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <Link to={`/competitions/${id}`} className="inline-flex items-center text-blue-600 hover:text-blue-700">
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
            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
                <AlertCircle className="text-red-500 mr-2 flex-shrink-0 mt-0.5" size={16} />
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

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
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter team name"
                  minLength={3}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                )}
                <p className="mt-1 text-sm text-gray-500">
                  Choose a unique and memorable name for your team
                </p>
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
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.description ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Describe your team's goals, expertise, and what you're looking for in potential team members"
                  minLength={20}
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                )}
                <p className="mt-1 text-sm text-gray-500">
                  Minimum 20 characters. Be specific about your team's objectives and requirements.
                </p>
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
                <p className="mt-1 text-sm text-gray-500">
                  You can always change this later if needed
                </p>
              </div>

              {/* Looking for Members */}
              <div>
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
                <p className="mt-1 text-sm text-gray-500 ml-6">
                  Your team will be visible to other participants looking to join a team
                </p>
              </div>

              {/* Looking for Skills */}
              <div>
                <label htmlFor="skills" className="block text-sm font-medium text-gray-700 mb-1">
                  Looking for (Skills)
                </label>
                <div className="flex gap-2 mb-2 flex-wrap">
                  {teamData.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          handleRemoveSkill(skill);
                        }}
                        className="ml-1 inline-flex items-center justify-center"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    id="skills"
                    value={currentSkill}
                    onChange={(e) => setCurrentSkill(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Add required skills..."
                  />
                  <button
                    type="button"
                    onClick={handleAddSkill}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
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
              <li>• You will be automatically assigned as the team leader</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TeamCreate; 