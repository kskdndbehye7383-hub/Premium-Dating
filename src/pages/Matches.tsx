import { Link, Outlet, useLocation } from "react-router-dom";
import { INITIAL_MATCHES, PROFILES } from "../data/mock";
import { cn } from "../lib/utils";

export default function Matches() {
  const newMatches = INITIAL_MATCHES.filter(m => m.unreadCount === 0);
  const messages = INITIAL_MATCHES.filter(m => m.unreadCount > 0 || m.lastMessage);
  const location = useLocation();

  return (
    <div className="h-full w-full flex overflow-hidden bg-white">
      {/* Sidebar List */}
      <div className="w-80 border-r border-gray-100 flex flex-col shrink-0">
        <div className="p-6 pb-2">
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-pink-500">
            Messages
          </h1>
        </div>

        <div className="flex-1 overflow-y-auto no-scrollbar">
          {/* New Matches Row */}
          <div className="mb-6 mt-4">
            <h2 className="text-rose-500 font-semibold text-xs px-6 uppercase tracking-wider mb-4">New Matches</h2>
            <div className="flex px-6 gap-4 overflow-x-auto no-scrollbar pb-2">
              {newMatches.map(match => {
                const profile = PROFILES.find(p => p.id === match.profileId);
                if (!profile) return null;
                
                return (
                  <Link to={`/matches/chat/${match.id}`} key={match.id} className="flex flex-col items-center gap-2 min-w-[64px]">
                    <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-rose-500 p-[2px] transition-transform hover:scale-105 active:scale-95">
                      <img src={profile.images[0]} alt={profile.name} className="w-full h-full object-cover rounded-full" />
                    </div>
                    <span className="text-xs font-medium text-gray-700 truncate w-full text-center">{profile.name}</span>
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Messages List */}
          <div>
            <h2 className="text-rose-500 font-semibold text-xs px-6 uppercase tracking-wider mb-2">Conversations</h2>
            <div className="flex flex-col">
              {messages.map(match => {
                const profile = PROFILES.find(p => p.id === match.profileId);
                if (!profile) return null;
                
                const isActive = location.pathname === `/matches/chat/${match.id}`;

                return (
                  <Link 
                    to={`/matches/chat/${match.id}`} 
                    key={match.id}
                    className={cn(
                      "flex items-center px-6 py-4 transition-colors border-l-4",
                      isActive 
                        ? "bg-rose-50/50 border-rose-500" 
                        : "hover:bg-gray-50 border-transparent"
                    )}
                  >
                    <div className="relative w-12 h-12 shrink-0 mr-4">
                      <img src={profile.images[0]} alt={profile.name} className="w-full h-full object-cover rounded-full" />
                      {match.unreadCount > 0 && (
                        <div className="absolute top-0 right-0 w-3 h-3 bg-rose-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 truncate">{profile.name}</h3>
                      <p className={cn(
                        "text-sm truncate mt-0.5",
                        match.unreadCount > 0 ? 'text-gray-900 font-medium' : 'text-gray-500'
                      )}>
                        {match.lastMessage}
                      </p>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Main Chat Area Route Outlet */}
      <div className="flex-1 overflow-hidden bg-gray-50">
        <Outlet />
      </div>
    </div>
  );
}
