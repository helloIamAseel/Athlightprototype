import { useState } from "react";
import { ArrowLeft, UserPlus, UserCheck, Play, FileText, MessageSquare } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { ThemeToggle } from "./ThemeToggle";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { ReportsModal } from "./ReportsModal";
import { ReportDetailsModal } from "./ReportDetailsModal";
import { SendFeedbackModal } from "./SendFeedbackModal";
import { useUser } from "../contexts/UserContext";
import { toast } from "sonner@2.0.3";

export interface PublicUser {
  id: string;
  name: string;
  sport: string;
  position?: string;
  nationality: string;
  role: "Athlete" | "Coach" | "Scout";
  followers: number;
  following: number;
  age?: number;
  profilePic: string;
  email: string;
  
  // Athlete specific
  club?: string;
  height?: string;
  weight?: string;
  injuryHistory?: string;
  
  // Coach specific
  certificationLevel?: string;
  yearsOfExperience?: number;
  
  // Scout specific
  regionOfFocus?: string;
  organization?: string;
  
  // Videos (for athletes)
  videos?: Array<{
    id: string;
    title: string;
    thumbnail: string;
    views: number;
    uploadDate: string;
    duration: string;
  }>;
}

interface PublicProfilePageProps {
  user: PublicUser;
  onBack: () => void;
}

