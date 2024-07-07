import { FC } from 'react';
import { useLocalStorage } from '../common/hooks';
import { AuthContext } from './authContext';
import { DEFAULT_AUTH_DETAILS } from './constants';
import ApiService from './../api';
import { AuthDetails, AuthContextWrapperProps } from './types';

const AuthContextWrapper: FC<AuthContextWrapperProps> = ({ children }) => {
	const [authDetails, setAuthDetails] = useLocalStorage<AuthDetails>(
		'authDetails',
		DEFAULT_AUTH_DETAILS
	);


	const loginHandler = async (username: string, password: string) => {
		const { status, token } = await ApiService.login(username, password);
		if (status) {
			const newAuthDetails = {
				username: username,
				isLoggedIn: true,
				token: token,
				isAdmin: false,
			};
			ApiService.refreshAuthDetails(newAuthDetails);
			const userInfo = await ApiService.getUserInfo();
			newAuthDetails.isAdmin = userInfo?.is_staff || false;
			setAuthDetails(newAuthDetails);
		}
	};

	const logoutHandler = () => {
		ApiService.logout();
		setAuthDetails(DEFAULT_AUTH_DETAILS);
	};

	const contextValue = {
		authDetails: authDetails,
		setAuthDetails: setAuthDetails,
		login: loginHandler,
		logout: logoutHandler,
	};

	return (
		<AuthContext.Provider value={contextValue}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContextWrapper;
