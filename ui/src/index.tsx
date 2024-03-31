import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Box } from '@mui/material';

import App from './App';
import { ThemeWrapper } from './theme/themeWrapper';


const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
	<StrictMode>
		<BrowserRouter>
			<ThemeWrapper>
				<Box
					position="fixed"
					height="100%"
					width="100%"
					top="0px"
					left="0px"
				>
					<App />
				</Box>
			</ThemeWrapper>
		</BrowserRouter>
	</StrictMode>
);
