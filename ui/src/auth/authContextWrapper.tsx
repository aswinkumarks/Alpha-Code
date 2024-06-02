import { FC } from 'react';
import { useLocalStorage } from '../common/hooks';
import { AuthContext } from './authContext';
import { DEFAULT_AUTH_DETAILS } from './constants';
import ApiService from './../api';
import { AuthDetailsType, AuthContextWrapperProps } from './types';

const AuthContextWrapper: FC<AuthContextWrapperProps> = ({ children }) => {
	const [authDetails, setAuthDetails] = useLocalStorage<AuthDetailsType>(
		'authDetails',
		DEFAULT_AUTH_DETAILS
	);

	// const setUserInfo = () => {
	// 	axios
	// 		.get('/rest-auth/user/')
	// 		.then(function (response) {
	// 			localStorage.setItem('name', response.data.first_name);
	// 		})
	// 		.catch(function (error) {
	// 			console.log('Fetch User info Failed!');
	// 			console.log(error);
	// 		});
	// };

	const loginHandler = async (username: string, password: string) => {
		const { status, token } = await ApiService.login(username, password);
		if (status) {
			const newAuthDetails = {
				username: username,
				isLoggedIn: true,
				token: token,
			};
			setAuthDetails(newAuthDetails);
			ApiService.refreshAuthDetails(newAuthDetails);
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
