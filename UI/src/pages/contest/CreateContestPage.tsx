import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Box, useTheme } from '@mui/material';
import { useState, useEffect, FC } from 'react';

import ContestForm from './components/ContestForm';
import { CreateContestPageProps } from './types';
import { ContestFormInputs } from './components/types';
import ApiService from '../../api';

const CreateContestPage: FC<CreateContestPageProps> = () => {
	const theme = useTheme();
	const { id } = useParams();
	const [contestInfo, setContestInfo] = useState<Partial<ContestFormInputs>>(
		{}
	);

	useEffect(() => {
		getContestInfo();
	}, []);

	const getContestInfo = async () => {
		if (id) {
			const data = await ApiService.getContest(id);
			setContestInfo(data);
		}
	};

	const handleFormSubmit = async (contestData: ContestFormInputs) => {
		const response = await ApiService.createOrUpdateContest(
			contestData,
			id
		);
	};

	return (
		<Box
			display="flex"
			flexDirection="column"
			height="100%"
			bgcolor={theme.palette.background.default}
		>
			<ContestForm
				onSubmit={handleFormSubmit}
				editMode={!!id}
				defaultValues={contestInfo}
			/>
		</Box>
	);
};

export default CreateContestPage;
