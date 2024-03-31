import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useRef, useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import { TabPanel, a11yProps } from './Tab';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CodeEditor from '../../../common/components/codeEditor/CodeEditor';

const QuestionTab = (props) => {
	console.log('questions : ' + JSON.stringify(props.questions));
	const [value, setValue] = useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<Box display="flex" width="100%" height="100%">
			{props.questions.slice(0, 1).map((question, index) => (
				<Box
					flexDirection="row"
					width="100%"
					height="100%"
					display="flex"
				>
					<Box
						flexDirection="column"
						display="flex"
						width="auto"
						height="100%"
						flexBasis="25%"
						flexGrow="1"
						minWidth="250px"
					>
						<pre>
							{question.qno}. {question.question}
							<br />
							{question.description}
						</pre>
					</Box>
					<Box
						display="flex"
						width="auto"
						height="100%"
						flexBasis="25%"
						flexGrow="1"
						minWidth="250px"
					>
						<CodeEditor />
					</Box>
				</Box>
			))}
		</Box>
	);
};

export default QuestionTab;
