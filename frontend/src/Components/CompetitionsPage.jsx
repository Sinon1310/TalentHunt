"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Calendar, Users, Trophy, ChevronRight } from 'lucide-react'

const CompetitionsPage = () => {
  const navigate = useNavigate()
  const [competitions, setCompetitions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockCompetitions = [
        {
          id: 1,
          title: "Annual Hackathon 2025",
          description: "Build innovative solutions for real-world problems in 48 hours. Join teams of up to 4 members and compete for exciting prizes.",
          image: "https://midpenpost.org/wp-content/uploads/2023/04/IMG_3168.jpg",
          startDate: "2025-10-15",
          endDate: "2025-10-17",
          status: "Upcoming",
          participants: "200+",
          prizePool: "$5000",
          registrationDeadline: "2025-10-01"
        },
        {
          id: 2,
          title: "Design Challenge",
          description: "Create user-centered designs for next-gen applications. Showcase your UI/UX skills and bring your creative vision to life.",
          image: "https://interiordesign.net/wp-content/uploads/2023/02/Interior-Design-ThinkLab-Design-Hackathon-TL23_Editorial_Image_Cover.jpg",
          startDate: "2025-11-05",
          endDate: "2025-11-07",
          status: "Upcoming",
          participants: "150+",
          prizePool: "$3000",
          registrationDeadline: "2025-10-25"
        },
        {
          id: 3,
          title: "AI Innovation Contest",
          description: "Develop AI solutions that can transform industries. Put your machine learning skills to the test and create impactful solutions.",
          image: "https://framerusercontent.com/assets/8zE1cw2uW0PtSANxYynp9aKnnP8.png",
          startDate: "2025-12-10",
          endDate: "2025-12-12",
          status: "Upcoming",
          participants: "180+",
          prizePool: "$4000",
          registrationDeadline: "2025-11-30"
        }
      ]
      setCompetitions(mockCompetitions)
      setLoading(false)
    }, 800)
  }, [])

  // Format date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Competitions</h1>
          <p className="text-xl opacity-90">Discover exciting opportunities to showcase your skills and win prizes</p>
        </div>
      </div>

      {/* Competitions Grid */}
      <div className="container mx-auto px-4 py-12">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {competitions.map((competition) => (
              <div key={competition.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                {/* Image */}
                <div className="relative h-48">
                  <img 
                    src={competition.image} 
                    alt={competition.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-green-500 text-white text-sm font-medium rounded-full">
                      {competition.status}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-2xl font-semibold mb-2 text-gray-800">{competition.title}</h3>
                  <p className="text-gray-600 mb-4">{competition.description}</p>

                  {/* Details */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-gray-600">
                      <Calendar className="w-5 h-5 mr-2" />
                      <span>{formatDate(competition.startDate)} - {formatDate(competition.endDate)}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Users className="w-5 h-5 mr-2" />
                      <span>{competition.participants} Participants Expected</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Trophy className="w-5 h-5 mr-2" />
                      <span>Prize Pool: {competition.prizePool}</span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <button 
                    onClick={() => navigate(`/competitions/${competition.id}`)}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 flex items-center justify-center"
                  >
                    View Details
                    <ChevronRight className="ml-2 w-5 h-5" />
                  </button>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 bg-gray-50 border-t">
                  <p className="text-sm text-gray-600">
                    Registration Deadline: <span className="font-medium">{formatDate(competition.registrationDeadline)}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default CompetitionsPage
