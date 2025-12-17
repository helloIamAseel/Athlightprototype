import { Home, Plus, Users } from "lucide-react";
import { Button } from "./ui/button";

interface BottomNavBarProps {
  activeTab: "feed" | "following";
  onTabChange: (tab: "feed" | "following") => void;
  showUpload?: boolean;
  onUploadClick?: () => void;
}

export function BottomNavBar({
  activeTab,
  onTabChange,
  showUpload = false,
  onUploadClick,
}: BottomNavBarProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 px-4 py-3 z-50">
      <div className="flex items-center justify-around max-w-md mx-auto">
        <Button
          variant="ghost"
          size="lg"
          onClick={() => onTabChange("feed")}
          className={
            activeTab === "feed"
              ? "text-[#1C7F0F] dark:text-[#22C55E]"
              : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
          }
        >
          <div className="flex flex-col items-center gap-1">
            <Home className="w-6 h-6" />
            <span className="text-xs">Feed</span>
          </div>
        </Button>

        {showUpload && onUploadClick && (
          <Button
            onClick={onUploadClick}
            size="lg"
            className="bg-[#1C7F0F] hover:bg-[#155F0B] dark:bg-[#22C55E] dark:hover:bg-[#16A34A] text-white dark:text-black rounded-full w-14 h-14"
          >
            <Plus className="w-6 h-6" />
          </Button>
        )}

        <Button
          variant="ghost"
          size="lg"
          onClick={() => onTabChange("following")}
          className={
            activeTab === "following"
              ? "text-[#1C7F0F] dark:text-[#22C55E]"
              : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
          }
        >
          <div className="flex flex-col items-center gap-1">
            <Users className="w-6 h-6" />
            <span className="text-xs">Following</span>
          </div>
        </Button>
      </div>
    </div>
  );
}
