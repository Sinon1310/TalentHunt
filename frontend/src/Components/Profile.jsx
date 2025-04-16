import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { useUser } from '../Contexts/UserContext';

const Profile = () => {
    const { user: authUser } = useUser();

    if (!authUser) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center space-y-4">
                <div className="text-xl text-red-600">Please log in to view your profile</div>
                <Link
                    to="/login"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                    Go to Login
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Back Button */}
            <div className="container mx-auto px-4 py-6">
                <Link to="/dashboard" className="inline-flex items-center text-blue-600 hover:text-blue-800">
                    <ChevronLeft className="h-5 w-5" />
                    <span>Back to Dashboard</span>
                </Link>
            </div>

            {/* Tabs */}
            <div className="container mx-auto px-4">
                <div className="bg-white rounded-lg shadow-sm">
                    <div className="border-b border-gray-200">
                        <nav className="flex justify-between">
                            <Link
                                to="/profile"
                                className="px-6 py-4 text-blue-600 border-b-2 border-blue-600 font-medium"
                            >
                                Profile
                            </Link>
                            <Link
                                to="/profile/skills"
                                className="px-6 py-4 text-gray-500 hover:text-gray-700 font-medium"
                            >
                                Skills & Interests
                            </Link>
                            <Link
                                to="/profile/settings"
                                className="px-6 py-4 text-gray-500 hover:text-gray-700 font-medium"
                            >
                                Settings
                            </Link>
                        </nav>
                    </div>

                    <div className="p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-2xl font-bold text-gray-900">Profile Information</h1>
                            <Link
                                to="/profile/edit"
                                className="text-blue-600 hover:text-blue-800 inline-flex items-center"
                            >
                                <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M18.5 2.50001C18.8978 2.10219 19.4374 1.87869 20 1.87869C20.5626 1.87869 21.1022 2.10219 21.5 2.50001C21.8978 2.89784 22.1213 3.4374 22.1213 4.00001C22.1213 4.56262 21.8978 5.10219 21.5 5.50001L12 15L8 16L9 12L18.5 2.50001Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                Edit Profile
                            </Link>
                        </div>

                        <div className="grid grid-cols-2 gap-8">
                            {/* Personal Information */}
                            <div>
                                <h2 className="text-xl font-semibold text-gray-900 mb-4">Personal Information</h2>
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-sm text-gray-500">Education</label>
                                        <p className="text-gray-900">{authUser.education || 'Not specified'}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm text-gray-500">Skills</label>
                                        <p className="text-gray-900">{authUser.skills?.join(', ') || 'No skills added'}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm text-gray-500">Interests</label>
                                        <p className="text-gray-900">{authUser.interests?.join(', ') || 'No interests added'}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Contact Information */}
                            <div>
                                <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h2>
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-sm text-gray-500">Email</label>
                                        <p className="text-gray-900">{authUser.email}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm text-gray-500">Phone</label>
                                        <p className="text-gray-900">{authUser.phone || 'Not provided'}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm text-gray-500">GitHub</label>
                                        <p className="text-gray-900">{authUser.github || 'Not provided'}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm text-gray-500">LinkedIn</label>
                                        <p className="text-gray-900">{authUser.linkedin || 'Not provided'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile; 