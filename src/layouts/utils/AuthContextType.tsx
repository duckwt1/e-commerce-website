// src/layouts/utils/AuthContextType.tsx
export interface AuthContextType {
    isLoggedIn: boolean;
    setLoggedIn: (loggedIn: boolean) => void;
    user: {
        name: string;
        avatarUrl: string;
    } | null;
    // other properties and methods
}
