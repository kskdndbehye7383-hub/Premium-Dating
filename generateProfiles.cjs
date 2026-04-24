const fs = require('fs');
const path = require('path');

const firstNamesMale = ["James", "John", "Robert", "Michael", "William", "David", "Richard", "Charles", "Joseph", "Thomas", "Christopher", "Daniel", "Paul", "Mark", "Donald", "George", "Kenneth", "Steven", "Edward", "Brian", "Ronald", "Anthony", "Kevin", "Jason", "Matthew", "Gary", "Timothy", "Jose", "Larry", "Jeffrey", "Frank", "Scott", "Eric", "Stephen", "Andrew", "Raymond", "Gregory", "Joshua", "Jerry", "Dennis", "Walter", "Patrick", "Peter", "Harold", "Douglas", "Henry", "Carl", "Arthur", "Ryan", "Roger"];
const firstNamesFemale = ["Mary", "Patricia", "Linda", "Barbara", "Elizabeth", "Jennifer", "Maria", "Susan", "Margaret", "Dorothy", "Lisa", "Nancy", "Karen", "Betty", "Helen", "Sandra", "Donna", "Carol", "Ruth", "Sharon", "Michelle", "Laura", "Sarah", "Kimberly", "Deborah", "Jessica", "Shirley", "Cynthia", "Angela", "Melissa", "Brenda", "Amy", "Anna", "Rebecca", "Virginia", "Kathleen", "Pamela", "Martha", "Debra", "Amanda", "Stephanie", "Carolyn", "Christine", "Marie", "Janet", "Catherine", "Frances", "Ann", "Joyce", "Diane"];

const bios = [
  "Just looking for my partner in crime. Love traveling and good food.",
  "Dog person. If you have a puppy, I will swipe right.",
  "Coffee addict and book lover. Always down for a chat about the universe.",
  "Looking for someone to share pizza and bad movies with.",
  "Adventure seeker. Next trip: Tokyo! Let's go together.",
  "Tech nerd, gamer, and weekend hiker.",
  "I probably love your dog more than you do.",
  "Just moved to the city! Show me the best spots.",
  "Gym, eat, sleep, repeat. Looking for a workout buddy.",
  "I make the best tacos. Seriously.",
  "Amateur chef and professional wine taster.",
  "Music lover. Catch me at the nearest concert.",
  "Fluent in sarcasm and movie quotes.",
  "Looking for a reason to delete this app.",
  "Swipe right if you can handle my bad puns.",
  "Let's grab a coffee and see where it goes.",
  "Introvert but willing to talk about space for hours.",
  "Lover of the outdoors and cozy nights in.",
  "Software engineer by day, musician by night.",
  "Just wandering through life with a smile.",
  "Looking for someone to argue about pizza toppings with."
];

const jobs = [
  "Software Engineer", "Designer", "Teacher", "Doctor", "Nurse", "Marketing Manager", "Sales", "Entrepreneur", "Photographer", "Chef", "Accountant", "Lawyer", "Architect", "Consultant", "Student", "Barista", "Musician", "Artist", "Writer", "Data Scientist"
];

const locations = [
  "Downtown", "Westside", "Eastside", "North Hills", "City Center", "Uptown", "Midtown", "South Park", "Harbor District", "Arts District", "Suburbs"
];

const newProfiles = [];

for (let i = 6; i <= 82; i++) {
  const isMale = Math.random() > 0.5;
  const nameArray = isMale ? firstNamesMale : firstNamesFemale;
  const name = nameArray[Math.floor(Math.random() * nameArray.length)];
  const age = Math.floor(Math.random() * 20) + 20; // 20 to 39
  const bio = bios[Math.floor(Math.random() * bios.length)];
  const distance = Math.floor(Math.random() * 20) + 1; // 1 to 20
  const job = jobs[Math.floor(Math.random() * jobs.length)];
  const location = locations[Math.floor(Math.random() * locations.length)];
  const genderStr = isMale ? "men" : "women";
  const imageNum = (i % 70) + 1; // 1 to 70 for pravatar
  const imageUrl = `https://i.pravatar.cc/800?img=${imageNum}`;

  newProfiles.push({
    id: `p${i}`,
    name,
    age,
    bio,
    distance,
    job,
    location,
    images: [imageUrl]
  });
}

// Write to raw string for insertion
const profilesString = newProfiles.map(p => {
  return `  {
    id: "${p.id}",
    name: "${p.name}",
    age: ${p.age},
    bio: "${p.bio}",
    distance: ${p.distance},
    job: "${p.job}",
    location: "${p.location}",
    images: ["${p.images[0]}"]
  }`;
}).join(",\n");

const filePath = path.join(__dirname, 'src/data/mock.ts');
let fileContent = fs.readFileSync(filePath, 'utf8');

// Find the end of the existing PROFILES array
// It looks like:
// export const PROFILES: Profile[] = [
// ...
// ];

const insertIndex = fileContent.indexOf('];', fileContent.indexOf('export const PROFILES'));
if (insertIndex !== -1) {
    const updatedContent = fileContent.slice(0, insertIndex) + ',\\n' + profilesString + '\\n' + fileContent.slice(insertIndex);
    fs.writeFileSync(filePath, updatedContent);
    console.log('Added 77 profiles successfully');
} else {
    console.log('Could not find PROFILES array');
}
