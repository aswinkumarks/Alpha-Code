import { createContext, useContext } from 'react';
import { DEFAULT_AUTH_DETAILS } from './constants';
import { AuthContextType } from './types';

export const AuthContext = createContext<AuthContextType>({
	authDetails: DEFAULT_AUTH_DETAILS,
	setAuthDetails: () => {},
	login: (username: string, password: string) => {},
	logout: () => {},
});

export const useAuthContext = () => {
	return useContext(AuthContext);
};
