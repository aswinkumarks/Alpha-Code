import { FC, useState } from 'react';
import { useHookstate } from '@hookstate/core';
import { useForm, SubmitHandler } from 'react-hook-form';
import FormControlLabel from '@mui/material/FormControlLabel';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import {
	Box,
	Button,
	TextField,
	Typography,
	useTheme,
	Avatar,
	Checkbox,
	Link,
	Grid,
	Container,
	CssBaseline,
} from '@mui/material';

import { LoginInputs } from './types';
import ApiService from './../../api';
import { useGlobalState } from './../../state';

const LoginPage: FC = () => {
	const theme = useTheme();
	const state = useGlobalState();
	const isLoggedIn = useHookstate(state.isLoggedIn);

	const {
		register,
		handleSubmit,
		watch,
		formState,
	} = useForm<LoginInputs>();

	const handleOnSubmit: SubmitHandler<LoginInputs> = async (data) => {
		const status = await ApiService.login(data.username, data.password);
		if (status) {
			isLoggedIn.set(true);
		}
	};

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<Box
				sx={{
					marginTop: 8,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign in
				</Typography>
				<Box
					component="form"
					onSubmit={handleSubmit(handleOnSubmit)}
					noValidate
					sx={{ mt: 1 }}
				>
					<TextField
						margin="normal"
						required
						fullWidth
						id="username"
						label="Username"
						autoComplete="username"
						autoFocus
						{...register('username')}
					/>
					<TextField
						margin="normal"
						required
						fullWidth
						label="Password"
						type="password"
						id="password"
						autoComplete="current-password"
						{...register('password')}
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2 }}
						disabled={formState.isSubmitting}
					>
						Sign In
					</Button>
					<Grid container justifyContent="flex-end">
						{/* <Grid item xs>
							<Link href="#" variant="body2">
								Forgot password?
							</Link>
						</Grid> */}
						<Grid item>
							<Link href="/signup" variant="body2">
								{"Don't have an account? Sign Up"}
							</Link>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</Container>
	);
};

export default LoginPage;
