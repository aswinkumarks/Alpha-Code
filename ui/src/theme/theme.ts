import { createTheme } from '@mui/material/styles';
import { PaletteMode, ThemeOptions } from '@mui/material';

const getTheme = (mode: PaletteMode) => {
	let themeOptions: ThemeOptions = {};
	if (mode === 'dark') {
		themeOptions = {
			palette: {
				mode: 'dark',
				primary: {
					main: '#25afd2',
				},
				secondary: {
					main: '#065a60',
				},
				background: {
					default: '#161a1e',
					paper: '#000000',
				},
				text: {
					primary: '#e4dbdb',
				},
			},
		};
	} else {
		themeOptions = {
			palette: {
				mode: 'light',
			},
		};
	}

	// Override default component styles
	themeOptions.components = {
		MuiButton: {
			defaultProps: {},
		},
	};

	return createTheme(themeOptions);
};

export default getTheme;
