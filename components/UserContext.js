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
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            router.push("/")
            return;
        }
        setRole(user.role);
        setUserName(user.username);
        setEmail(user.email);
        setPassword(user.password)
        setLoading(false);
    }, []);

    if (loading) {
        return <div>Loading...</div>; // Or an empty placeholder, depending on your design
    }

    return (
        <UserRoleContext.Provider value={{ role, userName, email, password, setRole, setUserName }}>
            {children}
        </UserRoleContext.Provider>
    )
}
// Custom hook to access the userDetails
export const useUserRole = () => {
    return useContext(UserRoleContext);
};