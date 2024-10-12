import { FC, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Box } from '@mui/material';

import { useAuthContext } from './auth';
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';
import DashboardPage from './pages/dashboard/Dashboard';
import UserDashboardPage from './pages/dashboard/UserDashboard';
import CreateContestPage from './pages/contest/CreateContestPage';
import NavBar from './components/navBar/NavBar';
import EditContestPage from './pages/contest/EditContest';
import CodeWindowPage from './pages/codingWindow/CodeWindow';

const App: FC = () => {
	const { authDetails } = useAuthContext();

	if (authDetails.isLoggedIn) {
		if (authDetails.isAdmin) {
			return (
				<Box
					display="flex"
					height="100%"
					width="100%"
					flexDirection="column"
				>
					<NavBar />
					<Routes>
						<Route path="/" element={<DashboardPage />} />
						<Route
							path="/contest"
							element={<CreateContestPage />}
						/>
						<Route
							path="/contest/:id"
							element={<CreateContestPage />}
						/>
						<Route path="*" element={<Navigate to="/" />} />
					</Routes>
				</Box>
			);
		} else {
			return (
				<Box
					display="flex"
					height="100%"
					width="100%"
					flexDirection="column"
				>
					<NavBar />
					<Routes>
						<Route path="/" element={<UserDashboardPage />} />
						<Route path="/contest/*" element={<CodeWindowPage />} />
						<Route path="*" element={<Navigate to="/" />} />
					</Routes>
				</Box>
			);
		}
	} else {
		return (
			<Routes>
				<Route path="/login" element={<LoginPage />} />
				<Route path="/signup" element={<SignupPage />} />
				<Route path="*" element={<Navigate to="/login" />} />
			</Routes>
		);
	}
};

export default App;
