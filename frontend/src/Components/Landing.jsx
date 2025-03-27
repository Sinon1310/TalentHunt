import React, { useState, useEffect } from 'react';
import { Link,useNavigate } from 'react-router-dom'
import { Users, Search, UserPlus, BarChart2, Menu, X, ChevronLeft, ChevronRight } from 'lucide-react';

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
    // If you want to navigate to a specific competition:
    // navigate('/competition/1'); // where 1 is the competition ID
  };

  // Sample competitions data
  const competitions = [
    {
      id: 1,
      title: "Annual Hackathon 2025",
      description: "Build innovative solutions for real-world problems in 48 hours.",
      image: "https://midpenpost.org/wp-content/uploads/2023/04/IMG_3168.jpg",
      date: "Oct 15-17, 2025"
    },
    {
      id: 2,
      title: "Design Challenge",
      description: "Create user-centered designs for next-gen applications.",
      image: "https://interiordesign.net/wp-content/uploads/2023/02/Interior-Design-ThinkLab-Design-Hackathon-TL23_Editorial_Image_Cover.jpg",
      date: "Nov 5-7, 2025"
    },
    {
      id: 3,
      title: "AI Innovation Contest",
      description: "Develop AI solutions that can transform industries.",
      image: "https://framerusercontent.com/assets/8zE1cw2uW0PtSANxYynp9aKnnP8.png",
      date: "Dec 10-12, 2025"
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
              onClick={()=>navigate('/profile')}
              className="group flex items-center space-x-3 hover:opacity-80 transition-opacity"
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
            <a href="#home" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">Home</a>
            <a href="#how-it-works" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">How It Works</a>
            <a href="#features" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">Features</a>
            <a href="#competitions" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">Competitions</a>
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
              <a href="#home" className="text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors duration-200">Home</a>
              <a href="#how-it-works" className="text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors duration-200">How It Works</a>
              <a href="#features" className="text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors duration-200">Features</a>
              <a href="#competitions" className="text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors duration-200">Competitions</a>
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

     {/* Hero section */}
<section className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 overflow-hidden">
  <div className="absolute inset-0 bg-black opacity-20"></div>
  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzYuMzY0IDM2LjM2NGwtMi44MjgtMi44MjggMi44MjgtMi44MjgtMi44MjgtMi44MjgtMi44MjggMi44MjgtMi44MjgtMi44MjgtMi44MjggMi44MjggMi44MjggMi44MjgtMi44MjggMi44MjggMi44MjggMi44MjgtMi44MjggMi44MjggMi44MjggMi44MjgtMi44Mjh6IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9Ii4xIi8+PC9nPjwvc3ZnPg==')] opacity-10"></div>
  <div className="container mx-auto px-4 py-20 text-center text-white relative z-10">
    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight animate-fade-in">
      Find the Right Team. <br className="hidden md:block" />
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-500">
        Win the Challenge.
      </span>
    </h1>
    <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto opacity-90 animate-fade-in-up">
      Connect with the perfect teammates, get expert mentorship, and track
      your progress all in one place.
    </p>
    <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in-up">
      <button
        onClick={handleCreateProfile}
        className="group bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
      >
        Create Your Profile
      </button>
      <button
        onClick={handleExploreCompetitions}
        className="group bg-transparent border-2 border-white text-white hover:bg-white/10 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:-translate-y-1"
      >
        Explore Competitions
      </button>
    </div>
  </div>
  <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-50 to-transparent"></div>
</section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              How It Works
            </span>
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="group text-center p-8 rounded-2xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-gradient-to-b from-white to-gray-50">
              <div className="bg-gradient-to-br from-blue-500 to-purple-500 p-6 rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-6 transform group-hover:scale-110 transition-transform duration-300">
                <Users className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">Create Your Profile</h3>
              <p className="text-gray-600 leading-relaxed">Add your skills, experience, and interests to find the perfect match for your next competition.</p>
            </div>
            <div className="group text-center p-8 rounded-2xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-gradient-to-b from-white to-gray-50">
              <div className="bg-gradient-to-br from-blue-500 to-purple-500 p-6 rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-6 transform group-hover:scale-110 transition-transform duration-300">
                <Search className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">Get Matched</h3>
              <p className="text-gray-600 leading-relaxed">Our smart algorithm matches you with teammates who complement your skills and experience.</p>
            </div>
            <div className="group text-center p-8 rounded-2xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-gradient-to-b from-white to-gray-50">
              <div className="bg-gradient-to-br from-blue-500 to-purple-500 p-6 rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-6 transform group-hover:scale-110 transition-transform duration-300">
                <UserPlus className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">Request a Mentor</h3>
              <p className="text-gray-600 leading-relaxed">Get expert guidance from experienced faculty mentors and track your team's progress.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Key Features
            </span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="bg-gradient-to-br from-blue-500 to-purple-500 p-4 rounded-xl w-14 h-14 flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform duration-300">
                <Users className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Automated Team Formation</h3>
              <p className="text-gray-600 leading-relaxed">Our smart algorithm matches students based on complementary skills and experience.</p>
            </div>
            <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="bg-gradient-to-br from-blue-500 to-purple-500 p-4 rounded-xl w-14 h-14 flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform duration-300">
                <Search className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Skill-Based Search</h3>
              <p className="text-gray-600 leading-relaxed">Find teammates with specific skills that your team needs to succeed.</p>
            </div>
            <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="bg-gradient-to-br from-blue-500 to-purple-500 p-4 rounded-xl w-14 h-14 flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform duration-300">
                <UserPlus className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Mentor Allocation</h3>
              <p className="text-gray-600 leading-relaxed">Get matched with faculty mentors who can provide guidance and feedback.</p>
            </div>
            <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="bg-gradient-to-br from-blue-500 to-purple-500 p-4 rounded-xl w-14 h-14 flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform duration-300">
                <BarChart2 className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Progress Tracking</h3>
              <p className="text-gray-600 leading-relaxed">Monitor your team's progress and get insights to improve performance.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Competitions Showcase */}
      <section id="competitions" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Upcoming Competitions
            </span>
          </h2>
          
          <div className="relative max-w-5xl mx-auto">
            <div className="overflow-hidden rounded-2xl shadow-xl">
              <div 
                className="flex transition-transform duration-500 ease-in-out" 
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {competitions.map((competition) => (
                  <div key={competition.id} className="w-full flex-shrink-0">
                    <div className="bg-white overflow-hidden">
                      <div className="h-80 relative group">
                        <img 
                          src={competition.image} 
                          alt={competition.title} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                      <div className="p-8">
                        <h3 className="text-2xl font-semibold mb-4 text-gray-800">{competition.title}</h3>
                        <p className="text-gray-600 mb-6 leading-relaxed">{competition.description}</p>
                        <div className="flex justify-between items-center">
                          <span className="text-blue-600 font-medium">{competition.date}</span>
                          <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                            Learn More
                          </button>
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
          
          <div className="text-center mt-12">
            <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium text-lg hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              View All Competitions
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">What Our Users Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.avatar || "/placeholder.svg"} 
                    alt={testimonial.name} 
                    className="w-16 h-16 rounded-full mr-4"
                    
                  />
                  <div>
                    <h3 className="font-semibold">{testimonial.name}</h3>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Join the Challenge?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Create your profile today and start connecting with the perfect teammates for your next competition.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="px-6 py-3 bg-white text-blue-600 rounded-md font-medium hover:bg-gray-100 transition">
              Create Your Profile
            </button>
            <button className="px-6 py-3 bg-transparent border-2 border-white text-white rounded-md font-medium hover:bg-white hover:text-blue-600 transition">
              Explore Competitions
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">TalentHunt</h3>
              <p className="text-gray-400">Connecting students, mentors, and competitions for better team experiences.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition">Home</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Competitions</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition">Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">FAQ</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect With Us</h4>
              <div className="flex space-x-4 mb-4">
                <a href="#" className="text-gray-400 hover:text-white transition">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
               
              </div>
              <p className="text-gray-400">Email: info@TalentHunt.com</p>
            </div>
          </div>
          <Link to="/admin" className="text-gray-400 hover:text-white">
          Admin Login
        </Link>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} TalentHunt. All rights reserved.</p>
          </div>
          
        </div>
      </footer>
    </div>
  );
};

export default Landing;