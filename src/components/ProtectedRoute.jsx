import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function ProtectedRoute({ element, requiredRole }) {
  const navigate = useNavigate();
  const { isAuthenticated, role, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      // Wait until loading is complete
      if (!isAuthenticated) {
        navigate("/signin"); // Redirect to sign-in if not authenticated
      } else if (requiredRole && role !== requiredRole) {
        navigate("/unauthorized"); // Redirect if role doesn't match
      }
    }
  }, [isAuthenticated, role, requiredRole, loading, navigate]);

  if (loading) {
    return <div>Loading...</div>; // Show a loader while checking authentication
  }

  return isAuthenticated && (!requiredRole || role === requiredRole) ? element : null;
}

export default ProtectedRoute;
