import axios from 'axios';
import { AuthService } from './authService';

class ApiService extends AuthService {
	fetchQuestions = async (cId: string) => {
		try {
			const response = await axios.get(`/api/question/?cId=${cId}`, {
				headers: this.getHeaders(),
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
}

export default new ApiService();
