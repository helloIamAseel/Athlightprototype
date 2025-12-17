import { useState } from "react";
import { ArrowLeft, User, UserCheck, MessageSquare, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { ThemeToggle } from "./ThemeToggle";
import { PublicProfilePage, PublicUser } from "./PublicProfilePage";

interface NotificationsPageProps {
  onBack: () => void;
}

interface Notification {
  id: string;
  type: "athlete_activity" | "coach_feedback" | "follow";
  userName: string;
  userAvatar: string;
  timestamp: string;
  read: boolean;
  activityType?: "video" | "performance_report";
  videoTitle?: string;
  userId: string;
  userRole: "Athlete" | "Coach" | "Scout";
  userSport: string;
  userNationality: string;
}

export function NotificationsPage({ onBack }: NotificationsPageProps) {
  const [selectedUser, setSelectedUser] = useState<PublicUser | null>(null);
  
  // Mock notifications data with realistic sports images
  const [notifications] = useState<Notification[]>([
    {
      id: "1",
      type: "athlete_activity",
      userName: "Omar Hassan",
      userAvatar: "https://images.unsplash.com/photo-1659523585860-c349407e512d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXNrZXRiYWxsJTIwcGxheWVyJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzY1NDIyMjM4fDA&ixlib=rb-4.1.0&q=80&w=1080",
      timestamp: "5 minutes ago",
      read: false,
      activityType: "video",
      userId: "user1",
      userRole: "Athlete",
      userSport: "Basketball",
      userNationality: "Saudi Arabia",
    },
    {
      id: "2",
      type: "coach_feedback",
      userName: "Coach Karim Al-Rashid",
      userAvatar: "https://images.unsplash.com/photo-1585757318177-0570a997dc3a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NjZXIlMjBjb2FjaHxlbnwxfHx8fDE3NjU1MjE1NTV8MA&ixlib=rb-4.1.0&q=80&w=1080",
      timestamp: "1 hour ago",
      read: false,
      videoTitle: "Sprint Training Session",
      userId: "user2",
      userRole: "Coach",
      userSport: "Football",
      userNationality: "Saudi Arabia",
    },
    {
      id: "3",
      type: "follow",
      userName: "Fatima Al-Zahra",
      userAvatar: "https://images.unsplash.com/photo-1609540204874-3f48f851636c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZW5uaXMlMjBwbGF5ZXIlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjU1MjE1NTZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      timestamp: "2 hours ago",
      read: true,
      userId: "user3",
      userRole: "Athlete",
      userSport: "Tennis",
      userNationality: "Morocco",
    },
    {
      id: "4",
      type: "athlete_activity",
      userName: "Ali Al-Zahrani",
      userAvatar: "https://images.unsplash.com/photo-1516224498413-84ecf3a1e7fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdGhsZXRlJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzY1NDMxMjAwfDA&ixlib=rb-4.1.0&q=80&w=1080",
      timestamp: "5 hours ago",
      read: true,
      activityType: "performance_report",
      userId: "user4",
      userRole: "Athlete",
      userSport: "Track & Field",
      userNationality: "Saudi Arabia",
    },
    {
      id: "5",
      type: "follow",
      userName: "Hassan Al-Najjar",
      userAvatar: "https://images.unsplash.com/photo-1535031726088-dd46f73b68fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHMlMjBzY291dCUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NjU1MjE1NTZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      timestamp: "Yesterday",
      read: true,
      userId: "user5",
      userRole: "Scout",
      userSport: "Football",
      userNationality: "Saudi Arabia",
    },
    {
      id: "6",
      type: "coach_feedback",
      userName: "Coach Saeed Al-Harbi",
      userAvatar: "https://images.unsplash.com/photo-1585757318177-0570a997dc3a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NjZXIlMjBjb2FjaHxlbnwxfHx8fDE3NjU1MjE1NTV8MA&ixlib=rb-4.1.0&q=80&w=1080",
      timestamp: "Yesterday",
      read: true,
      videoTitle: "Agility Drills",
      userId: "user6",
      userRole: "Coach",
      userSport: "Football",
      userNationality: "Saudi Arabia",
    },
    {
      id: "7",
      type: "athlete_activity",
      userName: "Nour Al-Din",
      userAvatar: "https://images.unsplash.com/photo-1657957746418-6a38df9e1ea7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb290YmFsbCUyMHBsYXllciUyMGFjdGlvbnxlbnwxfHx8fDE3NjU1MTg0MDZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      timestamp: "2 days ago",
      read: true,
      activityType: "video",
      userId: "user7",
      userRole: "Athlete",
      userSport: "Football",
      userNationality: "Tunisia",
    },
  ]);

  const getMockUserData = (notification: Notification): PublicUser => {
    const publicUser: PublicUser = {
      id: notification.userId,
      name: notification.userName,
      sport: notification.userSport,
      nationality: notification.userNationality,
      role: notification.userRole,
      profilePic: notification.userAvatar,
      age: Math.floor(Math.random() * 15) + 20,
      email: `${notification.userName.toLowerCase().replace(' ', '.')}@gmail.com`,
      followers: Math.floor(Math.random() * 5000) + 500,
      following: Math.floor(Math.random() * 500) + 50,
    };

    if (notification.userRole === "Athlete") {
      return {
        ...publicUser,
        position: notification.userSport === "Football" ? "Forward" : undefined,
        club: "Athletic Club",
        height: "6'1\" (185 cm)",
        weight: "176 lbs (80 kg)",
        injuryHistory: "None",
        videos: [
          {
            id: "v1",
            title: "Training Session Highlights",
            thumbnail: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHMlMjB0cmFpbmluZ3xlbnwxfHx8fDE3NjU1MTg0MDZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
            views: 1234,
            uploadDate: "2 days ago",
            duration: "3:45",
          },
          {
            id: "v2",
            title: "Game Performance Review",
            thumbnail: "https://images.unsplash.com/photo-1517649763962-0c623066013b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHMlMjBnYW1lfGVufDF8fHx8MTc2NTUxODQwNnww&ixlib=rb-4.1.0&q=80&w=1080",
            views: 2567,
            uploadDate: "1 week ago",
            duration: "5:12",
          },
        ],
      };
    } else if (notification.userRole === "Coach") {
      return {
        ...publicUser,
        certificationLevel: "UEFA Pro License",
        yearsOfExperience: 12,
      };
    } else {
      return {
        ...publicUser,
        organization: "Manchester United FC",
        regionOfFocus: "Europe & South America",
      };
    }
  };

  const handleAvatarClick = (notification: Notification) => {
    const userData = getMockUserData(notification);
    setSelectedUser(userData);
  };

  // Show public profile if user is selected
  if (selectedUser) {
    return <PublicProfilePage user={selectedUser} onBack={() => setSelectedUser(null)} />;
  }

  const getNotificationContent = (notification: Notification) => {
    switch (notification.type) {
      case "athlete_activity":
        if (notification.activityType === "performance_report") {
          return {
            title: `${notification.userName} received a new performance report`,
            description: "Performance metrics have been updated",
          };
        }
        return {
          title: `${notification.userName} uploaded a new training video`,
          description: "Check out their latest activity",
        };
      
      case "coach_feedback":
        return {
          title: `${notification.userName} added feedback on your video`,
          description: notification.videoTitle ? `"${notification.videoTitle}"` : "View the feedback",
        };
      
      case "follow":
        return {
          title: `${notification.userName} started following you`,
          description: "They can now see your activities",
        };
      
      default:
        return { title: "", description: "" };
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Header */}
      <div className="bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 px-4 py-4 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={onBack}
                className="hover:bg-gray-100 dark:hover:bg-gray-900"
              >
                <ArrowLeft className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              </Button>
              <h1 className="text-gray-900 dark:text-white">Notifications</h1>
            </div>
            
            <div className="flex items-center gap-3">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="space-y-3">
          {notifications.map((notification) => {
            const content = getNotificationContent(notification);
            return (
              <Card
                key={notification.id}
                className={`p-4 border border-gray-200 dark:border-gray-800 ${
                  notification.read
                    ? "bg-white dark:bg-gray-950"
                    : "bg-green-50 dark:bg-gray-900 border-[#1C7F0F] dark:border-[#22C55E]"
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* User Avatar */}
                  <img
                    src={notification.userAvatar}
                    alt={notification.userName}
                    className="w-12 h-12 rounded-full object-cover border-2 border-[#1C7F0F] dark:border-[#22C55E] flex-shrink-0 cursor-pointer"
                    onClick={() => handleAvatarClick(notification)}
                  />
                  
                  {/* Notification Content */}
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-900 dark:text-white mb-1">
                      {content.title}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {content.description}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500">
                      {notification.timestamp}
                    </p>
                  </div>

                  {/* Chevron Icon */}
                  <ChevronRight className="w-5 h-5 text-gray-400 dark:text-gray-600 flex-shrink-0" />
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}