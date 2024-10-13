import { useState, useMemo, useEffect, FC } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { PaletteMode } from '@mui/material';

import { ThemeWrapperProps } from './types';
import ThemeContext from './themeContext';
import getTheme from './theme';
import { useLocalStorage } from '../common/hooks';

export const ThemeWrapper: FC<ThemeWrapperProps> = ({ children }) => {
	const [mode, setMode] = useLocalStorage<PaletteMode>('theme', 'light');

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

	const theme = useMemo(() => getTheme(mode), [mode]);

	return (
		<ThemeContext.Provider value={colorMode}>
			<ThemeProvider theme={theme}>{children}</ThemeProvider>
		</ThemeContext.Provider>
	);
};
