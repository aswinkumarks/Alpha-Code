import { FC, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import ApiService from '../../api';
import { SignupInputs } from './types';
import { useAuthContext } from '../../auth';

const SignUpPage: FC = () => {
	const { setAuthDetails } = useAuthContext();

	const { register, handleSubmit, setError, formState } =
		useForm<SignupInputs>();

	const handleOnSubmit: SubmitHandler<SignupInputs> = async (data) => {
		const { status, errors, token } = await ApiService.register(
			data.username,
			data.password1,
			data.password2
		);
		if (status) {
			setAuthDetails((prev) => {
				return {
					...prev,
					isLoggedIn: true,
					username: data.username,
					token: token,
				};
			});
		} else {
			Object.keys(errors).forEach((fieldName: any) => {
				const error = errors[fieldName]?.[0];
				setError(fieldName, { type: 'custom', message: error });
			});
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
					Sign up
				</Typography>
				<Box
					component="form"
					noValidate
					onSubmit={handleSubmit(handleOnSubmit)}
					sx={{ mt: 3 }}
				>
					<Grid container spacing={2}>
						{/* <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid> */}
						<Grid item xs={12}>
							<TextField
								required
								fullWidth
								id="username"
								label="Username"
								autoComplete="username"
								error={
									formState.errors?.username ? true : false
								}
								helperText={formState.errors?.username?.message}
								{...register('username')}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								required
								fullWidth
								label="Password"
								type="password"
								id="password1"
								autoComplete="password"
								error={
									formState.errors?.password1 ? true : false
								}
								helperText={
									formState.errors?.password1?.message
								}
								{...register('password1')}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								required
								fullWidth
								label="Confirm Password"
								type="password"
								id="password2"
								autoComplete="password"
								error={
									formState.errors?.password2 ? true : false
								}
								helperText={
									formState.errors?.password2?.message
								}
								{...register('password2')}
							/>
						</Grid>
					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2 }}
						disabled={formState.isSubmitting}
					>
						Sign Up
					</Button>
					<Grid container justifyContent="flex-end">
						<Grid item>
							<Link href="/login" variant="body2">
								Already have an account? Sign in
							</Link>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</Container>
	);
};

export default SignUpPage;
