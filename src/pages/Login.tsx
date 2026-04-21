import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Flame, Mail, Lock } from "lucide-react";
import { cn } from "../lib/utils";
import { apiClient } from "../lib/apiClient";

// In a real app, this would be managed by completely separate auth state logic
// For this frontend mockup, we'll use local storage to simulate being logged in
export const mockLogin = (email: string) => {
  localStorage.setItem("spark_auth", "true");
  localStorage.setItem("spark_user_email", email);
};

export const mockLogout = () => {
  localStorage.removeItem("spark_auth");
  localStorage.removeItem("spark_user_email");
};

export const isAuthenticated = () => localStorage.getItem("spark_auth") === "true";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const successMessage = location.state?.message;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);

    try {
      // Admin Login Check
      if (email === "890305@wty.com" && password === "890305@wty.com") {
        setLoading(false);
        localStorage.setItem("spark_admin", "true");
        navigate("/admin/dashboard", { replace: true });
        return;
      }
      
      // For this mockup, any email/password works as long as it's provided
      mockLogin(email);

      // Check if this specific user has paid for premium before using robust API client
      const data = await apiClient.getUserStatus(email);

      setLoading(false);

      if (data.isPremium) {
        // If already paid, redirect straight to the app
        navigate("/", { replace: true });
      } else {
        // Otherwise, send them to the membership purchase page
        navigate("/membership", { replace: true });
      }

    } catch (err) {
      console.error("Login verification failed:", err);
      setLoading(false);
      // Fallback: assume not premium on error
      mockLogin(email);
      navigate("/membership", { replace: true });
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-50/50 p-6 relative">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden z-10">
        {/* Header */}
        <div className="bg-gradient-to-r from-rose-500 to-pink-500 p-8 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/3"></div>
          <div className="absolute bottom-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-2xl translate-y-1/3 translate-x-1/4"></div>
          
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg shadow-rose-900/20 mb-4 transform rotate-6">
              <Flame className="text-rose-500" size={32} />
            </div>
            <h1 className="text-3xl font-bold text-white tracking-tight">Welcome Back</h1>
            <p className="text-rose-100 mt-2 font-medium">Log in to continue swiping</p>
          </div>
        </div>

        {/* Form */}
        <div className="p-8">
          {successMessage && (
            <div className="mb-6 p-4 bg-green-50 border border-green-100 text-green-700 rounded-xl text-sm font-medium">
              {successMessage}
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 ml-1">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-rose-500 transition-colors">
                  <Mail size={20} />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border-2 border-transparent focus:bg-white focus:border-rose-500 outline-none rounded-2xl transition-all font-medium text-gray-900 placeholder:text-gray-400 placeholder:font-normal"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between ml-1">
                <label className="text-sm font-semibold text-gray-700">Password</label>
                <a onClick={(e) => { e.preventDefault(); alert("A password reset link has been sent to your email."); }} href="#" className="text-xs font-semibold text-rose-500 hover:text-rose-600 transition-colors">
                  Forgot password?
                </a>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-rose-500 transition-colors">
                  <Lock size={20} />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border-2 border-transparent focus:bg-white focus:border-rose-500 outline-none rounded-2xl transition-all font-medium text-gray-900 placeholder:text-gray-400 placeholder:font-normal"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={cn(
                "w-full py-4 rounded-xl font-bold text-white shadow-lg shadow-rose-200 transition-all active:scale-[0.98] mt-4",
                loading 
                  ? "bg-rose-400 cursor-not-allowed" 
                  : "bg-gradient-to-r from-rose-500 to-pink-500 hover:shadow-xl hover:shadow-rose-300"
              )}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Logging in...
                </div>
              ) : "Log In"}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-500 font-medium">
              Don't have an account?{" "}
              <Link to="/register" className="text-rose-500 hover:text-rose-600 font-bold ml-1 transition-colors">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
