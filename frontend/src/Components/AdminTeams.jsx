"use client"

import React, { useState, useEffect } from "react"

const AdminTeams = () => {
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [competitionFilter, setCompetitionFilter] = useState("all")
  const [showTeamDetails, setShowTeamDetails] = useState(null)

  // Mock data - in a real app, this would come from an API
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockTeams = [
        {
          id: 1,
          name: "CodeCrafters",
          competition: "Annual Hackathon 2025",
          competitionId: 1,
          members: [
            { id: 1, name: "Rahul Sharma", email: "rahul.s@example.com", role: "Team Leader" },
            { id: 2, name: "Priya Patel", email: "priya.p@example.com", role: "Developer" },
            { id: 3, name: "Arun Kumar", email: "arun.k@example.com", role: "Designer" },
            { id: 4, name: "Ananya Shah", email: "ananya.s@example.com", role: "Developer" },
          ],
          status: "active",
          createdDate: "2023-10-01",
          projectName: "EcoTrack",
          projectDescription: "A mobile app that helps users track and reduce their carbon footprint",
        },
        {
          id: 2,
          name: "DesignDreamers",
          competition: "Design Challenge",
          competitionId: 2,
          members: [
            { id: 5, name: "Karan Mehta", email: "karan.m@example.com", role: "Team Leader" },
            { id: 6, name: "Zara Khan", email: "zara.k@example.com", role: "Designer" },
            { id: 7, name: "Vikram Singh", email: "vikram.s@example.com", role: "UX Researcher" },
          ],
          status: "active",
          createdDate: "2023-10-02",
          projectName: "HealthHub",
          projectDescription: "A healthcare dashboard for patients to manage their appointments and medical records",
        },
        {
          id: 3,
          name: "AI Innovators",
          competition: "AI Innovation Contest",
          competitionId: 3,
          members: [
            { id: 8, name: "Arjun Reddy", email: "arjun.r@example.com", role: "Team Leader" },
            { id: 9, name: "Neha Gupta", email: "neha.g@example.com", role: "ML Engineer" },
            { id: 10, name: "Raj Patel", email: "raj.p@example.com", role: "Data Scientist" },
            { id: 11, name: "Sanya Malhotra", email: "sanya.m@example.com", role: "Backend Developer" },
          ],
          status: "active",
          createdDate: "2023-10-03",
          projectName: "SmartFarm",
          projectDescription: "An AI-powered system for optimizing crop yields and reducing water usage in agriculture",
        },
        {
          id: 4,
          name: "TechTitans",
          competition: "Annual Hackathon 2025",
          competitionId: 1,
          members: [
            { id: 12, name: "Rohan Kapoor", email: "rohan.k@example.com", role: "Team Leader" },
            { id: 13, name: "Riya Sharma", email: "riya.s@example.com", role: "Mobile Developer" },
          ],
          status: "active",
          createdDate: "2023-10-04",
          projectName: "CityGuide",
          projectDescription: "A location-based app that provides personalized recommendations for tourists",
        },
        {
          id: 5,
          name: "DataDynamos",
          competition: "AI Innovation Contest",
          competitionId: 3,
          members: [
            { id: 14, name: "Nikhil Verma", email: "nikhil.v@example.com", role: "Team Leader" },
            { id: 15, name: "Ishita Patel", email: "ishita.p@example.com", role: "Data Engineer" },
            { id: 16, name: "Aditya Rao", email: "aditya.r@example.com", role: "ML Engineer" },
          ],
          status: "active",
          createdDate: "2023-10-05",
          projectName: "PredictX",
          projectDescription: "A predictive analytics platform for small businesses to forecast sales and inventory needs",
        },
      ]

      const mockCompetitions = [
        { id: 1, title: "Annual Hackathon 2025" },
        { id: 2, title: "Design Challenge" },
        { id: 3, title: "AI Innovation Contest" },
        { id: 4, title: "Business Case Competition" },
        { id: 5, title: "Mobile App Challenge" },
      ]

      setTeams(mockTeams)
      setCompetitions(mockCompetitions)
      setLoading(false)
    }, 800)
  }, [])

  const [competitions, setCompetitions] = useState([])

  // Filter teams based on search term and competition filter
  const filteredTeams = teams.filter(
    (team) =>
      (team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        team.members.some((member) => member.name.toLowerCase().includes(searchTerm.toLowerCase()))) &&
      (competitionFilter === "all" || team.competitionId.toString() === competitionFilter),
  )

  // Format date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  // Get status badge class
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "inactive":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleDeleteTeam = (id) => {
    if (window.confirm("Are you sure you want to delete this team?")) {
      setTeams(teams.filter((team) => team.id !== id))
      setShowTeamDetails(null)
    }
  }

  return (
    <div className="p-6">
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex flex-col md:flex-row gap-4 md:items-center">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Search teams or members..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select
            className="block w-full md:w-auto pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            value={competitionFilter}
            onChange={(e) => setCompetitionFilter(e.target.value)}
          >
            <option value="all">All Competitions</option>
            {competitions.map((comp) => (
              <option key={comp.id} value={comp.id.toString()}>
                {comp.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Teams List */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-6 text-center">
            <svg
              className="animate-spin h-8 w-8 mx-auto text-indigo-600"
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
            <p className="mt-2 text-gray-600">Loading teams...</p>
          </div>
        ) : filteredTeams.length === 0 ? (
          <div className="p-6 text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 mx-auto text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <p className="mt-2 text-gray-600">No teams found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Team
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Competition
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Members
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Created
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTeams.map((team) => (
                  <React.Fragment key={team.id}>
                    <tr className={showTeamDetails === team.id ? "bg-indigo-50" : ""}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{team.name}</div>
                        <div className="text-xs text-gray-500">{team.projectName}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{team.competition}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex -space-x-2">
                          {team.members.slice(0, 3).map((member, index) => (
                            <div
                              key={member.id}
                              className="h-8 w-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs font-medium"
                              title={member.name}
                            >
                              {member.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </div>
                          ))}
                          {team.members.length > 3 && (
                            <div className="h-8 w-8 rounded-full bg-gray-300 border-2 border-white flex items-center justify-center text-xs font-medium">
                              +{team.members.length - 3}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(team.status)}`}
                        >
                          {team.status.charAt(0).toUpperCase() + team.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(team.createdDate)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          className="text-indigo-600 hover:text-indigo-900 mr-3"
                          onClick={() => setShowTeamDetails(showTeamDetails === team.id ? null : team.id)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                        </button>
                        <button className="text-red-600 hover:text-red-900" onClick={() => handleDeleteTeam(team.id)}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </td>
                    </tr>
                    {showTeamDetails === team.id && (
                      <tr>
                        <td colSpan="6" className="px-6 py-4 bg-indigo-50">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <h3 className="text-lg font-medium text-gray-900 mb-2">Team Details</h3>
                              <p className="text-sm text-gray-600 mb-4">{team.projectDescription}</p>

                              <h4 className="text-md font-medium text-gray-900 mb-2">Team Members</h4>
                              <ul className="divide-y divide-gray-200 border border-gray-200 rounded-md overflow-hidden">
                                {team.members.map((member) => (
                                  <li key={member.id} className="px-4 py-3 flex items-center justify-between">
                                    <div>
                                      <p className="text-sm font-medium text-gray-900">{member.name}</p>
                                      <p className="text-sm text-gray-500">{member.email}</p>
                                    </div>
                                    <span className="text-xs text-gray-500">{member.role}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div>
                              <h3 className="text-lg font-medium text-gray-900 mb-2">Project Information</h3>
                              <div className="bg-white p-4 border border-gray-200 rounded-md">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <p className="text-xs text-gray-500">Project Name</p>
                                    <p className="text-sm font-medium">{team.projectName}</p>
                                  </div>
                                  <div>
                                    <p className="text-xs text-gray-500">Competition</p>
                                    <p className="text-sm font-medium">{team.competition}</p>
                                  </div>
                                  <div>
                                    <p className="text-xs text-gray-500">Status</p>
                                    <span
                                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(team.status)}`}
                                    >
                                      {team.status.charAt(0).toUpperCase() + team.status.slice(1)}
                                    </span>
                                  </div>
                                  <div>
                                    <p className="text-xs text-gray-500">Created</p>
                                    <p className="text-sm font-medium">{formatDate(team.createdDate)}</p>
                                  </div>
                                </div>

                                <div className="mt-4">
                                  <p className="text-xs text-gray-500">Description</p>
                                  <p className="text-sm">{team.projectDescription}</p>
                                </div>

                                <div className="mt-4 flex justify-end">
                                  <button className="px-3 py-1 bg-indigo-600 text-white text-sm rounded hover:bg-indigo-700">
                                    View Project Details
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminTeams

