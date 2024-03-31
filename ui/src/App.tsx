import { FC, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useHookstate } from '@hookstate/core';
import { Box } from '@mui/material';

import { useGlobalState } from './state';
import ApiService  from './api'
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';
import DashboardPage from './pages/dashboard/Dashboard';
import CreateContestPage from './pages/contest/CreateContest';
import NavBar from './common/components/navBar/NavBar';
import EditContestPage from './pages/contest/EditContest';
import CodeWindowPage from './pages/codingWindow/CodeWindow';

const App: FC = () => {
	const state = useGlobalState();
	const isLoggedIn = useHookstate(state.isLoggedIn);

	if (isLoggedIn.value) {
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
						path="/create_contest"
						element={<CreateContestPage />}
					/>
					<Route
						path="/edit_contest/*"
						element={<EditContestPage />}
					/>
					<Route path="/contest/*" element={<CodeWindowPage />} />
					<Route path="*" element={<Navigate to="/" />} />
				</Routes>
			</Box>
		);
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
