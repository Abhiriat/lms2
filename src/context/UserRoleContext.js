import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState } from 'react';
const UserRoleContext = createContext(undefined);
export const UserRoleProvider = ({ children }) => {
    const role1 = localStorage.getItem('role1');
    const [role, setRole] = useState(role1 ?? null);
    console.log('role', role);
    return (_jsx(UserRoleContext.Provider, { value: { role, setRole }, children: children }));
};
export const useUserRole = () => {
    const context = useContext(UserRoleContext);
    if (context === undefined) {
        throw new Error('useUserRole must be used within a UserRoleProvider');
    }
    return context;
};
