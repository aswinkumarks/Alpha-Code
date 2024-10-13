import axios from 'axios';
import { showToast, getLocalStorageValue } from '../common/hooks';
import { AuthService } from './authService';

class ApiService extends AuthService {
	fetchQuestions = async (cId: string) => {
		try {
			const response = await axios.get(`/api/question/?cId=${cId}`, {
				headers: this.getHeaders(),
				validateStatus: null,
			});
			if (response.status === 200) {
				return response.data;
			} else {
				console.error('Fetch questions failed', response);
			}
		} catch (error) {
			console.error('Fetch questions failed', error);
		}
		return [];
	};

	createOrUpdateContest = async (
		data: Record<string, any>,
		cId?: string | number
	) => {
		try {
			const response = await axios.request({
				url: cId ? `/api/contests/${cId}/` : `/api/contests/`,
				method: cId ? 'PATCH' : 'POST',
				data: data,
				headers: this.getHeaders(),
				validateStatus: null,
			});
			if (response.status === 200 || response.status === 201) {
				return response.data;
			} else {
				console.error('Create / Update contest failed', response);
				showToast({
					content: 'Create / Update contest failed',
					severity: 'error',
					position: { vertical: 'bottom', horizontal: 'left' },
				});
			}
		} catch (error) {
			console.error('Create / Update contest failed', error);
		}
		return [];
	};

	getContest = async (cId: string | number) => {
		try {
			const response = await axios.get(`/api/contests/${cId}/`, {
				headers: this.getHeaders(),
			});
			if (response.status === 200) {
				return response.data;
			} else {
				console.error('Get contest failed', response);
			}
		} catch (error) {
			console.error('get contest failed', error);
		}
		return [];
	};
}

export default new ApiService();
