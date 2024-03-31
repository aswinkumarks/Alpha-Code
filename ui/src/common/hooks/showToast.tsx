import ReactDOM from 'react-dom';

import { ThemeWrapper } from './../../theme';
import { ToastDataType } from './types';
import { Alert, Snackbar } from '@mui/material';

export const showToast = (toastData: ToastDataType) => {
	const toastContainerId = 'toastContainerElement';
	const duration = toastData?.duration || 3000;

	let toastContainer = document.getElementById(toastContainerId);

	if (!toastContainer) {
		toastContainer = document.createElement('div');
		toastContainer.setAttribute('id', toastContainerId);
		document.body.appendChild(toastContainer);
	}

	const removeToast = () => {
		const element = document.getElementById(toastContainerId);
		if (element) {
			element?.remove?.();
		}
	};

	setTimeout(removeToast, duration);

	ReactDOM.render(
		<ThemeWrapper>
			<Snackbar
				open={true}
				autoHideDuration={duration}
                anchorOrigin={toastData?.position}
			>
				<Alert
					severity={toastData?.severity}
					variant="filled"
					sx={{ width: '100%' }}
				>
					{toastData?.content}
				</Alert>
			</Snackbar>
		</ThemeWrapper>,
		toastContainer
	);
};
