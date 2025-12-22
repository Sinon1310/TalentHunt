import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    User, Camera, Upload, Plus, Edit3, Trash2, Award, Target,
    MapPin, Calendar, Clock, Code, Heart, Star, CheckCircle,
    TrendingUp, Users, Briefcase, GraduationCap, Github, Linkedin,
    ExternalLink, FileText, Settings, Save, X
} from 'lucide-react';
import { useAuth } from '../Contexts/UserContext';
import { profileApi } from '../api/profile';

const AdvancedProfile = () => {
    const { user, token } = useAuth();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [activeTab, setActiveTab] = useState('overview');
    const [profileData, setProfileData] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    // Form states
    const [basicInfo, setBasicInfo] = useState({
        name: '',
        bio: '',
        profilePicture: ''
    });

    const [detailedInfo, setDetailedInfo] = useState({
        university: '',
        graduationYear: '',
        major: '',
        gpa: '',
        location: { city: '', country: '', timezone: '' },
        workingStyle: '',
        availability: '',
        experience: '',
        github: '',
        linkedin: '',
        portfolio: ''
    });

    const [skills, setSkills] = useState([]);
    const [interests, setInterests] = useState([]);
    const [portfolioProjects, setPortfolioProjects] = useState([]);
    const [teamPreferences, setTeamPreferences] = useState({
        preferredTeamSize: 4,
        preferredRoles: [],
        workingHours: { start: '09:00', end: '17:00' },
        communicationStyle: 'moderate',
        conflictResolution: 'collaborative'
    });

    const [newSkill, setNewSkill] = useState({ name: '', level: 'beginner' });
    const [newInterest, setNewInterest] = useState({ name: '', category: 'other', level: 'curious' });
    const [showSkillModal, setShowSkillModal] = useState(false);
    const [showInterestModal, setShowInterestModal] = useState(false);
    const [showProjectModal, setShowProjectModal] = useState(false);

    useEffect(() => {
        if (!token) {
            navigate('/auth');
            return;
        }
        loadProfile();
    }, [token, navigate]);

    const loadProfile = async () => {
        try {
            setLoading(true);
            const response = await profileApi.getProfile();
            const userData = response.data.user;
            
            setProfileData(userData);
            setBasicInfo({
                name: userData.name || '',
                bio: userData.bio || '',
                profilePicture: userData.profilePicture || ''
            });
            
            setDetailedInfo({
                university: userData.profile?.university || '',
                graduationYear: userData.profile?.graduationYear || '',
                major: userData.profile?.major || '',
                gpa: userData.profile?.gpa || '',
                location: userData.profile?.location || { city: '', country: '', timezone: '' },
                workingStyle: userData.profile?.workingStyle || '',
                availability: userData.profile?.availability || '',
                experience: userData.profile?.experience || '',
                github: userData.profile?.github || '',
                linkedin: userData.profile?.linkedin || '',
                portfolio: userData.profile?.portfolio || ''
            });

            setSkills(userData.skills || []);
            setInterests(userData.interests || []);
            setPortfolioProjects(userData.portfolio || []);
            setTeamPreferences({
                ...teamPreferences,
                ...userData.teamPreferences
            });

        } catch (error) {
            console.error('Error loading profile:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSaveBasicInfo = async () => {
        try {
            setSaving(true);
            await profileApi.updateBasicProfile(basicInfo);
            setIsEditing(false);
            await loadProfile();
        } catch (error) {
            console.error('Error saving basic info:', error);
        } finally {
            setSaving(false);
        }
    };

    const handleSaveDetailedInfo = async () => {
        try {
            setSaving(true);
            await profileApi.updateDetailedProfile(detailedInfo);
            await loadProfile();
        } catch (error) {
            console.error('Error saving detailed info:', error);
        } finally {
            setSaving(false);
        }
    };

    const handleAddSkill = async () => {
        if (!newSkill.name.trim()) return;
        
        try {
            const updatedSkills = [...skills, { ...newSkill, _id: Date.now().toString() }];
            await profileApi.updateSkills({ skills: updatedSkills });
            setSkills(updatedSkills);
            setNewSkill({ name: '', level: 'beginner' });
            setShowSkillModal(false);
        } catch (error) {
            console.error('Error adding skill:', error);
        }
    };

    const handleRemoveSkill = async (skillId) => {
        try {
            const updatedSkills = skills.filter(skill => skill._id !== skillId);
            await profileApi.updateSkills({ skills: updatedSkills });
            setSkills(updatedSkills);
        } catch (error) {
            console.error('Error removing skill:', error);
        }
    };

    const handleAddInterest = async () => {
        if (!newInterest.name.trim()) return;
        
        try {
            const updatedInterests = [...interests, { ...newInterest, _id: Date.now().toString() }];
            await profileApi.updateInterests({ interests: updatedInterests });
            setInterests(updatedInterests);
            setNewInterest({ name: '', category: 'other', level: 'curious' });
            setShowInterestModal(false);
        } catch (error) {
            console.error('Error adding interest:', error);
        }
    };

    const handleRemoveInterest = async (interestId) => {
        try {
            const updatedInterests = interests.filter(interest => interest._id !== interestId);
            await profileApi.updateInterests({ interests: updatedInterests });
            setInterests(updatedInterests);
        } catch (error) {
            console.error('Error removing interest:', error);
        }
    };

    const getSkillLevelColor = (level) => {
        const colors = {
            beginner: 'bg-gray-100 text-gray-700',
            intermediate: 'bg-blue-100 text-blue-700',
            advanced: 'bg-green-100 text-green-700',
            expert: 'bg-purple-100 text-purple-700'
        };
        return colors[level] || colors.beginner;
    };

    const getInterestLevelColor = (level) => {
        const colors = {
            curious: 'bg-yellow-100 text-yellow-700',
            hobbyist: 'bg-orange-100 text-orange-700',
            enthusiast: 'bg-red-100 text-red-700',
            passionate: 'bg-pink-100 text-pink-700'
        };
        return colors[level] || colors.curious;
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading profile...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-6xl mx-auto px-4">
                {/* Profile Header */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
                    <div className="relative h-32 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
                        <div className="absolute inset-0 bg-black/20"></div>
                    </div>
                    
                    <div className="relative px-8 pb-8">
                        <div className="flex flex-col sm:flex-row items-center sm:items-end -mt-16 sm:-mt-12">
                            {/* Profile Picture */}
                            <div className="relative">
                                <div className="w-24 h-24 sm:w-32 sm:h-32 bg-white rounded-full p-1 shadow-xl">
                                    {basicInfo.profilePicture ? (
                                        <img
                                            src={basicInfo.profilePicture}
                                            alt={basicInfo.name}
                                            className="w-full h-full rounded-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                                            <User className="w-10 h-10 sm:w-14 sm:h-14 text-white" />
                                        </div>
                                    )}
                                </div>
                                <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full shadow-lg hover:bg-blue-700 transition-colors">
                                    <Camera className="w-4 h-4" />
                                </button>
                            </div>
                            
                            {/* Basic Info */}
                            <div className="flex-1 sm:ml-6 text-center sm:text-left mt-4 sm:mt-0">
                                {isEditing ? (
                                    <div className="space-y-3">
                                        <input
                                            type="text"
                                            value={basicInfo.name}
                                            onChange={(e) => setBasicInfo({...basicInfo, name: e.target.value})}
                                            className="text-2xl font-bold bg-transparent border-b-2 border-blue-600 focus:outline-none"
                                            placeholder="Your Name"
                                        />
                                        <textarea
                                            value={basicInfo.bio}
                                            onChange={(e) => setBasicInfo({...basicInfo, bio: e.target.value})}
                                            className="w-full p-2 border rounded-lg resize-none"
                                            rows={2}
                                            placeholder="Tell us about yourself..."
                                        />
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={handleSaveBasicInfo}
                                                disabled={saving}
                                                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                                            >
                                                <Save className="w-4 h-4 mr-2" />
                                                {saving ? 'Saving...' : 'Save'}
                                            </button>
                                            <button
                                                onClick={() => setIsEditing(false)}
                                                className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                                            >
                                                <X className="w-4 h-4 mr-2" />
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <div className="flex items-center justify-center sm:justify-start space-x-3">
                                            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                                                {basicInfo.name || 'Your Name'}
                                            </h1>
                                            <button
                                                onClick={() => setIsEditing(true)}
                                                className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                                            >
                                                <Edit3 className="w-5 h-5" />
                                            </button>
                                        </div>
                                        <p className="text-gray-600 mt-2 max-w-2xl">
                                            {basicInfo.bio || 'Add a bio to tell others about yourself...'}
                                        </p>
                                        
                                        {/* Profile Stats */}
                                        <div className="flex flex-wrap justify-center sm:justify-start gap-6 mt-4">
                                            <div className="text-center">
                                                <div className="text-2xl font-bold text-blue-600">
                                                    {profileData?.profileCompleteness || 0}%
                                                </div>
                                                <div className="text-sm text-gray-600">Complete</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-2xl font-bold text-green-600">
                                                    {skills.length}
                                                </div>
                                                <div className="text-sm text-gray-600">Skills</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-2xl font-bold text-purple-600">
                                                    {portfolioProjects.length}
                                                </div>
                                                <div className="text-sm text-gray-600">Projects</div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Navigation Tabs */}
                <div className="bg-white rounded-xl shadow-lg mb-8">
                    <div className="border-b border-gray-200">
                        <nav className="flex space-x-8 px-8">
                            {[
                                { id: 'overview', name: 'Overview', icon: User },
                                { id: 'skills', name: 'Skills', icon: Star },
                                { id: 'portfolio', name: 'Portfolio', icon: Briefcase },
                                { id: 'preferences', name: 'Team Preferences', icon: Users },
                                { id: 'settings', name: 'Settings', icon: Settings }
                            ].map((tab) => {
                                const IconComponent = tab.icon;
                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`flex items-center py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                                            activeTab === tab.id
                                                ? 'border-blue-500 text-blue-600'
                                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                        }`}
                                    >
                                        <IconComponent className="w-5 h-5 mr-2" />
                                        {tab.name}
                                    </button>
                                );
                            })}
                        </nav>
                    </div>
                </div>

                {/* Tab Content */}
                <div className="space-y-8">
                    {/* Overview Tab */}
                    {activeTab === 'overview' && (
                        <div className="grid lg:grid-cols-3 gap-8">
                            {/* Profile Details */}
                            <div className="lg:col-span-2 space-y-6">
                                {/* Academic Info */}
                                <div className="bg-white rounded-xl shadow-lg p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-xl font-bold text-gray-900 flex items-center">
                                            <GraduationCap className="w-6 h-6 mr-2 text-blue-600" />
                                            Academic Information
                                        </h3>
                                        <button
                                            onClick={handleSaveDetailedInfo}
                                            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                                        >
                                            Edit
                                        </button>
                                    </div>
                                    
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">University</label>
                                            <input
                                                type="text"
                                                value={detailedInfo.university}
                                                onChange={(e) => setDetailedInfo({...detailedInfo, university: e.target.value})}
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                placeholder="Your university"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Major</label>
                                            <input
                                                type="text"
                                                value={detailedInfo.major}
                                                onChange={(e) => setDetailedInfo({...detailedInfo, major: e.target.value})}
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                placeholder="Your major"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Graduation Year</label>
                                            <input
                                                type="number"
                                                value={detailedInfo.graduationYear}
                                                onChange={(e) => setDetailedInfo({...detailedInfo, graduationYear: e.target.value})}
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                placeholder="2025"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">GPA</label>
                                            <input
                                                type="number"
                                                step="0.01"
                                                max="4.0"
                                                value={detailedInfo.gpa}
                                                onChange={(e) => setDetailedInfo({...detailedInfo, gpa: e.target.value})}
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                placeholder="3.5"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Working Preferences */}
                                <div className="bg-white rounded-xl shadow-lg p-6">
                                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                                        <Clock className="w-6 h-6 mr-2 text-green-600" />
                                        Working Preferences
                                    </h3>
                                    
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Working Style</label>
                                            <select
                                                value={detailedInfo.workingStyle}
                                                onChange={(e) => setDetailedInfo({...detailedInfo, workingStyle: e.target.value})}
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            >
                                                <option value="">Select style</option>
                                                <option value="individual">Individual</option>
                                                <option value="team-oriented">Team-oriented</option>
                                                <option value="leadership">Leadership</option>
                                                <option value="flexible">Flexible</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Availability</label>
                                            <select
                                                value={detailedInfo.availability}
                                                onChange={(e) => setDetailedInfo({...detailedInfo, availability: e.target.value})}
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            >
                                                <option value="">Select availability</option>
                                                <option value="full-time">Full-time</option>
                                                <option value="part-time">Part-time</option>
                                                <option value="weekends">Weekends</option>
                                                <option value="flexible">Flexible</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Experience Level</label>
                                            <select
                                                value={detailedInfo.experience}
                                                onChange={(e) => setDetailedInfo({...detailedInfo, experience: e.target.value})}
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            >
                                                <option value="">Select level</option>
                                                <option value="beginner">Beginner</option>
                                                <option value="intermediate">Intermediate</option>
                                                <option value="advanced">Advanced</option>
                                                <option value="expert">Expert</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Sidebar */}
                            <div className="space-y-6">
                                {/* Quick Stats */}
                                <div className="bg-white rounded-xl shadow-lg p-6">
                                    <h3 className="text-lg font-bold text-gray-900 mb-4">Profile Stats</h3>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <span className="text-gray-600">Completeness</span>
                                            <div className="flex items-center space-x-2">
                                                <div className="w-20 bg-gray-200 rounded-full h-2">
                                                    <div 
                                                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                                        style={{ width: `${profileData?.profileCompleteness || 0}%` }}
                                                    ></div>
                                                </div>
                                                <span className="text-sm font-medium">{profileData?.profileCompleteness || 0}%</span>
                                            </div>
                                        </div>
                                        
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Skills</span>
                                            <span className="font-medium">{skills.length}</span>
                                        </div>
                                        
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Interests</span>
                                            <span className="font-medium">{interests.length}</span>
                                        </div>
                                        
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Projects</span>
                                            <span className="font-medium">{portfolioProjects.length}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Social Links */}
                                <div className="bg-white rounded-xl shadow-lg p-6">
                                    <h3 className="text-lg font-bold text-gray-900 mb-4">Social Links</h3>
                                    <div className="space-y-3">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">GitHub</label>
                                            <div className="flex">
                                                <input
                                                    type="url"
                                                    value={detailedInfo.github}
                                                    onChange={(e) => setDetailedInfo({...detailedInfo, github: e.target.value})}
                                                    className="flex-1 p-3 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                    placeholder="https://github.com/username"
                                                />
                                                {detailedInfo.github && (
                                                    <a
                                                        href={detailedInfo.github}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="px-3 py-3 bg-gray-800 text-white rounded-r-lg hover:bg-gray-900"
                                                    >
                                                        <Github className="w-5 h-5" />
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                        
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn</label>
                                            <div className="flex">
                                                <input
                                                    type="url"
                                                    value={detailedInfo.linkedin}
                                                    onChange={(e) => setDetailedInfo({...detailedInfo, linkedin: e.target.value})}
                                                    className="flex-1 p-3 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                    placeholder="https://linkedin.com/in/username"
                                                />
                                                {detailedInfo.linkedin && (
                                                    <a
                                                        href={detailedInfo.linkedin}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="px-3 py-3 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700"
                                                    >
                                                        <Linkedin className="w-5 h-5" />
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                        
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Portfolio Website</label>
                                            <div className="flex">
                                                <input
                                                    type="url"
                                                    value={detailedInfo.portfolio}
                                                    onChange={(e) => setDetailedInfo({...detailedInfo, portfolio: e.target.value})}
                                                    className="flex-1 p-3 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                    placeholder="https://yourportfolio.com"
                                                />
                                                {detailedInfo.portfolio && (
                                                    <a
                                                        href={detailedInfo.portfolio}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="px-3 py-3 bg-purple-600 text-white rounded-r-lg hover:bg-purple-700"
                                                    >
                                                        <ExternalLink className="w-5 h-5" />
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Skills Tab */}
                    {activeTab === 'skills' && (
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                                    <Star className="w-7 h-7 mr-3 text-yellow-500" />
                                    Skills & Expertise
                                </h3>
                                <button
                                    onClick={() => setShowSkillModal(true)}
                                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    <Plus className="w-5 h-5 mr-2" />
                                    Add Skill
                                </button>
                            </div>

                            {skills.length > 0 ? (
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {skills.map((skill) => (
                                        <div key={skill._id} className="relative group bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                                            <div className="flex items-center justify-between">
                                                <div className="flex-1">
                                                    <h4 className="font-semibold text-gray-900">{skill.name}</h4>
                                                    <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full mt-2 ${getSkillLevelColor(skill.level)}`}>
                                                        {skill.level}
                                                    </span>
                                                </div>
                                                <button
                                                    onClick={() => handleRemoveSkill(skill._id)}
                                                    className="opacity-0 group-hover:opacity-100 p-1 text-red-500 hover:text-red-700 transition-all"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <Code className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                                    <h4 className="text-lg font-medium text-gray-900 mb-2">No skills added yet</h4>
                                    <p className="text-gray-600 mb-6">Add your skills to help others understand your expertise</p>
                                    <button
                                        onClick={() => setShowSkillModal(true)}
                                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        Add Your First Skill
                                    </button>
                                </div>
                            )}

                            {/* Interests Section */}
                            <div className="border-t border-gray-200 pt-8 mt-8">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                                        <Heart className="w-7 h-7 mr-3 text-red-500" />
                                        Interests & Passions
                                    </h3>
                                    <button
                                        onClick={() => setShowInterestModal(true)}
                                        className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                                    >
                                        <Plus className="w-5 h-5 mr-2" />
                                        Add Interest
                                    </button>
                                </div>

                                {interests.length > 0 ? (
                                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {interests.map((interest) => (
                                            <div key={interest._id} className="relative group bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex-1">
                                                        <h4 className="font-semibold text-gray-900">{interest.name}</h4>
                                                        <div className="flex items-center space-x-2 mt-2">
                                                            <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getInterestLevelColor(interest.level)}`}>
                                                                {interest.level}
                                                            </span>
                                                            <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded-full">
                                                                {interest.category}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <button
                                                        onClick={() => handleRemoveInterest(interest._id)}
                                                        className="opacity-0 group-hover:opacity-100 p-1 text-red-500 hover:text-red-700 transition-all"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-12">
                                        <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                                        <h4 className="text-lg font-medium text-gray-900 mb-2">No interests added yet</h4>
                                        <p className="text-gray-600 mb-6">Share your interests to connect with like-minded teammates</p>
                                        <button
                                            onClick={() => setShowInterestModal(true)}
                                            className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                                        >
                                            Add Your First Interest
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Skill Modal */}
                {showSkillModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-2xl max-w-md w-full p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Add New Skill</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Skill Name</label>
                                    <input
                                        type="text"
                                        value={newSkill.name}
                                        onChange={(e) => setNewSkill({...newSkill, name: e.target.value})}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="e.g., React, Python, UI Design"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Proficiency Level</label>
                                    <select
                                        value={newSkill.level}
                                        onChange={(e) => setNewSkill({...newSkill, level: e.target.value})}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        <option value="beginner">Beginner</option>
                                        <option value="intermediate">Intermediate</option>
                                        <option value="advanced">Advanced</option>
                                        <option value="expert">Expert</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex space-x-3 mt-6">
                                <button
                                    onClick={handleAddSkill}
                                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    Add Skill
                                </button>
                                <button
                                    onClick={() => setShowSkillModal(false)}
                                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Interest Modal */}
                {showInterestModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-2xl max-w-md w-full p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Add New Interest</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Interest Name</label>
                                    <input
                                        type="text"
                                        value={newInterest.name}
                                        onChange={(e) => setNewInterest({...newInterest, name: e.target.value})}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="e.g., Machine Learning, Sustainability, Gaming"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                    <select
                                        value={newInterest.category}
                                        onChange={(e) => setNewInterest({...newInterest, category: e.target.value})}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        <option value="technical">Technical</option>
                                        <option value="business">Business</option>
                                        <option value="design">Design</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Passion Level</label>
                                    <select
                                        value={newInterest.level}
                                        onChange={(e) => setNewInterest({...newInterest, level: e.target.value})}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        <option value="curious">Curious</option>
                                        <option value="hobbyist">Hobbyist</option>
                                        <option value="enthusiast">Enthusiast</option>
                                        <option value="passionate">Passionate</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex space-x-3 mt-6">
                                <button
                                    onClick={handleAddInterest}
                                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                                >
                                    Add Interest
                                </button>
                                <button
                                    onClick={() => setShowInterestModal(false)}
                                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdvancedProfile;
