import React, { useState } from 'react';
import { useUser } from '../Contexts/UserContext';

const MentorProfile = () => {
  const { user } = useUser();
  const [editMode, setEditMode] = useState(false);
  const [profile, setProfile] = useState({
    name: user?.name || '',
    email: user?.email || '',
    expertise: user?.expertise || 'AI and Machine Learning',
    profileImage: user?.profileImage || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    // Here you would update the profile in your backend
    setEditMode(false);
    alert('Profile updated!');
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-8 mt-8">
      <h1 className="text-2xl font-bold mb-6">Mentor Profile</h1>
      <div className="flex items-center mb-6">
        <div className="w-24 h-24 rounded-full bg-purple-100 flex items-center justify-center overflow-hidden mr-6">
          {profile.profileImage ? (
            <img src={profile.profileImage} alt={profile.name} className="w-full h-full object-cover" />
          ) : (
            <span className="text-4xl text-purple-600">👤</span>
          )}
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-800">{profile.name}</h2>
          <p className="text-gray-600">{profile.expertise}</p>
          <p className="text-gray-500 text-sm">{profile.email}</p>
        </div>
      </div>
      {editMode ? (
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input type="text" name="name" value={profile.name} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" name="email" value={profile.email} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Expertise</label>
            <input type="text" name="expertise" value={profile.expertise} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Profile Image URL</label>
            <input type="text" name="profileImage" value={profile.profileImage} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" />
          </div>
          <div className="flex space-x-3">
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Save</button>
            <button type="button" onClick={() => setEditMode(false)} className="px-4 py-2 border rounded">Cancel</button>
          </div>
        </form>
      ) : (
        <button onClick={() => setEditMode(true)} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Edit Profile</button>
      )}
    </div>
  );
};

export default MentorProfile; 