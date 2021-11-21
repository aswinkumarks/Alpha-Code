import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CreateTestCaseForm from "./CreateTestCaseForm";

import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

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

  const [tcinfos, changeTCinfo] = useState([]);
  const [rerender, setRerender] = useState(false);

  function addTestCase() {
    changeTCinfo(
      tcinfos.concat({
        // id: tcinfos.length + 1,
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
    changeTCinfo(tcinfos.filter((item, index) => index !== pos));
    props.settestcasehandler(tcinfos);
    setRerender(true);
    setTimeout(() => {
      setRerender(false);
    }, 1000);
  }

  return (
    <div>
      <Grid item xs={12} md={12}>
        <Button variant="outlined" onClick={addTestCase}>
          <b>+</b>&nbsp;Test Case
        </Button>
      </Grid>

      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        {tcinfos.length > 0 && (
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            {tcinfos.map((tc, index) => (
              <Tab label={index + 1} {...a11yProps(index)} />
            ))}
          </Tabs>
        )}
      </Box>

      <Grid item xs={12} md={11}>
        {rerender &&
          tcinfos.map((tc, index) => (
            <TabPanel value={value} index={index}>
              <CreateTestCaseForm
                delTChandler={delTestCase}
                tcinfo={tc}
                index={index}
              />
            </TabPanel>
          ))}
        {!rerender &&
          tcinfos.map((tc, index) => (
            <TabPanel value={value} index={index}>
              <CreateTestCaseForm
                delTChandler={delTestCase}
                tcinfo={tc}
                index={index}
              />
            </TabPanel>
          ))}
      </Grid>
      {props.settestcasehandler(tcinfos)}
    </div>
  );
};

export default CodingQuestion;
