import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Box } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import App from './App';
import { ThemeWrapper } from './theme/themeWrapper';
import AuthContextWrapper from './auth';

const root = createRoot(document.getElementById('root') as HTMLElement);
const queryClient = new QueryClient();

root.render(
	<StrictMode>
		<BrowserRouter>
			<ThemeWrapper>
				<AuthContextWrapper>
					<QueryClientProvider client={queryClient}>
						<Box
							position="fixed"
							height="100%"
							width="100%"
							top="0px"
							left="0px"
						>
							<App />
						</Box>
						<ReactQueryDevtools buttonPosition="bottom-left" initialIsOpen={false} />
					</QueryClientProvider>
				</AuthContextWrapper>
			</ThemeWrapper>
		</BrowserRouter>
	</StrictMode>
);
