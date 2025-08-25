export const NAV_DATA = [
  {
    label: "Home",
    to: "/",
  },
  {
    label: "Tours",
    to: "/tours",
  },
  {
    label: "About Us",
    to: "/about-us",
  },
  {
    label: "FAQ",
    to: "/faq",
  },
];

export const ACTIVITY_IMAGES = [
  {
    id: 1,
    url: "/assets/activity1.webp",
    title: "City Tours",
    desc: "100+ tours",
    to: "/tours?type=bus",
  },
  {
    id: 2,
    url: "/assets/activity2.webp",
    title: "Cultural Tours",
    desc: "100+ tours",
    to: "/tours?type=cultural",
  },
  {
    id: 3,
    url: "/assets/activity3.webp",
    title: "Day Cruises",
    desc: "100+ tours",
    to: "/tours?type=cruises",
  },
  {
    id: 4,
    url: "/assets/activity4.webp",
    title: "Bus Tours",
    desc: "100+ tours",
    to: "/tours?type=bus",
  },
  {
    id: 5,
    url: "/assets/activity5.webp",
    title: "Beach Tours",
    desc: "100+ tours",
    to: "/tours?type=beach",
  },
  {
    id: 6,
    url: "/assets/activity6.webp",
    title: "Food Tours",
    desc: "100+ tours",
    to: "/tours?type=cultural",
  },
];

export const TOUR_TYPE = [
  {
    label: "Nature Tour",
    value: "nature",
  },
  {
    label: "Adventure Tour",
    value: "adventure",
  },
  {
    label: "Cultural Tour",
    value: "cultural",
  },
  {
    label: "Beach Tour",
    value: "beach",
  },
  {
    label: "Bus Tour",
    value: "bus",
  },
  {
    label: "Day Cruises",
    value: "cruises",
  },
];

export const TOUR_DURATION = [
  {
    label: "1 days",
    value: "1 days",
  },
  {
    label: "2 days",
    value: "2 days",
  },
  {
    label: "5 days",
    value: "5 days",
  },
  {
    label: "7 days",
    value: "7 days",
  },
  {
    label: "10 days",
    value: "10 days",
  },
];
export const RATINGS = [
  {
    label: "5",
    value: 5,
  },
  {
    label: "4",
    value: 4,
  },
  {
    label: "3",
    value: 3,
  },
  {
    label: "2",
    value: 2,
  },
  {
    label: "1",
    value: 1,
  },
];

export const STATUS: any = {
  completed: {
    bg: "#dcfce7",
    text: "#15803d",
  },
  paid: {
    bg: "#dcfce7",
    text: "#15803d",
  },
  "checked in": {
    bg: "#fef9c3",
    text: "#a16207",
  },
  approved: {
    bg: "#dcfce7",
    text: "#15803d",
  },
  available: {
    bg: "#dcfce7",
    text: "#15803d",
  },
  pending: {
    bg: "#fef9c3",
    text: "#a16207",
  },
  canceled: {
    bg: "#e5e7eb",
    text: "#374151",
  },
  rejected: {
    bg: "#fee2e2",
    text: "#b91c1c",
  },
  blocked: {
    bg: "#fee2e2",
    text: "#b91c1c",
  },
};

export const REVIEWS = [
  {
    id: "5f47ac10b4f1c03e8c123001",
    user_email: "emma.smith@example.com",
    userName: "Emma Smith",
    ratings: 5,
    review:
      "Booking with TripNest was smooth and intuitive. The website made it easy to find tours that fit my schedule. Customer support was helpful and responsive throughout the process.",
    user_photoURL: "https://randomuser.me/api/portraits/women/21.jpg",
    date: "2025-03-15T10:20:00.000Z",
  },
  {
    id: "5f47ac10b4f1c03e8c123002",
    user_email: "liam.jones@example.com",
    userName: "Liam Jones",
    ratings: 4.2,
    review:
      "The platform offers a good selection of tours with clear descriptions. Booking was quick and straightforward. I discovered a few hidden gems thanks to their recommendations.",
    user_photoURL: "https://randomuser.me/api/portraits/men/34.jpg",
    date: "2025-04-02T09:15:00.000Z",
  },
  {
    id: "5f47ac10b4f1c03e8c123003",
    user_email: "olivia.brown@example.com",
    userName: "Olivia Brown",
    ratings: 4.8,
    review:
      "TripNest made planning my trip much easier. The curated recommendations were very helpful. Support staff answered all my questions quickly and politely.",
    user_photoURL: "https://randomuser.me/api/portraits/women/45.jpg",
    date: "2025-05-10T16:45:00.000Z",
  },
  {
    id: "5f47ac10b4f1c03e8c123004",
    user_email: "noah.davis@example.com",
    userName: "Noah Davis",
    ratings: 4,
    review:
      "The website is user-friendly and booking was seamless. Tour details were clear and easy to follow. The mobile version could use slight improvements.",
    user_photoURL: "https://randomuser.me/api/portraits/men/56.jpg",
    date: "2025-05-18T13:00:00.000Z",
  },
  {
    id: "5f47ac10b4f1c03e8c123005",
    user_email: "ava.martin@example.com",
    userName: "Ava Martin",
    ratings: 5,
    review:
      "Excellent platform with a wide variety of tours. The booking process was simple and transparent. Customer support gave great tips for local attractions.",
    user_photoURL: "https://randomuser.me/api/portraits/women/32.jpg",
    date: "2025-06-05T11:30:00.000Z",
  },
  {
    id: "5f47ac10b4f1c03e8c123006",
    user_email: "elijah.wilson@example.com",
    userName: "Elijah Wilson",
    ratings: 3.8,
    review:
      "TripNest is a solid platform with useful tour information. Some pages loaded slowly and a few itineraries lacked details. Overall, a good experience.",
    user_photoURL: "https://randomuser.me/api/portraits/men/67.jpg",
    date: "2025-06-12T15:20:00.000Z",
  },
  {
    id: "5f47ac10b4f1c03e8c123007",
    user_email: "sophia.moore@example.com",
    userName: "Sophia Moore",
    ratings: 4.7,
    review:
      "I loved the curated tours and smooth booking experience. The interface is modern and easy to navigate. Customer support was prompt and helpful.",
    user_photoURL: "https://randomuser.me/api/portraits/women/28.jpg",
    date: "2025-07-01T14:50:00.000Z",
  },
  {
    id: "5f47ac10b4f1c03e8c123008",
    user_email: "mason.taylor@example.com",
    userName: "Mason Taylor",
    ratings: 4.3,
    review:
      "TripNest made planning my trip easier with clear tour details. Booking was fast and confirmation was instant. Support handled a small issue efficiently.",
    user_photoURL: "https://randomuser.me/api/portraits/men/41.jpg",
    date: "2025-07-20T12:10:00.000Z",
  },
];
