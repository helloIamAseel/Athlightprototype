import { useState } from "react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Camera, Edit, Trash2, Upload, ArrowLeft, FileText, User } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { UploadVideoFlow } from "./UploadVideoFlow";
import { ReportsModal } from "./ReportsModal";
import { ReportDetailsModal } from "./ReportDetailsModal";
import { EditProfileModal } from "./EditProfileModal";
import { toast } from "sonner@2.0.3";
import { ThemeToggle } from "./ThemeToggle";
import { useUser } from "../contexts/UserContext";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";

interface AthleteProfilePageProps {
  onBack: () => void;
}

interface AthleteVideo {
  id: string;
  title: string;
  type: "training" | "match";
  views: number;
  uploadDate: string;
  thumbnail: string;
}

export function AthleteProfilePage({ onBack }: AthleteProfilePageProps) {
  const [metricType, setMetricType] = useState("speed");
  const [videoType, setVideoType] = useState("all");
  const [timeRange, setTimeRange] = useState("last-7-days");
  const [videoFilter, setVideoFilter] = useState("all");
  const [showUploadFlow, setShowUploadFlow] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [videoToDelete, setVideoToDelete] = useState<string | null>(null);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const [showReportsModal, setShowReportsModal] = useState(false);
  const [showReportDetailsModal, setShowReportDetailsModal] = useState(false);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const { user, logout } = useUser();
  
  // Calculate age from date of birth
  const calculateAge = (dob: string | undefined): number => {
    if (!dob) return 19;
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };
  
  // Mock athlete data
  const athleteData = {
    name: user?.fullName || "Ahmed Al-Mansouri",
    sport: user?.sportType || "Football",
    position: user?.playerPosition || "Forward",
    nationality: user?.nationality || "Saudi Arabia",
    role: "Athlete",
    followers: 1234,
    following: 89,
    videosCount: 156,
    email: user?.email || "ahmed.almansouri@gmail.com",
    club: user?.clubName || "FC Barcelona Youth",
    age: calculateAge(user?.dateOfBirth),
    height: user?.height ? `${user.height} cm` : "6'1\"",
    weight: user?.weight ? `${user.weight} kg` : "175 lbs",
    injuryHistory: user?.injuryHistory || "None",
    profilePic: user?.profilePic || "https://images.unsplash.com/photo-1758223520256-2686c6d8044d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdGhsZXRlJTIwcHJvZmlsZXxlbnwxfHx8fDE3NjU1NTUzMTV8MA&ixlib=rb-4.1.0&q=80&w=1080",
  };

  const [videos, setVideos] = useState<AthleteVideo[]>([
    {
      id: "1",
      title: "Sprint Training Session",
      type: "training",
      views: 1234,
      uploadDate: "Dec 10, 2025",
      thumbnail: "https://images.unsplash.com/photo-1616514169928-a1e40c6f791c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NjZXIlMjB0cmFpbmluZyUyMHZpZGVvfGVufDF8fHx8MTc2NTU1NTMxNnww&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      id: "2",
      title: "Championship Match Highlights",
      type: "match",
      views: 3456,
      uploadDate: "Dec 8, 2025",
      thumbnail: "https://images.unsplash.com/photo-1759694542153-ad02551b15b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXNrZXRiYWxsJTIwbWF0Y2glMjBhY3Rpb258ZW58MXx8fHwxNzY1NTU1MzE2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      id: "3",
      title: "Agility Drills",
      type: "training",
      views: 890,
      uploadDate: "Dec 5, 2025",
      thumbnail: "https://images.unsplash.com/photo-1547992455-3815e61a458a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb290YmFsbCUyMHRyYWluaW5nJTIwZHJpbGx8ZW58MXx8fHwxNzY1NTU1MzE3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
  ]);

  // Mock chart data
  const lineChartData = [
    { date: "Dec 1", value: 28 },
    { date: "Dec 3", value: 31 },
    { date: "Dec 5", value: 29 },
    { date: "Dec 7", value: 33 },
    { date: "Dec 9", value: 35 },
    { date: "Dec 11", value: 34 },
  ];

  const barChartData = [
    { period: "Previous", value: 28 },
    { period: "Current", value: 35 },
  ];

  const handleDeleteVideo = (videoId: string) => {
    setVideoToDelete(videoId);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (videoToDelete) {
      setVideos(videos.filter(v => v.id !== videoToDelete));
      athleteData.videosCount -= 1;
      toast.success("Video deleted successfully");
    }
    setDeleteDialogOpen(false);
    setVideoToDelete(null);
  };

  const handleUploadComplete = (videoName: string, videoType: "training" | "match") => {
    const newVideo: AthleteVideo = {
      id: Date.now().toString(),
      title: videoName,
      type: videoType,
      views: 0,
      uploadDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      thumbnail: videoType === "match" 
        ? "https://images.unsplash.com/photo-1759694542153-ad02551b15b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXNrZXRiYWxsJTIwbWF0Y2glMjBhY3Rpb258ZW58MXx8fHwxNzY1NTU1MzE2fDA&ixlib=rb-4.1.0&q=80&w=1080"
        : "https://images.unsplash.com/photo-1616514169928-a1e40c6f791c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NjZXIlMjB0cmFpbmluZyUyMHZpZGVvfGVufDF8fHx8MTc2NTU1NTMxNnww&ixlib=rb-4.1.0&q=80&w=1080",
    };
    setVideos([newVideo, ...videos]);
    athleteData.videosCount += 1;
    setShowUploadFlow(false);
  };

  const filteredVideos = videos.filter(video => {
    if (videoFilter === "all") return true;
    return video.type === videoFilter;
  });

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Header */}
      <div className="bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 px-4 py-4 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="hover:bg-gray-100 dark:hover:bg-gray-900"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          </Button>
          <h1 className="text-gray-900 dark:text-white">Athlete Profile</h1>
          <ThemeToggle />
        </div>
      </div>

      {/* Main Content - Desktop Split Layout */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Half - Performance Dashboard */}
          <div className="space-y-6">
            <h2 className="text-gray-900 dark:text-white">Performance Dashboard</h2>
            
            {/* Filters */}
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-sm text-gray-600 dark:text-gray-400 mb-2 block">Metric Type</label>
                <Select value={metricType} onValueChange={setMetricType}>
                  <SelectTrigger className="dark:bg-gray-950 dark:border-gray-800">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Metrics Over Time</SelectItem>
                    <SelectItem value="speed">Average Speed</SelectItem>
                    <SelectItem value="agility">Agility Score</SelectItem>
                    <SelectItem value="distance">Total Distance</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm text-gray-600 dark:text-gray-400 mb-2 block">Video Type</label>
                <Select value={videoType} onValueChange={setVideoType}>
                  <SelectTrigger className="dark:bg-gray-950 dark:border-gray-800">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="match">Match</SelectItem>
                    <SelectItem value="training">Training</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm text-gray-600 dark:text-gray-400 mb-2 block">Time Range</label>
                <Select value={timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger className="dark:bg-gray-950 dark:border-gray-800">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="last-7-days">Last 7 Days</SelectItem>
                    <SelectItem value="last-month">Last Month</SelectItem>
                    <SelectItem value="last-year">Last Year</SelectItem>
                    <SelectItem value="most-recent">Most Recent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-2 gap-4">
              {/* Line Chart */}
              <Card className="p-4 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
                <h3 className="text-sm mb-3 text-gray-900 dark:text-white">
                  {metricType === "all" ? "All Metrics Over Time" : metricType === "speed" ? "Average Speed Over Time" : metricType === "agility" ? "Agility Score Over Time" : "Total Distance Over Time"}
                </h3>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={lineChartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="date" stroke="#9CA3AF" fontSize={12} />
                    <YAxis stroke="#9CA3AF" fontSize={12} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1F2937', 
                        border: '1px solid #374151',
                        borderRadius: '8px'
                      }}
                    />
                    <Line type="monotone" dataKey="value" stroke="#1C7F0F" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </Card>

              {/* Bar Chart */}
              <Card className="p-4 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
                <h3 className="text-sm mb-3 text-gray-900 dark:text-white">Improvement Comparison</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={barChartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="period" stroke="#9CA3AF" fontSize={12} />
                    <YAxis stroke="#9CA3AF" fontSize={12} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1F2937', 
                        border: '1px solid #374151',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar dataKey="value" fill="#1C7F0F" />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </div>

            {/* Information Summary */}
            <div>
              <h3 className="mb-3 text-gray-900 dark:text-white">Information Summary</h3>
              <div className="grid grid-cols-4 gap-3">
                <Card className="p-4 border-2 border-[#1C7F0F] dark:border-[#22C55E] bg-transparent">
                  <p className="text-sm text-[#1C7F0F] dark:text-[#22C55E] mb-2">Matches Analysed</p>
                  <p className="text-gray-900 dark:text-white">42</p>
                </Card>
                <Card className="p-4 border-2 border-[#1C7F0F] dark:border-[#22C55E] bg-transparent">
                  <p className="text-sm text-[#1C7F0F] dark:text-[#22C55E] mb-2">Average Score</p>
                  <p className="text-gray-900 dark:text-white">8.4</p>
                </Card>
                <Card className="p-4 border-2 border-[#1C7F0F] dark:border-[#22C55E] bg-transparent">
                  <p className="text-sm text-[#1C7F0F] dark:text-[#22C55E] mb-2">Videos Uploaded</p>
                  <p className="text-gray-900 dark:text-white">{athleteData.videosCount}</p>
                </Card>
                <Card className="p-4 border-2 border-[#1C7F0F] dark:border-[#22C55E] bg-transparent">
                  <p className="text-sm text-[#1C7F0F] dark:text-[#22C55E] mb-2">Last Analysis</p>
                  <p className="text-sm text-gray-900 dark:text-white">Dec 8, 2025</p>
                </Card>
              </div>
            </div>
          </div>

          {/* Right Half - Profile Information */}
          <div className="space-y-6">
            {/* Profile Picture and Basic Info */}
            <Card className="p-6 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
              <div className="flex gap-6">
                <div className="relative flex-shrink-0">
                  {user?.profilePic && user.profilePic.trim() !== "" ? (
                    <img
                      src={athleteData.profilePic}
                      alt={athleteData.name}
                      className="w-32 h-32 rounded-full object-cover border-4 border-[#1C7F0F] dark:border-[#22C55E]"
                    />
                  ) : (
                    <div className="w-32 h-32 rounded-full bg-gray-200 dark:bg-gray-800 border-4 border-[#1C7F0F] dark:border-[#22C55E] flex items-center justify-center">
                      <User className="w-16 h-16 text-gray-400 dark:text-gray-600" />
                    </div>
                  )}
                  <button className="absolute bottom-0 right-0 w-10 h-10 bg-[#1C7F0F] dark:bg-[#22C55E] rounded-full flex items-center justify-center hover:bg-[#155F0B] dark:hover:bg-[#16A34A] transition-colors">
                    <Camera className="w-5 h-5 text-white dark:text-black" />
                  </button>
                </div>

                <div className="flex-1">
                  <h2 className="text-gray-900 dark:text-white mb-2">{athleteData.name}</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                    {athleteData.sport}
                    {athleteData.sport === "Football" && athleteData.position && ` · ${athleteData.position}`}
                    {` · ${athleteData.nationality} · ${athleteData.role}`}
                  </p>
                  
                  <div className="flex gap-6 mb-3">
                    <div>
                      <p className="text-gray-900 dark:text-white">{athleteData.followers}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Followers</p>
                    </div>
                    <div>
                      <p className="text-gray-900 dark:text-white">{athleteData.following}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Following</p>
                    </div>
                    <div>
                      <p className="text-gray-900 dark:text-white">{athleteData.videosCount}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Videos</p>
                    </div>
                  </div>

                  <a href={`mailto:${athleteData.email}`} className="text-sm text-[#1C7F0F] dark:text-[#22C55E] hover:underline">
                    {athleteData.email}
                  </a>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-900 dark:text-white mb-1">Club</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{athleteData.club}</p>
                </div>
                <div>
                  <p className="text-gray-900 dark:text-white mb-1">Age</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{athleteData.age}</p>
                </div>
                <div>
                  <p className="text-gray-900 dark:text-white mb-1">Height</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{athleteData.height}</p>
                </div>
                <div>
                  <p className="text-gray-900 dark:text-white mb-1">Weight</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{athleteData.weight}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-gray-900 dark:text-white mb-1">Injury History</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{athleteData.injuryHistory}</p>
                </div>
              </div>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                onClick={() => setShowUploadFlow(true)}
                className="w-full bg-[#1C7F0F] hover:bg-[#155F0B] dark:bg-[#22C55E] dark:hover:bg-[#16A34A] text-white dark:text-black"
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload Video
              </Button>

              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  className="border-[#1C7F0F] dark:border-[#22C55E] text-[#1C7F0F] dark:text-[#22C55E] hover:bg-[#1C7F0F] hover:text-white dark:hover:bg-[#22C55E] dark:hover:text-black"
                  onClick={() => setShowEditProfileModal(true)}
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
                <Button
                  variant="outline"
                  className="border-[#1C7F0F] dark:border-[#22C55E] text-[#1C7F0F] dark:text-[#22C55E] hover:bg-[#1C7F0F] hover:text-white dark:hover:bg-[#22C55E] dark:hover:text-black"
                  onClick={() => setShowReportsModal(true)}
                >
                  <FileText className="w-4 h-4 mr-2" />
                  View Reports
                </Button>
              </div>
              
              <Button
                onClick={() => setLogoutDialogOpen(true)}
                variant="outline"
                className="w-full border-red-500 text-red-500 hover:bg-red-500 hover:text-white dark:border-red-500 dark:text-red-500 dark:hover:bg-red-500 dark:hover:text-white"
              >
                Log Out
              </Button>
            </div>
          </div>
        </div>

        {/* Videos Section - Full Width Below */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-gray-900 dark:text-white">My Videos</h2>
            <Select value={videoFilter} onValueChange={setVideoFilter}>
              <SelectTrigger className="w-48 dark:bg-gray-950 dark:border-gray-800">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Videos</SelectItem>
                <SelectItem value="match">Match Videos</SelectItem>
                <SelectItem value="training">Training Videos</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredVideos.map((video) => (
              <Card 
                key={video.id} 
                className="overflow-hidden border-2 border-[#1C7F0F] dark:border-[#22C55E] bg-gray-100 dark:bg-gray-900 flex flex-col"
              >
                <div className="aspect-video relative flex-shrink-0">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                      <div className="w-0 h-0 border-t-6 border-t-transparent border-l-10 border-l-[#1C7F0F] border-b-6 border-b-transparent ml-1"></div>
                    </div>
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="text-gray-900 dark:text-white mb-2">{video.title}</h3>
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-3">
                    <span className="capitalize">{video.type}</span>
                    <span>{video.views.toLocaleString()} views</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-xs text-gray-500 dark:text-gray-500">{video.uploadDate}</p>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteVideo(video.id)}
                      className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Upload Video Flow */}
      {showUploadFlow && (
        <UploadVideoFlow 
          onClose={() => setShowUploadFlow(false)}
          onUploadComplete={handleUploadComplete}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="dark:bg-gray-950 dark:border-gray-800">
          <AlertDialogHeader>
            <AlertDialogTitle className="dark:text-white">Are you sure?</AlertDialogTitle>
            <AlertDialogDescription className="dark:text-gray-400">
              This action cannot be reversed. The video will be permanently deleted from your profile.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              Yes, Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Logout Confirmation Dialog */}
      <AlertDialog open={logoutDialogOpen} onOpenChange={setLogoutDialogOpen}>
        <AlertDialogContent className="dark:bg-gray-950 dark:border-gray-800">
          <AlertDialogHeader>
            <AlertDialogTitle className="dark:text-white">Want to log out?</AlertDialogTitle>
            <AlertDialogDescription className="dark:text-gray-400">
              You will be returned to the login page.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800">
              No
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              Yes
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Reports Modal */}
      <ReportsModal
        isOpen={showReportsModal}
        onClose={() => setShowReportsModal(false)}
        onViewReport={(reportId) => {
          console.log("Viewing report:", reportId);
          // TODO: Navigate to report details page
          toast.success("Report details view coming soon!");
          setShowReportDetailsModal(true);
        }}
      />

      {/* Report Details Modal */}
      <ReportDetailsModal
        isOpen={showReportDetailsModal}
        onClose={() => setShowReportDetailsModal(false)}
        reportId="1"
        athleteName={athleteData.name}
        age={athleteData.age}
        sport={athleteData.sport}
        position={athleteData.position}
      />

      {/* Edit Profile Modal */}
      {showEditProfileModal && (
        <EditProfileModal
          onClose={() => setShowEditProfileModal(false)}
        />
      )}
    </div>
  );
}