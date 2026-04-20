export interface Profile {
  id: string;
  name: string;
  age: number;
  bio: string;
  distance: number; // in miles/km
  images: string[];
  job?: string;
  location?: string;
}

export interface Match {
  id: string;
  profileId: string;
  lastMessage?: string;
  unreadCount: number;
  matchedAt: string;
}

export interface Message {
  id: string;
  matchId: string;
  senderId: string; // 'me' or profileId
  content: string;
  timestamp: string;
}
