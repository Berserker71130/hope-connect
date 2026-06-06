export interface Campaign {
  id: string;
  title: string;
  description: string;
  category:
    | "Education"
    | "Healthcare"
    | "Environment"
    | "Poverty Relief"
    | "Disaster Response";
  status: "Active" | "Completed" | "Urgent";
  targetAmount: number;
  currentAmount: number;
  image: string;
  tiers: { amount: number; impact: string }[];
}
export interface VolunteerOpportunity {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  coordinates: { lat: number; lng: number };
  timeCommitment: string;
  date: string;
  slotsAvailable: number;
}

export interface VolunteerProfile {
  id: string;
  name: string;
  email: string;
  hoursTracked: number;
  joinedDate: string;
  certifications: string[];
}

export interface ImpactStory {
  id: string;
  title: string;
  beneficiary: string;
  category: string;
  outcome: string;
  narrative: string;
  image: string;
}

export interface NGOEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  coordinates: { lat: number; lng: number };
  attendeeCount: number;
  maxCapacity: number;
}

export interface DonationHistory {
  id: string;
  campaignTitle: string;
  amount: number;
  date: string;
  isRecurring: boolean;
  frequency?: "Monthly" | "Yearly";
  receiptUrl: string;
}

export interface Testimonial {
  id: string;
  author: string;
  role: "Donor" | "Beneficiary" | "Volunteer";
  quote: string;
  avatar: string;
}

export interface ImpactReport {
  period: string;
  metrics: {
    label: string;
    value: string | number;
    change: string;
  }[];
}

export interface PartnerOrganization {
  id: string;
  name: string;
  tier: "Platinum" | "Gold" | "Silver";
  logoUrl: string;
}

// SEED DATA ARRAYS
export const dummyCampaigns: Campaign[] = [
  {
    id: "camp-1",
    title: "Clean Water for Rural Communities",
    description:
      "Deploying sustainable, solar-powered water filtration systems to remote areas struggling with safe water access.",
    category: "Healthcare",
    status: "Urgent",
    targetAmount: 35000,
    currentAmount: 28450,
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80", //To change later
    tiers: [
      {
        amount: 25,
        impact:
          "Supplies a child with safe drinking water for a full school year.",
      },
      {
        amount: 75,
        impact:
          "Provides a household multi-stage filteration unit for a family.",
      },
      {
        amount: 250,
        impact:
          "Funds basic plumbing parts and maintenance kits for village community wells.",
      },
    ],
  },
  {
    id: "capm-2",
    title: "Bright Futures Digital Literacy Initiative",
    description:
      "Sponsoring computer, robust learning materials, and modern internet infrastructure for low income secondary schools.",
    category: "Education",
    status: "Active",
    targetAmount: 20000,
    currentAmount: 8300,
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80", //To change later
    tiers: [
      {
        amount: 20,
        impact:
          "Provides a student with a basic digital literacy workbook and access to online resources for 6 months.",
      },
      {
        amount: 100,
        impact:
          "Funds a classroom set of tablets preloaded with educational software and e-books.",
      },
      {
        amount: 500,
        impact:
          "Supports the installation of high-speed internet and a computer lab for an entire school.",
      },
    ],
  },
  {
    id: "camp-3",
    title: "Coastal Mangrove Restoration Drive",
    description:
      "Planting thousands of native saplings to stabilize vulnerable coastlines against severe erosion and storms.",
    category: "Environment",
    status: "Completed",
    targetAmount: 12000,
    currentAmount: 12450,
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80", //To change later
    tiers: [],
  },
];

export const dummyOpportunities: VolunteerOpportunity[] = [
  {
    id: "opp-1",
    title: "Weekend Food Security Support",
    description:
      "Sort nutritional supplies, pack dynamic family boxes and assist distribution teams at municipal parks.",
    category: "Poverty Relief",
    location: "Metropolian Food Distribution Hub",
    coordinates: { lat: 40.7128, lng: -74.006 },
    timeCommitment: "4 hours (Saturdays)",
    date: "2026-06-13",
    slotsAvailable: 15,
  },
  {
    id: "opp-2",
    title: "Remote STEM Coding Mentor",
    description:
      "Guide high school students from underprivileged sectors through foundational interactive web design projects.",
    category: "Education",
    location: "Remote / Online via Video Conference",
    coordinates: { lat: 0, lng: 0 },
    timeCommitment: "2 hours/week (Flexible)",
    date: "2026-06-15",
    slotsAvailable: 4,
  },
];

