import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { toast } from "sonner@2.0.3";
import { useUser } from "../contexts/UserContext";

interface EditProfileModalProps {
  onClose: () => void;
}

// Valid email domains
const VALID_EMAIL_DOMAINS = [
  "@gmail.com",
  "@outlook.com",
  "@hotmail.com",
  "@yahoo.com",
  "@icloud.com"
];

// Email validation function
const validateEmail = (email: string): boolean => {
  const emailLower = email.toLowerCase();
  return VALID_EMAIL_DOMAINS.some(domain => emailLower.endsWith(domain));
};

export function EditProfileModal({ onClose }: EditProfileModalProps) {
  const { user, updateUser } = useUser();

  if (!user) return null;

  // General fields - pre-filled with current user data
  const [fullName, setFullName] = useState(user.fullName || "");
  const [email, setEmail] = useState(user.email || "");
  const [emailError, setEmailError] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber || "");
  const [dateOfBirth, setDateOfBirth] = useState(user.dateOfBirth || "");
  const [gender, setGender] = useState(user.gender || "");
  const [sportType, setSportType] = useState(user.sportType || "");
  const [clubName, setClubName] = useState(user.clubName || "");
  const [nationality, setNationality] = useState(user.nationality || "");

  // Athlete-specific fields
  const [playerPosition, setPlayerPosition] = useState(user.playerPosition || "");
  const [height, setHeight] = useState(user.height || "");
  const [weight, setWeight] = useState(user.weight || "");
  const [injuryHistory, setInjuryHistory] = useState(user.injuryHistory || "");

  // Coach-specific fields
  const [certificationLevel, setCertificationLevel] = useState(user.certificationLevel || "");
  const [yearsOfExperience, setYearsOfExperience] = useState(user.yearsOfExperience || "");

  // Scout-specific fields
  const [scoutingRegion, setScoutingRegion] = useState(user.scoutingRegion || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email domain before submission
    if (!validateEmail(email)) {
      setEmailError("Please use a valid email address (Gmail, Outlook, Hotmail, Yahoo, or iCloud)");
      toast.error("Invalid email domain. Please use Gmail, Outlook, Hotmail, Yahoo, or iCloud.");
      return;
    }

    // Create updated user object
    const updatedUserData = {
      ...user,
      fullName,
      email,
      phoneNumber,
      dateOfBirth,
      gender,
      sportType,
      clubName,
      nationality,
    };

    // Add role-specific fields
    if (user.role === "athlete") {
      Object.assign(updatedUserData, { playerPosition, height, weight, injuryHistory });
    } else if (user.role === "coach") {
      Object.assign(updatedUserData, { certificationLevel, yearsOfExperience });
    } else if (user.role === "scout") {
      Object.assign(updatedUserData, { scoutingRegion });
    }

    // Update user context
    updateUser(updatedUserData);
    
    toast.success("Profile updated successfully!");
    onClose();
  };

  const handleDiscard = () => {
    if (confirm("Are you sure you want to discard your changes?")) {
      onClose();
    }
  };

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/60 z-40"
        onClick={handleDiscard}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-950 rounded-2xl shadow-2xl max-w-3xl w-full border border-gray-200 dark:border-gray-800 max-h-[90vh] flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800 flex-shrink-0 bg-[#1C7F0F] dark:bg-[#22C55E] rounded-t-2xl">
            <div>
              <h2 className="text-white dark:text-black">Edit Profile</h2>
              <p className="text-sm text-green-100 dark:text-green-950 mt-1">
                Update your information
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleDiscard}
              className="hover:bg-green-800 dark:hover:bg-green-400"
            >
              <X className="w-5 h-5 text-white dark:text-black" />
            </Button>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto flex-1">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-[#1C7F0F] dark:text-[#22C55E]">Personal Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="dark:text-gray-200">Full Name *</Label>
                    <Input
                      id="fullName"
                      type="text"
                      placeholder="Enter your full name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                      className="border-gray-300 dark:border-gray-700 focus:border-[#1C7F0F] dark:focus:border-[#22C55E] dark:bg-gray-900 dark:text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="dark:text-gray-200">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (!validateEmail(e.target.value)) {
                          setEmailError("Please use a valid email domain.");
                        } else {
                          setEmailError("");
                        }
                      }}
                      required
                      className={`border-gray-300 dark:border-gray-700 focus:border-[#1C7F0F] dark:focus:border-[#22C55E] dark:bg-gray-900 dark:text-white ${emailError ? "border-red-500" : ""}`}
                    />
                    {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber" className="dark:text-gray-200">Phone Number *</Label>
                    <Input
                      id="phoneNumber"
                      type="tel"
                      placeholder="Enter your phone number"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      required
                      className="border-gray-300 dark:border-gray-700 focus:border-[#1C7F0F] dark:focus:border-[#22C55E] dark:bg-gray-900 dark:text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth" className="dark:text-gray-200">Date of Birth *</Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={dateOfBirth}
                      onChange={(e) => setDateOfBirth(e.target.value)}
                      required
                      className="border-gray-300 dark:border-gray-700 focus:border-[#1C7F0F] dark:focus:border-[#22C55E] dark:bg-gray-900 dark:text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="gender" className="dark:text-gray-200">Gender *</Label>
                    <Select value={gender} onValueChange={setGender} required>
                      <SelectTrigger className="border-gray-300 dark:border-gray-700 focus:border-[#1C7F0F] dark:focus:border-[#22C55E] dark:bg-gray-900 dark:text-white">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="nationality" className="dark:text-gray-200">Nationality *</Label>
                    <Input
                      id="nationality"
                      type="text"
                      placeholder="Enter your nationality"
                      value={nationality}
                      onChange={(e) => setNationality(e.target.value)}
                      required
                      className="border-gray-300 dark:border-gray-700 focus:border-[#1C7F0F] dark:focus:border-[#22C55E] dark:bg-gray-900 dark:text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="sportType" className="dark:text-gray-200">Sport Type *</Label>
                    <Select value={sportType} onValueChange={setSportType} required>
                      <SelectTrigger className="border-gray-300 dark:border-gray-700 focus:border-[#1C7F0F] dark:focus:border-[#22C55E] dark:bg-gray-900 dark:text-white">
                        <SelectValue placeholder="Select sport" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Football">Football</SelectItem>
                        <SelectItem value="Padel">Padel</SelectItem>
                        <SelectItem value="Swimming">Swimming</SelectItem>
                        <SelectItem value="Running">Running</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="clubName" className="dark:text-gray-200">Club/Organization Name</Label>
                    <Input
                      id="clubName"
                      type="text"
                      placeholder="Enter club name"
                      value={clubName}
                      onChange={(e) => setClubName(e.target.value)}
                      className="border-gray-300 dark:border-gray-700 focus:border-[#1C7F0F] dark:focus:border-[#22C55E] dark:bg-gray-900 dark:text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Role-specific fields */}
              {user.role === "athlete" && (
                <div className="space-y-4">
                  <h3 className="text-[#1C7F0F] dark:text-[#22C55E]">Athletic Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="playerPosition" className="dark:text-gray-200">
                        Player Position {sportType === "Football" && "*"}
                      </Label>
                      <Input
                        id="playerPosition"
                        type="text"
                        placeholder="e.g., Forward, Midfielder"
                        value={playerPosition}
                        onChange={(e) => setPlayerPosition(e.target.value)}
                        required={sportType === "Football"}
                        className="border-gray-300 dark:border-gray-700 focus:border-[#1C7F0F] dark:focus:border-[#22C55E] dark:bg-gray-900 dark:text-white"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="height" className="dark:text-gray-200">Height (cm)</Label>
                      <Input
                        id="height"
                        type="text"
                        placeholder="e.g., 175"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        className="border-gray-300 dark:border-gray-700 focus:border-[#1C7F0F] dark:focus:border-[#22C55E] dark:bg-gray-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="weight" className="dark:text-gray-200">Weight (kg)</Label>
                      <Input
                        id="weight"
                        type="text"
                        placeholder="e.g., 70"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        className="border-gray-300 dark:border-gray-700 focus:border-[#1C7F0F] dark:focus:border-[#22C55E] dark:bg-gray-900 dark:text-white"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="injuryHistory" className="dark:text-gray-200">Injury History</Label>
                      <Textarea
                        id="injuryHistory"
                        placeholder="Describe any past injuries"
                        value={injuryHistory}
                        onChange={(e) => setInjuryHistory(e.target.value)}
                        rows={2}
                        className="border-gray-300 dark:border-gray-700 focus:border-[#1C7F0F] dark:focus:border-[#22C55E] dark:bg-gray-900 dark:text-white resize-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {user.role === "coach" && (
                <div className="space-y-4">
                  <h3 className="text-[#1C7F0F] dark:text-[#22C55E]">Coaching Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="certificationLevel" className="dark:text-gray-200">Certification Level</Label>
                      <Select value={certificationLevel} onValueChange={setCertificationLevel}>
                        <SelectTrigger className="border-gray-300 dark:border-gray-700 focus:border-[#1C7F0F] dark:focus:border-[#22C55E] dark:bg-gray-900 dark:text-white">
                          <SelectValue placeholder="Select certification" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Level 1">Level 1</SelectItem>
                          <SelectItem value="Level 2">Level 2</SelectItem>
                          <SelectItem value="Level 3">Level 3</SelectItem>
                          <SelectItem value="Professional">Professional</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="yearsOfExperience" className="dark:text-gray-200">Years of Experience</Label>
                      <Input
                        id="yearsOfExperience"
                        type="text"
                        placeholder="e.g., 5"
                        value={yearsOfExperience}
                        onChange={(e) => setYearsOfExperience(e.target.value)}
                        className="border-gray-300 dark:border-gray-700 focus:border-[#1C7F0F] dark:focus:border-[#22C55E] dark:bg-gray-900 dark:text-white"
                      />
                    </div>
                  </div>
                </div>
              )}

              {user.role === "scout" && (
                <div className="space-y-4">
                  <h3 className="text-[#1C7F0F] dark:text-[#22C55E]">Scouting Information</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="scoutingRegion" className="dark:text-gray-200">Scouting Region</Label>
                    <Input
                      id="scoutingRegion"
                      type="text"
                      placeholder="e.g., Middle East, Europe"
                      value={scoutingRegion}
                      onChange={(e) => setScoutingRegion(e.target.value)}
                      className="border-gray-300 dark:border-gray-700 focus:border-[#1C7F0F] dark:focus:border-[#22C55E] dark:bg-gray-900 dark:text-white"
                    />
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* Footer */}
          <div className="flex gap-3 p-6 border-t border-gray-200 dark:border-gray-800 flex-shrink-0">
            <Button
              variant="outline"
              onClick={handleDiscard}
              className="flex-1 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300"
            >
              Discard
            </Button>
            <Button
              onClick={handleSubmit}
              className="flex-1 bg-[#1C7F0F] hover:bg-[#155F0B] dark:bg-[#22C55E] dark:hover:bg-[#16A34A] text-white dark:text-black"
            >
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}