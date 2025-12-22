const User = require('../models/users');
const multer = require('multer');
const path = require('path');

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/profiles/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    },
    fileFilter: (req, file, cb) => {
        // Check file type
        if (file.fieldname === 'profilePicture') {
            if (file.mimetype.startsWith('image/')) {
                cb(null, true);
            } else {
                cb(new Error('Profile picture must be an image'));
            }
        } else if (file.fieldname === 'resume') {
            if (file.mimetype === 'application/pdf') {
                cb(null, true);
            } else {
                cb(new Error('Resume must be a PDF file'));
            }
        } else {
            cb(new Error('Unexpected field'));
        }
    }
});

// Get user profile
exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password -passwordResetToken -emailVerificationToken');
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.json({
            success: true,
            data: {
                user,
                profileCompleteness: user.calculateProfileCompleteness()
            }
        });
    } catch (error) {
        console.error('Get profile error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Update basic profile
exports.updateBasicProfile = async (req, res) => {
    try {
        const { name, bio, profilePicture } = req.body;
        
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Update fields
        if (name) user.name = name;
        if (bio) user.bio = bio;
        if (profilePicture) user.profilePicture = profilePicture;

        await user.save();

        res.json({
            success: true,
            message: 'Profile updated successfully',
            data: {
                user: {
                    name: user.name,
                    bio: user.bio,
                    profilePicture: user.profilePicture,
                    profileCompleteness: user.calculateProfileCompleteness()
                }
            }
        });
    } catch (error) {
        console.error('Update profile error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Update detailed profile
exports.updateDetailedProfile = async (req, res) => {
    try {
        const {
            university,
            graduationYear,
            major,
            gpa,
            location,
            workingStyle,
            availability,
            experience,
            github,
            linkedin,
            portfolio
        } = req.body;

        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Initialize profile object if it doesn't exist
        if (!user.profile) {
            user.profile = {};
        }

        // Update profile fields
        if (university) user.profile.university = university;
        if (graduationYear) user.profile.graduationYear = graduationYear;
        if (major) user.profile.major = major;
        if (gpa !== undefined) user.profile.gpa = gpa;
        if (location) user.profile.location = location;
        if (workingStyle) user.profile.workingStyle = workingStyle;
        if (availability) user.profile.availability = availability;
        if (experience) user.profile.experience = experience;
        if (github) user.profile.github = github;
        if (linkedin) user.profile.linkedin = linkedin;
        if (portfolio) user.profile.portfolio = portfolio;

        await user.save();

        res.json({
            success: true,
            message: 'Detailed profile updated successfully',
            data: {
                profile: user.profile,
                profileCompleteness: user.calculateProfileCompleteness()
            }
        });
    } catch (error) {
        console.error('Update detailed profile error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Update skills
exports.updateSkills = async (req, res) => {
    try {
        const { skills } = req.body;

        if (!Array.isArray(skills)) {
            return res.status(400).json({
                success: false,
                message: 'Skills must be an array'
            });
        }

        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        user.skills = skills;
        await user.save();

        res.json({
            success: true,
            message: 'Skills updated successfully',
            data: {
                skills: user.skills,
                profileCompleteness: user.calculateProfileCompleteness()
            }
        });
    } catch (error) {
        console.error('Update skills error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Update interests
exports.updateInterests = async (req, res) => {
    try {
        const { interests } = req.body;

        if (!Array.isArray(interests)) {
            return res.status(400).json({
                success: false,
                message: 'Interests must be an array'
            });
        }

        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        user.interests = interests;
        await user.save();

        res.json({
            success: true,
            message: 'Interests updated successfully',
            data: {
                interests: user.interests,
                profileCompleteness: user.calculateProfileCompleteness()
            }
        });
    } catch (error) {
        console.error('Update interests error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Add portfolio project
exports.addPortfolioProject = async (req, res) => {
    try {
        const {
            title,
            description,
            technologies,
            imageUrl,
            projectUrl,
            githubUrl,
            sdgs,
            completedDate,
            achievements
        } = req.body;

        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        const project = {
            title,
            description,
            technologies: technologies || [],
            imageUrl,
            projectUrl,
            githubUrl,
            sdgs: sdgs || [],
            completedDate: completedDate ? new Date(completedDate) : new Date(),
            achievements: achievements || []
        };

        user.portfolio.push(project);
        await user.save();

        res.json({
            success: true,
            message: 'Portfolio project added successfully',
            data: {
                project: user.portfolio[user.portfolio.length - 1],
                profileCompleteness: user.calculateProfileCompleteness()
            }
        });
    } catch (error) {
        console.error('Add portfolio project error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Update portfolio project
exports.updatePortfolioProject = async (req, res) => {
    try {
        const { projectId } = req.params;
        const updateData = req.body;

        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        const projectIndex = user.portfolio.findIndex(p => p._id.toString() === projectId);
        if (projectIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'Project not found'
            });
        }

        // Update project fields
        Object.keys(updateData).forEach(key => {
            if (updateData[key] !== undefined) {
                user.portfolio[projectIndex][key] = updateData[key];
            }
        });

        await user.save();

        res.json({
            success: true,
            message: 'Portfolio project updated successfully',
            data: {
                project: user.portfolio[projectIndex],
                profileCompleteness: user.calculateProfileCompleteness()
            }
        });
    } catch (error) {
        console.error('Update portfolio project error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Delete portfolio project
exports.deletePortfolioProject = async (req, res) => {
    try {
        const { projectId } = req.params;

        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        user.portfolio = user.portfolio.filter(p => p._id.toString() !== projectId);
        await user.save();

        res.json({
            success: true,
            message: 'Portfolio project deleted successfully',
            data: {
                profileCompleteness: user.calculateProfileCompleteness()
            }
        });
    } catch (error) {
        console.error('Delete portfolio project error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Submit skills assessment
exports.submitSkillsAssessment = async (req, res) => {
    try {
        const { scores, strengths, improvementAreas, recommendedRoles } = req.body;

        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        user.skillsAssessment = {
            completed: true,
            completedAt: new Date(),
            scores: scores || {},
            strengths: strengths || [],
            improvementAreas: improvementAreas || [],
            recommendedRoles: recommendedRoles || []
        };

        await user.save();

        res.json({
            success: true,
            message: 'Skills assessment completed successfully',
            data: {
                skillsAssessment: user.skillsAssessment,
                profileCompleteness: user.calculateProfileCompleteness()
            }
        });
    } catch (error) {
        console.error('Submit skills assessment error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Update team preferences
exports.updateTeamPreferences = async (req, res) => {
    try {
        const {
            preferredTeamSize,
            preferredRoles,
            workingHours,
            communicationStyle,
            conflictResolution
        } = req.body;

        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        if (!user.teamPreferences) {
            user.teamPreferences = {};
        }

        if (preferredTeamSize) user.teamPreferences.preferredTeamSize = preferredTeamSize;
        if (preferredRoles) user.teamPreferences.preferredRoles = preferredRoles;
        if (workingHours) user.teamPreferences.workingHours = workingHours;
        if (communicationStyle) user.teamPreferences.communicationStyle = communicationStyle;
        if (conflictResolution) user.teamPreferences.conflictResolution = conflictResolution;

        await user.save();

        res.json({
            success: true,
            message: 'Team preferences updated successfully',
            data: {
                teamPreferences: user.teamPreferences,
                profileCompleteness: user.calculateProfileCompleteness()
            }
        });
    } catch (error) {
        console.error('Update team preferences error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Update onboarding progress
exports.updateOnboarding = async (req, res) => {
    try {
        const { currentStep, stepsCompleted, completed } = req.body;

        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        if (!user.onboarding) {
            user.onboarding = {
                completed: false,
                currentStep: 0,
                stepsCompleted: []
            };
        }

        if (currentStep !== undefined) user.onboarding.currentStep = currentStep;
        if (stepsCompleted) user.onboarding.stepsCompleted = stepsCompleted;
        if (completed !== undefined) user.onboarding.completed = completed;

        await user.save();

        res.json({
            success: true,
            message: 'Onboarding progress updated successfully',
            data: {
                onboarding: user.onboarding,
                profileCompleteness: user.calculateProfileCompleteness()
            }
        });
    } catch (error) {
        console.error('Update onboarding error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Get potential matches
exports.getPotentialMatches = async (req, res) => {
    try {
        const { limit = 10, minScore = 60 } = req.query;

        const currentUser = await User.findById(req.user.id);
        if (!currentUser) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Find other users with similar profile completeness and interests
        const otherUsers = await User.find({
            _id: { $ne: req.user.id },
            role: 'student',
            isActive: true,
            profileCompleteness: { $gte: 50 }
        }).select('-password -passwordResetToken -emailVerificationToken');

        // Calculate matching scores
        const matches = otherUsers.map(user => ({
            user,
            matchingScore: currentUser.getMatchingScore(user)
        }))
        .filter(match => match.matchingScore >= minScore)
        .sort((a, b) => b.matchingScore - a.matchingScore)
        .slice(0, parseInt(limit));

        res.json({
            success: true,
            data: {
                matches,
                totalMatches: matches.length
            }
        });
    } catch (error) {
        console.error('Get potential matches error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Upload files middleware
exports.uploadFiles = upload.fields([
    { name: 'profilePicture', maxCount: 1 },
    { name: 'resume', maxCount: 1 }
]);

// Handle file uploads
exports.handleFileUploads = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        const uploadedFiles = {};

        if (req.files.profilePicture) {
            user.profilePicture = `/uploads/profiles/${req.files.profilePicture[0].filename}`;
            uploadedFiles.profilePicture = user.profilePicture;
        }

        if (req.files.resume) {
            if (!user.profile) user.profile = {};
            user.profile.resume = `/uploads/profiles/${req.files.resume[0].filename}`;
            uploadedFiles.resume = user.profile.resume;
        }

        await user.save();

        res.json({
            success: true,
            message: 'Files uploaded successfully',
            data: {
                files: uploadedFiles,
                profileCompleteness: user.calculateProfileCompleteness()
            }
        });
    } catch (error) {
        console.error('File upload error:', error);
        res.status(500).json({
            success: false,
            message: 'File upload failed'
        });
    }
};

module.exports = exports;
