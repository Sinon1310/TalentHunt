import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { 
  Users, Search, UserPlus, BarChart2, Menu, X, ChevronLeft, ChevronRight, 
  Sparkles, Target, Award, TrendingUp, Globe, Brain, Shield, Zap,
  ArrowRight, Play, CheckCircle, Star, Lightbulb, Rocket, Database,
  Clock, Code, Trophy, MessageSquare, Settings, Monitor, BookOpen
} from 'lucide-react';

const Landing = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate()

  // Navigation handlers
  const handleGetStarted = () => {
    navigate('/auth', { state: { activeTab: 'signup' } });
  };

  const handleExploreCompetitions = () => {
    navigate('/competitions');
  };

  // Featured competitions data
  const competitions = [
    {
      id: 1,
      title: "Global Innovation Challenge 2025",
      description: "48-hour hackathon solving real-world sustainability problems",
      image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      date: "Jan 15-17, 2025",
      participants: "500+ teams",
      prize: "$50,000",
      sdgs: [3, 7, 9, 11]
    },
    {
      id: 2,
      title: "AI for Social Good",
      description: "Develop AI solutions addressing societal challenges",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      date: "Feb 20-22, 2025",
      participants: "300+ teams", 
      prize: "$30,000",
      sdgs: [4, 8, 10]
    },
    {
      id: 3,
      title: "Green Tech Challenge",
      description: "Climate action through innovative technology solutions",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      date: "Mar 10-12, 2025",
      participants: "400+ teams",
      prize: "$40,000", 
      sdgs: [7, 13, 15]
    }
  ];

  // Success stories
  const testimonials = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "CS Student, MIT",
      university: "Massachusetts Institute of Technology",
      quote: "TalentHunt's AI matched me with teammates I never would have found otherwise. Our diverse skills led to winning the Global Innovation Challenge!",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b9c5d53e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80",
      achievement: "🏆 Winner - Global Innovation Challenge",
      teamSize: "4 members"
    },
    {
      id: 2,
      name: "Dr. Michael Rodriguez",
      role: "Faculty Mentor",
      university: "Stanford University",
      quote: "The mentor matching system is incredibly sophisticated. I can effectively guide multiple teams and track their progress in real-time.",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80",
      achievement: "🎓 Mentored 15 winning teams",
      teamSize: "50+ students mentored"
    },
    {
      id: 3,
      name: "Alex Kumar",
      role: "Full-Stack Developer",
      university: "UC Berkeley",
      quote: "From a shy individual contributor to leading a winning team - TalentHunt helped me discover my leadership potential through smart team matching.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80",
      achievement: "🚀 3x Competition Winner",
      teamSize: "Led 12-person team"
    }
  ];

  // Platform features
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Matching",
      description: "Advanced algorithms analyze skills, experience, and personality to create optimal team combinations",
      stats: "96% compatibility rate"
    },
    {
      icon: Target,
      title: "SDG Impact Mapping",
      description: "Automatically align projects with UN Sustainable Development Goals for maximum societal impact",
      stats: "All 17 SDGs covered"
    },
    {
      icon: Trophy,
      title: "Competition Management",
      description: "Streamlined platform for organizing, participating in, and tracking technical competitions",
      stats: "500+ competitions hosted"
    },
    {
      icon: BarChart2,
      title: "Progress Analytics",
      description: "Real-time insights and performance metrics to optimize team collaboration and outcomes",
      stats: "89% success rate improvement"
    }
  ];

  // How it works process
  const process = [
    {
      step: "01",
      title: "Create Your Profile",
      description: "Add your skills, experience level, interests, and preferred working style. Our system analyzes hundreds of data points.",
      icon: UserPlus,
      color: "from-blue-500 to-purple-500"
    },
    {
      step: "02", 
      title: "Get AI-Matched",
      description: "Our advanced algorithm finds teammates with complementary skills and compatible working styles for optimal team dynamics.",
      icon: Brain,
      color: "from-purple-500 to-pink-500"
    },
    {
      step: "03",
      title: "Compete & Win",
      description: "Join competitions, get expert mentorship, track progress, and make meaningful impact aligned with global SDGs.",
      icon: Trophy,
      color: "from-pink-500 to-red-500"
    }
  ];

  // Auto-rotate carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === competitions.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(interval);
  }, [competitions.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === competitions.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? competitions.length - 1 : prev - 1));
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Modern Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-lg border-b border-gray-100">
        <div className="container mx-auto px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <button 
                onClick={() => document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' })}
                className="flex items-center space-x-3 group"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">T</span>
                </div>
                <div>
                  <div className="text-xl font-bold text-gray-900">TalentHunt</div>
                  <div className="text-xs text-gray-500">AI Team Formation</div>
                </div>
              </button>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#how-it-works" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">How It Works</a>
              <a href="#features" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Features</a>
              <a href="#competitions" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Competitions</a>
              <Link to="/auth" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Login</Link>
              <button
                onClick={handleGetStarted}
                className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
              >
                Get Started
              </button>
            </nav>
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
          
          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 py-4 border-t border-gray-100">
              <nav className="flex flex-col space-y-4">
                <a href="#how-it-works" className="text-gray-600 hover:text-blue-600 font-medium">How It Works</a>
                <a href="#features" className="text-gray-600 hover:text-blue-600 font-medium">Features</a>
                <a href="#competitions" className="text-gray-600 hover:text-blue-600 font-medium">Competitions</a>
                <Link to="/auth" className="text-gray-600 hover:text-blue-600 font-medium">Login</Link>
                <button
                  onClick={handleGetStarted}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-left"
                >
                  Get Started
                </button>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="relative pt-20 pb-16 lg:pt-28 lg:pb-20 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-500/20 rounded-full blur-3xl -translate-x-48 -translate-y-48 animate-pulse"></div>
          <div className="absolute top-1/2 right-0 w-80 h-80 bg-gradient-to-br from-purple-500/15 to-pink-500/15 rounded-full blur-2xl translate-x-40 animate-pulse animation-delay-300"></div>
          <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-gradient-to-br from-indigo-400/20 to-cyan-500/20 rounded-full blur-2xl translate-y-32 animate-pulse animation-delay-700"></div>
          
          {/* Floating Shapes */}
          <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full animate-bounce"></div>
          <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-gradient-to-br from-green-400 to-teal-500 rounded-full animate-bounce animation-delay-500"></div>
          <div className="absolute bottom-1/4 right-1/4 w-2 h-2 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full animate-bounce animation-delay-1000"></div>
        </div>

        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-sm border border-purple-200/50 rounded-full text-purple-700 font-semibold text-sm shadow-lg">
                <Sparkles className="w-4 h-4 mr-2 text-yellow-500" />
                AI-Powered Team Formation for Technical Competitions
              </div>
              
              {/* Main Heading */}
              <h1 className="text-5xl lg:text-7xl font-black text-gray-900 leading-tight">
                Build Winning Teams.
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 animate-pulse">
                  Automatically.
                </span>
              </h1>
              
              {/* Subheading */}
              <p className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Revolutionary MERN platform that uses advanced AI to match students with complementary skills, 
                assigns expert mentors, and maps projects to UN SDGs for meaningful global impact.
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center pt-4">
                <button
                  onClick={handleGetStarted}
                  className="group px-10 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-2xl font-semibold text-lg shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 hover:-translate-y-1 hover:scale-105"
                >
                  <span className="flex items-center justify-center">
                    Start Building Teams
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
                
                <button
                  onClick={handleExploreCompetitions}
                  className="group px-10 py-4 bg-white/90 backdrop-blur-sm border-2 border-purple-200 text-purple-700 hover:border-purple-400 hover:text-purple-800 hover:bg-purple-50 rounded-2xl font-semibold text-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-200/50"
                >
                  <span className="flex items-center justify-center">
                    <Trophy className="mr-2 w-5 h-5 text-yellow-500" />
                    Explore Competitions
                  </span>
                </button>
              </div>
              
              {/* Feature Highlights */}
              <div className="flex flex-wrap justify-center gap-6 pt-8 text-sm">
                <div className="flex items-center space-x-2 text-gray-700 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-green-200/50">
                  <div className="w-2 h-2 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full animate-pulse"></div>
                  <span className="font-semibold">Free to Join</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-700 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-blue-200/50">
                  <div className="w-2 h-2 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full animate-pulse"></div>
                  <span className="font-semibold">AI-Powered Matching</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-700 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-purple-200/50">
                  <div className="w-2 h-2 bg-gradient-to-br from-purple-400 to-violet-500 rounded-full animate-pulse"></div>
                  <span className="font-semibold">Expert Mentorship</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-700 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-orange-200/50">
                  <div className="w-2 h-2 bg-gradient-to-br from-orange-400 to-red-500 rounded-full animate-pulse"></div>
                  <span className="font-semibold">Global Impact</span>
                </div>
              </div>
              
              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-8 pt-12">
                <div className="text-center group">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Users className="w-8 h-8 text-blue-600" />
                  </div>
                  <div className="text-3xl lg:text-4xl font-bold text-gray-900">2,500+</div>
                  <div className="text-gray-600">Students Matched</div>
                </div>
                <div className="text-center group">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    <TrendingUp className="w-8 h-8 text-green-600" />
                  </div>
                  <div className="text-3xl lg:text-4xl font-bold text-gray-900">96%</div>
                  <div className="text-gray-600">Success Rate</div>
                </div>
                <div className="text-center group">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    <BookOpen className="w-8 h-8 text-purple-600" />
                  </div>
                  <div className="text-3xl lg:text-4xl font-bold text-gray-900">50+</div>
                  <div className="text-gray-600">Universities</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-gradient-to-br from-green-200/20 to-blue-200/20 rounded-full blur-3xl animate-pulse"></div>
        </div>
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">
                How It Works
              </h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                Three simple steps to form winning teams and compete in meaningful challenges
              </p>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-12">
              {process.map((step, index) => {
                const IconComponent = step.icon;
                return (
                  <div key={index} className="relative">
                    {/* Connection Line */}
                    {index < process.length - 1 && (
                      <div className="hidden lg:block absolute top-16 left-full w-full h-px bg-gradient-to-r from-blue-300/50 via-purple-300/50 to-transparent z-0"></div>
                    )}
                    
                    {/* Floating Arrow */}
                    {index < process.length - 1 && (
                      <div className="hidden lg:block absolute top-14 left-full w-full z-0">
                        <ArrowRight className="absolute right-4 w-6 h-6 text-blue-400 animate-pulse" />
                      </div>
                    )}
                    
                    <div className="relative z-10 text-center">
                      <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br ${step.color} rounded-2xl mb-6 shadow-xl`}>
                        <IconComponent className="w-10 h-10 text-white" />
                      </div>
                      
                      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/50 hover:border-purple-200/50 transform hover:-translate-y-1">
                        <div className="text-sm font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">STEP {step.step}</div>
                        <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">{step.title}</h3>
                        <p className="text-gray-600 leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative py-20 bg-gradient-to-br from-indigo-50 via-purple-50/30 to-pink-50/30 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute top-10 right-20 w-72 h-72 bg-gradient-to-br from-purple-200/30 to-pink-200/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 left-20 w-72 h-72 bg-gradient-to-br from-blue-200/30 to-indigo-200/30 rounded-full blur-3xl animate-pulse"></div>
        </div>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-blue-300 rounded-full animate-pulse"></div>
          <div className="absolute top-3/4 left-1/4 w-1 h-1 bg-purple-300 rounded-full animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/3 w-1.5 h-1.5 bg-indigo-300 rounded-full animate-pulse"></div>
        </div>
        
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Powerful Features
              </h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                Everything you need to build successful teams and compete at the highest level
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-12">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div key={index} className="group bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/50 hover:border-purple-200/50 transform hover:-translate-y-2">
                    <div className="flex items-start space-x-6">
                      <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-3">{feature.title}</h3>
                        <p className="text-gray-600 mb-4 leading-relaxed">{feature.description}</p>
                        <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 text-purple-700 rounded-full text-sm font-semibold border border-purple-100">
                          {feature.stats}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Competitions Section */}
      <section id="competitions" className="py-20 bg-gradient-to-br from-emerald-50 via-teal-50/30 to-cyan-50/30 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-emerald-200/20 to-teal-200/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-64 h-64 bg-gradient-to-br from-cyan-200/20 to-blue-200/20 rounded-full blur-3xl animate-pulse"></div>
        </div>
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
                Featured Competitions
              </h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                Join exciting challenges that create real-world impact and advance your career
              </p>
            </div>
            
            <div className="relative">
              <div className="overflow-hidden rounded-3xl">
                <div 
                  className="flex transition-transform duration-500 ease-in-out" 
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {competitions.map((competition) => (
                    <div key={competition.id} className="flex-shrink-0 w-full">
                      <div className="relative h-[500px] bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900 overflow-hidden rounded-2xl shadow-2xl">
                        <img 
                          src={competition.image} 
                          alt={competition.title}
                          className="absolute inset-0 w-full h-full object-cover opacity-60"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-emerald-900/40 to-transparent"></div>
                        
                        <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-12">
                          <div className="max-w-4xl">
                            <div className="flex items-center space-x-4 mb-4">
                              {competition.sdgs.map((sdg) => (
                                <div key={sdg} className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-white font-bold">
                                  {sdg}
                                </div>
                              ))}
                            </div>
                            
                            <h3 className="text-4xl lg:text-5xl font-bold text-white mb-4">{competition.title}</h3>
                            <p className="text-xl text-gray-200 mb-6 max-w-2xl">{competition.description}</p>
                            
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                              <div className="bg-gradient-to-br from-white/20 to-emerald-500/20 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20">
                                <div className="text-white font-bold text-lg">{competition.date}</div>
                                <div className="text-emerald-200 text-sm">Date</div>
                              </div>
                              <div className="bg-gradient-to-br from-white/20 to-teal-500/20 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20">
                                <div className="text-white font-bold text-lg">{competition.participants}</div>
                                <div className="text-teal-200 text-sm">Participants</div>
                              </div>
                              <div className="bg-gradient-to-br from-white/20 to-cyan-500/20 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20">
                                <div className="text-white font-bold text-lg">{competition.prize}</div>
                                <div className="text-cyan-200 text-sm">Prize Pool</div>
                              </div>
                              <div className="bg-gradient-to-br from-white/20 to-blue-500/20 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20">
                                <div className="text-white font-bold text-lg">Global</div>
                                <div className="text-blue-200 text-sm">Impact</div>
                              </div>
                            </div>
                            
                            <button 
                              onClick={() => navigate(`/competitions/${competition.id}`)}
                              className="px-8 py-4 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white rounded-2xl font-semibold hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-white/20"
                            >
                              Register Now
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <button 
                className="absolute top-1/2 left-4 -translate-y-1/2 bg-gradient-to-r from-emerald-500/90 to-teal-500/90 backdrop-blur-sm p-3 rounded-full shadow-xl hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 border border-white/30"
                onClick={prevSlide}
              >
                <ChevronLeft size={24} className="text-white" />
              </button>
              
              <button 
                className="absolute top-1/2 right-4 -translate-y-1/2 bg-gradient-to-r from-emerald-500/90 to-teal-500/90 backdrop-blur-sm p-3 rounded-full shadow-xl hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 border border-white/30"
                onClick={nextSlide}
              >
                <ChevronRight size={24} className="text-white" />
              </button>
              
              <div className="flex justify-center mt-8 space-x-3">
                {competitions.map((_, index) => (
                  <button
                    key={index}
                    className={`h-3 rounded-full transition-all duration-300 ${
                      currentSlide === index ? 'bg-gradient-to-r from-emerald-600 to-teal-600 w-8' : 'bg-gray-300 w-3'
                    }`}
                    onClick={() => setCurrentSlide(index)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="relative py-20 bg-gradient-to-br from-rose-50 via-pink-50/30 to-purple-50/30 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-80 h-80 bg-gradient-to-br from-rose-200/20 to-pink-200/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-br from-purple-200/20 to-indigo-200/20 rounded-full blur-3xl animate-pulse"></div>
        </div>
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-purple-100/30 to-blue-100/30 rounded-full translate-x-36 -translate-y-36"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-br from-blue-100/20 to-indigo-100/20 rounded-full -translate-x-40 translate-y-40"></div>
        </div>
        
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
                Success Stories
              </h2>
              <p className="text-xl text-gray-700">
                Real results from our community of innovators
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/50 hover:border-pink-200/50 transform hover:-translate-y-2">
                  <div className="flex items-center mb-6">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name} 
                      className="w-16 h-16 rounded-2xl object-cover mr-4 ring-2 ring-gradient-to-br from-pink-200 to-purple-200"
                    />
                    <div>
                      <h3 className="font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent text-lg">{testimonial.name}</h3>
                      <p className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent font-medium">{testimonial.role}</p>
                      <p className="text-gray-500 text-sm">{testimonial.university}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  
                  <p className="text-gray-700 mb-6 leading-relaxed">"{testimonial.quote}"</p>
                  
                  <div className="space-y-2">
                    <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-50 to-emerald-50 text-emerald-700 rounded-full text-sm font-semibold border border-emerald-100">
                      {testimonial.achievement}
                    </div>
                    <div className="text-gray-500 text-sm">{testimonial.teamSize}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-300/20 rounded-full blur-3xl animate-pulse"></div>
        </div>
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 drop-shadow-lg">
              Ready to Build Your Winning Team?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto drop-shadow">
              Join thousands of students and mentors creating meaningful impact through intelligent collaboration
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button
                onClick={handleGetStarted}
                className="group px-10 py-4 bg-gradient-to-r from-white to-gray-50 text-purple-600 rounded-2xl font-semibold text-lg hover:from-gray-50 hover:to-white transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 border-2 border-white/20"
              >
                <span className="flex items-center justify-center">
                  Start Building Teams
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
              <button
                onClick={handleExploreCompetitions}
                className="group px-10 py-4 border-2 border-white/30 text-white hover:bg-white/10 rounded-2xl font-semibold text-lg transition-all duration-300 hover:-translate-y-1"
              >
                <span className="flex items-center justify-center">
                  <Trophy className="mr-2 w-5 h-5" />
                  Explore Competitions
                </span>
              </button>
            </div>
            
            {/* Key Statistics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">15K+</div>
                <div className="text-white/80 text-sm">Active Students</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">98%</div>
                <div className="text-white/80 text-sm">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">500+</div>
                <div className="text-white/80 text-sm">Competitions</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Clean Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold">T</span>
                </div>
                <div className="text-xl font-bold">TalentHunt</div>
              </div>
              <p className="text-gray-400 mb-6">
                AI-powered team formation for technical competitions and meaningful global impact.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2">
                <li><a href="#how-it-works" className="text-gray-400 hover:text-white transition-colors">How It Works</a></li>
                <li><a href="#features" className="text-gray-400 hover:text-white transition-colors">Features</a></li>
                <li><a href="#competitions" className="text-gray-400 hover:text-white transition-colors">Competitions</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Access</h4>
              <ul className="space-y-2">
                <li><Link to="/admin" className="text-gray-400 hover:text-white transition-colors">Admin Portal</Link></li>
                <li><Link to="/mentor" className="text-gray-400 hover:text-white transition-colors">Mentor Dashboard</Link></li>
                <li><Link to="/auth" className="text-gray-400 hover:text-white transition-colors">Student Login</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2">
                <li><a href="mailto:support@talenthunt.com" className="text-gray-400 hover:text-white transition-colors">Support</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} TalentHunt. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <div className="flex items-center space-x-2 text-gray-400 text-sm">
                <Brain className="w-4 h-4" />
                <span>Powered by AI</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400 text-sm">
                <Globe className="w-4 h-4" />
                <span>Global Impact</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
