import { FC } from 'react';
import { useQuery } from '@tanstack/react-query';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';

import { QuestionPanel } from '../../components/panels/QuestionPanel';
import { CodingPanel } from '../../components/panels/CodingPanel';
import { OutputPanel } from '../../components/panels/OutputPanel';
import ApiService from '../../api';
import NavBar from './components/NavBar';
import { useQueryParam } from '../../common/hooks';
import { SkeletonLoader } from './components/SkeletonLoader';

const QuestionPage: FC = () => {
	let cId = window.location.pathname.split('/')[2];
	const theme = useTheme();

	const [questionIndex, setQuestionIndex] = useQueryParam('index', 0);
	const { isPending, data: questions } = useQuery({
		queryKey: ['question', cId],
		queryFn: () => ApiService.fetchQuestions(cId),
	});

	const nextQuestion = () => {
		setQuestionIndex((index) => index + 1);
	};

	const prevQuestion = () => {
		setQuestionIndex((index) => index - 1);
	};

	if (isPending) {
		return <SkeletonLoader />;
	}

	return (
		<>
			<NavBar
				onNext={nextQuestion}
				onPrev={prevQuestion}
				disableNextBtn={questionIndex === questions.length - 1}
				disablePrevBtn={questionIndex === 0}
			/>
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
					<PanelGroup
						direction="horizontal"
						autoSaveId="mainPanelGroup"
					>
						<QuestionPanel question={questions?.[questionIndex]} />
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
						<Panel
							collapsible={true}
							collapsedSize={3}
							minSize={10}
						>
							<PanelGroup
								direction="vertical"
								autoSaveId="subPanelGroup"
							>
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
		</>
	);
};

export default QuestionPage;
