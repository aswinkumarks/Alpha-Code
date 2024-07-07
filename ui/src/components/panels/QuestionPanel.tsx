import { FC, useRef, useState } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import {
	Panel,
	PanelGroup,
	PanelResizeHandle,
	ImperativePanelHandle,
} from 'react-resizable-panels';
import { useTheme } from '@mui/material';
import {
	KeyboardArrowLeftOutlined,
	KeyboardArrowRightOutlined,
	FullscreenOutlined,
	FullscreenExitOutlined,
	ArticleOutlined,
} from '@mui/icons-material';
import MarkdownPreview from '@uiw/react-markdown-preview';
import { QuestionPanelProps } from '../../pages/codingWindow/components/types';

export const QuestionPanel: FC<QuestionPanelProps> = ({ question }) => {
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
			collapsedSize={3}
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
				flexDirection={isCollapsed ? 'column' : 'row'}
				height={isCollapsed ? '100%' : 'fit-content'}
				bgcolor={theme.palette.secondary.main}
				alignItems="center"
				padding="8px"
			>
				<Box display="flex" flexDirection="inherit" gap="4px">
					<ArticleOutlined
						sx={{ color: theme.palette.secondary.contrastText }}
					/>
					<Typography
						color={theme.palette.secondary.contrastText}
						sx={isCollapsed ? { writingMode: 'vertical-lr' } : {}}
					>
						Description
					</Typography>
				</Box>
				<Box display="flex" flexDirection="inherit">
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
								<KeyboardArrowRightOutlined />
							) : (
								<KeyboardArrowLeftOutlined />
							)}
						</IconButton>
					)}
				</Box>
			</Box>
			{!isCollapsed && (
				<Box
					flexDirection="column"
					display="flex"
					width="auto"
					height="100%"
					padding="12px"
				>
					<Typography variant="h6">
						{question.qno}. {question.question}
					</Typography>
					<MarkdownPreview
						source={question.description}
						wrapperElement={{
							'data-color-mode': theme.palette.mode,
						}}
						style={{
							backgroundColor: theme.palette.background.default,
						}}
					/>
				</Box>
			)}
		</Panel>
	);
};
