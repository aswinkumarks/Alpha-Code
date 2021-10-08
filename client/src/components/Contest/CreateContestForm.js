import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import { useRef, useState } from "react";

const CreateContestForm = (props) => {
  const [sdvalue, setsdValue] = useState(new Date());
  const [edvalue, setedValue] = useState(new Date());

  const contestNameRef = useRef();
  const hostNameRef = useRef();
  // const startTimeRef = useRef();
  // const endTimeRef = useRef();
  const durationRef = useRef();
  const descriptionRef = useRef();

  function onSubmitHandler(event) {
    event.preventDefault();
    const contestname = contestNameRef.current.value;
    const hostname = hostNameRef.current.value;
    const duration = durationRef.current.value;
    const description = descriptionRef.current.value;

    const contestData = {
      cname: contestname,
      hosted_by: hostname,
      startTime: sdvalue.toISOString(),
      endTime: edvalue.toISOString(),
      duration: duration,
      desc: description,
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

            <Grid item xs={6} md={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  renderInput={(params) => <TextField {...params} />}
                  label="Start date and time"
                  value={sdvalue}
                  onChange={(newValue) => {
                    setsdValue(newValue);
                  }}
                  minDateTime={new Date()}
                />
              </LocalizationProvider>
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
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  renderInput={(params) => <TextField {...params} />}
                  label="End time in each day"
                  value={edvalue}
                  onChange={(newValue) => {
                    setedValue(newValue);
                  }}
                  minDate={new Date("2020-02-14")}
                  minTime={new Date(0, 0, 0, 8)}
                  maxTime={new Date(0, 0, 0, 18, 45)}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="outlined-textarea"
                label="Description"
                multiline
                inputProps={{ ref: descriptionRef }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                id="standard-number"
                label="Duration"
                type="number"
                variant="outlined"
                inputProps={{ ref: durationRef }}
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
