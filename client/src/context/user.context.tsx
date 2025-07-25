import { createContext, useContext, useState } from "react";
import type { Anecdotes, User } from "../types/vite-env";

interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  anecdotes?: Anecdotes | null;
}

interface UserProviderPropsType {
  children: React.ReactElement;
}

export const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: UserProviderPropsType) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) throw new Error("Utilisez useUser dans un userProvider");
  return context;
};
