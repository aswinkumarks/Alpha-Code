import CodeMirror from '@uiw/react-codemirror';
import { useTheme } from '@mui/material';

const CodeEditor = () => {
	const theme = useTheme();
	function onChange(newValue) {
		console.log('change', newValue);
	}

	return (
		<CodeMirror
			theme={theme.palette.mode}
			value={''}
			height="100%"
			width="100%"
			style={{ height: '100%', width: '100%' }}
			onChange={onChange}
		/>
	);
};

export default CodeEditor;
