import axios from 'axios';
import { showToast, getLocalStorageValue } from '../common/hooks';
import { AuthDetailsType, DEFAULT_AUTH_DETAILS } from '../auth';

export class AuthService {
	private authDetails = DEFAULT_AUTH_DETAILS;

	constructor() {
		const authDetails = getLocalStorageValue<AuthDetailsType>(
			'authDetails',
			DEFAULT_AUTH_DETAILS
		);
		if (authDetails.isLoggedIn) {
			this.authDetails = authDetails;
		}
	}

	getHeaders = () => {
		return { Authorization: `Token ${this.authDetails.token}` };
	};

	refreshAuthDetails = (authDetails?: AuthDetailsType) => {
		if (authDetails) {
			this.authDetails = authDetails;
		} else {
			const localStoredAuthDetails =
				getLocalStorageValue<AuthDetailsType>(
					'authDetails',
					DEFAULT_AUTH_DETAILS
				);
			this.authDetails = localStoredAuthDetails;
		}
	};

	login = async (username: string, password: string) => {
		try {
			const response = await axios.post(
				'/apis/rest-auth/login/',
				{
					username: username,
					password: password,
				},
				{ validateStatus: null }
			);
			if (response.status === 200) {
				return { status: true, token: response.data.key };
			} else {
				showToast({
					content:
						response.data?.non_field_errors?.[0] ||
						'Unable to login',
					severity: 'error',
					position: { vertical: 'top', horizontal: 'right' },
				});
				console.error('Login failed', response);
			}
		} catch (error) {
			console.error('Login failed', error);
		}
		return { status: false, token: '' };
	};

	logout = async () => {
		try {
			const response = await axios.post('/apis/rest-auth/logout/', {});
			if (response.status === 200) {
				this.authDetails = DEFAULT_AUTH_DETAILS;
				localStorage.clear();
			} else {
				console.error('Logout failed', response);
			}
		} catch (error) {
			console.error('Logout failed', error);
		}
	};

	register = async (
		username: string,
		password1: string,
		password2: string
	) => {
		try {
			const response = await axios.post(
				'/apis/rest-auth/registration/',
				{
					username: username,
					password1: password1,
					password2: password2,
				},
				{ validateStatus: null }
			);
			if (response.status === 201) {
				return { status: true, errors: {}, token: response.data.key };
			} else {
				if (response.data?.non_field_errors) {
					showToast({
						content:
							response.data?.non_field_errors?.[0] || 'Error',
						severity: 'error',
						position: { vertical: 'top', horizontal: 'right' },
					});
				}
				console.error('Register new user failed', response);
				return { status: false, errors: response.data, token: '' };
			}
		} catch (error) {
			console.error('Register new user failed', error);
		}
		return { status: false, errors: {}, token: '' };
	};

	getUserInfo = async () => {
		try {
			const response = await axios.get('/apis/rest-auth/user/');
			if (response.status === 200) {
				return response.data;
			} else {
				console.error('Get user info failed', response);
			}
		} catch (error) {
			console.error('Get user info failed', error);
		}
		return {};
	};
}
