import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignInPage from "./Pages/SignInPage";
import SignUpPage from "./Pages/SignUpPage";
import Dashboard from "./Pages/Dashboard";
import UserDashboard from "./Pages/UserDashboard";
import CreateLoan from "./Pages/CreateLoan";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./hooks/useAuth";

const App = () => {
  return (
    <div>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<ProtectedRoute element={<UserDashboard />} requiredRole="user" />} />
            <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} requiredRole="admin" />} />
            <Route path="/signIn" element={<SignInPage />} />
            <Route path="/signUp" element={<SignUpPage />} />
            <Route path="/create-loan" element={<ProtectedRoute element={<CreateLoan />} requiredRole="user" />} />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
};

export default App;
