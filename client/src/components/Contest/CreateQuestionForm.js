import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import { useRef, useState } from "react";

import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import CreateTestCaseForm from "./CreateTestCaseForm";

const CreateQuestionForm = (props) => {
  const qtypes = [
    {
      value: "Coding",
      label: "Coding",
    },
    {
      value: "MCQ",
      label: "MCQ",
    },
  ];

  const [qtype, setQtype] = useState("Coding");

  function changeQtype(event) {
    setQtype(event.target.value);
  }

  return (
    <Container fixed sx={{ mt: 5 }}>
      <Box sx={{ border: 1, p: 4, borderRadius: 2 }}>
        <form
        // onSubmit={onSubmitHandler}
        >
          <Typography gutterBottom variant="h4" color="text.secondary">
            Contest : [add contest name here]
          </Typography>

          <Grid
            container
            justify="space-between"
            rowSpacing={6}
            spacing={3}
            sx={{ mt: 1 }}
          >
            <Grid item xs={12} md={12}>
              <TextField
                disabled
                id="outlined-disabled"
                label="Question number"
                defaultValue="[add counter here]"
              />
            </Grid>

            <Grid item xs={12} md={2}>
              <TextField
                id="qtype"
                select
                label="Type"
                value={qtype}
                onChange={changeQtype}
              >
                {qtypes.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} md={10}>
              <TextField
                fullWidth
                id="outlined-textarea"
                label="Question"
                multiline
                // inputProps={{ ref: descriptionRef }}
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <TextField
                fullWidth
                id="outlined-textarea"
                label="Description"
                multiline
                // inputProps={{ ref: descriptionRef }}
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <p>Test Cases :</p>
              <Button variant="outlined">+</Button>
            </Grid>

            <Grid item xs={12} md={11}>
              <CreateTestCaseForm />
            </Grid>
            
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default CreateQuestionForm;
