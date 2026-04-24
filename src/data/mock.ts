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
,
  {
    id: "p6",
    name: "John",
    age: 23,
    bio: "Looking for someone to share pizza and bad movies with.",
    distance: 18,
    job: "Chef",
    location: "North Hills",
    images: ["https://i.pravatar.cc/800?img=7"]
  },
  {
    id: "p7",
    name: "Henry",
    age: 34,
    bio: "Fluent in sarcasm and movie quotes.",
    distance: 19,
    job: "Sales",
    location: "Suburbs",
    images: ["https://i.pravatar.cc/800?img=8"]
  },
  {
    id: "p8",
    name: "Jessica",
    age: 24,
    bio: "Swipe right if you can handle my bad puns.",
    distance: 12,
    job: "Data Scientist",
    location: "City Center",
    images: ["https://i.pravatar.cc/800?img=9"]
  },
  {
    id: "p9",
    name: "Thomas",
    age: 32,
    bio: "Looking for a reason to delete this app.",
    distance: 18,
    job: "Entrepreneur",
    location: "Arts District",
    images: ["https://i.pravatar.cc/800?img=10"]
  },
  {
    id: "p10",
    name: "Margaret",
    age: 26,
    bio: "Fluent in sarcasm and movie quotes.",
    distance: 17,
    job: "Designer",
    location: "Eastside",
    images: ["https://i.pravatar.cc/800?img=11"]
  },
  {
    id: "p11",
    name: "Helen",
    age: 32,
    bio: "Amateur chef and professional wine taster.",
    distance: 16,
    job: "Lawyer",
    location: "City Center",
    images: ["https://i.pravatar.cc/800?img=12"]
  },
  {
    id: "p12",
    name: "Steven",
    age: 22,
    bio: "Let's grab a coffee and see where it goes.",
    distance: 14,
    job: "Lawyer",
    location: "Midtown",
    images: ["https://i.pravatar.cc/800?img=13"]
  },
  {
    id: "p13",
    name: "Janet",
    age: 21,
    bio: "Looking for someone to argue about pizza toppings with.",
    distance: 14,
    job: "Artist",
    location: "South Park",
    images: ["https://i.pravatar.cc/800?img=14"]
  },
  {
    id: "p14",
    name: "Janet",
    age: 33,
    bio: "Introvert but willing to talk about space for hours.",
    distance: 15,
    job: "Student",
    location: "Downtown",
    images: ["https://i.pravatar.cc/800?img=15"]
  },
  {
    id: "p15",
    name: "Andrew",
    age: 23,
    bio: "I make the best tacos. Seriously.",
    distance: 16,
    job: "Data Scientist",
    location: "North Hills",
    images: ["https://i.pravatar.cc/800?img=16"]
  },
  {
    id: "p16",
    name: "Pamela",
    age: 23,
    bio: "Amateur chef and professional wine taster.",
    distance: 18,
    job: "Designer",
    location: "North Hills",
    images: ["https://i.pravatar.cc/800?img=17"]
  },
  {
    id: "p17",
    name: "George",
    age: 22,
    bio: "I probably love your dog more than you do.",
    distance: 5,
    job: "Musician",
    location: "City Center",
    images: ["https://i.pravatar.cc/800?img=18"]
  },
  {
    id: "p18",
    name: "Anna",
    age: 25,
    bio: "Just moved to the city! Show me the best spots.",
    distance: 16,
    job: "Accountant",
    location: "North Hills",
    images: ["https://i.pravatar.cc/800?img=19"]
  },
  {
    id: "p19",
    name: "Debra",
    age: 29,
    bio: "Music lover. Catch me at the nearest concert.",
    distance: 2,
    job: "Sales",
    location: "South Park",
    images: ["https://i.pravatar.cc/800?img=20"]
  },
  {
    id: "p20",
    name: "Rebecca",
    age: 29,
    bio: "I probably love your dog more than you do.",
    distance: 4,
    job: "Doctor",
    location: "Harbor District",
    images: ["https://i.pravatar.cc/800?img=21"]
  },
  {
    id: "p21",
    name: "Martha",
    age: 24,
    bio: "Introvert but willing to talk about space for hours.",
    distance: 17,
    job: "Musician",
    location: "City Center",
    images: ["https://i.pravatar.cc/800?img=22"]
  },
  {
    id: "p22",
    name: "Kenneth",
    age: 26,
    bio: "Coffee addict and book lover. Always down for a chat about the universe.",
    distance: 17,
    job: "Marketing Manager",
    location: "Eastside",
    images: ["https://i.pravatar.cc/800?img=23"]
  },
  {
    id: "p23",
    name: "Patricia",
    age: 36,
    bio: "Looking for someone to share pizza and bad movies with.",
    distance: 16,
    job: "Musician",
    location: "Suburbs",
    images: ["https://i.pravatar.cc/800?img=24"]
  },
  {
    id: "p24",
    name: "Ruth",
    age: 39,
    bio: "Software engineer by day, musician by night.",
    distance: 4,
    job: "Entrepreneur",
    location: "Uptown",
    images: ["https://i.pravatar.cc/800?img=25"]
  },
  {
    id: "p25",
    name: "Jessica",
    age: 29,
    bio: "Amateur chef and professional wine taster.",
    distance: 9,
    job: "Artist",
    location: "Harbor District",
    images: ["https://i.pravatar.cc/800?img=26"]
  },
  {
    id: "p26",
    name: "Christopher",
    age: 35,
    bio: "Dog person. If you have a puppy, I will swipe right.",
    distance: 7,
    job: "Entrepreneur",
    location: "Harbor District",
    images: ["https://i.pravatar.cc/800?img=27"]
  },
  {
    id: "p27",
    name: "Martha",
    age: 25,
    bio: "I make the best tacos. Seriously.",
    distance: 13,
    job: "Entrepreneur",
    location: "Westside",
    images: ["https://i.pravatar.cc/800?img=28"]
  },
  {
    id: "p28",
    name: "Debra",
    age: 26,
    bio: "Coffee addict and book lover. Always down for a chat about the universe.",
    distance: 19,
    job: "Software Engineer",
    location: "Eastside",
    images: ["https://i.pravatar.cc/800?img=29"]
  },
  {
    id: "p29",
    name: "Matthew",
    age: 30,
    bio: "Let's grab a coffee and see where it goes.",
    distance: 8,
    job: "Student",
    location: "North Hills",
    images: ["https://i.pravatar.cc/800?img=30"]
  },
  {
    id: "p30",
    name: "Walter",
    age: 24,
    bio: "Dog person. If you have a puppy, I will swipe right.",
    distance: 6,
    job: "Software Engineer",
    location: "Eastside",
    images: ["https://i.pravatar.cc/800?img=31"]
  },
  {
    id: "p31",
    name: "Brian",
    age: 29,
    bio: "Let's grab a coffee and see where it goes.",
    distance: 19,
    job: "Chef",
    location: "South Park",
    images: ["https://i.pravatar.cc/800?img=32"]
  },
  {
    id: "p32",
    name: "Helen",
    age: 28,
    bio: "Coffee addict and book lover. Always down for a chat about the universe.",
    distance: 3,
    job: "Data Scientist",
    location: "City Center",
    images: ["https://i.pravatar.cc/800?img=33"]
  },
  {
    id: "p33",
    name: "Michael",
    age: 36,
    bio: "Just moved to the city! Show me the best spots.",
    distance: 15,
    job: "Marketing Manager",
    location: "Suburbs",
    images: ["https://i.pravatar.cc/800?img=34"]
  },
  {
    id: "p34",
    name: "Joshua",
    age: 26,
    bio: "Just looking for my partner in crime. Love traveling and good food.",
    distance: 1,
    job: "Architect",
    location: "Suburbs",
    images: ["https://i.pravatar.cc/800?img=35"]
  },
  {
    id: "p35",
    name: "Timothy",
    age: 22,
    bio: "Lover of the outdoors and cozy nights in.",
    distance: 10,
    job: "Nurse",
    location: "Harbor District",
    images: ["https://i.pravatar.cc/800?img=36"]
  },
  {
    id: "p36",
    name: "William",
    age: 28,
    bio: "Swipe right if you can handle my bad puns.",
    distance: 8,
    job: "Software Engineer",
    location: "North Hills",
    images: ["https://i.pravatar.cc/800?img=37"]
  },
  {
    id: "p37",
    name: "Kenneth",
    age: 37,
    bio: "Fluent in sarcasm and movie quotes.",
    distance: 16,
    job: "Consultant",
    location: "Westside",
    images: ["https://i.pravatar.cc/800?img=38"]
  },
  {
    id: "p38",
    name: "Dennis",
    age: 32,
    bio: "Tech nerd, gamer, and weekend hiker.",
    distance: 20,
    job: "Nurse",
    location: "Midtown",
    images: ["https://i.pravatar.cc/800?img=39"]
  },
  {
    id: "p39",
    name: "William",
    age: 37,
    bio: "Gym, eat, sleep, repeat. Looking for a workout buddy.",
    distance: 2,
    job: "Sales",
    location: "Eastside",
    images: ["https://i.pravatar.cc/800?img=40"]
  },
  {
    id: "p40",
    name: "Frank",
    age: 24,
    bio: "Let's grab a coffee and see where it goes.",
    distance: 4,
    job: "Doctor",
    location: "North Hills",
    images: ["https://i.pravatar.cc/800?img=41"]
  },
  {
    id: "p41",
    name: "Walter",
    age: 35,
    bio: "Coffee addict and book lover. Always down for a chat about the universe.",
    distance: 13,
    job: "Sales",
    location: "Eastside",
    images: ["https://i.pravatar.cc/800?img=42"]
  },
  {
    id: "p42",
    name: "Diane",
    age: 33,
    bio: "Lover of the outdoors and cozy nights in.",
    distance: 11,
    job: "Designer",
    location: "City Center",
    images: ["https://i.pravatar.cc/800?img=43"]
  },
  {
    id: "p43",
    name: "Thomas",
    age: 33,
    bio: "Looking for someone to share pizza and bad movies with.",
    distance: 20,
    job: "Writer",
    location: "Midtown",
    images: ["https://i.pravatar.cc/800?img=44"]
  },
  {
    id: "p44",
    name: "Stephanie",
    age: 26,
    bio: "Dog person. If you have a puppy, I will swipe right.",
    distance: 18,
    job: "Entrepreneur",
    location: "Arts District",
    images: ["https://i.pravatar.cc/800?img=45"]
  },
  {
    id: "p45",
    name: "Donna",
    age: 21,
    bio: "I probably love your dog more than you do.",
    distance: 13,
    job: "Writer",
    location: "Suburbs",
    images: ["https://i.pravatar.cc/800?img=46"]
  },
  {
    id: "p46",
    name: "Dennis",
    age: 26,
    bio: "Swipe right if you can handle my bad puns.",
    distance: 7,
    job: "Designer",
    location: "Harbor District",
    images: ["https://i.pravatar.cc/800?img=47"]
  },
  {
    id: "p47",
    name: "Nancy",
    age: 39,
    bio: "Looking for someone to share pizza and bad movies with.",
    distance: 18,
    job: "Lawyer",
    location: "Eastside",
    images: ["https://i.pravatar.cc/800?img=48"]
  },
  {
    id: "p48",
    name: "Timothy",
    age: 20,
    bio: "Lover of the outdoors and cozy nights in.",
    distance: 12,
    job: "Entrepreneur",
    location: "North Hills",
    images: ["https://i.pravatar.cc/800?img=49"]
  },
  {
    id: "p49",
    name: "Marie",
    age: 36,
    bio: "Looking for a reason to delete this app.",
    distance: 19,
    job: "Nurse",
    location: "Westside",
    images: ["https://i.pravatar.cc/800?img=50"]
  },
  {
    id: "p50",
    name: "Eric",
    age: 35,
    bio: "Tech nerd, gamer, and weekend hiker.",
    distance: 14,
    job: "Musician",
    location: "Midtown",
    images: ["https://i.pravatar.cc/800?img=51"]
  },
  {
    id: "p51",
    name: "Christopher",
    age: 33,
    bio: "Looking for someone to argue about pizza toppings with.",
    distance: 11,
    job: "Designer",
    location: "Uptown",
    images: ["https://i.pravatar.cc/800?img=52"]
  },
  {
    id: "p52",
    name: "Shirley",
    age: 39,
    bio: "Tech nerd, gamer, and weekend hiker.",
    distance: 17,
    job: "Sales",
    location: "Midtown",
    images: ["https://i.pravatar.cc/800?img=53"]
  },
  {
    id: "p53",
    name: "Frances",
    age: 36,
    bio: "Introvert but willing to talk about space for hours.",
    distance: 5,
    job: "Chef",
    location: "North Hills",
    images: ["https://i.pravatar.cc/800?img=54"]
  },
  {
    id: "p54",
    name: "Karen",
    age: 27,
    bio: "Coffee addict and book lover. Always down for a chat about the universe.",
    distance: 18,
    job: "Chef",
    location: "City Center",
    images: ["https://i.pravatar.cc/800?img=55"]
  },
  {
    id: "p55",
    name: "Virginia",
    age: 22,
    bio: "Fluent in sarcasm and movie quotes.",
    distance: 9,
    job: "Chef",
    location: "Harbor District",
    images: ["https://i.pravatar.cc/800?img=56"]
  },
  {
    id: "p56",
    name: "Helen",
    age: 24,
    bio: "Just wandering through life with a smile.",
    distance: 19,
    job: "Software Engineer",
    location: "Arts District",
    images: ["https://i.pravatar.cc/800?img=57"]
  },
  {
    id: "p57",
    name: "Rebecca",
    age: 39,
    bio: "Fluent in sarcasm and movie quotes.",
    distance: 2,
    job: "Musician",
    location: "Uptown",
    images: ["https://i.pravatar.cc/800?img=58"]
  },
  {
    id: "p58",
    name: "James",
    age: 35,
    bio: "Dog person. If you have a puppy, I will swipe right.",
    distance: 19,
    job: "Chef",
    location: "Westside",
    images: ["https://i.pravatar.cc/800?img=59"]
  },
  {
    id: "p59",
    name: "Joshua",
    age: 22,
    bio: "I make the best tacos. Seriously.",
    distance: 10,
    job: "Barista",
    location: "South Park",
    images: ["https://i.pravatar.cc/800?img=60"]
  },
  {
    id: "p60",
    name: "Paul",
    age: 37,
    bio: "I make the best tacos. Seriously.",
    distance: 9,
    job: "Sales",
    location: "Downtown",
    images: ["https://i.pravatar.cc/800?img=61"]
  },
  {
    id: "p61",
    name: "Raymond",
    age: 38,
    bio: "Just looking for my partner in crime. Love traveling and good food.",
    distance: 1,
    job: "Artist",
    location: "Harbor District",
    images: ["https://i.pravatar.cc/800?img=62"]
  },
  {
    id: "p62",
    name: "Mary",
    age: 23,
    bio: "Tech nerd, gamer, and weekend hiker.",
    distance: 16,
    job: "Marketing Manager",
    location: "Eastside",
    images: ["https://i.pravatar.cc/800?img=63"]
  },
  {
    id: "p63",
    name: "Martha",
    age: 31,
    bio: "Just moved to the city! Show me the best spots.",
    distance: 1,
    job: "Writer",
    location: "South Park",
    images: ["https://i.pravatar.cc/800?img=64"]
  },
  {
    id: "p64",
    name: "Sandra",
    age: 23,
    bio: "Gym, eat, sleep, repeat. Looking for a workout buddy.",
    distance: 19,
    job: "Doctor",
    location: "Arts District",
    images: ["https://i.pravatar.cc/800?img=65"]
  },
  {
    id: "p65",
    name: "Karen",
    age: 28,
    bio: "I probably love your dog more than you do.",
    distance: 16,
    job: "Consultant",
    location: "Downtown",
    images: ["https://i.pravatar.cc/800?img=66"]
  },
  {
    id: "p66",
    name: "Richard",
    age: 30,
    bio: "Just wandering through life with a smile.",
    distance: 20,
    job: "Writer",
    location: "Arts District",
    images: ["https://i.pravatar.cc/800?img=67"]
  },
  {
    id: "p67",
    name: "Lisa",
    age: 27,
    bio: "Looking for someone to share pizza and bad movies with.",
    distance: 19,
    job: "Nurse",
    location: "Arts District",
    images: ["https://i.pravatar.cc/800?img=68"]
  },
  {
    id: "p68",
    name: "Frank",
    age: 38,
    bio: "Tech nerd, gamer, and weekend hiker.",
    distance: 13,
    job: "Artist",
    location: "Eastside",
    images: ["https://i.pravatar.cc/800?img=69"]
  },
  {
    id: "p69",
    name: "Kevin",
    age: 30,
    bio: "Software engineer by day, musician by night.",
    distance: 12,
    job: "Nurse",
    location: "Eastside",
    images: ["https://i.pravatar.cc/800?img=70"]
  },
  {
    id: "p70",
    name: "Janet",
    age: 31,
    bio: "Dog person. If you have a puppy, I will swipe right.",
    distance: 15,
    job: "Designer",
    location: "Harbor District",
    images: ["https://i.pravatar.cc/800?img=1"]
  },
  {
    id: "p71",
    name: "Kevin",
    age: 26,
    bio: "Just looking for my partner in crime. Love traveling and good food.",
    distance: 8,
    job: "Consultant",
    location: "Harbor District",
    images: ["https://i.pravatar.cc/800?img=2"]
  },
  {
    id: "p72",
    name: "Ann",
    age: 30,
    bio: "Looking for someone to share pizza and bad movies with.",
    distance: 5,
    job: "Photographer",
    location: "Midtown",
    images: ["https://i.pravatar.cc/800?img=3"]
  },
  {
    id: "p73",
    name: "Carl",
    age: 33,
    bio: "Looking for someone to share pizza and bad movies with.",
    distance: 7,
    job: "Teacher",
    location: "Midtown",
    images: ["https://i.pravatar.cc/800?img=4"]
  },
  {
    id: "p74",
    name: "Nancy",
    age: 24,
    bio: "Fluent in sarcasm and movie quotes.",
    distance: 4,
    job: "Accountant",
    location: "South Park",
    images: ["https://i.pravatar.cc/800?img=5"]
  },
  {
    id: "p75",
    name: "Marie",
    age: 22,
    bio: "Software engineer by day, musician by night.",
    distance: 20,
    job: "Artist",
    location: "Downtown",
    images: ["https://i.pravatar.cc/800?img=6"]
  },
  {
    id: "p76",
    name: "Peter",
    age: 34,
    bio: "Coffee addict and book lover. Always down for a chat about the universe.",
    distance: 16,
    job: "Student",
    location: "Westside",
    images: ["https://i.pravatar.cc/800?img=7"]
  },
  {
    id: "p77",
    name: "Donna",
    age: 35,
    bio: "Lover of the outdoors and cozy nights in.",
    distance: 11,
    job: "Teacher",
    location: "North Hills",
    images: ["https://i.pravatar.cc/800?img=8"]
  },
  {
    id: "p78",
    name: "Donald",
    age: 27,
    bio: "Amateur chef and professional wine taster.",
    distance: 16,
    job: "Consultant",
    location: "City Center",
    images: ["https://i.pravatar.cc/800?img=9"]
  },
  {
    id: "p79",
    name: "Joshua",
    age: 33,
    bio: "Dog person. If you have a puppy, I will swipe right.",
    distance: 11,
    job: "Marketing Manager",
    location: "City Center",
    images: ["https://i.pravatar.cc/800?img=10"]
  },
  {
    id: "p80",
    name: "Karen",
    age: 23,
    bio: "Looking for someone to argue about pizza toppings with.",
    distance: 6,
    job: "Accountant",
    location: "Arts District",
    images: ["https://i.pravatar.cc/800?img=11"]
  },
  {
    id: "p81",
    name: "Patrick",
    age: 37,
    bio: "Swipe right if you can handle my bad puns.",
    distance: 5,
    job: "Writer",
    location: "Uptown",
    images: ["https://i.pravatar.cc/800?img=12"]
  },
  {
    id: "p82",
    name: "Helen",
    age: 20,
    bio: "I make the best tacos. Seriously.",
    distance: 7,
    job: "Chef",
    location: "South Park",
    images: ["https://i.pravatar.cc/800?img=13"]
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

export const addMatch = (profileId: string) => {
  // Prevent duplicate matches
  if (INITIAL_MATCHES.find(m => m.profileId === profileId)) return;
  
  const newMatchId = 'm' + Date.now();
  INITIAL_MATCHES.unshift({
    id: newMatchId,
    profileId,
    lastMessage: "You are now connected!",
    unreadCount: 0,
    matchedAt: new Date().toISOString()
  });
  INITIAL_MESSAGES[newMatchId] = [
    {
      id: 'sys_' + Date.now(),
      matchId: newMatchId,
      senderId: 'sys', // System message
      content: "You are now connected! Say hi.",
      timestamp: new Date().toISOString()
    }
  ];
};
