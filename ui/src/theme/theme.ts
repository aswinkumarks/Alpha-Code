import { createTheme } from '@mui/material/styles';
import { PaletteMode, ThemeOptions } from '@mui/material';
import { CustomThemeOptions, CustomColors } from './types';

declare module '@mui/material/styles' {
	interface Palette {
		custom: CustomColors;
	}

	interface PaletteOptions {
		custom?: CustomColors;
	}
}

const customColors = {
	green: 'hsl(133 98% 35%)',
};

const getTheme = (mode: PaletteMode) => {
	let themeOptions: CustomThemeOptions = {};

	if (mode === 'dark') {
		themeOptions = {
			palette: {
				mode: 'dark',
				primary: {
					main: '#25afd2',
				},
				secondary: {
					main: '#262626',
					contrastText: '#e4dbdb'
				},
				background: {
					default: '#282c34',
					paper: '#000000',
				},
				text: {
					primary: '#e4dbdb',
					secondary: '#abb2bf',
				},
				custom: customColors,
			},
			typography: {
				allVariants: {
					color: '#e4dbdb',
				},
			},
		};
	} else {
		themeOptions = {
			palette: {
				mode: 'light',
				custom: customColors,
				primary: {
					main: '#222831',
				},
				secondary: {
					main: '#393E46',
					contrastText: '#e4dbdb'
				},
				background: {
					default: '#eeeeee',
				},
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
