"use client"

import { useState } from "react"
import Sidebar from "./Sidebar"

const CalendarPage = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Team Meeting",
      date: new Date(2023, 10, 15), // November 15, 2023
      time: "10:00 AM - 11:30 AM",
      type: "meeting",
    },
    {
      id: 2,
      title: "Hackathon Kickoff",
      date: new Date(2023, 10, 20), // November 20, 2023
      time: "9:00 AM - 10:00 AM",
      type: "competition",
    },
    {
      id: 3,
      title: "Mentorship Session",
      date: new Date(2023, 10, 22), // November 22, 2023
      time: "2:00 PM - 3:00 PM",
      type: "mentorship",
    },
    {
      id: 4,
      title: "Project Submission Deadline",
      date: new Date(2023, 10, 25), // November 25, 2023
      time: "11:59 PM",
      type: "deadline",
    },
  ])

  // Get days in month
  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  // Get day of week for first day of month (0 = Sunday, 6 = Saturday)
  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  // Format date as YYYY-MM-DD
  const formatDate = (date) => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`
  }

  // Get events for a specific day
  const getEventsForDay = (day) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    return events.filter(
      (event) =>
        event.date.getDate() === day &&
        event.date.getMonth() === date.getMonth() &&
        event.date.getFullYear() === date.getFullYear(),
    )
  }

  // Get event type color
  const getEventTypeColor = (type) => {
    switch (type) {
      case "meeting":
        return "bg-blue-100 text-blue-800"
      case "competition":
        return "bg-purple-100 text-purple-800"
      case "mentorship":
        return "bg-green-100 text-green-800"
      case "deadline":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // Navigate to previous month
  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  }

  // Navigate to next month
  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }

  // Navigate to current month
  const goToToday = () => {
    setCurrentMonth(new Date())
  }

  // Render calendar
  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth)
    const firstDayOfMonth = getFirstDayOfMonth(currentMonth)
    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 border border-gray-200 bg-gray-50"></div>)
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
      const isToday = new Date().toDateString() === date.toDateString()
      const dayEvents = getEventsForDay(day)

      days.push(
        <div
          key={`day-${day}`}
          className={`h-24 border border-gray-200 p-1 overflow-hidden ${isToday ? "bg-blue-50" : "bg-white"}`}
        >
          <div className="flex justify-between items-center mb-1">
            <span className={`text-sm font-medium ${isToday ? "text-blue-600" : "text-gray-700"}`}>{day}</span>
            {dayEvents.length > 0 && (
              <span className="text-xs text-gray-500">
                {dayEvents.length} event{dayEvents.length > 1 ? "s" : ""}
              </span>
            )}
          </div>
          <div className="space-y-1 overflow-y-auto max-h-16">
            {dayEvents.map((event) => (
              <div key={event.id} className={`px-2 py-1 text-xs rounded-md ${getEventTypeColor(event.type)}`}>
                <div className="font-medium truncate">{event.title}</div>
                <div className="text-xs opacity-75">{event.time}</div>
              </div>
            ))}
          </div>
        </div>,
      )
    }

    return days
  }

  // Format month and year
  const formatMonthYear = (date) => {
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" })
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="w-64 p-4">
        <Sidebar />
      </div>
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Calendar</h1>
          <div className="flex space-x-2">
            <button
              onClick={goToToday}
              className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Today
            </button>
            <button
              onClick={prevMonth}
              className="p-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextMonth}
              className="p-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">{formatMonthYear(currentMonth)}</h2>
          </div>

          <div className="grid grid-cols-7 gap-0">
            {/* Day headers */}
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="p-2 text-center text-sm font-medium text-gray-700 border-b border-gray-200">
                {day}
              </div>
            ))}

            {/* Calendar days */}
            {renderCalendar()}
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Upcoming Events</h3>
          <div className="space-y-4">
            {events
              .filter((event) => event.date >= new Date())
              .sort((a, b) => a.date - b.date)
              .slice(0, 5)
              .map((event) => (
                <div key={event.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex items-start">
                    <div className={`w-2 h-full rounded-full ${getEventTypeColor(event.type).split(" ")[0]}`}></div>
                    <div className="ml-4 flex-1">
                      <h4 className="text-md font-medium text-gray-800">{event.title}</h4>
                      <p className="text-sm text-gray-600">
                        {event.date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
                      </p>
                      <p className="text-sm text-gray-500">{event.time}</p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CalendarPage

