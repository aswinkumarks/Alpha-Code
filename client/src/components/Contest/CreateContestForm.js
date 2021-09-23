import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

const CreateContestForm = () => {
  return (
    <Container fixed sx={{ mt: 5 }}>
      <Box sx={{border: 1, p:4, borderRadius: 2}}>
        <form>
          <Typography gutterBottom variant="h5" color="text.secondary">
            <b>Contest Details : -</b>
          </Typography>
          <Grid container rowSpacing={6} spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={6} md={6}>
              <TextField
                fullWidth
                id="standard-basic"
                label="Contest Name"
                variant="outlined"
              />
            </Grid>

            <Grid item xs={6} md={6}>
              <TextField
                fullWidth
                id="standard-basic"
                label="Host Name"
                variant="outlined"
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
              />
            </Grid>

            <Grid item xs={6} md={6}>
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
              />
            </Grid>

            <Grid item xs={6} md={6}>
              <TextField
                id="date"
                label="End Date"
                type="date"
                defaultValue="2017-05-24"
                sx={{ width: 220 }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid item xs={6} md={6}>
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
              />
            </Grid>

            <Grid item xs={4} md={4}>
              <TextField
                id="standard-number"
                label="Duration"
                type="number"
                variant="outlined"
              />
            </Grid>

            <Grid item xs={8} md={8}>
              <TextField
                fullWidth
                id="outlined-textarea"
                label="Multiline Placeholder"
                placeholder="Description"
                multiline
              />
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default CreateContestForm;
