import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { MessageSquare } from "lucide-react";

interface VideoStats {
  speed: string;
  distanceCovered: string;
  agilityScore: string;
}

interface VideoCardProps {
  athleteId: string;
  athleteName: string;
  athleteProfilePic: string;
  videoThumbnail: string;
  uploadDate: string;
  stats: VideoStats;
  isFollowing: boolean;
  onFollowToggle: (athleteId: string) => void;
  showFeedback?: boolean;
  onSendFeedback?: (athleteId: string) => void;
  onProfileClick?: (athleteId: string) => void;
}

export function VideoCard({
  athleteId,
  athleteName,
  athleteProfilePic,
  videoThumbnail,
  uploadDate,
  stats,
  isFollowing,
  onFollowToggle,
  showFeedback = false,
  onSendFeedback,
  onProfileClick,
}: VideoCardProps) {
  return (
    <Card className="overflow-hidden bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800">
      <div className="flex flex-col lg:flex-row">
        {/* Video Section */}
        <div className="flex-1">
          {/* Athlete Info Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-3">
              <img
                src={athleteProfilePic}
                alt={athleteName}
                className={`w-10 h-10 rounded-full object-cover border-2 border-[#1C7F0F] dark:border-[#22C55E] ${
                  onProfileClick ? "cursor-pointer hover:opacity-80 transition-opacity" : ""
                }`}
                onClick={() => onProfileClick?.(athleteId)}
              />
              <div>
                <h3 className="text-gray-900 dark:text-white">{athleteName}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{uploadDate}</p>
              </div>
            </div>
            
            <Button
              onClick={() => onFollowToggle(athleteId)}
              className={
                isFollowing
                  ? "bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700"
                  : "bg-[#1C7F0F] hover:bg-[#155F0B] dark:bg-[#22C55E] dark:hover:bg-[#16A34A] text-white dark:text-black"
              }
            >
              {isFollowing ? "Followed" : "Follow"}
            </Button>
          </div>

          {/* Video Thumbnail */}
          <div className="aspect-video bg-gray-900 relative">
            <img
              src={videoThumbnail}
              alt="Video thumbnail"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="w-16 h-16 bg-white/90 dark:bg-black/90 rounded-full flex items-center justify-center hover:bg-white dark:hover:bg-black transition-colors">
                <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-[#1C7F0F] dark:border-l-[#22C55E] border-b-8 border-b-transparent ml-1"></div>
              </button>
            </div>
          </div>

          {/* Feedback Button for Coaches */}
          {showFeedback && onSendFeedback && (
            <div className="p-4 border-t border-gray-200 dark:border-gray-800">
              <Button
                onClick={() => onSendFeedback(athleteId)}
                variant="outline"
                className="w-full border-[#1C7F0F] dark:border-[#22C55E] text-[#1C7F0F] dark:text-[#22C55E] hover:bg-[#1C7F0F] hover:text-white dark:hover:bg-[#22C55E] dark:hover:text-black"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Send Feedback
              </Button>
            </div>
          )}
        </div>

        {/* Stats Section */}
        <div className="lg:w-64 bg-gray-50 dark:bg-gray-900 p-4 border-t lg:border-t-0 lg:border-l border-gray-200 dark:border-gray-800">
          <h4 className="text-[#1C7F0F] dark:text-[#22C55E] mb-4">Performance Stats</h4>
          
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Speed</p>
              <p className="text-gray-900 dark:text-white">{stats.speed}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Distance Covered</p>
              <p className="text-gray-900 dark:text-white">{stats.distanceCovered}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Agility Score</p>
              <p className="text-gray-900 dark:text-white">{stats.agilityScore}</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}