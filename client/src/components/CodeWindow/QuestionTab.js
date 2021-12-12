import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { useRef, useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import { TabPanel, a11yProps } from "./Tab";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CodeEditor from "./CodeEditor"

const QuestionTab = (props) => {
  console.log("questions : " + JSON.stringify(props.questions));
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Grid
        container
        justify="space-between"
        rowSpacing={6}
        spacing={2}
        sx={{ mt: 1 }}
      >
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: "divider", width: 120 }}
        >
          {props.questions.map((_, i) => (
            <Tab label={i + 1} {...a11yProps(i)} />
          ))}
        </Tabs>

        <Grid>
          {props.questions.map((question, index) => (
            <TabPanel value={value} index={index}>
              <Typography
                variant="h6"
                component="h2"
                sx={{ borderRight: 1, borderColor: "divider", maxWidth: '85%' }}
                style={{ wordWrap: "break-word" }}
              >
                <pre>
                  {question.qno}. {question.question}
                  <br />
                  {question.description}
                </pre>
              </Typography>
              <CodeEditor/>
            </TabPanel>
          ))}
        </Grid>
      </Grid>
    </div>
  );
};

export default QuestionTab;