export function PublicProfilePage({ user, onBack }: PublicProfilePageProps) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState(user.followers);
  const [metricType, setMetricType] = useState("all");
  const [videoType, setVideoType] = useState("all");
  const [timeRange, setTimeRange] = useState("last-7-days");
  const [showReportsModal, setShowReportsModal] = useState(false);
  const [showReportDetailsModal, setShowReportDetailsModal] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const { user: currentUser } = useUser();

  const handleFollowToggle = () => {
    const newFollowingState = !isFollowing;
    setIsFollowing(newFollowingState);
    
    // Update follower count immediately
    if (newFollowingState) {
      setFollowerCount(prev => prev + 1);
      toast.success(`You are now following ${user.name}`);
    } else {
      setFollowerCount(prev => prev - 1);
      toast.success(`You unfollowed ${user.name}`);
    }
  };

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

  // Check if current user is a coach or scout
  const canViewReports = currentUser && (currentUser.role === "coach" || currentUser.role === "scout");

  // Render for non-athlete profiles
  if (user.role !== "Athlete") {
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
            <h1 className="text-gray-900 dark:text-white">{user.name}</h1>
            <ThemeToggle />
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-4 py-6">
          {/* Profile Information */}
          <Card className="p-6 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 mb-6">
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <img
                  src={user.profilePic}
                  alt={user.name}
                  className="w-32 h-32 rounded-full object-cover border-4 border-[#1C7F0F] dark:border-[#22C55E]"
                />
              </div>

              <div className="flex-1">
                <h2 className="text-gray-900 dark:text-white mb-2">{user.name}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                  {user.sport}
                  {user.position && ` · ${user.position}`}
                  {` · ${user.nationality} · ${user.role}`}
                </p>
                
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{user.email}</p>
                
                <div className="flex gap-6 mb-4">
                  <div>
                    <p className="text-gray-900 dark:text-white">{followerCount}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Followers</p>
                  </div>
                  <div>
                    <p className="text-gray-900 dark:text-white">{user.following}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Following</p>
                  </div>
                </div>

                {/* Follow Button */}
                <Button
                  onClick={handleFollowToggle}
                  className={`${
                    isFollowing
                      ? "bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700"
                      : "bg-[#1C7F0F] dark:bg-[#22C55E] text-white dark:text-black hover:bg-[#155F0B] dark:hover:bg-[#16A34A]"
                  }`}
                >
                  {isFollowing ? (
                    <>
                      <UserCheck className="w-4 h-4 mr-2" />
                      Following
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-4 h-4 mr-2" />
                      Follow
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Additional Info Grid */}
            <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-gray-200 dark:border-gray-800">
              {user.age && (
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Age</p>
                  <p className="text-sm text-gray-900 dark:text-white">{user.age}</p>
                </div>
              )}

              {user.role === "Coach" && user.certificationLevel && (
                <>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Certification</p>
                    <p className="text-sm text-gray-900 dark:text-white">{user.certificationLevel}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Experience</p>
                    <p className="text-sm text-gray-900 dark:text-white">{user.yearsOfExperience} years</p>
                  </div>
                </>
              )}

              {user.role === "Scout" && (
                <>
                  {user.organization && (
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Club</p>
                      <p className="text-sm text-gray-900 dark:text-white">{user.organization}</p>
                    </div>
                  )}
                  {user.regionOfFocus && (
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Region of Focus</p>
                      <p className="text-sm text-gray-900 dark:text-white">{user.regionOfFocus}</p>
                    </div>
                  )}
                </>
              )}
            </div>
          </Card>

          <Card className="p-12 text-center border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
            <p className="text-gray-500 dark:text-gray-400">
              {user.role === "Coach" ? "Coach profile" : "Scout profile"}
            </p>
          </Card>
        </div>
      </div>
    );
  }

  // Render for athlete profiles with dashboard
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
          <h1 className="text-gray-900 dark:text-white">{user.name}</h1>
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
                  <p className="text-gray-900 dark:text-white">{user.videos?.length || 0}</p>
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
                <div className="flex-shrink-0">
                  <img
                    src={user.profilePic}
                    alt={user.name}
                    className="w-32 h-32 rounded-full object-cover border-4 border-[#1C7F0F] dark:border-[#22C55E]"
                  />
                </div>

                <div className="flex-1">
                  <h2 className="text-gray-900 dark:text-white mb-2">{user.name}</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                    {user.sport}
                    {user.sport === "Football" && user.position && ` · ${user.position}`}
                    {` · ${user.nationality} · ${user.role}`}
                  </p>
                  
                  <div className="flex gap-6 mb-3">
                    <div>
                      <p className="text-gray-900 dark:text-white">{followerCount}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Followers</p>
                    </div>
                    <div>
                      <p className="text-gray-900 dark:text-white">{user.following}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Following</p>
                    </div>
                    <div>
                      <p className="text-gray-900 dark:text-white">{user.videos?.length || 0}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Videos</p>
                    </div>
                  </div>

                  <a href={`mailto:${user.email}`} className="text-sm text-[#1C7F0F] dark:text-[#22C55E] hover:underline">
                    {user.email}
                  </a>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-900 dark:text-white mb-1">Club</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{user.club || "N/A"}</p>
                </div>
                <div>
                  <p className="text-gray-900 dark:text-white mb-1">Age</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{user.age || "N/A"}</p>
                </div>
                <div>
                  <p className="text-gray-900 dark:text-white mb-1">Height</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{user.height || "N/A"}</p>
                </div>
                <div>
                  <p className="text-gray-900 dark:text-white mb-1">Weight</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{user.weight || "N/A"}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-gray-900 dark:text-white mb-1">Injury History</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{user.injuryHistory || "N/A"}</p>
                </div>
              </div>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-3">
              {canViewReports ? (
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    onClick={handleFollowToggle}
                    className={`${
                      isFollowing
                        ? "bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700"
                        : "bg-[#1C7F0F] dark:bg-[#22C55E] text-white dark:text-black hover:bg-[#155F0B] dark:hover:bg-[#16A34A]"
                    }`}
                  >
                    {isFollowing ? (
                      <>
                        <UserCheck className="w-4 h-4 mr-2" />
                        Following
                      </>
                    ) : (
                      <>
                        <UserPlus className="w-4 h-4 mr-2" />
                        Follow
                      </>
                    )}
                  </Button>

                  {/* View Reports Button - Only for Coaches and Scouts */}
                  <Button
                    onClick={() => setShowReportsModal(true)}
                    variant="outline"
                    className="border-[#1C7F0F] dark:border-[#22C55E] text-[#1C7F0F] dark:text-[#22C55E] hover:bg-[#1C7F0F] hover:text-white dark:hover:bg-[#22C55E] dark:hover:text-black"
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    View Reports
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={handleFollowToggle}
                  className={`w-full ${
                    isFollowing
                      ? "bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700"
                      : "bg-[#1C7F0F] dark:bg-[#22C55E] text-white dark:text-black hover:bg-[#155F0B] dark:hover:bg-[#16A34A]"
                  }`}
                >
                  {isFollowing ? (
                    <>
                      <UserCheck className="w-4 h-4 mr-2" />
                      Following
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-4 h-4 mr-2" />
                      Follow
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Videos Section - Full Width Below */}
        <div className="mt-8">
          <h2 className="text-gray-900 dark:text-white mb-4">Videos</h2>
          
          {user.videos && user.videos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {user.videos.map((video) => (
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
                        <Play className="w-6 h-6 text-[#1C7F0F] dark:text-[#22C55E] ml-1" />
                      </div>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                      {video.duration}
                    </div>
                  </div>
                  
                  <div className="p-4 flex flex-col flex-1">
                    <h3 className="text-gray-900 dark:text-white mb-2">{video.title}</h3>
                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-3">
                      <span>{video.views.toLocaleString()} views</span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mb-3">{video.uploadDate}</p>
                    
                    {/* Send Feedback Button - Only for Coaches */}
                    {currentUser?.role === "coach" && (
                      <Button
                        onClick={() => setShowFeedbackModal(true)}
                        className="w-full mt-auto bg-[#1C7F0F] dark:bg-[#22C55E] text-white dark:text-black hover:bg-[#155F0B] dark:hover:bg-[#16A34A]"
                      >
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Send Feedback
                      </Button>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-12 text-center border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
              <p className="text-gray-500 dark:text-gray-400">No videos uploaded yet</p>
            </Card>
          )}
        </div>
      </div>

      {/* Reports Modal */}
      <ReportsModal
        isOpen={showReportsModal}
        onClose={() => setShowReportsModal(false)}
        onViewReport={(reportId) => {
          console.log("Viewing report:", reportId);
          toast.success("Opening report details...");
          setShowReportDetailsModal(true);
        }}
      />

      {/* Report Details Modal */}
      <ReportDetailsModal
        isOpen={showReportDetailsModal}
        onClose={() => setShowReportDetailsModal(false)}
        reportId="1"
        athleteName={user.name}
        age={user.age || 0}
        sport={user.sport}
        position={user.position || ""}
      />

      {/* Send Feedback Modal */}
      {showFeedbackModal && (
        <SendFeedbackModal
          athleteId={user.id}
          onClose={() => setShowFeedbackModal(false)}
        />
      )}
    </div>
  );
}