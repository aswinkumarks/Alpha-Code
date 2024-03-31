import { useState, useMemo, useEffect, FC } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { PaletteMode } from '@mui/material';

import { ThemeWrapperProps } from './types';
import ThemeContext from './themeContext';
import getTheme from './theme';


export const ThemeWrapper: FC<ThemeWrapperProps> = ({ children }) => {
	const initialTheme = localStorage.getItem('theme') as PaletteMode;
	const [mode, setMode] = useState<PaletteMode>(
		initialTheme ? initialTheme : 'light'
	);

	const colorMode = useMemo(
		() => ({
			toggleColorMode: () => {
				setMode((prevMode) =>
					prevMode === 'light' ? 'dark' : 'light'
				);
			},
		}),
		[]
	);

	useEffect(() => {
		localStorage.setItem('theme', mode);
	}, [mode]);

	const theme = useMemo(() => getTheme(mode), [mode]);

	return (
		<ThemeContext.Provider value={colorMode}>
			<ThemeProvider theme={theme}>{children}</ThemeProvider>
		</ThemeContext.Provider>
	);
};
