import { useEffect, useState } from 'react';
import QuestionTab from './components/QuestionTab';
import ApiService from '../../api';

const CodeWindowPage = (props) => {
	let cId = window.location.pathname.split('/')[2];
	const [questions, setQuestions] = useState([]);

	const getQuestions = async () => {
		const data = await ApiService.fetchQuestions(cId);
		setQuestions(data);
	};

	useEffect(() => {
		getQuestions();
	}, []);

	if (questions.length !== 0) return <QuestionTab questions={questions} />;
	else return <div>fetching questions ...</div>;
};

export default CodeWindowPage;
