import { useState, useEffect, useRef } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { useTheme } from '@mui/material';
import { useAuthContext } from './../../auth';
import useWebSocket from 'react-use-websocket';
import { useLocalStorage } from './../../common/hooks';

const CodeEditor = () => {
	const theme = useTheme();
	const [data, setData] = useLocalStorage('editorData', { code: '' });
	const dataRef = useRef(data);
	const { authDetails } = useAuthContext();

	const socketUrl = `ws/task/?token=${authDetails.token}`;
	const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);

	useEffect(() => {
		window.addEventListener('runCode', sendCode, false);
		return () => {
			window.removeEventListener('runCode', sendCode);
		};
	}, []);

	useEffect(() => {
		dataRef.current = data;
	}, [data]);

	useEffect(() => {
		if (lastMessage !== null) {
			console.log('Received result from backend:', lastMessage.data);
		}
	}, [lastMessage]);

	const sendCode = () => {
		sendMessage(JSON.stringify(dataRef.current));
	};

	const onChange = (newValue: string) => {
		setData({ code: newValue });
	};

	return (
		<CodeMirror
			theme={theme.palette.mode}
			value={data.code}
			height="100%"
			width="100%"
			style={{ height: '100%', width: '100%' }}
			onChange={onChange}
		/>
	);
};

export default CodeEditor;
