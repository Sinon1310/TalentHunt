import React, { useState } from 'react';

const MentorSettings = () => {
  const [passwordForm, setPasswordForm] = useState({
    current: '',
    new: '',
    confirm: ''
  });
  const [notifications, setNotifications] = useState({
    email: true,
    feedback: true,
    meetings: true
  });
  const [success, setSuccess] = useState('');

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleNotificationsChange = (e) => {
    const { name, checked } = e.target;
    setNotifications((prev) => ({ ...prev, [name]: checked }));
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordForm.new !== passwordForm.confirm) {
      setSuccess('');
      alert('New passwords do not match!');
      return;
    }
    // Here you would update the password in your backend
    setSuccess('Password updated successfully!');
    setPasswordForm({ current: '', new: '', confirm: '' });
  };

  const handleNotificationsSubmit = (e) => {
    e.preventDefault();
    // Here you would update notification settings in your backend
    setSuccess('Notification settings updated!');
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-8 mt-8">
      <h1 className="text-2xl font-bold mb-6">Mentor Settings</h1>
      {success && <div className="mb-4 bg-green-100 text-green-800 px-4 py-2 rounded">{success}</div>}
      <form onSubmit={handlePasswordSubmit} className="mb-8 space-y-4">
        <h2 className="text-lg font-semibold mb-2">Change Password</h2>
        <div>
          <label className="block text-sm font-medium text-gray-700">Current Password</label>
          <input type="password" name="current" value={passwordForm.current} onChange={handlePasswordChange} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">New Password</label>
          <input type="password" name="new" value={passwordForm.new} onChange={handlePasswordChange} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
          <input type="password" name="confirm" value={passwordForm.confirm} onChange={handlePasswordChange} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" required />
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Update Password</button>
      </form>
      <form onSubmit={handleNotificationsSubmit} className="space-y-4">
        <h2 className="text-lg font-semibold mb-2">Notification Preferences</h2>
        <div className="flex items-center">
          <input type="checkbox" id="email" name="email" checked={notifications.email} onChange={handleNotificationsChange} className="mr-2" />
          <label htmlFor="email" className="text-gray-700">Email Notifications</label>
        </div>
        <div className="flex items-center">
          <input type="checkbox" id="feedback" name="feedback" checked={notifications.feedback} onChange={handleNotificationsChange} className="mr-2" />
          <label htmlFor="feedback" className="text-gray-700">Feedback Requests</label>
        </div>
        <div className="flex items-center">
          <input type="checkbox" id="meetings" name="meetings" checked={notifications.meetings} onChange={handleNotificationsChange} className="mr-2" />
          <label htmlFor="meetings" className="text-gray-700">Meeting Reminders</label>
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Save Preferences</button>
      </form>
    </div>
  );
};

export default MentorSettings; 