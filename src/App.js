import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import Home from "./pages/Home";
import Services from "./pages/Services";
import RequestForm from "./pages/RequestForm";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import Loader from "./components/Loader";
import PostJob from "./pages/PostJob";
import Marketplace from "./pages/Marketplace";
import ProviderProfile from "./pages/ProviderProfile";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

// RBAC protection
import ProtectedRoute from "./components/ProtectedRoute";

// dashboards
import AdminDashboard from "./pages/AdminDashboard";
import HirerDashboard from "./pages/HirerDashboard";

import { AdminNotificationProvider } from "./context/AdminNotificationContext";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1800);
  }, []);

  if (loading) return <Loader />;

  return (
    <Router>
      <AdminNotificationProvider>
        <Navbar />

        <Routes>
          {/* ================= PUBLIC ROUTES ================= */}
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/request" element={<RequestForm />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          {/* ================= HIRER ONLY ================= */}

          <Route
            path="/post-job"
            element={
              <ProtectedRoute allowedRoles={["hirer"]}>
                <PostJob />
              </ProtectedRoute>
            }
          />

          <Route
            path="/hirer-dashboard"
            element={
              <ProtectedRoute allowedRoles={["hirer"]}>
                <HirerDashboard />
              </ProtectedRoute>
            }
          />

          {/* ================= FREELANCER ONLY ================= */}

          <Route
            path="/freelancer-dashboard"
            element={
              <ProtectedRoute allowedRoles={["freelancer"]}>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* MARKETPLACE — FREELANCER ONLY */}
          <Route
            path="/marketplace"
            element={
              <ProtectedRoute allowedRoles={["freelancer"]}>
                <Marketplace />
              </ProtectedRoute>
            }
          />

          {/* PROVIDER PROFILE — FREELANCER ONLY */}
          <Route
            path="/provider/:id"
            element={
              <ProtectedRoute allowedRoles={["freelancer"]}>
                <ProviderProfile />
              </ProtectedRoute>
            }
          />

          {/* ================= ADMIN ================= */}

          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AdminNotificationProvider>
    </Router>
  );
}

export default App;
