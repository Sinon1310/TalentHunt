import { Link, useLocation } from "react-router-dom"
import { Home, Award, Users, MessageSquare, Calendar } from 'lucide-react'

const Sidebar = () => {
  const location = useLocation()

  // Function to check if a path is active
  const isActive = (path) => {
    return location.pathname === path
  }

  const menuItems = [
    {
      path: "/dashboard",
      icon: <Home size={20} />,
      label: "Overview"
    },
    {
      path: "/competitions",
      icon: <Award size={20} />,
      label: "Competitions"
    },
    {
      path: "/team/1",
      icon: <Users size={20} />,
      label: "My Teams"
    },
    {
      path: "/mentorship",
      icon: <MessageSquare size={20} />,
      label: "Mentorship"
    },
    {
      path: "/calendar",
      icon: <Calendar size={20} />,
      label: "Calendar"
    }
  ]

  return (
    <div className="bg-white shadow-md rounded-lg p-4 w-full">
      <nav className="space-y-1">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center space-x-3 px-3 py-2 rounded-md transition-colors duration-200 ${
              isActive(item.path)
                ? "bg-blue-50 text-blue-600"
                : "text-gray-700 hover:bg-gray-50"
            }`}
          >
            {item.icon}
            <span className="font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  )
}

export default Sidebar

