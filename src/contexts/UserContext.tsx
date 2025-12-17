import { createContext, useContext, useState, ReactNode } from "react";

type Role = "athlete" | "coach" | "scout";

interface User {
  id: string;
  fullName: string;
  email: string;
  role: Role;
  profilePic: string;
  sportType: string;
  nationality: string;
  playerPosition?: string;
  phoneNumber?: string;
  dateOfBirth?: string;
  gender?: string;
  clubName?: string;
  height?: string;
  weight?: string;
  injuryHistory?: string;
  certificationLevel?: string;
  yearsOfExperience?: string;
  scoutingRegion?: string;
}

interface UserContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  updateUser: (userData: User) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  const updateUser = (userData: User) => {
    setUser(userData);
  };

  return (
    <UserContext.Provider value={{ user, login, logout, updateUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}