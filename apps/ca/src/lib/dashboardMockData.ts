export interface ProfileData {
  caId: string;
  fullName: string;
  emailId: string;
  mobileNumber: string;
  whatsappNumber: string;
  collegeName: string;
  collegeCity: string;
  yearOfStudy: string;
  postalAddress: string;
}

export const mockProfileData: ProfileData = {
  caId: "CA-DEMO-2026-X",
  fullName: "Jane Doe (Demo)",
  emailId: "demo.ambassador@antaragni.in",
  mobileNumber: "+91 9999999999",
  whatsappNumber: "+91 9999999999",
  collegeName: "Demo University",
  collegeCity: "Kanpur",
  yearOfStudy: "Third Year",
  postalAddress: "123, Campus Street, Academic Block, Kanpur, Uttar Pradesh - 208001",
};

export interface LeaderboardEntry {
  rank: number;
  name: string;
  points: number;
}

export const mockLeaderboardData: LeaderboardEntry[] = [
  { rank: 1, name: "AARAV SINGH", points: 2450 },
  { rank: 2, name: "PRIYA SHARMA", points: 1980 },
  { rank: 3, name: "ROHAN KUMAR", points: 1760 },
  { rank: 4, name: "ANANYA NAIR", points: 1420 },
  { rank: 5, name: "SIDDHARTH KAPOOR", points: 1280 },
  { rank: 6, name: "MEGHA GUPTA", points: 1120 },
  { rank: 7, name: "VIVEK KHANDELWAL", points: 980 },
  { rank: 8, name: "NEHA TIWARI", points: 860 },
  { rank: 9, name: "ARJUN BANSAL", points: 760 },
  { rank: 10, name: "RITIKA SINHA", points: 640 },
];

export interface TaskItem {
  id: string;
  description: string;
  deadline: string;
  points: number;
  status: "SUBMIT" | "PENDING" | "COMPLETED";
}

export const mockTasksData: TaskItem[] = [
  { id: "1", description: "Promote our Instagram page on your campus story.", deadline: "Oct 25, 2026", points: 100, status: "SUBMIT" },
  { id: "2", description: "Organize a meet-up and share event pictures.", deadline: "Nov 02, 2026", points: 250, status: "SUBMIT" },
  { id: "3", description: "Create a video about our brand and upload it.", deadline: "Nov 10, 2026", points: 400, status: "SUBMIT" },
  { id: "4", description: "Bring 5 friends to follow our social media handles.", deadline: "Nov 15, 2026", points: 150, status: "SUBMIT" },
  { id: "5", description: "Distribute flyers and share the pictures.", deadline: "Nov 20, 2026", points: 200, status: "SUBMIT" },
  { id: "6", description: "Write a blog about your experience with us.", deadline: "Dec 01, 2026", points: 300, status: "SUBMIT" },
  { id: "7", description: "Participate in our webinar and share a post.", deadline: "Dec 05, 2026", points: 150, status: "SUBMIT" },
];
