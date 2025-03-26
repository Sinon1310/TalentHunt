import { Navigate } from "react-router-dom"
import { useAdminAuth } from "../Contexts/AdminAuthContext"

const ProtectedAdminRoute = ({ children }) => {
  const { adminUser } = useAdminAuth()

  if (!adminUser) {
    // Redirect to admin login if not authenticated
    return <Navigate to="/admin" replace />
  }

  return children
}

export default ProtectedAdminRoute

