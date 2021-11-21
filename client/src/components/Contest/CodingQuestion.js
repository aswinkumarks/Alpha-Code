import Typography from "@mui/material/Typography";
import CreateTestCaseForm from "./CreateTestCaseForm";

import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";

import { useState } from "react";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const CodingQuestion = (props) => {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [testcases, setTestcases] = useState(props.testCases);

  function addTestCase() {
    setTestcases(
      testcases.concat({
        testCaseType: "Hidden",
        pgmInput: "",
        OutputType: "Static",
        pgmOutputOrEvalCode: "",
        score: "",
      })
    );
  }

  function delTestCase(pos) {
    setValue(0);
    setTestcases(testcases.filter((item, index) => index !== pos));
    props.settestcasehandler(testcases);
  }

  return (
    <div>
      <Box sx={{ borderBottom: 1, borderColor: "divider", width: 800 }}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="basic tabs example"
        >
          {testcases.map((_, index) => (
            <Tab label={index + 1} {...a11yProps(index)} />
          ))}
          <Tab
            icon={<AddIcon />}
            iconPosition="end"
            label="Test Case"
            onClick={addTestCase}
            sx={{ width: 100 }}
          />
        </Tabs>

        {testcases.map((tc, index) => (
          <TabPanel value={value} index={index}>
            <CreateTestCaseForm
              delTChandler={delTestCase}
              tcinfo={tc}
              index={index}
            />
          </TabPanel>
        ))}

        {props.settestcasehandler(testcases)}
      </Box>
    </div>
  );
};

export default CodingQuestion;
