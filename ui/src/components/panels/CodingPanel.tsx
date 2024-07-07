import { FC, useRef, useState } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { Panel, ImperativePanelHandle } from 'react-resizable-panels';
import { useTheme } from '@mui/material';
import {
	KeyboardArrowUpOutlined,
	KeyboardArrowDownOutlined,
	FullscreenOutlined,
	FullscreenExitOutlined,
	CodeOutlined,
} from '@mui/icons-material';
import CodeEditor from '../codeEditor/CodeEditor';

export const CodingPanel: FC = () => {
	const theme = useTheme();
	const panelRef = useRef<ImperativePanelHandle>(null);
	const [isCollapsed, setIsCollapsed] = useState(false);
	const [fullScreen, setFullScreen] = useState(false);

	const togglePanelCollapseOrExpand = () => {
		if (panelRef.current?.isCollapsed()) {
			panelRef.current?.expand();
		} else {
			panelRef.current?.collapse();
		}
	};
	const toggleFullScreen = () => {
		if (fullScreen) {
			panelRef.current?.resize(50);
		} else {
			panelRef.current?.resize(100);
		}
		setFullScreen((prevVal) => !prevVal);
	};

	return (
		<Panel
			ref={panelRef}
			collapsible={true}
			collapsedSize={5}
			minSize={10}
			onCollapse={() => {
				setIsCollapsed(true);
			}}
			onExpand={() => {
				setIsCollapsed(false);
			}}
			style={{ display: 'flex', flexDirection: 'column' }}
		>
			<Box
				display="flex"
				width="auto"
				justifyContent="space-between"
				flexDirection="row"
				bgcolor={theme.palette.secondary.main}
				alignItems="center"
				padding="8px"
			>
				<Box display="flex" flexDirection="row" gap="4px">
					<CodeOutlined sx={{ color: theme.palette.custom.green }} />
					<Typography color={theme.palette.secondary.contrastText}>
						Code
					</Typography>
				</Box>
				<Box>
					<IconButton
						onClick={toggleFullScreen}
						sx={{
							padding: 'unset',
							color: theme.palette.secondary.contrastText,
						}}
					>
						{fullScreen ? (
							<FullscreenExitOutlined />
						) : (
							<FullscreenOutlined />
						)}
					</IconButton>
					{!fullScreen && (
						<IconButton
							onClick={togglePanelCollapseOrExpand}
							sx={{
								padding: 'unset',
								color: theme.palette.secondary.contrastText,
							}}
						>
							{isCollapsed ? (
								<KeyboardArrowDownOutlined />
							) : (
								<KeyboardArrowUpOutlined />
							)}
						</IconButton>
					)}
				</Box>
			</Box>
			<Box display="flex" width="auto" height="100%">
				<CodeEditor />
			</Box>
		</Panel>
	);
};
