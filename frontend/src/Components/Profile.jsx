import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { User, Plus, X, Edit2, Save, Book, Code, Briefcase, Palette } from 'lucide-react';

const Profile = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [activeTab, setActiveTab] = useState('skills'); // 'skills' or 'interests'
    const [newSkill, setNewSkill] = useState({
        name: '',
        level: 'beginner',
        yearsOfExperience: 0
    });
    const [newInterest, setNewInterest] = useState({
        name: '',
        category: 'technical',
        description: '',
        level: 'curious'
    });

    // Predefined suggestions
    const skillSuggestions = [
        'JavaScript', 'Python', 'Java', 'React', 'Node.js', 'MongoDB',
        'HTML', 'CSS', 'TypeScript', 'Angular', 'Vue.js', 'SQL',
        'AWS', 'Docker', 'Kubernetes', 'Git', 'DevOps', 'Machine Learning'
    ];

    const interestSuggestions = [
        'Web Development', 'Mobile Apps', 'AI/ML', 'Cloud Computing',
        'UI/UX Design', 'Product Management', 'Digital Marketing',
        'Blockchain', 'IoT', 'Cybersecurity', 'Data Science'
    ];

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                axios.defaults.baseURL = 'http://localhost:5002';
                axios.defaults.withCredentials = true;

                const response = await axios.get('/profile');
                setUser(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching profile:', error);
                setError(error.response?.data?.error || 'Failed to load profile');
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, []);

    const handleAddSkill = async () => {
        try {
            const response = await axios.post('/profile/skills', newSkill);
            setUser(response.data);
            setNewSkill({
                name: '',
                level: 'beginner',
                yearsOfExperience: 0
            });
        } catch (error) {
            console.error('Error adding skill:', error);
            setError(error.response?.data?.error || 'Failed to add skill');
        }
    };

    const handleAddInterest = async () => {
        try {
            const response = await axios.post('/profile/interests', newInterest);
            setUser(response.data);
            setNewInterest({
                name: '',
                category: 'technical',
                description: '',
                level: 'curious'
            });
        } catch (error) {
            console.error('Error adding interest:', error);
            setError(error.response?.data?.error || 'Failed to add interest');
        }
    };

    const handleRemoveSkill = async (skillId) => {
        try {
            const response = await axios.delete(`/profile/skills/${skillId}`);
            setUser(response.data);
        } catch (error) {
            console.error('Error removing skill:', error);
            setError(error.response?.data?.error || 'Failed to remove skill');
        }
    };

    const handleRemoveInterest = async (interestId) => {
        try {
            const response = await axios.delete(`/profile/interests/${interestId}`);
            setUser(response.data);
        } catch (error) {
            console.error('Error removing interest:', error);
            setError(error.response?.data?.error || 'Failed to remove interest');
        }
    };

    const handleUpdateProfile = async () => {
        try {
            const response = await axios.put('/profile', {
                name: user.name,
                bio: user.bio
            });
            setUser(response.data);
            setEditMode(false);
        } catch (error) {
            console.error('Error updating profile:', error);
            setError(error.response?.data?.error || 'Failed to update profile');
        }
    };

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

    const getCategoryIcon = (category) => {
        switch (category) {
            case 'technical':
                return <Code className="text-blue-600" size={16} />;
            case 'business':
                return <Briefcase className="text-green-600" size={16} />;
            case 'design':
                return <Palette className="text-purple-600" size={16} />;
            default:
                return <Book className="text-gray-600" size={16} />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    {/* Profile Header */}
                    <div className="relative h-48 bg-gradient-to-r from-blue-500 to-blue-600">
                        <div className="absolute -bottom-16 left-8">
                            <div className="w-32 h-32 rounded-full bg-white p-2">
                                <div className="w-full h-full rounded-full bg-blue-100 flex items-center justify-center">
                                    <User size={64} className="text-blue-600" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Profile Content */}
                    <div className="pt-20 px-8 pb-8">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
                                <p className="text-gray-600">{user.email}</p>
                                <p className="text-gray-600 capitalize">{user.role}</p>
                            </div>
                            <button
                                onClick={() => editMode ? handleUpdateProfile() : setEditMode(true)}
                                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                            >
                                {editMode ? (
                                    <>
                                        <Save size={16} />
                                        <span>Save Profile</span>
                                    </>
                                ) : (
                                    <>
                                        <Edit2 size={16} />
                                        <span>Edit Profile</span>
                                    </>
                                )}
                            </button>
                        </div>

                        {/* Bio */}
                        <div className="mb-8">
                            <h2 className="text-lg font-semibold text-gray-900 mb-2">Bio</h2>
                            {editMode ? (
                                <textarea
                                    value={user.bio || ''}
                                    onChange={(e) => setUser({ ...user, bio: e.target.value })}
                                    className="w-full h-32 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Tell us about yourself..."
                                    maxLength={500}
                                />
                            ) : (
                                <p className="text-gray-600">{user.bio || 'No bio added yet.'}</p>
                            )}
                        </div>

                        {/* Skills & Interests Tabs */}
                        <div className="border-b border-gray-200 mb-6">
                            <div className="flex space-x-8">
                                <button
                                    className={`pb-4 text-sm font-medium ${
                                        activeTab === 'skills'
                                            ? 'border-b-2 border-blue-600 text-blue-600'
                                            : 'text-gray-500 hover:text-gray-700'
                                    }`}
                                    onClick={() => setActiveTab('skills')}
                                >
                                    Skills
                                </button>
                                <button
                                    className={`pb-4 text-sm font-medium ${
                                        activeTab === 'interests'
                                            ? 'border-b-2 border-blue-600 text-blue-600'
                                            : 'text-gray-500 hover:text-gray-700'
                                    }`}
                                    onClick={() => setActiveTab('interests')}
                                >
                                    Interests
                                </button>
                            </div>
                        </div>

                        {/* Skills Section */}
                        {activeTab === 'skills' && (
                            <div>
                                <div className="mb-6">
                                    <div className="flex space-x-4">
                                        <div className="flex-1">
                                            <input
                                                type="text"
                                                value={newSkill.name}
                                                onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                                                placeholder="Add a new skill..."
                                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                list="skill-suggestions"
                                            />
                                            <datalist id="skill-suggestions">
                                                {skillSuggestions.map((skill) => (
                                                    <option key={skill} value={skill} />
                                                ))}
                                            </datalist>
                                        </div>
                                        <select
                                            value={newSkill.level}
                                            onChange={(e) => setNewSkill({ ...newSkill, level: e.target.value })}
                                            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            <option value="beginner">Beginner</option>
                                            <option value="intermediate">Intermediate</option>
                                            <option value="advanced">Advanced</option>
                                            <option value="expert">Expert</option>
                                        </select>
                                        <input
                                            type="number"
                                            value={newSkill.yearsOfExperience}
                                            onChange={(e) => setNewSkill({ ...newSkill, yearsOfExperience: parseInt(e.target.value) })}
                                            placeholder="Years"
                                            className="w-24 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            min="0"
                                        />
                                        <button
                                            onClick={handleAddSkill}
                                            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center space-x-2"
                                        >
                                            <Plus size={16} />
                                            <span>Add</span>
                                        </button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {user.skills.map((skill) => (
                                        <div
                                            key={skill._id}
                                            className="flex items-center justify-between p-4 border border-gray-200 rounded-md"
                                        >
                                            <div>
                                                <h3 className="font-medium text-gray-900">{skill.name}</h3>
                                                <p className="text-sm text-gray-600">
                                                    {skill.level.charAt(0).toUpperCase() + skill.level.slice(1)} •{' '}
                                                    {skill.yearsOfExperience} {skill.yearsOfExperience === 1 ? 'year' : 'years'}
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => handleRemoveSkill(skill._id)}
                                                className="p-1 text-gray-400 hover:text-red-600"
                                            >
                                                <X size={16} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Interests Section */}
                        {activeTab === 'interests' && (
                            <div>
                                <div className="mb-6">
                                    <div className="space-y-4">
                                        <div className="flex space-x-4">
                                            <div className="flex-1">
                                                <input
                                                    type="text"
                                                    value={newInterest.name}
                                                    onChange={(e) => setNewInterest({ ...newInterest, name: e.target.value })}
                                                    placeholder="Add a new interest..."
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    list="interest-suggestions"
                                                />
                                                <datalist id="interest-suggestions">
                                                    {interestSuggestions.map((interest) => (
                                                        <option key={interest} value={interest} />
                                                    ))}
                                                </datalist>
                                            </div>
                                            <select
                                                value={newInterest.category}
                                                onChange={(e) => setNewInterest({ ...newInterest, category: e.target.value })}
                                                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            >
                                                <option value="technical">Technical</option>
                                                <option value="business">Business</option>
                                                <option value="design">Design</option>
                                                <option value="other">Other</option>
                                            </select>
                                            <select
                                                value={newInterest.level}
                                                onChange={(e) => setNewInterest({ ...newInterest, level: e.target.value })}
                                                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            >
                                                <option value="curious">Curious</option>
                                                <option value="hobbyist">Hobbyist</option>
                                                <option value="enthusiast">Enthusiast</option>
                                                <option value="passionate">Passionate</option>
                                            </select>
                                        </div>
                                        <div className="flex-1">
                                            <textarea
                                                value={newInterest.description}
                                                onChange={(e) => setNewInterest({ ...newInterest, description: e.target.value })}
                                                placeholder="Brief description of your interest..."
                                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                rows="2"
                                            />
                                        </div>
                                        <div className="flex justify-end">
                                            <button
                                                onClick={handleAddInterest}
                                                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center space-x-2"
                                            >
                                                <Plus size={16} />
                                                <span>Add Interest</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {user.interests.map((interest) => (
                                        <div
                                            key={interest._id}
                                            className="flex items-center justify-between p-4 border border-gray-200 rounded-md"
                                        >
                                            <div className="flex-1">
                                                <div className="flex items-center space-x-2">
                                                    {getCategoryIcon(interest.category)}
                                                    <h3 className="font-medium text-gray-900">{interest.name}</h3>
                                                </div>
                                                <p className="text-sm text-gray-600 mt-1">
                                                    {interest.level.charAt(0).toUpperCase() + interest.level.slice(1)}
                                                </p>
                                                {interest.description && (
                                                    <p className="text-sm text-gray-500 mt-1">{interest.description}</p>
                                                )}
                                            </div>
                                            <button
                                                onClick={() => handleRemoveInterest(interest._id)}
                                                className="p-1 text-gray-400 hover:text-red-600 ml-4"
                                            >
                                                <X size={16} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile; 