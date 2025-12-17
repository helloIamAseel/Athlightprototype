import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { useUser } from "../contexts/UserContext";
import { toast } from "sonner@2.0.3";

interface LoginFormProps {
  onToggle: () => void;
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

export function LoginForm({ onToggle }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const { login } = useUser();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    
    // Clear error when user starts typing
    if (emailError) {
      setEmailError("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email domain
    if (!validateEmail(email)) {
      setEmailError("Please use a valid email address (Gmail, Outlook, Hotmail, Yahoo, or iCloud)");
      toast.error("Invalid email domain");
      return;
    }
    
    console.log("Logging in...", { email, password });
    
    // Mock login - simulate user based on email domain
    const role = email.includes("coach") ? "coach" : email.includes("scout") ? "scout" : "athlete";
    
    login({
      id: "user123",
      fullName: email.split("@")[0],
      email: email,
      role: role,
      profilePic: "",
      sportType: "Football",
      nationality: "USA",
    });
  };

  return (
    <Card className="w-full max-w-md border-2 border-[#1C7F0F] dark:border-[#22C55E] dark:bg-gray-950">
      <CardHeader className="space-y-1 bg-[#1C7F0F] dark:bg-[#22C55E] text-white rounded-t-lg">
        <CardTitle className="text-center">Welcome Back</CardTitle>
        <CardDescription className="text-center text-green-100 dark:text-green-950">
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="dark:text-gray-200">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleEmailChange}
              required
              className="border-gray-300 dark:border-gray-700 focus:border-[#1C7F0F] dark:focus:border-[#22C55E] focus:ring-[#1C7F0F] dark:focus:ring-[#22C55E] dark:bg-gray-900 dark:text-white dark:placeholder-gray-500"
            />
            {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="dark:text-gray-200">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border-gray-300 dark:border-gray-700 focus:border-[#1C7F0F] dark:focus:border-[#22C55E] focus:ring-[#1C7F0F] dark:focus:ring-[#22C55E] dark:bg-gray-900 dark:text-white dark:placeholder-gray-500"
            />
          </div>
          <Button 
            type="submit" 
            className="w-full bg-[#1C7F0F] hover:bg-[#155F0B] dark:bg-[#22C55E] dark:hover:bg-[#16A34A] text-white"
          >
            Log In
          </Button>
        </form>
        
        <div className="mt-4 text-center space-y-2">
          <button
            type="button"
            onClick={onToggle}
            className="text-[#1C7F0F] dark:text-[#22C55E] hover:underline block w-full"
          >
            Don't have an account? Sign up
          </button>
          <button
            type="button"
            onClick={() => console.log("Reset password clicked")}
            className="text-[#1C7F0F] dark:text-[#22C55E] hover:underline block w-full"
          >
            Reset password
          </button>
        </div>
      </CardContent>
    </Card>
  );
}