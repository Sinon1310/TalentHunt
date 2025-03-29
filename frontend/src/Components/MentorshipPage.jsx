"use client"

import { useState, useEffect } from "react"
import Sidebar from "./Sidebar"

const MentorshipPage = () => {
  const [mentors, setMentors] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("available")

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockMentors = [
        {
          id: 1,
          name: "Dr. Sarah Johnson",
          title: "AI Research Scientist",
          company: "TechInnovate",
          expertise: ["Machine Learning", "Neural Networks", "Computer Vision"],
          availability: "Available",
          rating: 4.9,
          reviews: 27,
          image: "https://randomuser.me/api/portraits/women/32.jpg",
        },
        {
          id: 2,
          name: "Michael Chen",
          title: "Senior Software Engineer",
          company: "CodeCraft",
          expertise: ["Full Stack Development", "Cloud Architecture", "DevOps"],
          availability: "Available",
          rating: 4.7,
          reviews: 19,
          image: "https://randomuser.me/api/portraits/men/46.jpg",
        },
        {
          id: 3,
          name: "Emily Rodriguez",
          title: "UX/UI Design Lead",
          company: "DesignHub",
          expertise: ["User Research", "Interaction Design", "Prototyping"],
          availability: "Booked",
          rating: 4.8,
          reviews: 23,
          image: "https://randomuser.me/api/portraits/women/65.jpg",
        },
        {
          id: 4,
          name: "James Wilson",
          title: "Product Manager",
          company: "InnovateTech",
          expertise: ["Product Strategy", "Agile Methodologies", "Market Research"],
          availability: "Available",
          rating: 4.6,
          reviews: 15,
          image: "https://randomuser.me/api/portraits/men/22.jpg",
        },
        {
          id: 5,
          name: "Olivia Smith",
          title: "Data Science Director",
          company: "DataDriven",
          expertise: ["Big Data", "Statistical Analysis", "Data Visualization"],
          availability: "Booked",
          rating: 4.9,
          reviews: 31,
          image: "https://randomuser.me/api/portraits/women/17.jpg",
        },
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

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="w-64 p-4">
        <Sidebar />
      </div>
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Mentorship</h1>

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
            <svg
              className="animate-spin h-8 w-8 text-blue-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMentors.map((mentor) => (
              <div key={mentor.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <img
                      src={mentor.image || "/placeholder.svg"}
                      alt={mentor.name}
                      className="h-16 w-16 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h2 className="text-lg font-semibold text-gray-800">{mentor.name}</h2>
                      <p className="text-sm text-gray-600">
                        {mentor.title} at {mentor.company}
                      </p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center mb-2">
                      <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="ml-1 text-sm font-medium text-gray-700">{mentor.rating}</span>
                      <span className="ml-1 text-sm text-gray-500">({mentor.reviews} reviews)</span>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-3">
                      {mentor.expertise.map((skill, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center">
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          mentor.availability === "Available"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {mentor.availability}
                      </span>
                    </div>
                  </div>

                  <button
                    className={`w-full px-4 py-2 rounded-md text-white transition ${
                      mentor.availability === "Available"
                        ? "bg-blue-600 hover:bg-blue-700"
                        : "bg-gray-400 cursor-not-allowed"
                    }`}
                    disabled={mentor.availability !== "Available"}
                  >
                    {mentor.availability === "Available" ? "Request Mentorship" : "Currently Unavailable"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default MentorshipPage