export const dummyVolunteers: VolunteerProfile[] = [
  {
    id: "vol-user-01",
    name: "Marcus Vance",
    email: "marcus.v@hopeconnect.org",
    hoursTracked: 54,
    joinedDate: "2025-02-14",
    certifications: ["First Aid Certified", "Community Team Leadership Core"],
  },
];

export const dummyImpactStories: ImpactStory[] = [
  {
    id: "story-1",
    title: "Breaking Barriers Through Tech Literacy",
    beneficiary: "Amara Diop",
    category: "Education",
    outcome:
      "Secured a full tution University Engineering schorlaship following community training programs.",
    narrative:
      "Amara, a bright and determined student from a low-income neighborhood, faced significant barriers to accessing quality education. Through our Bright Futures Digital Literacy Initiative, she received a tablet preloaded with educational software and e-books, along with access to online resources. With the support of our volunteer mentors, Amara developed strong digital skills and excelled in her studies. Her dedication and newfound confidence led her to secure a full tuition scholarship to a prestigious university’s engineering program, where she is now thriving and inspiring others in her community.",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80", //To change later
  },
];

export const dummyEvents: NGOEvent[] = [
  {
    id: "event-1",
    title: "HopeConnect Annual Charity Gala",
    description:
      "An inspiring evening showcasing visual impact metrics, partner panels, community testimonials and fundraiser banquets.",
    date: "2026-07-25",
    time: "18:00 - 22:00",
    location: "Grand Horizon Pavilion",
    coordinates: { lat: 34.0522, lng: -118.2437 },
    attendeeCount: 142,
    maxCapacity: 200,
  },
];

export const dummyDonations: DonationHistory[] = [
  {
    id: "tx-1004",
    campaignTitle: "Clean Water for Rural Communities",
    amount: 150,
    date: "2026-05-20",
    isRecurring: false,
    receiptUrl: "https://example.com/receipts/tx-1004.pdf",
  },
  {
    id: "tx-1009",
    campaignTitle: "General Growth Fund",
    amount: 35,
    date: "2026-06-01",
    isRecurring: true,
    frequency: "Monthly",
    receiptUrl: "https://example.com/receipts/tx-1009.pdf",
  },
];

export const dummyTestimonials: Testimonial[] = [
  {
    id: "test-1",
    author: "Clara Oswald",
    role: "Donor",
    quote:
      "The explicit transparency and detailed operational maps make me absolute in my knowledge of where every single dollar is being put to use. It’s the only charity I trust with my contributions.",
    avatar:
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=80",
  },
];

export const dummyImpactReports: ImpactReport[] = [
  {
    period: "2025 Annual Metrics Overview",
    metrics: [
      {
        label: "Clean Safe Wells Rebuilt",
        value: 42,
        change: "+12% from previous year",
      },
      {
        label: "Students Equipped Globally",
        value: "5,800+",
        change: "All-time high operational volume",
      },
      {
        label: "Active Grassroots Volunteers",
        value: 890,
        change: "+34% community acquisition",
      },
    ],
  },
];

export const dummyPartners: PartnerOrganization[] = [
  {
    id: "p-1",
    name: "Global Tech Foundation",
    tier: "Platinum",
    logoUrl: "https://example.com/logos/gtf.png",
  }, //to change later
  {
    id: "p-2",
    name: "EcoGuardians Inc.",
    tier: "Gold",
    logoUrl: "https://example.com/logos/eg.png",
  }, //to change later
  {
    id: "p-3",
    name: "HealthFirst Alliance",
    tier: "Silver",
    logoUrl: "https://example.com/logos/hfa.png",
  }, //to change later
];
