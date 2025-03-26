"use client"

import { useState } from "react"
import { useAdminAuth } from "../Contexts/AdminAuthContext.jsx"

const AdminSettings = () => {
  const { adminUser, logout } = useAdminAuth()
  const [activeTab, setActiveTab] = useState("profile")
  const [profileForm, setProfileForm] = useState({
    name: adminUser?.name || "",
    email: adminUser?.email || "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [siteSettings, setSiteSettings] = useState({
    siteName: "TeamMatch",
    siteDescription: "Platform for team formation and competition management",
    allowRegistration: true,
    requireEmailVerification: true,
    maxTeamSize: 5,
    defaultCompetitionDuration: 3,
  })
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    newUserNotification: true,
    newTeamNotification: true,
    competitionStartNotification: true,
    competitionEndNotification: true,
  })
  const [successMessage, setSuccessMessage] = useState("")

  const handleProfileChange = (e) => {
    const { name, value } = e.target
    setProfileForm({
      ...profileForm,
      [name]: value,
    })
  }

  const handleSiteSettingsChange = (e) => {
    const { name, value, type, checked } = e.target
    setSiteSettings({
      ...siteSettings,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const handleNotificationChange = (e) => {
    const { name, checked } = e.target
    setNotificationSettings({
      ...notificationSettings,
      [name]: checked,
    })
  }

  const handleProfileSubmit = (e) => {
    e.preventDefault()

    // Password validation
    if (profileForm.newPassword && profileForm.newPassword !== profileForm.confirmPassword) {
      alert("New passwords don't match")
      return
    }

    // In a real app, you would make an API call to update the profile
    console.log("Profile updated:", profileForm)

    // Show success message
    setSuccessMessage("Profile updated successfully")
    setTimeout(() => setSuccessMessage(""), 3000)
  }

  const handleSiteSettingsSubmit = (e) => {
    e.preventDefault()

    // In a real app, you would make an API call to update the site settings
    console.log("Site settings updated:", siteSettings)

    // Show success message
    setSuccessMessage("Site settings updated successfully")
    setTimeout(() => setSuccessMessage(""), 3000)
  }

  const handleNotificationSubmit = (e) => {
    e.preventDefault()

    // In a real app, you would make an API call to update the notification settings
    console.log("Notification settings updated:", notificationSettings)

    // Show success message
    setSuccessMessage("Notification settings updated successfully")
    setTimeout(() => setSuccessMessage(""), 3000)
  }

  return (
    <div className="p-6">
      {/* Success Message */}
      {successMessage && (
        <div className="mb-6 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded">
          <p>{successMessage}</p>
        </div>
      )}

      {/* Settings Tabs */}
      <div className="mb-6 border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === "profile"
                ? "border-indigo-500 text-indigo-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
            onClick={() => setActiveTab("profile")}
          >
            Profile
          </button>
          <button
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === "site"
                ? "border-indigo-500 text-indigo-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
            onClick={() => setActiveTab("site")}
          >
            Site Settings
          </button>
          <button
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === "notifications"
                ? "border-indigo-500 text-indigo-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
            onClick={() => setActiveTab("notifications")}
          >
            Notifications
          </button>
        </nav>
      </div>

      {/* Profile Settings */}
      {activeTab === "profile" && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Admin Profile</h2>
          <form onSubmit={handleProfileSubmit}>
            <div className="grid grid-cols-1 gap-6 mb-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={profileForm.name}
                  onChange={handleProfileChange}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={profileForm.email}
                  onChange={handleProfileChange}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <h3 className="text-md font-medium text-gray-900 mb-4">Change Password</h3>
            <div className="grid grid-cols-1 gap-6 mb-6">
              <div>
                <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Current Password
                </label>
                <input
                  type="password"
                  id="currentPassword"
                  name="currentPassword"
                  value={profileForm.currentPassword}
                  onChange={handleProfileChange}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={profileForm.newPassword}
                  onChange={handleProfileChange}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={profileForm.confirmPassword}
                  onChange={handleProfileChange}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Site Settings */}
      {activeTab === "site" && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Site Settings</h2>
          <form onSubmit={handleSiteSettingsSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="siteName" className="block text-sm font-medium text-gray-700 mb-1">
                  Site Name
                </label>
                <input
                  type="text"
                  id="siteName"
                  name="siteName"
                  value={siteSettings.siteName}
                  onChange={handleSiteSettingsChange}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="siteDescription" className="block text-sm font-medium text-gray-700 mb-1">
                  Site Description
                </label>
                <textarea
                  id="siteDescription"
                  name="siteDescription"
                  rows="3"
                  value={siteSettings.siteDescription}
                  onChange={handleSiteSettingsChange}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                ></textarea>
              </div>

              <div>
                <label htmlFor="maxTeamSize" className="block text-sm font-medium text-gray-700 mb-1">
                  Default Max Team Size
                </label>
                <input
                  type="number"
                  id="maxTeamSize"
                  name="maxTeamSize"
                  min="1"
                  max="10"
                  value={siteSettings.maxTeamSize}
                  onChange={handleSiteSettingsChange}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="defaultCompetitionDuration" className="block text-sm font-medium text-gray-700 mb-1">
                  Default Competition Duration (days)
                </label>
                <input
                  type="number"
                  id="defaultCompetitionDuration"
                  name="defaultCompetitionDuration"
                  min="1"
                  max="30"
                  value={siteSettings.defaultCompetitionDuration}
                  onChange={handleSiteSettingsChange}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="allowRegistration"
                  name="allowRegistration"
                  checked={siteSettings.allowRegistration}
                  onChange={handleSiteSettingsChange}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="allowRegistration" className="ml-2 block text-sm text-gray-900">
                  Allow new user registration
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="requireEmailVerification"
                  name="requireEmailVerification"
                  checked={siteSettings.requireEmailVerification}
                  onChange={handleSiteSettingsChange}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="requireEmailVerification" className="ml-2 block text-sm text-gray-900">
                  Require email verification
                </label>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Save Settings
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Notification Settings */}
      {activeTab === "notifications" && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Notification Settings</h2>
          <form onSubmit={handleNotificationSubmit}>
            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between py-3 border-b border-gray-200">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Email Notifications</h3>
                  <p className="text-sm text-gray-500">Receive email notifications for important events</p>
                </div>
                <div className="ml-4 flex-shrink-0">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="emailNotifications"
                      checked={notificationSettings.emailNotifications}
                      onChange={handleNotificationChange}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-between py-3 border-b border-gray-200">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">New User Notifications</h3>
                  <p className="text-sm text-gray-500">Get notified when a new user registers</p>
                </div>
                <div className="ml-4 flex-shrink-0">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="newUserNotification"
                      checked={notificationSettings.newUserNotification}
                      onChange={handleNotificationChange}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-between py-3 border-b border-gray-200">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">New Team Notifications</h3>
                  <p className="text-sm text-gray-500">Get notified when a new team is created</p>
                </div>
                <div className="ml-4 flex-shrink-0">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="newTeamNotification"
                      checked={notificationSettings.newTeamNotification}
                      onChange={handleNotificationChange}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-between py-3 border-b border-gray-200">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Competition Start Notifications</h3>
                  <p className="text-sm text-gray-500">Get notified when a competition starts</p>
                </div>
                <div className="ml-4 flex-shrink-0">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="competitionStartNotification"
                      checked={notificationSettings.competitionStartNotification}
                      onChange={handleNotificationChange}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-between py-3 border-b border-gray-200">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Competition End Notifications</h3>
                  <p className="text-sm text-gray-500">Get notified when a competition ends</p>
                </div>
                <div className="ml-4 flex-shrink-0">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="competitionEndNotification"
                      checked={notificationSettings.competitionEndNotification}
                      onChange={handleNotificationChange}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Save Notification Settings
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}

export default AdminSettings

