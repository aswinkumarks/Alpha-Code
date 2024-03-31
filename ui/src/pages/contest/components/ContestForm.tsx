import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
// import AdapterDateFns from "@mui/lab/AdapterDateFns";
// import LocalizationProvider from "@mui/lab/LocalizationProvider";
// import DateTimePicker from "@mui/lab/DateTimePicker";
import { useRef, useState } from "react";

const ContestForm = (props) => {
  const [sdvalue, setsdValue] = useState(new Date(props.cInfo["startTime"]));
  const [edvalue, setedValue] = useState(new Date(props.cInfo["endTime"]));

  const contestNameRef = useRef();
  const hostNameRef = useRef();
  const durationRef = useRef();
  const descriptionRef = useRef();

  const editMode = props.cInfo["cname"] === "" ? false : true;

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

    editMode
      ? props.onEditContest(contestData)
      : props.onCreateNewContest(contestData);
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
                required
                fullWidth
                id="standard-basic"
                label="Contest Name"
                variant="outlined"
                defaultValue={props.cInfo["cname"]}
                inputProps={{ ref: contestNameRef }}
              />
            </Grid>

            <Grid item xs={6} md={6}>
              {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  renderInput={(params) => <TextField {...params} />}
                  label="Start date and time"
                  value={sdvalue}
                  onChange={(newValue) => {
                    setsdValue(newValue);
                  }}
                  minDateTime={new Date()}
                />
              </LocalizationProvider> */}
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                required
                id="standard-basic"
                label="Host Name"
                variant="outlined"
                defaultValue={props.cInfo["hosted_by"]}
                inputProps={{ ref: hostNameRef }}
              />
            </Grid>

            <Grid item xs={6} md={6}>
              {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
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
              </LocalizationProvider> */}
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="outlined-textarea"
                label="Description"
                defaultValue={props.cInfo["desc"]}
                multiline
                inputProps={{ ref: descriptionRef }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                required
                id="standard-number"
                label="Duration"
                type="number"
                variant="outlined"
                defaultValue={props.cInfo["duration"]}
                inputProps={{ ref: durationRef }}
              />
            </Grid>

            {(() => {
              if (!editMode) {
                return (
                  <Grid item>
                    <Button type="submit" variant="contained">
                      Create
                    </Button>
                  </Grid>
                );
              }
              return (
                <Grid item>
                  <Button type="submit" variant="contained">
                    Proceed to edit Questions
                  </Button>
                </Grid>
              );
            })()}
          </Grid>

        </form>
      </Box>
    </Container>
  );
};

export default ContestForm;
