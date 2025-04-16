import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { User, Mail, Lock, ChevronLeft, Save, X, Plus, Edit2 } from 'lucide-react';
import { useUser } from '../Contexts/UserContext';

const ProfileSettings = () => {
  const { user: authUser } = useUser();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showSkillModal, setShowSkillModal] = useState(false);
  const [showInterestModal, setShowInterestModal] = useState(false);
  
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    role: '',
    department: '',
    bio: '',
    skills: [],
    education: '',
    interests: [],
    contactEmail: '',
    phone: '',
    github: '',
    linkedin: '',
    notificationPreferences: {
      teamRequests: true,
      mentorMessages: true,
      competitionUpdates: true,
      weeklyDigest: false
    }
  });
  
  const [newSkill, setNewSkill] = useState({ name: '', level: 'beginner' });
  const [newInterest, setNewInterest] = useState({ 
    name: '', 
    category: 'technical',
    level: 'curious',
    description: ''
  });

  useEffect(() => {
    if (!authUser) {
      setError('Please log in to view your profile');
      setLoading(false);
      return;
    }

    try {
      setUserData({
        name: authUser.name || authUser.displayName || '',
        email: authUser.email || '',
        role: authUser.role || 'Student',
        department: authUser.department || 'Computer Science',
        bio: authUser.bio || '',
        skills: authUser.skills || [],
        education: authUser.education || '',
        interests: authUser.interests || [],
        contactEmail: authUser.email || '',
        phone: authUser.phone || '',
        github: authUser.github || '',
        linkedin: authUser.linkedin || '',
        notificationPreferences: authUser.notificationPreferences || {
          teamRequests: true,
          mentorMessages: true,
          competitionUpdates: true,
          weeklyDigest: false
        }
      });
      setLoading(false);
    } catch (error) {
      setError('Failed to load profile data');
      setLoading(false);
    }
  }, [authUser]);

  const handleAddSkill = (e) => {
    e.preventDefault();
    const newSkillWithId = {
      _id: Date.now().toString(),
      ...newSkill
    };
    setUserData({
      ...userData,
      skills: [...userData.skills, newSkillWithId]
    });
    setNewSkill({ name: '', level: 'beginner' });
    setShowSkillModal(false);
  };

  const handleRemoveSkill = (skillId) => {
    setUserData({
      ...userData,
      skills: userData.skills.filter(skill => skill._id !== skillId)
    });
  };

  const handleAddInterest = (e) => {
    e.preventDefault();
    const newInterestWithId = {
      _id: Date.now().toString(),
      ...newInterest
    };
    setUserData({
      ...userData,
      interests: [...userData.interests, newInterestWithId]
    });
    setNewInterest({ 
      name: '', 
      category: 'technical',
      level: 'curious',
      description: ''
    });
    setShowInterestModal(false);
  };

  const handleRemoveInterest = (interestId) => {
    setUserData({
      ...userData,
      interests: userData.interests.filter(interest => interest._id !== interestId)
    });
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      // Here you would typically update the user data in your backend
      // For now, we'll just update the local state
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile');
    }
  };

  // Modal Components
  const SkillModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <h3 className="text-lg font-semibold mb-4">Add New Skill</h3>
        <form onSubmit={handleAddSkill}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Skill Name</label>
              <input
                type="text"
                value={newSkill.name}
                onChange={(e) => setNewSkill({...newSkill, name: e.target.value})}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Skill Level</label>
              <select
                value={newSkill.level}
                onChange={(e) => setNewSkill({...newSkill, level: e.target.value})}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
                <option value="expert">Expert</option>
              </select>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowSkillModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Add Skill
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );

  const InterestModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <h3 className="text-lg font-semibold mb-4">Add New Interest</h3>
        <form onSubmit={handleAddInterest}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Interest Name</label>
              <input
                type="text"
                value={newInterest.name}
                onChange={(e) => setNewInterest({...newInterest, name: e.target.value})}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <select
                value={newInterest.category}
                onChange={(e) => setNewInterest({...newInterest, category: e.target.value})}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="technical">Technical</option>
                <option value="business">Business</option>
                <option value="design">Design</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Level</label>
              <select
                value={newInterest.level}
                onChange={(e) => setNewInterest({...newInterest, level: e.target.value})}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="curious">Curious</option>
                <option value="hobbyist">Hobbyist</option>
                <option value="enthusiast">Enthusiast</option>
                <option value="passionate">Passionate</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Description (Optional)</label>
              <textarea
                value={newInterest.description}
                onChange={(e) => setNewInterest({...newInterest, description: e.target.value})}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                rows="3"
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowInterestModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Add Interest
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading profile...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center space-y-4">
        <div className="text-xl text-red-600">{error}</div>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  // Skills & Interests Tab Content
  const SkillsAndInterestsContent = () => (
    <div className="space-y-8">
      {/* Skills Section */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-gray-800">Skills</h3>
          <button
            onClick={() => setShowSkillModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <Plus size={18} />
            <span>Add Skill</span>
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {userData.skills.map((skill) => (
            <div
              key={skill._id}
              className="bg-white rounded-lg shadow p-4 flex justify-between items-center"
            >
              <div>
                <h4 className="font-medium text-gray-800">{skill.name}</h4>
                <p className="text-sm text-gray-500 capitalize">{skill.level}</p>
              </div>
              <button
                onClick={() => handleRemoveSkill(skill._id)}
                className="text-gray-400 hover:text-red-600"
              >
                <X size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Interests Section */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-gray-800">Interests</h3>
          <button
            onClick={() => setShowInterestModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
          >
            <Plus size={18} />
            <span>Add Interest</span>
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {userData.interests.map((interest) => (
            <div
              key={interest._id}
              className="bg-white rounded-lg shadow p-4"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-medium text-gray-800">{interest.name}</h4>
                  <p className="text-sm text-gray-500">
                    {interest.category} • {interest.level}
                  </p>
                </div>
                <button
                  onClick={() => handleRemoveInterest(interest._id)}
                  className="text-gray-400 hover:text-red-600"
                >
                  <X size={18} />
                </button>
              </div>
              {interest.description && (
                <p className="text-sm text-gray-600 mt-2">{interest.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold text-blue-600">TalentHunt</div>
            
            {/* User Menu */}
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                <User size={18} className="text-blue-600" />
              </div>
            </div>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link to="/dashboard" className="inline-flex items-center text-blue-600 hover:text-blue-800">
            <ChevronLeft size={20} />
            <span>Back to Dashboard</span>
          </Link>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b">
            <button
              className={`flex-1 py-4 text-center font-medium ${
                activeTab === 'profile'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('profile')}
            >
              Profile
            </button>
            <button
              className={`flex-1 py-4 text-center font-medium ${
                activeTab === 'skills'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('skills')}
            >
              Skills & Interests
            </button>
            <button
              className={`flex-1 py-4 text-center font-medium ${
                activeTab === 'settings'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('settings')}
            >
              Settings
            </button>
          </div>
          
          <div className="p-6">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">Profile Information</h2>
                  <button
                    className="flex items-center text-blue-600 hover:text-blue-800"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    {isEditing ? (
                      <>
                        <X size={18} className="mr-1" />
                        <span>Cancel</span>
                      </>
                    ) : (
                      <>
                        <Edit2 size={18} className="mr-1" />
                        <span>Edit Profile</span>
                      </>
                    )}
                  </button>
                </div>
                
                {isEditing ? (
                  <form onSubmit={handleProfileUpdate}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="name">
                          Full Name
                        </label>
                        <input
                          id="name"
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          value={userData.name}
                          onChange={(e) => setUserData({...userData, name: e.target.value})}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="email">
                          Email Address
                        </label>
                        <input
                          id="email"
                          type="email"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          value={userData.email}
                          onChange={(e) => setUserData({...userData, email: e.target.value})}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="role">
                          Role
                        </label>
                        <select
                          id="role"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          value={userData.role}
                          onChange={(e) => setUserData({...userData, role: e.target.value})}
                        >
                          <option value="Student">Student</option>
                          <option value="Faculty Mentor">Faculty Mentor</option>
                          <option value="Admin">Admin</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="department">
                          Department
                        </label>
                        <input
                          id="department"
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          value={userData.department}
                          onChange={(e) => setUserData({...userData, department: e.target.value})}
                        />
                      </div>
                      
                      <div className="md:col-span-2">
                        <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="bio">
                          Bio
                        </label>
                        <textarea
                          id="bio"
                          rows="4"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          value={userData.bio}
                          onChange={(e) => setUserData({...userData, bio: e.target.value})}
                        ></textarea>
                      </div>
                      
                      <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="education">
                          Education
                        </label>
                        <input
                          id="education"
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          value={userData.education}
                          onChange={(e) => setUserData({...userData, education: e.target.value})}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="phone">
                          Phone Number
                        </label>
                        <input
                          id="phone"
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          value={userData.phone}
                          onChange={(e) => setUserData({...userData, phone: e.target.value})}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="github">
                          GitHub Profile
                        </label>
                        <input
                          id="github"
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          value={userData.github}
                          onChange={(e) => setUserData({...userData, github: e.target.value})}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="linkedin">
                          LinkedIn Profile
                        </label>
                        <input
                          id="linkedin"
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          value={userData.linkedin}
                          onChange={(e) => setUserData({...userData, linkedin: e.target.value})}
                        />
                      </div>
                    </div>
                    
                    <div className="mt-6 flex justify-end">
                      <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition flex items-center"
                      >
                        <Save size={18} className="mr-2" />
                        Save Changes
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-6">
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/3">
                        <div className="w-32 h-32 rounded-full bg-blue-100 flex items-center justify-center mx-auto md:mx-0">
                          <User size={64} className="text-blue-600" />
                        </div>
                      </div>
                      <div className="md:w-2/3 mt-4 md:mt-0">
                        <h3 className="text-2xl font-semibold text-gray-800">{userData.name}</h3>
                        <p className="text-gray-600">{userData.role} • {userData.department}</p>
                        <p className="mt-2 text-gray-700">{userData.bio}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-800 mb-3">Personal Information</h4>
                        <div className="space-y-3">
                          <div>
                            <span className="text-gray-500">Education:</span>
                            <p className="text-gray-800">{userData.education}</p>
                          </div>
                          <div>
                            <span className="text-gray-500">Skills:</span>
                            <p className="text-gray-800">{userData.skills.join(', ')}</p>
                          </div>
                          <div>
                            <span className="text-gray-500">Interests:</span>
                            <p className="text-gray-800">{userData.interests.join(', ')}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-lg font-semibold text-gray-800 mb-3">Contact Information</h4>
                        <div className="space-y-3">
                          <div className="flex items-start">
                            <Mail size={18} className="text-gray-500 mr-2 mt-0.5" />
                            <div>
                              <span className="text-gray-500">Email:</span>
                              <p className="text-gray-800">{userData.email}</p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            <div>
                              <span className="text-gray-500">Phone:</span>
                              <p className="text-gray-800">{userData.phone}</p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                            </svg>
                            <div>
                              <span className="text-gray-500">GitHub:</span>
                              <p className="text-gray-800">{userData.github}</p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                            </svg>
                            <div>
                              <span className="text-gray-500">LinkedIn:</span>
                              <p className="text-gray-800">{userData.linkedin}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {/* Skills & Interests Tab */}
            {activeTab === 'skills' && (
              <>
                <SkillsAndInterestsContent />
                {showSkillModal && <SkillModal />}
                {showInterestModal && <InterestModal />}
              </>
            )}
            
            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Account Settings</h2>
                
                <div className="space-y-8">
                  {/* Notification Preferences */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Notification Preferences</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-800">Team Requests</h4>
                          <p className="text-sm text-gray-600">Receive notifications when someone requests to join your team or invites you to a team.</p>
                        </div>
                        <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full">
                          <input
                            type="checkbox"
                            id="team-requests"
                            className="absolute w-6 h-6 transition duration-200 ease-in-out transform bg-white border-2 rounded-full appearance-none cursor-pointer peer border-gray-300 checked:border-blue-600 checked:translate-x-6"
                            checked={userData.notificationPreferences.teamRequests}
                            onChange={() => handleNotificationChange('teamRequests')}
                          />
                          <label
                            htmlFor="team-requests"
                            className="block w-full h-full overflow-hidden rounded-full cursor-pointer bg-gray-300 peer-checked:bg-blue-600"
                          ></label>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-800">Mentor Messages</h4>
                          <p className="text-sm text-gray-600">Receive notifications when a mentor sends you a message or feedback.</p>
                        </div>
                        <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full">
                          <input
                            type="checkbox"
                            id="mentor-messages"
                            className="absolute w-6 h-6 transition duration-200 ease-in-out transform bg-white border-2 rounded-full appearance-none cursor-pointer peer border-gray-300 checked:border-blue-600 checked:translate-x-6"
                            checked={userData.notificationPreferences.mentorMessages}
                            onChange={() => handleNotificationChange('mentorMessages')}
                          />
                          <label
                            htmlFor="mentor-messages"
                            className="block w-full h-full overflow-hidden rounded-full cursor-pointer bg-gray-300 peer-checked:bg-blue-600"
                          ></label>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-800">Competition Updates</h4>
                          <p className="text-sm text-gray-600">Receive notifications about competition deadlines, changes, and announcements.</p>
                        </div>
                        <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full">
                          <input
                            type="checkbox"
                            id="competition-updates"
                            className="absolute w-6 h-6 transition duration-200 ease-in-out transform bg-white border-2 rounded-full appearance-none cursor-pointer peer border-gray-300 checked:border-blue-600 checked:translate-x-6"
                            checked={userData.notificationPreferences.competitionUpdates}
                            onChange={() => handleNotificationChange('competitionUpdates')}
                          />
                          <label
                            htmlFor="competition-updates"
                            className="block w-full h-full overflow-hidden rounded-full cursor-pointer bg-gray-300 peer-checked:bg-blue-600"
                          ></label>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-800">Weekly Digest</h4>
                          <p className="text-sm text-gray-600">Receive a weekly summary of activities and upcoming events.</p>
                        </div>
                        <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full">
                          <input
                            type="checkbox"
                            id="weekly-digest"
                            className="absolute w-6 h-6 transition duration-200 ease-in-out transform bg-white border-2 rounded-full appearance-none cursor-pointer peer border-gray-300 checked:border-blue-600 checked:translate-x-6"
                            checked={userData.notificationPreferences.weeklyDigest}
                            onChange={() => handleNotificationChange('weeklyDigest')}
                          />
                          <label
                            htmlFor="weekly-digest"
                            className="block w-full h-full overflow-hidden rounded-full cursor-pointer bg-gray-300 peer-checked:bg-blue-600"
                          ></label>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Password Change */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Change Password</h3>
                    <form className="space-y-4">
                      <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="current-password">
                          Current Password
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Lock size={18} className="text-gray-400" />
                          </div>
                          <input
                            id="current-password"
                            type="password"
                            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter your current password"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="new-password">
                          New Password
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Lock size={18} className="text-gray-400" />
                          </div>
                          <input
                            id="new-password"
                            type="password"
                            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter your new password"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="confirm-password">
                          Confirm New Password
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Lock size={18} className="text-gray-400" />
                          </div>
                          <input
                            id="confirm-password"
                            type="password"
                            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Confirm your new password"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <button
                          type="submit"
                          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                        >
                          Update Password
                        </button>
                      </div>
                    </form>
                  </div>
                  
                  {/* Account Deletion */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Delete Account</h3>
                    <p className="text-gray-600 mb-4">
                      Once you delete your account, there is no going back. Please be certain.
                    </p>
                    <button
                      className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
                    >
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfileSettings;