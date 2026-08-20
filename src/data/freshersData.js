/**
 * Freshers & New Students Guide Dataset
 * NIT Silchar Campus Guide & Emergency Contacts
 */

export const EMERGENCY_CONTACTS = [
  {
    id: "ambulance-nits",
    name: "Ambulance NITS",
    number: "9678780002",
    displayNumber: "+91 96787 80002",
    type: "emergency",
    badge: "24/7 Primary Ambulance",
    description: "Main NIT Silchar campus emergency ambulance service.",
    icon: "🚑",
    color: "#EF4444",
  },
  {
    id: "ambulance-2",
    name: "Ambulance 2",
    number: "9678780007",
    displayNumber: "+91 96787 80007",
    type: "emergency",
    badge: "Emergency Backup",
    description: "Secondary campus medical emergency ambulance.",
    icon: "🚨",
    color: "#F87171",
  },
  {
    id: "ambulance-mini",
    name: "New Mini Ambulance",
    number: "8610038097",
    displayNumber: "+91 86100 38097",
    type: "emergency",
    badge: "Quick Response",
    description: "Mini ambulance unit for rapid emergency response across campus corridors.",
    icon: "🚐",
    color: "#FB923C",
  },
];

export const TRANSPORT_CONTACTS = [
  {
    id: "bahubali-golfcart",
    name: "Bahubali Golfcart",
    number: "7086833566",
    displayNumber: "+91 70868 33566",
    type: "transport",
    badge: "Internal Transit",
    description: "Campus electric golf cart service for fast transit between departments and hostels.",
    icon: "🛺",
    color: "#10B981",
  },
  {
    id: "bahubali-tomtom-1",
    name: "Bahubali Tomtom",
    number: "9531019037",
    displayNumber: "+91 95310 19037",
    type: "transport",
    badge: "E-Rickshaw 1",
    description: "Campus e-rickshaw / Tomtom service across internal campus routes.",
    icon: "⚡",
    color: "#06B6D4",
  },
  {
    id: "bahubali-tomtom-2",
    name: "Bahubali Tomtom 2",
    number: "6000247272",
    displayNumber: "+91 60002 47272",
    type: "transport",
    badge: "E-Rickshaw 2",
    description: "Campus e-rickshaw / Tomtom transit unit 2.",
    icon: "⚡",
    color: "#38BDF8",
  },
];

export const FOOD_AND_SERVICES = [
  {
    id: "city-dhaba",
    name: "City Dhaba",
    number: "9954351374",
    displayNumber: "+91 99543 51374",
    category: "Food & Dhaba",
    badge: "Nearby Food",
    description: "Popular food & meal ordering point for students outside/near campus.",
    mapLocationId: "city-dhaba",
    icon: "🍲",
    color: "#F59E0B",
  },
  {
    id: "bishal-dhaba",
    name: "Bishal Dhaba",
    number: "8473922609",
    displayNumber: "+91 84739 22609",
    category: "Food & Dhaba",
    badge: "Nearby Food",
    description: "Favorite student dhaba offering meals, dinner, and late-evening dining.",
    mapLocationId: "bishal-dhaba",
    icon: "🍛",
    color: "#EA580C",
  },
  {
    id: "nit-cake-shop",
    name: "NIT Cake Shop (FPS)",
    number: "9954774490",
    displayNumber: "+91 99547 74490",
    category: "Bakery & Desserts",
    badge: "FPS Market Complex",
    description: "Cakes, birthday celebrations, pastries, and snacks located at the campus FPS market.",
    mapLocationId: "fps-market",
    icon: "🎂",
    color: "#EC4899",
  },
  {
    id: "barber-shop",
    name: "Barber Shop (FPS)",
    number: "9954083658",
    displayNumber: "+91 99540 83658",
    category: "Grooming & Haircut",
    badge: "FPS Market Complex",
    description: "Campus hair salon and grooming services located in the Fair Price Shop market complex.",
    mapLocationId: "fps-market",
    icon: "✂️",
    color: "#8B5CF6",
  },
];

// Extensible list for future Auto-rickshaw contacts
export const AUTO_CONTACTS = [
  // Additional auto-rickshaw contacts can be easily added here
];

export const STUDENT_VENTURES = [
  {
    id: "egnotus",
    name: "Egnotus",
    tagline: "3D Printing & Rapid Prototyping",
    badge: "Student Tech Service",
    contactPerson: "Muaz",
    number: "6900973276",
    displayNumber: "+91 69009 73276",
    email: "egnotus@gmail.com",
    instagram: "https://www.instagram.com/_egnotus_?igsh=eDB5bDcxa25ycTFk&utm_source=qr",
    instagramHandle: "@_egnotus_",
    website: "https://egnotus.netlify.app/",
    websiteDisplay: "egnotus.netlify.app",
    description: "3D printing of any model available! Single colour models available now, multi-colour coming soon. Perfect for robotics, engineering projects, hobby miniatures, and custom models. (T&C Applied).",
    tags: ["3D Printing", "Any CAD Model", "Single Colour", "Multi-Colour Soon", "Robotics & Projects"],
    icon: "🖨️",
    accent: "#06B6D4",
  },
];

export const FIRST_YEAR_DRIVES = [
  {
    id: "ug-first-year-materials",
    name: "UG First Year Study Materials",
    url: "https://drive.google.com/drive/folders/1e-ZdRpMCw9i5fI86YcFxG9JQ4otJTMxX",
    badge: "Batch Drive Vault",
    type: "Google Drive Folder",
    description: "Curated 1st year subjects, lecture presentations, textbooks, and tutorial problem sheets.",
    tags: ["1st Year", "Class Notes", "Tutorials", "Textbooks"],
    icon: "📂",
    accent: "#10B981",
  },
  {
    id: "ug-first-year-archive-2",
    name: "UG First Year Academic Drive (Archive 2)",
    url: "https://drive.google.com/drive/folders/1QOg5jkxjfCZOqt2fztSv8q_uGHx80sUZ",
    badge: "Shared Drive Archive",
    type: "Google Drive Folder",
    description: "Comprehensive supplementary materials, solved assignments, lab manuals, and exam prep.",
    tags: ["Lab Manuals", "Assignments", "Slides", "PYQs"],
    icon: "📁",
    accent: "#F59E0B",
  },
  {
    id: "ug-first-year-resource-hub",
    name: "1st Year Resource Hub",
    url: "https://drive.google.com/drive/folders/1cwgu0CLySUpJP4vaGpxe72URj692q4e1",
    badge: "Central Resource Hub",
    type: "Google Drive Folder",
    description: "Central repository containing subject folders, question banks, handwritten notes, and reference books.",
    tags: ["Resource Hub", "Question Banks", "Handwritten Notes", "All Branches"],
    icon: "🗂️",
    accent: "#38BDF8",
  },
];

export const STUDY_PLATFORMS = [
  {
    id: "algonotes",
    name: "AlgoNotes",
    url: "https://algonotes.in/",
    type: "Coding Notes Workspace",
    badge: "DSA & Interview Prep",
    description: "Get interview-ready faster with ALGONOTES. Turn coding problems and theory topics into polished revision notes with a clean workflow, readable formatting, and fast revisit support.",
    tags: ["DSA Revision", "Coding Notes", "Interview Ready", "Theory & Practice"],
    icon: "⚡",
    accent: "#10B981",
  },
  {
    id: "cse23",
    name: "CSE23",
    url: "https://cse23.xyz/",
    type: "External Student Portal",
    badge: "Notes & Archives",
    description: "Comprehensive student-curated academic repository with semester notes, slides, and subject resources.",
    tags: ["Notes", "Semester Prep", "Syllabus", "Slides"],
    icon: "💻",
    accent: "#38BDF8",
  },
  {
    id: "insight-study",
    name: "InsightStudy",
    url: "https://insightstudy.in/",
    type: "Academic & Exam Hub",
    badge: "PYQ & Materials",
    description: "Dedicated study portal offering course notes, previous year question papers, and study guides.",
    tags: ["PYQs", "Subject Notes", "Exam Guides", "Resources"],
    icon: "📖",
    accent: "#A855F7",
  },
];

export const STUDY_CATEGORIES = [
  {
    title: "Study Materials & Notes",
    icon: "📚",
    desc: "Classroom lecture slides, faculty reference notes, and curated PDFs shared across departments.",
  },
  {
    title: "Previous Year Questions (PYQs)",
    icon: "📝",
    desc: "Mid-semester and End-semester examination archives to understand question patterns and topics.",
  },
  {
    title: "Programming & DSA",
    icon: "⚡",
    desc: "Data Structures & Algorithms roadmaps, C/C++, Java, Python practice, and algorithmic fundamentals.",
  },
  {
    title: "Competitive Programming (CP)",
    icon: "🏆",
    desc: "Contest preparation on platforms like Codeforces, LeetCode, CodeChef, and AtCoder.",
  },
  {
    title: "Placement Preparation",
    icon: "💼",
    desc: "Core engineering, CS fundamentals (OS, DBMS, CN, OOPS), system design, and mock interview guides.",
  },
];

export const HACKATHON_PLATFORMS = [
  {
    name: "Unstop",
    url: "https://unstop.com/",
    desc: "Premier platform for national college hackathons, hiring challenges, quizzes, and case competitions.",
    badge: "Competitions & Hiring",
    icon: "🚀",
  },
  {
    name: "Devfolio",
    url: "https://devfolio.co/",
    desc: "India's largest community-driven hackathon platform hosting major in-person and online student hackathons.",
    badge: "Flagship Hackathons",
    icon: "🌐",
  },
  {
    name: "HackerEarth",
    url: "https://www.hackerearth.com/",
    desc: "Coding contests, innovation hackathons, enterprise developer challenges, and skill assessments.",
    badge: "Coding & Challenges",
    icon: "💻",
  },
  {
    name: "Devpost",
    url: "https://devpost.com/",
    desc: "Global hub for software hackathons, AI challenges, and virtual developer builds with worldwide prizes.",
    badge: "Global Builds",
    icon: "🌍",
  },
];

export const HACKATHON_STEPS = [
  {
    step: "01",
    title: "Create Your Profile",
    desc: "Register on platforms like Devfolio, Unstop, and GitHub. Highlight your skills and interests.",
  },
  {
    step: "02",
    title: "Explore Beginner Tracks",
    desc: "Search for fresher-friendly online or hybrid hackathons. Look for beginner or college tracks.",
  },
  {
    step: "03",
    title: "Find Teammates",
    desc: "Team up with batchmates or seniors with complementary skills (design, frontend, backend, presentation).",
  },
  {
    step: "04",
    title: "Brainstorm & Build",
    desc: "Pick a simple, concrete problem statement. Build a minimum viable prototype (MVP) during the sprint.",
  },
  {
    step: "05",
    title: "Submit & Pitch",
    desc: "Record a 2-minute demo video, push clean code to GitHub, and write a clear project pitch.",
  },
];

export const CAMPUS_BASICS_HUBS = [
  {
    id: "admin-building",
    name: "New Administrative Building",
    category: "Administration & Student Services",
    desc: "Director's office, Dean Academics, Registrar, Students' Welfare (Bonafide), and Scholarship Section.",
    mapLocationId: "admin-building",
    icon: "🏢",
  },
  {
    id: "central-library",
    name: "Central Library (APJ Kalam LRC)",
    category: "Library & Study Halls",
    desc: "Multi-floor air-conditioned library, study rooms, digital resource section, and vast book collections.",
    mapLocationId: "central-library",
    icon: "📚",
  },
  {
    id: "computer-centre",
    name: "Central Computer Center (CCC)",
    category: "Computing & IT Infrastructure",
    desc: "High-speed lab facilities, central server rooms, and institute networking administration.",
    mapLocationId: "computer-centre",
    icon: "🖥️",
  },
  {
    id: "health-centre",
    name: "NIT Health Centre",
    category: "Medical & Healthcare",
    desc: "24/7 medical emergency unit, doctor consultations, pharmacy, and ambulance base.",
    mapLocationId: "health-centre",
    icon: "🏥",
  },
  {
    id: "fps-market",
    name: "Fair Price Shop (FPS Market)",
    category: "Market, Shops & Barber",
    desc: "Campus grocery market, stationery, printing, bakery, barbershop, and daily essentials.",
    mapLocationId: "fps-market",
    icon: "🏪",
  },
  {
    id: "food-court",
    name: "Campus Food Court",
    category: "Dining & Hangouts",
    desc: "Central student food hub with multiple stalls offering fast food, refreshments, and meals.",
    mapLocationId: "food-court",
    icon: "🍴",
  },
  {
    id: "sports-complex",
    name: "Sports Complex & Gymkhana",
    category: "Sports & Athletics",
    desc: "Gymnasium, basketball/volleyball courts, football, cricket fields, and SAC club activities.",
    mapLocationId: "sac-building",
    icon: "🏟️",
  },
  {
    id: "hostels-hub",
    name: "Hostels & Residential Blocks",
    category: "Hostels (BH1-BH9 & GH1-GH4)",
    desc: "Boys & Girls hostel clusters with in-house mess dining, recreation rooms, and study halls.",
    mapLocationId: "bh1",
    icon: "🏠",
  },
  {
    id: "guest-house-hub",
    name: "Institute Guest House",
    category: "Visitor & Parent Stay",
    desc: "Campus VIP accommodation and guest rooms for parents and visitors. Bookable online via ERP portal.",
    mapLocationId: "guest-house",
    icon: "🏨",
  },
];

