import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PROFILES } from "../data/mock";
import { Heart, X, Info } from "lucide-react";
import { cn } from "../lib/utils";

export default function Discover() {
  const [profiles, setProfiles] = useState(PROFILES);
  const [leaveX, setLeaveX] = useState(0);
  const [feedback, setFeedback] = useState<"LIKED!" | "NOPE" | null>(null);

  const activeIndex = profiles.length - 1;

  const handleSwipe = (direction: 'left' | 'right') => {
    if (profiles.length === 0) return;
    
    setLeaveX(direction === 'right' ? 500 : -500);
    setFeedback(direction === 'right' ? "LIKED!" : "NOPE");
    
    setTimeout(() => {
      setProfiles((prev) => prev.slice(0, -1));
      setLeaveX(0);
      setFeedback(null);
    }, 300);
  };

  const handleDragEnd = (_e: any, info: any) => {
    if (info.offset.x > 100) {
      handleSwipe('right');
    } else if (info.offset.x < -100) {
      handleSwipe('left');
    }
  };

  if (profiles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-gray-50/50 p-6 text-center w-full">
        <div className="w-24 h-24 bg-rose-100 rounded-full flex items-center justify-center mb-6">
          <Heart className="w-10 h-10 text-rose-500 animate-pulse" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">You're all caught up!</h2>
        <p className="text-gray-500 mb-8 max-w-sm">There are no more potential matches in your area right now. Check back later.</p>
        <button 
          onClick={() => setProfiles(PROFILES)}
          className="bg-gradient-to-tr from-rose-500 to-pink-500 text-white font-semibold py-3 px-8 rounded-full shadow-lg shadow-rose-200 active:scale-95 transition-transform"
        >
          Reload Profiles
        </button>
      </div>
    );
  }

  return (
    <div className="h-full w-full relative flex flex-col items-center justify-center bg-gray-50/50 py-10">
      
      {/* Container to restrict max width for extremely large screens */}
      <div className="w-full max-w-md h-full flex flex-col items-center relative">
        
        {/* Cards Area */}
        <div className="flex-1 w-full relative h-[70vh] min-h-[500px]">
          <AnimatePresence>
            {profiles.map((profile, index) => {
              const isActive = index === activeIndex;
              return (
                <motion.div
                  key={profile.id}
                  className={cn(
                    "absolute inset-0 rounded-[2rem] shadow-2xl overflow-hidden bg-white origin-bottom cursor-grab active:cursor-grabbing border border-gray-100",
                    isActive ? "z-20" : "z-10 pointer-events-none"
                  )}
                  initial={false}
                  animate={isActive ? { scale: 1, y: 0, x: 0, rotate: 0 } : { scale: 0.95, y: -25 }}
                  exit={{ x: leaveX, opacity: 0, rotate: leaveX / 20 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  drag={isActive ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  onDragEnd={isActive ? handleDragEnd : undefined}
                >
                  {/* Profile Image */}
                  <div className="w-full h-full relative object-cover bg-gray-200">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                    <img 
                      src={profile.images[0]} 
                      alt={profile.name} 
                      className="w-full h-full object-cover pointer-events-none select-none"
                      draggable="false"
                    />
                    
                    {/* Info Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-8 z-20 text-white pointer-events-none">
                      <div className="flex items-end gap-3 mb-3">
                        <h2 className="text-4xl font-bold tracking-tight">{profile.name}</h2>
                        <span className="text-3xl font-light mb-0.5">{profile.age}</span>
                      </div>
                      
                      {profile.job && (
                        <p className="flex items-center text-white/90 text-base mb-1.5 gap-2 font-medium">
                          <span className="w-5 h-5 bg-white/20 rounded-md flex items-center justify-center text-xs backdrop-blur-sm shadow-sm">💼</span>
                          {profile.job}
                        </p>
                      )}
                      
                      <p className="flex items-center text-white/90 text-base mb-4 gap-2 font-medium">
                        <span className="w-5 h-5 bg-white/20 rounded-md flex items-center justify-center text-xs backdrop-blur-sm shadow-sm">📍</span>
                        {profile.distance} miles away
                      </p>
                      
                      <div className="h-[1px] w-full bg-white/30 my-4"></div>
                      <p className="text-base text-white/90 line-clamp-3 leading-relaxed">{profile.bio}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Feedback Stamp */}
        <AnimatePresence>
          {feedback && (
            <motion.div 
              initial={{ scale: 0.5, opacity: 0, y: -20, rotate: feedback === 'LIKED!' ? -15 : 15 }}
              animate={{ scale: 1, opacity: 1, y: 0, rotate: feedback === 'LIKED!' ? -15 : 15 }}
              exit={{ scale: 1.5, opacity: 0 }}
              className={cn(
                "absolute top-20 z-50 px-8 py-3 rounded-xl border-4 font-black tracking-widest text-4xl shadow-2xl pointer-events-none",
                feedback === 'LIKED!' 
                  ? "border-green-500 text-green-500 bg-green-50/90 rotate-[-15deg]" 
                  : "border-red-500 text-red-500 bg-red-50/90 rotate-[15deg]"
              )}
            >
              {feedback}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Buttons */}
        <div className="flex justify-center items-center gap-8 mt-10 shrink-0 z-30 pointer-events-auto">
          <button 
            onClick={() => handleSwipe('left')}
            className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-xl text-gray-400 hover:text-rose-500 hover:scale-110 active:scale-95 transition-all outline-none border border-gray-100"
          >
            <X size={32} strokeWidth={3} />
          </button>
          
          <button 
            onClick={() => handleSwipe('right')}
            className="w-20 h-20 bg-gradient-to-tr from-rose-500 to-pink-500 rounded-full flex items-center justify-center shadow-xl shadow-rose-200/50 text-white hover:scale-110 active:scale-95 transition-all outline-none"
          >
            <Heart size={36} strokeWidth={2.5} fill="currentColor" />
          </button>

          <button 
            onClick={() => alert("Viewing detailed profile info...")}
            className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-xl text-gray-400 hover:text-blue-500 hover:scale-110 active:scale-95 transition-all outline-none border border-gray-100"
          >
            <Info size={28} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </div>
  );
}
