export type BookingStatus =
  | "pending"
  | "active"
  | "completed"
  | "cancelled"
  | "disputed";

export interface Booking {
  id: string;
  client: string;
  clientAvatar: string;
  tasker: string;
  taskerAvatar: string;
  serviceCategory: string;
  status: BookingStatus;
  price: number;
  date: string;
  location: string;
  description: string;
  duration: string;
}

export const mockBookings: Booking[] = [
  {
    id: "BK-7821",
    client: "Emma Wilson",
    clientAvatar: "EW",
    tasker: "Marcus Johnson",
    taskerAvatar: "MJ",
    serviceCategory: "Plumbing",
    status: "active",
    price: 120,
    date: "2024-03-11",
    location: "123 Oak St, Austin TX",
    description: "Fix leaking kitchen faucet and replace bathroom pipes.",
    duration: "2 hours",
  },
  {
    id: "BK-7820",
    client: "Liam Chen",
    clientAvatar: "LC",
    tasker: "Sarah Chen",
    taskerAvatar: "SC",
    serviceCategory: "Cleaning",
    status: "completed",
    price: 85,
    date: "2024-03-10",
    location: "456 Maple Ave, Austin TX",
    description: "Deep clean 3-bedroom apartment before move-out.",
    duration: "4 hours",
  },
  {
    id: "BK-7819",
    client: "Olivia Brown",
    clientAvatar: "OB",
    tasker: "David Park",
    taskerAvatar: "DP",
    serviceCategory: "Moving",
    status: "pending",
    price: 250,
    date: "2024-03-12",
    location: "789 Pine Rd, Austin TX",
    description:
      "Help moving furniture from 2-bedroom apartment to new house.",
    duration: "6 hours",
  },
  {
    id: "BK-7818",
    client: "Noah Davis",
    clientAvatar: "ND",
    tasker: "Amelia Torres",
    taskerAvatar: "AT",
    serviceCategory: "Painting",
    status: "disputed",
    price: 380,
    date: "2024-03-09",
    location: "321 Elm St, Austin TX",
    description:
      "Paint living room and two bedrooms. Client disputes quality of work.",
    duration: "8 hours",
  },
  {
    id: "BK-7817",
    client: "Sophia Martinez",
    clientAvatar: "SM",
    tasker: "James Wilson",
    taskerAvatar: "JW",
    serviceCategory: "Landscaping",
    status: "completed",
    price: 175,
    date: "2024-03-08",
    location: "654 Birch Ln, Austin TX",
    description: "Lawn mowing, hedge trimming, and garden cleanup.",
    duration: "3 hours",
  },
  {
    id: "BK-7816",
    client: "Ethan Taylor",
    clientAvatar: "ET",
    tasker: "Priya Patel",
    taskerAvatar: "PP",
    serviceCategory: "Tutoring",
    status: "active",
    price: 60,
    date: "2024-03-11",
    location: "Online",
    description: "SAT Math prep session, focus on algebra and geometry.",
    duration: "1.5 hours",
  },
  {
    id: "BK-7815",
    client: "Isabella Anderson",
    clientAvatar: "IA",
    tasker: "Carlos Rivera",
    taskerAvatar: "CR",
    serviceCategory: "Carpentry",
    status: "cancelled",
    price: 200,
    date: "2024-03-07",
    location: "987 Cedar Dr, Austin TX",
    description: "Build custom bookshelf. Cancelled by client.",
    duration: "5 hours",
  },
  {
    id: "BK-7814",
    client: "Mason Jackson",
    clientAvatar: "MJ",
    tasker: "Nina Okafor",
    taskerAvatar: "NO",
    serviceCategory: "Pet Care",
    status: "completed",
    price: 45,
    date: "2024-03-06",
    location: "147 Walnut St, Austin TX",
    description: "Dog walking and feeding for 2 days while owner travels.",
    duration: "2 days",
  },
  {
    id: "BK-7813",
    client: "Ava White",
    clientAvatar: "AW",
    tasker: "Marcus Johnson",
    taskerAvatar: "MJ",
    serviceCategory: "Electrical",
    status: "pending",
    price: 150,
    date: "2024-03-13",
    location: "258 Spruce Ave, Austin TX",
    description: "Install ceiling fan and replace 3 light fixtures.",
    duration: "3 hours",
  },
  {
    id: "BK-7812",
    client: "James Harris",
    clientAvatar: "JH",
    tasker: "Sarah Chen",
    taskerAvatar: "SC",
    serviceCategory: "Cleaning",
    status: "active",
    price: 95,
    date: "2024-03-11",
    location: "369 Poplar Blvd, Austin TX",
    description: "Weekly house cleaning service.",
    duration: "3 hours",
  },
];

export const statusMeta: Record<
  BookingStatus,
  { label: string; badgeVariant: "secondary" | "default" | "destructive" | "outline" }
> = {
  pending: { label: "Pending", badgeVariant: "secondary" },
  active: { label: "Active", badgeVariant: "default" },
  completed: { label: "Completed", badgeVariant: "outline" },
  cancelled: { label: "Cancelled", badgeVariant: "secondary" },
  disputed: { label: "Disputed", badgeVariant: "destructive" },
};

