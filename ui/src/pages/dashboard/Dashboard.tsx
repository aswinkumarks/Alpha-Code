import { Box } from '@mui/material';
import { useTheme } from '@mui/material';
import ContestList from '../contest/components/ContestList';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

const DashboardPage = () => {
	const theme = useTheme();
	return (
		<Box
			display="flex"
			flexDirection="column"
			height="100%"
			bgcolor={theme.palette.background.default}
		>
			<Box display="flex" width="100%" justifyContent="flex-end">
				<Button variant="contained" sx={{ width: '200px' }}>
					<Link to="/create_contest">Create Contest</Link>
				</Button>
			</Box>
			<ContestList />
		</Box>
	);
};

export default DashboardPage;
