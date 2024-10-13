import { Box } from '@mui/material';
import { useTheme } from '@mui/material';
import ContestList from '../contest/components/ContestList';
import NavBar from '../../components/navBar/NavBar';

const UserDashboardPage = () => {
	const theme = useTheme();
	return (
		<>
			<NavBar />
			<Box
				display="flex"
				flexDirection="column"
				height="100%"
				bgcolor={theme.palette.background.default}
			>
				<ContestList />
			</Box>
		</>
	);
};

export default UserDashboardPage;
