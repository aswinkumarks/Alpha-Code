import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import { useRef } from "react";

const CreateContestForm = (props) => {
  const contestNameRef = useRef();
  const hostNameRef = useRef();
  const startDateRef = useRef();
  const endDateRef = useRef();
  const startTimeRef = useRef();
  const endTimeRef = useRef();
  const durationRef = useRef();
  const descriptionRef = useRef();

  function onSubmitHandler(event) {
    event.preventDefault();
    const contestname = contestNameRef.current.value;
    const hostname = hostNameRef.current.value;
    const startdate = startDateRef.current.value;
    const enddate = endDateRef.current.value;
    const starttime = startTimeRef.current.value;
    const endtime = endTimeRef.current.value;
    const duration = durationRef.current.value;
    const description = descriptionRef.current.value;

    const contestData = {
      contestname: contestname,
      hostname: hostname,
      startdate: startdate,
      enddate: enddate,
      starttime: starttime,
      endtime: endtime,
      duration: duration,
      description: description,
    };

    props.onCreateNewContest(contestData);
  }

  return (
    <Container fixed sx={{ mt: 5 }}>
      <Box sx={{ border: 1, p: 4, borderRadius: 2 }}>
        <form onSubmit={onSubmitHandler}>
          <Typography gutterBottom variant="h5" color="text.secondary">
            <b>Contest Details : -</b>
          </Typography>

          <Grid
            container
            justify="space-between"
            rowSpacing={6}
            spacing={3}
            sx={{ mt: 1 }}
          >
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="standard-basic"
                label="Contest Name"
                variant="outlined"
                inputProps={{ ref: contestNameRef }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="standard-basic"
                label="Host Name"
                variant="outlined"
                inputProps={{ ref: hostNameRef }}
              />
            </Grid>

            <Grid item xs={6} md={6}>
              <TextField
                id="date"
                label="Start Date"
                type="date"
                defaultValue="2017-05-24"
                sx={{ width: 220 }}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{ ref: startDateRef }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                id="st"
                label="Start Time"
                type="time"
                defaultValue="00:00"
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 300, // 5 min
                }}
                sx={{ width: 150 }}
                inputProps={{ ref: startTimeRef }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                id="date"
                label="End Date"
                type="date"
                defaultValue="2017-05-24"
                sx={{ width: 220 }}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{ ref: endDateRef }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                id="st"
                label="End Time"
                type="time"
                defaultValue="00:00"
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 300, // 5 min
                }}
                sx={{ width: 150 }}
                inputProps={{ ref: endTimeRef }}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                id="standard-number"
                label="Duration"
                type="number"
                variant="outlined"
                inputProps={{ ref: durationRef }}
              />
            </Grid>

            <Grid item xs={12} md={8}>
              <TextField
                fullWidth
                id="outlined-textarea"
                label="Multiline Placeholder"
                placeholder="Description"
                multiline
                inputProps={{ ref: descriptionRef }}
              />
            </Grid>

            {/* <Grid item s={10} lg={10} xl={10} md={10}>
              <span></span>
            </Grid> */}

            <Grid item>
              <Button type="submit" variant="contained">
                Create
              </Button>
            </Grid>
          </Grid>

          {/* <br/>
          <br/> */}
        </form>
      </Box>
    </Container>
  );
};

export default CreateContestForm;