export const SENIOR_TIPS = [
  {
    title: "Keep Digital Copies of Documents",
    desc: "Store scanned PDFs of your Aadhar, Class 10/12 marksheets, admission letter, fee receipts, caste/income certificates in Google Drive and keep a dedicated folder on your phone.",
    icon: "📁",
    badge: "Essential",
  },
  {
    title: "Save Emergency Contacts Now",
    desc: "Add the NITS Ambulance numbers (9678780002, 9678780007) and campus transport contacts directly to your phone's speed dial.",
    icon: "🚨",
    badge: "Safety",
  },
  {
    title: "Explore the Campus Early",
    desc: "Take a walking tour during your first week. Learn the routes to New Gallery, Old Gallery, CCC, Library, and the Admin Building.",
    icon: "🗺️",
    badge: "Navigation",
  },
  {
    title: "Don't Neglect 1st Semester Academics",
    desc: "A solid first-year CPI creates a strong cushion for your entire college journey. Attend labs regularly and prepare from PYQs.",
    icon: "📈",
    badge: "Academics",
  },
  {
    title: "Start Exploring Coding & GitHub Early",
    desc: "Set up your GitHub profile, learn Git fundamentals, and experiment with small coding projects. Consistency beats cramming.",
    icon: "💻",
    badge: "Tech Growth",
  },
  {
    title: "Participate in Clubs & Hackathons",
    desc: "Don't wait for 3rd or 4th year! Join technical and cultural societies at SAC, attend workshops, and register for hackathons.",
    icon: "🚀",
    badge: "Opportunities",
  },
  {
    title: "Know Where the Admin Building Is",
    desc: "Most official paperwork, fee endorsements, bonafide certificates, and scholarship verification take place at the Administrative Building.",
    icon: "🏢",
    badge: "Official",
  },
  {
    title: "Ask Seniors When in Doubt",
    desc: "Seniors are your best guides for course notes, professor expectations, club selections, and placement insights. Reach out respectfully.",
    icon: "🤝",
    badge: "Community",
  },
  {
    title: "Check Official Notices Daily",
    desc: "Always verify dates and instructions from the official NIT Silchar web portal (nits.ac.in) and department notice boards.",
    icon: "📢",
    badge: "Notice Board",
  },
];

export const ARYABHATTA_HOSTEL_DATA = {
  id: "aryabhatta-hostel",
  name: "Aryabhatta Hostel",
  subtitle: "PG & Freshers Residential Block",
  badge: "Hostel Directory",
  mapLocationId: "aryabhatta-hostel",
  description:
    "Official directory for Aryabhatta Hostel residents. Contact the Hostel Supervisor for administrative issues or the respective Block House Keeping Staff for room, wing, and sanitation assistance.",
  supervisor: {
    title: "Hostel Supervisor",
    role: "Hostel Administration & Supervision",
    number: "9957599696",
    displayNumber: "+91 99575 99696",
    icon: "👨‍💼",
    badge: "Supervisor In-Charge",
    description: "Primary point of contact for hostel administration, room allocation queries, and general hostel supervision.",
  },
  blocks: [
    {
      id: "north-block",
      block: "North Block",
      role: "House Keeping Staff",
      icon: "🧭",
      badge: "North Wing",
      accent: "#38BDF8",
      staff: [
        {
          id: "nb-staff-1",
          label: "Staff 1",
          number: "9864347285",
          displayNumber: "+91 98643 47285",
        },
        {
          id: "nb-staff-2",
          label: "Staff 2",
          number: "8473833967",
          displayNumber: "+91 84738 33967",
        },
      ],
    },
    {
      id: "east-block",
      block: "East Block",
      role: "House Keeping Staff",
      icon: "🌅",
      badge: "East Wing",
      accent: "#F59E0B",
      staff: [
        {
          id: "eb-staff-1",
          label: "Staff 1",
          number: "8723845428",
          displayNumber: "+91 87238 45428",
        },
        {
          id: "eb-staff-2",
          label: "Staff 2",
          number: "9394389294",
          displayNumber: "+91 93943 89294",
        },
      ],
    },
    {
      id: "west-block",
      block: "West Block",
      role: "House Keeping Staff",
      icon: "🌇",
      badge: "West Wing",
      accent: "#EC4899",
      staff: [
        {
          id: "wb-staff-1",
          label: "Staff 1",
          number: "7099688384",
          displayNumber: "+91 70996 88384",
        },
        {
          id: "wb-staff-2",
          label: "Staff 2",
          number: "6001975610",
          displayNumber: "+91 60019 75610",
        },
      ],
    },
    {
      id: "south-block",
      block: "South Block",
      role: "House Keeping Staff",
      icon: "🧭",
      badge: "South Wing",
      accent: "#10B981",
      staff: [
        {
          id: "sb-staff-1",
          label: "Staff 1",
          number: "7002820131",
          displayNumber: "+91 70028 20131",
        },
        {
          id: "sb-staff-2",
          label: "Staff 2",
          number: "6001651466",
          displayNumber: "+91 60016 51466",
        },
      ],
    },
  ],
};

