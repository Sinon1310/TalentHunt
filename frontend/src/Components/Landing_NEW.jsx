import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { 
  Users, Search, UserPlus, BarChart2, Menu, X, ChevronLeft, ChevronRight, 
  Sparkles, Target, Award, TrendingUp, Globe, Brain, Shield, Zap,
  ArrowRight, Play, CheckCircle, Star, Lightbulb, Rocket, Database,
  GitBranch, MonitorSpeaker, Calendar, MessageSquare, Settings
} from 'lucide-react';

const Landing = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate()

  // Function to handle navigation to sign up
  const handleCreateProfile = () => {
    navigate('/auth', { state: { activeTab: 'signup' } });
  };

   // Function to handle navigation to competitions
   const handleExploreCompetitions = () => {
    navigate('/competitions');
   };

  // Sample competitions data
  const competitions = [
    {
      id: 1,
      title: "Annual Hackathon 2025",
      description: "Build innovative solutions for real-world problems in 48 hours.",
      image: "https://midpenpost.org/wp-content/uploads/2023/04/IMG_3168.jpg",
      date: "Oct 15-17, 2025",
      sdgs: [3, 9, 11]
    },
    {
      id: 2,
      title: "Design Challenge",
      description: "Create user-centered designs for next-gen applications.",
      image: "https://interiordesign.net/wp-content/uploads/2023/02/Interior-Design-ThinkLab-Design-Hackathon-TL23_Editorial_Image_Cover.jpg",
      date: "Nov 5-7, 2025",
      sdgs: [8, 9, 17]
    },
    {
      id: 3,
      title: "AI Innovation Contest",
      description: "Develop AI solutions that can transform industries.",
      image: "https://framerusercontent.com/assets/8zE1cw2uW0PtSANxYynp9aKnnP8.png",
      date: "Dec 10-12, 2025",
      sdgs: [4, 8, 9]
    }
  ];

  // Sample testimonials data
  const testimonials = [
    {
      id: 1,
      name: "Joe Rogan",
      role: "Computer Science Student",
      quote: "This platform helped me find teammates with complementary skills. We won our first hackathon together!",
      avatar: "/images/demopic.jpg?"
    },
    {
      id: 2,
      name: "Aditya Nambar",
      role: "UI/UX Designer",
      quote: "The mentor matching was perfect. Our mentor provided invaluable guidance throughout the competition.",
      avatar: "/images/nambar.jpg?"
    },
    {
      id: 3,
      name: "Dr. Joseph",
      role: "Faculty Mentor",
      quote: "As a mentor, I can easily track my teams' progress and provide timely feedback. It's a game-changer.",
      avatar: "/images/jos.jpg?"
    }
  ];

  // User roles data
  const userRoles = [
    {
      title: "Students",
      description: "Join teams, participate in competitions, and learn from expert mentors",
      icon: Users,
      features: ["Smart team matching", "Skill assessment", "Progress tracking", "Peer networking"],
      color: "from-blue-500 to-purple-500"
    },
    {
      title: "Faculty Mentors", 
      description: "Guide teams, share expertise, and shape the next generation",
      icon: Lightbulb,
      features: ["Team mentoring", "Progress monitoring", "Expert feedback", "Industry insights"],
      color: "from-green-500 to-teal-500"
    },
    {
      title: "Admins",
      description: "Manage competitions, oversee teams, and ensure platform quality",
      icon: Settings,
      features: ["Competition management", "User oversight", "Analytics dashboard", "Quality control"],
      color: "from-orange-500 to-red-500"
    },
    {
      title: "Management",
      description: "Strategic oversight, analytics, and institutional partnerships",
      icon: BarChart2,
      features: ["Strategic analytics", "Partnership management", "Impact assessment", "Resource allocation"],
      color: "from-purple-500 to-pink-500"
    }
  ];

  // Auto-rotate carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === competitions.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [competitions.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === competitions.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? competitions.length - 1 : prev - 1));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <button 
              onClick={() => document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' })}
              className="group flex items-center space-x-3 hover:opacity-80 transition-opacity cursor-pointer"
            >
              <div className="relative">
                <img 
                  className="w-12 h-12 object-contain" 
                  src="http://talenthuntindia.in/assets/images/talenthunt.png" 
                  alt="TalentHunt Logo" 
                />
                <div className="absolute inset-0 bg-blue-600/10 rounded-full blur-sm group-hover:blur-md transition-all duration-300"></div>
              </div>
              <div className="flex flex-col">
                <div className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  TalentHunt
                </div>
                <div className="text-xs text-gray-500">Find Your Perfect Team</div>
              </div>
            </button>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a 
              href="#hero" 
              onClick={(e) => { e.preventDefault(); document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 cursor-pointer"
            >
              Home
            </a>
            <a 
              href="#statistics" 
              onClick={(e) => { e.preventDefault(); document.getElementById('statistics')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 cursor-pointer"
            >
              Impact
            </a>
            <a 
              href="#features" 
              onClick={(e) => { e.preventDefault(); document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 cursor-pointer"
            >
              Features
            </a>
            <a 
              href="#competitions" 
              onClick={(e) => { e.preventDefault(); document.getElementById('competitions')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 cursor-pointer"
            >
              Competitions
            </a>
          </nav>
          
          <div className="hidden md:flex items-center space-x-4">
            <Link 
              to="/auth" 
              className="group px-6 py-2.5 text-blue-600 font-medium hover:text-blue-700 transition-colors duration-200 relative"
            >
              Login
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link 
              to="/auth" 
              className="group px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 hover:-translate-y-0.5"
            >
              Sign Up
            </Link>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} className="text-gray-700" /> : <Menu size={24} className="text-gray-700" />}
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-md py-4 px-4 shadow-lg">
            <nav className="flex flex-col space-y-4">
              <a 
                href="#hero" 
                onClick={(e) => { e.preventDefault(); document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' }); setIsMenuOpen(false); }}
                className="text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors duration-200 cursor-pointer"
              >
                Home
              </a>
              <a 
                href="#statistics" 
                onClick={(e) => { e.preventDefault(); document.getElementById('statistics')?.scrollIntoView({ behavior: 'smooth' }); setIsMenuOpen(false); }}
                className="text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors duration-200 cursor-pointer"
              >
                Impact
              </a>
              <a 
                href="#features" 
                onClick={(e) => { e.preventDefault(); document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' }); setIsMenuOpen(false); }}
                className="text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors duration-200 cursor-pointer"
              >
                Features
              </a>
              <a 
                href="#competitions" 
                onClick={(e) => { e.preventDefault(); document.getElementById('competitions')?.scrollIntoView({ behavior: 'smooth' }); setIsMenuOpen(false); }}
                className="text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors duration-200 cursor-pointer"
              >
                Competitions
              </a>
              <div className="pt-4 flex flex-col space-y-3">
                <Link 
                  to="/auth" 
                  className="px-6 py-2.5 text-blue-600 border border-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors duration-200"
                >
                  Login
                </Link>
                <Link 
                  to="/auth" 
                  className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300"
                >
                  Sign Up
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Enhanced Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-radial from-purple-600/20 via-slate-900/40 to-slate-900"></div>
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}></div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-purple-400 rounded-full animate-pulse opacity-60"></div>
          <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-blue-400 rounded-full animate-pulse opacity-40"></div>
          <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-indigo-400 rounded-full animate-pulse opacity-50"></div>
          <div className="absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-violet-400 rounded-full animate-pulse opacity-70"></div>
        </div>

        <div className="container mx-auto px-6 lg:px-8 py-20 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div className="text-left space-y-8">
                <div className="space-y-4">
                  <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-white text-sm font-medium">
                    <Sparkles className="w-4 h-4 mr-2 text-yellow-400" />
                    AI-Powered Team Formation Platform
                  </div>
                  <h1 className="text-5xl lg:text-7xl font-black leading-tight text-white">
                    Build the
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
                      Perfect Team
                    </span>
                    <span className="block text-4xl lg:text-6xl font-light text-gray-300">
                      Win Every Challenge
                    </span>
                  </h1>
                </div>
                
                <p className="text-xl lg:text-2xl text-gray-300 leading-relaxed max-w-2xl">
                  Revolutionary MERN stack platform that uses advanced algorithms to match students with 
                  <span className="text-purple-400 font-semibold"> complementary skills</span>, assigns 
                  <span className="text-blue-400 font-semibold"> expert mentors</span>, and maps projects to 
                  <span className="text-green-400 font-semibold"> UN SDGs</span> for meaningful impact.
                </p>

                <div className="flex flex-col sm:flex-row gap-6 pt-4">
                  <button
                    onClick={handleCreateProfile}
                    className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold text-lg rounded-2xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 hover:-translate-y-1 hover:scale-105"
                  >
                    <span className="flex items-center justify-center">
                      Start Your Journey
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-20 transition-opacity blur-xl"></div>
                  </button>
                  
                  <button
                    onClick={handleExploreCompetitions}
                    className="group px-8 py-4 border-2 border-white/30 text-white hover:bg-white/10 font-semibold text-lg rounded-2xl transition-all duration-300 hover:-translate-y-1 backdrop-blur-sm"
                  >
                    <span className="flex items-center justify-center">
                      <Play className="mr-2 w-5 h-5" />
                      Explore Platform
                    </span>
                  </button>
                </div>

                {/* Key Stats */}
                <div className="grid grid-cols-3 gap-6 pt-8">
                  <div className="text-center">
                    <div className="text-2xl lg:text-3xl font-bold text-white">500+</div>
                    <div className="text-sm text-gray-400">Active Students</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl lg:text-3xl font-bold text-white">50+</div>
                    <div className="text-sm text-gray-400">Expert Mentors</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl lg:text-3xl font-bold text-white">25+</div>
                    <div className="text-sm text-gray-400">Competitions</div>
                  </div>
                </div>
              </div>

              {/* Right Visual */}
              <div className="relative lg:block hidden">
                <div className="relative">
                  {/* Main Card */}
                  <div className="relative bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl">
                    <div className="space-y-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center">
                          <Brain className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-white font-semibold">AI Team Matching</h3>
                          <p className="text-gray-400 text-sm">Smart algorithm analysis</p>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300 text-sm">Skill Compatibility</span>
                          <span className="text-green-400 text-sm font-semibold">96%</span>
                        </div>
                        <div className="w-full bg-white/10 rounded-full h-2">
                          <div className="bg-gradient-to-r from-green-400 to-blue-400 h-2 rounded-full w-[96%]"></div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300 text-sm">Team Synergy</span>
                          <span className="text-purple-400 text-sm font-semibold">94%</span>
                        </div>
                        <div className="w-full bg-white/10 rounded-full h-2">
                          <div className="bg-gradient-to-r from-purple-400 to-pink-400 h-2 rounded-full w-[94%]"></div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 pt-4">
                        <div className="bg-white/5 rounded-xl p-4 text-center">
                          <Target className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                          <div className="text-white text-sm font-semibold">SDG Mapped</div>
                        </div>
                        <div className="bg-white/5 rounded-xl p-4 text-center">
                          <Award className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                          <div className="text-white text-sm font-semibold">Mentored</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Floating Cards */}
                  <div className="absolute -top-6 -right-6 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl p-4 shadow-xl">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-white" />
                      <span className="text-white text-sm font-semibold">Team Formed!</span>
                    </div>
                  </div>

                  <div className="absolute -bottom-4 -left-4 bg-gradient-to-br from-green-500 to-teal-500 rounded-2xl p-4 shadow-xl">
                    <div className="flex items-center space-x-2">
                      <Globe className="w-5 h-5 text-white" />
                      <span className="text-white text-sm font-semibold">SDG Impact</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Enhanced Statistics Section */}
      <section id="statistics" className="py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-72 h-72 bg-blue-100/30 rounded-full -translate-x-36 -translate-y-36"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-100/30 rounded-full translate-x-48 translate-y-48"></div>
        </div>

        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600/10 to-purple-600/10 backdrop-blur-sm rounded-full border border-blue-200/50 text-blue-600 text-sm font-medium mb-6">
              <TrendingUp className="w-4 h-4 mr-2" />
              Platform Analytics & Impact
            </div>
            <h2 className="text-5xl lg:text-6xl font-black text-gray-900 mb-6">
              Driving Impact Through
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
                Smart Collaboration
              </span>
            </h2>
            <p className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Our AI-powered platform creates meaningful connections that drive innovation and contribute to global sustainability goals
            </p>
          </div>

          {/* Animated Statistics Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            <div className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 border border-gray-100 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-3xl mb-6 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <div className="text-4xl lg:text-5xl font-black text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">2,500+</div>
                <div className="text-gray-600 font-semibold text-lg">Students Connected</div>
                <div className="text-green-500 font-medium text-sm mt-2">↗ +340 this month</div>
              </div>
            </div>

            <div className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 border border-gray-100 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-teal-500 rounded-3xl mb-6 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                  <Award className="w-10 h-10 text-white" />
                </div>
                <div className="text-4xl lg:text-5xl font-black text-gray-900 mb-3 group-hover:text-green-600 transition-colors">150+</div>
                <div className="text-gray-600 font-semibold text-lg">Teams Formed</div>
                <div className="text-green-500 font-medium text-sm mt-2">↗ +24 this month</div>
              </div>
            </div>

            <div className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 border border-gray-100 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-3xl mb-6 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                  <Target className="w-10 h-10 text-white" />
                </div>
                <div className="text-4xl lg:text-5xl font-black text-gray-900 mb-3 group-hover:text-orange-600 transition-colors">17</div>
                <div className="text-gray-600 font-semibold text-lg">SDGs Addressed</div>
                <div className="text-blue-500 font-medium text-sm mt-2">100% Coverage</div>
              </div>
            </div>

            <div className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 border border-gray-100 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl mb-6 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                  <TrendingUp className="w-10 h-10 text-white" />
                </div>
                <div className="text-4xl lg:text-5xl font-black text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">89%</div>
                <div className="text-gray-600 font-semibold text-lg">Success Rate</div>
                <div className="text-green-500 font-medium text-sm mt-2">↗ +5% improved</div>
              </div>
            </div>
          </div>

          {/* Enhanced SDG Impact Visual */}
          <div className="bg-gradient-to-br from-white to-blue-50/50 rounded-4xl p-10 lg:p-16 shadow-2xl border border-gray-100 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-11.046 8.954-20 20-20v20H20z'/%3E%3C/g%3E%3C/svg%3E")`
              }}></div>
            </div>

            <div className="relative z-10">
              <div className="text-center mb-12">
                <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-semibold text-lg mb-6 shadow-xl">
                  <Globe className="w-6 h-6 mr-3" />
                  UN Sustainable Development Goals
                </div>
                <h3 className="text-3xl lg:text-4xl font-black text-gray-900 mb-4">
                  Every Project Creates
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">
                    Meaningful Global Impact
                  </span>
                </h3>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Our intelligent mapping system automatically aligns your projects with relevant SDGs for maximum societal benefit
                </p>
              </div>
              
              {/* Interactive SDG Grid */}
              <div className="grid grid-cols-6 md:grid-cols-9 lg:grid-cols-12 xl:grid-cols-17 gap-3 lg:gap-4">
                {Array.from({length: 17}, (_, i) => {
                  const sdgColors = [
                    'from-red-500 to-red-600',
                    'from-yellow-500 to-orange-500', 
                    'from-green-500 to-green-600',
                    'from-red-600 to-red-700',
                    'from-orange-500 to-red-500',
                    'from-blue-400 to-blue-500',
                    'from-yellow-400 to-yellow-500',
                    'from-red-500 to-pink-500',
                    'from-orange-500 to-orange-600',
                    'from-pink-500 to-red-500',
                    'from-orange-400 to-yellow-500',
                    'from-yellow-600 to-orange-600',
                    'from-green-600 to-green-700',
                    'from-blue-500 to-blue-600',
                    'from-green-500 to-teal-500',
                    'from-blue-600 to-indigo-600',
                    'from-indigo-600 to-purple-600'
                  ];
                  
                  return (
                    <div 
                      key={i} 
                      className={`group aspect-square bg-gradient-to-br ${sdgColors[i]} rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-3 lg:p-4 flex items-center justify-center cursor-pointer hover:-translate-y-2 hover:scale-105 relative overflow-hidden`}
                      title={`SDG ${i + 1}`}
                    >
                      <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative z-10 text-white font-black text-lg lg:text-xl group-hover:scale-110 transition-transform">
                        {i + 1}
                      </div>
                      
                      {/* Tooltip */}
                      <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-20 pointer-events-none">
                        SDG {i + 1}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-12">
                <button 
                  onClick={() => navigate('/competitions')}
                  className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:scale-105"
                >
                  <span className="flex items-center">
                    Explore SDG Projects
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
                
                <div className="flex items-center space-x-4 text-gray-600">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="font-medium">Auto-mapped</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Target className="w-5 h-5 text-blue-500" />
                    <span className="font-medium">Impact Tracked</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* User Roles Section */}
      <section id="user-roles" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Built for Everyone
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Whether you're a student, mentor, admin, or part of management - our platform adapts to your unique needs
            </p>
          </div>

          <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-8">
            {userRoles.map((role, index) => {
              const IconComponent = role.icon;
              return (
                <div key={index} className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
                  <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${role.color} rounded-2xl mb-6 transform group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{role.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{role.description}</p>
                  
                  <ul className="space-y-3">
                    {role.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-gray-700">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Cutting-Edge Features
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Powered by advanced algorithms and designed for maximum impact
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">AI-Powered Matching</h3>
                  <p className="text-gray-600 leading-relaxed">Advanced machine learning algorithms analyze skills, experience, and personality traits to create optimal team combinations with 96% compatibility success rate.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-green-500 to-teal-500 rounded-2xl flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">SDG Mapping</h3>
                  <p className="text-gray-600 leading-relaxed">Every project is automatically mapped to relevant UN Sustainable Development Goals, ensuring your work contributes to global impact and meaningful change.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center">
                  <Rocket className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Progress Tracking</h3>
                  <p className="text-gray-600 leading-relaxed">Real-time analytics and progress monitoring with detailed insights, milestone tracking, and performance metrics to keep teams on the path to success.</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8">
                <div className="space-y-6">
                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-bold text-gray-900">Team Analytics</h4>
                      <div className="text-green-500 font-semibold">+24%</div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Productivity</span>
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div className="bg-gradient-to-r from-green-400 to-blue-400 h-2 rounded-full w-[78%]"></div>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Collaboration</span>
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div className="bg-gradient-to-r from-purple-400 to-pink-400 h-2 rounded-full w-[92%]"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white rounded-xl p-4 text-center shadow-md">
                      <Globe className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-gray-900">12</div>
                      <div className="text-sm text-gray-600">SDGs Mapped</div>
                    </div>
                    <div className="bg-white rounded-xl p-4 text-center shadow-md">
                      <Award className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-gray-900">98%</div>
                      <div className="text-sm text-gray-600">Completion Rate</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Competitions Showcase */}
      <section id="competitions" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Upcoming Competitions
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join exciting challenges that make a real-world impact and advance your skills
            </p>
          </div>
          
          <div className="relative max-w-5xl mx-auto mb-12">
            <div className="overflow-hidden rounded-3xl shadow-2xl">
              <div 
                className="flex transition-transform duration-500 ease-in-out" 
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {competitions.map((competition) => (
                  <div key={competition.id} className="flex-shrink-0 w-full">
                    <div className="relative h-96">
                      <img 
                        src={competition.image} 
                        alt={competition.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20">
                        <div className="absolute bottom-0 left-0 right-0 p-8">
                          <div className="flex items-center space-x-2 mb-4">
                            {competition.sdgs.map((sdg) => (
                              <div key={sdg} className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center text-white text-xs font-bold">
                                {sdg}
                              </div>
                            ))}
                          </div>
                          <h3 className="text-3xl font-bold text-white mb-2">{competition.title}</h3>
                          <p className="text-gray-200 mb-4">{competition.description}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-300 flex items-center">
                              <Calendar className="w-4 h-4 mr-2" />
                              {competition.date}
                            </span>
                            <button 
                              onClick={() => navigate(`/competitions/${competition.id}`)}
                              className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 font-semibold"
                            >
                              View Details
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <button 
              className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/90 p-3 rounded-full shadow-lg hover:bg-white transition-all duration-300 hover:-translate-x-1"
              onClick={prevSlide}
            >
              <ChevronLeft size={24} className="text-blue-600" />
            </button>
            
            <button 
              className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/90 p-3 rounded-full shadow-lg hover:bg-white transition-all duration-300 hover:translate-x-1"
              onClick={nextSlide}
            >
              <ChevronRight size={24} className="text-blue-600" />
            </button>
            
            <div className="flex justify-center mt-8 space-x-3">
              {competitions.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentSlide === index ? 'bg-blue-600 w-6' : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>
          </div>
          
          <div className="text-center">
            <button 
              onClick={handleExploreCompetitions}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-semibold text-lg hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              View All Competitions
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                What Our Community Says
              </span>
            </h2>
            <p className="text-xl text-gray-600">Real experiences from our amazing users</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white border border-gray-200 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="flex items-center mb-6">
                  <img 
                    src={testimonial.avatar || "/placeholder.svg"} 
                    alt={testimonial.name} 
                    className="w-16 h-16 rounded-full mr-4 object-cover border-4 border-blue-100"
                  />
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">{testimonial.name}</h3>
                    <p className="text-blue-600 font-medium">{testimonial.role}</p>
                  </div>
                </div>
                
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <p className="text-gray-700 italic leading-relaxed">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Call to Action */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"></div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-6 lg:px-8 relative">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl lg:text-6xl font-bold text-white">
                Ready to Transform
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                  Your Future?
                </span>
              </h2>
              <p className="text-xl lg:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                Join thousands of students, mentors, and innovators building the future through collaborative excellence
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
              <Link 
                to="/auth" 
                className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold text-lg rounded-2xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 hover:-translate-y-1 hover:scale-105"
              >
                <span className="flex items-center justify-center">
                  Get Started Today
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              
              <button 
                onClick={handleExploreCompetitions}
                className="group px-8 py-4 border-2 border-white/30 text-white hover:bg-white/10 font-semibold text-lg rounded-2xl transition-all duration-300 hover:-translate-y-1 backdrop-blur-sm"
              >
                <span className="flex items-center justify-center">
                  <Play className="mr-2 w-5 h-5" />
                  Explore Competitions
                </span>
              </button>
            </div>

            <div className="pt-12 text-gray-400 text-sm">
              <p>Join our community of innovators • No credit card required • Start for free</p>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <img 
                  className="w-10 h-10 object-contain" 
                  src="http://talenthuntindia.in/assets/images/talenthunt.png" 
                  alt="TalentHunt Logo" 
                />
                <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  TalentHunt
                </div>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Empowering the next generation of innovators through intelligent team formation and meaningful collaboration.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Globe className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <MessageSquare className="w-6 h-6" />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-6 text-lg">Platform</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Home</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">How It Works</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Competitions</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-6 text-lg">Resources</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">API Documentation</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-6 text-lg">Access</h4>
              <ul className="space-y-3">
                <li><Link to="/admin" className="text-gray-400 hover:text-white transition-colors">Admin Portal</Link></li>
                <li><Link to="/mentor" className="text-gray-400 hover:text-white transition-colors">Mentor Dashboard</Link></li>
                <li><Link to="/student-progress" className="text-gray-400 hover:text-white transition-colors">Student Progress</Link></li>
                <li><a href="mailto:support@talenthunt.com" className="text-gray-400 hover:text-white transition-colors">Contact Support</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm">
                &copy; {new Date().getFullYear()} TalentHunt. All rights reserved. Built with passion for innovation.
              </p>
              <div className="flex items-center space-x-6 mt-4 md:mt-0">
                <span className="text-gray-400 text-sm">Made with</span>
                <div className="flex items-center space-x-2">
                  <Database className="w-4 h-4 text-green-400" />
                  <span className="text-sm text-gray-400">MongoDB</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Zap className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm text-gray-400">React</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-blue-400" />
                  <span className="text-sm text-gray-400">Node.js</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
