import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Discover from "./pages/Discover";
import Matches from "./pages/Matches";
import Chat from "./pages/Chat";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Membership from "./pages/Membership";
import ProtectedRoute from "./components/ProtectedRoute";
import PremiumRoute from "./components/PremiumRoute";
import AdminDashboard from "./pages/AdminDashboard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />

        {/* Protected Routes (requires basic authentication) */}
        <Route element={<ProtectedRoute />}>
          
          {/* Membership gateway does NOT require premium logic */}
          <Route path="/membership" element={<Membership />} />
          
          {/* Everything inside the main Layout REQUIRES successful purchase verification */}
          <Route element={<PremiumRoute />}>
            <Route path="/" element={<Layout />}>
              <Route index element={<Discover />} />
              <Route path="matches" element={<Matches />}>
                <Route index element={<div className="h-full flex flex-col items-center justify-center text-gray-400 bg-white shadow-[-4px_0_24px_-10px_rgba(0,0,0,0.05)] border-l border-gray-100">
                  <p className="text-lg">Select a match to start messaging</p>
                </div>} />
                <Route path="chat/:id" element={<Chat />} />
              </Route>
              <Route path="profile" element={<Profile />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Route>
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
