"use client"

import { useState, useEffect } from "react"
import Sidebar from "./Sidebar"
import { MessageSquare, Calendar, Award, Briefcase, MapPin, Clock } from 'lucide-react'

const MentorshipPage = () => {
  const [mentors, setMentors] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("available")
  const [showRequestModal, setShowRequestModal] = useState(false)
  const [selectedMentor, setSelectedMentor] = useState(null)

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockMentors = [
        {
          id: 1,
          name: "Dr. Priya Sharma",
          title: "AI Research Lead",
          company: "Microsoft Research",
          location: "Bangalore, India",
          experience: "12+ years",
          expertise: ["Machine Learning", "Deep Learning", "Computer Vision"],
          availability: "Available",
          rating: 4.9,
          reviews: 127,
          image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=500&auto=format&fit=crop",
          achievements: ["Published 20+ research papers", "3 Patents in AI"],
          schedule: "Weekdays after 6 PM IST"
        },
        {
          id: 2,
          name: "Rajesh Kumar",
          title: "Principal Software Architect",
          company: "Amazon",
          location: "Mumbai, India",
          experience: "15+ years",
          expertise: ["System Design", "Cloud Architecture", "Microservices"],
          availability: "Available",
          rating: 4.8,
          reviews: 98,
          image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=500&auto=format&fit=crop",
          achievements: ["AWS Community Hero", "Tech Conference Speaker"],
          schedule: "Weekends"
        },
        {
          id: 3,
          name: "Ananya Desai",
          title: "Product Design Director",
          company: "Google",
          location: "Hyderabad, India",
          experience: "10+ years",
          expertise: ["UX Strategy", "Design Systems", "User Research"],
          availability: "Booked",
          rating: 4.9,
          reviews: 156,
          image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=500&auto=format&fit=crop",
          achievements: ["Google Design Excellence Award", "UX Mentor at IDEO"],
          schedule: "Flexible timings"
        },
        {
          id: 4,
          name: "Arjun Reddy",
          title: "Engineering Manager",
          company: "Meta",
          location: "Bangalore, India",
          experience: "8+ years",
          expertise: ["Team Leadership", "Full Stack", "Performance Optimization"],
          availability: "Available",
          rating: 4.7,
          reviews: 89,
          image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=500&auto=format&fit=crop",
          achievements: ["Led 20+ successful projects", "Tech Blog Author"],
          schedule: "Weekday mornings"
        },
        {
          id: 5,
          name: "Dr. Neha Kapoor",
          title: "Data Science Director",
          company: "IBM Research",
          location: "Pune, India",
          experience: "14+ years",
          expertise: ["Big Data Analytics", "NLP", "Statistical Modeling"],
          availability: "Booked",
          rating: 4.9,
          reviews: 134,
          image: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?q=80&w=500&auto=format&fit=crop",
          achievements: ["PhD from Stanford", "IBM Master Inventor"],
          schedule: "Weekends only"
        }
      ]
      setMentors(mockMentors)
      setLoading(false)
    }, 800)
  }, [])

  const filteredMentors = mentors.filter(
    (mentor) =>
      activeTab === "all" ||
      (activeTab === "available" && mentor.availability === "Available") ||
      (activeTab === "booked" && mentor.availability === "Booked"),
  )

  const handleRequestMentorship = (mentor) => {
    setSelectedMentor(mentor)
    setShowRequestModal(true)
  }

  const RequestModal = () => {
    if (!showRequestModal || !selectedMentor) return null

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-800">Request Mentorship</h3>
            <button onClick={() => setShowRequestModal(false)} className="text-gray-500 hover:text-gray-700">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex items-center mb-6">
            <img src={selectedMentor.image} alt={selectedMentor.name} className="w-16 h-16 rounded-full mr-4" />
            <div>
              <h4 className="font-semibold text-gray-800">{selectedMentor.name}</h4>
              <p className="text-gray-600 text-sm">{selectedMentor.title} at {selectedMentor.company}</p>
            </div>
          </div>

          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                What would you like to learn?
              </label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows="3"
                placeholder="Describe your learning goals and what you hope to achieve from this mentorship..."
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Preferred Schedule
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="">Select a time slot</option>
                <option value="morning">Morning (9 AM - 12 PM)</option>
                <option value="afternoon">Afternoon (2 PM - 5 PM)</option>
                <option value="evening">Evening (6 PM - 9 PM)</option>
              </select>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                type="button"
                onClick={() => setShowRequestModal(false)}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Send Request
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="w-64 p-4">
        <Sidebar />
      </div>
      <div className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Find Your Mentor</h1>
            <div className="flex items-center space-x-2">
              {/* <span className="text-sm text-gray-500">Sort by:</span>
              <select className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="rating">Rating</option>
                <option value="experience">Experience</option>
                <option value="reviews">Reviews</option>
              </select> */}
            </div>
          </div>

          <div className="mb-6 border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "available"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
                onClick={() => setActiveTab("available")}
              >
                Available Mentors
              </button>
              <button
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "booked"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
                onClick={() => setActiveTab("booked")}
              >
                Booked Mentors
              </button>
              <button
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "all"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
                onClick={() => setActiveTab("all")}
              >
                All Mentors
              </button>
            </nav>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredMentors.map((mentor) => (
                <div key={mentor.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="p-6">
                    <div className="flex items-start">
                      <img
                        src={mentor.image}
                        alt={mentor.name}
                        className="h-20 w-20 rounded-lg object-cover"
                      />
                      <div className="ml-4 flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h2 className="text-xl font-semibold text-gray-800">{mentor.name}</h2>
                            <p className="text-gray-600">{mentor.title}</p>
                          </div>
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                              mentor.availability === "Available"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {mentor.availability}
                          </span>
                        </div>
                        
                        <div className="mt-2 flex items-center text-sm text-gray-600">
                          <Briefcase className="w-4 h-4 mr-1" />
                          {mentor.company}
                          <MapPin className="w-4 h-4 ml-3 mr-1" />
                          {mentor.location}
                        </div>
                        
                        <div className="mt-2 flex items-center">
                          <div className="flex items-center">
                            <Award className="w-4 h-4 text-yellow-400" />
                            <span className="ml-1 text-sm font-medium text-gray-700">{mentor.rating}</span>
                          </div>
                          <span className="mx-2 text-gray-500">•</span>
                          <span className="text-sm text-gray-500">{mentor.reviews} reviews</span>
                          <span className="mx-2 text-gray-500">•</span>
                          <span className="text-sm text-gray-500">{mentor.experience}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {mentor.expertise.map((skill, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-blue-50 text-blue-700 text-sm font-medium rounded-md"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center text-sm text-gray-600 mb-4">
                        <Clock className="w-4 h-4 mr-1" />
                        Available: {mentor.schedule}
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="flex space-x-2">
                          <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
                            <MessageSquare className="w-5 h-5" />
                          </button>
                          <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
                            <Calendar className="w-5 h-5" />
                          </button>
                        </div>
                        
                        <button
                          onClick={() => handleRequestMentorship(mentor)}
                          disabled={mentor.availability !== "Available"}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                            mentor.availability === "Available"
                              ? "bg-blue-600 text-white hover:bg-blue-700"
                              : "bg-gray-100 text-gray-400 cursor-not-allowed"
                          }`}
                        >
                          {mentor.availability === "Available" ? "Request Mentorship" : "Currently Unavailable"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <RequestModal />
    </div>
  )
}

export default MentorshipPage

