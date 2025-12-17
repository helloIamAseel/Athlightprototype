import { useState } from "react";
import { LoginForm } from "./components/LoginForm";
import { SignUpForm } from "./components/SignUpForm";
import { ThemeProvider } from "./contexts/ThemeContext";
import { ThemeToggle } from "./components/ThemeToggle";
import { UserProvider, useUser } from "./contexts/UserContext";
import { AthleteHomePage } from "./components/AthleteHomePage";
import { CoachHomePage } from "./components/CoachHomePage";
import { ScoutHomePage } from "./components/ScoutHomePage";
import { Toaster } from "./components/ui/sonner";

function AppContent() {
  const [isLogin, setIsLogin] = useState(true);
  const { user } = useUser();

  // Show home page based on user role
  if (user) {
    if (user.role === "athlete") {
      return <AthleteHomePage />;
    } else if (user.role === "coach") {
      return <CoachHomePage />;
    } else if (user.role === "scout") {
      return <ScoutHomePage />;
    }
  }

  // Show login/signup if no user is logged in
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black p-4 transition-colors">
      <ThemeToggle />
      {isLogin ? (
        <LoginForm onToggle={() => setIsLogin(false)} />
      ) : (
        <SignUpForm onToggle={() => setIsLogin(true)} />
      )}
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <AppContent />
        <Toaster />
      </UserProvider>
    </ThemeProvider>
  );
}