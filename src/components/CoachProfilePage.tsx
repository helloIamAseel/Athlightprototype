import { useState } from "react";
import { Camera, Edit, ArrowLeft, User } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { ThemeToggle } from "./ThemeToggle";
import { FeedbackHistoryPage } from "./FeedbackHistoryPage";
import { EditProfileModal } from "./EditProfileModal";
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

interface CoachProfilePageProps {
  onBack: () => void;
}

export function CoachProfilePage({ onBack }: CoachProfilePageProps) {
  const [showFeedbackHistory, setShowFeedbackHistory] = useState(false);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const { user, logout } = useUser();
  
  // Calculate age from date of birth
  const calculateAge = (dob: string | undefined): number => {
    if (!dob) return 35;
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  // Mock coach data
  const coachData = {
    name: user?.fullName || "Youssef Ibrahim",
    sport: user?.sportType || "Football",
    position: "Head Coach",
    nationality: user?.nationality || "Egypt",
    role: "Coach",
    followers: 2345,
    following: 156,
    email: user?.email || "youssef.ibrahim@yahoo.com",
    club: user?.clubName || "FC Barcelona Academy",
    age: calculateAge(user?.dateOfBirth),
    certificationLevel: user?.certificationLevel || "UEFA Pro License",
    yearsOfExperience: user?.yearsOfExperience ? parseInt(user.yearsOfExperience) : 12,
    profilePic: user?.profilePic || "https://images.unsplash.com/photo-1609503842755-77f4a81d69ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBjb2FjaCUyMHNwb3J0c3xlbnwxfHx8fDE3NjU1Njg5MDN8MA&ixlib=rb-4.1.0&q=80&w=1080",
  };

  // Show feedback history if active
  if (showFeedbackHistory) {
    return <FeedbackHistoryPage onBack={() => setShowFeedbackHistory(false)} />;
  }

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
          <h1 className="text-gray-900 dark:text-white">Coach Profile</h1>
          <ThemeToggle />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Profile Information */}
        <Card className="p-6 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
          <div className="flex gap-6">
            <div className="relative flex-shrink-0">
              {user?.profilePic && user.profilePic.trim() !== "" ? (
                <img
                  src={coachData.profilePic}
                  alt={coachData.name}
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
              <h2 className="text-gray-900 dark:text-white mb-2">{coachData.name}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                {coachData.sport} · {coachData.nationality} · {coachData.role}
              </p>
              
              <div className="flex gap-6 mb-3">
                <div>
                  <p className="text-gray-900 dark:text-white">{coachData.followers}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Followers</p>
                </div>
                <div>
                  <p className="text-gray-900 dark:text-white">{coachData.following}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Following</p>
                </div>
              </div>

              <a href={`mailto:${coachData.email}`} className="text-sm text-[#1C7F0F] dark:text-[#22C55E] hover:underline">
                {coachData.email}
              </a>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-900 dark:text-white mb-1">Club</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{coachData.club}</p>
            </div>
            <div>
              <p className="text-gray-900 dark:text-white mb-1">Age</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{coachData.age}</p>
            </div>
            <div>
              <p className="text-gray-900 dark:text-white mb-1">Certification Level</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{coachData.certificationLevel}</p>
            </div>
            <div>
              <p className="text-gray-900 dark:text-white mb-1">Years of Experience</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{coachData.yearsOfExperience} years</p>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Button
            onClick={() => setShowEditProfileModal(true)}
            variant="outline"
            className="border-[#1C7F0F] dark:border-[#22C55E] text-[#1C7F0F] dark:text-[#22C55E] hover:bg-[#1C7F0F] hover:text-white dark:hover:bg-[#22C55E] dark:hover:text-black"
          >
            <Edit className="w-4 h-4 mr-2" />
            Edit Profile
          </Button>
          
          <Button
            onClick={() => setShowFeedbackHistory(true)}
            variant="outline"
            className="border-[#1C7F0F] dark:border-[#22C55E] text-[#1C7F0F] dark:text-[#22C55E] hover:bg-[#1C7F0F] hover:text-white dark:hover:bg-[#22C55E] dark:hover:text-black"
          >
            <User className="w-4 h-4 mr-2" />
            View Feedback History
          </Button>
        </div>
        
        <div className="mt-3">
          <Button
            onClick={() => setLogoutDialogOpen(true)}
            variant="outline"
            className="w-full border-red-500 text-red-500 hover:bg-red-500 hover:text-white dark:border-red-500 dark:text-red-500 dark:hover:bg-red-500 dark:hover:text-white"
          >
            Log Out
          </Button>
        </div>
      </div>
      
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
      
      {/* Edit Profile Modal */}
      {showEditProfileModal && (
        <EditProfileModal
          onClose={() => setShowEditProfileModal(false)}
        />
      )}
    </div>
  );
}