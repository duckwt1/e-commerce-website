// src/layouts/utils/AuthContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AuthContextType } from './AuthContextType';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [user, setUser] = useState<{ name: string; avatarUrl: string } | null>(null);

	const setLoggedIn = (loggedIn: boolean) => {
		setIsLoggedIn(loggedIn);
	};

	return (
		<AuthContext.Provider value={{ isLoggedIn, setLoggedIn, user }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
};
