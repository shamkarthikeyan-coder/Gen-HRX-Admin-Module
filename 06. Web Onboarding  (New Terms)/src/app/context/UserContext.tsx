import { createContext, useContext, useState, ReactNode } from 'react';

interface UserData {
  name?: string;
  email?: string;
  bio?: string;
  location?: string;
  jobTitle?: string;
  company?: string;
  industry?: string;
  avatar?: string;
}

interface UserContextType {
  userData: UserData;
  updateUserData: (data: Partial<UserData>) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [userData, setUserData] = useState<UserData>({
    name: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    bio: 'HR Director passionate about building inclusive workplaces and empowering talent.',
    location: 'San Francisco, CA',
    jobTitle: 'Senior HR Director',
    company: 'Tech Corp',
    industry: 'Technology',
  });

  const updateUserData = (data: Partial<UserData>) => {
    setUserData(prev => ({ ...prev, ...data }));
  };

  return (
    <UserContext.Provider value={{ userData, updateUserData }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
