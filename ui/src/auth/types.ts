import { Dispatch, SetStateAction } from 'react';

export interface AuthDetailsType {
	username: string;
	isLoggedIn: boolean;
	token: string;
}

export interface AuthContextType {
	authDetails: AuthDetailsType;
	setAuthDetails: Dispatch<SetStateAction<AuthDetailsType>>;
	login: (username: string, password: string) => void;
	logout: () => void;
}

export interface AuthContextWrapperProps {
	children: JSX.Element;
}
