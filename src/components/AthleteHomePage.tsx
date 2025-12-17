import { useState } from "react";
import { TopNavBar } from "./TopNavBar";
import { BottomNavBar } from "./BottomNavBar";
import { VideoCard } from "./VideoCard";
import { mockVideos } from "../data/mockData";
import { useUser } from "../contexts/UserContext";
import { ThemeToggle } from "./ThemeToggle";
import { NotificationsPage } from "./NotificationsPage";
import { AthleteProfilePage } from "./AthleteProfilePage";
import { UploadVideoFlow } from "./UploadVideoFlow";
import { PublicProfilePage, PublicUser } from "./PublicProfilePage";

export function AthleteHomePage() {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState<"feed" | "following">("feed");
  const [followedAthletes, setFollowedAthletes] = useState<Set<string>>(new Set());
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showUploadFlow, setShowUploadFlow] = useState(false);
  const [selectedPublicUser, setSelectedPublicUser] = useState<PublicUser | null>(null);

  if (!user) return null;

  // Show public profile if selected
  if (selectedPublicUser) {
    return <PublicProfilePage user={selectedPublicUser} onBack={() => setSelectedPublicUser(null)} />;
  }

  // Show notifications page if active
  if (showNotifications) {
    return <NotificationsPage onBack={() => setShowNotifications(false)} />;
  }

  // Show profile page if active
  if (showProfile) {
    return <AthleteProfilePage onBack={() => setShowProfile(false)} />;
  }

  const handleFollowToggle = (athleteId: string) => {
    setFollowedAthletes((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(athleteId)) {
        newSet.delete(athleteId);
      } else {
        newSet.add(athleteId);
      }
      return newSet;
    });
  };

  const handleUploadClick = () => {
    setShowUploadFlow(true);
  };

  const handleUploadComplete = (videoName: string, videoType: "training" | "match") => {
    // Here you would typically add the video to the feed
    // For now, just close the upload flow
    setShowUploadFlow(false);
  };

  const handleProfileClick = (athleteId: string) => {
    // Find the athlete from the videos
    const video = mockVideos.find(v => v.athleteId === athleteId);
    if (!video) return;

    // Create a PublicUser object
    const publicUser: PublicUser = {
      id: video.athleteId,
      name: video.athleteName,
      sport: "Football",
      position: "Forward",
      nationality: "Saudi Arabia",
      role: "Athlete",
      followers: Math.floor(Math.random() * 5000) + 500,
      following: Math.floor(Math.random() * 500) + 50,
      profilePic: video.athleteProfilePic,
      age: Math.floor(Math.random() * 15) + 20,
      email: `${video.athleteName.toLowerCase().replace(' ', '.')}@gmail.com`,
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
        {
          id: "v3",
          title: "Speed and Agility Drills",
          thumbnail: video.videoThumbnail,
          views: 891,
          uploadDate: video.uploadDate,
          duration: "4:20",
        },
      ],
    };

    setSelectedPublicUser(publicUser);
  };

  const displayVideos =
    activeTab === "following"
      ? mockVideos.filter((video) => followedAthletes.has(video.athleteId))
      : mockVideos;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black pb-20">
      <ThemeToggle />
      
      <TopNavBar
        profilePic={user.profilePic}
        userName={user.fullName}
        notificationCount={5}
        onNotificationClick={() => setShowNotifications(true)}
        onProfileClick={() => setShowProfile(true)}
      />

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="space-y-6">
          {displayVideos.length > 0 ? (
            displayVideos.map((video) => (
              <VideoCard
                key={video.id}
                athleteId={video.athleteId}
                athleteName={video.athleteName}
                athleteProfilePic={video.athleteProfilePic}
                videoThumbnail={video.videoThumbnail}
                uploadDate={video.uploadDate}
                stats={video.stats}
                isFollowing={followedAthletes.has(video.athleteId)}
                onFollowToggle={handleFollowToggle}
                onProfileClick={() => handleProfileClick(video.athleteId)}
              />
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">
                {activeTab === "following"
                  ? "You're not following any athletes yet. Follow some athletes to see their content here!"
                  : "No videos available"}
              </p>
            </div>
          )}
        </div>
      </div>

      <BottomNavBar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        showUpload={true}
        onUploadClick={handleUploadClick}
      />

      {showUploadFlow && (
        <UploadVideoFlow
          onUploadComplete={handleUploadComplete}
          onClose={() => setShowUploadFlow(false)}
        />
      )}
    </div>
  );
}