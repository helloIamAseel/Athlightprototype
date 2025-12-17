import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { CheckCircle } from "lucide-react";
import { useUser } from "../contexts/UserContext";
import { toast } from "sonner@2.0.3";

interface SignUpFormProps {
  onToggle: () => void;
}

type Role = "athlete" | "coach" | "scout" | null;

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

export function SignUpForm({ onToggle }: SignUpFormProps) {
  const [step, setStep] = useState<"role" | "form" | "success">("role");
  const [selectedRole, setSelectedRole] = useState<Role>(null);
  const [submitted, setSubmitted] = useState(false);
  const { login } = useUser();

  // General fields
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [sportType, setSportType] = useState("");
  const [clubName, setClubName] = useState("");
  const [nationality, setNationality] = useState("");

  // Athlete-specific fields
  const [playerPosition, setPlayerPosition] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [injuryHistory, setInjuryHistory] = useState("");

  // Coach-specific fields
  const [certificationLevel, setCertificationLevel] = useState("");
  const [yearsOfExperience, setYearsOfExperience] = useState("");

  // Scout-specific fields
  const [scoutingRegion, setScoutingRegion] = useState("");

  const handleRoleSelect = (role: Role) => {
    setSelectedRole(role);
    setStep("form");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email domain before submission
    if (!validateEmail(email)) {
      setEmailError("Please use a valid email address (Gmail, Outlook, Hotmail, Yahoo, or iCloud)");
      toast.error("Invalid email domain. Please use Gmail, Outlook, Hotmail, Yahoo, or iCloud.");
      return;
    }
    
    // Validate all fields
    const generalData = {
      fullName,
      email,
      password,
      phoneNumber,
      dateOfBirth,
      gender,
      sportType,
      clubName,
      nationality,
      role: selectedRole,
    };

    let roleSpecificData = {}; if (selectedRole === "athlete") {
      roleSpecificData = { playerPosition, height, weight, injuryHistory };
    } else if (selectedRole === "coach") {
      roleSpecificData = { certificationLevel, yearsOfExperience };
    } else if (selectedRole === "scout") {
      roleSpecificData = { scoutingRegion };
    }

    console.log("Registering user...", { ...generalData, ...roleSpecificData });
    
    toast.success("Account created successfully!");
    
    // Simulate successful registration and auto-login
    if (selectedRole) {
      login({
        id: "user" + Date.now(),
        fullName: fullName,
        email: email,
        role: selectedRole,
        profilePic: "",
        sportType: sportType,
        nationality: nationality,
        playerPosition: selectedRole === "athlete" ? playerPosition : undefined,
        phoneNumber: phoneNumber,
        dateOfBirth: dateOfBirth,
        gender: gender,
        clubName: clubName,
        height: selectedRole === "athlete" ? height : undefined,
        weight: selectedRole === "athlete" ? weight : undefined,
        injuryHistory: selectedRole === "athlete" ? injuryHistory : undefined,
        certificationLevel: selectedRole === "coach" ? certificationLevel : undefined,
        yearsOfExperience: selectedRole === "coach" ? yearsOfExperience : undefined,
        scoutingRegion: selectedRole === "scout" ? scoutingRegion : undefined,
      });
    }
  };

  if (step === "success") {
    return (
      <Card className="w-full max-w-md border-2 border-[#1C7F0F] dark:border-[#22C55E] dark:bg-gray-950">
        <CardHeader className="space-y-1 bg-[#1C7F0F] dark:bg-[#22C55E] text-white rounded-t-lg">
          <CardTitle className="text-center">Registration Successful!</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <CheckCircle className="w-16 h-16 text-[#1C7F0F] dark:text-[#22C55E]" />
            </div>
            <p className="text-gray-700 dark:text-gray-300">
              We've sent a verification email to <strong>{email}</strong>
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Please check your inbox and click the verification link to activate your account.
            </p>
            <Button 
              onClick={onToggle}
              className="w-full bg-[#1C7F0F] hover:bg-[#155F0B] dark:bg-[#22C55E] dark:hover:bg-[#16A34A] text-white"
            >
              Go to Login
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (step === "role") {
    return (
      <Card className="w-full max-w-md border-2 border-[#1C7F0F] dark:border-[#22C55E] dark:bg-gray-950">
        <CardHeader className="space-y-1 bg-[#1C7F0F] dark:bg-[#22C55E] text-white rounded-t-lg">
          <CardTitle className="text-center">Create Account</CardTitle>
          <CardDescription className="text-center text-green-100 dark:text-green-950">
            Choose your role to get started
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-3">
            <Button
              onClick={() => handleRoleSelect("athlete")}
              className="w-full bg-white hover:bg-[#1C7F0F] hover:text-white text-[#1C7F0F] border-2 border-[#1C7F0F] dark:bg-black dark:hover:bg-[#22C55E] dark:text-[#22C55E] dark:border-[#22C55E] dark:hover:text-white h-auto py-4"
              variant="outline"
            >
              <div className="text-left w-full">
                <div>Athlete</div>
                <div className="text-xs opacity-70">Register as a player</div>
              </div>
            </Button>
            
            <Button
              onClick={() => handleRoleSelect("coach")}
              className="w-full bg-white hover:bg-[#1C7F0F] hover:text-white text-[#1C7F0F] border-2 border-[#1C7F0F] dark:bg-black dark:hover:bg-[#22C55E] dark:text-[#22C55E] dark:border-[#22C55E] dark:hover:text-white h-auto py-4"
              variant="outline"
            >
              <div className="text-left w-full">
                <div>Coach</div>
                <div className="text-xs opacity-70">Register as a coach</div>
              </div>
            </Button>
            
            <Button
              onClick={() => handleRoleSelect("scout")}
              className="w-full bg-white hover:bg-[#1C7F0F] hover:text-white text-[#1C7F0F] border-2 border-[#1C7F0F] dark:bg-black dark:hover:bg-[#22C55E] dark:text-[#22C55E] dark:border-[#22C55E] dark:hover:text-white h-auto py-4"
              variant="outline"
            >
              <div className="text-left w-full">
                <div>Scout</div>
                <div className="text-xs opacity-70">Register as a scout</div>
              </div>
            </Button>
          </div>
          
          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={onToggle}
              className="text-[#1C7F0F] dark:text-[#22C55E] hover:underline"
            >
              Already have an account? Log in
            </button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl border-2 border-[#1C7F0F] dark:border-[#22C55E] max-h-[90vh] flex flex-col dark:bg-gray-950">
      <CardHeader className="space-y-1 bg-[#1C7F0F] dark:bg-[#22C55E] text-white rounded-t-lg flex-shrink-0">
        <CardTitle className="text-center">
          Register as {selectedRole === "athlete" ? "an Athlete" : selectedRole === "coach" ? "a Coach" : "a Scout"}
        </CardTitle>
        <CardDescription className="text-center text-green-100 dark:text-green-950">
          Fill in your details to create your account
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6 overflow-y-auto flex-1">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* General Fields */}
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
                  className="border-gray-300 dark:border-gray-700 focus:border-[#1C7F0F] dark:focus:border-[#22C55E] focus:ring-[#1C7F0F] dark:focus:ring-[#22C55E] dark:bg-gray-900 dark:text-white dark:placeholder-gray-500"
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
                  className={`border-gray-300 dark:border-gray-700 focus:border-[#1C7F0F] dark:focus:border-[#22C55E] focus:ring-[#1C7F0F] dark:focus:ring-[#22C55E] dark:bg-gray-900 dark:text-white dark:placeholder-gray-500 ${emailError ? "border-red-500" : ""}`}
                />
                {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="password" className="dark:text-gray-200">Password *</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="border-gray-300 dark:border-gray-700 focus:border-[#1C7F0F] dark:focus:border-[#22C55E] focus:ring-[#1C7F0F] dark:focus:ring-[#22C55E] dark:bg-gray-900 dark:text-white dark:placeholder-gray-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phoneNumber" className="dark:text-gray-200">Phone Number *</Label>
                <Input
                  id="phoneNumber"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                  className="border-gray-300 dark:border-gray-700 focus:border-[#1C7F0F] dark:focus:border-[#22C55E] focus:ring-[#1C7F0F] dark:focus:ring-[#22C55E] dark:bg-gray-900 dark:text-white dark:placeholder-gray-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dateOfBirth" className="dark:text-gray-200">Date of Birth *</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  required
                  className="border-gray-300 dark:border-gray-700 focus:border-[#1C7F0F] dark:focus:border-[#22C55E] focus:ring-[#1C7F0F] dark:focus:ring-[#22C55E] dark:bg-gray-900 dark:text-white dark:placeholder-gray-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="gender" className="dark:text-gray-200">Gender *</Label>
                <Select value={gender} onValueChange={setGender} required>
                  <SelectTrigger className="border-gray-300 dark:border-gray-700 focus:border-[#1C7F0F] dark:focus:border-[#22C55E] focus:ring-[#1C7F0F] dark:focus:ring-[#22C55E] dark:bg-gray-900 dark:text-white">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nationality" className="dark:text-gray-200">Nationality *</Label>
                <Input
                  id="nationality"
                  type="text"
                  placeholder="Enter your nationality"
                  value={nationality}
                  onChange={(e) => setNationality(e.target.value)}
                  required
                  className="border-gray-300 dark:border-gray-700 focus:border-[#1C7F0F] dark:focus:border-[#22C55E] focus:ring-[#1C7F0F] dark:focus:ring-[#22C55E] dark:bg-gray-900 dark:text-white dark:placeholder-gray-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="sportType" className="dark:text-gray-200">Sport Type *</Label>
                <Select value={sportType} onValueChange={setSportType} required>
                  <SelectTrigger className="border-gray-300 dark:border-gray-700 focus:border-[#1C7F0F] dark:focus:border-[#22C55E] focus:ring-[#1C7F0F] dark:focus:ring-[#22C55E] dark:bg-gray-900 dark:text-white">
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
            </div>

            <div className="space-y-2">
              <Label htmlFor="clubName" className="dark:text-gray-200">Club Name *</Label>
              <Input
                id="clubName"
                type="text"
                placeholder="Enter your club name"
                value={clubName}
                onChange={(e) => setClubName(e.target.value)}
                required
                className="border-gray-300 dark:border-gray-700 focus:border-[#1C7F0F] dark:focus:border-[#22C55E] focus:ring-[#1C7F0F] dark:focus:ring-[#22C55E] dark:bg-gray-900 dark:text-white dark:placeholder-gray-500"
              />
            </div>
          </div>

          {/* Role-Specific Fields */}
          {selectedRole === "athlete" && (
            <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <h3 className="text-[#1C7F0F] dark:text-[#22C55E]">Athlete Information</h3>
              
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
                  className="border-gray-300 dark:border-gray-700 focus:border-[#1C7F0F] dark:focus:border-[#22C55E] focus:ring-[#1C7F0F] dark:focus:ring-[#22C55E] dark:bg-gray-900 dark:text-white dark:placeholder-gray-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="height" className="dark:text-gray-200">Height (cm) *</Label>
                  <Input
                    id="height"
                    type="number"
                    placeholder="Enter height"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    required
                    className="border-gray-300 dark:border-gray-700 focus:border-[#1C7F0F] dark:focus:border-[#22C55E] focus:ring-[#1C7F0F] dark:focus:ring-[#22C55E] dark:bg-gray-900 dark:text-white dark:placeholder-gray-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="weight" className="dark:text-gray-200">Weight (kg) *</Label>
                  <Input
                    id="weight"
                    type="number"
                    placeholder="Enter weight"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    required
                    className="border-gray-300 dark:border-gray-700 focus:border-[#1C7F0F] dark:focus:border-[#22C55E] focus:ring-[#1C7F0F] dark:focus:ring-[#22C55E] dark:bg-gray-900 dark:text-white dark:placeholder-gray-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="injuryHistory" className="dark:text-gray-200">Injury History / Medical Notes</Label>
                <Textarea
                  id="injuryHistory"
                  placeholder="Enter any relevant injury history or medical notes"
                  value={injuryHistory}
                  onChange={(e) => setInjuryHistory(e.target.value)}
                  className="border-gray-300 dark:border-gray-700 focus:border-[#1C7F0F] dark:focus:border-[#22C55E] focus:ring-[#1C7F0F] dark:focus:ring-[#22C55E] dark:bg-gray-900 dark:text-white dark:placeholder-gray-500 min-h-[100px]"
                />
              </div>
            </div>
          )}

          {selectedRole === "coach" && (
            <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <h3 className="text-[#1C7F0F] dark:text-[#22C55E]">Coach Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="certificationLevel" className="dark:text-gray-200">Certification Level *</Label>
                  <Select value={certificationLevel} onValueChange={setCertificationLevel} required>
                    <SelectTrigger className="border-gray-300 dark:border-gray-700 focus:border-[#1C7F0F] dark:focus:border-[#22C55E] focus:ring-[#1C7F0F] dark:focus:ring-[#22C55E] dark:bg-gray-900 dark:text-white">
                      <SelectValue placeholder="Select certification" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="level1">Level 1</SelectItem>
                      <SelectItem value="level2">Level 2</SelectItem>
                      <SelectItem value="level3">Level 3</SelectItem>
                      <SelectItem value="pro">Pro License</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="yearsOfExperience" className="dark:text-gray-200">Years of Experience *</Label>
                  <Input
                    id="yearsOfExperience"
                    type="number"
                    placeholder="Enter years"
                    value={yearsOfExperience}
                    onChange={(e) => setYearsOfExperience(e.target.value)}
                    required
                    className="border-gray-300 dark:border-gray-700 focus:border-[#1C7F0F] dark:focus:border-[#22C55E] focus:ring-[#1C7F0F] dark:focus:ring-[#22C55E] dark:bg-gray-900 dark:text-white dark:placeholder-gray-500"
                  />
                </div>
              </div>
            </div>
          )}

          {selectedRole === "scout" && (
            <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <h3 className="text-[#1C7F0F] dark:text-[#22C55E]">Scout Information</h3>
              
              <div className="space-y-2">
                <Label htmlFor="scoutingRegion" className="dark:text-gray-200">Region of Scouting Focus *</Label>
                <Input
                  id="scoutingRegion"
                  type="text"
                  placeholder="e.g., Europe, North America"
                  value={scoutingRegion}
                  onChange={(e) => setScoutingRegion(e.target.value)}
                  required
                  className="border-gray-300 dark:border-gray-700 focus:border-[#1C7F0F] dark:focus:border-[#22C55E] focus:ring-[#1C7F0F] dark:focus:ring-[#22C55E] dark:bg-gray-900 dark:text-white dark:placeholder-gray-500"
                />
              </div>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              onClick={() => setStep("role")}
              variant="outline"
              className="flex-1 border-[#1C7F0F] dark:border-[#22C55E] text-[#1C7F0F] dark:text-[#22C55E] hover:bg-gray-100 dark:hover:bg-gray-900"
            >
              Back
            </Button>
            <Button 
              type="submit" 
              className="flex-1 bg-[#1C7F0F] hover:bg-[#155F0B] dark:bg-[#22C55E] dark:hover:bg-[#16A34A] text-white"
            >
              Create Account
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}