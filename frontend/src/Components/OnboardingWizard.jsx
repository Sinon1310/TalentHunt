import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    User, GraduationCap, Target, Users, Star, Heart, Award, 
    CheckCircle, ArrowRight, ArrowLeft, ChevronRight, Lightbulb,
    MapPin, Clock, Code, Briefcase, Camera, Upload
} from 'lucide-react';
import { useUser } from '../Contexts/UserContext';
import { profileApi } from '../api/profile';

const OnboardingWizard = () => {
    const { user, token } = useUser();
    const navigate = useNavigate();

    const [currentStep, setCurrentStep] = useState(0);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        // Step 1: Basic Info
        name: '',
        bio: '',
        profilePicture: '',
        
        // Step 2: Academic Info
        university: '',
        major: '',
        graduationYear: new Date().getFullYear() + 1,
        gpa: '',
        location: { city: '', country: '', timezone: '' },
        
        // Step 3: Experience & Preferences
        experience: '',
        workingStyle: '',
        availability: '',
        
        // Step 4: Skills
        skills: [],
        
        // Step 5: Interests
        interests: [],
        
        // Step 6: Team Preferences
        preferredTeamSize: 4,
        preferredRoles: [],
        communicationStyle: 'moderate'
    });

    const [newSkill, setNewSkill] = useState({ name: '', level: 'beginner' });
    const [newInterest, setNewInterest] = useState({ name: '', category: 'technical', level: 'curious' });

    const steps = [
        {
            title: 'Welcome to TalentHunt!',
            subtitle: 'Let\'s set up your profile',
            icon: User,
            component: 'welcome'
        },
        {
            title: 'Basic Information',
            subtitle: 'Tell us about yourself',
            icon: User,
            component: 'basic'
        },
        {
            title: 'Academic Background',
            subtitle: 'Your educational journey',
            icon: GraduationCap,
            component: 'academic'
        },
        {
            title: 'Experience & Style',
            subtitle: 'How you like to work',
            icon: Briefcase,
            component: 'experience'
        },
        {
            title: 'Your Skills',
            subtitle: 'What you\'re good at',
            icon: Star,
            component: 'skills'
        },
        {
            title: 'Your Interests',
            subtitle: 'What excites you',
            icon: Heart,
            component: 'interests'
        },
        {
            title: 'Team Preferences',
            subtitle: 'Your ideal collaboration',
            icon: Users,
            component: 'team'
        },
        {
            title: 'All Set!',
            subtitle: 'Ready to find your perfect team',
            icon: Award,
            component: 'complete'
        }
    ];

    const handleNext = async () => {
        if (currentStep === steps.length - 1) {
            await completeOnboarding();
            return;
        }
        setCurrentStep(prev => prev + 1);
    };

    const handleBack = () => {
        setCurrentStep(prev => prev - 1);
    };

    const handleSkipOnboarding = async () => {
        try {
            setLoading(true);
            await profileApi.updateOnboarding({
                skipOnboarding: true,
                completed: true,
                currentStep: steps.length - 1
            });
            navigate('/dashboard');
        } catch (error) {
            console.error('Error skipping onboarding:', error);
        } finally {
            setLoading(false);
        }
    };

    const completeOnboarding = async () => {
        try {
            setLoading(true);

            // Update all profile information
            await Promise.all([
                profileApi.updateBasicProfile({
                    name: formData.name,
                    bio: formData.bio,
                    profilePicture: formData.profilePicture
                }),
                profileApi.updateDetailedProfile({
                    university: formData.university,
                    major: formData.major,
                    graduationYear: formData.graduationYear,
                    gpa: formData.gpa,
                    location: formData.location,
                    experience: formData.experience,
                    workingStyle: formData.workingStyle,
                    availability: formData.availability
                }),
                profileApi.updateSkills({ skills: formData.skills }),
                profileApi.updateInterests({ interests: formData.interests }),
                profileApi.updateTeamPreferences({
                    preferredTeamSize: formData.preferredTeamSize,
                    preferredRoles: formData.preferredRoles,
                    communicationStyle: formData.communicationStyle
                }),
                profileApi.updateOnboarding({
                    completed: true,
                    currentStep: steps.length - 1,
                    stepsCompleted: steps.map((_, index) => `step_${index}`)
                })
            ]);

            navigate('/dashboard');
        } catch (error) {
            console.error('Error completing onboarding:', error);
        } finally {
            setLoading(false);
        }
    };

    const addSkill = () => {
        if (newSkill.name.trim()) {
            setFormData(prev => ({
                ...prev,
                skills: [...prev.skills, { ...newSkill, _id: Date.now().toString() }]
            }));
            setNewSkill({ name: '', level: 'beginner' });
        }
    };

    const removeSkill = (id) => {
        setFormData(prev => ({
            ...prev,
            skills: prev.skills.filter(skill => skill._id !== id)
        }));
    };

    const addInterest = () => {
        if (newInterest.name.trim()) {
            setFormData(prev => ({
                ...prev,
                interests: [...prev.interests, { ...newInterest, _id: Date.now().toString() }]
            }));
            setNewInterest({ name: '', category: 'technical', level: 'curious' });
        }
    };

    const removeInterest = (id) => {
        setFormData(prev => ({
            ...prev,
            interests: prev.interests.filter(interest => interest._id !== id)
        }));
    };

    const renderStepContent = () => {
        const step = steps[currentStep];
        
        switch (step.component) {
            case 'welcome':
                return (
                    <div className="text-center space-y-6">
                        <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto">
                            <Award className="w-12 h-12 text-white" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">Welcome to TalentHunt!</h2>
                            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                                We'll help you create an amazing profile that showcases your skills and helps you find the perfect team for competitions.
                            </p>
                        </div>
                        <div className="bg-blue-50 rounded-xl p-6">
                            <h3 className="font-semibold text-blue-900 mb-3">What you'll do in the next few minutes:</h3>
                            <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-800">
                                <div className="flex items-center">
                                    <CheckCircle className="w-4 h-4 mr-2 text-blue-600" />
                                    Set up your basic profile
                                </div>
                                <div className="flex items-center">
                                    <CheckCircle className="w-4 h-4 mr-2 text-blue-600" />
                                    Add your skills & interests
                                </div>
                                <div className="flex items-center">
                                    <CheckCircle className="w-4 h-4 mr-2 text-blue-600" />
                                    Share your background
                                </div>
                                <div className="flex items-center">
                                    <CheckCircle className="w-4 h-4 mr-2 text-blue-600" />
                                    Set team preferences
                                </div>
                            </div>
                        </div>
                        <p className="text-sm text-gray-500">
                            This will take about 5 minutes. You can always update your profile later.
                        </p>
                    </div>
                );

            case 'basic':
                return (
                    <div className="space-y-6">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Tell us about yourself</h2>
                            <p className="text-gray-600">This information will be shown on your profile</p>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                    className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
                                    placeholder="Enter your full name"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                                <textarea
                                    value={formData.bio}
                                    onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                                    className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                                    rows={4}
                                    placeholder="Tell us about yourself, your passions, and what you're looking for in a team..."
                                />
                                <p className="text-sm text-gray-500 mt-1">
                                    {formData.bio.length}/500 characters
                                </p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Profile Picture</label>
                                <div className="flex items-center space-x-6">
                                    <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
                                        {formData.profilePicture ? (
                                            <img 
                                                src={formData.profilePicture} 
                                                alt="Profile" 
                                                className="w-full h-full rounded-full object-cover"
                                            />
                                        ) : (
                                            <Camera className="w-8 h-8 text-gray-400" />
                                        )}
                                    </div>
                                    <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                                        <Upload className="w-4 h-4 mr-2" />
                                        Upload Photo
                                    </button>
                                </div>
                                <p className="text-sm text-gray-500 mt-2">
                                    Optional: Upload a professional photo to help teammates recognize you
                                </p>
                            </div>
                        </div>
                    </div>
                );

            case 'academic':
                return (
                    <div className="space-y-6">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Academic Background</h2>
                            <p className="text-gray-600">Help us understand your educational journey</p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">University</label>
                                <input
                                    type="text"
                                    value={formData.university}
                                    onChange={(e) => setFormData(prev => ({ ...prev, university: e.target.value }))}
                                    className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Your university name"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Major</label>
                                <input
                                    type="text"
                                    value={formData.major}
                                    onChange={(e) => setFormData(prev => ({ ...prev, major: e.target.value }))}
                                    className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Computer Science, Business, etc."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Expected Graduation Year</label>
                                <select
                                    value={formData.graduationYear}
                                    onChange={(e) => setFormData(prev => ({ ...prev, graduationYear: parseInt(e.target.value) }))}
                                    className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                >
                                    {Array.from({length: 6}, (_, i) => new Date().getFullYear() + i).map(year => (
                                        <option key={year} value={year}>{year}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">GPA (Optional)</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    max="4"
                                    value={formData.gpa}
                                    onChange={(e) => setFormData(prev => ({ ...prev, gpa: e.target.value }))}
                                    className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="3.5"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                            <div className="grid md:grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    value={formData.location.city}
                                    onChange={(e) => setFormData(prev => ({ 
                                        ...prev, 
                                        location: { ...prev.location, city: e.target.value }
                                    }))}
                                    className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="City"
                                />
                                <input
                                    type="text"
                                    value={formData.location.country}
                                    onChange={(e) => setFormData(prev => ({ 
                                        ...prev, 
                                        location: { ...prev.location, country: e.target.value }
                                    }))}
                                    className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Country"
                                />
                            </div>
                        </div>
                    </div>
                );

            case 'experience':
                return (
                    <div className="space-y-6">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Experience & Working Style</h2>
                            <p className="text-gray-600">Help us understand how you work best</p>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-3">Experience Level</label>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {[
                                        { value: 'beginner', label: 'Beginner', desc: 'Just getting started' },
                                        { value: 'intermediate', label: 'Intermediate', desc: 'Some experience' },
                                        { value: 'advanced', label: 'Advanced', desc: 'Very experienced' },
                                        { value: 'expert', label: 'Expert', desc: 'Professional level' }
                                    ].map(option => (
                                        <button
                                            key={option.value}
                                            onClick={() => setFormData(prev => ({ ...prev, experience: option.value }))}
                                            className={`p-4 border-2 rounded-xl text-center transition-all ${
                                                formData.experience === option.value
                                                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                                                    : 'border-gray-300 hover:border-gray-400'
                                            }`}
                                        >
                                            <div className="font-semibold">{option.label}</div>
                                            <div className="text-sm text-gray-600">{option.desc}</div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-3">Working Style</label>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {[
                                        { value: 'individual', label: 'Individual', icon: User },
                                        { value: 'team-oriented', label: 'Team Player', icon: Users },
                                        { value: 'leadership', label: 'Leader', icon: Target },
                                        { value: 'flexible', label: 'Flexible', icon: Lightbulb }
                                    ].map(option => {
                                        const Icon = option.icon;
                                        return (
                                            <button
                                                key={option.value}
                                                onClick={() => setFormData(prev => ({ ...prev, workingStyle: option.value }))}
                                                className={`p-4 border-2 rounded-xl text-center transition-all ${
                                                    formData.workingStyle === option.value
                                                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                                                        : 'border-gray-300 hover:border-gray-400'
                                                }`}
                                            >
                                                <Icon className="w-8 h-8 mx-auto mb-2" />
                                                <div className="font-semibold">{option.label}</div>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-3">Availability</label>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {[
                                        { value: 'full-time', label: 'Full-time' },
                                        { value: 'part-time', label: 'Part-time' },
                                        { value: 'weekends', label: 'Weekends' },
                                        { value: 'flexible', label: 'Flexible' }
                                    ].map(option => (
                                        <button
                                            key={option.value}
                                            onClick={() => setFormData(prev => ({ ...prev, availability: option.value }))}
                                            className={`p-4 border-2 rounded-xl text-center transition-all ${
                                                formData.availability === option.value
                                                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                                                    : 'border-gray-300 hover:border-gray-400'
                                            }`}
                                        >
                                            <div className="font-semibold">{option.label}</div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'skills':
                return (
                    <div className="space-y-6">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Skills</h2>
                            <p className="text-gray-600">Add the skills that make you valuable to a team</p>
                        </div>

                        <div className="space-y-6">
                            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                                <h3 className="font-semibold text-blue-900 mb-4">Add a new skill</h3>
                                <div className="grid md:grid-cols-3 gap-4">
                                    <div className="md:col-span-2">
                                        <input
                                            type="text"
                                            value={newSkill.name}
                                            onChange={(e) => setNewSkill(prev => ({ ...prev, name: e.target.value }))}
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="e.g., React, Python, UI Design"
                                            onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                                        />
                                    </div>
                                    <div className="flex space-x-2">
                                        <select
                                            value={newSkill.level}
                                            onChange={(e) => setNewSkill(prev => ({ ...prev, level: e.target.value }))}
                                            className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        >
                                            <option value="beginner">Beginner</option>
                                            <option value="intermediate">Intermediate</option>
                                            <option value="advanced">Advanced</option>
                                            <option value="expert">Expert</option>
                                        </select>
                                        <button
                                            onClick={addSkill}
                                            disabled={!newSkill.name.trim()}
                                            className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            Add
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {formData.skills.length > 0 && (
                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-4">Your Skills ({formData.skills.length})</h3>
                                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {formData.skills.map(skill => (
                                            <div key={skill._id} className="bg-white border border-gray-200 rounded-lg p-4 flex items-center justify-between">
                                                <div>
                                                    <div className="font-semibold text-gray-900">{skill.name}</div>
                                                    <div className="text-sm text-blue-600">{skill.level}</div>
                                                </div>
                                                <button
                                                    onClick={() => removeSkill(skill._id)}
                                                    className="text-red-500 hover:text-red-700 p-1"
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {formData.skills.length === 0 && (
                                <div className="text-center py-8 bg-gray-50 rounded-xl">
                                    <Star className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                                    <p className="text-gray-600">No skills added yet. Add some skills to showcase your expertise!</p>
                                </div>
                            )}
                        </div>
                    </div>
                );

            case 'interests':
                return (
                    <div className="space-y-6">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Interests</h2>
                            <p className="text-gray-600">Share what you're passionate about beyond your skills</p>
                        </div>

                        <div className="space-y-6">
                            <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                                <h3 className="font-semibold text-red-900 mb-4">Add a new interest</h3>
                                <div className="grid md:grid-cols-4 gap-4">
                                    <div className="md:col-span-2">
                                        <input
                                            type="text"
                                            value={newInterest.name}
                                            onChange={(e) => setNewInterest(prev => ({ ...prev, name: e.target.value }))}
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                                            placeholder="e.g., Machine Learning, Sustainability"
                                            onKeyPress={(e) => e.key === 'Enter' && addInterest()}
                                        />
                                    </div>
                                    <select
                                        value={newInterest.category}
                                        onChange={(e) => setNewInterest(prev => ({ ...prev, category: e.target.value }))}
                                        className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                                    >
                                        <option value="technical">Technical</option>
                                        <option value="business">Business</option>
                                        <option value="design">Design</option>
                                        <option value="other">Other</option>
                                    </select>
                                    <button
                                        onClick={addInterest}
                                        disabled={!newInterest.name.trim()}
                                        className="px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Add
                                    </button>
                                </div>
                            </div>

                            {formData.interests.length > 0 && (
                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-4">Your Interests ({formData.interests.length})</h3>
                                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {formData.interests.map(interest => (
                                            <div key={interest._id} className="bg-white border border-gray-200 rounded-lg p-4 flex items-center justify-between">
                                                <div>
                                                    <div className="font-semibold text-gray-900">{interest.name}</div>
                                                    <div className="text-sm text-red-600">{interest.category}</div>
                                                </div>
                                                <button
                                                    onClick={() => removeInterest(interest._id)}
                                                    className="text-red-500 hover:text-red-700 p-1"
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {formData.interests.length === 0 && (
                                <div className="text-center py-8 bg-gray-50 rounded-xl">
                                    <Heart className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                                    <p className="text-gray-600">No interests added yet. Share what you're passionate about!</p>
                                </div>
                            )}
                        </div>
                    </div>
                );

            case 'team':
                return (
                    <div className="space-y-6">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Team Preferences</h2>
                            <p className="text-gray-600">Help us find the perfect team match for you</p>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-3">
                                    Preferred Team Size
                                </label>
                                <div className="flex items-center space-x-4">
                                    <input
                                        type="range"
                                        min="2"
                                        max="10"
                                        value={formData.preferredTeamSize}
                                        onChange={(e) => setFormData(prev => ({ ...prev, preferredTeamSize: parseInt(e.target.value) }))}
                                        className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                    />
                                    <div className="text-2xl font-bold text-blue-600 min-w-[3rem] text-center">
                                        {formData.preferredTeamSize}
                                    </div>
                                </div>
                                <div className="flex justify-between text-sm text-gray-500 mt-2">
                                    <span>Small (2-3)</span>
                                    <span>Medium (4-6)</span>
                                    <span>Large (7-10)</span>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-3">
                                    Communication Style
                                </label>
                                <div className="grid grid-cols-3 gap-4">
                                    {[
                                        { value: 'frequent', label: 'Frequent', desc: 'Daily check-ins' },
                                        { value: 'moderate', label: 'Moderate', desc: 'Regular updates' },
                                        { value: 'minimal', label: 'Minimal', desc: 'As needed' }
                                    ].map(option => (
                                        <button
                                            key={option.value}
                                            onClick={() => setFormData(prev => ({ ...prev, communicationStyle: option.value }))}
                                            className={`p-4 border-2 rounded-xl text-center transition-all ${
                                                formData.communicationStyle === option.value
                                                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                                                    : 'border-gray-300 hover:border-gray-400'
                                            }`}
                                        >
                                            <div className="font-semibold">{option.label}</div>
                                            <div className="text-sm text-gray-600">{option.desc}</div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-3">
                                    Preferred Roles (Optional)
                                </label>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                    {[
                                        'Frontend Developer', 'Backend Developer', 'Full-Stack Developer',
                                        'UI/UX Designer', 'Data Scientist', 'Project Manager',
                                        'Business Analyst', 'DevOps Engineer', 'Mobile Developer'
                                    ].map(role => (
                                        <button
                                            key={role}
                                            onClick={() => {
                                                setFormData(prev => ({
                                                    ...prev,
                                                    preferredRoles: prev.preferredRoles.includes(role)
                                                        ? prev.preferredRoles.filter(r => r !== role)
                                                        : [...prev.preferredRoles, role]
                                                }));
                                            }}
                                            className={`p-3 text-sm border-2 rounded-lg transition-all ${
                                                formData.preferredRoles.includes(role)
                                                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                                                    : 'border-gray-300 hover:border-gray-400'
                                            }`}
                                        >
                                            {role}
                                        </button>
                                    ))}
                                </div>
                                {formData.preferredRoles.length > 0 && (
                                    <p className="text-sm text-gray-600 mt-2">
                                        Selected {formData.preferredRoles.length} role(s)
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                );

            case 'complete':
                return (
                    <div className="text-center space-y-6">
                        <div className="w-24 h-24 bg-gradient-to-br from-green-600 to-blue-600 rounded-full flex items-center justify-center mx-auto">
                            <CheckCircle className="w-12 h-12 text-white" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">You're All Set!</h2>
                            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                                Your profile is now complete and ready to help you find amazing teammates for competitions.
                            </p>
                        </div>
                        
                        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-8">
                            <h3 className="font-bold text-lg text-gray-900 mb-4">What's Next?</h3>
                            <div className="grid md:grid-cols-2 gap-6 text-left">
                                <div className="flex items-start space-x-3">
                                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                                        <Users className="w-4 h-4 text-white" />
                                    </div>
                                    <div>
                                        <div className="font-semibold text-gray-900">Find Your Team</div>
                                        <div className="text-sm text-gray-600">Browse competitions and get matched with compatible teammates</div>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                                        <Target className="w-4 h-4 text-white" />
                                    </div>
                                    <div>
                                        <div className="font-semibold text-gray-900">Join Competitions</div>
                                        <div className="text-sm text-gray-600">Participate in exciting challenges and win amazing prizes</div>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                                        <Lightbulb className="w-4 h-4 text-white" />
                                    </div>
                                    <div>
                                        <div className="font-semibold text-gray-900">Get Mentorship</div>
                                        <div className="text-sm text-gray-600">Connect with experienced mentors to guide your journey</div>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center flex-shrink-0">
                                        <Award className="w-4 h-4 text-white" />
                                    </div>
                                    <div>
                                        <div className="font-semibold text-gray-900">Track Progress</div>
                                        <div className="text-sm text-gray-600">Monitor your achievements and build your portfolio</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                onClick={completeOnboarding}
                                disabled={loading}
                                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 flex items-center justify-center"
                            >
                                {loading ? (
                                    <>
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                        Setting up your profile...
                                    </>
                                ) : (
                                    <>
                                        Go to Dashboard
                                        <ArrowRight className="ml-2 w-5 h-5" />
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    if (!user || !token) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <div className="max-w-4xl mx-auto px-4 py-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center space-x-4 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                            <span className="text-white font-bold text-lg">T</span>
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900">Profile Setup</h1>
                        <button
                            onClick={handleSkipOnboarding}
                            className="text-gray-400 hover:text-gray-600 text-sm underline"
                        >
                            Skip for now
                        </button>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="max-w-2xl mx-auto mb-6">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-700">
                                Step {currentStep + 1} of {steps.length}
                            </span>
                            <span className="text-sm text-gray-500">
                                {Math.round(((currentStep + 1) / steps.length) * 100)}% Complete
                            </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                            <div 
                                className="bg-gradient-to-r from-blue-600 to-purple-600 h-3 rounded-full transition-all duration-300"
                                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                            ></div>
                        </div>
                    </div>

                    {/* Step Indicator */}
                    <div className="flex items-center justify-center space-x-2 mb-8 overflow-x-auto pb-2">
                        {steps.map((step, index) => {
                            const IconComponent = step.icon;
                            return (
                                <div
                                    key={index}
                                    className={`flex items-center ${index < steps.length - 1 ? 'mr-4' : ''}`}
                                >
                                    <div
                                        className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                                            index === currentStep
                                                ? 'border-blue-500 bg-blue-500 text-white'
                                                : index < currentStep
                                                ? 'border-green-500 bg-green-500 text-white'
                                                : 'border-gray-300 bg-white text-gray-400'
                                        }`}
                                    >
                                        {index < currentStep ? (
                                            <CheckCircle className="w-5 h-5" />
                                        ) : (
                                            <IconComponent className="w-5 h-5" />
                                        )}
                                    </div>
                                    {index < steps.length - 1 && (
                                        <ChevronRight className="w-4 h-4 text-gray-300 mx-2" />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Step Content */}
                <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
                    {renderStepContent()}
                </div>

                {/* Navigation */}
                <div className="flex justify-between">
                    <button
                        onClick={handleBack}
                        disabled={currentStep === 0}
                        className="flex items-center px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Back
                    </button>

                    <button
                        onClick={handleNext}
                        disabled={loading}
                        className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                    >
                        {currentStep === steps.length - 1 ? (
                            loading ? (
                                <>
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                    Finishing...
                                </>
                            ) : (
                                'Complete Setup'
                            )
                        ) : (
                            <>
                                Next
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OnboardingWizard;
