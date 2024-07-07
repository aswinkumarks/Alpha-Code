import CodeEditor from "../../../components/codeEditor/CodeEditor";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const QuestionView = (props) => {
  return (
    <Box sx={{p: 5}}>
      <Typography
        variant="h6"
        component="h2"
        sx={{ borderRight: 1, borderColor: "divider", maxWidth: "85%" }}
        style={{ wordWrap: "break-word" }}
      >
        <pre>
          {props.question.qno}. {props.question.question}
          <br />
          {props.question.description}
        </pre>
      </Typography>
      <CodeEditor />
    </Box>
  );
};

export default QuestionView;
