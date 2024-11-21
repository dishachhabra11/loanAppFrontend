import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function ProtectedRoute({ element, requiredRole }) {
  const navigate = useNavigate();
  const { isAuthenticated, role, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        navigate("/signin");
      } else if (requiredRole && role !== requiredRole) {
        navigate("/unauthorized"); // Redirect if the role doesn't match
      }
    }
  }, [isAuthenticated, role, requiredRole, loading, navigate]);

  if (loading) {
    return <div>Loading...</div>; // Replace with your preferred loader
  }

  return isAuthenticated && (!requiredRole || role === requiredRole) ? element : null;
}

export default ProtectedRoute;
