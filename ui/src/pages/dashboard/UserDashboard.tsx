import { Box } from '@mui/material';
import { useTheme } from '@mui/material';
import ContestList from '../contest/components/ContestList';


const UserDashboardPage = () => {
	const theme = useTheme();
	return (
		<Box
			display="flex"
			flexDirection="column"
			height="100%"
			bgcolor={theme.palette.background.default}
		>
			<ContestList />
		</Box>
	);
};

export default UserDashboardPage;
