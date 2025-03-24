import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Mail, Lock, ChevronLeft, Save, X, Plus, Edit2 } from 'lucide-react';

const ProfileSettings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  
  // Sample user data - in a real app, this would be fetched from an API
  const [userData, setUserData] = useState({
    name: 'Sinon Rodrigues',
    email: 'sinonrodrigues@gmail.com',
    role: 'Student',
    department: 'Computer Science',
    bio: 'Final year computer science student with a passion for web development and AI. Looking to collaborate on innovative projects.',
    skills: ['React', 'JavaScript', 'Node.js', 'UI/UX Design', 'Python', 'Django'],
    education: 'Bachelor of Science in Computer Science',
    interests: ['Web Development', 'Artificial Intelligence', 'Mobile Apps'],
    contactEmail: 'sinonrodrigues@gmail.com',
    phone: '+91 9004750924',
    github: 'github.com/sinon1310',
    linkedin: 'linkedin.com/in/sinonrodrigues', 
    notificationPreferences: {
      teamRequests: true,
      mentorMessages: true,
      competitionUpdates: true,
      weeklyDigest: false
    }
  });
  
  const [newSkill, setNewSkill] = useState('');
  const [newInterest, setNewInterest] = useState('');
  
  const handleProfileUpdate = (e) => {
    e.preventDefault();
    // In a real app, this would send data to an API
    console.log('Updated profile:', userData);
    setIsEditing(false);
    alert('Profile updated successfully! (This is a demo)');
  };
  
  const handleAddSkill = (e) => {
    e.preventDefault();
    if (newSkill.trim() !== '' && !userData.skills.includes(newSkill.trim())) {
      setUserData({
        ...userData,
        skills: [...userData.skills, newSkill.trim()]
      });
      setNewSkill('');
    }
  };
  
  const handleRemoveSkill = (skillToRemove) => {
    setUserData({
      ...userData,
      skills: userData.skills.filter(skill => skill !== skillToRemove)
    });
  };
  
  const handleAddInterest = (e) => {
    e.preventDefault();
    if (newInterest.trim() !== '' && !userData.interests.includes(newInterest.trim())) {
      setUserData({
        ...userData,
        interests: [...userData.interests, newInterest.trim()]
      });
      setNewInterest('');
    }
  };
  
  const handleRemoveInterest = (interestToRemove) => {
    setUserData({
      ...userData,
      interests: userData.interests.filter(interest => interest !== interestToRemove)
    });
  };
  
  const handleNotificationChange = (setting) => {
    setUserData({
      ...userData,
      notificationPreferences: {
        ...userData.notificationPreferences,
        [setting]: !userData.notificationPreferences[setting]
      }
    });
  };

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
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Skills & Interests</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Skills Section */}
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold text-gray-800">Skills</h3>
                    </div>
                    
                    <div className="mb-4">
                      <form onSubmit={handleAddSkill} className="flex">
                        <input
                          type="text"
                          placeholder="Add a new skill"
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          value={newSkill}
                          onChange={(e) => setNewSkill(e.target.value)}
                        />
                        <button
                          type="submit"
                          className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 transition"
                        >
                          <Plus size={18} />
                        </button>
                      </form>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {userData.skills.map((skill, index) => (
                        <div key={index} className="flex items-center bg-blue-100 text-blue-800 rounded-full px-3 py-1">
                          <span className="text-sm">{skill}</span>
                          <button
                            className="ml-2 text-blue-600 hover:text-blue-800"
                            onClick={() => handleRemoveSkill(skill)}
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-6">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Suggested Skills</h4>
                      <div className="flex flex-wrap gap-2">
                        {['TypeScript', 'MongoDB', 'Express', 'AWS', 'Docker'].map((skill, index) => (
                          !userData.skills.includes(skill) && (
                            <button
                              key={index}
                              className="bg-gray-100 text-gray-800 rounded-full px-3 py-1 text-sm hover:bg-gray-200"
                              onClick={() => {
                                setUserData({
                                  ...userData,
                                  skills: [...userData.skills, skill]
                                });
                              }}
                            >
                              + {skill}
                            </button>
                          )
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Interests Section */}
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold text-gray-800">Interests</h3>
                    </div>
                    
                    <div className="mb-4">
                      <form onSubmit={handleAddInterest} className="flex">
                        <input
                          type="text"
                          placeholder="Add a new interest"
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          value={newInterest}
                          onChange={(e) => setNewInterest(e.target.value)}
                        />
                        <button
                          type="submit"
                          className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 transition"
                        >
                          <Plus size={18} />
                        </button>
                      </form>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {userData.interests.map((interest, index) => (
                        <div key={index} className="flex items-center bg-purple-100 text-purple-800 rounded-full px-3 py-1">
                          <span className="text-sm">{interest}</span>
                          <button
                            className="ml-2 text-purple-600 hover:text-purple-800"
                            onClick={() => handleRemoveInterest(interest)}
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-6">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Suggested Interests</h4>
                      <div className="flex flex-wrap gap-2">
                        {['Data Science', 'Blockchain', 'Game Development', 'Cybersecurity', 'IoT'].map((interest, index) => (
                          !userData.interests.includes(interest) && (
                            <button
                              key={index}
                              className="bg-gray-100 text-gray-800 rounded-full px-3 py-1 text-sm hover:bg-gray-200"
                              onClick={() => {
                                setUserData({
                                  ...userData,
                                  interests: [...userData.interests, interest]
                                });
                              }}
                            >
                              + {interest}
                            </button>
                          )
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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