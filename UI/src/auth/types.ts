import { Dispatch, SetStateAction } from 'react';

export interface AuthDetails {
	username: string;
	isLoggedIn: boolean;
	token: string;
	isAdmin: boolean;
}

export interface AuthContextType {
	authDetails: AuthDetails;
	setAuthDetails: Dispatch<SetStateAction<AuthDetails>>;
	login: (username: string, password: string) => void;
	logout: () => void;
}

export interface AuthContextWrapperProps {
	children: JSX.Element;
}
