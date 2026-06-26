export interface CampaignUpdate {
  id: string;
  date: string;
  title: string;
  content: string;
}

export interface RecentDonor {
  id: string;
  name: string;
  amount: number;
  date: string;
  message?: string;
}

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
  organizationName?: string;
  location?: string;
  daysRemaining?: number;
  donorCount?: number;
  storyRichText?: string;
  youtubeEmbedUrl?: string;
  updates?: CampaignUpdate[];
  recentDonors?: RecentDonor[];
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
  image: string;
  skillsNeeded: string[];
  timeCommitmentLabel: "One-time" | "Weekly" | "Monthly" | "Flexible";
  locationType: "On-site" | "Remote" | "Hybrid";
  ageRequirement: string;
  impact: string;
  whatToBring: string[];
  coordinator: {
    name: string;
    email: string;
    phone: string;
  };
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
  category:
    | "education"
    | "healthcare"
    | "poverty-relief"
    | "environment"
    | "emergency"
    | "animal-welfare";
  location: string;
  quote: string;
  outcome: string;
  narrative: string;
  image: string;
}

export interface NGOEvent {
  id: string;
  title: string;
  description: string;
  category: "poverty-relief" | "environment" | "education" | "emergency";
  eventTypeLabel:
    | "Fundraising Gala"
    | "Community Cleanup"
    | "Workshop"
    | "Volunteer Orientation";
  date: string;
  time: string;
  location: string;
  coordinates: { lat: number; lng: number };
  attendeeCount: number;
  maxCapacity: number;
  image: string;
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
    image: "/images/campaigns/emergencypipes.jpg",
    daysRemaining: 12,
    organizationName: "Global Health Alliance",
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
    updates: [
      {
        id: "upd-1",
        date: "2 hours ago",
        title: "Flash Flood Emergency Deployment",
        content:
          "Sudden heavy rainfall  near the Serrana Valley region requires immediate onsite water logistics support teams.",
      },

      {
        id: "upd-2",
        date: "1 day ago",
        title: "Phase 2 Pipiline Construction Completed",
        content:
          "Thanks to recent mobilizations, the baseline plumbing lines for the northern district are now 100% operational.",
      },
    ],
  },
  {
    id: "camp-2",
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
    updates: [
      {
        id: "upd-3",
        date: "3 days ago",
        title: "Tablet Batch Shipment Arrived",
        content:
          "The hardware shipment has cleared customs safely. Set up an orientation sessions begin next week.",
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
    image: "/images/campaigns/aforestation.jpg",
    tiers: [],
  },
  {
    id: "camp-4",
    title: "Mobile Healthcare Clinic Expansion Unit",
    description:
      "Equipping and deploying a specialized all-terrain heavy maternal health unit to provide life saving neonatal screenings and basic vaccinations to isolated rural populations.",
    category: "Healthcare",
    status: "Active",
    targetAmount: 95000,
    currentAmount: 89700,
    image: "/images/campaigns/mobilehealth.jpg",
    tiers: [
      {
        amount: 50,
        impact:
          "Covers essential vaccinations and immediate health screenings for two newborns.",
      },
      {
        amount: 150,
        impact:
          "Sponsors emergency mid-wife diagnostic supply kits for off-grid field clinics.",
      },
    ],
  },
  {
    id: "camp-5",
    title: "Acute Malnutrition Crisis Nutrition Pipeline",
    description:
      "Rapid tactical provisioning of therapeutic high-protein meal distributions explicitly targeted at safeguarding childhood development across emergency municipal sectors.",
    category: "Disaster Response",
    status: "Urgent",
    targetAmount: 65000,
    currentAmount: 61800,
    image: "/images/campaigns/nutrition.jpg",
    daysRemaining: 3,
    organizationName: "Red Cross Emergency Response",
    tiers: [
      {
        amount: 35,
        impact:
          "Provides a continuous two-week supply of high-protein emergency therapeutic food paste packages.",
      },
      {
        amount: 120,
        impact:
          "Funds full baseline nutrition therapy management cycles for a severely malnourished infant.",
      },
    ],
  },
  {
    id: "camp-6",
    title: "Community Wildlife Care & Habitat Sanctuary",
    description:
      "Building specialized rescue facilities, veterinary containment centers, and rehabilitation programs to protect vulnerable domestic and wild populations in expanding urban areas.",
    category: "Environment",
    status: "Active",
    targetAmount: 15000,
    currentAmount: 13900,
    image: "/images/campaigns/wildlifepreservation.jpg",
    tiers: [
      {
        amount: 40,
        impact:
          "Supplies professional first-aid veterinary kits and specialized containment food arrays.",
      },
      {
        amount: 200,
        impact:
          "Secures durable shelter framework infrastructure for incoming rehabilitated wildlife groups.",
      },
    ],
  },
];

export const dummyOpportunities: VolunteerOpportunity[] = [
  {
    id: "opp-1",
    title: "Weekend Food Security Support",
    description:
      "Sort nutritional supplies, pack dynamic family boxes and assist distribution teams at municipal parks.",
    category: "Event Support",
    location: "Metropolitan Food Distribution Hub",
    coordinates: { lat: 40.7128, lng: -74.006 },
    timeCommitment: "4 hours (Saturdays)",
    date: "2026-06-13",
    slotsAvailable: 15,
    image:
      "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80", // Real volunteers distributing food supplies
    skillsNeeded: ["No Experience Needed", "Heavy Lifting", "Teamwork"],
    timeCommitmentLabel: "Weekly",
    locationType: "On-site",
    ageRequirement:
      "16+ (Under 18 requires parental waiver signed by guardian)",
    impact:
      "Directly supplies healthy, life-sustaining groceries to over 150 low-income families every weekened.",
    whatToBring: [
      "Comfortable closed-toe athletic shoes",
      "Refillable water bottle",
      "Face mask (optional)",
    ],
    coordinator: {
      name: "Marcus Miller",
      email: "m.miller@hopeconnect.org",
      phone: "+1 (555) 234-5678",
    },
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
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80", // Digital tutoring / mentoring in action
    skillsNeeded: ["HTML/CSS", "Mentoring", "Patient Communicator"],
    timeCommitmentLabel: "Flexible",
    locationType: "Remote",
    ageRequirement: "18+ (Requires standard background clearance check)",
    impact:
      "Empowers 5 high school students with market-ready frontend developement fundamentals to break structural poverty cycles.",
    whatToBring: [
      "Stable high-speed internet connection",
      "Laptop or Desktop computer with webcam",
      "Discord account downloaded",
    ],
    coordinator: {
      name: "Dr Elena Rostova",
      email: "e.rostova@hopeconnect.org",
      phone: "+1 (555) 876-5432",
    },
  },
  {
    id: "opp-3",
    title: "Community Eco-Garden Build",
    description:
      "Help construct raised garden beds, set up irrigation paths, and plant native fruit crops for municipal food access.",
    category: "Environment",
    location: "Greenheart Urban Sanctuary",
    coordinates: { lat: 34.0522, lng: -118.2437 },
    timeCommitment: "One-time event (6 hours)",
    date: "2026-06-20",
    slotsAvailable: 20,
    image:
      "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=800&q=80",
    skillsNeeded: ["Hand Tools", "Physical Stamina", "Outdoor Work"],
    timeCommitmentLabel: "One-time",
    locationType: "On-site",
    ageRequirement:
      "14+ (Minors must be accompanied by an active adult volunteer)",
    impact:
      "Establishes a highly sustainable urban agricultural asset capable of yielding 500+ lbs of fresh produce annually.",
    whatToBring: [
      "Durable gardening gloves",
      "Sunscreen and wide-brim hat",
      "Work clothes that can get muddy",
    ],
    coordinator: {
      name: "Carlos Mendez",
      email: "c.mendez@hopeconnect.org",
      phone: "+1 (555) 456-7890",
    },
  },
  {
    id: "opp-4",
    title: "Wildlife Sanctuary Habitat Care",
    description:
      "Assist veterinary containment teams in cleaning habitats, preparing specialized dietary arrays, and upgrading enclosures.",
    category: "Healthcare",
    location: "Riverside Rescue Center",
    coordinates: { lat: 34.0522, lng: -118.2437 },
    timeCommitment: "3 hours/week (3 mos.)",
    date: "2026-06-25",
    slotsAvailable: 6,
    image:
      "https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=800&q=80",
    skillsNeeded: ["Animal Handling", "Detail Oriented", "Safety First"],
    timeCommitmentLabel: "Weekly",
    locationType: "Hybrid",
    ageRequirement:
      "21+ (Strict policy due to direct wild animal safety frameworks)",
    impact:
      "Directly improves structural sanctuary hygiene and health optimization tracks for 45+ rescued regional animal species.",
    whatToBring: [
      "Sturdy waterproof boots",
      "Change of utility clothing",
      "Valid government-issued identification ID",
    ],
    coordinator: {
      name: "Sarah Jenkins",
      email: "s.jenkins@hopeconnect.org",
      phone: "+1 (555) 987-6543",
    },
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
    category: "education",
    location: "Dakar Regional District",
    quote:
      "I used to think programming was for other people, not me. This community training laboratory opened a door to a future I never dreamed was possible.",
    outcome:
      "Secured a full tuition University Engineering scholarship following community training programs.",
    narrative:
      "Amara, a determined student from a low-income neighborhood, faced significant barriers to accessing quality technical education. Through our Bright Futures digital literacy initiatives, she received a tablet preloaded with software along with dedicated access to online training materials...",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "story-2",
    title: "Lifesaving Care on Wheels",
    beneficiary: "Elena Rostova",
    category: "healthcare",
    location: "Vance Valley Settlement",
    quote:
      "When my child fell ill with severe complications, the mobile health unit arrived within hours. Their rapid treatment completely saved his life.",
    outcome:
      "Received critical emergency neonatal screening and vaccinations via the all-terrain mobile clinic unit.",
    narrative:
      "Living in an isolated territory cut off from municipal clinical centers, Elena struggled to find stable health oversight. Our expansion health unit reached her community in record time, deploying necessary medical support packages directly to her doorstep...",
    image:
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "story-3",
    title: "From Food Insecurity to Stability",
    beneficiary: "Samuel Mwangi",
    category: "poverty-relief",
    location: "Metro Distribution Sector",
    quote:
      "The nutritional support boxes helped our family get through the hardest months of the seasonal workforce gap. We are finally back on our feet.",
    outcome:
      "Maintained critical household dietary stability via weekly specialized food pipeline allocations.",
    narrative:
      "Sudden economic contraction left Samuel and his dependents facing an immediate food deficit gap. Accessing the weekly municipal park distribution network enabled them to stabilize their essential food requirements safely...",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "story-4",
    title: "Restoring the Shield of the Coastline",
    beneficiary: "Ananya Nair",
    category: "environment",
    location: "Kerala Coastal Border",
    quote:
      "Watching the new mangrove roots hold the soil against the seasonal storm tides gave us our first real sense of safety in years.",
    outcome:
      "Stabilized over two kilometers of highly vulnerable shoreline using community-planted native saplings.",
    narrative:
      "Severe seasonal storms and aggressive erosion threatened the physical stability of Ananya's coastal fishing community. By organizing a localized restoration drive, residents planted thousands of native saplings that have grown into a massive natural barrier.",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80", // Dignified, professional portrait
  },

  {
    id: "story-5",
    title: "Rebuilding After the Flash Flood",
    beneficiary: "Mateo Silva",
    category: "emergency",
    location: "Serrana Valley Region",
    quote:
      "The rapid tactical distribution team arrived with water filters and emergency food paste within twelve hours of the river breaking its banks.",
    outcome:
      "Sustained vital sanitary parameters for four hundred displaced residents during a sudden climate crisis.",
    narrative:
      "When unexpected heavy rainfall triggered destructive flash flooding across the valley, Mateo's family lost access to clean municipal infrastructure. The immediate arrival of our disaster response units successfully prevented contamination outbreaks.",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80", // Dignified, professional portrait
  },
];

export const dummyEvents: NGOEvent[] = [
  {
    id: "event-1",
    title: "HopeConnect Annual Charity Gala",
    description:
      "An inspiring evening showcasing visual impact metrics, partner panels, community testimonials, and high-value fundraiser banquets.",
    category: "poverty-relief",
    eventTypeLabel: "Fundraising Gala",
    date: "2026-07-25", // Perfect for date-fns reading
    time: "18:00 - 22:00",
    location: "Grand Horizon Pavilion",
    coordinates: { lat: 34.0522, lng: -118.2437 },
    attendeeCount: 142,
    maxCapacity: 200,
    image:
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "event-2",
    title: "Urban Sanctuary Coastline Cleanup",
    description:
      "Join hands with local conservation teams to clear single-use plastics and stabilize marine breeding environments.",
    category: "environment",
    eventTypeLabel: "Community Cleanup",
    date: "2026-08-12",
    time: "08:00 - 12:00",
    location: "Greenheart Urban Sanctuary",
    coordinates: { lat: 34.0522, lng: -118.2437 },
    attendeeCount: 45,
    maxCapacity: 100,
    image:
      "https://images.unsplash.com/photo-1618477388954-7852f32655ec?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "event-3",
    title: "Foundational Grant Management Workshop",
    description:
      "A comprehensive training masterclass detailing strategic fund tracking, auditing configurations, and field transparency frameworks.",
    category: "education",
    eventTypeLabel: "Workshop",
    date: "2026-09-05",
    time: "14:00 - 17:30",
    location: "Metro Distribution Center Core",
    coordinates: { lat: 40.7128, lng: -74.006 },
    attendeeCount: 28,
    maxCapacity: 40,
    image:
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80",
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

export interface HomeImpactStat {
  id: string;
  targetNumber: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  currentProgressValue: number;
  maxProgressValue: number;
  progressVariant: "blue" | "green" | "orange";
  progressLabel: string;
  iconName: "Heart" | "DollarSign" | "Users" | "MapPin"; // Strongly typed string matcher for Lucide
  title: string;
  description: string;
  iconBgColor: string;
  iconColor: string;
}

export const dummyHomeStats: HomeImpactStat[] = [
  {
    id: "stat-lives-impacted",
    targetNumber: 10000,
    suffix: "+",
    currentProgressValue: 10650,
    maxProgressValue: 12000,
    progressVariant: "blue",
    progressLabel: "Impact Reach Track",
    iconName: "Heart",
    title: "Lives Impacted",
    description:
      "Direct beneficiaries provided with clean water infrastructure, nutritional pipelines, and medical supplies.",
    iconBgColor: "bg-blue-50 dark:bg-blue-950/20",
    iconColor: "text-blue-600 dark:text-blue-400",
  },
  {
    id: "stat-funds-raised",
    targetNumber: 1.2,
    prefix: "$",
    suffix: "M",
    decimals: 1,
    currentProgressValue: 1240000,
    maxProgressValue: 1500000,
    progressVariant: "green",
    progressLabel: "Q2 Financial Allocation",
    iconName: "DollarSign",
    title: "Funds Raised",
    description:
      "Transparent, audited asset deployment routed straight into active field-level programs worldwide.",
    iconBgColor: "bg-emerald-50 dark:bg-emerald-950/20",
    iconColor: "text-emerald-600 dark:text-emerald-400",
  },
  {
    id: "stat-volunteers-mobilized",
    targetNumber: 500,
    suffix: "+",
    currentProgressValue: 512,
    maxProgressValue: 600,
    progressVariant: "blue",
    progressLabel: "Active Field Units",
    iconName: "Users",
    title: "Volunteers Engaged",
    description:
      "Dedicated deployment personnel managing logistical chains and onsite construction operations daily.",
    iconBgColor: "bg-sky-50 dark:bg-sky-950/20",
    iconColor: "text-sky-600 dark:text-sky-400",
  },
  {
    id: "stat-communities-served",
    targetNumber: 50,
    suffix: "+",
    currentProgressValue: 54,
    maxProgressValue: 60,
    progressVariant: "orange",
    progressLabel: "Regional Saturation",
    iconName: "MapPin",
    title: "Communities Served",
    description:
      "Isolated rural territories fully integrated into our regional development and clean water systems.",
    iconBgColor: "bg-orange-50 dark:bg-orange-950/20",
    iconColor: "text-orange-600 dark:text-orange-400",
  },
];
