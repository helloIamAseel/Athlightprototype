export interface AthleteVideo {
  id: string;
  athleteId: string;
  athleteName: string;
  athleteProfilePic: string;
  videoThumbnail: string;
  uploadDate: string;
  stats: {
    speed: string;
    distanceCovered: string;
    agilityScore: string;
  };
}

export const mockVideos: AthleteVideo[] = [
  {
    id: "1",
    athleteId: "athlete1",
    athleteName: "Mohammed Al-Rashid",
    athleteProfilePic: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
    videoThumbnail: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&h=450&fit=crop",
    uploadDate: "2 hours ago",
    stats: {
      speed: "32.5 km/h",
      distanceCovered: "11.2 km",
      agilityScore: "8.7/10",
    },
  },
  {
    id: "2",
    athleteId: "athlete2",
    athleteName: "Layla Al-Zahra",
    athleteProfilePic: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    videoThumbnail: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=800&h=450&fit=crop",
    uploadDate: "5 hours ago",
    stats: {
      speed: "28.3 km/h",
      distanceCovered: "9.8 km",
      agilityScore: "9.2/10",
    },
  },
  {
    id: "3",
    athleteId: "athlete3",
    athleteName: "Omar Al-Hassan",
    athleteProfilePic: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    videoThumbnail: "https://images.unsplash.com/photo-1556817411-31ae72fa3ea0?w=800&h=450&fit=crop",
    uploadDate: "1 day ago",
    stats: {
      speed: "30.1 km/h",
      distanceCovered: "10.5 km",
      agilityScore: "8.4/10",
    },
  },
  {
    id: "4",
    athleteId: "athlete4",
    athleteName: "Amira Al-Farsi",
    athleteProfilePic: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    videoThumbnail: "https://images.unsplash.com/photo-1551958219-acbc608c6377?w=800&h=450&fit=crop",
    uploadDate: "1 day ago",
    stats: {
      speed: "29.7 km/h",
      distanceCovered: "10.1 km",
      agilityScore: "9.0/10",
    },
  },
  {
    id: "5",
    athleteId: "athlete5",
    athleteName: "Khalid Al-Mansouri",
    athleteProfilePic: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    videoThumbnail: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=450&fit=crop",
    uploadDate: "2 days ago",
    stats: {
      speed: "31.8 km/h",
      distanceCovered: "11.5 km",
      agilityScore: "8.9/10",
    },
  },
];