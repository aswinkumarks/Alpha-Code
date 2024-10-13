import { FC } from 'react';
import { AppBar, Toolbar, Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import Profile from './Profile';

const NavBar: FC = () => {
	return (
		<Box
			sx={{
				flexGrow: 1,
			}}
		>
			<AppBar position="static">
				<Toolbar>
					<Typography
						variant="h4"
						component="div"
						sx={{ flexGrow: 1 }}
					>
						<Link
							to="/"
							style={{ textDecoration: 'none', color: '#FFF' }}
						>
							Alpha Code
						</Link>
					</Typography>
					<Profile />
				</Toolbar>
			</AppBar>
		</Box>
	);
};

export default NavBar;
