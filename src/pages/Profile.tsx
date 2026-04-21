import React, { useState, useRef } from "react";
import { CURRENT_USER } from "../data/mock";
import { Settings, Edit3, Shield, Star, Crown, LogOut, ChevronDown, Bell, EyeOff, MapPin, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { mockLogout } from "./Login";
import { cn } from "../lib/utils";

export default function Profile() {
  const navigate = useNavigate();
  const [activeModal, setActiveModal] = useState<"settings" | "safety" | "superlikes" | null>(null);
  const [avatarUrl, setAvatarUrl] = useState(CURRENT_USER.images[0]);
  const [showPremiumToast, setShowPremiumToast] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Settings State
  const [prefs, setPrefs] = useState({
    notifications: true,
    incognito: false,
    distance: 25
  });

  const handleLogout = () => {
    mockLogout();
    navigate("/login");
  };

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const renderModalContent = () => {
    if (activeModal === "settings") {
      return (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="text-gray-400" size={24} />
                <div>
                  <h4 className="font-bold text-gray-900">Push Notifications</h4>
                  <p className="text-xs text-gray-500">New matches & messages</p>
                </div>
              </div>
              <Toggle checked={prefs.notifications} onChange={(v) => setPrefs({...prefs, notifications: v})} />
            </div>
            
            <div className="h-[1px] bg-gray-50 w-full"></div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <EyeOff className="text-gray-400" size={24} />
                <div>
                  <h4 className="font-bold text-gray-900">Incognito Mode</h4>
                  <p className="text-xs text-gray-500">Hide from people you haven't liked</p>
                </div>
              </div>
              <Toggle checked={prefs.incognito} onChange={(v) => setPrefs({...prefs, incognito: v})} />
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <MapPin className="text-gray-400" size={24} />
                <h4 className="font-bold text-gray-900">Maximum Distance</h4>
              </div>
              <span className="font-bold text-rose-500">{prefs.distance} mi</span>
            </div>
            <input 
              type="range" 
              min="1" 
              max="100" 
              value={prefs.distance} 
              onChange={(e) => setPrefs({...prefs, distance: parseInt(e.target.value)})}
              className="w-full accent-rose-500 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <button onClick={() => alert("Account deletion requires email confirmation.")} className="w-full py-4 text-red-500 font-bold bg-red-50 rounded-2xl hover:bg-red-100 transition-colors">
            Delete Account
          </button>
        </div>
      );
    }
    
    if (activeModal === "superlikes") {
      return (
        <div className="flex flex-col items-center pt-8">
          <div className="w-32 h-32 bg-blue-50 rounded-full flex items-center justify-center mb-6 shadow-inner">
            <Star className="text-blue-500" size={64} fill="currentColor" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">5 <span className="text-gray-400 text-2xl font-medium">/ 5</span></h2>
          <p className="text-gray-500 font-medium mb-8">Super Likes Available</p>
          
          <div className="w-full bg-white rounded-2xl border border-gray-100 p-6 shadow-sm mb-6 text-center">
            <Zap className="text-amber-500 mx-auto mb-2" size={28} />
            <h4 className="font-bold text-gray-900 mb-1">Refills automatically</h4>
            <p className="text-sm text-gray-500">Your Premium Plus plan gives you 5 Super Likes every 24 hours. Next refill in 11h 23m.</p>
          </div>
          
          <button onClick={() => alert("Payment gateway connection required for additional purchases.")} className="w-full py-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-bold rounded-2xl shadow-lg shadow-blue-200 hover:shadow-xl active:scale-95 transition-all outline-none">
            Buy 10 More for $4.99
          </button>
        </div>
      );
    }
    
    if (activeModal === "safety") {
      return (
        <div className="space-y-4">
          <div className="bg-rose-50 text-rose-800 p-5 rounded-2xl flex items-start gap-4 mb-6">
            <Shield className="shrink-0 text-rose-500 mt-1" size={24} />
            <div>
              <h4 className="font-bold mb-1">Your Safety is Priority</h4>
              <p className="text-sm opacity-90">We do not tolerate bad behavior. Report anyone who makes you uncomfortable.</p>
            </div>
          </div>
          
          <h4 className="font-bold text-gray-400 uppercase tracking-wider text-xs px-2">Tools</h4>
          <button className="w-full bg-white p-4 rounded-xl border border-gray-100 flex justify-between items-center shadow-sm font-bold text-gray-900 hover:bg-gray-50">
            Community Guidelines
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><path d="m9 18 6-6-6-6"/></svg>
          </button>
          <button className="w-full bg-white p-4 rounded-xl border border-gray-100 flex justify-between items-center shadow-sm font-bold text-gray-900 hover:bg-gray-50">
            Safety Tips
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><path d="m9 18 6-6-6-6"/></svg>
          </button>
          
          <h4 className="font-bold text-gray-400 uppercase tracking-wider text-xs px-2 pt-4">Data</h4>
          <button className="w-full bg-white p-4 rounded-xl border border-gray-100 flex justify-between items-center shadow-sm font-bold text-gray-900 hover:bg-gray-50">
            Blocked Contacts <span className="bg-gray-100 text-gray-500 px-2 py-0.5 rounded text-xs ml-auto mr-3">0</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><path d="m9 18 6-6-6-6"/></svg>
          </button>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-full w-full bg-gray-50 flex justify-center overflow-y-auto pt-10 pb-20 relative">
      <div className="w-full max-w-2xl px-6 relative z-10">
        
        {/* Hidden File Input for Avatar */}
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handlePhotoUpload} 
          accept="image/*" 
          className="hidden" 
        />

        {/* Header Profile Info */}
        <div className="bg-white px-8 pt-12 pb-10 rounded-[2.5rem] shadow-sm relative shrink-0 border border-gray-100 flex flex-col items-center z-10">
          <button onClick={() => setActiveModal("settings")} className="absolute top-6 right-6 p-2 text-gray-400 hover:text-gray-900 transition-colors rounded-full hover:bg-gray-50">
            <Settings size={28} />
          </button>

          <div className="relative w-40 h-40 mb-6 group cursor-pointer" onClick={handlePhotoClick}>
            <div className="w-full h-full rounded-full overflow-hidden border-4 border-white shadow-xl relative bg-gray-100">
              <img src={avatarUrl} alt="You" className="w-full h-full object-cover transition-opacity group-hover:opacity-80" />
            </div>
            <button className="absolute bottom-0 right-2 w-12 h-12 bg-rose-500 rounded-full flex items-center justify-center text-white border-4 border-white shadow-md transition-transform group-hover:scale-110 pointer-events-none">
              <Edit3 size={20} />
            </button>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900">{CURRENT_USER.name}, {CURRENT_USER.age}</h1>
          <p className="text-gray-500 mt-2 text-lg font-medium">{CURRENT_USER.location || "City Center"}</p>
        </div>

        {/* Subscription/Premium Banner */}
        <div onClick={() => {
          setShowPremiumToast(true);
          setTimeout(() => setShowPremiumToast(false), 3000);
        }} className="mt-8 shrink-0 relative group cursor-pointer hover:-translate-y-1 transition-all duration-300 z-10">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-400 opacity-50 blur-xl group-hover:opacity-75 transition-opacity rounded-3xl -z-10"></div>
          <div className="bg-gradient-to-r from-amber-500 to-orange-400 rounded-3xl p-6 text-white flex items-center shadow-lg border border-orange-300/50">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mr-6 shrink-0 shadow-inner overflow-hidden relative">
              <Crown size={32} className="text-white drop-shadow-sm z-10" />
              {showPremiumToast && <div className="absolute inset-0 bg-white/40 animate-ping rounded-full z-0" />}
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-xl drop-shadow-sm">Spark Premium <span className="ml-2 uppercase text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-bold tracking-wider relative -top-1">Plus</span></h3>
              <p className={cn("text-white/90 text-sm mt-1 transition-all", showPremiumToast ? "font-bold text-white" : "font-medium")}>
                {showPremiumToast ? "Active! Enjoy your exclusive features." : "See who liked you, send unlimited Super Likes & more!"}
              </p>
            </div>
            {!showPremiumToast && (
              <div className="hidden md:block bg-white text-orange-500 px-6 py-3 rounded-full font-bold shadow-md text-sm ml-4 pointer-events-none">
                Active
              </div>
            )}
          </div>
        </div>

        {/* Menus */}
        <div className="mt-8 space-y-4 z-10 relative">
          <h2 className="text-gray-400 font-bold uppercase tracking-wider text-sm px-2 mb-2">Account Settings</h2>
          <MenuItem onClick={() => setActiveModal("safety")} icon={<Shield className="text-rose-500" size={24} />} title="Safety Center" subtitle="Stay safe on Spark" />
          <MenuItem onClick={() => setActiveModal("superlikes")} icon={<Star className="text-purple-500" size={24} />} title="Super Likes" subtitle="Get more matches" />
          <MenuItem onClick={() => setActiveModal("settings")} icon={<Settings className="text-gray-500" size={24} />} title="Preferences" subtitle="Notifications, discovery settings & matching rules" />
          
          <div className="pt-4">
            <button 
              onClick={handleLogout}
              className="w-full bg-white p-5 rounded-2xl flex items-center justify-center shadow-sm border border-gray-100/50 hover:shadow-md hover:border-red-100 transition-all active:scale-[0.99] outline-none text-red-500 font-bold"
            >
              <LogOut size={20} className="mr-2" />
              Log Out
            </button>
          </div>
        </div>
      </div>

      {/* Floating Bottom Modal System */}
      {activeModal && (
        <div className="fixed inset-x-0 bottom-0 h-[85vh] max-w-2xl mx-auto bg-gray-50 z-[60] rounded-t-[2.5rem] shadow-[0_-10px_40px_rgba(0,0,0,0.15)] flex flex-col overflow-hidden animate-in slide-in-from-bottom-full duration-300">
          <div className="bg-white px-6 py-5 flex items-center justify-between shadow-sm border-b border-gray-100 shrink-0 sticky top-0 z-10">
            <h2 className="text-xl font-bold text-gray-900 capitalize">
              {activeModal === 'settings' ? 'Preferences' : activeModal === 'superlikes' ? 'Super Likes' : 'Safety Center'}
            </h2>
            <button onClick={() => setActiveModal(null)} className="p-2 -mr-2 bg-gray-100 text-gray-500 hover:text-gray-900 rounded-full hover:bg-gray-200 transition-colors">
              <ChevronDown size={24} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-6 scroll-smooth">
            {renderModalContent()}
          </div>
        </div>
      )}
      
      {/* Dimmed Background Overlay */}
      {activeModal && (
        <div 
          className="fixed inset-0 bg-black/30 z-50 animate-in fade-in duration-300 backdrop-blur-sm"
          onClick={() => setActiveModal(null)}
        />
      )}
    </div>
  );
}

function MenuItem({ icon, title, subtitle, onClick }: { icon: React.ReactNode, title: string, subtitle: string, onClick?: () => void }) {
  return (
    <button onClick={onClick} className="w-full bg-white p-5 rounded-2xl flex items-center shadow-sm border border-gray-100/50 hover:shadow-md hover:border-rose-100 transition-all active:scale-[0.99] outline-none text-left group">
      <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center mr-5 shrink-0 group-hover:bg-rose-50 transition-colors">
        {icon}
      </div>
      <div className="flex-1">
        <h4 className="font-bold text-gray-900 text-lg group-hover:text-rose-500 transition-colors">{title}</h4>
        <p className="text-sm text-gray-500 font-medium group-hover:text-gray-600 transition-colors">{subtitle}</p>
      </div>
      <div className="text-gray-300 group-hover:text-rose-300 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
      </div>
    </button>
  );
}

function Toggle({ checked, onChange }: { checked: boolean, onChange: (v: boolean) => void }) {
  return (
    <button 
      onClick={() => onChange(!checked)}
      className={cn(
        "relative w-14 h-8 rounded-full transition-colors shrink-0 outline-none",
        checked ? "bg-rose-500" : "bg-gray-200"
      )}
    >
      <div className={cn(
        "absolute top-1 w-6 h-6 rounded-full bg-white transition-all shadow-sm",
        checked ? "left-7" : "left-1"
      )} />
    </button>
  );
}
