import React, { createContext, useContext, useState, ReactNode } from 'react';

type UserRole = 'student' | 'admin' | 'teacher'

interface UserRoleContextType {
  role: UserRole | null; // null for unauthenticated
  setRole: (role: UserRole | null) => void;
}

const UserRoleContext = createContext<UserRoleContextType | undefined>(undefined);

interface UserRoleProviderProps {
  children: ReactNode;
}

export const UserRoleProvider: React.FC<UserRoleProviderProps> = ({ children }) => {
  const role1=localStorage.getItem('role1')
const [role, setRole] = useState<UserRole | null>(role1 as UserRole ?? null);

console.log('role',role)
  return (
    <UserRoleContext.Provider value={{ role, setRole }}>
      {children}
    </UserRoleContext.Provider>
  );
};

export const useUserRole = (): UserRoleContextType => {
  const context = useContext(UserRoleContext);
  if (context === undefined) {
    throw new Error('useUserRole must be used within a UserRoleProvider');
  }
  return context;
};