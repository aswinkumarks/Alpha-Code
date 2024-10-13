import { ThemeOptions, PaletteOptions } from '@mui/material';

export interface CustomColors {
	green?: string;
}

export interface CustomPalette extends PaletteOptions {
	custom?: CustomColors;
}
export interface CustomThemeOptions extends ThemeOptions {
	palette?: CustomPalette;
}

export interface ThemeWrapperProps {
	children: JSX.Element;
}
