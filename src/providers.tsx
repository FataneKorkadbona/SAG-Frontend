// Assuming you have a context file, e.g., `src/providers/UserContext.tsx`
import { createContext, useContext, useState, ReactNode } from 'react';
import { User } from './user';

type UserContextType = {
    user: User | null;
    setUser: (user: User) => void;
};

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};