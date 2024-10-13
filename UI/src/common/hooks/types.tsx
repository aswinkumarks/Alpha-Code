import { AlertColor, SnackbarOrigin } from "@mui/material";

export interface ToastDataType {
	content: string;
	severity?: AlertColor;
	duration?: number;
    position?: SnackbarOrigin
}
