import { Navigate } from "react-router-dom"
import { useUser } from "../Contexts/UserContext"

const ProtectedMentorRoute = ({ children }) => {
  const { user } = useUser()

  if (!user || user.role !== 'mentor') {
    // Redirect to login if not authenticated or not a mentor
    return <Navigate to="/auth" replace />
  }

  return children
}

export default ProtectedMentorRoute 