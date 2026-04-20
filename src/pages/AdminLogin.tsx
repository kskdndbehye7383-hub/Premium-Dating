import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, Lock, User as UserIcon } from "lucide-react";
import { cn } from "../lib/utils";

export default function AdminLogin() {
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!account || !password) {
      setError("Please fill in both fields.");
      return;
    }

    setLoading(true);

    // Hardcoded admin credentials check as requested
    setTimeout(() => {
      setLoading(false);
      if (account === "890305@wty.com" && password === "890305@wty.com") {
        localStorage.setItem("spark_admin", "true");
        navigate("/admin/dashboard", { replace: true });
      } else {
        setError("Invalid admin credentials.");
      }
    }, 800);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-900 p-6 font-mono">
      <div className="w-full max-w-md bg-gray-800 rounded-xl shadow-2xl border border-gray-700 overflow-hidden">
        {/* Header */}
        <div className="p-8 text-center border-b border-gray-700 bg-gray-800/50">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gray-900 rounded-2xl flex items-center justify-center shadow-inner border border-gray-700">
              <ShieldCheck className="text-rose-500" size={32} />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-widest uppercase">Admin Portal</h1>
          <p className="text-gray-400 mt-2 text-sm">System Administration Access</p>
        </div>

        {/* Form */}
        <div className="p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-900/30 border border-red-500/50 text-red-400 rounded-lg text-sm font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Account</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500">
                  <UserIcon size={18} />
                </div>
                <input
                  type="text"
                  value={account}
                  onChange={(e) => setAccount(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-gray-900 border border-gray-700 focus:bg-gray-900 focus:border-rose-500 outline-none rounded-lg transition-all text-gray-100 placeholder:text-gray-600 focus:ring-1 focus:ring-rose-500"
                  placeholder=""
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-gray-900 border border-gray-700 focus:bg-gray-900 focus:border-rose-500 outline-none rounded-lg transition-all text-gray-100 placeholder:text-gray-600 focus:ring-1 focus:ring-rose-500"
                  placeholder=""
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={cn(
                "w-full py-4 rounded-lg font-bold text-white shadow-lg transition-all active:scale-[0.98] mt-8 uppercase tracking-widest text-sm",
                loading 
                  ? "bg-rose-900 text-rose-300 cursor-not-allowed" 
                  : "bg-rose-600 hover:bg-rose-500"
              )}
            >
              {loading ? "Authenticating..." : "Login"}
            </button>
          </form>
          
          <div className="mt-6 text-center">
             <button onClick={() => navigate('/login')} className="text-gray-500 hover:text-gray-300 text-xs transition-colors">
               &larr; Return to public site
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}
