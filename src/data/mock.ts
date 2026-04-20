import type { Profile, Match, Message } from "../types";

export const PROFILES: Profile[] = [
  {
    id: "p1",
    name: "Alex",
    age: 26,
    bio: "Coffee enthusiast and amateur photographer. Looking for someone to explore the city with! 📸☕️",
    distance: 2,
    job: "Graphic Designer",
    location: "Downtown",
    images: ["https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=800&h=1200"],
  },
  {
    id: "p2",
    name: "Sarah",
    age: 24,
    bio: "Dog mom. I probably swiped right for your pet. Let's grab tacos.",
    distance: 5,
    job: "Marketing",
    location: "Westside",
    images: ["https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=800&h=1200"],
  },
  {
    id: "p3",
    name: "Michael",
    age: 28,
    bio: "Tech nerd by day, musician by night. Always down for a live show or a good debate.",
    distance: 1,
    job: "Software Engineer",
    location: "City Center",
    images: ["https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=800&h=1200"],
  },
  {
    id: "p4",
    name: "Jessica",
    age: 27,
    bio: "Yoga, hiking, and brunch. Catch me outside! ☀️",
    distance: 8,
    job: "Instructor",
    location: "North Hills",
    images: ["https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=800&h=1200"],
  },
  {
    id: "p5",
    name: "David",
    age: 30,
    bio: "Love traveling and trying new foods. Just got back from Japan!",
    distance: 12,
    job: "Architect",
    location: "Eastside",
    images: ["https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=800&h=1200"],
  }
];

export const CURRENT_USER: Profile = {
  id: "me",
  name: "You",
  age: 25,
  bio: "Just looking for fun and nice conversations.",
  distance: 0,
  images: ["https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&q=80&w=800&h=1200"]
};

export const INITIAL_MATCHES: Match[] = [
  {
    id: "m1",
    profileId: "p2",
    lastMessage: "Haha that's actually hilarious 😂",
    unreadCount: 1,
    matchedAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: "m2",
    profileId: "p4",
    lastMessage: "Are we still on for tomorrow?",
    unreadCount: 0,
    matchedAt: new Date(Date.now() - 86400000).toISOString(),
  }
];

export const INITIAL_MESSAGES: Record<string, Message[]> = {
  "m1": [
    { id: "msg1", matchId: "m1", senderId: "me", content: "Hey Sarah! Love your dog.", timestamp: new Date(Date.now() - 3000000).toISOString() },
    { id: "msg2", matchId: "m1", senderId: "p2", content: "Thanks! He's a golden retriever.", timestamp: new Date(Date.now() - 2500000).toISOString() },
    { id: "msg3", matchId: "m1", senderId: "me", content: "I've always wanted one. Does he do any tricks?", timestamp: new Date(Date.now() - 2000000).toISOString() },
    { id: "msg4", matchId: "m1", senderId: "p2", content: "Haha that's actually hilarious 😂", timestamp: new Date(Date.now() - 1000000).toISOString() },
  ],
  "m2": [
    { id: "msg5", matchId: "m2", senderId: "p4", content: "Hey! Nice to meet you 😊", timestamp: new Date(Date.now() - 80000000).toISOString() },
    { id: "msg6", matchId: "m2", senderId: "me", content: "Hey Jessica, nice to meet you too! Big fan of hiking as well.", timestamp: new Date(Date.now() - 75000000).toISOString() },
    { id: "msg7", matchId: "m2", senderId: "p4", content: "Are we still on for tomorrow?", timestamp: new Date(Date.now() - 3600000).toISOString() },
  ]
};
