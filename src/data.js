const U = (id, w = 800) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;
export const img = U;

export const navLinks = [
  { to: "/", label: "Home" },
  { to: "/team", label: "Our Team" },
  { to: "/gallery", label: "Gallery" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export const features = [
  { icon: "dumbbell", title: "Modern Equipment", text: "Premium strength and cardio machines, free weights and functional zones." },
  { icon: "user", title: "Personal Training", text: "One-on-one coaching with a plan built around your body and goals." },
  { icon: "pulse", title: "Group Classes", text: "HIIT, spin, yoga, boxing and more — 60+ classes every single week." },
  { icon: "clock", title: "Open 24/7", text: "Train on your schedule — early bird or night owl, our doors are open." },
];

export const programs = [
  { tag: "Strength", title: "Power Lifting", text: "Build raw strength with coached barbell sessions.", img: U("1583454110551-21f2fa2afe61") },
  { tag: "Cardio", title: "HIIT Burn", text: "Fast, intense intervals that torch calories.", img: U("1517836357463-d25dfeac3438") },
  { tag: "Mind & Body", title: "Yoga Flow", text: "Improve flexibility, balance and recovery.", img: U("1518611012118-696072aa579a") },
];

export const plans = [
  { name: "Basic", price: 29, features: ["Gym floor access", "Locker room & showers", "Free fitness assessment"] },
  { name: "Pro", price: 49, featured: true, features: ["Everything in Basic", "Unlimited group classes", "24/7 access", "1 PT session / month"] },
  { name: "Elite", price: 89, features: ["Everything in Pro", "4 PT sessions / month", "Custom nutrition plan", "Guest passes"] },
];

export const testimonials = [
  { name: "Sarah Khan", since: 2022, avatar: 47, text: "Lost 15 kg in six months. The coaches kept me accountable and the classes are so much fun I actually look forward to them." },
  { name: "Ahmed Raza", since: 2020, avatar: 12, text: "Best equipment in the city and it's never too crowded. Hit a 200 kg deadlift thanks to the powerlifting program!" },
  { name: "Emily Carter", since: 2023, avatar: 32, text: "The yoga and recovery sessions changed my life. Friendly staff, spotless facility and a real sense of community." },
];

export const team = [
  { name: "Ali Raza", role: "Head Coach & Founder", bio: "12 years in strength & conditioning. Former national powerlifter.", avatar: 68 },
  { name: "Sana Malik", role: "Yoga & Mobility Coach", bio: "RYT-500 certified. Helps members move better and recover faster.", avatar: 44 },
  { name: "Daniel Brooks", role: "HIIT & Cardio Specialist", bio: "High-energy coach known for the toughest (and most fun) classes.", avatar: 59 },
  { name: "Ayesha Noor", role: "Nutrition Coach", bio: "Certified dietitian creating sustainable, realistic meal plans.", avatar: 45 },
  { name: "Omar Farooq", role: "Boxing Coach", bio: "Ex-amateur champion teaching technique, fitness and confidence.", avatar: 53 },
  { name: "Lisa Moreno", role: "Personal Trainer", bio: "Specialises in body transformation and women's strength training.", avatar: 26 },
  { name: "Hamza Sheikh", role: "CrossFit Coach", bio: "CF-L2 trainer focused on functional fitness and conditioning.", avatar: 15 },
  { name: "Zara Ahmed", role: "Pilates Instructor", bio: "Core strength and posture expert with a calm, precise style.", avatar: 49 },
];

export const galleryFilters = [
  { id: "all", label: "All" },
  { id: "gym", label: "Gym Floor" },
  { id: "classes", label: "Classes" },
  { id: "training", label: "Training" },
];

export const gallery = [
  ["1534438327276-14e5300c3a48", "gym", "Main Training Floor"],
  ["1517836357463-d25dfeac3438", "training", "Kettlebell Conditioning"],
  ["1518611012118-696072aa579a", "classes", "Morning Yoga Flow"],
  ["1571019614242-c5c5dee9f50b", "training", "Personal Training Session"],
  ["1540497077202-7c8a3999166f", "gym", "Cardio Zone"],
  ["1583454110551-21f2fa2afe61", "training", "Heavy Lifting Day"],
  ["1599058917212-d750089bc07e", "classes", "Group Stretching"],
  ["1581009146145-b5ef050c2e1e", "training", "Dumbbell Workout"],
  ["1574680096145-d05b474e2155", "gym", "Free Weights Area"],
  ["1571902943202-507ec2618e8f", "gym", "Strength Machines"],
  ["1549060279-7e168fcee0c2", "classes", "Boxing Class"],
  ["1517963879433-6ad2b056d712", "classes", "Spin Class"],
].map(([id, category, title]) => ({ id, category, title }));

export const timeline = [
  { year: "2015", title: "The Garage Days", text: "FitZone opens in a small garage with 20 founding members and a lot of heart." },
  { year: "2018", title: "Our First Real Home", text: "We move into a 5,000 sq ft space and launch our first group class schedule." },
  { year: "2021", title: "Going 24/7", text: "Round-the-clock access arrives, along with a dedicated personal-training team." },
  { year: "2024", title: "The Flagship", text: "Our 15,000 sq ft flagship opens with recovery zones, a turf track and boxing ring." },
  { year: "Today", title: "2,500+ Members Strong", text: "And we're just getting started. Come be part of the next chapter." },
];

export const hours = [
  ["Monday – Friday", "24 Hours"],
  ["Saturday", "6:00 AM – 10:00 PM"],
  ["Sunday", "8:00 AM – 8:00 PM"],
];

export const faqs = [
  ["Do you offer a free trial?", "Yes! Every new visitor gets a free 7-day pass with full gym and class access. Just fill out the form above."],
  ["Is there a joining fee or contract?", "No joining fee and no long-term contract. All memberships are month-to-month and you can cancel anytime."],
  ["I'm a complete beginner — is FitZone right for me?", "Absolutely. Every membership includes a free fitness assessment and a beginner-friendly plan from one of our coaches."],
  ["Do you have parking and showers?", "Yes — free member parking, plus clean locker rooms with showers, towels and lockers."],
];
