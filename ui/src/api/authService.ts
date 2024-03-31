import axios from 'axios';
import { showToast } from '../common/hooks';

export class AuthService {
	private token = '';
	public username: string | null = '';

	constructor() {
		const token = localStorage.getItem('token');
		if (token) {
			this.token = token;
		}
		this.username = localStorage.getItem('username');
	}

	getHeaders = () => {
		return { Authorization: `Token ${this.token}` };
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
				this.username = username;
				this.token = response.data.key;
				localStorage.setItem('username', username);
				localStorage.setItem('token', response.data.key);
				return true;
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
		return false;
	};

	logout = async () => {
		try {
			const response = await axios.post('/apis/rest-auth/logout/', {});
			if (response.status === 200) {
				this.username = '';
				this.token = '';
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
				this.username = username;
				this.token = response.data.key;
				localStorage.setItem('username', username);
				localStorage.setItem('token', response.data.key);
				return { status: true, errors: {} };
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
				return { status: false, errors: response.data };
			}
		} catch (error) {
			console.error('Register new user failed', error);
		}
		return { status: false, errors: {} };
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
