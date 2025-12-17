import { useState } from "react";
import { Bell, Search, LogOut, User } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useUser } from "../contexts/UserContext";

interface TopNavBarProps {
  profilePic: string;
  userName: string;
  notificationCount: number;
  onNotificationClick?: () => void;
  onProfileClick?: () => void;
}

export function TopNavBar({ profilePic, userName, notificationCount, onNotificationClick, onProfileClick }: TopNavBarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [ageFilter, setAgeFilter] = useState("");
  const [sportFilter, setSportFilter] = useState("");
  const [positionFilter, setPositionFilter] = useState("");
  const [countryFilter, setCountryFilter] = useState("");
  const { logout } = useUser();

  const handleSearch = () => {
    console.log("Searching with:", {
      query: searchQuery,
      age: ageFilter,
      sport: sportFilter,
      position: positionFilter,
      country: countryFilter,
    });
  };

  return (
    <div className="bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 px-4 py-3">
      <div className="flex items-center gap-4 max-w-7xl mx-auto">
        {/* Profile Section */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <button onClick={onProfileClick} className="focus:outline-none">
            {profilePic ? (
              <img
                src={profilePic}
                alt={userName}
                className="w-10 h-10 rounded-full object-cover border-2 border-[#1C7F0F] dark:border-[#22C55E] hover:opacity-80 transition-opacity cursor-pointer"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-800 border-2 border-[#1C7F0F] dark:border-[#22C55E] flex items-center justify-center hover:opacity-80 transition-opacity cursor-pointer">
                <User className="w-5 h-5 text-gray-400 dark:text-gray-600" />
              </div>
            )}
          </button>
          <span className="text-gray-900 dark:text-white hidden sm:block">{userName}</span>
        </div>

        {/* Search Bar with Filters */}
        <div className="flex-1 flex gap-2">
          <div className="relative flex-1 max-w-xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search athletes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
            />
          </div>
          
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="border-[#1C7F0F] dark:border-[#22C55E] text-[#1C7F0F] dark:text-[#22C55E] hover:bg-[#1C7F0F] hover:text-white dark:hover:bg-[#22C55E] dark:hover:text-black"
              >
                Filters
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 dark:bg-gray-950 dark:border-gray-800">
              <div className="space-y-4">
                <h3 className="text-[#1C7F0F] dark:text-[#22C55E]">Search Filters</h3>
                
                <div className="space-y-2">
                  <Label className="dark:text-gray-200">Age</Label>
                  <Input
                    type="number"
                    placeholder="Enter age"
                    value={ageFilter}
                    onChange={(e) => setAgeFilter(e.target.value)}
                    className="dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="dark:text-gray-200">Sport</Label>
                  <Select value={sportFilter} onValueChange={setSportFilter}>
                    <SelectTrigger className="dark:bg-gray-900 dark:border-gray-700 dark:text-white">
                      <SelectValue placeholder="Select sport" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="football">Football</SelectItem>
                      <SelectItem value="padel">Padel</SelectItem>
                      <SelectItem value="swimming">Swimming</SelectItem>
                      <SelectItem value="running">Running</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="dark:text-gray-200">Position</Label>
                  <Input
                    type="text"
                    placeholder="e.g., Forward, Midfielder"
                    value={positionFilter}
                    onChange={(e) => setPositionFilter(e.target.value)}
                    className="dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="dark:text-gray-200">Country</Label>
                  <Input
                    type="text"
                    placeholder="Enter country"
                    value={countryFilter}
                    onChange={(e) => setCountryFilter(e.target.value)}
                    className="dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                  />
                </div>

                <Button
                  onClick={handleSearch}
                  className="w-full bg-[#1C7F0F] hover:bg-[#155F0B] dark:bg-[#22C55E] dark:hover:bg-[#16A34A] text-white"
                >
                  Apply Filters
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* Notification Bell */}
        <div className="relative flex-shrink-0">
          <Button
            variant="ghost"
            size="icon"
            className="relative hover:bg-gray-100 dark:hover:bg-gray-900"
            onClick={onNotificationClick}
          >
            <Bell className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            {notificationCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#1C7F0F] dark:bg-[#22C55E] text-white dark:text-black text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {notificationCount > 9 ? "9+" : notificationCount}
              </span>
            )}
          </Button>
        </div>

        {/* Logout Button */}
        <div className="flex-shrink-0">
          <Button
            variant="ghost"
            size="icon"
            className="relative hover:bg-gray-100 dark:hover:bg-gray-900"
            onClick={logout}
          >
            <LogOut className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          </Button>
        </div>
      </div>
    </div>
  );
}