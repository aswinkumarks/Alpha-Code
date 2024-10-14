import { FC } from 'react';
import {
	AppBar,
	Toolbar,
	Box,
	Typography,
	IconButton,
	Button,
	useTheme,
} from '@mui/material';
import { Link } from 'react-router-dom';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

import Profile from '../../../components/navBar/Profile';
import { NavBarProps } from './types';

const NavBar: FC<NavBarProps> = ({
	onNext,
	onPrev,
	onRunBtnClick,
	disableNextBtn,
	disablePrevBtn,
}) => {
	const theme = useTheme();

	return (
		<Box
			sx={{
				flexGrow: 1,
			}}
		>
			<AppBar position="static">
				<Toolbar sx={{ justifyContent: 'space-between' }}>
					<Typography variant="h4" component="div">
						<Link
							to="/"
							style={{ textDecoration: 'none', color: '#FFF' }}
						>
							Alpha Code
						</Link>
					</Typography>
					<Box flexDirection="row">
						<IconButton
							aria-label="previous"
							onClick={onPrev}
							disabled={disablePrevBtn}
						>
							<ChevronLeftIcon
								sx={{
									color: theme.palette.secondary.contrastText,
								}}
							/>
						</IconButton>
						<Button
							variant="outlined"
							startIcon={
								<PlayArrowIcon
									sx={{
										color: theme.palette.secondary
											.contrastText,
									}}
								/>
							}
							onClick={onRunBtnClick}
						>
							Run
						</Button>
						<IconButton
							aria-label="next"
							onClick={onNext}
							disabled={disableNextBtn}
						>
							<ChevronRightIcon
								sx={{
									color: theme.palette.secondary.contrastText,
								}}
							/>
						</IconButton>
					</Box>
					<Profile />
				</Toolbar>
			</AppBar>
		</Box>
	);
};

export default NavBar;
