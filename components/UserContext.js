'use client'
import { useRouter } from 'next/navigation';
import { createContext, useContext, useState, useEffect } from 'react';

const UserRoleContext = createContext();

export const UserRoleProvider = ({ children }) => {
    const router = useRouter();
    const [role, setRole] = useState(0);
    const [userName, setUserName] = useState('')
    let user;
    const [email, setEmail] = useState("")

    useEffect(() => {
        user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            router.push("/")
            return;
        }
        setRole(user.role);
        setUserName(user.name);
        setEmail(user.email);
    }, []);

    return (
        <UserRoleContext.Provider value={{ role, userName, email, setRole, setUserName }}>
            {children}
        </UserRoleContext.Provider>
    )
}
// Custom hook to access the userDetails
export const useUserRole = () => {
    return useContext(UserRoleContext);
};