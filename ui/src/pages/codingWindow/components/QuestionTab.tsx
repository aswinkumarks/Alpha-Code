import Box from '@mui/material/Box';
import { useRef, useState } from 'react';
import CodeEditor from '../../../components/codeEditor/CodeEditor';
import MarkdownPreview from '@uiw/react-markdown-preview';
import { useTheme } from '@mui/material';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { QuestionPanel } from '../../../components/panels/QuestionPanel';
import { CodingPanel } from '../../../components/panels/CodingPanel';
import { OutputPanel } from '../../../components/panels/OutputPanel';

const QuestionTab = (props) => {
	console.log('questions : ' + JSON.stringify(props.questions));
	const [value, setValue] = useState(0);
	const theme = useTheme();

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<Box
			display="flex"
			width="auto"
			height="100%"
			padding="0px 8px 8px 8px"
			bgcolor={theme.palette.background.paper}
		>
			<Box
				flexDirection="row"
				width="100%"
				height="100%"
				display="flex"
				bgcolor={theme.palette.background.default}
			>
				<PanelGroup direction="horizontal" autoSaveId="mainPanelGroup">
					<QuestionPanel question={props.questions?.[0]} />
					<PanelResizeHandle>
						<Box
							display="flex"
							height="100%"
							width="4px"
							bgcolor={theme.palette.background.paper}
							sx={{
								'&:hover': {
									backgroundColor: theme.palette.divider,
								},
							}}
						></Box>
					</PanelResizeHandle>
					<Panel>
						<PanelGroup direction="vertical" autoSaveId="subPanelGroup">
							<CodingPanel />
							<PanelResizeHandle>
								<Box
									display="flex"
									height="4px"
									width="100%"
									bgcolor={theme.palette.background.paper}
									sx={{
										'&:hover': {
											backgroundColor:
												theme.palette.divider,
										},
									}}
								></Box>
							</PanelResizeHandle>
							<OutputPanel />
						</PanelGroup>
					</Panel>
				</PanelGroup>
			</Box>
		</Box>
	);
};

export default QuestionTab;
